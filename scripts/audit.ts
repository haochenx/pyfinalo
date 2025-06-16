#!/usr/bin/env bun

import { existsSync } from "fs";
import { join } from "path";
import { $ } from "bun";
import { parseArgs } from "util";

// Main
async function main() {
  console.log("🔍 Running pyfinalo audit...\n");

  // List of checks this script performs:
  // 1. Auto-generated files (*.opam) are up-to-date with dune-project
  // 2. EditorConfig compliance (using external tool)
  // 3. Dependency files: bun.lockb exists when package.json exists

  await checkGeneratedFiles();
  await checkEditorConfig();
  await checkDependencies();

  if (hasErrors) {
    console.error("\n❌ Audit failed! Run 'make promote-audit' to fix some issues automatically.");
    process.exit(1);
  } else {
    console.log("\n✅ All checks passed!");
  }
}

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    fix: {
      type: "boolean",
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
});

const shouldFix = values.fix;
let hasErrors = false;

function error(msg: string) {
  console.error(`❌ ${msg}`);
  hasErrors = true;
}

function success(msg: string) {
  console.log(`✅ ${msg}`);
}

function info(msg: string) {
  console.log(`ℹ️  ${msg}`);
}

// Check 1: Auto-generated files
async function checkGeneratedFiles() {
  info("Checking auto-generated files...");

  try {
    // Generate opam files
    console.log("Running: dune build @install");
    await $`dune build @install`;

    // Check if opam files were modified
    const result = await $`git diff --exit-code *.opam`.nothrow();

    if (result.exitCode !== 0) {
      if (shouldFix) {
        info("Updating pyfinalo.opam...");
        success("Fixed: pyfinalo.opam updated");
      } else {
        error("pyfinalo.opam is out of date. Run 'make promote-audit' to fix.");
      }
    } else {
      success("Auto-generated files are up-to-date");
    }
  } catch (e) {
    error(`Failed to check generated files: ${e}`);
  }
}

// Check 2: EditorConfig compliance using external tool
async function checkEditorConfig() {
  info("Checking EditorConfig compliance...");

  if (!existsSync(".editorconfig")) {
    error(".editorconfig file not found!");
    return;
  }

  // Use the locally installed editorconfig-checker from scripts/node_modules
  const checkerPath = join("scripts", "node_modules", ".bin", "editorconfig-checker");
  if (!existsSync(checkerPath)) {
    error("editorconfig-checker not found. Run 'cd scripts && bun install'");
    return;
  }

  try {
    console.log("Running: editorconfig-checker");
    const result = await $`${checkerPath}`.nothrow();
    if (result.exitCode !== 0) {
      if (shouldFix) {
        info("Attempting to fix EditorConfig violations...");
        info("Note: This fix attempt may not be perfect as we're using JS instead of a dedicated EditorConfig fixer");

        // Find all files in the repo and fix issues
        const allFilesGlob = new Bun.Glob("**/*");

        for await (const file of allFilesGlob.scan({ cwd: ".", dot: true })) {
          // Skip directories and files we shouldn't touch
          if (file.includes('node_modules') || file.includes('_build') || file.includes('.git/')) continue;

          try {
            const stat = await Bun.file(file).stat();
            if (!stat.isFile) continue;

            const content = await Bun.file(file).text();
            let modified = false;
            let newContent = content;

            // Fix missing final newline
            if (!newContent.endsWith('\n')) {
              newContent += '\n';
              modified = true;
            }

            // Fix trailing whitespace (except for .md and .t files)
            if (!file.endsWith('.md') && !file.endsWith('.t')) {
              const lines = newContent.split('\n');
              const fixedLines = lines.map(line => line.trimEnd());
              const fixedContent = fixedLines.join('\n');
              if (newContent !== fixedContent) {
                newContent = fixedContent;
                modified = true;
              }
            }

            if (modified) {
              await Bun.write(file, newContent);
            }
          } catch (e) {
            // Skip binary files or files we can't read
          }
        }

        // Check again
        const recheckResult = await $`${checkerPath}`.nothrow();
        if (recheckResult.exitCode === 0) {
          success("EditorConfig violations fixed");
          info("Please review the changes and re-run tests to ensure nothing was broken");
        } else {
          error("Some EditorConfig violations could not be auto-fixed. Consider using 'eclint fix' for a more comprehensive solution");
        }
      } else {
        error("EditorConfig violations found. See output above.");
      }
    } else {
      success("EditorConfig compliance check passed");
    }
  } catch (e) {
    error(`Failed to check EditorConfig compliance: ${e}`);
  }
}

// Check 3: Dependency consistency
async function checkDependencies() {
  info("Checking dependency consistency...");

  const dirsToCheck = ["src/lib_pyfinalo_js", "scripts"];
  let allGood = true;

  for (const dir of dirsToCheck) {
    if (existsSync(join(dir, "package.json"))) {
      // Check lock file exists
      if (!existsSync(join(dir, "bun.lockb")) && !existsSync(join(dir, "bun.lock"))) {
        error(`${dir}/bun.lock[b] missing. Run 'cd ${dir} && bun install'`);
        allGood = false;
        continue;
      }

      // Check if lock file is up-to-date
      console.log(`Checking ${dir} dependencies...`);
      const result = await $`cd ${dir} && bun install --frozen-lockfile`.nothrow();
      if (result.exitCode !== 0) {
        error(`${dir}/bun.lock[b] is out of date. Run 'cd ${dir} && bun install'`);
        allGood = false;
      }
    }
  }

  if (allGood) {
    success("All dependency lock files present and up-to-date");
  }
}

main().catch(console.error);

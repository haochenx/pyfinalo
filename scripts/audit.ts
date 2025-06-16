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
    if (shouldFix) {
      // Some editorconfig tools support fixing, but editorconfig-checker doesn't
      // We could use eclint instead: npm install -g eclint
      info("Note: auto-fix for EditorConfig not implemented. Consider using 'eclint fix'");
      const result = await $`${checkerPath}`.nothrow();
      if (result.exitCode !== 0) {
        error("EditorConfig violations found. Fix manually or use 'eclint fix'");
      }
    } else {
      console.log("Running: editorconfig-checker");
      const result = await $`${checkerPath}`.nothrow();
      if (result.exitCode !== 0) {
        error("EditorConfig violations found. See output above.");
      } else {
        success("EditorConfig compliance check passed");
      }
    }
  } catch (e) {
    error(`Failed to check EditorConfig compliance: ${e}`);
  }
}

// Check 3: Dependency consistency  
async function checkDependencies() {
  info("Checking dependency consistency...");
  
  // Check bun.lockb or bun.lock exists
  const jsDir = "src/lib_pyfinalo_js";
  if (existsSync(join(jsDir, "package.json"))) {
    if (!existsSync(join(jsDir, "bun.lockb")) && !existsSync(join(jsDir, "bun.lock"))) {
      error(`${jsDir}/bun.lock[b] missing. Run 'cd ${jsDir} && bun install'`);
    } else {
      success("Dependency lock files present");
    }
  } else {
    success("No package.json to check");
  }
}

main().catch(console.error);
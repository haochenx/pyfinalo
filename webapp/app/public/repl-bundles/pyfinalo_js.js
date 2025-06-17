var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});

// dist/_raw.js
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require2 = /* @__PURE__ */ ((x2) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
}) : x2)(function(x2) {
  if (typeof __require !== "undefined") return __require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require22() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_lib_pyfinalo_js_bc = __commonJS({
  "../../_build/default/src/lib_pyfinalo_js/lib_pyfinalo_js.bc.js"(exports, module) {
    (function(Object2) {
      typeof globalThis !== "object" && (this ? get() : (Object2.defineProperty(Object2.prototype, "_T_", { configurable: true, get }), _T_));
      function get() {
        var global = this || self;
        global.globalThis = global;
        delete Object2.prototype._T_;
      }
    })(Object);
    (function(globalThis) {
      "use strict";
      var _a;
      function caml_sub_uint8_array_to_jsbytes(a, i, len) {
        var f = String.fromCharCode;
        if (i === 0 && len <= 4096 && len === a.length) return f.apply(null, a);
        var s2 = "";
        for (; 0 < len; i += 1024, len -= 1024)
          s2 += f.apply(null, a.subarray(i, i + Math.min(len, 1024)));
        return s2;
      }
      function caml_string_of_uint8_array(a) {
        return caml_sub_uint8_array_to_jsbytes(a, 0, a.length);
      }
      function caml_ba_get_1(ba, i0) {
        return ba.get(ba.offset(i0));
      }
      function BigStringReader(bs, i) {
        this.s = bs;
        this.i = i;
      }
      BigStringReader.prototype = {
        read8u: function() {
          return caml_ba_get_1(this.s, this.i++);
        },
        read8s: function() {
          return caml_ba_get_1(this.s, this.i++) << 24 >> 24;
        },
        read16u: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 2;
          return caml_ba_get_1(s2, i) << 8 | caml_ba_get_1(s2, i + 1);
        },
        read16s: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 2;
          return caml_ba_get_1(s2, i) << 24 >> 16 | caml_ba_get_1(s2, i + 1);
        },
        read32u: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 4;
          return (caml_ba_get_1(s2, i) << 24 | caml_ba_get_1(s2, i + 1) << 16 | caml_ba_get_1(s2, i + 2) << 8 | caml_ba_get_1(s2, i + 3)) >>> 0;
        },
        read32s: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 4;
          return caml_ba_get_1(s2, i) << 24 | caml_ba_get_1(s2, i + 1) << 16 | caml_ba_get_1(s2, i + 2) << 8 | caml_ba_get_1(s2, i + 3);
        },
        readstr: function(len) {
          var i = this.i, offset = this.offset(i);
          this.i = i + len;
          return caml_string_of_uint8_array(this.s.data.subarray(offset, offset + len));
        },
        readuint8array: function(len) {
          var i = this.i, offset = this.offset(i);
          this.i = i + len;
          return this.s.data.subarray(offset, offset + len);
        }
      };
      function caml_str_repeat(n, s2) {
        if (n === 0) return "";
        if (s2.repeat) return s2.repeat(n);
        var r = "", l = 0;
        for (; ; ) {
          if (n & 1) r += s2;
          n >>= 1;
          if (n === 0) return r;
          s2 += s2;
          l++;
          if (l === 9) s2.slice(0, 1);
        }
      }
      function caml_convert_string_to_bytes(s2) {
        if (s2.t === 2)
          s2.c += caml_str_repeat(s2.l - s2.c.length, "\0");
        else
          s2.c = caml_sub_uint8_array_to_jsbytes(s2.c, 0, s2.c.length);
        s2.t = 0;
      }
      function jsoo_is_ascii(s2) {
        if (s2.length < 24) {
          for (var i = 0; i < s2.length; i++) if (s2.charCodeAt(i) > 127) return false;
          return true;
        } else
          return !/[^\x00-\x7f]/.test(s2);
      }
      function caml_utf16_of_utf8(s2) {
        for (var b = "", t = "", c, c1, c2, v, i = 0, l = s2.length; i < l; i++) {
          c1 = s2.charCodeAt(i);
          if (c1 < 128) {
            for (var j = i + 1; j < l && (c1 = s2.charCodeAt(j)) < 128; j++) ;
            if (j - i > 512) {
              t.slice(0, 1);
              b += t;
              t = "";
              b += s2.slice(i, j);
            } else
              t += s2.slice(i, j);
            if (j === l) break;
            i = j;
          }
          v = 1;
          if (++i < l && ((c2 = s2.charCodeAt(i)) & -64) === 128) {
            c = c2 + (c1 << 6);
            if (c1 < 224) {
              v = c - 12416;
              if (v < 128) v = 1;
            } else {
              v = 2;
              if (++i < l && ((c2 = s2.charCodeAt(i)) & -64) === 128) {
                c = c2 + (c << 6);
                if (c1 < 240) {
                  v = c - 925824;
                  if (v < 2048 || v >= 55295 && v < 57344) v = 2;
                } else {
                  v = 3;
                  if (++i < l && ((c2 = s2.charCodeAt(i)) & -64) === 128 && c1 < 245) {
                    v = c2 - 63447168 + (c << 6);
                    if (v < 65536 || v > 1114111) v = 3;
                  }
                }
              }
            }
          }
          if (v < 4) {
            i -= v;
            t += "\uFFFD";
          } else if (v > 65535)
            t += String.fromCharCode(55232 + (v >> 10), 56320 + (v & 1023));
          else
            t += String.fromCharCode(v);
          if (t.length > 1024) {
            t.slice(0, 1);
            b += t;
            t = "";
          }
        }
        return b + t;
      }
      function MlBytes(tag, contents, length) {
        this.t = tag;
        this.c = contents;
        this.l = length;
      }
      MlBytes.prototype.toString = function() {
        switch (this.t) {
          case 9:
          case 8:
            return this.c;
          case 4:
          case 2:
            caml_convert_string_to_bytes(this);
          case 0:
            if (jsoo_is_ascii(this.c)) this.t = 9;
            else this.t = 8;
            return this.c;
        }
      };
      MlBytes.prototype.toUtf16 = function() {
        var r = this.toString();
        if (this.t === 9) return r;
        return caml_utf16_of_utf8(r);
      };
      MlBytes.prototype.slice = function() {
        var content = this.t === 4 ? this.c.slice() : this.c;
        return new MlBytes(this.t, content, this.l);
      };
      function MlChanid(id) {
        this.id = id;
      }
      var jsoo_static_env = {};
      function jsoo_sys_getenv(n) {
        if (jsoo_static_env[n]) return jsoo_static_env[n];
        var process = globalThis.process;
        if (process && process.env && process.env[n] !== void 0)
          return process.env[n];
        if (globalThis.jsoo_env && typeof globalThis.jsoo_env[n] === "string")
          return globalThis.jsoo_env[n];
      }
      var caml_record_backtrace_env_flag = 0;
      (function() {
        var r = jsoo_sys_getenv("OCAMLRUNPARAM");
        if (r !== void 0) {
          var l = r.split(",");
          for (var i = 0; i < l.length; i++)
            if (l[i] === "b") {
              caml_record_backtrace_env_flag = 1;
              break;
            } else if (l[i].startsWith("b="))
              caml_record_backtrace_env_flag = +l[i].slice(2);
            else
              continue;
        }
      })();
      var caml_record_backtrace_runtime_flag = caml_record_backtrace_env_flag, caml_global_data = [0];
      function caml_exn_with_js_backtrace(exn, force) {
        if (!exn.js_error || force || exn[0] === 248)
          exn.js_error = new globalThis.Error("Js exception containing backtrace");
        return exn;
      }
      function caml_maybe_attach_backtrace(exn, force) {
        return caml_record_backtrace_env_flag && caml_record_backtrace_runtime_flag ? caml_exn_with_js_backtrace(exn, force) : exn;
      }
      function caml_raise_with_arg(tag, arg) {
        throw caml_maybe_attach_backtrace([0, tag, arg]);
      }
      function caml_utf8_of_utf16(s2) {
        for (var b = "", t = b, c, d, i = 0, l = s2.length; i < l; i++) {
          c = s2.charCodeAt(i);
          if (c < 128) {
            for (var j = i + 1; j < l && (c = s2.charCodeAt(j)) < 128; j++) ;
            if (j - i > 512) {
              t.slice(0, 1);
              b += t;
              t = "";
              b += s2.slice(i, j);
            } else
              t += s2.slice(i, j);
            if (j === l) break;
            i = j;
          }
          if (c < 2048) {
            t += String.fromCharCode(192 | c >> 6);
            t += String.fromCharCode(128 | c & 63);
          } else if (c < 55296 || c >= 57343)
            t += String.fromCharCode(224 | c >> 12, 128 | c >> 6 & 63, 128 | c & 63);
          else if (c >= 56319 || i + 1 === l || (d = s2.charCodeAt(i + 1)) < 56320 || d > 57343)
            t += "\xEF\xBF\xBD";
          else {
            i++;
            c = (c << 10) + d - 56613888;
            t += String.fromCharCode(
              240 | c >> 18,
              128 | c >> 12 & 63,
              128 | c >> 6 & 63,
              128 | c & 63
            );
          }
          if (t.length > 1024) {
            t.slice(0, 1);
            b += t;
            t = "";
          }
        }
        return b + t;
      }
      function caml_string_of_jsbytes(x2) {
        return x2;
      }
      function caml_string_of_jsstring(s2) {
        return jsoo_is_ascii(s2) ? caml_string_of_jsbytes(s2) : caml_string_of_jsbytes(caml_utf8_of_utf16(s2));
      }
      function caml_raise_sys_error(msg) {
        caml_raise_with_arg(caml_global_data.Sys_error, caml_string_of_jsstring(msg));
      }
      function caml_raise_with_args(tag, args) {
        throw caml_maybe_attach_backtrace([0, tag].concat(args));
      }
      var unix_error = [
        "E2BIG",
        "EACCES",
        "EAGAIN",
        "EBADF",
        "EBUSY",
        "ECHILD",
        "EDEADLK",
        "EDOM",
        "EEXIST",
        "EFAULT",
        "EFBIG",
        "EINTR",
        "EINVAL",
        "EIO",
        "EISDIR",
        "EMFILE",
        "EMLINK",
        "ENAMETOOLONG",
        "ENFILE",
        "ENODEV",
        "ENOENT",
        "ENOEXEC",
        "ENOLCK",
        "ENOMEM",
        "ENOSPC",
        "ENOSYS",
        "ENOTDIR",
        "ENOTEMPTY",
        "ENOTTY",
        "ENXIO",
        "EPERM",
        "EPIPE",
        "ERANGE",
        "EROFS",
        "ESPIPE",
        "ESRCH",
        "EXDEV",
        "EWOULDBLOCK",
        "EINPROGRESS",
        "EALREADY",
        "ENOTSOCK",
        "EDESTADDRREQ",
        "EMSGSIZE",
        "EPROTOTYPE",
        "ENOPROTOOPT",
        "EPROTONOSUPPORT",
        "ESOCKTNOSUPPORT",
        "EOPNOTSUPP",
        "EPFNOSUPPORT",
        "EAFNOSUPPORT",
        "EADDRINUSE",
        "EADDRNOTAVAIL",
        "ENETDOWN",
        "ENETUNREACH",
        "ENETRESET",
        "ECONNABORTED",
        "ECONNRESET",
        "ENOBUFS",
        "EISCONN",
        "ENOTCONN",
        "ESHUTDOWN",
        "ETOOMANYREFS",
        "ETIMEDOUT",
        "ECONNREFUSED",
        "EHOSTDOWN",
        "EHOSTUNREACH",
        "ELOOP",
        "EOVERFLOW"
      ];
      function make_unix_err_args(code, syscall, path, errno) {
        var variant = unix_error.indexOf(code);
        if (variant < 0) {
          if (errno == null) errno = -9999;
          variant = [0, -errno];
        }
        var args = [
          variant,
          caml_string_of_jsstring(syscall || ""),
          caml_string_of_jsstring(path || "")
        ];
        return args;
      }
      var caml_named_values = {};
      function caml_named_value(nm) {
        return caml_named_values[nm];
      }
      function caml_raise_system_error(raise_unix, code, cmd, msg, path) {
        var unix_error2 = caml_named_value("Unix.Unix_error");
        if (raise_unix && unix_error2)
          caml_raise_with_args(unix_error2, make_unix_err_args(code, cmd, path));
        else {
          var msg = code + ": " + msg + ", " + cmd;
          if (path !== void 0) msg += " '" + path + "'";
          caml_raise_sys_error(msg);
        }
      }
      function caml_is_ml_bytes(s2) {
        return s2 instanceof MlBytes;
      }
      function caml_is_ml_string(s2) {
        return typeof s2 === "string" && !/[^\x00-\xff]/.test(s2);
      }
      function caml_bytes_of_array(a) {
        if (!(a instanceof Uint8Array)) a = new Uint8Array(a);
        return new MlBytes(4, a, a.length);
      }
      function caml_bytes_of_jsbytes(s2) {
        return new MlBytes(0, s2, s2.length);
      }
      function caml_jsbytes_of_string(x2) {
        return x2;
      }
      function caml_bytes_of_string(s2) {
        return caml_bytes_of_jsbytes(caml_jsbytes_of_string(s2));
      }
      function caml_raise_no_such_file(name, raise_unix) {
        caml_raise_system_error(raise_unix, "ENOENT", "no such file or directory", name);
      }
      function caml_convert_bytes_to_array(s2) {
        var a = new Uint8Array(s2.l), b = s2.c, l = b.length, i = 0;
        for (; i < l; i++) a[i] = b.charCodeAt(i);
        for (l = s2.l; i < l; i++) a[i] = 0;
        s2.c = a;
        s2.t = 4;
        return a;
      }
      function caml_uint8_array_of_bytes(s2) {
        if (s2.t !== 4) caml_convert_bytes_to_array(s2);
        return s2.c;
      }
      function caml_bytes_of_uint8_array(a) {
        return new MlBytes(4, a, a.length);
      }
      function caml_raise_with_string(tag, msg) {
        caml_raise_with_arg(tag, caml_string_of_jsbytes(msg));
      }
      function caml_invalid_argument(msg) {
        caml_raise_with_string(caml_global_data.Invalid_argument, msg);
      }
      function caml_create_bytes(len) {
        if (len < 0) caml_invalid_argument("Bytes.create");
        return new MlBytes(len ? 2 : 9, "", len);
      }
      function caml_ml_bytes_length(s2) {
        return s2.l;
      }
      function caml_blit_bytes(s1, i1, s2, i2, len) {
        if (len === 0) return 0;
        if (i2 === 0 && (len >= s2.l || s2.t === 2 && len >= s2.c.length)) {
          s2.c = s1.t === 4 ? caml_sub_uint8_array_to_jsbytes(s1.c, i1, len) : i1 === 0 && s1.c.length === len ? s1.c : s1.c.slice(i1, i1 + len);
          s2.t = s2.c.length === s2.l ? 0 : 2;
        } else if (s2.t === 2 && i2 === s2.c.length) {
          s2.c += s1.t === 4 ? caml_sub_uint8_array_to_jsbytes(s1.c, i1, len) : i1 === 0 && s1.c.length === len ? s1.c : s1.c.slice(i1, i1 + len);
          s2.t = s2.c.length === s2.l ? 0 : 2;
        } else {
          if (s2.t !== 4) caml_convert_bytes_to_array(s2);
          var c1 = s1.c, c2 = s2.c;
          if (s1.t === 4)
            if (i2 <= i1)
              for (var i = 0; i < len; i++) c2[i2 + i] = c1[i1 + i];
            else
              for (var i = len - 1; i >= 0; i--) c2[i2 + i] = c1[i1 + i];
          else {
            var l = Math.min(len, c1.length - i1);
            for (var i = 0; i < l; i++) c2[i2 + i] = c1.charCodeAt(i1 + i);
            for (; i < len; i++) c2[i2 + i] = 0;
          }
        }
        return 0;
      }
      function MlFile() {
      }
      function MlFakeFile(content) {
        this.data = content;
      }
      MlFakeFile.prototype = new MlFile();
      MlFakeFile.prototype.constructor = MlFakeFile;
      MlFakeFile.prototype.truncate = function(len) {
        var old = this.data;
        this.data = caml_create_bytes(len | 0);
        caml_blit_bytes(old, 0, this.data, 0, len);
      };
      MlFakeFile.prototype.length = function() {
        return caml_ml_bytes_length(this.data);
      };
      MlFakeFile.prototype.write = function(offset, buf, pos, len) {
        var clen = this.length();
        if (offset + len >= clen) {
          var new_str = caml_create_bytes(offset + len), old_data = this.data;
          this.data = new_str;
          caml_blit_bytes(old_data, 0, this.data, 0, clen);
        }
        caml_blit_bytes(caml_bytes_of_uint8_array(buf), pos, this.data, offset, len);
        return len;
      };
      MlFakeFile.prototype.read = function(offset, buf, pos, len) {
        var clen = this.length();
        if (offset + len >= clen) len = clen - offset;
        if (len) {
          var data = caml_create_bytes(len | 0);
          caml_blit_bytes(this.data, offset, data, 0, len);
          buf.set(caml_uint8_array_of_bytes(data), pos);
        }
        return len;
      };
      function MlFakeFd(name, file, flags) {
        this.file = file;
        this.name = name;
        this.flags = flags;
        this.offset = 0;
        this.seeked = false;
      }
      MlFakeFd.prototype.err_closed = function(cmd, raise_unix) {
        caml_raise_system_error(raise_unix, "EBADF", cmd, "bad file descriptor");
      };
      MlFakeFd.prototype.length = function() {
        if (this.file) return this.file.length();
        this.err_closed("length");
      };
      MlFakeFd.prototype.truncate = function(len, raise_unix) {
        if (this.file) {
          if (!(this.flags.wronly || this.flags.rdwr))
            caml_raise_system_error(raise_unix, "EINVAL", "truncate", "invalid argument");
          return this.file.truncate(len);
        }
        this.err_closed("truncate", raise_unix);
      };
      MlFakeFd.prototype.write = function(buf, pos, len, raise_unix) {
        if (this.file && (this.flags.wronly || this.flags.rdwr)) {
          var offset = this.offset;
          this.offset += len;
          return this.file.write(offset, buf, pos, len);
        }
        this.err_closed("write", raise_unix);
      };
      MlFakeFd.prototype.read = function(buf, pos, len, raise_unix) {
        if (this.file && !this.flags.wronly) {
          var offset = this.offset;
          this.offset += len;
          return this.file.read(offset, buf, pos, len);
        }
        this.err_closed("read", raise_unix);
      };
      MlFakeFd.prototype.seek = function(offset, whence, raise_unix) {
        switch (whence) {
          case 0:
            break;
          case 1:
            offset += this.offset;
            break;
          case 2:
            offset += this.length();
            break;
        }
        if (offset < 0)
          caml_raise_system_error(raise_unix, "EINVAL", "lseek", "invalid argument");
        this.offset = offset;
        this.seeked = true;
      };
      MlFakeFd.prototype.close = function() {
        if (!this.file) this.err_closed("close");
        this.file = void 0;
      };
      MlFakeFd.prototype.check_stream_semantics = function(cmd) {
        if (!this.file) return this.err_closed(cmd, 1);
      };
      function MlFakeDevice(root, f) {
        this.content = {};
        this.root = root;
        this.lookupFun = f;
      }
      MlFakeDevice.prototype.nm = function(name) {
        return this.root + name;
      };
      MlFakeDevice.prototype.create_dir_if_needed = function(name) {
        var comp = name.split("/"), res = "";
        for (var i = 0; i < comp.length - 1; i++) {
          res += comp[i] + "/";
          if (this.content[res]) continue;
          this.content[res] = Symbol("directory");
        }
      };
      MlFakeDevice.prototype.slash = function(name) {
        return /\/$/.test(name) ? name : name + "/";
      };
      MlFakeDevice.prototype.lookup = function(name) {
        if (!this.content[name] && this.lookupFun) {
          var res = this.lookupFun(caml_string_of_jsstring(this.root), caml_string_of_jsstring(name));
          if (res !== 0) {
            this.create_dir_if_needed(name);
            this.content[name] = new MlFakeFile(caml_bytes_of_string(res[1]));
          }
        }
      };
      MlFakeDevice.prototype.exists = function(name, do_not_lookup) {
        if (name === "") return 1;
        var name_slash = this.slash(name);
        if (this.content[name_slash]) return 1;
        if (!do_not_lookup) this.lookup(name);
        return this.content[name] ? 1 : 0;
      };
      MlFakeDevice.prototype.isFile = function(name) {
        return this.exists(name) && !this.is_dir(name) ? 1 : 0;
      };
      MlFakeDevice.prototype.mkdir = function(name, mode, raise_unix) {
        if (this.exists(name))
          caml_raise_system_error(raise_unix, "EEXIST", "mkdir", "file already exists", this.nm(name));
        var parent = /^(.*)\/[^/]+/.exec(name);
        parent = parent && parent[1] || "";
        if (!this.exists(parent))
          caml_raise_system_error(
            raise_unix,
            "ENOENT",
            "mkdir",
            "no such file or directory",
            this.nm(name)
          );
        if (!this.is_dir(parent))
          caml_raise_system_error(raise_unix, "ENOTDIR", "mkdir", "not a directory", this.nm(name));
        this.create_dir_if_needed(this.slash(name));
      };
      MlFakeDevice.prototype.rmdir = function(name, raise_unix) {
        var name_slash = name === "" ? "" : this.slash(name), r = new RegExp("^" + name_slash + "([^/]+)");
        if (!this.exists(name))
          caml_raise_system_error(
            raise_unix,
            "ENOENT",
            "rmdir",
            "no such file or directory",
            this.nm(name)
          );
        if (!this.is_dir(name))
          caml_raise_system_error(raise_unix, "ENOTDIR", "rmdir", "not a directory", this.nm(name));
        for (var n in this.content)
          if (n.match(r))
            caml_raise_system_error(
              raise_unix,
              "ENOTEMPTY",
              "rmdir",
              "directory not empty",
              this.nm(name)
            );
        delete this.content[name_slash];
      };
      MlFakeDevice.prototype.readdir = function(name) {
        var name_slash = name === "" ? "" : this.slash(name);
        if (!this.exists(name))
          caml_raise_sys_error(name + ": No such file or directory");
        if (!this.is_dir(name)) caml_raise_sys_error(name + ": Not a directory");
        var r = new RegExp("^" + name_slash + "([^/]+)"), seen = {}, a = [];
        for (var n in this.content) {
          var m = n.match(r);
          if (m && !seen[m[1]]) {
            seen[m[1]] = true;
            a.push(m[1]);
          }
        }
        return a;
      };
      MlFakeDevice.prototype.opendir = function(name, raise_unix) {
        var a = this.readdir(name), c = false, i = 0;
        return {
          readSync: function() {
            if (c)
              caml_raise_system_error(raise_unix, "EBADF", "readdir", "bad file descriptor");
            if (i === a.length) return null;
            var entry = a[i];
            i++;
            return { name: entry };
          },
          closeSync: function() {
            if (c)
              caml_raise_system_error(raise_unix, "EBADF", "readdir", "bad file descriptor");
            c = true;
            a = [];
          }
        };
      };
      MlFakeDevice.prototype.is_dir = function(name) {
        if (name === "") return true;
        var name_slash = this.slash(name);
        return this.content[name_slash] ? 1 : 0;
      };
      MlFakeDevice.prototype.unlink = function(name, raise_unix) {
        if (!this.exists(name, true))
          caml_raise_system_error(raise_unix, "ENOENT", "unlink", "no such file or directory", name);
        delete this.content[name];
        return 0;
      };
      MlFakeDevice.prototype.open = function(name, f, _perms, raise_unix) {
        var file;
        this.lookup(name);
        if (this.content[name]) {
          if (this.is_dir(name))
            caml_raise_system_error(
              raise_unix,
              "EISDIR",
              "open",
              "illegal operation on a directory",
              this.nm(name)
            );
          if (f.create && f.excl)
            caml_raise_system_error(raise_unix, "EEXIST", "open", "file already exists", this.nm(name));
          file = this.content[name];
          if (f.truncate) file.truncate();
        } else if (f.create) {
          this.create_dir_if_needed(name);
          this.content[name] = new MlFakeFile(caml_create_bytes(0));
          file = this.content[name];
        } else
          caml_raise_no_such_file(this.nm(name), raise_unix);
        return new MlFakeFd(this.nm(name), file, f);
      };
      MlFakeDevice.prototype.truncate = function(name, len, raise_unix) {
        var file;
        this.lookup(name);
        if (this.content[name]) {
          if (this.is_dir(name))
            caml_raise_system_error(
              raise_unix,
              "EISDIR",
              "open",
              "illegal operation on a directory",
              this.nm(name)
            );
          file = this.content[name];
          file.truncate(len);
        } else
          caml_raise_no_such_file(this.nm(name), raise_unix);
      };
      MlFakeDevice.prototype.register = function(name, content) {
        var file;
        if (this.content[name])
          caml_raise_sys_error(this.nm(name) + " : file already exists");
        if (caml_is_ml_bytes(content)) file = new MlFakeFile(content);
        if (caml_is_ml_string(content))
          file = new MlFakeFile(caml_bytes_of_string(content));
        else if (Array.isArray(content))
          file = new MlFakeFile(caml_bytes_of_array(content));
        else if (typeof content === "string")
          file = new MlFakeFile(caml_bytes_of_jsbytes(content));
        else if (content.toString) {
          var bytes = caml_bytes_of_string(caml_string_of_jsstring(content.toString()));
          file = new MlFakeFile(bytes);
        }
        if (file) {
          this.create_dir_if_needed(name);
          this.content[name] = file;
        } else
          caml_raise_sys_error(this.nm(name) + " : registering file with invalid content type");
      };
      MlFakeDevice.prototype.constructor = MlFakeDevice;
      function MlFakeFd_out(fd, flags) {
        MlFakeFile.call(this, caml_create_bytes(0));
        this.log = function(s2) {
          return 0;
        };
        if (fd === 1 && typeof console.log === "function")
          this.log = console.log;
        else if (fd === 2 && typeof console.error === "function")
          this.log = console.error;
        else if (typeof console.log === "function") this.log = console.log;
        this.flags = flags;
      }
      MlFakeFd_out.prototype.length = function() {
        return 0;
      };
      MlFakeFd_out.prototype.truncate = function(len, raise_unix) {
        caml_raise_system_error(raise_unix, "EINVAL", "ftruncate", "invalid argument");
      };
      MlFakeFd_out.prototype.write = function(buf, pos, len, raise_unix) {
        var written = len;
        if (this.log) {
          if (len > 0 && pos >= 0 && pos + len <= buf.length && buf[pos + len - 1] === 10)
            len--;
          var src = caml_create_bytes(len);
          caml_blit_bytes(caml_bytes_of_uint8_array(buf), pos, src, 0, len);
          this.log(src.toUtf16());
          return written;
        }
        caml_raise_system_error(raise_unix, "EBADF", "write", "bad file descriptor");
      };
      MlFakeFd_out.prototype.read = function(buf, pos, len, raise_unix) {
        caml_raise_system_error(raise_unix, "EBADF", "read", "bad file descriptor");
      };
      MlFakeFd_out.prototype.seek = function(len, whence, raise_unix) {
        caml_raise_system_error(raise_unix, "ESPIPE", "lseek", "illegal seek");
      };
      MlFakeFd_out.prototype.close = function() {
        this.log = void 0;
      };
      MlFakeFd_out.prototype.check_stream_semantics = function(cmd) {
      };
      var caml_int64_offset = Math.pow(2, -24);
      function caml_raise_constant(tag) {
        throw tag;
      }
      function caml_raise_zero_divide() {
        caml_raise_constant(caml_global_data.Division_by_zero);
      }
      function MlInt64(lo, mi, hi) {
        this.lo = lo & 16777215;
        this.mi = mi & 16777215;
        this.hi = hi & 65535;
      }
      MlInt64.prototype.caml_custom = "_j";
      MlInt64.prototype.copy = function() {
        return new MlInt64(this.lo, this.mi, this.hi);
      };
      MlInt64.prototype.ucompare = function(x2) {
        if (this.hi > x2.hi) return 1;
        if (this.hi < x2.hi) return -1;
        if (this.mi > x2.mi) return 1;
        if (this.mi < x2.mi) return -1;
        if (this.lo > x2.lo) return 1;
        if (this.lo < x2.lo) return -1;
        return 0;
      };
      MlInt64.prototype.compare = function(x2) {
        var hi = this.hi << 16, xhi = x2.hi << 16;
        if (hi > xhi) return 1;
        if (hi < xhi) return -1;
        if (this.mi > x2.mi) return 1;
        if (this.mi < x2.mi) return -1;
        if (this.lo > x2.lo) return 1;
        if (this.lo < x2.lo) return -1;
        return 0;
      };
      MlInt64.prototype.neg = function() {
        var lo = -this.lo, mi = -this.mi + (lo >> 24), hi = -this.hi + (mi >> 24);
        return new MlInt64(lo, mi, hi);
      };
      MlInt64.prototype.add = function(x2) {
        var lo = this.lo + x2.lo, mi = this.mi + x2.mi + (lo >> 24), hi = this.hi + x2.hi + (mi >> 24);
        return new MlInt64(lo, mi, hi);
      };
      MlInt64.prototype.sub = function(x2) {
        var lo = this.lo - x2.lo, mi = this.mi - x2.mi + (lo >> 24), hi = this.hi - x2.hi + (mi >> 24);
        return new MlInt64(lo, mi, hi);
      };
      MlInt64.prototype.mul = function(x2) {
        var lo = this.lo * x2.lo, mi = (lo * caml_int64_offset | 0) + this.mi * x2.lo + this.lo * x2.mi, hi = (mi * caml_int64_offset | 0) + this.hi * x2.lo + this.mi * x2.mi + this.lo * x2.hi;
        return new MlInt64(lo, mi, hi);
      };
      MlInt64.prototype.isZero = function() {
        return (this.lo | this.mi | this.hi) === 0;
      };
      MlInt64.prototype.isNeg = function() {
        return this.hi << 16 < 0;
      };
      MlInt64.prototype.and = function(x2) {
        return new MlInt64(this.lo & x2.lo, this.mi & x2.mi, this.hi & x2.hi);
      };
      MlInt64.prototype.or = function(x2) {
        return new MlInt64(this.lo | x2.lo, this.mi | x2.mi, this.hi | x2.hi);
      };
      MlInt64.prototype.xor = function(x2) {
        return new MlInt64(this.lo ^ x2.lo, this.mi ^ x2.mi, this.hi ^ x2.hi);
      };
      MlInt64.prototype.shift_left = function(s2) {
        s2 = s2 & 63;
        if (s2 === 0) return this;
        if (s2 < 24)
          return new MlInt64(
            this.lo << s2,
            this.mi << s2 | this.lo >> 24 - s2,
            this.hi << s2 | this.mi >> 24 - s2
          );
        if (s2 < 48)
          return new MlInt64(0, this.lo << s2 - 24, this.mi << s2 - 24 | this.lo >> 48 - s2);
        return new MlInt64(0, 0, this.lo << s2 - 48);
      };
      MlInt64.prototype.shift_right_unsigned = function(s2) {
        s2 = s2 & 63;
        if (s2 === 0) return this;
        if (s2 < 24)
          return new MlInt64(
            this.lo >> s2 | this.mi << 24 - s2,
            this.mi >> s2 | this.hi << 24 - s2,
            this.hi >> s2
          );
        if (s2 < 48)
          return new MlInt64(this.mi >> s2 - 24 | this.hi << 48 - s2, this.hi >> s2 - 24, 0);
        return new MlInt64(this.hi >> s2 - 48, 0, 0);
      };
      MlInt64.prototype.shift_right = function(s2) {
        s2 = s2 & 63;
        if (s2 === 0) return this;
        var h = this.hi << 16 >> 16;
        if (s2 < 24)
          return new MlInt64(
            this.lo >> s2 | this.mi << 24 - s2,
            this.mi >> s2 | h << 24 - s2,
            this.hi << 16 >> s2 >>> 16
          );
        var sign = this.hi << 16 >> 31;
        if (s2 < 48)
          return new MlInt64(
            this.mi >> s2 - 24 | this.hi << 48 - s2,
            this.hi << 16 >> s2 - 24 >> 16,
            sign & 65535
          );
        return new MlInt64(this.hi << 16 >> s2 - 32, sign, sign);
      };
      MlInt64.prototype.lsl1 = function() {
        this.hi = this.hi << 1 | this.mi >> 23;
        this.mi = (this.mi << 1 | this.lo >> 23) & 16777215;
        this.lo = this.lo << 1 & 16777215;
      };
      MlInt64.prototype.lsr1 = function() {
        this.lo = (this.lo >>> 1 | this.mi << 23) & 16777215;
        this.mi = (this.mi >>> 1 | this.hi << 23) & 16777215;
        this.hi = this.hi >>> 1;
      };
      MlInt64.prototype.udivmod = function(x2) {
        var offset = 0, modulus = this.copy(), divisor = x2.copy(), quotient = new MlInt64(0, 0, 0);
        while (modulus.ucompare(divisor) > 0) {
          offset++;
          divisor.lsl1();
        }
        while (offset >= 0) {
          offset--;
          quotient.lsl1();
          if (modulus.ucompare(divisor) >= 0) {
            quotient.lo++;
            modulus = modulus.sub(divisor);
          }
          divisor.lsr1();
        }
        return { quotient, modulus };
      };
      MlInt64.prototype.div = function(y) {
        var x2 = this;
        if (y.isZero()) caml_raise_zero_divide();
        var sign = x2.hi ^ y.hi;
        if (x2.hi & 32768) x2 = x2.neg();
        if (y.hi & 32768) y = y.neg();
        var q = x2.udivmod(y).quotient;
        if (sign & 32768) q = q.neg();
        return q;
      };
      MlInt64.prototype.mod = function(y) {
        var x2 = this;
        if (y.isZero()) caml_raise_zero_divide();
        var sign = x2.hi;
        if (x2.hi & 32768) x2 = x2.neg();
        if (y.hi & 32768) y = y.neg();
        var r = x2.udivmod(y).modulus;
        if (sign & 32768) r = r.neg();
        return r;
      };
      MlInt64.prototype.toInt = function() {
        return this.lo | this.mi << 24;
      };
      MlInt64.prototype.toFloat = function() {
        return (this.hi << 16) * Math.pow(2, 32) + this.mi * Math.pow(2, 24) + this.lo;
      };
      MlInt64.prototype.toArray = function() {
        return [
          this.hi >> 8,
          this.hi & 255,
          this.mi >> 16,
          this.mi >> 8 & 255,
          this.mi & 255,
          this.lo >> 16,
          this.lo >> 8 & 255,
          this.lo & 255
        ];
      };
      MlInt64.prototype.lo32 = function() {
        return this.lo | (this.mi & 255) << 24;
      };
      MlInt64.prototype.hi32 = function() {
        return this.mi >>> 8 & 65535 | this.hi << 16;
      };
      function MlMutex() {
        this.locked = false;
      }
      function MlNat(x2) {
        this.data = new Int32Array(x2);
        this.length = this.data.length + 2;
      }
      MlNat.prototype.caml_custom = "_nat";
      function caml_raise_nodejs_error(err, raise_unix, cmd) {
        var unix_error2 = caml_named_value("Unix.Unix_error");
        if (raise_unix && unix_error2) {
          var args = make_unix_err_args(err.code, cmd || err.syscall, err.path, err.errno);
          caml_raise_with_args(unix_error2, args);
        } else
          caml_raise_sys_error(err.toString());
      }
      function caml_int64_of_float(x2) {
        if (x2 < 0) x2 = Math.ceil(x2);
        return new MlInt64(
          x2 & 16777215,
          Math.floor(x2 * caml_int64_offset) & 16777215,
          Math.floor(x2 * caml_int64_offset * caml_int64_offset) & 65535
        );
      }
      function fs_node_stats_from_js(js_stats, large) {
        var file_kind;
        if (js_stats.isFile())
          file_kind = 0;
        else if (js_stats.isDirectory())
          file_kind = 1;
        else if (js_stats.isCharacterDevice())
          file_kind = 2;
        else if (js_stats.isBlockDevice())
          file_kind = 3;
        else if (js_stats.isSymbolicLink())
          file_kind = 4;
        else if (js_stats.isFIFO())
          file_kind = 5;
        else if (js_stats.isSocket()) file_kind = 6;
        return [
          0,
          js_stats.dev,
          js_stats.ino | 0,
          file_kind,
          js_stats.mode,
          js_stats.nlink,
          js_stats.uid,
          js_stats.gid,
          js_stats.rdev,
          large ? caml_int64_of_float(js_stats.size) : js_stats.size | 0,
          js_stats.atimeMs / 1e3,
          js_stats.mtimeMs / 1e3,
          js_stats.ctimeMs / 1e3
        ];
      }
      function caml_ml_string_length(s2) {
        return s2.length;
      }
      function caml_string_unsafe_get(s2, i) {
        return s2.charCodeAt(i);
      }
      function caml_uint8_array_of_string(s2) {
        var l = caml_ml_string_length(s2), a = new Uint8Array(l), i = 0;
        for (; i < l; i++) a[i] = caml_string_unsafe_get(s2, i);
        return a;
      }
      function caml_bytes_bound_error() {
        caml_invalid_argument("index out of bounds");
      }
      function caml_bytes_unsafe_set(s2, i, c) {
        c &= 255;
        if (s2.t !== 4) {
          if (i === s2.c.length) {
            s2.c += String.fromCharCode(c);
            if (i + 1 === s2.l) s2.t = 0;
            return 0;
          }
          caml_convert_bytes_to_array(s2);
        }
        s2.c[i] = c;
        return 0;
      }
      function caml_bytes_set(s2, i, c) {
        if (i >>> 0 >= s2.l) caml_bytes_bound_error();
        return caml_bytes_unsafe_set(s2, i, c);
      }
      function MlNodeFd(fd, flags) {
        this.fs = __require2("fs");
        this.fd = fd;
        this.flags = flags;
        var stats = this.fs.fstatSync(fd);
        flags.noSeek = stats.isCharacterDevice() || stats.isFIFO() || stats.isSocket();
        this.offset = this.flags.append ? stats.size : 0;
        this.seeked = false;
      }
      MlNodeFd.prototype = new MlFile();
      MlNodeFd.prototype.constructor = MlNodeFd;
      MlNodeFd.prototype.truncate = function(len, raise_unix) {
        try {
          this.fs.ftruncateSync(this.fd, len | 0);
          if (this.offset > len) this.offset = len;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeFd.prototype.length = function() {
        try {
          return this.fs.fstatSync(this.fd).size;
        } catch (err) {
          caml_raise_sys_error(err.toString());
        }
      };
      MlNodeFd.prototype.write = function(buf, buf_offset, len, raise_unix) {
        try {
          if (this.flags.noSeek || !this.seeked)
            var written = this.fs.writeSync(this.fd, buf, buf_offset, len);
          else
            var written = this.fs.writeSync(this.fd, buf, buf_offset, len, this.offset);
          this.offset += written;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
        return written;
      };
      MlNodeFd.prototype.read = function(a, buf_offset, len, raise_unix) {
        try {
          if (this.flags.noSeek || !this.seeked)
            var read = this.fs.readSync(this.fd, a, buf_offset, len);
          else
            var read = this.fs.readSync(this.fd, a, buf_offset, len, this.offset);
          this.offset += read;
          return read;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeFd.prototype.seek = function(offset, whence, raise_unix) {
        if (this.flags.noSeek)
          caml_raise_system_error(raise_unix, "ESPIPE", "lseek", "illegal seek");
        switch (whence) {
          case 0:
            break;
          case 1:
            offset += this.offset;
            break;
          case 2:
            offset += this.length();
            break;
        }
        if (offset < 0)
          caml_raise_system_error(raise_unix, "EINVAL", "lseek", "invalid argument");
        this.offset = offset;
        this.seeked = true;
        return this.offset;
      };
      MlNodeFd.prototype.stat = function(large) {
        try {
          var js_stats = this.fs.fstatSync(this.fd);
          return fs_node_stats_from_js(js_stats, large);
        } catch (err) {
          caml_raise_nodejs_error(err, 1);
        }
      };
      MlNodeFd.prototype.close = function(raise_unix) {
        try {
          this.fs.closeSync(this.fd);
          return 0;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeFd.prototype.check_stream_semantics = function(cmd) {
        try {
          var js_stats = this.fs.fstatSync(this.fd);
        } catch (err) {
          caml_raise_nodejs_error(err, 1, cmd);
        }
        if (!(js_stats.isFile() || js_stats.isCharacterDevice() || js_stats.isFIFO() || js_stats.isSocket()))
          caml_raise_system_error(1, "EINVAL", cmd, "invalid argument");
      };
      function MlNodeDevice(root) {
        this.fs = __require2("fs");
        this.root = root;
      }
      MlNodeDevice.prototype.nm = function(name) {
        return this.root + name;
      };
      MlNodeDevice.prototype.exists = function(name) {
        try {
          return this.fs.existsSync(this.nm(name)) ? 1 : 0;
        } catch (err) {
          return 0;
        }
      };
      MlNodeDevice.prototype.isFile = function(name) {
        try {
          return this.fs.statSync(this.nm(name)).isFile() ? 1 : 0;
        } catch (err) {
          caml_raise_sys_error(err.toString());
        }
      };
      MlNodeDevice.prototype.mkdir = function(name, mode, raise_unix) {
        try {
          this.fs.mkdirSync(this.nm(name), { mode });
          return 0;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.rmdir = function(name, raise_unix) {
        try {
          this.fs.rmdirSync(this.nm(name));
          return 0;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.readdir = function(name, raise_unix) {
        try {
          return this.fs.readdirSync(this.nm(name));
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.is_dir = function(name) {
        try {
          return this.fs.statSync(this.nm(name)).isDirectory() ? 1 : 0;
        } catch (err) {
          caml_raise_sys_error(err.toString());
        }
      };
      MlNodeDevice.prototype.unlink = function(name, raise_unix) {
        try {
          this.fs.unlinkSync(this.nm(name));
          return 0;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.utimes = function(name, atime, mtime, raise_unix) {
        try {
          if (atime === 0 && mtime === 0) {
            atime = (/* @__PURE__ */ new Date()).getTime() / 1e3;
            mtime = atime;
          }
          this.fs.utimesSync(this.nm(name), atime, mtime);
          return 0;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.truncate = function(name, len, raise_unix) {
        try {
          this.fs.truncateSync(this.nm(name), len | 0);
          return 0;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.open = function(name, f, perms, raise_unix) {
        var consts = __require2("constants"), res = 0;
        for (var key in f)
          switch (key) {
            case "rdonly":
              res |= consts.O_RDONLY;
              break;
            case "wronly":
              res |= consts.O_WRONLY;
              break;
            case "rdwr":
              res |= consts.O_RDWR;
              break;
            case "append":
              res |= consts.O_APPEND;
              break;
            case "create":
              res |= consts.O_CREAT;
              break;
            case "truncate":
              res |= consts.O_TRUNC;
              break;
            case "excl":
              res |= consts.O_EXCL;
              break;
            case "binary":
              res |= consts.O_BINARY;
              break;
            case "text":
              res |= consts.O_TEXT;
              break;
            case "nonblock":
              res |= consts.O_NONBLOCK;
              break;
            case "noctty":
              res |= consts.O_NOCTTY;
              break;
            case "dsync":
              res |= consts.O_DSYNC;
              break;
            case "sync":
              res |= consts.O_SYNC;
              break;
          }
        try {
          var fd = this.fs.openSync(this.nm(name), res, perms);
          return new MlNodeFd(fd, f);
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      if (((_a = globalThis.process) == null ? void 0 : _a.platform) === "win32")
        MlNodeDevice.prototype.rename = function(o, n, raise_unix) {
          try {
            var target = this.nm(n), source = this.nm(o), target_stats, source_stats;
            if ((target_stats = this.fs.statSync(target, { throwIfNoEntry: false })) && (source_stats = this.fs.statSync(source, { throwIfNoEntry: false })) && source_stats.isDirectory())
              if (target_stats.isDirectory()) {
                if (!target.startsWith(source))
                  try {
                    this.fs.rmdirSync(target);
                  } catch {
                  }
              } else {
                var err = new Error(`ENOTDIR: not a directory, rename '${source}' -> '${target}'`);
                throw Object.assign(
                  err,
                  {
                    errno: -20,
                    code: "ENOTDIR",
                    syscall: "rename",
                    path: target
                  }
                );
              }
            this.fs.renameSync(this.nm(o), this.nm(n));
          } catch (err2) {
            caml_raise_nodejs_error(err2, raise_unix);
          }
        };
      else
        MlNodeDevice.prototype.rename = function(o, n, raise_unix) {
          try {
            this.fs.renameSync(this.nm(o), this.nm(n));
          } catch (err) {
            caml_raise_nodejs_error(err, raise_unix);
          }
        };
      MlNodeDevice.prototype.stat = function(name, large, raise_unix) {
        try {
          var js_stats = this.fs.statSync(this.nm(name));
          return fs_node_stats_from_js(js_stats, large);
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.lstat = function(name, large, raise_unix) {
        try {
          var js_stats = this.fs.lstatSync(this.nm(name));
          return fs_node_stats_from_js(js_stats, large);
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.symlink = function(to_dir, target, path, raise_unix) {
        try {
          this.fs.symlinkSync(
            target,
            this.nm(path),
            to_dir === 0 ? null : to_dir[1] ? "dir" : "file"
          );
          return 0;
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.readlink = function(name, raise_unix) {
        try {
          var link = this.fs.readlinkSync(this.nm(name), "utf8");
          return caml_string_of_jsstring(link);
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.opendir = function(name, raise_unix) {
        try {
          return this.fs.opendirSync(this.nm(name));
        } catch (err) {
          caml_raise_nodejs_error(err, raise_unix);
        }
      };
      MlNodeDevice.prototype.constructor = MlNodeDevice;
      var MlObjectTable;
      if (typeof globalThis.Map === "undefined")
        MlObjectTable = function() {
          function NaiveLookup(objs) {
            this.objs = objs;
          }
          NaiveLookup.prototype.get = function(v) {
            for (var i = 0; i < this.objs.length; i++)
              if (this.objs[i] === v) return i;
          };
          NaiveLookup.prototype.set = function() {
          };
          return function() {
            this.objs = [];
            this.lookup = new NaiveLookup(this.objs);
          };
        }();
      else
        MlObjectTable = function() {
          this.objs = [];
          this.lookup = new globalThis.Map();
        };
      MlObjectTable.prototype.store = function(v) {
        this.lookup.set(v, this.objs.length);
        this.objs.push(v);
      };
      MlObjectTable.prototype.recall = function(v) {
        var i = this.lookup.get(v);
        return i === void 0 ? void 0 : this.objs.length - i;
      };
      function MlStringReader(s2, i) {
        this.s = caml_jsbytes_of_string(s2);
        this.i = i;
      }
      MlStringReader.prototype = {
        read8u: function() {
          return this.s.charCodeAt(this.i++);
        },
        read8s: function() {
          return this.s.charCodeAt(this.i++) << 24 >> 24;
        },
        read16u: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 2;
          return s2.charCodeAt(i) << 8 | s2.charCodeAt(i + 1);
        },
        read16s: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 2;
          return s2.charCodeAt(i) << 24 >> 16 | s2.charCodeAt(i + 1);
        },
        read32u: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 4;
          return (s2.charCodeAt(i) << 24 | s2.charCodeAt(i + 1) << 16 | s2.charCodeAt(i + 2) << 8 | s2.charCodeAt(i + 3)) >>> 0;
        },
        read32s: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 4;
          return s2.charCodeAt(i) << 24 | s2.charCodeAt(i + 1) << 16 | s2.charCodeAt(i + 2) << 8 | s2.charCodeAt(i + 3);
        },
        readstr: function(len) {
          var i = this.i;
          this.i = i + len;
          return caml_string_of_jsbytes(this.s.slice(i, i + len));
        },
        readuint8array: function(len) {
          var b = new Uint8Array(len), s2 = this.s, i = this.i;
          for (var j = 0; j < len; j++) b[j] = s2.charCodeAt(i + j);
          this.i = i + len;
          return b;
        }
      };
      var caml_packFloat16 = function() {
        const INVERSE_OF_EPSILON = 1 / Number.EPSILON;
        function roundTiesToEven(num) {
          return num + INVERSE_OF_EPSILON - INVERSE_OF_EPSILON;
        }
        const FLOAT16_MIN_VALUE = 6103515625e-14, FLOAT16_MAX_VALUE = 65504, FLOAT16_EPSILON = 9765625e-10, FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE = FLOAT16_EPSILON * FLOAT16_MIN_VALUE, FLOAT16_EPSILON_DEVIDED_BY_EPSILON = FLOAT16_EPSILON * INVERSE_OF_EPSILON;
        function roundToFloat16(num) {
          const number = +num;
          if (!Number.isFinite(number) || number === 0) return number;
          const sign = number > 0 ? 1 : -1, absolute = Math.abs(number);
          if (absolute < FLOAT16_MIN_VALUE)
            return sign * roundTiesToEven(absolute / FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE) * FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE;
          const temp = (1 + FLOAT16_EPSILON_DEVIDED_BY_EPSILON) * absolute, result = temp - (temp - absolute);
          if (result > FLOAT16_MAX_VALUE || Number.isNaN(result))
            return sign * Number.POSITIVE_INFINITY;
          return sign * result;
        }
        const baseTable = new Uint16Array(512), shiftTable = new Uint8Array(512);
        for (let i = 0; i < 256; ++i) {
          const e = i - 127;
          if (e < -24) {
            baseTable[i] = 0;
            baseTable[i | 256] = 32768;
            shiftTable[i] = 24;
            shiftTable[i | 256] = 24;
          } else if (e < -14) {
            baseTable[i] = 1024 >> -e - 14;
            baseTable[i | 256] = 1024 >> -e - 14 | 32768;
            shiftTable[i] = -e - 1;
            shiftTable[i | 256] = -e - 1;
          } else if (e <= 15) {
            baseTable[i] = e + 15 << 10;
            baseTable[i | 256] = e + 15 << 10 | 32768;
            shiftTable[i] = 13;
            shiftTable[i | 256] = 13;
          } else if (e < 128) {
            baseTable[i] = 31744;
            baseTable[i | 256] = 64512;
            shiftTable[i] = 24;
            shiftTable[i | 256] = 24;
          } else {
            baseTable[i] = 31744;
            baseTable[i | 256] = 64512;
            shiftTable[i] = 13;
            shiftTable[i | 256] = 13;
          }
        }
        const buffer = new ArrayBuffer(4), floatView = new Float32Array(buffer), uint32View = new Uint32Array(buffer);
        return function(num) {
          floatView[0] = roundToFloat16(num);
          const f = uint32View[0], e = f >> 23 & 511;
          return baseTable[e] + ((f & 8388607) >> shiftTable[e]);
        };
      }(), caml_unpackFloat16 = function() {
        var pow = Math.pow, EXP_MASK16 = 31, SIGNIFICAND_MASK16 = 1023, MIN_SUBNORMAL16 = pow(2, -24), SIGNIFICAND_DENOM16 = 9765625e-10;
        return function(bytes) {
          var sign = bytes >>> 15, exponent = bytes >>> 10 & EXP_MASK16, significand = bytes & SIGNIFICAND_MASK16;
          if (exponent === EXP_MASK16)
            return significand === 0 ? sign === 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : Number.NaN;
          if (exponent === 0)
            return significand * (sign === 0 ? MIN_SUBNORMAL16 : -MIN_SUBNORMAL16);
          var r = pow(2, exponent - 15) * (sign === 0 ? 1 + significand * SIGNIFICAND_DENOM16 : -1 - significand * SIGNIFICAND_DENOM16);
          return r;
        };
      }();
      function caml_int64_create_lo_hi(lo, hi) {
        return new MlInt64(
          lo & 16777215,
          lo >>> 24 & 255 | (hi & 65535) << 8,
          hi >>> 16 & 65535
        );
      }
      function caml_int64_hi32(v) {
        return v.hi32();
      }
      function caml_int64_lo32(v) {
        return v.lo32();
      }
      function caml_array_bound_error() {
        caml_invalid_argument("index out of bounds");
      }
      var caml_ba_custom_name = "_bigarr02";
      function Ml_Bigarray(kind, layout, dims, buffer) {
        this.kind = kind;
        this.layout = layout;
        this.dims = dims;
        this.data = buffer;
      }
      Ml_Bigarray.prototype.caml_custom = caml_ba_custom_name;
      Ml_Bigarray.prototype.offset = function(arg) {
        var ofs = 0;
        if (typeof arg === "number") arg = [arg];
        if (!Array.isArray(arg))
          caml_invalid_argument("bigarray.js: invalid offset");
        if (this.dims.length !== arg.length)
          caml_invalid_argument("Bigarray.get/set: bad number of dimensions");
        if (this.layout === 0)
          for (var i = 0; i < this.dims.length; i++) {
            if (arg[i] < 0 || arg[i] >= this.dims[i]) caml_array_bound_error();
            ofs = ofs * this.dims[i] + arg[i];
          }
        else
          for (var i = this.dims.length - 1; i >= 0; i--) {
            if (arg[i] < 1 || arg[i] > this.dims[i]) caml_array_bound_error();
            ofs = ofs * this.dims[i] + (arg[i] - 1);
          }
        return ofs;
      };
      Ml_Bigarray.prototype.get = function(ofs) {
        switch (this.kind) {
          case 7:
            var l = this.data[ofs * 2 + 0], h = this.data[ofs * 2 + 1];
            return caml_int64_create_lo_hi(l, h);
          case 10:
          case 11:
            var r = this.data[ofs * 2 + 0], i = this.data[ofs * 2 + 1];
            return [254, r, i];
          case 13:
            return caml_unpackFloat16(this.data[ofs]);
          default:
            return this.data[ofs];
        }
      };
      Ml_Bigarray.prototype.set = function(ofs, v) {
        switch (this.kind) {
          case 7:
            this.data[ofs * 2 + 0] = caml_int64_lo32(v);
            this.data[ofs * 2 + 1] = caml_int64_hi32(v);
            break;
          case 10:
          case 11:
            this.data[ofs * 2 + 0] = v[1];
            this.data[ofs * 2 + 1] = v[2];
            break;
          case 13:
            this.data[ofs] = caml_packFloat16(v);
            break;
          default:
            this.data[ofs] = v;
            break;
        }
        return 0;
      };
      Ml_Bigarray.prototype.fill = function(v) {
        switch (this.kind) {
          case 7:
            var a = caml_int64_lo32(v), b = caml_int64_hi32(v);
            if (a === b)
              this.data.fill(a);
            else
              for (var i = 0; i < this.data.length; i++)
                this.data[i] = i % 2 === 0 ? a : b;
            break;
          case 10:
          case 11:
            var im = v[1], re = v[2];
            if (im === re)
              this.data.fill(im);
            else
              for (var i = 0; i < this.data.length; i++)
                this.data[i] = i % 2 === 0 ? im : re;
            break;
          case 13:
            this.data.fill(caml_packFloat16(v));
            break;
          default:
            this.data.fill(v);
            break;
        }
      };
      Ml_Bigarray.prototype.compare = function(b, total) {
        if (this.layout !== b.layout || this.kind !== b.kind) {
          var k1 = this.kind | this.layout << 8, k2 = b.kind | b.layout << 8;
          return k2 - k1;
        }
        if (this.dims.length !== b.dims.length)
          return b.dims.length - this.dims.length;
        for (var i = 0; i < this.dims.length; i++)
          if (this.dims[i] !== b.dims[i])
            return this.dims[i] < b.dims[i] ? -1 : 1;
        switch (this.kind) {
          case 0:
          case 1:
          case 10:
          case 11:
            var x2, y;
            for (var i = 0; i < this.data.length; i++) {
              x2 = this.data[i];
              y = b.data[i];
              if (x2 < y) return -1;
              if (x2 > y) return 1;
              if (x2 !== y) {
                if (!total) return Number.NaN;
                if (!Number.isNaN(x2)) return 1;
                if (!Number.isNaN(y)) return -1;
              }
            }
            break;
          case 7:
            for (var i = 0; i < this.data.length; i += 2) {
              if (this.data[i + 1] < b.data[i + 1]) return -1;
              if (this.data[i + 1] > b.data[i + 1]) return 1;
              if (this.data[i] >>> 0 < b.data[i] >>> 0) return -1;
              if (this.data[i] >>> 0 > b.data[i] >>> 0) return 1;
            }
            break;
          case 13:
            for (var i = 0; i < this.data.length; i++) {
              var aa = caml_unpackFloat16(this.data[i]), bb = caml_unpackFloat16(b.data[i]);
              if (aa < bb) return -1;
              if (aa > bb) return 1;
            }
            break;
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 8:
          case 9:
          case 12:
            for (var i = 0; i < this.data.length; i++) {
              if (this.data[i] < b.data[i]) return -1;
              if (this.data[i] > b.data[i]) return 1;
            }
            break;
        }
        return 0;
      };
      function Ml_Bigarray_c_1_1(kind, layout, dims, buffer) {
        this.kind = kind;
        this.layout = layout;
        this.dims = dims;
        this.data = buffer;
      }
      Ml_Bigarray_c_1_1.prototype = new Ml_Bigarray();
      Ml_Bigarray_c_1_1.prototype.offset = function(arg) {
        if (typeof arg !== "number")
          if (Array.isArray(arg) && arg.length === 1)
            arg = arg[0];
          else
            caml_invalid_argument("Ml_Bigarray_c_1_1.offset");
        if (arg < 0 || arg >= this.dims[0]) caml_array_bound_error();
        return arg;
      };
      Ml_Bigarray_c_1_1.prototype.get = function(ofs) {
        return this.data[ofs];
      };
      Ml_Bigarray_c_1_1.prototype.set = function(ofs, v) {
        this.data[ofs] = v;
        return 0;
      };
      Ml_Bigarray_c_1_1.prototype.fill = function(v) {
        this.data.fill(v);
        return 0;
      };
      function UInt8ArrayReader(s2, i) {
        this.s = s2;
        this.i = i;
      }
      UInt8ArrayReader.prototype = {
        read8u: function() {
          return this.s[this.i++];
        },
        read8s: function() {
          return this.s[this.i++] << 24 >> 24;
        },
        read16u: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 2;
          return s2[i] << 8 | s2[i + 1];
        },
        read16s: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 2;
          return s2[i] << 24 >> 16 | s2[i + 1];
        },
        read32u: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 4;
          return (s2[i] << 24 | s2[i + 1] << 16 | s2[i + 2] << 8 | s2[i + 3]) >>> 0;
        },
        read32s: function() {
          var s2 = this.s, i = this.i;
          this.i = i + 4;
          return s2[i] << 24 | s2[i + 1] << 16 | s2[i + 2] << 8 | s2[i + 3];
        },
        readstr: function(len) {
          var i = this.i;
          this.i = i + len;
          return caml_string_of_uint8_array(this.s.subarray(i, i + len));
        },
        readuint8array: function(len) {
          var i = this.i;
          this.i = i + len;
          return this.s.subarray(i, i + len);
        }
      };
      function incr_nat(nat, ofs, len, carry_in) {
        var carry = carry_in;
        for (var i = 0; i < len; i++) {
          var x2 = (nat.data[ofs + i] >>> 0) + carry;
          nat.data[ofs + i] = x2 | 0;
          if (x2 === x2 >>> 0) {
            carry = 0;
            break;
          } else carry = 1;
        }
        return carry;
      }
      function add_nat(nat1, ofs1, len1, nat2, ofs2, len2, carry_in) {
        var carry = carry_in;
        for (var i = 0; i < len2; i++) {
          var x2 = (nat1.data[ofs1 + i] >>> 0) + (nat2.data[ofs2 + i] >>> 0) + carry;
          nat1.data[ofs1 + i] = x2;
          if (x2 === x2 >>> 0) carry = 0;
          else carry = 1;
        }
        return incr_nat(nat1, ofs1 + len2, len1 - len2, carry);
      }
      function caml_ba_get_size(dims) {
        var n_dims = dims.length, size = 1;
        for (var i = 0; i < n_dims; i++) {
          if (dims[i] < 0)
            caml_invalid_argument("Bigarray.create: negative dimension");
          size = size * dims[i];
        }
        return size;
      }
      function caml_ba_get_size_per_element(kind) {
        switch (kind) {
          case 7:
          case 10:
          case 11:
            return 2;
          default:
            return 1;
        }
      }
      function caml_ba_create_unsafe(kind, layout, dims, data) {
        var size_per_element = caml_ba_get_size_per_element(kind);
        if (caml_ba_get_size(dims) * size_per_element !== data.length)
          caml_invalid_argument("length doesn't match dims");
        if (layout === 0 && dims.length === 1 && size_per_element === 1 && kind !== 13)
          return new Ml_Bigarray_c_1_1(kind, layout, dims, data);
        return new Ml_Bigarray(kind, layout, dims, data);
      }
      function bigstring_of_array_buffer(ab) {
        var ta = new Uint8Array(ab);
        return caml_ba_create_unsafe(12, 0, [ta.length], ta);
      }
      function bigstring_of_typed_array(ba) {
        var ta = new Uint8Array(ba.buffer, ba.byteOffset, ba.length * ba.BYTES_PER_ELEMENT);
        return caml_ba_create_unsafe(12, 0, [ta.length], ta);
      }
      function bigstring_to_array_buffer(bs) {
        return bs.data.buffer;
      }
      function bigstring_to_typed_array(bs) {
        return bs.data;
      }
      var blake2b = function() {
        function ADD64AA(v2, a, b) {
          const o0 = v2[a] + v2[b];
          let o1 = v2[a + 1] + v2[b + 1];
          if (o0 >= 4294967296) o1++;
          v2[a] = o0;
          v2[a + 1] = o1;
        }
        function ADD64AC(v2, a, b0, b1) {
          let o0 = v2[a] + b0;
          if (b0 < 0) o0 += 4294967296;
          let o1 = v2[a + 1] + b1;
          if (o0 >= 4294967296) o1++;
          v2[a] = o0;
          v2[a + 1] = o1;
        }
        function B2B_GET32(arr, i) {
          return arr[i] ^ arr[i + 1] << 8 ^ arr[i + 2] << 16 ^ arr[i + 3] << 24;
        }
        function B2B_G(a, b, c, d, ix, iy) {
          const x0 = m[ix], x1 = m[ix + 1], y0 = m[iy], y1 = m[iy + 1];
          ADD64AA(v, a, b);
          ADD64AC(v, a, x0, x1);
          let xor0 = v[d] ^ v[a], xor1 = v[d + 1] ^ v[a + 1];
          v[d] = xor1;
          v[d + 1] = xor0;
          ADD64AA(v, c, d);
          xor0 = v[b] ^ v[c];
          xor1 = v[b + 1] ^ v[c + 1];
          v[b] = xor0 >>> 24 ^ xor1 << 8;
          v[b + 1] = xor1 >>> 24 ^ xor0 << 8;
          ADD64AA(v, a, b);
          ADD64AC(v, a, y0, y1);
          xor0 = v[d] ^ v[a];
          xor1 = v[d + 1] ^ v[a + 1];
          v[d] = xor0 >>> 16 ^ xor1 << 16;
          v[d + 1] = xor1 >>> 16 ^ xor0 << 16;
          ADD64AA(v, c, d);
          xor0 = v[b] ^ v[c];
          xor1 = v[b + 1] ^ v[c + 1];
          v[b] = xor1 >>> 31 ^ xor0 << 1;
          v[b + 1] = xor0 >>> 31 ^ xor1 << 1;
        }
        const BLAKE2B_IV32 = new Uint32Array([
          4089235720,
          1779033703,
          2227873595,
          3144134277,
          4271175723,
          1013904242,
          1595750129,
          2773480762,
          2917565137,
          1359893119,
          725511199,
          2600822924,
          4215389547,
          528734635,
          327033209,
          1541459225
        ]), SIGMA8 = [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          14,
          10,
          4,
          8,
          9,
          15,
          13,
          6,
          1,
          12,
          0,
          2,
          11,
          7,
          5,
          3,
          11,
          8,
          12,
          0,
          5,
          2,
          15,
          13,
          10,
          14,
          3,
          6,
          7,
          1,
          9,
          4,
          7,
          9,
          3,
          1,
          13,
          12,
          11,
          14,
          2,
          6,
          5,
          10,
          4,
          0,
          15,
          8,
          9,
          0,
          5,
          7,
          2,
          4,
          10,
          15,
          14,
          1,
          11,
          12,
          6,
          8,
          3,
          13,
          2,
          12,
          6,
          10,
          0,
          11,
          8,
          3,
          4,
          13,
          7,
          5,
          15,
          14,
          1,
          9,
          12,
          5,
          1,
          15,
          14,
          13,
          4,
          10,
          0,
          7,
          6,
          3,
          9,
          2,
          8,
          11,
          13,
          11,
          7,
          14,
          12,
          1,
          3,
          9,
          5,
          0,
          15,
          4,
          8,
          6,
          2,
          10,
          6,
          15,
          14,
          9,
          11,
          3,
          0,
          8,
          12,
          2,
          13,
          7,
          1,
          4,
          10,
          5,
          10,
          2,
          8,
          4,
          7,
          6,
          1,
          5,
          15,
          11,
          9,
          14,
          3,
          12,
          13,
          0,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          14,
          10,
          4,
          8,
          9,
          15,
          13,
          6,
          1,
          12,
          0,
          2,
          11,
          7,
          5,
          3
        ], SIGMA82 = new Uint8Array(SIGMA8.map(function(x2) {
          return x2 * 2;
        })), v = new Uint32Array(32), m = new Uint32Array(32);
        function blake2bCompress(ctx, last) {
          let i = 0;
          for (i = 0; i < 16; i++) {
            v[i] = ctx.h[i];
            v[i + 16] = BLAKE2B_IV32[i];
          }
          v[24] = v[24] ^ ctx.t;
          v[25] = v[25] ^ ctx.t / 4294967296;
          if (last) {
            v[28] = ~v[28];
            v[29] = ~v[29];
          }
          for (i = 0; i < 32; i++) m[i] = B2B_GET32(ctx.b, 4 * i);
          for (i = 0; i < 12; i++) {
            B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
            B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
            B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
            B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
            B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
            B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
            B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
            B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
          }
          for (i = 0; i < 16; i++) ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
        }
        const parameterBlock = new Uint8Array([
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]);
        function blake2bInit(outlen, key) {
          if (outlen === 0 || outlen > 64)
            throw new Error("Illegal output length, expected 0 < length <= 64");
          if (key.length > 64)
            throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
          const ctx = {
            b: new Uint8Array(128),
            h: new Uint32Array(16),
            t: 0,
            c: 0,
            outlen
          };
          parameterBlock.fill(0);
          parameterBlock[0] = outlen;
          parameterBlock[1] = key.length;
          parameterBlock[2] = 1;
          parameterBlock[3] = 1;
          for (let i = 0; i < 16; i++)
            ctx.h[i] = BLAKE2B_IV32[i] ^ B2B_GET32(parameterBlock, i * 4);
          if (key.length > 0) {
            blake2bUpdate(ctx, key);
            ctx.c = 128;
          }
          return ctx;
        }
        function blake2bUpdate(ctx, input) {
          for (let i = 0; i < input.length; i++) {
            if (ctx.c === 128) {
              ctx.t += ctx.c;
              blake2bCompress(ctx, false);
              ctx.c = 0;
            }
            ctx.b[ctx.c++] = input[i];
          }
        }
        function blake2bFinal(ctx) {
          ctx.t += ctx.c;
          while (ctx.c < 128) ctx.b[ctx.c++] = 0;
          blake2bCompress(ctx, true);
          const out = new Uint8Array(ctx.outlen);
          for (let i = 0; i < ctx.outlen; i++)
            out[i] = ctx.h[i >> 2] >> 8 * (i & 3);
          return out;
        }
        return { Init: blake2bInit, Update: blake2bUpdate, Final: blake2bFinal };
      }();
      function blit_nat(nat1, ofs1, nat2, ofs2, len) {
        for (var i = 0; i < len; i++) nat1.data[ofs1 + i] = nat2.data[ofs2 + i];
        return 0;
      }
      var caml_MD5Transform = /* @__PURE__ */ function() {
        function add(x2, y) {
          return x2 + y | 0;
        }
        function xx(q, a, b, x2, s2, t) {
          a = add(add(a, q), add(x2, t));
          return add(a << s2 | a >>> 32 - s2, b);
        }
        function ff(a, b, c, d, x2, s2, t) {
          return xx(b & c | ~b & d, a, b, x2, s2, t);
        }
        function gg(a, b, c, d, x2, s2, t) {
          return xx(b & d | c & ~d, a, b, x2, s2, t);
        }
        function hh(a, b, c, d, x2, s2, t) {
          return xx(b ^ c ^ d, a, b, x2, s2, t);
        }
        function ii(a, b, c, d, x2, s2, t) {
          return xx(c ^ (b | ~d), a, b, x2, s2, t);
        }
        return function(w, buffer) {
          var a = w[0], b = w[1], c = w[2], d = w[3];
          a = ff(a, b, c, d, buffer[0], 7, 3614090360);
          d = ff(d, a, b, c, buffer[1], 12, 3905402710);
          c = ff(c, d, a, b, buffer[2], 17, 606105819);
          b = ff(b, c, d, a, buffer[3], 22, 3250441966);
          a = ff(a, b, c, d, buffer[4], 7, 4118548399);
          d = ff(d, a, b, c, buffer[5], 12, 1200080426);
          c = ff(c, d, a, b, buffer[6], 17, 2821735955);
          b = ff(b, c, d, a, buffer[7], 22, 4249261313);
          a = ff(a, b, c, d, buffer[8], 7, 1770035416);
          d = ff(d, a, b, c, buffer[9], 12, 2336552879);
          c = ff(c, d, a, b, buffer[10], 17, 4294925233);
          b = ff(b, c, d, a, buffer[11], 22, 2304563134);
          a = ff(a, b, c, d, buffer[12], 7, 1804603682);
          d = ff(d, a, b, c, buffer[13], 12, 4254626195);
          c = ff(c, d, a, b, buffer[14], 17, 2792965006);
          b = ff(b, c, d, a, buffer[15], 22, 1236535329);
          a = gg(a, b, c, d, buffer[1], 5, 4129170786);
          d = gg(d, a, b, c, buffer[6], 9, 3225465664);
          c = gg(c, d, a, b, buffer[11], 14, 643717713);
          b = gg(b, c, d, a, buffer[0], 20, 3921069994);
          a = gg(a, b, c, d, buffer[5], 5, 3593408605);
          d = gg(d, a, b, c, buffer[10], 9, 38016083);
          c = gg(c, d, a, b, buffer[15], 14, 3634488961);
          b = gg(b, c, d, a, buffer[4], 20, 3889429448);
          a = gg(a, b, c, d, buffer[9], 5, 568446438);
          d = gg(d, a, b, c, buffer[14], 9, 3275163606);
          c = gg(c, d, a, b, buffer[3], 14, 4107603335);
          b = gg(b, c, d, a, buffer[8], 20, 1163531501);
          a = gg(a, b, c, d, buffer[13], 5, 2850285829);
          d = gg(d, a, b, c, buffer[2], 9, 4243563512);
          c = gg(c, d, a, b, buffer[7], 14, 1735328473);
          b = gg(b, c, d, a, buffer[12], 20, 2368359562);
          a = hh(a, b, c, d, buffer[5], 4, 4294588738);
          d = hh(d, a, b, c, buffer[8], 11, 2272392833);
          c = hh(c, d, a, b, buffer[11], 16, 1839030562);
          b = hh(b, c, d, a, buffer[14], 23, 4259657740);
          a = hh(a, b, c, d, buffer[1], 4, 2763975236);
          d = hh(d, a, b, c, buffer[4], 11, 1272893353);
          c = hh(c, d, a, b, buffer[7], 16, 4139469664);
          b = hh(b, c, d, a, buffer[10], 23, 3200236656);
          a = hh(a, b, c, d, buffer[13], 4, 681279174);
          d = hh(d, a, b, c, buffer[0], 11, 3936430074);
          c = hh(c, d, a, b, buffer[3], 16, 3572445317);
          b = hh(b, c, d, a, buffer[6], 23, 76029189);
          a = hh(a, b, c, d, buffer[9], 4, 3654602809);
          d = hh(d, a, b, c, buffer[12], 11, 3873151461);
          c = hh(c, d, a, b, buffer[15], 16, 530742520);
          b = hh(b, c, d, a, buffer[2], 23, 3299628645);
          a = ii(a, b, c, d, buffer[0], 6, 4096336452);
          d = ii(d, a, b, c, buffer[7], 10, 1126891415);
          c = ii(c, d, a, b, buffer[14], 15, 2878612391);
          b = ii(b, c, d, a, buffer[5], 21, 4237533241);
          a = ii(a, b, c, d, buffer[12], 6, 1700485571);
          d = ii(d, a, b, c, buffer[3], 10, 2399980690);
          c = ii(c, d, a, b, buffer[10], 15, 4293915773);
          b = ii(b, c, d, a, buffer[1], 21, 2240044497);
          a = ii(a, b, c, d, buffer[8], 6, 1873313359);
          d = ii(d, a, b, c, buffer[15], 10, 4264355552);
          c = ii(c, d, a, b, buffer[6], 15, 2734768916);
          b = ii(b, c, d, a, buffer[13], 21, 1309151649);
          a = ii(a, b, c, d, buffer[4], 6, 4149444226);
          d = ii(d, a, b, c, buffer[11], 10, 3174756917);
          c = ii(c, d, a, b, buffer[2], 15, 718787259);
          b = ii(b, c, d, a, buffer[9], 21, 3951481745);
          w[0] = add(a, w[0]);
          w[1] = add(b, w[1]);
          w[2] = add(c, w[2]);
          w[3] = add(d, w[3]);
        };
      }();
      function caml_MD5Final(ctx) {
        var in_buf = ctx.len & 63;
        ctx.b8[in_buf] = 128;
        in_buf++;
        if (in_buf > 56) {
          for (var j = in_buf; j < 64; j++) ctx.b8[j] = 0;
          caml_MD5Transform(ctx.w, ctx.b32);
          for (var j = 0; j < 56; j++) ctx.b8[j] = 0;
        } else
          for (var j = in_buf; j < 56; j++) ctx.b8[j] = 0;
        ctx.b32[14] = ctx.len << 3;
        ctx.b32[15] = ctx.len >> 29 & 536870911;
        caml_MD5Transform(ctx.w, ctx.b32);
        var t = new Uint8Array(16);
        for (var i = 0; i < 4; i++)
          for (var j = 0; j < 4; j++) t[i * 4 + j] = ctx.w[i] >> 8 * j & 255;
        return t;
      }
      function caml_MD5Init() {
        var buffer = new ArrayBuffer(64), b32 = new Uint32Array(buffer), b8 = new Uint8Array(buffer);
        return {
          len: 0,
          w: new Uint32Array([1732584193, 4023233417, 2562383102, 271733878]),
          b32,
          b8
        };
      }
      function caml_MD5Update(ctx, input, input_len) {
        var in_buf = ctx.len & 63, input_pos = 0;
        ctx.len += input_len;
        if (in_buf) {
          var missing = 64 - in_buf;
          if (input_len < missing) {
            ctx.b8.set(input.subarray(0, input_len), in_buf);
            return;
          }
          ctx.b8.set(input.subarray(0, missing), in_buf);
          caml_MD5Transform(ctx.w, ctx.b32);
          input_len -= missing;
          input_pos += missing;
        }
        while (input_len >= 64) {
          ctx.b8.set(input.subarray(input_pos, input_pos + 64), 0);
          caml_MD5Transform(ctx.w, ctx.b32);
          input_len -= 64;
          input_pos += 64;
        }
        if (input_len)
          ctx.b8.set(input.subarray(input_pos, input_pos + input_len), 0);
      }
      function caml_acosh_float(x2) {
        return Math.acosh(x2);
      }
      function caml_call_gen(f, args) {
        var n = f.l >= 0 ? f.l : f.l = f.length, argsLen = args.length, d = n - argsLen;
        if (d === 0)
          return f(...args);
        else if (d < 0) {
          var g = f(...args.slice(0, n));
          if (typeof g !== "function") return g;
          return caml_call_gen(g, args.slice(n));
        } else {
          switch (d) {
            case 1: {
              var g = function(x2) {
                var nargs = new Array(argsLen + 1);
                for (var i = 0; i < argsLen; i++) nargs[i] = args[i];
                nargs[argsLen] = x2;
                return f(...nargs);
              };
              break;
            }
            case 2: {
              var g = function(x2, y) {
                var nargs = new Array(argsLen + 2);
                for (var i = 0; i < argsLen; i++) nargs[i] = args[i];
                nargs[argsLen] = x2;
                nargs[argsLen + 1] = y;
                return f(...nargs);
              };
              break;
            }
            default:
              var g = function(...extra_args) {
                if (extra_args.length === 0) extra_args = [void 0];
                return caml_call_gen(f, args.concat(extra_args));
              };
          }
          g.l = d;
          return g;
        }
      }
      function caml_alloc_dummy_infix() {
        return function f(x2) {
          return caml_call_gen(f.fun, [x2]);
        };
      }
      function caml_alloc_stack(hv, hx, hf) {
        return 0;
      }
      var caml_argv = function() {
        var process = globalThis.process, main = "a.out", args = [];
        if (process && process.argv && process.argv.length > 1) {
          var argv = process.argv;
          main = argv[1];
          args = argv.slice(2);
        }
        var p = caml_string_of_jsstring(main), args2 = [0, p];
        for (var i = 0; i < args.length; i++)
          args2.push(caml_string_of_jsstring(args[i]));
        return args2;
      }();
      function caml_array_append(a1, a2) {
        var l1 = a1.length, l2 = a2.length, l = l1 + l2 - 1, a = new Array(l);
        a[0] = 0;
        var i = 1, j = 1;
        for (; i < l1; i++) a[i] = a1[i];
        for (; i < l; i++, j++) a[i] = a2[j];
        return a;
      }
      function caml_array_blit(a1, i1, a2, i2, len) {
        if (i2 <= i1)
          for (var j = 1; j <= len; j++) a2[i2 + j] = a1[i1 + j];
        else
          for (var j = len; j >= 1; j--) a2[i2 + j] = a1[i1 + j];
        return 0;
      }
      function caml_array_concat(l) {
        var a = [0];
        while (l !== 0) {
          var b = l[1];
          for (var i = 1; i < b.length; i++) a.push(b[i]);
          l = l[2];
        }
        return a;
      }
      function caml_array_create_float(len) {
        if (len >>> 0 >= (2147483647 / 8 | 0)) caml_array_bound_error();
        var len = len + 1 | 0, b = new Array(len);
        b[0] = 254;
        for (var i = 1; i < len; i++) b[i] = 0;
        return b;
      }
      function caml_array_fill(array, ofs, len, v) {
        for (var i = 0; i < len; i++) array[ofs + i + 1] = v;
        return 0;
      }
      function caml_array_get(array, index) {
        if (index < 0 || index >= array.length - 1) caml_array_bound_error();
        return array[index + 1];
      }
      function caml_array_make(len, init) {
        if (len >>> 0 >= (2147483647 / 4 | 0)) caml_array_bound_error();
        var len = len + 1 | 0, b = new Array(len);
        b[0] = 0;
        for (var i = 1; i < len; i++) b[i] = init;
        return b;
      }
      function caml_array_of_bytes(x2) {
        return caml_uint8_array_of_bytes(x2);
      }
      function caml_array_of_string(x2) {
        return caml_uint8_array_of_string(x2);
      }
      function caml_array_set(array, index, newval) {
        if (index < 0 || index >= array.length - 1) caml_array_bound_error();
        array[index + 1] = newval;
        return 0;
      }
      function caml_array_sub(a, i, len) {
        var a2 = new Array(len + 1);
        a2[0] = 0;
        for (var i2 = 1, i1 = i + 1; i2 <= len; i2++, i1++) a2[i2] = a[i1];
        return a2;
      }
      function caml_asinh_float(x2) {
        return Math.asinh(x2);
      }
      function caml_atanh_float(x2) {
        return Math.atanh(x2);
      }
      function caml_atomic_cas(ref, o, n) {
        if (ref[1] === o) {
          ref[1] = n;
          return 1;
        }
        return 0;
      }
      function caml_atomic_exchange(ref, v) {
        var r = ref[1];
        ref[1] = v;
        return r;
      }
      function caml_atomic_fetch_add(ref, i) {
        var old = ref[1];
        ref[1] += i;
        return old;
      }
      function caml_atomic_load(ref) {
        return ref[1];
      }
      function caml_atomic_make_contended(a) {
        return [0, a];
      }
      function caml_ba_blit(src, dst) {
        if (dst.dims.length !== src.dims.length)
          caml_invalid_argument("Bigarray.blit: dimension mismatch");
        for (var i = 0; i < dst.dims.length; i++)
          if (dst.dims[i] !== src.dims[i])
            caml_invalid_argument("Bigarray.blit: dimension mismatch");
        dst.data.set(src.data);
        return 0;
      }
      function caml_ba_change_layout(ba, layout) {
        if (ba.layout === layout) return ba;
        var new_dims = [];
        for (var i = 0; i < ba.dims.length; i++)
          new_dims[i] = ba.dims[ba.dims.length - i - 1];
        return caml_ba_create_unsafe(ba.kind, layout, new_dims, ba.data);
      }
      function caml_ba_compare(a, b, total) {
        return a.compare(b, total);
      }
      function caml_ba_create_buffer(kind, size) {
        var view;
        switch (kind) {
          case 0:
            view = Float32Array;
            break;
          case 1:
            view = Float64Array;
            break;
          case 2:
            view = Int8Array;
            break;
          case 3:
            view = Uint8Array;
            break;
          case 4:
            view = Int16Array;
            break;
          case 5:
            view = Uint16Array;
            break;
          case 6:
            view = Int32Array;
            break;
          case 7:
            view = Int32Array;
            break;
          case 8:
            view = Int32Array;
            break;
          case 9:
            view = Int32Array;
            break;
          case 10:
            view = Float32Array;
            break;
          case 11:
            view = Float64Array;
            break;
          case 12:
            view = Uint8Array;
            break;
          case 13:
            view = Uint16Array;
            break;
        }
        if (!view) caml_invalid_argument("Bigarray.create: unsupported kind");
        var data = new view(size * caml_ba_get_size_per_element(kind));
        return data;
      }
      function caml_js_from_array(a) {
        return a.slice(1);
      }
      function caml_ba_create(kind, layout, dims_ml) {
        var dims = caml_js_from_array(dims_ml), data = caml_ba_create_buffer(kind, caml_ba_get_size(dims));
        return caml_ba_create_unsafe(kind, layout, dims, data);
      }
      function caml_ba_create_from(data1, data2, jstyp, kind, layout, dims) {
        if (data2 || caml_ba_get_size_per_element(kind) === 2)
          caml_invalid_argument("caml_ba_create_from: use return caml_ba_create_unsafe");
        return caml_ba_create_unsafe(kind, layout, dims, data1);
      }
      function caml_int32_float_of_bits(x2) {
        var int32a = new Int32Array(1);
        int32a[0] = x2;
        var float32a = new Float32Array(int32a.buffer);
        return float32a[0];
      }
      function caml_int64_of_bytes(a) {
        return new MlInt64(
          a[7] << 0 | a[6] << 8 | a[5] << 16,
          a[4] << 0 | a[3] << 8 | a[2] << 16,
          a[1] << 0 | a[0] << 8
        );
      }
      function caml_int64_float_of_bits(x2) {
        var lo = x2.lo, mi = x2.mi, hi = x2.hi, exp = (hi & 32767) >> 4;
        if (exp === 2047)
          return (lo | mi | hi & 15) === 0 ? hi & 32768 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY : Number.NaN;
        var k = Math.pow(2, -24), res = (lo * k + mi) * k + (hi & 15);
        if (exp > 0) {
          res += 16;
          res *= Math.pow(2, exp - 1027);
        } else
          res *= Math.pow(2, -1026);
        if (hi & 32768) res = -res;
        return res;
      }
      function caml_failwith(msg) {
        if (!caml_global_data.Failure)
          caml_global_data.Failure = [248, caml_string_of_jsbytes("Failure"), -3];
        caml_raise_with_string(caml_global_data.Failure, msg);
      }
      function caml_ba_deserialize(reader, sz, name) {
        var num_dims = reader.read32s();
        if (num_dims < 0 || num_dims > 16)
          caml_failwith("input_value: wrong number of bigarray dimensions");
        var tag = reader.read32s(), kind = tag & 255, layout = tag >> 8 & 1, dims = [];
        if (name === "_bigarr02")
          for (var i = 0; i < num_dims; i++) {
            var size_dim = reader.read16u();
            if (size_dim === 65535) {
              var size_dim_hi = reader.read32u(), size_dim_lo = reader.read32u();
              if (size_dim_hi !== 0)
                caml_failwith("input_value: bigarray dimension overflow in 32bit");
              size_dim = size_dim_lo;
            }
            dims.push(size_dim);
          }
        else
          for (var i = 0; i < num_dims; i++) dims.push(reader.read32u());
        var size = caml_ba_get_size(dims), data = caml_ba_create_buffer(kind, size), ba = caml_ba_create_unsafe(kind, layout, dims, data);
        switch (kind) {
          case 2:
            for (var i = 0; i < size; i++) data[i] = reader.read8s();
            break;
          case 3:
          case 12:
            for (var i = 0; i < size; i++) data[i] = reader.read8u();
            break;
          case 4:
            for (var i = 0; i < size; i++) data[i] = reader.read16s();
            break;
          case 5:
            for (var i = 0; i < size; i++) data[i] = reader.read16u();
            break;
          case 6:
            for (var i = 0; i < size; i++) data[i] = reader.read32s();
            break;
          case 8:
          case 9:
            var sixty = reader.read8u();
            if (sixty)
              caml_failwith("input_value: cannot read bigarray with 64-bit OCaml ints");
            for (var i = 0; i < size; i++) data[i] = reader.read32s();
            break;
          case 7:
            var t = new Array(8);
            for (var i = 0; i < size; i++) {
              for (var j = 0; j < 8; j++) t[j] = reader.read8u();
              var int64 = caml_int64_of_bytes(t);
              ba.set(i, int64);
            }
            break;
          case 1:
            var t = new Array(8);
            for (var i = 0; i < size; i++) {
              for (var j = 0; j < 8; j++) t[j] = reader.read8u();
              var f = caml_int64_float_of_bits(caml_int64_of_bytes(t));
              ba.set(i, f);
            }
            break;
          case 13:
            for (var i = 0; i < size; i++) data[i] = reader.read16u();
            break;
          case 0:
            for (var i = 0; i < size; i++) {
              var f = caml_int32_float_of_bits(reader.read32s());
              ba.set(i, f);
            }
            break;
          case 10:
            for (var i = 0; i < size; i++) {
              var re = caml_int32_float_of_bits(reader.read32s()), im = caml_int32_float_of_bits(reader.read32s());
              ba.set(i, [254, re, im]);
            }
            break;
          case 11:
            var t = new Array(8);
            for (var i = 0; i < size; i++) {
              for (var j = 0; j < 8; j++) t[j] = reader.read8u();
              var re = caml_int64_float_of_bits(caml_int64_of_bytes(t));
              for (var j = 0; j < 8; j++) t[j] = reader.read8u();
              var im = caml_int64_float_of_bits(caml_int64_of_bytes(t));
              ba.set(i, [254, re, im]);
            }
            break;
        }
        sz[0] = (4 + num_dims) * 4;
        return caml_ba_create_unsafe(kind, layout, dims, data);
      }
      function caml_ba_dim(ba, i) {
        if (i < 0 || i >= ba.dims.length) caml_invalid_argument("Bigarray.dim");
        return ba.dims[i];
      }
      function caml_ba_dim_1(ba) {
        return caml_ba_dim(ba, 0);
      }
      function caml_ba_dim_2(ba) {
        return caml_ba_dim(ba, 1);
      }
      function caml_ba_dim_3(ba) {
        return caml_ba_dim(ba, 2);
      }
      function caml_ba_fill(ba, v) {
        ba.fill(v);
        return 0;
      }
      function caml_ba_kind_of_typed_array(ta) {
        var kind;
        if (ta instanceof Float32Array)
          kind = 0;
        else if (ta instanceof Float64Array)
          kind = 1;
        else if (ta instanceof Int8Array)
          kind = 2;
        else if (ta instanceof Uint8Array)
          kind = 3;
        else if (ta instanceof Uint8ClampedArray)
          kind = 3;
        else if (ta instanceof Int16Array)
          kind = 4;
        else if (ta instanceof Uint16Array)
          kind = 5;
        else if (ta instanceof Int32Array)
          kind = 6;
        else if (ta instanceof Uint32Array)
          kind = 6;
        else
          caml_invalid_argument("caml_ba_kind_of_typed_array: unsupported kind");
        return kind;
      }
      function caml_ba_from_typed_array(ta) {
        var kind = caml_ba_kind_of_typed_array(ta), ta = ta instanceof Uint32Array ? new Int32Array(ta.buffer, ta.byteOffset, ta.length) : ta;
        return caml_ba_create_unsafe(kind, 0, [ta.length], ta);
      }
      function caml_ba_get_2(ba, i0, i1) {
        return ba.get(ba.offset([i0, i1]));
      }
      function caml_ba_get_3(ba, i0, i1, i2) {
        return ba.get(ba.offset([i0, i1, i2]));
      }
      function caml_ba_get_generic(ba, i) {
        var ofs = ba.offset(caml_js_from_array(i));
        return ba.get(ofs);
      }
      function caml_mul(a, b) {
        return Math.imul(a, b);
      }
      function caml_hash_mix_int(h, d) {
        d = caml_mul(d, 3432918353 | 0);
        d = d << 15 | d >>> 32 - 15;
        d = caml_mul(d, 461845907);
        h ^= d;
        h = h << 13 | h >>> 32 - 13;
        return (h + (h << 2) | 0) + (3864292196 | 0) | 0;
      }
      function caml_hash_mix_float16(hash, d) {
        if ((d & 31744) === 31744 && (d & 1023) !== 0)
          d = 31745;
        else if (d === 32768) d = 0;
        return caml_hash_mix_int(hash, d);
      }
      var log2_ok = Math.log2 && Math.log2(11235582092889474e291) === 1020;
      function jsoo_floor_log2(x2) {
        if (log2_ok) return Math.floor(Math.log2(x2));
        var i = 0;
        if (x2 === 0) return Number.NEGATIVE_INFINITY;
        if (x2 >= 1) while (x2 >= 2) {
          x2 /= 2;
          i++;
        }
        else while (x2 < 1) {
          x2 *= 2;
          i--;
        }
        return i;
      }
      function caml_int64_create_lo_mi_hi(lo, mi, hi) {
        return new MlInt64(lo, mi, hi);
      }
      function caml_int64_bits_of_float(x2) {
        if (!Number.isFinite(x2)) {
          if (Number.isNaN(x2)) return caml_int64_create_lo_mi_hi(1, 0, 32752);
          return x2 > 0 ? caml_int64_create_lo_mi_hi(0, 0, 32752) : caml_int64_create_lo_mi_hi(0, 0, 65520);
        }
        var sign = x2 === 0 && 1 / x2 === Number.NEGATIVE_INFINITY ? 32768 : x2 >= 0 ? 0 : 32768;
        if (sign) x2 = -x2;
        var exp = jsoo_floor_log2(x2) + 1023;
        if (exp <= 0) {
          exp = 0;
          x2 /= Math.pow(2, -1026);
        } else {
          x2 /= Math.pow(2, exp - 1027);
          if (x2 < 16) {
            x2 *= 2;
            exp -= 1;
          }
          if (exp === 0) x2 /= 2;
        }
        var k = Math.pow(2, 24), r3 = x2 | 0;
        x2 = (x2 - r3) * k;
        var r2 = x2 | 0;
        x2 = (x2 - r2) * k;
        var r1 = x2 | 0;
        r3 = r3 & 15 | sign | exp << 4;
        return caml_int64_create_lo_mi_hi(r1, r2, r3);
      }
      function caml_hash_mix_int64(h, v) {
        h = caml_hash_mix_int(h, caml_int64_lo32(v));
        h = caml_hash_mix_int(h, caml_int64_hi32(v));
        return h;
      }
      function caml_hash_mix_float(h, v0) {
        return caml_hash_mix_int64(h, caml_int64_bits_of_float(v0));
      }
      function caml_ba_hash(ba) {
        var num_elts = caml_ba_get_size(ba.dims), h = 0;
        switch (ba.kind) {
          case 2:
          case 3:
          case 12:
            if (num_elts > 256) num_elts = 256;
            var w = 0, i = 0;
            for (i = 0; i + 4 <= ba.data.length; i += 4) {
              w = ba.data[i + 0] | ba.data[i + 1] << 8 | ba.data[i + 2] << 16 | ba.data[i + 3] << 24;
              h = caml_hash_mix_int(h, w);
            }
            w = 0;
            switch (num_elts & 3) {
              case 3:
                w = ba.data[i + 2] << 16;
              case 2:
                w |= ba.data[i + 1] << 8;
              case 1:
                w |= ba.data[i + 0];
                h = caml_hash_mix_int(h, w);
            }
            break;
          case 4:
          case 5:
            if (num_elts > 128) num_elts = 128;
            var w = 0, i = 0;
            for (i = 0; i + 2 <= ba.data.length; i += 2) {
              w = ba.data[i + 0] | ba.data[i + 1] << 16;
              h = caml_hash_mix_int(h, w);
            }
            if ((num_elts & 1) !== 0) h = caml_hash_mix_int(h, ba.data[i]);
            break;
          case 6:
            if (num_elts > 64) num_elts = 64;
            for (var i = 0; i < num_elts; i++) h = caml_hash_mix_int(h, ba.data[i]);
            break;
          case 8:
          case 9:
            if (num_elts > 64) num_elts = 64;
            for (var i = 0; i < num_elts; i++) h = caml_hash_mix_int(h, ba.data[i]);
            break;
          case 7:
            if (num_elts > 32) num_elts = 32;
            num_elts *= 2;
            for (var i = 0; i < num_elts; i++) h = caml_hash_mix_int(h, ba.data[i]);
            break;
          case 10:
            num_elts *= 2;
          case 0:
            if (num_elts > 64) num_elts = 64;
            for (var i = 0; i < num_elts; i++)
              h = caml_hash_mix_float(h, ba.data[i]);
            break;
          case 11:
            num_elts *= 2;
          case 1:
            if (num_elts > 32) num_elts = 32;
            for (var i = 0; i < num_elts; i++)
              h = caml_hash_mix_float(h, ba.data[i]);
            break;
          case 13:
            if (num_elts > 128) num_elts = 128;
            for (var i = 0; i < num_elts; i++)
              h = caml_hash_mix_float16(h, ba.data[i]);
            break;
        }
        return h;
      }
      function caml_ba_init() {
        return 0;
      }
      function caml_ba_kind(ba) {
        return ba.kind;
      }
      function caml_ba_layout(ba) {
        return ba.layout;
      }
      function caml_ba_map_file(vfd, kind, layout, shared, dims, pos) {
        caml_failwith("caml_ba_map_file not implemented");
      }
      function caml_ba_map_file_bytecode(argv, argn) {
        return caml_ba_map_file(argv[0], argv[1], argv[2], argv[3], argv[4], argv[5]);
      }
      function caml_ba_num_dims(ba) {
        return ba.dims.length;
      }
      function caml_ba_reshape(ba, vind) {
        vind = caml_js_from_array(vind);
        var new_dim = [], num_dims = vind.length;
        if (num_dims < 0 || num_dims > 16)
          caml_invalid_argument("Bigarray.reshape: bad number of dimensions");
        var num_elts = 1;
        for (var i = 0; i < num_dims; i++) {
          new_dim[i] = vind[i];
          if (new_dim[i] < 0)
            caml_invalid_argument("Bigarray.reshape: negative dimension");
          num_elts = num_elts * new_dim[i];
        }
        var size = caml_ba_get_size(ba.dims);
        if (num_elts !== size)
          caml_invalid_argument("Bigarray.reshape: size mismatch");
        return caml_ba_create_unsafe(ba.kind, ba.layout, new_dim, ba.data);
      }
      function caml_int32_bits_of_float(x2) {
        var float32a = new Float32Array(1);
        float32a[0] = x2;
        var int32a = new Int32Array(float32a.buffer);
        return int32a[0] | 0;
      }
      function caml_int64_to_bytes(x2) {
        return x2.toArray();
      }
      function caml_ba_serialize(writer, ba, sz) {
        writer.write(32, ba.dims.length);
        writer.write(32, ba.kind | ba.layout << 8);
        if (ba.caml_custom === "_bigarr02")
          for (var i = 0; i < ba.dims.length; i++)
            if (ba.dims[i] < 65535)
              writer.write(16, ba.dims[i]);
            else {
              writer.write(16, 65535);
              writer.write(32, 0);
              writer.write(32, ba.dims[i]);
            }
        else
          for (var i = 0; i < ba.dims.length; i++) writer.write(32, ba.dims[i]);
        switch (ba.kind) {
          case 2:
          case 3:
          case 12:
            for (var i = 0; i < ba.data.length; i++) writer.write(8, ba.data[i]);
            break;
          case 4:
          case 5:
            for (var i = 0; i < ba.data.length; i++) writer.write(16, ba.data[i]);
            break;
          case 6:
            for (var i = 0; i < ba.data.length; i++) writer.write(32, ba.data[i]);
            break;
          case 8:
          case 9:
            writer.write(8, 0);
            for (var i = 0; i < ba.data.length; i++) writer.write(32, ba.data[i]);
            break;
          case 7:
            for (var i = 0; i < ba.data.length / 2; i++) {
              var b = caml_int64_to_bytes(ba.get(i));
              for (var j = 0; j < 8; j++) writer.write(8, b[j]);
            }
            break;
          case 1:
            for (var i = 0; i < ba.data.length; i++) {
              var b = caml_int64_to_bytes(caml_int64_bits_of_float(ba.get(i)));
              for (var j = 0; j < 8; j++) writer.write(8, b[j]);
            }
            break;
          case 13:
            for (var i = 0; i < ba.data.length; i++) writer.write(16, ba.data[i]);
            break;
          case 0:
            for (var i = 0; i < ba.data.length; i++) {
              var b = caml_int32_bits_of_float(ba.get(i));
              writer.write(32, b);
            }
            break;
          case 10:
            for (var i = 0; i < ba.data.length / 2; i++) {
              var j = ba.get(i);
              writer.write(32, caml_int32_bits_of_float(j[1]));
              writer.write(32, caml_int32_bits_of_float(j[2]));
            }
            break;
          case 11:
            for (var i = 0; i < ba.data.length / 2; i++) {
              var complex = ba.get(i), b = caml_int64_to_bytes(caml_int64_bits_of_float(complex[1]));
              for (var j = 0; j < 8; j++) writer.write(8, b[j]);
              var b = caml_int64_to_bytes(caml_int64_bits_of_float(complex[2]));
              for (var j = 0; j < 8; j++) writer.write(8, b[j]);
            }
            break;
        }
        sz[0] = (4 + ba.dims.length) * 4;
        sz[1] = (4 + ba.dims.length) * 8;
      }
      function caml_ba_set_1(ba, i0, v) {
        ba.set(ba.offset(i0), v);
        return 0;
      }
      function caml_ba_set_2(ba, i0, i1, v) {
        ba.set(ba.offset([i0, i1]), v);
        return 0;
      }
      function caml_ba_set_3(ba, i0, i1, i2, v) {
        ba.set(ba.offset([i0, i1, i2]), v);
        return 0;
      }
      function caml_ba_set_generic(ba, i, v) {
        ba.set(ba.offset(caml_js_from_array(i)), v);
        return 0;
      }
      function caml_ba_slice(ba, vind) {
        vind = caml_js_from_array(vind);
        var num_inds = vind.length, index = [], sub_dims = [], ofs;
        if (num_inds > ba.dims.length)
          caml_invalid_argument("Bigarray.slice: too many indices");
        if (ba.layout === 0) {
          for (var i = 0; i < num_inds; i++) index[i] = vind[i];
          for (; i < ba.dims.length; i++) index[i] = 0;
          sub_dims = ba.dims.slice(num_inds);
        } else {
          for (var i = 0; i < num_inds; i++)
            index[ba.dims.length - num_inds + i] = vind[i];
          for (var i = 0; i < ba.dims.length - num_inds; i++) index[i] = 1;
          sub_dims = ba.dims.slice(0, ba.dims.length - num_inds);
        }
        ofs = ba.offset(index);
        var size = caml_ba_get_size(sub_dims), size_per_element = caml_ba_get_size_per_element(ba.kind), new_data = ba.data.subarray(ofs * size_per_element, (ofs + size) * size_per_element);
        return caml_ba_create_unsafe(ba.kind, ba.layout, sub_dims, new_data);
      }
      function caml_ba_sub(ba, ofs, len) {
        var changed_dim, mul = 1;
        if (ba.layout === 0) {
          for (var i = 1; i < ba.dims.length; i++) mul = mul * ba.dims[i];
          changed_dim = 0;
        } else {
          for (var i = 0; i < ba.dims.length - 1; i++) mul = mul * ba.dims[i];
          changed_dim = ba.dims.length - 1;
          ofs = ofs - 1;
        }
        if (ofs < 0 || len < 0 || ofs + len > ba.dims[changed_dim])
          caml_invalid_argument("Bigarray.sub: bad sub-array");
        var new_dims = [];
        for (var i = 0; i < ba.dims.length; i++) new_dims[i] = ba.dims[i];
        new_dims[changed_dim] = len;
        mul *= caml_ba_get_size_per_element(ba.kind);
        var new_data = ba.data.subarray(ofs * mul, (ofs + len) * mul);
        return caml_ba_create_unsafe(ba.kind, ba.layout, new_dims, new_data);
      }
      function caml_ba_to_typed_array(ba) {
        return ba.data;
      }
      function caml_ba_uint8_get16(ba, i0) {
        var ofs = ba.offset(i0);
        if (ofs + 1 >= ba.data.length) caml_array_bound_error();
        var b1 = ba.get(ofs), b2 = ba.get(ofs + 1);
        return b1 | b2 << 8;
      }
      function caml_ba_uint8_get32(ba, i0) {
        var ofs = ba.offset(i0);
        if (ofs + 3 >= ba.data.length) caml_array_bound_error();
        var b1 = ba.get(ofs + 0), b2 = ba.get(ofs + 1), b3 = ba.get(ofs + 2), b4 = ba.get(ofs + 3);
        return b1 << 0 | b2 << 8 | b3 << 16 | b4 << 24;
      }
      function caml_ba_uint8_get64(ba, i0) {
        var ofs = ba.offset(i0);
        if (ofs + 7 >= ba.data.length) caml_array_bound_error();
        var b1 = ba.get(ofs + 0), b2 = ba.get(ofs + 1), b3 = ba.get(ofs + 2), b4 = ba.get(ofs + 3), b5 = ba.get(ofs + 4), b6 = ba.get(ofs + 5), b7 = ba.get(ofs + 6), b8 = ba.get(ofs + 7);
        return caml_int64_of_bytes([b8, b7, b6, b5, b4, b3, b2, b1]);
      }
      function caml_ba_uint8_set16(ba, i0, v) {
        var ofs = ba.offset(i0);
        if (ofs + 1 >= ba.data.length) caml_array_bound_error();
        ba.set(ofs + 0, v & 255);
        ba.set(ofs + 1, v >>> 8 & 255);
        return 0;
      }
      function caml_ba_uint8_set32(ba, i0, v) {
        var ofs = ba.offset(i0);
        if (ofs + 3 >= ba.data.length) caml_array_bound_error();
        ba.set(ofs + 0, v & 255);
        ba.set(ofs + 1, v >>> 8 & 255);
        ba.set(ofs + 2, v >>> 16 & 255);
        ba.set(ofs + 3, v >>> 24 & 255);
        return 0;
      }
      function caml_ba_uint8_set64(ba, i0, v) {
        var ofs = ba.offset(i0);
        if (ofs + 7 >= ba.data.length) caml_array_bound_error();
        var v = caml_int64_to_bytes(v);
        for (var i = 0; i < 8; i++) ba.set(ofs + i, v[7 - i]);
        return 0;
      }
      function caml_backtrace_status(_unit) {
        return caml_record_backtrace_runtime_flag ? 1 : 0;
      }
      function caml_bigstring_blit_ba_to_ba(ba1, pos1, ba2, pos2, len) {
        if (12 !== ba1.kind)
          caml_invalid_argument("caml_bigstring_blit_ba_to_ba: kind mismatch");
        if (12 !== ba2.kind)
          caml_invalid_argument("caml_bigstring_blit_ba_to_ba: kind mismatch");
        if (len === 0) return 0;
        var ofs1 = ba1.offset(pos1), ofs2 = ba2.offset(pos2);
        if (ofs1 + len > ba1.data.length) caml_array_bound_error();
        if (ofs2 + len > ba2.data.length) caml_array_bound_error();
        var slice = ba1.data.subarray(ofs1, ofs1 + len);
        ba2.data.set(slice, pos2);
        return 0;
      }
      function caml_bigstring_blit_ba_to_bytes(ba1, pos1, bytes2, pos2, len) {
        if (12 !== ba1.kind)
          caml_invalid_argument("caml_bigstring_blit_string_to_ba: kind mismatch");
        if (len === 0) return 0;
        var ofs1 = ba1.offset(pos1);
        if (ofs1 + len > ba1.data.length) caml_array_bound_error();
        if (pos2 + len > caml_ml_bytes_length(bytes2)) caml_array_bound_error();
        var slice = ba1.data.subarray(ofs1, ofs1 + len);
        caml_blit_bytes(caml_bytes_of_uint8_array(slice), 0, bytes2, pos2, len);
        return 0;
      }
      function caml_bigstring_blit_bytes_to_ba(str1, pos1, ba2, pos2, len) {
        if (12 !== ba2.kind)
          caml_invalid_argument("caml_bigstring_blit_string_to_ba: kind mismatch");
        if (len === 0) return 0;
        var ofs2 = ba2.offset(pos2);
        if (pos1 + len > caml_ml_bytes_length(str1)) caml_array_bound_error();
        if (ofs2 + len > ba2.data.length) caml_array_bound_error();
        var slice = caml_uint8_array_of_bytes(str1).subarray(pos1, pos1 + len);
        ba2.data.set(slice, ofs2);
        return 0;
      }
      function caml_bigstring_blit_string_to_ba(str1, pos1, ba2, pos2, len) {
        if (12 !== ba2.kind)
          caml_invalid_argument("caml_bigstring_blit_string_to_ba: kind mismatch");
        if (len === 0) return 0;
        var ofs2 = ba2.offset(pos2);
        if (pos1 + len > caml_ml_string_length(str1)) caml_array_bound_error();
        if (ofs2 + len > ba2.data.length) caml_array_bound_error();
        var slice = caml_uint8_array_of_string(str1).subarray(pos1, pos1 + len);
        ba2.data.set(slice, ofs2);
        return 0;
      }
      function caml_bigstring_memcmp(s1, pos1, s2, pos2, len) {
        for (var i = 0; i < len; i++) {
          var a = caml_ba_get_1(s1, pos1 + i), b = caml_ba_get_1(s2, pos2 + i);
          if (a < b) return -1;
          if (a > b) return 1;
        }
        return 0;
      }
      function caml_blake2_final(ctx, hashlen) {
        var r = blake2b.Final(ctx);
        return caml_string_of_uint8_array(r);
      }
      function caml_blake2_update(ctx, buf, ofs, len) {
        var input = caml_uint8_array_of_bytes(buf);
        input = input.subarray(ofs, ofs + len);
        blake2b.Update(ctx, input);
        return 0;
      }
      function caml_blake2_create(hashlen, key) {
        key = caml_uint8_array_of_string(key);
        if (key.length > 64) key.subarray(0, 64);
        return blake2b.Init(hashlen, key);
      }
      function caml_blake2_bytes(hashlen, key, buf, ofs, len) {
        var ctx = caml_blake2_create(hashlen, key);
        caml_blake2_update(ctx, buf, ofs, len);
        return caml_blake2_final(ctx, hashlen);
      }
      function caml_blake2_string(hashlen, key, buf_str, ofs, len) {
        var ctx = caml_blake2_create(hashlen, key), buf = caml_bytes_of_string(buf_str);
        caml_blake2_update(ctx, buf, ofs, len);
        return caml_blake2_final(ctx, hashlen);
      }
      function caml_blit_string(a, b, c, d, e) {
        caml_blit_bytes(caml_bytes_of_string(a), b, c, d, e);
        return 0;
      }
      function caml_bswap16(x2) {
        return (x2 & 255) << 8 | (x2 & 65280) >> 8;
      }
      function caml_jsstring_of_string(s2) {
        if (jsoo_is_ascii(s2)) return s2;
        return caml_utf16_of_utf8(s2);
      }
      function caml_build_symbols(symb) {
        var r = {}, max = -1;
        if (symb)
          for (var i = 1; i < symb.length; i++) {
            var idx = symb[i][2];
            max = Math.max(max, idx);
            r[caml_jsstring_of_string(symb[i][1])] = idx;
          }
        r.next_idx = max + 1;
        return r;
      }
      function caml_bytes_compare(s1, s2) {
        s1.t & 6 && caml_convert_string_to_bytes(s1);
        s2.t & 6 && caml_convert_string_to_bytes(s2);
        return s1.c < s2.c ? -1 : s1.c > s2.c ? 1 : 0;
      }
      function caml_bytes_equal(s1, s2) {
        if (s1 === s2) return 1;
        s1.t & 6 && caml_convert_string_to_bytes(s1);
        s2.t & 6 && caml_convert_string_to_bytes(s2);
        return s1.c === s2.c ? 1 : 0;
      }
      function caml_bytes_unsafe_get(s2, i) {
        switch (s2.t & 6) {
          case 0:
            return s2.c.charCodeAt(i);
          case 2:
            if (i >= s2.c.length) return 0;
            return s2.c.charCodeAt(i);
          case 4:
            return s2.c[i];
        }
      }
      function caml_bytes_get(s2, i) {
        if (i >>> 0 >= s2.l) caml_bytes_bound_error();
        return caml_bytes_unsafe_get(s2, i);
      }
      function caml_bytes_get16(s2, i) {
        if (i >>> 0 >= s2.l - 1) caml_bytes_bound_error();
        var b1 = caml_bytes_unsafe_get(s2, i), b2 = caml_bytes_unsafe_get(s2, i + 1);
        return b2 << 8 | b1;
      }
      function caml_bytes_get32(s2, i) {
        if (i >>> 0 >= s2.l - 3) caml_bytes_bound_error();
        var b1 = caml_bytes_unsafe_get(s2, i), b2 = caml_bytes_unsafe_get(s2, i + 1), b3 = caml_bytes_unsafe_get(s2, i + 2), b4 = caml_bytes_unsafe_get(s2, i + 3);
        return b4 << 24 | b3 << 16 | b2 << 8 | b1;
      }
      function caml_bytes_get64(s2, i) {
        if (i >>> 0 >= s2.l - 7) caml_bytes_bound_error();
        var a = new Array(8);
        for (var j = 0; j < 8; j++) a[7 - j] = caml_bytes_unsafe_get(s2, i + j);
        return caml_int64_of_bytes(a);
      }
      function caml_bytes_lessequal(s1, s2) {
        s1.t & 6 && caml_convert_string_to_bytes(s1);
        s2.t & 6 && caml_convert_string_to_bytes(s2);
        return s1.c <= s2.c ? 1 : 0;
      }
      function caml_bytes_greaterequal(s1, s2) {
        return caml_bytes_lessequal(s2, s1);
      }
      function caml_bytes_lessthan(s1, s2) {
        s1.t & 6 && caml_convert_string_to_bytes(s1);
        s2.t & 6 && caml_convert_string_to_bytes(s2);
        return s1.c < s2.c ? 1 : 0;
      }
      function caml_bytes_greaterthan(s1, s2) {
        return caml_bytes_lessthan(s2, s1);
      }
      function caml_bytes_notequal(s1, s2) {
        return 1 - caml_bytes_equal(s1, s2);
      }
      function caml_bytes_of_utf16_jsstring(s2) {
        var tag = 9;
        if (!jsoo_is_ascii(s2)) tag = 8, s2 = caml_utf8_of_utf16(s2);
        return new MlBytes(tag, s2, s2.length);
      }
      function caml_bytes_set16(s2, i, i16) {
        if (i >>> 0 >= s2.l - 1) caml_bytes_bound_error();
        var b2 = 255 & i16 >> 8, b1 = 255 & i16;
        caml_bytes_unsafe_set(s2, i + 0, b1);
        caml_bytes_unsafe_set(s2, i + 1, b2);
        return 0;
      }
      function caml_bytes_set32(s2, i, i32) {
        if (i >>> 0 >= s2.l - 3) caml_bytes_bound_error();
        var b4 = 255 & i32 >> 24, b3 = 255 & i32 >> 16, b2 = 255 & i32 >> 8, b1 = 255 & i32;
        caml_bytes_unsafe_set(s2, i + 0, b1);
        caml_bytes_unsafe_set(s2, i + 1, b2);
        caml_bytes_unsafe_set(s2, i + 2, b3);
        caml_bytes_unsafe_set(s2, i + 3, b4);
        return 0;
      }
      function caml_bytes_set64(s2, i, i64) {
        if (i >>> 0 >= s2.l - 7) caml_bytes_bound_error();
        var a = caml_int64_to_bytes(i64);
        for (var j = 0; j < 8; j++) caml_bytes_unsafe_set(s2, i + 7 - j, a[j]);
        return 0;
      }
      var caml_callback = caml_call_gen;
      function caml_cbrt_float(x2) {
        return Math.cbrt(x2);
      }
      function caml_ml_channels_state() {
        this.map = new globalThis.WeakMap();
        this.opened = new globalThis.Set();
      }
      caml_ml_channels_state.prototype.close = function(chanid) {
        this.opened.delete(chanid);
      };
      caml_ml_channels_state.prototype.get = function(chanid) {
        return this.map.get(chanid);
      };
      caml_ml_channels_state.prototype.set = function(chanid, val) {
        if (val.opened) this.opened.add(chanid);
        return this.map.set(chanid, val);
      };
      caml_ml_channels_state.prototype.all = function() {
        return this.opened.values();
      };
      var caml_ml_channels = new caml_ml_channels_state();
      function caml_ml_channel_get(id) {
        return caml_ml_channels.get(id);
      }
      function caml_channel_descriptor(chanid) {
        var chan = caml_ml_channel_get(chanid);
        return chan.fd;
      }
      function caml_check_bound(array, index) {
        if (index >>> 0 >= array.length - 1) caml_array_bound_error();
        return array;
      }
      function caml_classify_float(x2) {
        if (Number.isFinite(x2)) {
          if (Math.abs(x2) >= 22250738585072014e-324) return 0;
          if (x2 !== 0) return 1;
          return 2;
        }
        return Number.isNaN(x2) ? 4 : 3;
      }
      function caml_is_continuation_tag(t) {
        return t === 245 ? 1 : 0;
      }
      function caml_int32_unmarshal(reader, size) {
        size[0] = 4;
        return reader.read32s();
      }
      function caml_nativeint_unmarshal(reader, size) {
        switch (reader.read8u()) {
          case 1:
            size[0] = 4;
            return reader.read32s();
          case 2:
            caml_failwith("input_value: native integer value too large");
            break;
          default:
            caml_failwith("input_value: ill-formed native integer");
        }
      }
      function caml_int64_unmarshal(reader, size) {
        var t = new Array(8);
        for (var j = 0; j < 8; j++) t[j] = reader.read8u();
        size[0] = 8;
        return caml_int64_of_bytes(t);
      }
      function caml_int64_marshal(writer, v, sizes) {
        var b = caml_int64_to_bytes(v);
        for (var i = 0; i < 8; i++) writer.write(8, b[i]);
        sizes[0] = 8;
        sizes[1] = 8;
      }
      function caml_int64_compare(x2, y, total) {
        return x2.compare(y);
      }
      function caml_int64_hash(v) {
        return v.lo32() ^ v.hi32();
      }
      var caml_custom_ops = {
        _j: {
          deserialize: caml_int64_unmarshal,
          serialize: caml_int64_marshal,
          fixed_length: 8,
          compare: caml_int64_compare,
          hash: caml_int64_hash
        },
        _i: { deserialize: caml_int32_unmarshal, fixed_length: 4 },
        _n: { deserialize: caml_nativeint_unmarshal, fixed_length: 4 },
        _bigarray: {
          deserialize: function(reader, sz) {
            return caml_ba_deserialize(reader, sz, "_bigarray");
          },
          serialize: caml_ba_serialize,
          compare: caml_ba_compare,
          hash: caml_ba_hash
        },
        _bigarr02: {
          deserialize: function(reader, sz) {
            return caml_ba_deserialize(reader, sz, "_bigarr02");
          },
          serialize: caml_ba_serialize,
          compare: caml_ba_compare,
          hash: caml_ba_hash
        }
      };
      function caml_compare_val_get_custom(a) {
        return caml_custom_ops[a.caml_custom] && caml_custom_ops[a.caml_custom].compare;
      }
      function caml_compare_val_number_custom(num, custom, swap, total) {
        var comp = caml_compare_val_get_custom(custom);
        if (comp) {
          var x2 = swap > 0 ? comp(custom, num, total) : comp(num, custom, total);
          if (total && Number.isNaN(x2)) return swap;
          if (Number.isNaN(+x2)) return +x2;
          if ((x2 | 0) !== 0) return x2 | 0;
        }
        return swap;
      }
      function caml_compare_val_tag(a) {
        if (typeof a === "number")
          return 1e3;
        else if (caml_is_ml_bytes(a))
          return 252;
        else if (caml_is_ml_string(a))
          return 1252;
        else if (Array.isArray(a) && a[0] === a[0] >>> 0 && a[0] <= 255) {
          var tag = a[0] | 0;
          return tag === 254 ? 0 : tag;
        } else if (a instanceof String)
          return 12520;
        else if (typeof a === "string")
          return 12520;
        else if (a instanceof Number)
          return 1e3;
        else if (a && a.caml_custom)
          return 1255;
        else if (a && a.compare)
          return 1256;
        else if (typeof a === "function")
          return 1247;
        else if (typeof a === "symbol") return 1251;
        return 1001;
      }
      function caml_int_compare(a, b) {
        if (a < b) return -1;
        if (a === b) return 0;
        return 1;
      }
      function caml_string_compare(s1, s2) {
        return s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
      }
      function caml_compare_val(a, b, total) {
        var stack = [];
        for (; ; ) {
          if (!(total && a === b)) {
            var tag_a = caml_compare_val_tag(a);
            if (tag_a === 250) {
              a = a[1];
              continue;
            }
            var tag_b = caml_compare_val_tag(b);
            if (tag_b === 250) {
              b = b[1];
              continue;
            }
            if (tag_a !== tag_b) {
              if (tag_a === 1e3) {
                if (tag_b === 1255)
                  return caml_compare_val_number_custom(a, b, -1, total);
                return -1;
              }
              if (tag_b === 1e3) {
                if (tag_a === 1255)
                  return caml_compare_val_number_custom(b, a, 1, total);
                return 1;
              }
              return tag_a < tag_b ? -1 : 1;
            }
            switch (tag_a) {
              case 247:
                caml_invalid_argument("compare: functional value");
                break;
              case 248:
                var x2 = caml_int_compare(a[2], b[2]) | 0;
                if (x2 !== 0) return x2;
                break;
              case 249:
                caml_invalid_argument("compare: functional value");
                break;
              case 250:
                caml_invalid_argument("equal: got Forward_tag, should not happen");
                break;
              case 251:
                caml_invalid_argument("equal: abstract value");
                break;
              case 252:
                if (a !== b) {
                  var x2 = caml_bytes_compare(a, b) | 0;
                  if (x2 !== 0) return x2;
                }
                break;
              case 253:
                caml_invalid_argument("equal: got Double_tag, should not happen");
                break;
              case 254:
                caml_invalid_argument("equal: got Double_array_tag, should not happen");
                break;
              case 255:
                caml_invalid_argument("equal: got Custom_tag, should not happen");
                break;
              case 1247:
                caml_invalid_argument("compare: functional value");
                break;
              case 1255:
                var comp = caml_compare_val_get_custom(a);
                if (comp !== caml_compare_val_get_custom(b))
                  return a.caml_custom < b.caml_custom ? -1 : 1;
                if (!comp) caml_invalid_argument("compare: abstract value");
                var x2 = comp(a, b, total);
                if (Number.isNaN(x2)) return total ? -1 : x2;
                if (x2 !== (x2 | 0)) return -1;
                if (x2 !== 0) return x2 | 0;
                break;
              case 1256:
                var x2 = a.compare(b, total);
                if (Number.isNaN(x2)) return total ? -1 : x2;
                if (x2 !== (x2 | 0)) return -1;
                if (x2 !== 0) return x2 | 0;
                break;
              case 1e3:
                a = +a;
                b = +b;
                if (a < b) return -1;
                if (a > b) return 1;
                if (a !== b) {
                  if (!total) return Number.NaN;
                  if (!Number.isNaN(a)) return 1;
                  if (!Number.isNaN(b)) return -1;
                }
                break;
              case 1001:
                if (a < b) return -1;
                if (a > b) return 1;
                if (a !== b) return total ? 1 : Number.NaN;
                break;
              case 1251:
                if (a !== b) return total ? 1 : Number.NaN;
                break;
              case 1252:
                var a = caml_jsbytes_of_string(a), b = caml_jsbytes_of_string(b);
                if (a !== b) {
                  if (a < b) return -1;
                  if (a > b) return 1;
                }
                break;
              case 12520:
                var a = a.toString(), b = b.toString();
                if (a !== b) {
                  if (a < b) return -1;
                  if (a > b) return 1;
                }
                break;
              default:
                if (caml_is_continuation_tag(tag_a)) {
                  caml_invalid_argument("compare: continuation value");
                  break;
                }
                if (a.length !== b.length) return a.length < b.length ? -1 : 1;
                if (a.length > 1) stack.push(a, b, 1);
                break;
            }
          }
          if (stack.length === 0) return 0;
          var i = stack.pop();
          b = stack.pop();
          a = stack.pop();
          if (i + 1 < a.length) stack.push(a, b, i + 1);
          a = a[i];
          b = b[i];
        }
      }
      function caml_compare(a, b) {
        return caml_compare_val(a, b, true);
      }
      function caml_continuation_use_noexc(cont) {
        var stack = cont[1];
        cont[1] = 0;
        return stack;
      }
      function caml_continuation_use_and_update_handler_noexc(cont, hval, hexn, heff) {
        var stack = caml_continuation_use_noexc(cont);
        if (stack === 0) return stack;
        var last = cont[2];
        if (last === 0) {
          last = stack;
          while (last.e !== 0) last = last.e;
        }
        last.h[1] = hval;
        last.h[2] = hexn;
        last.h[3] = heff;
        return stack;
      }
      function caml_convert_raw_backtrace() {
        return [0];
      }
      function caml_convert_raw_backtrace_slot() {
        caml_failwith("caml_convert_raw_backtrace_slot");
      }
      function caml_copysign_float(x2, y) {
        if (y === 0) y = 1 / y;
        x2 = Math.abs(x2);
        return y < 0 ? -x2 : x2;
      }
      function caml_cosh_float(x2) {
        return Math.cosh(x2);
      }
      function fs_node_supported() {
        return typeof globalThis.process !== "undefined" && typeof globalThis.process.versions !== "undefined" && typeof globalThis.process.versions.node !== "undefined";
      }
      function make_path_is_absolute() {
        function posix(path) {
          if (path.charAt(0) === "/") return ["", path.slice(1)];
          return;
        }
        function win32(path) {
          var splitDeviceRe = /^([a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?([\s\S]*?)$/, result = splitDeviceRe.exec(path), device = result[1] || "", isUnc = device.length > 0 && device.charAt(1) !== ":";
          if (result[2] || isUnc) {
            var root = result[1] || "", sep = result[2] || "";
            return [root, path.slice(root.length + sep.length)];
          }
          return;
        }
        return fs_node_supported() && globalThis.process && globalThis.process.platform ? globalThis.process.platform === "win32" ? win32 : posix : posix;
      }
      var path_is_absolute = make_path_is_absolute();
      function caml_trailing_slash(name) {
        return name.slice(-1) !== "/" ? name + "/" : name;
      }
      if (fs_node_supported() && globalThis.process && globalThis.process.cwd)
        var caml_current_dir = globalThis.process.cwd().replace(/\\/g, "/");
      else
        var caml_current_dir = "/static";
      caml_current_dir = caml_trailing_slash(caml_current_dir);
      function caml_make_path(name) {
        name = caml_jsstring_of_string(name);
        if (!path_is_absolute(name)) name = caml_current_dir + name;
        var comp0 = path_is_absolute(name), comp = comp0[1].split(/[/\\]/), ncomp = [];
        for (var i = 0; i < comp.length; i++)
          switch (comp[i]) {
            case "..":
              if (ncomp.length > 1) ncomp.pop();
              break;
            case ".":
              break;
            case "":
              break;
            default:
              ncomp.push(comp[i]);
              break;
          }
        ncomp.unshift(comp0[0]);
        ncomp.orig = name;
        return ncomp;
      }
      function caml_get_root(path) {
        var x2 = path_is_absolute(path);
        if (!x2) return;
        return x2[0] + "/";
      }
      var caml_root = caml_get_root(caml_current_dir) || caml_failwith("unable to compute caml_root"), jsoo_mount_point = [];
      if (fs_node_supported())
        jsoo_mount_point.push({ path: caml_root, device: new MlNodeDevice(caml_root) });
      else
        jsoo_mount_point.push({ path: caml_root, device: new MlFakeDevice(caml_root) });
      jsoo_mount_point.push({ path: "/static/", device: new MlFakeDevice("/static/") });
      function resolve_fs_device(name) {
        var path = caml_make_path(name), name = path.join("/"), name_slash = caml_trailing_slash(name), res;
        for (var i = 0; i < jsoo_mount_point.length; i++) {
          var m = jsoo_mount_point[i];
          if (name_slash.search(m.path) === 0 && (!res || res.path.length < m.path.length))
            res = {
              path: m.path,
              device: m.device,
              rest: name.slice(m.path.length, name.length)
            };
        }
        if (!res && fs_node_supported()) {
          var root = caml_get_root(name);
          if (root && root.match(/^[a-zA-Z]:\/$/)) {
            var m = { path: root, device: new MlNodeDevice(root) };
            jsoo_mount_point.push(m);
            res = {
              path: m.path,
              device: m.device,
              rest: name.slice(m.path.length, name.length)
            };
          }
        }
        if (res) return res;
        caml_raise_sys_error("no device found for " + name_slash);
      }
      function caml_create_file(name, content) {
        var root = resolve_fs_device(name);
        if (!root.device.register) caml_failwith("cannot register file");
        root.device.register(root.rest, content);
        return 0;
      }
      function caml_create_string(len) {
        caml_invalid_argument("String.create");
      }
      var caml_custom_event_index = 0;
      function caml_custom_identifier(o) {
        return caml_string_of_jsstring(o.caml_custom);
      }
      var zstd_decompress = function() {
        var ab = ArrayBuffer, u8 = Uint8Array, u16 = Uint16Array, i16 = Int16Array, u32 = Uint32Array, i32 = Int32Array;
        function slc(v, s2, e) {
          if (u8.prototype.slice) return u8.prototype.slice.call(v, s2, e);
          if (s2 == null || s2 < 0) s2 = 0;
          if (e == null || e > v.length) e = v.length;
          var n = new u8(e - s2);
          n.set(v.subarray(s2, e));
          return n;
        }
        function fill(v, n, s2, e) {
          if (u8.prototype.fill) return u8.prototype.fill.call(v, n, s2, e);
          if (s2 == null || s2 < 0) s2 = 0;
          if (e == null || e > v.length) e = v.length;
          for (; s2 < e; ++s2) v[s2] = n;
          return v;
        }
        function cpw(v, t, s2, e) {
          if (u8.prototype.copyWithin)
            return u8.prototype.copyWithin.call(v, t, s2, e);
          if (s2 == null || s2 < 0) s2 = 0;
          if (e == null || e > v.length) e = v.length;
          while (s2 < e) v[t++] = v[s2++];
        }
        var ec = [
          "invalid zstd data",
          "window size too large (>2046MB)",
          "invalid block type",
          "FSE accuracy too high",
          "match distance too far back",
          "unexpected EOF"
        ];
        function err(ind, msg, nt) {
          var e = new Error(msg || ec[ind]);
          e.code = ind;
          if (!nt) throw e;
          return e;
        }
        function rb(d, b, n) {
          var i = 0, o = 0;
          for (; i < n; ++i) o |= d[b++] << (i << 3);
          return o;
        }
        function b4(d, b) {
          return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
        }
        function rzfh(dat, w) {
          var n3 = dat[0] | dat[1] << 8 | dat[2] << 16;
          if (n3 === 3126568 && dat[3] === 253) {
            var flg = dat[4], ss = flg >> 5 & 1, cc = flg >> 2 & 1, df = flg & 3, fcf = flg >> 6;
            if (flg & 8) err(0);
            var bt = 6 - ss, db = df === 3 ? 4 : df, di = rb(dat, bt, db);
            bt += db;
            var fsb = fcf ? 1 << fcf : ss, fss = rb(dat, bt, fsb) + (fcf === 1 && 256), ws = fss;
            if (!ss) {
              var wb = 1 << 10 + (dat[5] >> 3);
              ws = wb + (wb >> 3) * (dat[5] & 7);
            }
            if (ws > 2145386496) err(1);
            var buf = new u8((w === 1 ? fss || ws : w ? 0 : ws) + 12);
            buf[0] = 1, buf[4] = 4, buf[8] = 8;
            return {
              b: bt + fsb,
              y: 0,
              l: 0,
              d: di,
              w: w && w !== 1 ? w : buf.subarray(12),
              e: ws,
              o: new i32(buf.buffer, 0, 3),
              u: fss,
              c: cc,
              m: Math.min(131072, ws)
            };
          } else if ((n3 >> 4 | dat[3] << 20) === 25481893)
            return b4(dat, 4) + 8;
          err(0);
        }
        function msb(val) {
          var bits = 0;
          for (; 1 << bits <= val; ++bits) ;
          return bits - 1;
        }
        function rfse(dat, bt, mal) {
          var tpos = (bt << 3) + 4, al = (dat[bt] & 15) + 5;
          if (al > mal) err(3);
          var sz = 1 << al, probs = sz, sym = -1, re = -1, i = -1, ht = sz, buf = new ab(512 + (sz << 2)), freq = new i16(buf, 0, 256), dstate = new u16(buf, 0, 256), nstate = new u16(buf, 512, sz), bb1 = 512 + (sz << 1), syms = new u8(buf, bb1, sz), nbits = new u8(buf, bb1 + sz);
          while (sym < 255 && probs > 0) {
            var bits = msb(probs + 1), cbt = tpos >> 3, msk = (1 << bits + 1) - 1, val = (dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (tpos & 7) & msk, msk1fb = (1 << bits) - 1, msv = msk - probs - 1, sval = val & msk1fb;
            if (sval < msv)
              tpos += bits, val = sval;
            else {
              tpos += bits + 1;
              if (val > msk1fb) val -= msv;
            }
            freq[++sym] = --val;
            if (val === -1) {
              probs += val;
              syms[--ht] = sym;
            } else probs -= val;
            if (!val)
              do {
                var rbt = tpos >> 3;
                re = (dat[rbt] | dat[rbt + 1] << 8) >> (tpos & 7) & 3;
                tpos += 2;
                sym += re;
              } while (re === 3);
          }
          if (sym > 255 || probs) err(0);
          var sympos = 0, sstep = (sz >> 1) + (sz >> 3) + 3, smask = sz - 1;
          for (var s2 = 0; s2 <= sym; ++s2) {
            var sf = freq[s2];
            if (sf < 1) {
              dstate[s2] = -sf;
              continue;
            }
            for (i = 0; i < sf; ++i) {
              syms[sympos] = s2;
              do
                sympos = sympos + sstep & smask;
              while (sympos >= ht);
            }
          }
          if (sympos) err(0);
          for (i = 0; i < sz; ++i) {
            var ns = dstate[syms[i]]++, nb = nbits[i] = al - msb(ns);
            nstate[i] = (ns << nb) - sz;
          }
          return [tpos + 7 >> 3, { b: al, s: syms, n: nbits, t: nstate }];
        }
        function rhu(dat, bt) {
          var i = 0, wc = -1, buf = new u8(292), hb = dat[bt], hw = buf.subarray(0, 256), rc = buf.subarray(256, 268), ri = new u16(buf.buffer, 268);
          if (hb < 128) {
            var _a2 = rfse(dat, bt + 1, 6), ebt = _a2[0], fdt = _a2[1];
            bt += hb;
            var epos = ebt << 3, lb = dat[bt];
            if (!lb) err(0);
            var st1 = 0, st2 = 0, btr1 = fdt.b, btr2 = btr1, fpos = (++bt << 3) - 8 + msb(lb);
            for (; ; ) {
              fpos -= btr1;
              if (fpos < epos) break;
              var cbt = fpos >> 3;
              st1 += (dat[cbt] | dat[cbt + 1] << 8) >> (fpos & 7) & (1 << btr1) - 1;
              hw[++wc] = fdt.s[st1];
              fpos -= btr2;
              if (fpos < epos) break;
              cbt = fpos >> 3;
              st2 += (dat[cbt] | dat[cbt + 1] << 8) >> (fpos & 7) & (1 << btr2) - 1;
              hw[++wc] = fdt.s[st2];
              btr1 = fdt.n[st1];
              st1 = fdt.t[st1];
              btr2 = fdt.n[st2];
              st2 = fdt.t[st2];
            }
            if (++wc > 255) err(0);
          } else {
            wc = hb - 127;
            for (; i < wc; i += 2) {
              var byte = dat[++bt];
              hw[i] = byte >> 4;
              hw[i + 1] = byte & 15;
            }
            ++bt;
          }
          var wes = 0;
          for (i = 0; i < wc; ++i) {
            var wt = hw[i];
            if (wt > 11) err(0);
            wes += wt && 1 << wt - 1;
          }
          var mb = msb(wes) + 1, ts = 1 << mb, rem = ts - wes;
          if (rem & rem - 1) err(0);
          hw[wc++] = msb(rem) + 1;
          for (i = 0; i < wc; ++i) {
            var wt = hw[i];
            ++rc[hw[i] = wt && mb + 1 - wt];
          }
          var hbuf = new u8(ts << 1), syms = hbuf.subarray(0, ts), nb = hbuf.subarray(ts);
          ri[mb] = 0;
          for (i = mb; i > 0; --i) {
            var pv = ri[i];
            fill(nb, i, pv, ri[i - 1] = pv + rc[i] * (1 << mb - i));
          }
          if (ri[0] !== ts) err(0);
          for (i = 0; i < wc; ++i) {
            var bits = hw[i];
            if (bits) {
              var code = ri[bits];
              fill(syms, i, code, ri[bits] = code + (1 << mb - bits));
            }
          }
          return [bt, { n: nb, b: mb, s: syms }];
        }
        var dllt = rfse(
          new u8([
            81,
            16,
            99,
            140,
            49,
            198,
            24,
            99,
            12,
            33,
            196,
            24,
            99,
            102,
            102,
            134,
            70,
            146,
            4
          ]),
          0,
          6
        )[1], dmlt = rfse(
          new u8([
            33,
            20,
            196,
            24,
            99,
            140,
            33,
            132,
            16,
            66,
            8,
            33,
            132,
            16,
            66,
            8,
            33,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            68,
            36,
            9
          ]),
          0,
          6
        )[1], doct = rfse(
          new u8([32, 132, 16, 66, 102, 70, 68, 68, 68, 68, 36, 73, 2]),
          0,
          5
        )[1];
        function b2bl(b, s2) {
          var len = b.length, bl = new i32(len);
          for (var i = 0; i < len; ++i) {
            bl[i] = s2;
            s2 += 1 << b[i];
          }
          return bl;
        }
        var llb = new u8(
          new i32([
            0,
            0,
            0,
            0,
            16843009,
            50528770,
            134678020,
            202050057,
            269422093
          ]).buffer,
          0,
          36
        ), llbl = b2bl(llb, 0), mlb = new u8(
          new i32([
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            16843009,
            50528770,
            117769220,
            185207048,
            252579084,
            16
          ]).buffer,
          0,
          53
        ), mlbl = b2bl(mlb, 3);
        function dhu(dat, out, hu) {
          var len = dat.length, ss = out.length, lb = dat[len - 1], msk = (1 << hu.b) - 1, eb = -hu.b;
          if (!lb) err(0);
          var st = 0, btr = hu.b, pos = (len << 3) - 8 + msb(lb) - btr, i = -1;
          while (pos > eb && i < ss) {
            var cbt = pos >> 3, val = (dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (pos & 7);
            st = (st << btr | val) & msk;
            out[++i] = hu.s[st];
            pos -= btr = hu.n[st];
          }
          if (pos !== eb || i + 1 !== ss) err(0);
        }
        function dhu4(dat, out, hu) {
          var bt = 6, ss = out.length, sz1 = ss + 3 >> 2, sz2 = sz1 << 1, sz3 = sz1 + sz2;
          dhu(
            dat.subarray(bt, bt += dat[0] | dat[1] << 8),
            out.subarray(0, sz1),
            hu
          );
          dhu(
            dat.subarray(bt, bt += dat[2] | dat[3] << 8),
            out.subarray(sz1, sz2),
            hu
          );
          dhu(
            dat.subarray(bt, bt += dat[4] | dat[5] << 8),
            out.subarray(sz2, sz3),
            hu
          );
          dhu(dat.subarray(bt), out.subarray(sz3), hu);
        }
        function rzb(dat, st, out) {
          var _a2, bt = st.b, b0 = dat[bt], btype = b0 >> 1 & 3;
          st.l = b0 & 1;
          var sz = b0 >> 3 | dat[bt + 1] << 5 | dat[bt + 2] << 13, ebt = (bt += 3) + sz;
          if (btype === 1) {
            if (bt >= dat.length) return;
            st.b = bt + 1;
            if (out) {
              fill(out, dat[bt], st.y, st.y += sz);
              return out;
            }
            return fill(new u8(sz), dat[bt]);
          }
          if (ebt > dat.length) return;
          if (btype === 0) {
            st.b = ebt;
            if (out) {
              out.set(dat.subarray(bt, ebt), st.y);
              st.y += sz;
              return out;
            }
            return slc(dat, bt, ebt);
          }
          if (btype === 2) {
            var b3 = dat[bt], lbt = b3 & 3, sf = b3 >> 2 & 3, lss = b3 >> 4, lcs = 0, s4 = 0;
            if (lbt < 2)
              if (sf & 1)
                lss |= dat[++bt] << 4 | (sf & 2 && dat[++bt] << 12);
              else
                lss = b3 >> 3;
            else {
              s4 = sf;
              if (sf < 2)
                lss |= (dat[++bt] & 63) << 4, lcs = dat[bt] >> 6 | dat[++bt] << 2;
              else if (sf === 2)
                lss |= dat[++bt] << 4 | (dat[++bt] & 3) << 12, lcs = dat[bt] >> 2 | dat[++bt] << 6;
              else
                lss |= dat[++bt] << 4 | (dat[++bt] & 63) << 12, lcs = dat[bt] >> 6 | dat[++bt] << 2 | dat[++bt] << 10;
            }
            ++bt;
            var buf = out ? out.subarray(st.y, st.y + st.m) : new u8(st.m), spl = buf.length - lss;
            if (lbt === 0)
              buf.set(dat.subarray(bt, bt += lss), spl);
            else if (lbt === 1)
              fill(buf, dat[bt++], spl);
            else {
              var hu = st.h;
              if (lbt === 2) {
                var hud = rhu(dat, bt);
                lcs += bt - (bt = hud[0]);
                st.h = hu = hud[1];
              } else if (!hu) err(0);
              (s4 ? dhu4 : dhu)(dat.subarray(bt, bt += lcs), buf.subarray(spl), hu);
            }
            var ns = dat[bt++];
            if (ns) {
              if (ns === 255)
                ns = (dat[bt++] | dat[bt++] << 8) + 32512;
              else if (ns > 127) ns = ns - 128 << 8 | dat[bt++];
              var scm = dat[bt++];
              if (scm & 3) err(0);
              var dts = [dmlt, doct, dllt];
              for (var i = 2; i > -1; --i) {
                var md = scm >> (i << 1) + 2 & 3;
                if (md === 1) {
                  var rbuf = new u8([0, 0, dat[bt++]]);
                  dts[i] = {
                    s: rbuf.subarray(2, 3),
                    n: rbuf.subarray(0, 1),
                    t: new u16(rbuf.buffer, 0, 1),
                    b: 0
                  };
                } else if (md === 2)
                  _a2 = rfse(dat, bt, 9 - (i & 1)), bt = _a2[0], dts[i] = _a2[1];
                else if (md === 3) {
                  if (!st.t) err(0);
                  dts[i] = st.t[i];
                }
              }
              var _b = st.t = dts, mlt = _b[0], oct = _b[1], llt = _b[2], lb = dat[ebt - 1];
              if (!lb) err(0);
              var spos = (ebt << 3) - 8 + msb(lb) - llt.b, cbt = spos >> 3, oubt = 0, lst = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << llt.b) - 1;
              cbt = (spos -= oct.b) >> 3;
              var ost = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << oct.b) - 1;
              cbt = (spos -= mlt.b) >> 3;
              var mst = (dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << mlt.b) - 1;
              for (++ns; --ns; ) {
                var llc = llt.s[lst], lbtr = llt.n[lst], mlc = mlt.s[mst], mbtr = mlt.n[mst], ofc = oct.s[ost], obtr = oct.n[ost];
                cbt = (spos -= ofc) >> 3;
                var ofp = 1 << ofc, off = ofp + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16 | dat[cbt + 3] << 24) >>> (spos & 7) & ofp - 1);
                cbt = (spos -= mlb[mlc]) >> 3;
                var ml = mlbl[mlc] + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (spos & 7) & (1 << mlb[mlc]) - 1);
                cbt = (spos -= llb[llc]) >> 3;
                var ll = llbl[llc] + ((dat[cbt] | dat[cbt + 1] << 8 | dat[cbt + 2] << 16) >> (spos & 7) & (1 << llb[llc]) - 1);
                cbt = (spos -= lbtr) >> 3;
                lst = llt.t[lst] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << lbtr) - 1);
                cbt = (spos -= mbtr) >> 3;
                mst = mlt.t[mst] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << mbtr) - 1);
                cbt = (spos -= obtr) >> 3;
                ost = oct.t[ost] + ((dat[cbt] | dat[cbt + 1] << 8) >> (spos & 7) & (1 << obtr) - 1);
                if (off > 3) {
                  st.o[2] = st.o[1];
                  st.o[1] = st.o[0];
                  st.o[0] = off -= 3;
                } else {
                  var idx = off - (ll !== 0);
                  if (idx) {
                    off = idx === 3 ? st.o[0] - 1 : st.o[idx];
                    if (idx > 1) st.o[2] = st.o[1];
                    st.o[1] = st.o[0];
                    st.o[0] = off;
                  } else
                    off = st.o[0];
                }
                for (var i = 0; i < ll; ++i) buf[oubt + i] = buf[spl + i];
                oubt += ll, spl += ll;
                var stin = oubt - off;
                if (stin < 0) {
                  var len = -stin, bs = st.e + stin;
                  if (len > ml) len = ml;
                  for (var i = 0; i < len; ++i) buf[oubt + i] = st.w[bs + i];
                  oubt += len, ml -= len, stin = 0;
                }
                for (var i = 0; i < ml; ++i) buf[oubt + i] = buf[stin + i];
                oubt += ml;
              }
              if (oubt !== spl)
                while (spl < buf.length) buf[oubt++] = buf[spl++];
              else
                oubt = buf.length;
              if (out) st.y += oubt;
              else buf = slc(buf, 0, oubt);
            } else if (out) {
              st.y += lss;
              if (spl) for (var i = 0; i < lss; ++i) buf[i] = buf[spl + i];
            } else if (spl) buf = slc(buf, spl);
            st.b = ebt;
            return buf;
          }
          err(2);
        }
        function cct(bufs, ol) {
          if (bufs.length === 1) return bufs[0];
          var buf = new u8(ol);
          for (var i = 0, b = 0; i < bufs.length; ++i) {
            var chk = bufs[i];
            buf.set(chk, b);
            b += chk.length;
          }
          return buf;
        }
        return function(dat, buf) {
          var bt = 0, bufs = [], nb = +!buf, ol = 0;
          while (dat.length) {
            var st = rzfh(dat, nb || buf);
            if (typeof st === "object") {
              if (nb) {
                buf = null;
                if (st.w.length === st.u) {
                  bufs.push(buf = st.w);
                  ol += st.u;
                }
              } else {
                bufs.push(buf);
                st.e = 0;
              }
              while (!st.l) {
                var blk = rzb(dat, st, buf);
                if (!blk) err(5);
                if (buf)
                  st.e = st.y;
                else {
                  bufs.push(blk);
                  ol += blk.length;
                  cpw(st.w, 0, blk.length);
                  st.w.set(blk, st.w.length - blk.length);
                }
              }
              bt = st.b + st.c * 4;
            } else
              bt = st;
            dat = dat.subarray(bt);
          }
          return cct(bufs, ol);
        };
      }(), caml_decompress_input = zstd_decompress;
      function caml_div(x2, y) {
        if (y === 0) caml_raise_zero_divide();
        return x2 / y | 0;
      }
      var caml_domain_dls = [0];
      function caml_domain_dls_compare_and_set(old, n) {
        if (caml_domain_dls !== old) return 0;
        caml_domain_dls = n;
        return 1;
      }
      function caml_domain_dls_get(unit) {
        return caml_domain_dls;
      }
      function caml_domain_dls_set(a) {
        caml_domain_dls = a;
      }
      var caml_domain_id = 0;
      function caml_ml_mutex_unlock(t) {
        t.locked = false;
        return 0;
      }
      var caml_domain_latest_idx = 1;
      function caml_domain_spawn(f, term_sync) {
        var id = caml_domain_latest_idx++, old = caml_domain_id;
        caml_domain_id = id;
        var res = caml_callback(f, [0]);
        caml_domain_id = old;
        caml_ml_mutex_unlock(term_sync[2]);
        term_sync[1] = [0, [0, res]];
        return id;
      }
      var caml_ephe_none = { caml_ephe_none: 0 }, caml_ephe_data_offset = 2, caml_ephe_key_offset = 3;
      function caml_ephe_get_data(x2) {
        var data = x2[caml_ephe_data_offset];
        if (data === caml_ephe_none) return 0;
        for (var i = caml_ephe_key_offset; i < x2.length; i++) {
          var k = x2[i];
          if (globalThis.WeakRef && k instanceof globalThis.WeakRef) {
            var d = k.deref();
            if (d === void 0) {
              x2[i] = caml_ephe_none;
              x2[caml_ephe_data_offset] = caml_ephe_none;
              return 0;
            }
            if (globalThis.WeakMap) {
              data = data.get(k);
              if (data === void 0) {
                x2[caml_ephe_data_offset] = caml_ephe_none;
                return 0;
              }
            }
          }
        }
        return [0, data];
      }
      function caml_ephe_unset_data(x2) {
        x2[caml_ephe_data_offset] = caml_ephe_none;
        return 0;
      }
      function caml_ephe_set_data(x2, data) {
        for (var i = x2.length - 1; i >= caml_ephe_key_offset; i--) {
          var k = x2[i];
          if (globalThis.WeakRef && k instanceof globalThis.WeakRef) {
            var d = k.deref();
            if (d === void 0) {
              x2[i] = caml_ephe_none;
              continue;
            }
            if (globalThis.WeakMap) data = new globalThis.WeakMap().set(k, data);
          }
        }
        x2[caml_ephe_data_offset] = data;
        return 0;
      }
      function caml_ephe_set_data_opt(x2, data_opt) {
        if (data_opt === 0)
          caml_ephe_unset_data(x2);
        else
          caml_ephe_set_data(x2, data_opt[1]);
        return 0;
      }
      function caml_ephe_blit_data(src, dst) {
        var old = caml_ephe_get_data(src);
        caml_ephe_set_data_opt(dst, old);
        return 0;
      }
      function caml_ephe_blit_key(a1, i1, a2, i2, len) {
        var old = caml_ephe_get_data(a1);
        caml_array_blit(
          a1,
          caml_ephe_key_offset + i1 - 1,
          a2,
          caml_ephe_key_offset + i2 - 1,
          len
        );
        caml_ephe_set_data_opt(a2, old);
        return 0;
      }
      function caml_ephe_check_data(x2) {
        var data = caml_ephe_get_data(x2);
        return data === 0 ? 0 : 1;
      }
      function caml_ephe_check_key(x2, i) {
        var weak = x2[caml_ephe_key_offset + i];
        if (weak === caml_ephe_none) return 0;
        if (globalThis.WeakRef && weak instanceof globalThis.WeakRef) {
          weak = weak.deref();
          if (weak === void 0) {
            x2[caml_ephe_key_offset + i] = caml_ephe_none;
            x2[caml_ephe_data_offset] = caml_ephe_none;
            return 0;
          }
        }
        return 1;
      }
      function caml_weak_create(n) {
        var alen = caml_ephe_key_offset + n, x2 = new Array(alen);
        x2[0] = 251;
        x2[1] = "caml_ephe_list_head";
        for (var i = 2; i < alen; i++) x2[i] = caml_ephe_none;
        return x2;
      }
      function caml_ephe_create(n) {
        return caml_weak_create(n);
      }
      function caml_obj_dup(x2) {
        var l = x2.length, a = new Array(l);
        for (var i = 0; i < l; i++) a[i] = x2[i];
        return a;
      }
      function caml_ephe_get_data_copy(x2) {
        var r = caml_ephe_get_data(x2);
        if (r === 0) return 0;
        var z = r[1];
        if (Array.isArray(z)) return [0, caml_obj_dup(z)];
        return r;
      }
      function caml_ephe_get_key(x2, i) {
        var weak = x2[caml_ephe_key_offset + i];
        if (weak === caml_ephe_none) return 0;
        if (globalThis.WeakRef && weak instanceof globalThis.WeakRef) {
          weak = weak.deref();
          if (weak === void 0) {
            x2[caml_ephe_key_offset + i] = caml_ephe_none;
            x2[caml_ephe_data_offset] = caml_ephe_none;
            return 0;
          }
        }
        return [0, weak];
      }
      function caml_ephe_get_key_copy(x2, i) {
        var y = caml_ephe_get_key(x2, i);
        if (y === 0) return y;
        var z = y[1];
        if (Array.isArray(z)) return [0, caml_obj_dup(z)];
        return y;
      }
      function caml_ephe_set_key(x2, i, v) {
        var old = caml_ephe_get_data(x2);
        if (globalThis.WeakRef && v instanceof Object)
          v = new globalThis.WeakRef(v);
        x2[caml_ephe_key_offset + i] = v;
        caml_ephe_set_data_opt(x2, old);
        return 0;
      }
      function caml_ephe_unset_key(x2, i) {
        var old = caml_ephe_get_data(x2);
        x2[caml_ephe_key_offset + i] = caml_ephe_none;
        caml_ephe_set_data_opt(x2, old);
        return 0;
      }
      function caml_equal(x2, y) {
        return +(caml_compare_val(x2, y, false) === 0);
      }
      function caml_erf_float(x2) {
        var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911, sign = 1;
        if (x2 < 0) sign = -1;
        x2 = Math.abs(x2);
        var t = 1 / (1 + p * x2), y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-(x2 * x2));
        return sign * y;
      }
      function caml_erfc_float(x2) {
        return 1 - caml_erf_float(x2);
      }
      var caml_executable_name = caml_argv[1];
      function caml_exp2_float(x2) {
        return Math.pow(2, x2);
      }
      function caml_expm1_float(x2) {
        return Math.expm1(x2);
      }
      function caml_is_special_exception(exn) {
        switch (exn[2]) {
          case -8:
          case -11:
          case -12:
            return 1;
          default:
            return 0;
        }
      }
      function caml_format_exception(exn) {
        var r = "";
        if (exn[0] === 0) {
          r += exn[1][1];
          if (exn.length === 3 && exn[2][0] === 0 && caml_is_special_exception(exn[1]))
            var bucket = exn[2], start = 1;
          else
            var start = 2, bucket = exn;
          r += "(";
          for (var i = start; i < bucket.length; i++) {
            if (i > start) r += ", ";
            var v = bucket[i];
            if (typeof v === "number")
              r += v.toString();
            else if (v instanceof MlBytes)
              r += '"' + v.toString() + '"';
            else if (typeof v === "string")
              r += '"' + v.toString() + '"';
            else
              r += "_";
          }
          r += ")";
        } else if (exn[0] === 248) r += exn[1];
        return r;
      }
      function caml_fatal_uncaught_exception(err) {
        if (Array.isArray(err) && (err[0] === 0 || err[0] === 248)) {
          var handler = caml_named_value("Printexc.handle_uncaught_exception");
          if (handler)
            caml_callback(handler, [err, false]);
          else {
            var msg = caml_format_exception(err), at_exit = caml_named_value("Pervasives.do_at_exit");
            if (at_exit) caml_callback(at_exit, [0]);
            console.error("Fatal error: exception " + msg);
            if (err.js_error) throw err.js_error;
          }
        } else
          throw err;
      }
      function caml_fill_bytes(s2, i, l, c) {
        if (l > 0)
          if (i === 0 && (l >= s2.l || s2.t === 2 && l >= s2.c.length))
            if (c === 0) {
              s2.c = "";
              s2.t = 2;
            } else {
              s2.c = caml_str_repeat(l, String.fromCharCode(c));
              s2.t = l === s2.l ? 0 : 2;
            }
          else {
            if (s2.t !== 4) caml_convert_bytes_to_array(s2);
            for (l += i; i < l; i++) s2.c[i] = c;
          }
        return 0;
      }
      function caml_final_register() {
        return 0;
      }
      var all_finalizers = new globalThis.Set();
      function caml_final_register_called_without_value(cb, a) {
        if (globalThis.FinalizationRegistry && a instanceof Object) {
          var x2 = new globalThis.FinalizationRegistry(function(x3) {
            all_finalizers.delete(x3);
            cb(0);
            return;
          });
          x2.register(a, x2);
          all_finalizers.add(x2);
        }
        return 0;
      }
      function caml_final_release() {
        return 0;
      }
      function caml_finish_formatting(f, rawbuffer) {
        if (f.uppercase) rawbuffer = rawbuffer.toUpperCase();
        var len = rawbuffer.length;
        if (f.signedconv && (f.sign < 0 || f.signstyle !== "-")) len++;
        if (f.alternate) {
          if (f.base === 8) len += 1;
          if (f.base === 16) len += 2;
        }
        var buffer = "";
        if (f.justify === "+" && f.filler === " ")
          for (var i = len; i < f.width; i++) buffer += " ";
        if (f.signedconv) {
          if (f.sign < 0)
            buffer += "-";
          else if (f.signstyle !== "-") buffer += f.signstyle;
        }
        if (f.alternate && f.base === 8) buffer += "0";
        if (f.alternate && f.base === 16) buffer += f.uppercase ? "0X" : "0x";
        if (f.justify === "+" && f.filler === "0")
          for (var i = len; i < f.width; i++) buffer += "0";
        buffer += rawbuffer;
        if (f.justify === "-") for (var i = len; i < f.width; i++) buffer += " ";
        return caml_string_of_jsbytes(buffer);
      }
      function caml_float_compare(x2, y) {
        if (x2 === y) return 0;
        if (x2 < y) return -1;
        if (x2 > y) return 1;
        if (!Number.isNaN(x2)) return 1;
        if (!Number.isNaN(y)) return -1;
        return 0;
      }
      function caml_float_of_bytes(a) {
        return caml_int64_float_of_bits(caml_int64_of_bytes(a));
      }
      function caml_float_of_string(s2) {
        var res, r_float = /^ *[-+]?(?:\d*\.?\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?$/;
        s2 = caml_jsbytes_of_string(s2);
        res = +s2;
        if (!Number.isNaN(res) && r_float.test(s2)) return res;
        s2 = s2.replace(/_/g, "");
        res = +s2;
        if (!Number.isNaN(res) && r_float.test(s2) || /^[+-]?nan$/i.test(s2))
          return res;
        var m = /^ *([+-]?)0x([0-9a-f]+)\.?([0-9a-f]*)(p([+-]?[0-9]+))?$/i.exec(s2);
        if (m) {
          var m3 = m[3].replace(/0+$/, ""), mantissa = Number.parseInt(m[1] + m[2] + m3, 16), exponent = (+m[5] || 0) - 4 * m3.length;
          res = mantissa * Math.pow(2, exponent);
          return res;
        }
        if (/^\+?inf(inity)?$/i.test(s2)) return Number.POSITIVE_INFINITY;
        if (/^-inf(inity)?$/i.test(s2)) return Number.NEGATIVE_INFINITY;
        caml_failwith("float_of_string");
      }
      function caml_floatarray_append(a1, a2) {
        return caml_array_append(a1, a2);
      }
      function caml_floatarray_blit(a1, i1, a2, i2, len) {
        return caml_array_blit(a1, i1, a2, i2, len);
      }
      function caml_floatarray_create(len) {
        if (len >>> 0 >= (2147483647 / 8 | 0)) caml_array_bound_error();
        var len = len + 1 | 0, b = new Array(len);
        b[0] = 254;
        for (var i = 1; i < len; i++) b[i] = 0;
        return b;
      }
      function caml_floatarray_fill(array, ofs, len, v) {
        return caml_array_fill(array, ofs, len, v);
      }
      function caml_floatarray_fill_unboxed(array, ofs, len, v) {
        return caml_array_fill(array, ofs, len, v);
      }
      function caml_floatarray_make(len, init) {
        if (len >>> 0 >= (2147483647 / 8 | 0)) caml_array_bound_error();
        var len = len + 1 | 0, b = new Array(len);
        b[0] = 254;
        for (var i = 1; i < len; i++) b[i] = init;
        return b;
      }
      function caml_floatarray_make_unboxed(len, init) {
        return caml_floatarray_make(len, init);
      }
      function caml_floatarray_sub(a, i, len) {
        return caml_array_sub(a, i, len);
      }
      function caml_fma_float(x2, y, z) {
        var SPLIT = Math.pow(2, 27) + 1, MIN_VALUE = Math.pow(2, -1022), EPSILON = Math.pow(2, -52), C = 416, A = Math.pow(2, +C), B = Math.pow(2, -C);
        function multiply(a, b) {
          var at = SPLIT * a, ahi = at - (at - a), alo = a - ahi, bt = SPLIT * b, bhi = bt - (bt - b), blo = b - bhi, p = a * b, e = ahi * bhi - p + ahi * blo + alo * bhi + alo * blo;
          return { p, e };
        }
        function add(a, b) {
          var s3 = a + b, v = s3 - a, e = a - (s3 - v) + (b - v);
          return { s: s3, e };
        }
        function adjust(x3, y2) {
          return x3 !== 0 && y2 !== 0 && SPLIT * x3 - (SPLIT * x3 - x3) === x3 ? x3 * (1 + (x3 < 0 ? -1 : 1) * (y2 < 0 ? -1 : 1) * EPSILON) : x3;
        }
        if (x2 === 0 || y === 0 || !Number.isFinite(x2) || !Number.isFinite(y))
          return x2 * y + z;
        if (z === 0) return x2 * y;
        if (!Number.isFinite(z)) return z;
        var scale = 1;
        while (Math.abs(x2) > A) {
          scale *= A;
          x2 *= B;
        }
        while (Math.abs(y) > A) {
          scale *= A;
          y *= B;
        }
        if (scale === 1 / 0) return x2 * y * scale;
        while (Math.abs(x2) < B) {
          scale *= B;
          x2 *= A;
        }
        while (Math.abs(y) < B) {
          scale *= B;
          y *= A;
        }
        if (scale === 0) return z;
        var xs = x2, ys = y, zs = z / scale;
        if (Math.abs(zs) > Math.abs(xs * ys) * 4 / EPSILON) return z;
        if (Math.abs(zs) < Math.abs(xs * ys) * EPSILON / 4 * EPSILON / 4)
          zs = (z < 0 ? -1 : 1) * MIN_VALUE;
        var xy = multiply(xs, ys), s2 = add(xy.p, zs), u = add(xy.e, s2.e), i = add(s2.s, u.s), f = i.s + adjust(i.e, u.e);
        if (f === 0) return f;
        var fs = f * scale;
        if (Math.abs(fs) > MIN_VALUE) return fs;
        return fs + adjust(f - fs / scale, i.e) * scale;
      }
      function caml_parse_format(fmt) {
        fmt = caml_jsbytes_of_string(fmt);
        var len = fmt.length;
        if (len > 31) caml_invalid_argument("format_int: format too long");
        var f = {
          justify: "+",
          signstyle: "-",
          filler: " ",
          alternate: false,
          base: 0,
          signedconv: false,
          width: 0,
          uppercase: false,
          sign: 1,
          prec: -1,
          conv: "f"
        };
        for (var i = 0; i < len; i++) {
          var c = fmt.charAt(i);
          switch (c) {
            case "-":
              f.justify = "-";
              break;
            case "+":
            case " ":
              f.signstyle = c;
              break;
            case "0":
              f.filler = "0";
              break;
            case "#":
              f.alternate = true;
              break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              f.width = 0;
              while (c = fmt.charCodeAt(i) - 48, c >= 0 && c <= 9) {
                f.width = f.width * 10 + c;
                i++;
              }
              i--;
              break;
            case ".":
              f.prec = 0;
              i++;
              while (c = fmt.charCodeAt(i) - 48, c >= 0 && c <= 9) {
                f.prec = f.prec * 10 + c;
                i++;
              }
              i--;
              break;
            case "d":
            case "i":
              f.signedconv = true;
              f.base = 10;
              break;
            case "u":
              f.base = 10;
              break;
            case "x":
              f.base = 16;
              break;
            case "X":
              f.base = 16;
              f.uppercase = true;
              break;
            case "o":
              f.base = 8;
              break;
            case "e":
            case "f":
            case "g":
              f.signedconv = true;
              f.conv = c;
              break;
            case "E":
            case "F":
            case "G":
              f.signedconv = true;
              f.uppercase = true;
              f.conv = c.toLowerCase();
              break;
          }
        }
        return f;
      }
      function caml_format_float(fmt, x2) {
        function toFixed(x3, dp) {
          if (Math.abs(x3) < 1)
            return x3.toFixed(dp);
          else {
            var e = Number.parseInt(x3.toString().split("+")[1]);
            if (e > 20) {
              e -= 20;
              x3 /= Math.pow(10, e);
              x3 += new Array(e + 1).join("0");
              if (dp > 0) x3 = x3 + "." + new Array(dp + 1).join("0");
              return x3;
            } else
              return x3.toFixed(dp);
          }
        }
        var s2, f = caml_parse_format(fmt), prec = f.prec < 0 ? 6 : f.prec;
        if (x2 < 0 || x2 === 0 && 1 / x2 === Number.NEGATIVE_INFINITY) {
          f.sign = -1;
          x2 = -x2;
        }
        if (Number.isNaN(x2)) {
          s2 = "nan";
          f.filler = " ";
        } else if (!Number.isFinite(x2)) {
          s2 = "inf";
          f.filler = " ";
        } else
          switch (f.conv) {
            case "e":
              var s2 = x2.toExponential(prec), i = s2.length;
              if (s2.charAt(i - 3) === "e")
                s2 = s2.slice(0, i - 1) + "0" + s2.slice(i - 1);
              break;
            case "f":
              s2 = toFixed(x2, prec);
              break;
            case "g":
              prec = prec ? prec : 1;
              s2 = x2.toExponential(prec - 1);
              var j = s2.indexOf("e"), exp = +s2.slice(j + 1);
              if (exp < -4 || x2 >= 1e21 || x2.toFixed(0).length > prec) {
                var i = j - 1;
                while (s2.charAt(i) === "0") i--;
                if (s2.charAt(i) === ".") i--;
                s2 = s2.slice(0, i + 1) + s2.slice(j);
                i = s2.length;
                if (s2.charAt(i - 3) === "e")
                  s2 = s2.slice(0, i - 1) + "0" + s2.slice(i - 1);
                break;
              } else {
                var p = prec;
                if (exp < 0) {
                  p -= exp + 1;
                  s2 = x2.toFixed(p);
                } else
                  while (s2 = x2.toFixed(p), s2.length > prec + 1) p--;
                if (p) {
                  var i = s2.length - 1;
                  while (s2.charAt(i) === "0") i--;
                  if (s2.charAt(i) === ".") i--;
                  s2 = s2.slice(0, i + 1);
                }
              }
              break;
          }
        return caml_finish_formatting(f, s2);
      }
      function caml_format_int(fmt, i) {
        if (caml_jsbytes_of_string(fmt) === "%d")
          return caml_string_of_jsbytes("" + i);
        var f = caml_parse_format(fmt);
        if (i < 0) if (f.signedconv) {
          f.sign = -1;
          i = -i;
        } else i >>>= 0;
        var s2 = i.toString(f.base);
        if (f.prec >= 0) {
          f.filler = " ";
          var n = f.prec - s2.length;
          if (n > 0) s2 = caml_str_repeat(n, "0") + s2;
        }
        return caml_finish_formatting(f, s2);
      }
      var caml_oo_last_id = 0;
      function caml_fresh_oo_id() {
        return caml_oo_last_id++;
      }
      function caml_frexp_float(x2) {
        if (x2 === 0 || !Number.isFinite(x2)) return [0, x2, 0];
        var neg = x2 < 0;
        if (neg) x2 = -x2;
        var exp = Math.max(-1023, jsoo_floor_log2(x2) + 1);
        x2 *= Math.pow(2, -exp);
        while (x2 < 0.5) {
          x2 *= 2;
          exp--;
        }
        while (x2 >= 1) {
          x2 *= 0.5;
          exp++;
        }
        if (neg) x2 = -x2;
        return [0, x2, exp];
      }
      function jsoo_create_file(name, content) {
        var name = caml_string_of_jsstring(name), content = caml_string_of_jsbytes(content);
        return caml_create_file(name, content);
      }
      function caml_fs_init() {
        var tmp = globalThis.jsoo_fs_tmp;
        if (tmp)
          for (var i = 0; i < tmp.length; i++)
            jsoo_create_file(tmp[i].name, tmp[i].content);
        globalThis.jsoo_create_file = jsoo_create_file;
        globalThis.jsoo_fs_tmp = [];
        return 0;
      }
      function caml_gc_compaction() {
        return 0;
      }
      function caml_gc_counters() {
        return [254, 0, 0, 0];
      }
      function caml_gc_full_major(unit) {
        if (typeof globalThis.gc === "function") globalThis.gc();
        return 0;
      }
      function caml_gc_get() {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      function caml_gc_major(unit) {
        if (typeof globalThis.gc === "function") globalThis.gc();
        return 0;
      }
      function caml_gc_major_slice(work) {
        return 0;
      }
      function caml_gc_minor(unit) {
        if (typeof globalThis.gc === "function") globalThis.gc(true);
        return 0;
      }
      function caml_gc_minor_words(unit) {
        return 0;
      }
      function caml_gc_quick_stat() {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      function caml_gc_set(_control) {
        return 0;
      }
      function caml_gc_stat() {
        return caml_gc_quick_stat();
      }
      function caml_get_continuation_callstack() {
        return [0];
      }
      function caml_get_current_callstack() {
        return [0];
      }
      function caml_get_exception_backtrace() {
        return 0;
      }
      function caml_get_exception_raw_backtrace() {
        return [0];
      }
      function caml_get_global_data() {
        return caml_global_data;
      }
      function caml_get_minor_free(unit) {
        return 0;
      }
      var caml_method_cache = [];
      function caml_get_public_method(obj, tag, cacheid) {
        var meths = obj[1], ofs = caml_method_cache[cacheid];
        if (ofs === void 0)
          for (var i = caml_method_cache.length; i < cacheid; i++)
            caml_method_cache[i] = 0;
        else if (meths[ofs] === tag) return meths[ofs - 1];
        var li = 3, hi = meths[1] * 2 + 1, mi;
        while (li < hi) {
          mi = li + hi >> 1 | 1;
          if (tag < meths[mi + 1]) hi = mi - 2;
          else li = mi;
        }
        caml_method_cache[cacheid] = li + 1;
        return tag === meths[li + 1] ? meths[li] : 0;
      }
      function caml_gr_arc_aux(ctx, cx, cy, ry, rx, a1, a2) {
        while (a1 > a2) a2 += 360;
        a1 /= 180;
        a2 /= 180;
        var rot = 0, xPos, yPos, xPos_prev, yPos_prev, space = 2, num = (a2 - a1) * Math.PI * ((rx + ry) / 2) / space | 0, delta = (a2 - a1) * Math.PI / num, i = a1 * Math.PI;
        for (var j = 0; j <= num; j++) {
          xPos = cx - rx * Math.sin(i) * Math.sin(rot * Math.PI) + ry * Math.cos(i) * Math.cos(rot * Math.PI);
          xPos = xPos.toFixed(2);
          yPos = cy + ry * Math.cos(i) * Math.sin(rot * Math.PI) + rx * Math.sin(i) * Math.cos(rot * Math.PI);
          yPos = yPos.toFixed(2);
          if (j === 0)
            ctx.moveTo(xPos, yPos);
          else if (xPos_prev !== xPos || yPos_prev !== yPos) ctx.lineTo(xPos, yPos);
          xPos_prev = xPos;
          yPos_prev = yPos;
          i -= delta;
        }
        return 0;
      }
      var caml_gr_state;
      function caml_gr_state_get() {
        if (caml_gr_state) return caml_gr_state;
        throw caml_maybe_attach_backtrace([
          0,
          caml_named_value("Graphics.Graphic_failure"),
          caml_string_of_jsbytes("Not initialized")
        ]);
      }
      function caml_gr_blit_image(im, x2, y) {
        var s2 = caml_gr_state_get(), im2 = s2.context.getImageData(x2, s2.height - im.height - y, im.width, im.height);
        for (var i = 0; i < im2.data.length; i += 4) {
          im.data[i] = im2.data[i];
          im.data[i + 1] = im2.data[i + 1];
          im.data[i + 2] = im2.data[i + 2];
          im.data[i + 3] = im2.data[i + 3];
        }
        return 0;
      }
      function caml_gr_clear_graph() {
        var s2 = caml_gr_state_get();
        s2.canvas.width = s2.width;
        s2.canvas.height = s2.height;
        return 0;
      }
      function caml_gr_close_graph() {
        var s2 = caml_gr_state_get();
        s2.canvas.width = 0;
        s2.canvas.height = 0;
        return 0;
      }
      function caml_gr_close_subwindow(a) {
        caml_failwith("caml_gr_close_subwindow not Implemented");
      }
      function caml_gr_create_image(x2, y) {
        var s2 = caml_gr_state_get();
        return s2.context.createImageData(x2, y);
      }
      function caml_gr_current_x() {
        var s2 = caml_gr_state_get();
        return s2.x;
      }
      function caml_gr_current_y() {
        var s2 = caml_gr_state_get();
        return s2.y;
      }
      function caml_gr_display_mode() {
        caml_failwith("caml_gr_display_mode not Implemented");
      }
      function caml_gr_doc_of_state(state) {
        if (state.canvas.ownerDocument) return state.canvas.ownerDocument;
      }
      function caml_gr_draw_arc(x2, y, rx, ry, a1, a2) {
        var s2 = caml_gr_state_get();
        s2.context.beginPath();
        caml_gr_arc_aux(s2.context, x2, s2.height - y, rx, ry, a1, a2);
        s2.context.stroke();
        return 0;
      }
      function caml_gr_draw_str(str) {
        var s2 = caml_gr_state_get(), m = s2.context.measureText(str), dx = m.width;
        s2.context.fillText(str, s2.x, s2.height - s2.y);
        s2.x += dx | 0;
        return 0;
      }
      function caml_gr_draw_char(c) {
        caml_gr_draw_str(String.fromCharCode(c));
        return 0;
      }
      function caml_gr_draw_image(im, x2, y) {
        var s2 = caml_gr_state_get();
        if (!im.image) {
          var canvas = document.createElement("canvas");
          canvas.width = s2.width;
          canvas.height = s2.height;
          canvas.getContext("2d").putImageData(im, 0, 0);
          var image = new globalThis.Image();
          image.onload = function() {
            s2.context.drawImage(image, x2, s2.height - im.height - y);
            im.image = image;
          };
          image.src = canvas.toDataURL("image/png");
        } else
          s2.context.drawImage(im.image, x2, s2.height - im.height - y);
        return 0;
      }
      function caml_gr_draw_rect(x2, y, w, h) {
        var s2 = caml_gr_state_get();
        s2.context.strokeRect(x2, s2.height - y, w, -h);
        return 0;
      }
      function caml_gr_draw_string(str) {
        caml_gr_draw_str(caml_jsstring_of_string(str));
        return 0;
      }
      function caml_gr_dump_image(im) {
        var data = [0];
        for (var i = 0; i < im.height; i++) {
          data[i + 1] = [0];
          for (var j = 0; j < im.width; j++) {
            var o = i * (im.width * 4) + j * 4, r = im.data[o + 0], g = im.data[o + 1], b = im.data[o + 2];
            data[i + 1][j + 1] = (r << 16) + (g << 8) + b;
          }
        }
        return data;
      }
      function caml_gr_fill_arc(x2, y, rx, ry, a1, a2) {
        var s2 = caml_gr_state_get();
        s2.context.beginPath();
        caml_gr_arc_aux(s2.context, x2, s2.height - y, rx, ry, a1, a2);
        s2.context.fill();
        return 0;
      }
      function caml_gr_fill_poly(ar) {
        var s2 = caml_gr_state_get();
        s2.context.beginPath();
        s2.context.moveTo(ar[1][1], s2.height - ar[1][2]);
        for (var i = 2; i < ar.length; i++)
          s2.context.lineTo(ar[i][1], s2.height - ar[i][2]);
        s2.context.lineTo(ar[1][1], s2.height - ar[1][2]);
        s2.context.fill();
        return 0;
      }
      function caml_gr_fill_rect(x2, y, w, h) {
        var s2 = caml_gr_state_get();
        s2.context.fillRect(x2, s2.height - y, w, -h);
        return 0;
      }
      function caml_gr_lineto(x2, y) {
        var s2 = caml_gr_state_get();
        s2.context.beginPath();
        s2.context.moveTo(s2.x, s2.height - s2.y);
        s2.context.lineTo(x2, s2.height - y);
        s2.context.stroke();
        s2.x = x2;
        s2.y = y;
        return 0;
      }
      function caml_gr_make_image(arr) {
        var s2 = caml_gr_state_get(), h = arr.length - 1, w = arr[1].length - 1, im = s2.context.createImageData(w, h);
        for (var i = 0; i < h; i++)
          for (var j = 0; j < w; j++) {
            var c = arr[i + 1][j + 1], o = i * (w * 4) + j * 4;
            if (c === -1) {
              im.data[o + 0] = 0;
              im.data[o + 1] = 0;
              im.data[o + 2] = 0;
              im.data[o + 3] = 0;
            } else {
              im.data[o + 0] = c >> 16 & 255;
              im.data[o + 1] = c >> 8 & 255;
              im.data[o + 2] = c >> 0 & 255;
              im.data[o + 3] = 255;
            }
          }
        return im;
      }
      function caml_gr_moveto(x2, y) {
        var s2 = caml_gr_state_get();
        s2.x = x2;
        s2.y = y;
        return 0;
      }
      function caml_gr_set_window_title(name) {
        var s2 = caml_gr_state_get();
        s2.title = name;
        var jsname = caml_jsstring_of_string(name);
        if (s2.set_title) s2.set_title(jsname);
        return 0;
      }
      function caml_gr_set_line_width(w) {
        var s2 = caml_gr_state_get();
        s2.line_width = w;
        s2.context.lineWidth = w;
        return 0;
      }
      function caml_gr_set_text_size(size) {
        var s2 = caml_gr_state_get();
        s2.text_size = size;
        s2.context.font = s2.text_size + "px " + caml_jsstring_of_string(s2.font);
        return 0;
      }
      function caml_gr_set_font(f) {
        var s2 = caml_gr_state_get();
        s2.font = f;
        s2.context.font = s2.text_size + "px " + caml_jsstring_of_string(s2.font);
        return 0;
      }
      function caml_gr_set_color(color) {
        var s2 = caml_gr_state_get();
        function convert(number) {
          var str = "" + number.toString(16);
          while (str.length < 2) str = "0" + str;
          return str;
        }
        var r = color >> 16 & 255, g = color >> 8 & 255, b = color >> 0 & 255;
        s2.color = color;
        var c_str = "#" + convert(r) + convert(g) + convert(b);
        s2.context.fillStyle = c_str;
        s2.context.strokeStyle = c_str;
        return 0;
      }
      function caml_gr_resize_window(w, h) {
        var s2 = caml_gr_state_get();
        s2.width = w;
        s2.height = h;
        s2.canvas.width = w;
        s2.canvas.height = h;
        return 0;
      }
      function caml_gr_state_init() {
        caml_gr_moveto(caml_gr_state.x, caml_gr_state.y);
        caml_gr_resize_window(caml_gr_state.width, caml_gr_state.height);
        caml_gr_set_line_width(caml_gr_state.line_width);
        caml_gr_set_text_size(caml_gr_state.text_size);
        caml_gr_set_font(caml_gr_state.font);
        caml_gr_set_color(caml_gr_state.color);
        caml_gr_set_window_title(caml_gr_state.title);
        caml_gr_state.context.textBaseline = "bottom";
      }
      function caml_gr_state_set(ctx) {
        caml_gr_state = ctx;
        caml_gr_state_init();
        return 0;
      }
      function caml_gr_state_create(canvas, w, h) {
        var context = canvas.getContext("2d");
        return {
          context,
          canvas,
          x: 0,
          y: 0,
          width: w,
          height: h,
          line_width: 1,
          font: caml_string_of_jsbytes("fixed"),
          text_size: 26,
          color: 0,
          title: caml_string_of_jsbytes("")
        };
      }
      function caml_gr_open_graph(info) {
        var info = caml_jsstring_of_string(info);
        function get(name) {
          var res = info.match("(^|,) *" + name + " *= *([a-zA-Z0-9_]+) *(,|$)");
          if (res) return res[2];
        }
        var specs = [];
        if (!(info === "")) specs.push(info);
        var target = get("target");
        if (!target) target = "";
        var status = get("status");
        if (!status) specs.push("status=1");
        var w = get("width");
        w = w ? Number.parseInt(w) : 200;
        specs.push("width=" + w);
        var h = get("height");
        h = h ? Number.parseInt(h) : 200;
        specs.push("height=" + h);
        var win = globalThis.open("about:blank", target, specs.join(","));
        if (!win) caml_failwith("Graphics.open_graph: cannot open the window");
        var doc = win.document, canvas = doc.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        var ctx = caml_gr_state_create(canvas, w, h);
        ctx.set_title = function(title) {
          doc.title = title;
        };
        caml_gr_state_set(ctx);
        var body = doc.body;
        body.style.margin = "0px";
        body.appendChild(canvas);
        return 0;
      }
      function caml_gr_open_subwindow(a, b, c, d) {
        caml_failwith("caml_gr_open_subwindow not Implemented");
      }
      function caml_gr_plot(x2, y) {
        var s2 = caml_gr_state_get(), im = s2.context.createImageData(1, 1), d = im.data, color = s2.color;
        d[0] = color >> 16 & 255;
        d[1] = color >> 8 & 255, d[2] = color >> 0 & 255;
        d[3] = 255;
        s2.x = x2;
        s2.y = y;
        s2.context.putImageData(im, x2, s2.height - y);
        return 0;
      }
      function caml_gr_point_color(x2, y) {
        var s2 = caml_gr_state_get(), im = s2.context.getImageData(x2, s2.height - y, 1, 1), d = im.data;
        return (d[0] << 16) + (d[1] << 8) + d[2];
      }
      function caml_gr_remember_mode() {
        caml_failwith("caml_gr_remember_mode not Implemented");
      }
      function caml_gr_sigio_handler() {
        return 0;
      }
      function caml_gr_sigio_signal() {
        return 0;
      }
      function caml_gr_size_x() {
        var s2 = caml_gr_state_get();
        return s2.width;
      }
      function caml_gr_size_y() {
        var s2 = caml_gr_state_get();
        return s2.height;
      }
      function caml_gr_synchronize() {
        caml_failwith("caml_gr_synchronize not Implemented");
      }
      function caml_gr_text_size(txt) {
        var s2 = caml_gr_state_get(), w = s2.context.measureText(caml_jsstring_of_string(txt)).width;
        return [0, w, s2.text_size];
      }
      function caml_gr_wait_event(_evl) {
        caml_failwith("caml_gr_wait_event not Implemented: use Graphics_js instead");
      }
      function caml_gr_window_id(a) {
        caml_failwith("caml_gr_window_id not Implemented");
      }
      function caml_greaterequal(x2, y) {
        return +(caml_compare_val(x2, y, false) >= 0);
      }
      function caml_greaterthan(x2, y) {
        return +(caml_compare_val(x2, y, false) > 0);
      }
      function caml_hash_mix_jsbytes(h, s2) {
        var len = s2.length, i, w;
        for (i = 0; i + 4 <= len; i += 4) {
          w = s2.charCodeAt(i) | s2.charCodeAt(i + 1) << 8 | s2.charCodeAt(i + 2) << 16 | s2.charCodeAt(i + 3) << 24;
          h = caml_hash_mix_int(h, w);
        }
        w = 0;
        switch (len & 3) {
          case 3:
            w = s2.charCodeAt(i + 2) << 16;
          case 2:
            w |= s2.charCodeAt(i + 1) << 8;
          case 1:
            w |= s2.charCodeAt(i);
            h = caml_hash_mix_int(h, w);
        }
        h ^= len;
        return h;
      }
      function caml_hash_mix_string(h, v) {
        return caml_hash_mix_jsbytes(h, caml_jsbytes_of_string(v));
      }
      function caml_hash_mix_bytes_arr(h, s2) {
        var len = s2.length, i, w;
        for (i = 0; i + 4 <= len; i += 4) {
          w = s2[i] | s2[i + 1] << 8 | s2[i + 2] << 16 | s2[i + 3] << 24;
          h = caml_hash_mix_int(h, w);
        }
        w = 0;
        switch (len & 3) {
          case 3:
            w = s2[i + 2] << 16;
          case 2:
            w |= s2[i + 1] << 8;
          case 1:
            w |= s2[i];
            h = caml_hash_mix_int(h, w);
        }
        h ^= len;
        return h;
      }
      function caml_ml_bytes_content(s2) {
        switch (s2.t & 6) {
          case 2:
            caml_convert_string_to_bytes(s2);
            return s2.c;
          default:
            return s2.c;
        }
      }
      function caml_hash_mix_bytes(h, v) {
        var content = caml_ml_bytes_content(v);
        return typeof content === "string" ? caml_hash_mix_jsbytes(h, content) : caml_hash_mix_bytes_arr(h, content);
      }
      function caml_hash_mix_final(h) {
        h ^= h >>> 16;
        h = caml_mul(h, 2246822507 | 0);
        h ^= h >>> 13;
        h = caml_mul(h, 3266489909 | 0);
        h ^= h >>> 16;
        return h;
      }
      function caml_hash(count, limit, seed, obj) {
        var queue, rd, wr, sz, num, h, v, i, len;
        sz = limit;
        if (sz < 0 || sz > 256) sz = 256;
        num = count;
        h = seed;
        queue = [obj];
        rd = 0;
        wr = 1;
        while (rd < wr && num > 0) {
          v = queue[rd++];
          if (v && v.caml_custom) {
            if (caml_custom_ops[v.caml_custom] && caml_custom_ops[v.caml_custom].hash) {
              var hh = caml_custom_ops[v.caml_custom].hash(v);
              h = caml_hash_mix_int(h, hh);
              num--;
            }
          } else if (Array.isArray(v) && v[0] === (v[0] | 0))
            switch (v[0]) {
              case 248:
                h = caml_hash_mix_int(h, v[2]);
                num--;
                break;
              case 250:
                queue[--rd] = v[1];
                break;
              default:
                if (caml_is_continuation_tag(v[0])) break;
                var tag = v.length - 1 << 10 | v[0];
                h = caml_hash_mix_int(h, tag);
                for (i = 1, len = v.length; i < len; i++) {
                  if (wr >= sz) break;
                  queue[wr++] = v[i];
                }
                break;
            }
          else if (caml_is_ml_bytes(v)) {
            h = caml_hash_mix_bytes(h, v);
            num--;
          } else if (caml_is_ml_string(v)) {
            h = caml_hash_mix_string(h, v);
            num--;
          } else if (typeof v === "string") {
            h = caml_hash_mix_jsbytes(h, v);
            num--;
          } else if (v === (v | 0)) {
            h = caml_hash_mix_int(h, v + v + 1);
            num--;
          } else if (typeof v === "number") {
            h = caml_hash_mix_float(h, v);
            num--;
          }
        }
        h = caml_hash_mix_final(h);
        return h & 1073741823;
      }
      function caml_hash_mix_bigstring(h, bs) {
        return caml_hash_mix_bytes_arr(h, bs.data);
      }
      function num_digits_nat(nat, ofs, len) {
        for (var i = len - 1; i >= 0; i--)
          if (nat.data[ofs + i] !== 0) return i + 1;
        return 1;
      }
      function caml_hash_nat(x2) {
        var len = num_digits_nat(x2, 0, x2.data.length), h = 0;
        for (var i = 0; i < len; i++) h = caml_hash_mix_int(h, x2.data[i]);
        return h;
      }
      function caml_hexstring_of_float(x2, prec, style) {
        if (!Number.isFinite(x2)) {
          if (Number.isNaN(x2)) return caml_string_of_jsstring("nan");
          return caml_string_of_jsstring(x2 > 0 ? "infinity" : "-infinity");
        }
        var sign = x2 === 0 && 1 / x2 === Number.NEGATIVE_INFINITY ? 1 : x2 >= 0 ? 0 : 1;
        if (sign) x2 = -x2;
        var exp = 0;
        if (x2 === 0)
          ;
        else if (x2 < 1)
          while (x2 < 1 && exp > -1022) {
            x2 *= 2;
            exp--;
          }
        else
          while (x2 >= 2) {
            x2 /= 2;
            exp++;
          }
        var exp_sign = exp < 0 ? "" : "+", sign_str = "";
        if (sign)
          sign_str = "-";
        else
          switch (style) {
            case 43:
              sign_str = "+";
              break;
            case 32:
              sign_str = " ";
              break;
            default:
              break;
          }
        if (prec >= 0 && prec < 13) {
          var cst = Math.pow(2, prec * 4);
          x2 = Math.round(x2 * cst) / cst;
        }
        var x_str = x2.toString(16);
        if (prec >= 0) {
          var idx = x_str.indexOf(".");
          if (idx < 0)
            x_str += "." + caml_str_repeat(prec, "0");
          else {
            var size = idx + 1 + prec;
            if (x_str.length < size)
              x_str += caml_str_repeat(size - x_str.length, "0");
            else
              x_str = x_str.slice(0, size);
          }
        }
        return caml_string_of_jsstring(sign_str + "0x" + x_str + "p" + exp_sign + exp.toString(10));
      }
      function caml_hypot_float(x2, y) {
        return Math.hypot(x2, y);
      }
      var caml_marshal_header_size = 16;
      function caml_refill(chan) {
        if (chan.refill != null) {
          var str = chan.refill(), str_a = caml_uint8_array_of_string(str);
          if (str_a.length === 0)
            chan.refill = null;
          else {
            if (chan.buffer.length < chan.buffer_max + str_a.length) {
              var b = new Uint8Array(chan.buffer_max + str_a.length);
              b.set(chan.buffer);
              chan.buffer = b;
            }
            chan.buffer.set(str_a, chan.buffer_max);
            chan.offset += str_a.length;
            chan.buffer_max += str_a.length;
          }
        } else {
          if (chan.fd === -1) caml_raise_sys_error("Bad file descriptor");
          var nread = chan.file.read(chan.buffer, chan.buffer_max, chan.buffer.length - chan.buffer_max);
          chan.offset += nread;
          chan.buffer_max += nread;
        }
      }
      function caml_raise_end_of_file() {
        caml_raise_constant(caml_global_data.End_of_file);
      }
      function caml_marshal_data_size(s2, ofs) {
        var r = new UInt8ArrayReader(caml_uint8_array_of_bytes(s2), ofs);
        function readvlq(overflow2) {
          var c = r.read8u(), n = c & 127;
          while ((c & 128) !== 0) {
            c = r.read8u();
            var n7 = n << 7;
            if (n !== n7 >> 7) overflow2[0] = true;
            n = n7 | c & 127;
          }
          return n;
        }
        switch (r.read32u()) {
          case 2224400062:
            var header_len = 20, data_len = r.read32u();
            break;
          case 2224400061:
            var header_len = r.read8u() & 63, overflow = [false], data_len = readvlq(overflow);
            if (overflow[0])
              caml_failwith("Marshal.data_size: object too large to be read back on this platform");
            break;
          case 2224400063:
            caml_failwith("Marshal.data_size: object too large to be read back on a 32-bit platform");
            break;
          default:
            caml_failwith("Marshal.data_size: bad object");
            break;
        }
        return header_len - caml_marshal_header_size + data_len;
      }
      function caml_set_oo_id(b) {
        b[2] = caml_oo_last_id++;
        return b;
      }
      function caml_input_value_from_reader(reader, ofs) {
        function readvlq(overflow2) {
          var c = reader.read8u(), n = c & 127;
          while ((c & 128) !== 0) {
            c = reader.read8u();
            var n7 = n << 7;
            if (n !== n7 >> 7) overflow2[0] = true;
            n = n7 | c & 127;
          }
          return n;
        }
        var magic = reader.read32u();
        switch (magic) {
          case 2224400062:
            var header_len = 20, compressed = 0, data_len = reader.read32u(), uncompressed_data_len = data_len, num_objects = reader.read32u(), _size_32 = reader.read32u(), _size_64 = reader.read32u();
            break;
          case 2224400061:
            var header_len = reader.read8u() & 63, compressed = 1, overflow = [false], data_len = readvlq(overflow), uncompressed_data_len = readvlq(overflow), num_objects = readvlq(overflow), _size_32 = readvlq(overflow), _size_64 = readvlq(overflow);
            if (overflow[0])
              caml_failwith("caml_input_value_from_reader: object too large to be read back on this platform");
            break;
          case 2224400063:
            caml_failwith("caml_input_value_from_reader: object too large to be read back on a 32-bit platform");
            break;
          default:
            caml_failwith("caml_input_value_from_reader: bad object");
            break;
        }
        var stack = [], objects = [], intern_obj_table = num_objects > 0 ? [] : null, obj_counter = 0;
        function intern_rec(reader2) {
          var code = reader2.read8u();
          if (code >= 64)
            if (code >= 128) {
              var tag = code & 15, size2 = code >> 4 & 7, v2 = [tag];
              if (size2 === 0) return v2;
              if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
              if (tag === 248) objects.push(v2);
              stack.push(v2, size2);
              return v2;
            } else
              return code & 63;
          else if (code >= 32) {
            var len = code & 31, v2 = reader2.readstr(len);
            if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
            return v2;
          } else
            switch (code) {
              case 0:
                return reader2.read8s();
              case 1:
                return reader2.read16s();
              case 2:
                return reader2.read32s();
              case 3:
                caml_failwith("input_value: integer too large");
                break;
              case 4:
                var offset = reader2.read8u();
                if (compressed === 0) offset = obj_counter - offset;
                return intern_obj_table[offset];
              case 5:
                var offset = reader2.read16u();
                if (compressed === 0) offset = obj_counter - offset;
                return intern_obj_table[offset];
              case 6:
                var offset = reader2.read32u();
                if (compressed === 0) offset = obj_counter - offset;
                return intern_obj_table[offset];
              case 8:
                var header = reader2.read32u(), tag = header & 255, size2 = header >> 10, v2 = [tag];
                if (size2 === 0) return v2;
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                if (tag === 248) objects.push(v2);
                stack.push(v2, size2);
                return v2;
              case 19:
                caml_failwith("input_value: data block too large");
                break;
              case 9:
                var len = reader2.read8u(), v2 = reader2.readstr(len);
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                return v2;
              case 10:
                var len = reader2.read32u(), v2 = reader2.readstr(len);
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                return v2;
              case 12:
                var t = new Array(8);
                for (var i = 0; i < 8; i++) t[7 - i] = reader2.read8u();
                var v2 = caml_float_of_bytes(t);
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                return v2;
              case 11:
                var t = new Array(8);
                for (var i = 0; i < 8; i++) t[i] = reader2.read8u();
                var v2 = caml_float_of_bytes(t);
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                return v2;
              case 14:
                var len = reader2.read8u(), v2 = new Array(len + 1);
                v2[0] = 254;
                var t = new Array(8);
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                for (var i = 1; i <= len; i++) {
                  for (var j = 0; j < 8; j++) t[7 - j] = reader2.read8u();
                  v2[i] = caml_float_of_bytes(t);
                }
                return v2;
              case 13:
                var len = reader2.read8u(), v2 = new Array(len + 1);
                v2[0] = 254;
                var t = new Array(8);
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                for (var i = 1; i <= len; i++) {
                  for (var j = 0; j < 8; j++) t[j] = reader2.read8u();
                  v2[i] = caml_float_of_bytes(t);
                }
                return v2;
              case 7:
                var len = reader2.read32u(), v2 = new Array(len + 1);
                v2[0] = 254;
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                var t = new Array(8);
                for (var i = 1; i <= len; i++) {
                  for (var j = 0; j < 8; j++) t[7 - j] = reader2.read8u();
                  v2[i] = caml_float_of_bytes(t);
                }
                return v2;
              case 15:
                var len = reader2.read32u(), v2 = new Array(len + 1);
                v2[0] = 254;
                var t = new Array(8);
                for (var i = 1; i <= len; i++) {
                  for (var j = 0; j < 8; j++) t[j] = reader2.read8u();
                  v2[i] = caml_float_of_bytes(t);
                }
                return v2;
              case 16:
              case 17:
                caml_failwith("input_value: code pointer");
                break;
              case 18:
              case 24:
              case 25:
                var c, s2 = "";
                while ((c = reader2.read8u()) !== 0) s2 += String.fromCharCode(c);
                var ops = caml_custom_ops[s2], expected_size;
                if (!ops)
                  caml_failwith("input_value: unknown custom block identifier");
                switch (code) {
                  case 18:
                    break;
                  case 25:
                    if (!ops.fixed_length)
                      caml_failwith("input_value: expected a fixed-size custom block");
                    expected_size = ops.fixed_length;
                    break;
                  case 24:
                    expected_size = reader2.read32u();
                    reader2.read32s();
                    reader2.read32s();
                    break;
                }
                var old_pos = reader2.i, size2 = [0], v2 = ops.deserialize(reader2, size2);
                if (expected_size !== void 0) {
                  if (expected_size !== size2[0])
                    caml_failwith("input_value: incorrect length of serialized custom block");
                }
                if (intern_obj_table) intern_obj_table[obj_counter++] = v2;
                return v2;
              default:
                caml_failwith("input_value: ill-formed message");
            }
        }
        if (compressed)
          if (caml_decompress_input)
            var data = reader.readuint8array(data_len), res = new Uint8Array(uncompressed_data_len), res = caml_decompress_input(data, res), reader = new UInt8ArrayReader(res, 0);
          else
            caml_failwith("input_value: compressed object, cannot decompress");
        var res = intern_rec(reader);
        while (stack.length > 0) {
          var size = stack.pop(), v = stack.pop(), d = v.length;
          if (d < size) stack.push(v, size);
          v[d] = intern_rec(reader);
        }
        while (objects.length > 0) {
          var x2 = objects.pop();
          if (x2[2] >= 0) caml_set_oo_id(x2);
        }
        return res;
      }
      function caml_string_of_bytes(s2) {
        s2.t & 6 && caml_convert_string_to_bytes(s2);
        return caml_string_of_jsbytes(s2.c);
      }
      function caml_input_value_from_bytes(s2, ofs) {
        var reader = new MlStringReader(caml_string_of_bytes(s2), typeof ofs === "number" ? ofs : ofs[0]);
        return caml_input_value_from_reader(reader, ofs);
      }
      function caml_input_value(chanid) {
        var chan = caml_ml_channel_get(chanid), header = new Uint8Array(caml_marshal_header_size);
        function block(buffer, offset, n) {
          var r2 = 0;
          while (r2 < n) {
            if (chan.buffer_curr >= chan.buffer_max) {
              chan.buffer_curr = 0;
              chan.buffer_max = 0;
              caml_refill(chan);
            }
            if (chan.buffer_curr >= chan.buffer_max) break;
            buffer[offset + r2] = chan.buffer[chan.buffer_curr];
            chan.buffer_curr++;
            r2++;
          }
          return r2;
        }
        var r = block(header, 0, caml_marshal_header_size);
        if (r === 0)
          caml_raise_end_of_file();
        else if (r < caml_marshal_header_size)
          caml_failwith("input_value: truncated object");
        var len = caml_marshal_data_size(caml_bytes_of_uint8_array(header), 0), buf = new Uint8Array(len + caml_marshal_header_size);
        buf.set(header, 0);
        var r = block(buf, caml_marshal_header_size, len);
        if (r < len)
          caml_failwith("input_value: truncated object " + r + "  " + len);
        var res = caml_input_value_from_bytes(caml_bytes_of_uint8_array(buf), 0);
        return res;
      }
      function caml_input_value_to_outside_heap(c) {
        return caml_input_value(c);
      }
      function caml_install_signal_handler() {
        return 0;
      }
      function caml_int32_bswap(x2) {
        return (x2 & 255) << 24 | (x2 & 65280) << 8 | (x2 & 16711680) >>> 8 | (x2 & 4278190080) >>> 24;
      }
      function caml_int64_add(x2, y) {
        return x2.add(y);
      }
      function caml_int64_and(x2, y) {
        return x2.and(y);
      }
      function caml_int64_bswap(x2) {
        var y = caml_int64_to_bytes(x2);
        return caml_int64_of_bytes([y[7], y[6], y[5], y[4], y[3], y[2], y[1], y[0]]);
      }
      function caml_int64_div(x2, y) {
        return x2.div(y);
      }
      function caml_int64_is_zero(x2) {
        return +x2.isZero();
      }
      function caml_int64_of_int32(x2) {
        return new MlInt64(x2 & 16777215, x2 >> 24 & 16777215, x2 >> 31 & 65535);
      }
      function caml_int64_to_int32(x2) {
        return x2.toInt();
      }
      function caml_int64_is_negative(x2) {
        return +x2.isNeg();
      }
      function caml_int64_neg(x2) {
        return x2.neg();
      }
      function caml_int64_format(fmt, x2) {
        var f = caml_parse_format(fmt);
        if (f.signedconv && caml_int64_is_negative(x2)) {
          f.sign = -1;
          x2 = caml_int64_neg(x2);
        }
        var buffer = "", wbase = caml_int64_of_int32(f.base), cvtbl = "0123456789abcdef";
        do {
          var p = x2.udivmod(wbase);
          x2 = p.quotient;
          buffer = cvtbl.charAt(caml_int64_to_int32(p.modulus)) + buffer;
        } while (!caml_int64_is_zero(x2));
        if (f.prec >= 0) {
          f.filler = " ";
          var n = f.prec - buffer.length;
          if (n > 0) buffer = caml_str_repeat(n, "0") + buffer;
        }
        return caml_finish_formatting(f, buffer);
      }
      function caml_int64_mod(x2, y) {
        return x2.mod(y);
      }
      function caml_int64_mul(x2, y) {
        return x2.mul(y);
      }
      function caml_int64_ult(x2, y) {
        return x2.ucompare(y) < 0;
      }
      function caml_parse_sign_and_base(s2) {
        var i = 0, len = caml_ml_string_length(s2), base = 10, sign = 1, signedness = 1;
        if (len > 0)
          switch (caml_string_unsafe_get(s2, i)) {
            case 45:
              i++;
              sign = -1;
              break;
            case 43:
              i++;
              sign = 1;
              break;
          }
        if (i + 1 < len && caml_string_unsafe_get(s2, i) === 48)
          switch (caml_string_unsafe_get(s2, i + 1)) {
            case 120:
            case 88:
              signedness = 0;
              base = 16;
              i += 2;
              break;
            case 111:
            case 79:
              signedness = 0;
              base = 8;
              i += 2;
              break;
            case 98:
            case 66:
              signedness = 0;
              base = 2;
              i += 2;
              break;
            case 117:
            case 85:
              signedness = 0;
              i += 2;
              break;
          }
        return [i, sign, base, signedness];
      }
      function caml_parse_digit(c) {
        if (c >= 48 && c <= 57) return c - 48;
        if (c >= 65 && c <= 90) return c - 55;
        if (c >= 97 && c <= 122) return c - 87;
        return -1;
      }
      function caml_int64_of_string(s2) {
        var r = caml_parse_sign_and_base(s2), i = r[0], sign = r[1], base = r[2], signedness = r[3], base64 = caml_int64_of_int32(base), threshold = new MlInt64(16777215, 268435455, 65535).udivmod(base64).quotient, c = caml_string_unsafe_get(s2, i), d = caml_parse_digit(c);
        if (d < 0 || d >= base) caml_failwith("int_of_string");
        var res = caml_int64_of_int32(d);
        for (; ; ) {
          i++;
          c = caml_string_unsafe_get(s2, i);
          if (c === 95) continue;
          d = caml_parse_digit(c);
          if (d < 0 || d >= base) break;
          if (caml_int64_ult(threshold, res)) caml_failwith("int_of_string");
          d = caml_int64_of_int32(d);
          res = caml_int64_add(caml_int64_mul(base64, res), d);
          if (caml_int64_ult(res, d)) caml_failwith("int_of_string");
        }
        if (i !== caml_ml_string_length(s2)) caml_failwith("int_of_string");
        if (signedness && caml_int64_ult(new MlInt64(0, 0, 32768), res))
          caml_failwith("int_of_string");
        if (sign < 0) res = caml_int64_neg(res);
        return res;
      }
      function caml_int64_or(x2, y) {
        return x2.or(y);
      }
      function caml_int64_shift_left(x2, s2) {
        return x2.shift_left(s2);
      }
      function caml_int64_shift_right(x2, s2) {
        return x2.shift_right(s2);
      }
      function caml_int64_shift_right_unsigned(x2, s2) {
        return x2.shift_right_unsigned(s2);
      }
      function caml_int64_sub(x2, y) {
        return x2.sub(y);
      }
      function caml_int64_to_float(x2) {
        return x2.toFloat();
      }
      function caml_int64_xor(x2, y) {
        return x2.xor(y);
      }
      function caml_int_of_string(s2) {
        var r = caml_parse_sign_and_base(s2), i = r[0], sign = r[1], base = r[2], signedness = r[3], len = caml_ml_string_length(s2), threshold = -1 >>> 0, c = i < len ? caml_string_unsafe_get(s2, i) : 0, d = caml_parse_digit(c);
        if (d < 0 || d >= base) caml_failwith("int_of_string");
        var res = d;
        for (i++; i < len; i++) {
          c = caml_string_unsafe_get(s2, i);
          if (c === 95) continue;
          d = caml_parse_digit(c);
          if (d < 0 || d >= base) break;
          res = base * res + d;
          if (res > threshold) caml_failwith("int_of_string");
        }
        if (i !== len) caml_failwith("int_of_string");
        res = sign * res;
        if (signedness && (res | 0) !== res) caml_failwith("int_of_string");
        return res | 0;
      }
      function caml_is_js() {
        return 1;
      }
      function caml_is_printable(c) {
        return +(c > 31 && c < 127);
      }
      function caml_js_call(f, o, args) {
        return f.apply(o, caml_js_from_array(args));
      }
      function caml_js_delete(o, f) {
        delete o[f];
        return 0;
      }
      function caml_js_equals(x2, y) {
        return +(x2 == y);
      }
      function caml_js_error_of_exception(exn) {
        if (exn.js_error) return exn.js_error;
        return null;
      }
      function caml_js_error_option_of_exception(exn) {
        if (exn.js_error) return [0, exn.js_error];
        return 0;
      }
      function caml_js_eval_string(s) {
        return eval(caml_jsstring_of_string(s));
      }
      function caml_js_expr(s) {
        console.error("caml_js_expr: fallback to runtime evaluation\n");
        return eval(caml_jsstring_of_string(s));
      }
      function caml_js_from_bool(x2) {
        return !!x2;
      }
      function caml_js_from_float(x2) {
        return x2;
      }
      function caml_js_from_string(s2) {
        return caml_jsstring_of_string(s2);
      }
      function caml_js_fun_call(f, a) {
        switch (a.length) {
          case 1:
            return f();
          case 2:
            return f(a[1]);
          case 3:
            return f(a[1], a[2]);
          case 4:
            return f(a[1], a[2], a[3]);
          case 5:
            return f(a[1], a[2], a[3], a[4]);
          case 6:
            return f(a[1], a[2], a[3], a[4], a[5]);
          case 7:
            return f(a[1], a[2], a[3], a[4], a[5], a[6]);
          case 8:
            return f(a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
        }
        return f.apply(null, caml_js_from_array(a));
      }
      function caml_js_function_arity(f) {
        return f.l >= 0 ? f.l : f.l = f.length;
      }
      function caml_js_get(o, f) {
        return o[f];
      }
      function caml_js_get_console() {
        var c = console, m = [
          "log",
          "debug",
          "info",
          "warn",
          "error",
          "assert",
          "dir",
          "dirxml",
          "trace",
          "group",
          "groupCollapsed",
          "groupEnd",
          "time",
          "timeEnd"
        ];
        function f() {
        }
        for (var i = 0; i < m.length; i++) if (!c[m[i]]) c[m[i]] = f;
        return c;
      }
      function caml_js_html_entities(s2) {
        var entity = /^&#?[0-9a-zA-Z]+;$/;
        if (s2.match(entity)) {
          var str, temp = document.createElement("p");
          temp.innerHTML = s2;
          str = temp.textContent || temp.innerText;
          temp = null;
          return str;
        } else
          return null;
      }
      var caml_js_regexps = { amp: /&/g, lt: /</g, quot: /"/g, all: /[&<"]/ };
      function caml_js_html_escape(s2) {
        if (!caml_js_regexps.all.test(s2)) return s2;
        return s2.replace(caml_js_regexps.amp, "&amp;").replace(caml_js_regexps.lt, "&lt;").replace(caml_js_regexps.quot, "&quot;");
      }
      function caml_js_instanceof(o, c) {
        return o instanceof c ? 1 : 0;
      }
      function caml_js_meth_call(o, f, args) {
        return o[caml_jsstring_of_string(f)].apply(o, caml_js_from_array(args));
      }
      function caml_js_new(c, a) {
        switch (a.length) {
          case 1:
            return new c();
          case 2:
            return new c(a[1]);
          case 3:
            return new c(a[1], a[2]);
          case 4:
            return new c(a[1], a[2], a[3]);
          case 5:
            return new c(a[1], a[2], a[3], a[4]);
          case 6:
            return new c(a[1], a[2], a[3], a[4], a[5]);
          case 7:
            return new c(a[1], a[2], a[3], a[4], a[5], a[6]);
          case 8:
            return new c(a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
        }
        function F() {
          return c.apply(this, caml_js_from_array(a));
        }
        F.prototype = c.prototype;
        return new F();
      }
      function caml_js_object(a) {
        var o = {};
        for (var i = 1; i < a.length; i++) {
          var p = a[i];
          o[caml_jsstring_of_string(p[1])] = p[2];
        }
        return o;
      }
      function caml_js_pure_expr(f) {
        return caml_callback(f, [0]);
      }
      function caml_js_set(o, f, v) {
        o[f] = v;
        return 0;
      }
      function caml_js_strict_equals(x2, y) {
        return +(x2 === y);
      }
      function caml_js_to_array(a) {
        var len = a.length, b = new Array(len + 1);
        b[0] = 0;
        for (var i = 0; i < len; i++) b[i + 1] = a[i];
        return b;
      }
      function caml_js_to_bool(x2) {
        return +x2;
      }
      function caml_js_to_byte_string(s2) {
        return caml_string_of_jsbytes(s2);
      }
      function caml_js_to_float(x2) {
        return x2;
      }
      function caml_js_to_int32(x2) {
        return x2 | 0;
      }
      function caml_js_to_string(s2) {
        return caml_string_of_jsstring(s2);
      }
      function caml_js_typeof(o) {
        return typeof o;
      }
      function caml_js_var(x) {
        var x = caml_jsstring_of_string(x);
        if (!x.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*(\.[a-zA-Z_$][a-zA-Z_$0-9]*)*$/))
          console.error('caml_js_var: "' + x + '" is not a valid JavaScript variable. continuing ..');
        return eval(x);
      }
      function caml_js_wrap_callback(f) {
        return function(...args) {
          if (args.length === 0) args = [void 0];
          var res = caml_callback(f, args);
          return res instanceof Function ? caml_js_wrap_callback(res) : res;
        };
      }
      function caml_js_wrap_callback_arguments(f) {
        return function(...args) {
          return caml_callback(f, [args]);
        };
      }
      function caml_js_wrap_callback_strict(arity, f) {
        return function(...args) {
          args.length = arity;
          return caml_callback(f, args);
        };
      }
      function caml_js_wrap_callback_unsafe(f) {
        return function(...args) {
          var len = caml_js_function_arity(f);
          args.length = len;
          return caml_callback(f, args);
        };
      }
      function caml_js_wrap_meth_callback(f) {
        return function(...args) {
          args.unshift(this);
          var res = caml_callback(f, args);
          return res instanceof Function ? caml_js_wrap_callback(res) : res;
        };
      }
      function caml_js_wrap_meth_callback_arguments(f) {
        return function(...args) {
          return caml_callback(f, [this, args]);
        };
      }
      function caml_js_wrap_meth_callback_strict(arity, f) {
        return function(...args) {
          args.length = arity;
          args.unshift(this);
          return caml_callback(f, args);
        };
      }
      function caml_js_wrap_meth_callback_unsafe(f) {
        return function(...args) {
          var len = caml_js_function_arity(f);
          args.unshift(this);
          args.length = len;
          return caml_callback(f, args);
        };
      }
      function caml_jsoo_flags_effects(unit) {
        return "disabled";
      }
      function caml_jsoo_flags_use_js_string(unit) {
        return 1;
      }
      function caml_lazy_make_forward(v) {
        return [250, v];
      }
      function caml_obj_tag(x2) {
        if (Array.isArray(x2) && x2[0] === x2[0] >>> 0)
          return x2[0];
        else if (caml_is_ml_bytes(x2))
          return 252;
        else if (caml_is_ml_string(x2))
          return 252;
        else if (x2 instanceof Function || typeof x2 === "function")
          return 247;
        else if (x2 && x2.caml_custom) return 255;
        else return 1e3;
      }
      function caml_lazy_read_result(o) {
        return caml_obj_tag(o) === 250 ? o[1] : o;
      }
      function caml_obj_update_tag(b, o, n) {
        if (b[0] === o) {
          b[0] = n;
          return 1;
        }
        return 0;
      }
      function caml_lazy_reset_to_lazy(o) {
        caml_obj_update_tag(o, 244, 246);
        return 0;
      }
      function caml_lazy_update_to_forcing(o) {
        return Array.isArray(o) && o[0] === o[0] >>> 0 && caml_obj_update_tag(o, 246, 244) ? 0 : 1;
      }
      function caml_lazy_update_to_forward(o) {
        caml_obj_update_tag(o, 244, 250);
        return 0;
      }
      function caml_ldexp_float(x2, exp) {
        exp |= 0;
        if (exp > 1023) {
          exp -= 1023;
          x2 *= Math.pow(2, 1023);
          if (exp > 1023) {
            exp -= 1023;
            x2 *= Math.pow(2, 1023);
          }
        }
        if (exp < -1023) {
          exp += 1023;
          x2 *= Math.pow(2, -1023);
        }
        x2 *= Math.pow(2, exp);
        return x2;
      }
      function caml_lessequal(x2, y) {
        return +(caml_compare_val(x2, y, false) <= 0);
      }
      function caml_lessthan(x2, y) {
        return +(caml_compare_val(x2, y, false) < 0);
      }
      function caml_lex_array(s2) {
        s2 = caml_jsbytes_of_string(s2);
        var l = s2.length / 2, a = new Array(l);
        for (var i = 0; i < l; i++)
          a[i] = (s2.charCodeAt(2 * i) | s2.charCodeAt(2 * i + 1) << 8) << 16 >> 16;
        return a;
      }
      function caml_lex_engine(tbl, start_state, lexbuf) {
        var lex_buffer = 2, lex_buffer_len = 3, lex_start_pos = 5, lex_curr_pos = 6, lex_last_pos = 7, lex_last_action = 8, lex_eof_reached = 9, lex_base = 1, lex_backtrk = 2, lex_default = 3, lex_trans = 4, lex_check = 5;
        if (!tbl.lex_default) {
          tbl.lex_base = caml_lex_array(tbl[lex_base]);
          tbl.lex_backtrk = caml_lex_array(tbl[lex_backtrk]);
          tbl.lex_check = caml_lex_array(tbl[lex_check]);
          tbl.lex_trans = caml_lex_array(tbl[lex_trans]);
          tbl.lex_default = caml_lex_array(tbl[lex_default]);
        }
        var c, state = start_state, buffer = lexbuf[lex_buffer];
        if (state >= 0) {
          lexbuf[lex_last_pos] = lexbuf[lex_start_pos] = lexbuf[lex_curr_pos];
          lexbuf[lex_last_action] = -1;
        } else
          state = -state - 1;
        for (; ; ) {
          var base = tbl.lex_base[state];
          if (base < 0) return -base - 1;
          var backtrk = tbl.lex_backtrk[state];
          if (backtrk >= 0) {
            lexbuf[lex_last_pos] = lexbuf[lex_curr_pos];
            lexbuf[lex_last_action] = backtrk;
          }
          if (lexbuf[lex_curr_pos] >= lexbuf[lex_buffer_len])
            if (lexbuf[lex_eof_reached] === 0) return -state - 1;
            else c = 256;
          else {
            c = caml_bytes_unsafe_get(buffer, lexbuf[lex_curr_pos]);
            lexbuf[lex_curr_pos]++;
          }
          if (tbl.lex_check[base + c] === state)
            state = tbl.lex_trans[base + c];
          else
            state = tbl.lex_default[state];
          if (state < 0) {
            lexbuf[lex_curr_pos] = lexbuf[lex_last_pos];
            if (lexbuf[lex_last_action] === -1)
              caml_failwith("lexing: empty token");
            else
              return lexbuf[lex_last_action];
          } else if (c === 256) lexbuf[lex_eof_reached] = 0;
        }
      }
      function caml_list_mount_point() {
        var prev = 0;
        for (var i = 0; i < jsoo_mount_point.length; i++) {
          var old = prev;
          prev = [0, caml_string_of_jsstring(jsoo_mount_point[i].path), old];
        }
        return prev;
      }
      function caml_list_of_js_array(a) {
        var l = 0;
        for (var i = a.length - 1; i >= 0; i--) {
          var e = a[i];
          l = [0, e, l];
        }
        return l;
      }
      function caml_list_to_js_array(l) {
        var a = [];
        for (; l !== 0; l = l[2]) a.push(l[1]);
        return a;
      }
      function caml_log10_float(x2) {
        return Math.log10(x2);
      }
      function caml_log1p_float(x2) {
        return Math.log1p(x2);
      }
      function caml_log2_float(x2) {
        return Math.log2(x2);
      }
      var caml_lxm_M = caml_int64_of_string(caml_string_of_jsstring("0xd1342543de82ef95")), caml_lxm_daba = caml_int64_of_string(caml_string_of_jsstring("0xdaba0b6eb09322e3"));
      function caml_lxm_next(v) {
        function shift_l(x2, k) {
          return caml_int64_shift_left(x2, k);
        }
        function shift_r(x2, k) {
          return caml_int64_shift_right_unsigned(x2, k);
        }
        function or(a2, b) {
          return caml_int64_or(a2, b);
        }
        function xor(a2, b) {
          return caml_int64_xor(a2, b);
        }
        function add(a2, b) {
          return caml_int64_add(a2, b);
        }
        function mul(a2, b) {
          return caml_int64_mul(a2, b);
        }
        function rotl(x2, k) {
          return or(shift_l(x2, k), shift_r(x2, 64 - k));
        }
        function get(a2, i) {
          return caml_ba_get_1(a2, i);
        }
        function set(a2, i, x2) {
          return caml_ba_set_1(a2, i, x2);
        }
        var M = caml_lxm_M, daba = caml_lxm_daba, z, q0, q1, st = v, a = get(st, 0), s2 = get(st, 1), x0 = get(st, 2), x1 = get(st, 3);
        z = add(s2, x0);
        z = mul(xor(z, shift_r(z, 32)), daba);
        z = mul(xor(z, shift_r(z, 32)), daba);
        z = xor(z, shift_r(z, 32));
        set(st, 1, add(mul(s2, M), a));
        var q0 = x0, q1 = x1;
        q1 = xor(q1, q0);
        q0 = rotl(q0, 24);
        q0 = xor(xor(q0, q1), shift_l(q1, 16));
        q1 = rotl(q1, 37);
        set(st, 2, q0);
        set(st, 3, q1);
        return z;
      }
      function caml_make_float_vect(len) {
        if (len >>> 0 >= (2147483647 / 8 | 0)) caml_array_bound_error();
        var len = len + 1 | 0, b = new Array(len);
        b[0] = 254;
        for (var i = 1; i < len; i++) b[i] = 0;
        return b;
      }
      function caml_make_vect(len, init) {
        return caml_array_make(len, init);
      }
      var caml_marshal_constants = {
        PREFIX_SMALL_BLOCK: 128,
        PREFIX_SMALL_INT: 64,
        PREFIX_SMALL_STRING: 32,
        CODE_INT8: 0,
        CODE_INT16: 1,
        CODE_INT32: 2,
        CODE_INT64: 3,
        CODE_SHARED8: 4,
        CODE_SHARED16: 5,
        CODE_SHARED32: 6,
        CODE_BLOCK32: 8,
        CODE_BLOCK64: 19,
        CODE_STRING8: 9,
        CODE_STRING32: 10,
        CODE_DOUBLE_BIG: 11,
        CODE_DOUBLE_LITTLE: 12,
        CODE_DOUBLE_ARRAY8_BIG: 13,
        CODE_DOUBLE_ARRAY8_LITTLE: 14,
        CODE_DOUBLE_ARRAY32_BIG: 15,
        CODE_DOUBLE_ARRAY32_LITTLE: 7,
        CODE_CODEPOINTER: 16,
        CODE_INFIXPOINTER: 17,
        CODE_CUSTOM: 18,
        CODE_CUSTOM_LEN: 24,
        CODE_CUSTOM_FIXED: 25
      };
      function caml_maybe_print_stats(unit) {
        return 0;
      }
      function caml_md5_bytes(s2, ofs, len) {
        var ctx = caml_MD5Init(), a = caml_uint8_array_of_bytes(s2);
        caml_MD5Update(ctx, a.subarray(ofs, ofs + len), len);
        return caml_string_of_uint8_array(caml_MD5Final(ctx));
      }
      function caml_ml_input_block(chanid, ba, i, l) {
        var chan = caml_ml_channel_get(chanid), n = l, avail = chan.buffer_max - chan.buffer_curr;
        if (l <= avail) {
          ba.set(chan.buffer.subarray(chan.buffer_curr, chan.buffer_curr + l), i);
          chan.buffer_curr += l;
        } else if (avail > 0) {
          ba.set(chan.buffer.subarray(chan.buffer_curr, chan.buffer_curr + avail), i);
          chan.buffer_curr += avail;
          n = avail;
        } else {
          chan.buffer_curr = 0;
          chan.buffer_max = 0;
          caml_refill(chan);
          var avail = chan.buffer_max - chan.buffer_curr;
          if (n > avail) n = avail;
          ba.set(chan.buffer.subarray(chan.buffer_curr, chan.buffer_curr + n), i);
          chan.buffer_curr += n;
        }
        return n | 0;
      }
      function caml_md5_chan(chanid, toread) {
        var ctx = caml_MD5Init(), buffer = new Uint8Array(4096);
        if (toread < 0)
          while (true) {
            var read = caml_ml_input_block(chanid, buffer, 0, buffer.length);
            if (read === 0) break;
            caml_MD5Update(ctx, buffer.subarray(0, read), read);
          }
        else
          while (toread > 0) {
            var read = caml_ml_input_block(chanid, buffer, 0, toread > buffer.length ? buffer.length : toread);
            if (read === 0) caml_raise_end_of_file();
            caml_MD5Update(ctx, buffer.subarray(0, read), read);
            toread -= read;
          }
        return caml_string_of_uint8_array(caml_MD5Final(ctx));
      }
      function caml_md5_string(s2, ofs, len) {
        return caml_md5_bytes(caml_bytes_of_string(s2), ofs, len);
      }
      function caml_memprof_discard(t) {
        return 0;
      }
      function caml_memprof_start(rate, stack_size, tracker) {
        return 0;
      }
      function caml_memprof_stop(unit) {
        return 0;
      }
      function caml_ml_channel_redirect(captured, into) {
        var to_restore = caml_ml_channel_get(captured), new_ = caml_ml_channel_get(into);
        caml_ml_channels.set(captured, new_);
        return to_restore;
      }
      function caml_ml_channel_restore(captured, to_restore) {
        caml_ml_channels.set(captured, to_restore);
        return 0;
      }
      function caml_ml_channel_size(chanid) {
        var chan = caml_ml_channel_get(chanid);
        return chan.file.length() | 0;
      }
      function caml_ml_channel_size_64(chanid) {
        var chan = caml_ml_channel_get(chanid);
        return caml_int64_of_float(chan.file.length());
      }
      var caml_sys_fds = new Array(3);
      function caml_sys_close(fd) {
        var x2 = caml_sys_fds[fd];
        if (x2) {
          x2.file.close();
          delete caml_sys_fds[fd];
        }
        return 0;
      }
      function caml_ml_flush(chanid) {
        var chan = caml_ml_channel_get(chanid);
        if (!chan.opened) caml_raise_sys_error("Cannot flush a closed channel");
        if (!chan.buffer || chan.buffer_curr === 0) return 0;
        if (chan.output)
          chan.output(caml_sub_uint8_array_to_jsbytes(chan.buffer, 0, chan.buffer_curr));
        else
          for (var pos = 0; pos < chan.buffer_curr; )
            pos += chan.file.write(chan.buffer, pos, chan.buffer_curr - pos);
        chan.offset += chan.buffer_curr;
        chan.buffer_curr = 0;
        return 0;
      }
      function caml_ml_close_channel(chanid) {
        var chan = caml_ml_channel_get(chanid);
        if (chan.opened) {
          chan.opened = false;
          caml_ml_channels.close(chanid);
          caml_sys_close(chan.fd);
          chan.fd = -1;
          chan.buffer = new Uint8Array(0);
          chan.buffer_curr = 0;
          chan.buffer_max = 0;
        }
        return 0;
      }
      function caml_ml_condition_broadcast(t) {
        return 0;
      }
      function caml_ml_condition_new(unit) {
        return { condition: 1 };
      }
      function caml_ml_condition_signal(t) {
        return 0;
      }
      function caml_ml_condition_wait(t, mutext) {
        return 0;
      }
      function caml_ml_debug_info_status() {
        return 0;
      }
      function caml_ml_domain_cpu_relax(unit) {
        return 0;
      }
      function caml_ml_domain_id(unit) {
        return caml_domain_id;
      }
      function caml_ml_domain_index(unit) {
        return caml_domain_id;
      }
      var caml_runtime_warnings = 0;
      function caml_ml_enable_runtime_warnings(bool) {
        caml_runtime_warnings = bool;
        return 0;
      }
      function caml_ml_input(chanid, b, i, l) {
        var ba = caml_uint8_array_of_bytes(b);
        return caml_ml_input_block(chanid, ba, i, l);
      }
      function caml_ml_input_bigarray(chanid, b, i, l) {
        var ba = caml_ba_to_typed_array(b);
        return caml_ml_input_block(chanid, ba, i, l);
      }
      function caml_ml_input_char(chanid) {
        var chan = caml_ml_channel_get(chanid);
        if (chan.buffer_curr >= chan.buffer_max) {
          chan.buffer_curr = 0;
          chan.buffer_max = 0;
          caml_refill(chan);
        }
        if (chan.buffer_curr >= chan.buffer_max) caml_raise_end_of_file();
        var res = chan.buffer[chan.buffer_curr];
        chan.buffer_curr++;
        return res;
      }
      function caml_ml_input_int(chanid) {
        var chan = caml_ml_channel_get(chanid), res = 0;
        for (var i = 0; i < 4; i++)
          res = (res << 8) + caml_ml_input_char(chanid) | 0;
        return res | 0;
      }
      function caml_ml_input_scan_line(chanid) {
        var chan = caml_ml_channel_get(chanid), p = chan.buffer_curr;
        do
          if (p >= chan.buffer_max) {
            if (chan.buffer_curr > 0) {
              chan.buffer.set(chan.buffer.subarray(chan.buffer_curr), 0);
              p -= chan.buffer_curr;
              chan.buffer_max -= chan.buffer_curr;
              chan.buffer_curr = 0;
            }
            if (chan.buffer_max >= chan.buffer.length) return -chan.buffer_max | 0;
            var prev_max = chan.buffer_max;
            caml_refill(chan);
            if (prev_max === chan.buffer_max) return -chan.buffer_max | 0;
          }
        while (chan.buffer[p++] !== 10);
        return p - chan.buffer_curr | 0;
      }
      function caml_ml_is_binary_mode(chanid) {
        var chan = caml_ml_channel_get(chanid);
        return chan.file.flags.binary;
      }
      function caml_ml_is_buffered(chanid) {
        return caml_ml_channel_get(chanid).buffered ? 1 : 0;
      }
      function caml_ml_mutex_lock(t) {
        if (t.locked)
          caml_failwith("Mutex.lock: mutex already locked. Cannot wait.");
        else
          t.locked = true;
        return 0;
      }
      function caml_ml_mutex_new(unit) {
        return new MlMutex();
      }
      function caml_ml_mutex_try_lock(t) {
        if (!t.locked) {
          t.locked = true;
          return 1;
        }
        return 0;
      }
      function caml_sys_open_for_node(fd, flags) {
        if (flags.altname)
          try {
            var fs = __require2("fs"), fd2 = fs.openSync(flags.altname, "rs");
            return new MlNodeFd(fd2, flags);
          } catch (e) {
          }
        return new MlNodeFd(fd, flags);
      }
      function caml_sys_open_internal(file, idx) {
        var chanid;
        if (idx === void 0) {
          idx = caml_sys_fds.length;
          chanid = new MlChanid(idx);
        } else if (caml_sys_fds[idx])
          chanid = caml_sys_fds[idx].chanid;
        else
          chanid = new MlChanid(idx);
        caml_sys_fds[idx] = { file, chanid };
        return idx | 0;
      }
      function caml_sys_open(name, flags, perms) {
        var f = {};
        while (flags) {
          switch (flags[1]) {
            case 0:
              f.rdonly = 1;
              break;
            case 1:
              f.wronly = 1;
              break;
            case 2:
              f.append = 1;
              f.writeonly = 1;
              break;
            case 3:
              f.create = 1;
              break;
            case 4:
              f.truncate = 1;
              break;
            case 5:
              f.excl = 1;
              break;
            case 6:
              f.binary = 1;
              break;
            case 7:
              f.text = 1;
              break;
            case 8:
              f.nonblock = 1;
              break;
          }
          flags = flags[2];
        }
        var root = resolve_fs_device(name), file = root.device.open(root.rest, f, perms);
        return caml_sys_open_internal(file, void 0);
      }
      (function() {
        var is_node = fs_node_supported();
        function file(fd, flags) {
          return is_node ? caml_sys_open_for_node(fd, flags) : new MlFakeFd_out(fd, flags);
        }
        caml_sys_open_internal(
          file(0, { rdonly: 1, altname: "/dev/stdin", isCharacterDevice: true }),
          0
        );
        caml_sys_open_internal(
          file(1, { buffered: is_node ? 1 : 2, wronly: 1, isCharacterDevice: true }),
          1
        );
        caml_sys_open_internal(
          file(2, { buffered: is_node ? 1 : 2, wronly: 1, isCharacterDevice: true }),
          2
        );
      })();
      function caml_ml_open_descriptor_in(fd) {
        var fd_desc = caml_sys_fds[fd];
        if (fd_desc === void 0)
          caml_raise_sys_error("fd " + fd + " doesn't exist");
        var file = fd_desc.file, chanid = fd_desc.chanid, refill = null, channel = {
          file,
          offset: file.offset,
          fd,
          opened: true,
          out: false,
          buffer_curr: 0,
          buffer_max: 0,
          buffer: new Uint8Array(65536),
          refill
        };
        caml_ml_channels.set(chanid, channel);
        return chanid;
      }
      function caml_ml_open_descriptor_in_with_flags(fd, flags) {
        return caml_ml_open_descriptor_in(fd);
      }
      function caml_ml_open_descriptor_out(fd) {
        var fd_desc = caml_sys_fds[fd];
        if (fd_desc === void 0)
          caml_raise_sys_error("fd " + fd + " doesn't exist");
        var file = fd_desc.file, chanid = fd_desc.chanid, buffered = file.flags.buffered !== void 0 ? file.flags.buffered : 1, channel = {
          file,
          offset: file.offset,
          fd,
          opened: true,
          out: true,
          buffer_curr: 0,
          buffer: new Uint8Array(65536),
          buffered
        };
        caml_ml_channels.set(chanid, channel);
        return chanid;
      }
      function caml_ml_open_descriptor_out_with_flags(fd, flags) {
        return caml_ml_open_descriptor_out(fd);
      }
      function caml_ml_out_channels_list() {
        var l = 0, keys = caml_ml_channels.all();
        for (var k of keys) {
          var chan = caml_ml_channel_get(k);
          if (chan.opened && chan.out) l = [0, k, l];
        }
        return l;
      }
      function caml_ml_output_ta(chanid, buffer, offset, len) {
        var chan = caml_ml_channel_get(chanid);
        if (!chan.opened)
          caml_raise_sys_error("Cannot output to a closed channel");
        buffer = buffer.subarray(offset, offset + len);
        if (chan.buffer_curr + buffer.length > chan.buffer.length) {
          var b = new Uint8Array(chan.buffer_curr + buffer.length);
          b.set(chan.buffer);
          chan.buffer = b;
        }
        switch (chan.buffered) {
          case 0:
            chan.buffer.set(buffer, chan.buffer_curr);
            chan.buffer_curr += buffer.length;
            caml_ml_flush(chanid);
            break;
          case 1:
            chan.buffer.set(buffer, chan.buffer_curr);
            chan.buffer_curr += buffer.length;
            if (chan.buffer_curr >= chan.buffer.length) caml_ml_flush(chanid);
            break;
          case 2:
            var id = buffer.lastIndexOf(10);
            if (id < 0) {
              chan.buffer.set(buffer, chan.buffer_curr);
              chan.buffer_curr += buffer.length;
              if (chan.buffer_curr >= chan.buffer.length) caml_ml_flush(chanid);
            } else {
              chan.buffer.set(buffer.subarray(0, id + 1), chan.buffer_curr);
              chan.buffer_curr += id + 1;
              caml_ml_flush(chanid);
              chan.buffer.set(buffer.subarray(id + 1), chan.buffer_curr);
              chan.buffer_curr += buffer.length - id - 1;
            }
            break;
        }
        return 0;
      }
      function caml_ml_output_bytes(chanid, buffer, offset, len) {
        var buffer = caml_uint8_array_of_bytes(buffer);
        return caml_ml_output_ta(chanid, buffer, offset, len);
      }
      function caml_ml_output(chanid, buffer, offset, len) {
        return caml_ml_output_bytes(chanid, caml_bytes_of_string(buffer), offset, len);
      }
      function caml_ml_output_bigarray(chanid, buffer, offset, len) {
        var buffer = caml_ba_to_typed_array(buffer);
        return caml_ml_output_ta(chanid, buffer, offset, len);
      }
      function caml_ml_output_char(chanid, c) {
        var s2 = caml_string_of_jsbytes(String.fromCharCode(c));
        caml_ml_output(chanid, s2, 0, 1);
        return 0;
      }
      function caml_ml_output_int(chanid, i) {
        var arr = [i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, i & 255];
        caml_ml_output_ta(chanid, new Uint8Array(arr), 0, 4);
        return 0;
      }
      function caml_pos_in(chanid) {
        var chan = caml_ml_channel_get(chanid);
        return chan.offset - (chan.buffer_max - chan.buffer_curr);
      }
      function caml_ml_pos_in(chanid) {
        return caml_pos_in(chanid) | 0;
      }
      function caml_ml_pos_in_64(chanid) {
        return caml_int64_of_float(caml_pos_in(chanid));
      }
      function caml_pos_out(chanid) {
        var chan = caml_ml_channel_get(chanid);
        return chan.offset + chan.buffer_curr;
      }
      function caml_ml_pos_out(chanid) {
        return caml_pos_out(chanid) | 0;
      }
      function caml_ml_pos_out_64(chanid) {
        return caml_int64_of_float(caml_pos_out(chanid));
      }
      function caml_ml_runtime_events_are_active() {
        return 0;
      }
      function caml_ml_runtime_events_path(_unit) {
        return 0;
      }
      function caml_ml_runtime_events_pause() {
        return 0;
      }
      function caml_ml_runtime_events_resume() {
        return 0;
      }
      function caml_ml_runtime_events_start() {
        return 0;
      }
      function caml_ml_runtime_warnings_enabled(_unit) {
        return caml_runtime_warnings;
      }
      function caml_seek_in(chanid, pos) {
        var chan = caml_ml_channel_get(chanid);
        if (chan.refill != null) caml_raise_sys_error("Illegal seek");
        if (pos >= chan.offset - chan.buffer_max && pos <= chan.offset && chan.file.flags.binary)
          chan.buffer_curr = chan.buffer_max - (chan.offset - pos);
        else {
          chan.file.seek(pos, 0);
          chan.offset = pos;
          chan.buffer_curr = 0;
          chan.buffer_max = 0;
        }
        return 0;
      }
      function caml_ml_seek_in(chanid, pos) {
        return caml_seek_in(chanid, pos);
      }
      function caml_ml_seek_in_64(chanid, pos) {
        var pos = caml_int64_to_float(pos);
        return caml_seek_in(chanid, pos);
      }
      function caml_seek_out(chanid, pos) {
        caml_ml_flush(chanid);
        var chan = caml_ml_channel_get(chanid);
        chan.file.seek(pos, 0);
        chan.offset = pos;
        return 0;
      }
      function caml_ml_seek_out(chanid, pos) {
        return caml_seek_out(chanid, pos);
      }
      function caml_ml_seek_out_64(chanid, pos) {
        var pos = caml_int64_to_float(pos);
        return caml_seek_out(chanid, pos);
      }
      function caml_ml_set_binary_mode(chanid, mode) {
        var chan = caml_ml_channel_get(chanid);
        chan.file.flags.text = !mode;
        chan.file.flags.binary = mode;
        return 0;
      }
      function caml_ml_set_buffered(chanid, v) {
        caml_ml_channel_get(chanid).buffered = v;
        if (!v) caml_ml_flush(chanid);
        return 0;
      }
      function caml_ml_set_channel_name(chanid, name) {
        var chan = caml_ml_channel_get(chanid);
        chan.name = name;
        return 0;
      }
      function caml_ml_set_channel_output(chanid, f) {
        var chan = caml_ml_channel_get(chanid);
        chan.output = function(s2) {
          f(s2);
        };
        return 0;
      }
      function caml_ml_set_channel_refill(chanid, f) {
        caml_ml_channel_get(chanid).refill = f;
        return 0;
      }
      function caml_mod(x2, y) {
        if (y === 0) caml_raise_zero_divide();
        return x2 % y;
      }
      function caml_modf_float(x2) {
        if (Number.isFinite(x2)) {
          var neg = 1 / x2 < 0;
          x2 = Math.abs(x2);
          var i = Math.floor(x2), f = x2 - i;
          if (neg) {
            i = -i;
            f = -f;
          }
          return [0, f, i];
        }
        if (Number.isNaN(x2)) return [0, Number.NaN, Number.NaN];
        return [0, 1 / x2, x2];
      }
      function caml_mount_autoload(name, f) {
        var path = caml_make_path(name), name = caml_trailing_slash(path.join("/"));
        jsoo_mount_point.push({ path: name, device: new MlFakeDevice(name, f) });
        return 0;
      }
      function caml_lex_run_mem(s2, i, mem, curr_pos) {
        for (; ; ) {
          var dst = s2.charCodeAt(i);
          i++;
          if (dst === 255) return;
          var src = s2.charCodeAt(i);
          i++;
          if (src === 255)
            mem[dst + 1] = curr_pos;
          else
            mem[dst + 1] = mem[src + 1];
        }
      }
      function caml_lex_run_tag(s2, i, mem) {
        for (; ; ) {
          var dst = s2.charCodeAt(i);
          i++;
          if (dst === 255) return;
          var src = s2.charCodeAt(i);
          i++;
          if (src === 255) mem[dst + 1] = -1;
          else mem[dst + 1] = mem[src + 1];
        }
      }
      function caml_new_lex_engine(tbl, start_state, lexbuf) {
        var lex_buffer = 2, lex_buffer_len = 3, lex_start_pos = 5, lex_curr_pos = 6, lex_last_pos = 7, lex_last_action = 8, lex_eof_reached = 9, lex_mem = 10, lex_base = 1, lex_backtrk = 2, lex_default = 3, lex_trans = 4, lex_check = 5, lex_base_code = 6, lex_backtrk_code = 7, lex_default_code = 8, lex_trans_code = 9, lex_check_code = 10, lex_code = 11;
        if (!tbl.lex_default) {
          tbl.lex_base = caml_lex_array(tbl[lex_base]);
          tbl.lex_backtrk = caml_lex_array(tbl[lex_backtrk]);
          tbl.lex_check = caml_lex_array(tbl[lex_check]);
          tbl.lex_trans = caml_lex_array(tbl[lex_trans]);
          tbl.lex_default = caml_lex_array(tbl[lex_default]);
        }
        if (!tbl.lex_default_code) {
          tbl.lex_base_code = caml_lex_array(tbl[lex_base_code]);
          tbl.lex_backtrk_code = caml_lex_array(tbl[lex_backtrk_code]);
          tbl.lex_check_code = caml_lex_array(tbl[lex_check_code]);
          tbl.lex_trans_code = caml_lex_array(tbl[lex_trans_code]);
          tbl.lex_default_code = caml_lex_array(tbl[lex_default_code]);
        }
        if (tbl.lex_code == null)
          tbl.lex_code = caml_jsbytes_of_string(tbl[lex_code]);
        var c, state = start_state, buffer = lexbuf[lex_buffer];
        if (state >= 0) {
          lexbuf[lex_last_pos] = lexbuf[lex_start_pos] = lexbuf[lex_curr_pos];
          lexbuf[lex_last_action] = -1;
        } else
          state = -state - 1;
        for (; ; ) {
          var base = tbl.lex_base[state];
          if (base < 0) {
            var pc_off = tbl.lex_base_code[state];
            caml_lex_run_tag(tbl.lex_code, pc_off, lexbuf[lex_mem]);
            return -base - 1;
          }
          var backtrk = tbl.lex_backtrk[state];
          if (backtrk >= 0) {
            var pc_off = tbl.lex_backtrk_code[state];
            caml_lex_run_tag(tbl.lex_code, pc_off, lexbuf[lex_mem]);
            lexbuf[lex_last_pos] = lexbuf[lex_curr_pos];
            lexbuf[lex_last_action] = backtrk;
          }
          if (lexbuf[lex_curr_pos] >= lexbuf[lex_buffer_len])
            if (lexbuf[lex_eof_reached] === 0) return -state - 1;
            else c = 256;
          else {
            c = caml_bytes_unsafe_get(buffer, lexbuf[lex_curr_pos]);
            lexbuf[lex_curr_pos]++;
          }
          var pstate = state;
          if (tbl.lex_check[base + c] === state)
            state = tbl.lex_trans[base + c];
          else
            state = tbl.lex_default[state];
          if (state < 0) {
            lexbuf[lex_curr_pos] = lexbuf[lex_last_pos];
            if (lexbuf[lex_last_action] === -1)
              caml_failwith("lexing: empty token");
            else
              return lexbuf[lex_last_action];
          } else {
            var base_code = tbl.lex_base_code[pstate], pc_off;
            if (tbl.lex_check_code[base_code + c] === pstate)
              pc_off = tbl.lex_trans_code[base_code + c];
            else
              pc_off = tbl.lex_default_code[pstate];
            if (pc_off > 0)
              caml_lex_run_mem(tbl.lex_code, pc_off, lexbuf[lex_mem], lexbuf[lex_curr_pos]);
            if (c === 256) lexbuf[lex_eof_reached] = 0;
          }
        }
      }
      function caml_new_string(s2) {
        return caml_string_of_jsbytes(s2);
      }
      function caml_nextafter_float(x2, y) {
        if (Number.isNaN(x2) || Number.isNaN(y)) return Number.NaN;
        if (x2 === y) return y;
        if (x2 === 0) return y < 0 ? -Math.pow(2, -1074) : Math.pow(2, -1074);
        var bits = caml_int64_bits_of_float(x2), one = caml_int64_of_int32(1);
        if (x2 < y === x2 > 0)
          bits = caml_int64_add(bits, one);
        else
          bits = caml_int64_sub(bits, one);
        return caml_int64_float_of_bits(bits);
      }
      function caml_notequal(x2, y) {
        return +(caml_compare_val(x2, y, false) !== 0);
      }
      function caml_obj_add_offset(v, offset) {
        caml_failwith("Obj.add_offset is not supported");
      }
      function caml_obj_block(tag, size) {
        var o = new Array(size + 1);
        o[0] = tag;
        for (var i = 1; i <= size; i++) o[i] = 0;
        return o;
      }
      function caml_obj_compare_and_swap(x2, i, old, n) {
        if (x2[i + 1] === old) {
          x2[i + 1] = n;
          return 1;
        }
        return 0;
      }
      function caml_obj_is_shared(x2) {
        return 1;
      }
      function caml_obj_raw_field(o, i) {
        return o[i + 1];
      }
      function caml_obj_reachable_words(o) {
        return 0;
      }
      function caml_obj_set_raw_field(o, i, v) {
        return o[i + 1] = v;
      }
      function caml_obj_with_tag(tag, x2) {
        var l = x2.length, a = new Array(l);
        a[0] = tag;
        for (var i = 1; i < l; i++) a[i] = x2[i];
        return a;
      }
      function caml_ojs_new_arr(c, a) {
        switch (a.length) {
          case 0:
            return new c();
          case 1:
            return new c(a[0]);
          case 2:
            return new c(a[0], a[1]);
          case 3:
            return new c(a[0], a[1], a[2]);
          case 4:
            return new c(a[0], a[1], a[2], a[3]);
          case 5:
            return new c(a[0], a[1], a[2], a[3], a[4]);
          case 6:
            return new c(a[0], a[1], a[2], a[3], a[4], a[5]);
          case 7:
            return new c(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
        }
        function F() {
          return c.apply(this, a);
        }
        F.prototype = c.prototype;
        return new F();
      }
      var caml_output_val = function() {
        function Writer() {
          this.chunk = [];
        }
        Writer.prototype = {
          chunk_idx: 20,
          block_len: 0,
          obj_counter: 0,
          size_32: 0,
          size_64: 0,
          write: function(size, value) {
            for (var i = size - 8; i >= 0; i -= 8)
              this.chunk[this.chunk_idx++] = value >> i & 255;
          },
          write_at: function(pos, size, value) {
            var pos = pos;
            for (var i = size - 8; i >= 0; i -= 8)
              this.chunk[pos++] = value >> i & 255;
          },
          write_code: function(size, code, value) {
            this.chunk[this.chunk_idx++] = code;
            for (var i = size - 8; i >= 0; i -= 8)
              this.chunk[this.chunk_idx++] = value >> i & 255;
          },
          write_shared: function(offset) {
            if (offset < 1 << 8)
              this.write_code(8, 4, offset);
            else if (offset < 1 << 16)
              this.write_code(16, 5, offset);
            else
              this.write_code(32, 6, offset);
          },
          pos: function() {
            return this.chunk_idx;
          },
          finalize: function() {
            this.block_len = this.chunk_idx - 20;
            this.chunk_idx = 0;
            this.write(32, 2224400062);
            this.write(32, this.block_len);
            this.write(32, this.obj_counter);
            this.write(32, this.size_32);
            this.write(32, this.size_64);
            return this.chunk;
          }
        };
        return function(v, flags) {
          flags = caml_list_to_js_array(flags);
          var no_sharing = flags.indexOf(0) !== -1, closures = flags.indexOf(1) !== -1;
          if (closures)
            console.warn("in caml_output_val: flag Marshal.Closures is not supported.");
          var writer = new Writer(), stack = [], intern_obj_table = no_sharing ? null : new MlObjectTable();
          function memo(v2) {
            if (no_sharing) return false;
            var existing_offset = intern_obj_table.recall(v2);
            if (existing_offset) {
              writer.write_shared(existing_offset);
              return true;
            } else {
              intern_obj_table.store(v2);
              return false;
            }
          }
          function extern_rec(v2) {
            if (v2.caml_custom) {
              if (memo(v2)) return;
              var name = v2.caml_custom, ops = caml_custom_ops[name], sz_32_64 = [0, 0];
              if (!ops.serialize)
                caml_invalid_argument("output_value: abstract value (Custom)");
              if (ops.fixed_length === void 0) {
                writer.write(8, 24);
                for (var i2 = 0; i2 < name.length; i2++)
                  writer.write(8, name.charCodeAt(i2));
                writer.write(8, 0);
                var header_pos = writer.pos();
                for (var i2 = 0; i2 < 12; i2++) writer.write(8, 0);
                ops.serialize(writer, v2, sz_32_64);
                writer.write_at(header_pos, 32, sz_32_64[0]);
                writer.write_at(header_pos + 4, 32, 0);
                writer.write_at(header_pos + 8, 32, sz_32_64[1]);
              } else {
                writer.write(8, 25);
                for (var i2 = 0; i2 < name.length; i2++)
                  writer.write(8, name.charCodeAt(i2));
                writer.write(8, 0);
                var old_pos = writer.pos();
                ops.serialize(writer, v2, sz_32_64);
                if (ops.fixed_length !== writer.pos() - old_pos)
                  caml_failwith("output_value: incorrect fixed sizes specified by " + name);
              }
              writer.size_32 += 2 + (sz_32_64[0] + 3 >> 2);
              writer.size_64 += 2 + (sz_32_64[1] + 7 >> 3);
            } else if (Array.isArray(v2) && v2[0] === (v2[0] | 0)) {
              if (v2[0] === 251)
                caml_failwith("output_value: abstract value (Abstract)");
              if (caml_is_continuation_tag(v2[0]))
                caml_invalid_argument("output_value: continuation value");
              if (v2.length > 1 && memo(v2)) return;
              if (v2[0] < 16 && v2.length - 1 < 8)
                writer.write(8, 128 + v2[0] + (v2.length - 1 << 4));
              else
                writer.write_code(32, 8, v2.length - 1 << 10 | v2[0]);
              writer.size_32 += v2.length;
              writer.size_64 += v2.length;
              if (v2.length > 1) stack.push(v2, 1);
            } else if (caml_is_ml_bytes(v2)) {
              if (!caml_is_ml_bytes(caml_string_of_jsbytes("")))
                caml_failwith("output_value: [Bytes.t] cannot safely be marshaled with [--enable use-js-string]");
              if (memo(v2)) return;
              var len = caml_ml_bytes_length(v2);
              if (len < 32)
                writer.write(8, 32 + len);
              else if (len < 256)
                writer.write_code(8, 9, len);
              else
                writer.write_code(32, 10, len);
              for (var i2 = 0; i2 < len; i2++)
                writer.write(8, caml_bytes_unsafe_get(v2, i2));
              writer.size_32 += 1 + ((len + 4) / 4 | 0);
              writer.size_64 += 1 + ((len + 8) / 8 | 0);
            } else if (caml_is_ml_string(v2)) {
              if (memo(v2)) return;
              var len = caml_ml_string_length(v2);
              if (len < 32)
                writer.write(8, 32 + len);
              else if (len < 256)
                writer.write_code(8, 9, len);
              else
                writer.write_code(32, 10, len);
              for (var i2 = 0; i2 < len; i2++)
                writer.write(8, caml_string_unsafe_get(v2, i2));
              writer.size_32 += 1 + ((len + 4) / 4 | 0);
              writer.size_64 += 1 + ((len + 8) / 8 | 0);
            } else if (v2 !== (v2 | 0)) {
              var type_of_v = typeof v2;
              if (type_of_v !== "number")
                caml_failwith("output_value: abstract value (" + type_of_v + ")");
              if (memo(v2)) return;
              var t = caml_int64_to_bytes(caml_int64_bits_of_float(v2));
              writer.write(8, 12);
              for (var i2 = 0; i2 < 8; i2++) writer.write(8, t[7 - i2]);
              writer.size_32 += 3;
              writer.size_64 += 2;
            } else if (v2 >= 0 && v2 < 64)
              writer.write(8, 64 + v2);
            else if (v2 >= -(1 << 7) && v2 < 1 << 7)
              writer.write_code(8, 0, v2);
            else if (v2 >= -(1 << 15) && v2 < 1 << 15)
              writer.write_code(16, 1, v2);
            else
              writer.write_code(32, 2, v2);
          }
          extern_rec(v);
          while (stack.length > 0) {
            var i = stack.pop(), v = stack.pop();
            if (i + 1 < v.length) stack.push(v, i + 1);
            extern_rec(v[i]);
          }
          if (intern_obj_table)
            writer.obj_counter = intern_obj_table.objs.length;
          writer.finalize();
          return new Uint8Array(writer.chunk);
        };
      }();
      function caml_output_value_to_string(v, flags) {
        return caml_string_of_uint8_array(caml_output_val(v, flags));
      }
      function caml_output_value(chanid, v, flags) {
        var s2 = caml_output_value_to_string(v, flags);
        caml_ml_output(chanid, s2, 0, caml_ml_string_length(s2));
        return 0;
      }
      function caml_output_value_to_buffer(s2, ofs, len, v, flags) {
        var t = caml_output_val(v, flags);
        if (t.length > len) caml_failwith("Marshal.to_buffer: buffer overflow");
        caml_blit_bytes(caml_bytes_of_uint8_array(t), 0, s2, ofs, t.length);
        return 0;
      }
      function caml_output_value_to_bytes(v, flags) {
        return caml_bytes_of_uint8_array(caml_output_val(v, flags));
      }
      var caml_parser_trace = 0;
      function caml_parse_engine(tables, env, cmd, arg) {
        var ERRCODE = 256, loop = 6, testshift = 7, shift = 8, shift_recover = 9, reduce = 10, READ_TOKEN = 0, RAISE_PARSE_ERROR = 1, GROW_STACKS_1 = 2, GROW_STACKS_2 = 3, COMPUTE_SEMANTIC_ACTION = 4, CALL_ERROR_FUNCTION = 5, env_s_stack = 1, env_v_stack = 2, env_symb_start_stack = 3, env_symb_end_stack = 4, env_stacksize = 5, env_stackbase = 6, env_curr_char = 7, env_lval = 8, env_symb_start = 9, env_symb_end = 10, env_asp = 11, env_rule_len = 12, env_rule_number = 13, env_sp = 14, env_state = 15, env_errflag = 16, tbl_transl_const = 2, tbl_transl_block = 3, tbl_lhs = 4, tbl_len = 5, tbl_defred = 6, tbl_dgoto = 7, tbl_sindex = 8, tbl_rindex = 9, tbl_gindex = 10, tbl_tablesize = 11, tbl_table = 12, tbl_check = 13, tbl_names_const = 15, tbl_names_block = 16;
        function log(x2) {
          var s2 = caml_string_of_jsbytes(x2 + "\n");
          caml_ml_output(caml_sys_fds[2].chanid, s2, 0, caml_ml_string_length(s2));
        }
        function token_name(names, number) {
          var str = caml_jsstring_of_string(names);
          if (str[0] === "\0") return "<unknown token>";
          return str.split("\0")[number];
        }
        function print_token(state2, tok) {
          var token, kind;
          if (Array.isArray(tok)) {
            token = token_name(tables[tbl_names_block], tok[0]);
            if (typeof tok[1] === "number")
              kind = "" + tok[1];
            else if (typeof tok[1] === "string")
              kind = tok[1];
            else if (tok[1] instanceof MlBytes)
              kind = caml_jsbytes_of_string(tok[1]);
            else
              kind = "_";
            log("State " + state2 + ": read token " + token + "(" + kind + ")");
          } else {
            token = token_name(tables[tbl_names_const], tok);
            log("State " + state2 + ": read token " + token);
          }
        }
        if (!tables.dgoto) {
          tables.defred = caml_lex_array(tables[tbl_defred]);
          tables.sindex = caml_lex_array(tables[tbl_sindex]);
          tables.check = caml_lex_array(tables[tbl_check]);
          tables.rindex = caml_lex_array(tables[tbl_rindex]);
          tables.table = caml_lex_array(tables[tbl_table]);
          tables.len = caml_lex_array(tables[tbl_len]);
          tables.lhs = caml_lex_array(tables[tbl_lhs]);
          tables.gindex = caml_lex_array(tables[tbl_gindex]);
          tables.dgoto = caml_lex_array(tables[tbl_dgoto]);
        }
        var res = 0, n, n1, n2, state1, sp = env[env_sp], state = env[env_state], errflag = env[env_errflag];
        the_loop:
          for (; ; )
            switch (cmd) {
              case 0:
                state = 0;
                errflag = 0;
              case 6:
                n = tables.defred[state];
                if (n !== 0) {
                  cmd = reduce;
                  continue the_loop;
                }
                if (env[env_curr_char] >= 0) {
                  cmd = testshift;
                  continue the_loop;
                }
                res = READ_TOKEN;
                break the_loop;
              case 1:
                if (Array.isArray(arg)) {
                  env[env_curr_char] = tables[tbl_transl_block][arg[0] + 1];
                  env[env_lval] = arg[1];
                } else {
                  env[env_curr_char] = tables[tbl_transl_const][arg + 1];
                  env[env_lval] = 0;
                }
                if (caml_parser_trace) print_token(state, arg);
              case 7:
                n1 = tables.sindex[state];
                n2 = n1 + env[env_curr_char];
                if (n1 !== 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] && tables.check[n2] === env[env_curr_char]) {
                  cmd = shift;
                  continue the_loop;
                }
                n1 = tables.rindex[state];
                n2 = n1 + env[env_curr_char];
                if (n1 !== 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] && tables.check[n2] === env[env_curr_char]) {
                  n = tables.table[n2];
                  cmd = reduce;
                  continue the_loop;
                }
                if (errflag <= 0) {
                  res = CALL_ERROR_FUNCTION;
                  break the_loop;
                }
              case 5:
                if (errflag < 3) {
                  errflag = 3;
                  for (; ; ) {
                    state1 = env[env_s_stack][sp + 1];
                    n1 = tables.sindex[state1];
                    n2 = n1 + ERRCODE;
                    if (n1 !== 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] && tables.check[n2] === ERRCODE) {
                      if (caml_parser_trace) log("Recovering in state " + state1);
                      cmd = shift_recover;
                      continue the_loop;
                    } else {
                      if (caml_parser_trace) log("Discarding state " + state1);
                      if (sp <= env[env_stackbase]) {
                        if (caml_parser_trace) log("No more states to discard");
                        return RAISE_PARSE_ERROR;
                      }
                      sp--;
                    }
                  }
                } else {
                  if (env[env_curr_char] === 0) return RAISE_PARSE_ERROR;
                  if (caml_parser_trace) log("Discarding last token read");
                  env[env_curr_char] = -1;
                  cmd = loop;
                  continue the_loop;
                }
              case 8:
                env[env_curr_char] = -1;
                if (errflag > 0) errflag--;
              case 9:
                if (caml_parser_trace)
                  log("State " + state + ": shift to state " + tables.table[n2]);
                state = tables.table[n2];
                sp++;
                if (sp >= env[env_stacksize]) {
                  res = GROW_STACKS_1;
                  break the_loop;
                }
              case 2:
                env[env_s_stack][sp + 1] = state;
                env[env_v_stack][sp + 1] = env[env_lval];
                env[env_symb_start_stack][sp + 1] = env[env_symb_start];
                env[env_symb_end_stack][sp + 1] = env[env_symb_end];
                cmd = loop;
                continue the_loop;
              case 10:
                if (caml_parser_trace) log("State " + state + ": reduce by rule " + n);
                var m = tables.len[n];
                env[env_asp] = sp;
                env[env_rule_number] = n;
                env[env_rule_len] = m;
                sp = sp - m + 1;
                m = tables.lhs[n];
                state1 = env[env_s_stack][sp];
                n1 = tables.gindex[m];
                n2 = n1 + state1;
                if (n1 !== 0 && n2 >= 0 && n2 <= tables[tbl_tablesize] && tables.check[n2] === state1)
                  state = tables.table[n2];
                else
                  state = tables.dgoto[m];
                if (sp >= env[env_stacksize]) {
                  res = GROW_STACKS_2;
                  break the_loop;
                }
              case 3:
                res = COMPUTE_SEMANTIC_ACTION;
                break the_loop;
              case 4:
                env[env_s_stack][sp + 1] = state;
                env[env_v_stack][sp + 1] = arg;
                var asp = env[env_asp];
                env[env_symb_end_stack][sp + 1] = env[env_symb_end_stack][asp + 1];
                if (sp > asp)
                  env[env_symb_start_stack][sp + 1] = env[env_symb_end_stack][asp + 1];
                cmd = loop;
                continue the_loop;
              default:
                return RAISE_PARSE_ERROR;
            }
        env[env_sp] = sp;
        env[env_state] = state;
        env[env_errflag] = errflag;
        return res;
      }
      function caml_process_pending_actions_with_root(extra_root) {
        return 0;
      }
      function caml_pure_js_expr(s) {
        console.error("caml_pure_js_expr: fallback to runtime evaluation\n");
        return eval(caml_jsstring_of_string(s));
      }
      function caml_raise_not_found() {
        caml_raise_constant(caml_global_data.Not_found);
      }
      function caml_raw_backtrace_length() {
        return 0;
      }
      function caml_raw_backtrace_next_slot() {
        return 0;
      }
      function caml_raw_backtrace_slot() {
        caml_invalid_argument("Printexc.get_raw_backtrace_slot: index out of bounds");
      }
      function caml_read_file_content(name) {
        var name = typeof name === "string" ? caml_string_of_jsstring(name) : name, root = resolve_fs_device(name);
        if (root.device.exists(root.rest)) {
          var file = root.device.open(root.rest, { rdonly: 1 }), len = file.length(), buf = new Uint8Array(len);
          file.read(buf, 0, len);
          return caml_string_of_uint8_array(buf);
        }
        caml_raise_no_such_file(caml_jsstring_of_string(name));
      }
      function caml_recommended_domain_count(unit) {
        return 1;
      }
      function caml_record_backtrace(b) {
        caml_record_backtrace_runtime_flag = b;
        return 0;
      }
      var jsoo_toplevel_reloc = void 0;
      function caml_register_global(n, v, name_opt) {
        if (name_opt) {
          var name = name_opt;
          if (jsoo_toplevel_reloc)
            n = caml_callback(jsoo_toplevel_reloc, [name]);
          else if (caml_global_data.symbols) {
            if (!caml_global_data.symidx)
              caml_global_data.symidx = caml_build_symbols(caml_global_data.symbols);
            var nid = caml_global_data.symidx[name];
            if (nid >= 0)
              n = nid;
            else {
              var n = caml_global_data.symidx.next_idx++;
              caml_global_data.symidx[name] = n;
            }
          }
        }
        caml_global_data[n + 1] = v;
        if (name_opt) caml_global_data[name_opt] = v;
      }
      function caml_register_named_value(nm, v) {
        caml_named_values[caml_jsbytes_of_string(nm)] = v;
        return 0;
      }
      function caml_restore_raw_backtrace(exn, bt) {
        return 0;
      }
      function caml_round_float(x2) {
        if (x2 >= 0) {
          var y = Math.floor(x2);
          return x2 - y >= 0.5 ? y + 1 : y;
        } else {
          var y = Math.ceil(x2);
          return y - x2 >= 0.5 ? y - 1 : y;
        }
      }
      function caml_runtime_events_create_cursor(target) {
        return {};
      }
      function caml_runtime_events_free_cursor(cursor) {
        return 0;
      }
      function caml_runtime_events_read_poll(cursor, callbacks, num) {
        return 0;
      }
      function caml_runtime_events_user_register(event_name, event_tag, event_type) {
        caml_custom_event_index += 1;
        return [0, caml_custom_event_index, event_name, event_type, event_tag];
      }
      function caml_runtime_events_user_resolve() {
        return 0;
      }
      function caml_runtime_events_user_write(event, event_content) {
        return 0;
      }
      function caml_runtime_parameters(_unit) {
        return caml_string_of_jsbytes("");
      }
      function caml_runtime_variant(_unit) {
        return caml_string_of_jsbytes("");
      }
      function caml_set_parser_trace(bool) {
        var oldflag = caml_parser_trace;
        caml_parser_trace = bool;
        return oldflag;
      }
      function caml_set_static_env(k, v) {
        jsoo_static_env[k] = v;
        return 0;
      }
      function caml_signbit_float(x2) {
        if (x2 === 0) x2 = 1 / x2;
        return x2 < 0 ? 1 : 0;
      }
      function caml_sinh_float(x2) {
        return Math.sinh(x2);
      }
      function caml_string_bound_error() {
        caml_invalid_argument("index out of bounds");
      }
      function caml_string_concat(a, b) {
        return a + b;
      }
      function caml_string_equal(s1, s2) {
        if (s1 === s2) return 1;
        return 0;
      }
      function caml_string_get(s2, i) {
        if (i >>> 0 >= caml_ml_string_length(s2)) caml_string_bound_error();
        return caml_string_unsafe_get(s2, i);
      }
      function caml_string_get16(s2, i) {
        if (i >>> 0 >= caml_ml_string_length(s2) - 1) caml_string_bound_error();
        var b1 = caml_string_unsafe_get(s2, i), b2 = caml_string_unsafe_get(s2, i + 1);
        return b2 << 8 | b1;
      }
      function caml_string_get32(s2, i) {
        if (i >>> 0 >= caml_ml_string_length(s2) - 3) caml_string_bound_error();
        var b1 = caml_string_unsafe_get(s2, i), b2 = caml_string_unsafe_get(s2, i + 1), b3 = caml_string_unsafe_get(s2, i + 2), b4 = caml_string_unsafe_get(s2, i + 3);
        return b4 << 24 | b3 << 16 | b2 << 8 | b1;
      }
      function caml_string_get64(s2, i) {
        if (i >>> 0 >= caml_ml_string_length(s2) - 7) caml_string_bound_error();
        var a = new Array(8);
        for (var j = 0; j < 8; j++) a[7 - j] = caml_string_unsafe_get(s2, i + j);
        return caml_int64_of_bytes(a);
      }
      function caml_string_lessequal(s1, s2) {
        return s1 <= s2 ? 1 : 0;
      }
      function caml_string_greaterequal(s1, s2) {
        return caml_string_lessequal(s2, s1);
      }
      function caml_string_lessthan(s1, s2) {
        return s1 < s2 ? 1 : 0;
      }
      function caml_string_greaterthan(s1, s2) {
        return caml_string_lessthan(s2, s1);
      }
      function caml_string_hash(h, v) {
        var h = caml_hash_mix_string(h, v), h = caml_hash_mix_final(h);
        return h & 1073741823;
      }
      function caml_string_notequal(s1, s2) {
        return 1 - caml_string_equal(s1, s2);
      }
      function caml_subarray_to_jsbytes(a, i, len) {
        var f = String.fromCharCode;
        if (i === 0 && len <= 4096 && len === a.length) return f.apply(null, a);
        var s2 = "";
        for (; 0 < len; i += 1024, len -= 1024)
          s2 += f.apply(null, a.slice(i, i + Math.min(len, 1024)));
        return s2;
      }
      function caml_string_of_array(a) {
        return caml_string_of_jsbytes(caml_subarray_to_jsbytes(a, 0, a.length));
      }
      function caml_string_set(s2, i, c) {
        caml_failwith("caml_string_set");
      }
      function caml_sys_argv(a) {
        return caml_argv;
      }
      function caml_sys_chdir(dir) {
        var root = resolve_fs_device(dir);
        if (root.device.is_dir(root.rest)) {
          if (root.rest)
            caml_current_dir = caml_trailing_slash(root.path + root.rest);
          else
            caml_current_dir = root.path;
          return 0;
        } else if (root.device.exists(root.rest))
          caml_raise_sys_error("ENOTDIR: not a directory, chdir '" + caml_jsstring_of_string(dir) + "'");
        else
          caml_raise_no_such_file(caml_jsstring_of_string(dir));
      }
      function caml_sys_const_backend_type() {
        return [0, caml_string_of_jsbytes("js_of_ocaml")];
      }
      function caml_sys_const_big_endian() {
        return 0;
      }
      function caml_sys_const_int_size() {
        return 32;
      }
      function caml_sys_const_max_wosize() {
        return 2147483647 / 4 | 0;
      }
      function caml_sys_const_naked_pointers_checked(_unit) {
        return 0;
      }
      var os_type = globalThis.process && globalThis.process.platform && globalThis.process.platform === "win32" ? "Win32" : "Unix";
      function caml_sys_const_ostype_cygwin() {
        return os_type === "Cygwin" ? 1 : 0;
      }
      function caml_sys_const_ostype_unix() {
        return os_type === "Unix" ? 1 : 0;
      }
      function caml_sys_const_ostype_win32() {
        return os_type === "Win32" ? 1 : 0;
      }
      function caml_sys_const_word_size() {
        return 32;
      }
      function caml_sys_executable_name(a) {
        return caml_executable_name;
      }
      function caml_sys_exit(code) {
        if (globalThis.quit) globalThis.quit(code);
        if (globalThis.process && globalThis.process.exit)
          globalThis.process.exit(code);
        caml_invalid_argument("Function 'exit' not implemented");
      }
      function caml_sys_file_exists(name) {
        var root = resolve_fs_device(name);
        return root.device.exists(root.rest);
      }
      function caml_sys_get_argv(a) {
        return [0, caml_argv[1], caml_argv];
      }
      function caml_sys_get_config() {
        return [0, caml_string_of_jsbytes(os_type), 32, 0];
      }
      function caml_sys_getcwd() {
        return caml_string_of_jsstring(caml_current_dir);
      }
      function caml_sys_getenv(name) {
        var r = jsoo_sys_getenv(caml_jsstring_of_string(name));
        if (r === void 0) caml_raise_not_found();
        return caml_string_of_jsstring(r);
      }
      function caml_sys_is_directory(name) {
        var root = resolve_fs_device(name), a = root.device.is_dir(root.rest);
        return a ? 1 : 0;
      }
      function caml_sys_is_regular_file(name) {
        var root = resolve_fs_device(name);
        return root.device.isFile(root.rest);
      }
      function caml_sys_isatty(_chan) {
        return 0;
      }
      function caml_sys_mkdir(name, perm) {
        var root = resolve_fs_device(name);
        root.device.mkdir(root.rest, perm);
        return 0;
      }
      function caml_sys_modify_argv(arg) {
        caml_argv = arg;
        return 0;
      }
      function caml_sys_random_seed() {
        if (globalThis.crypto) {
          if (globalThis.crypto.getRandomValues) {
            var a = globalThis.crypto.getRandomValues(new Int32Array(4));
            return [0, a[0], a[1], a[2], a[3]];
          } else if (globalThis.crypto.randomBytes) {
            var a = new Int32Array(globalThis.crypto.randomBytes(16).buffer);
            return [0, a[0], a[1], a[2], a[3]];
          }
        }
        var now = (/* @__PURE__ */ new Date()).getTime(), x2 = now ^ 4294967295 * Math.random();
        return [0, x2];
      }
      function caml_sys_read_directory(name) {
        var root = resolve_fs_device(name), a = root.device.readdir(root.rest), l = new Array(a.length + 1);
        l[0] = 0;
        for (var i = 0; i < a.length; i++)
          l[i + 1] = caml_string_of_jsstring(a[i]);
        return l;
      }
      function caml_sys_remove(name) {
        var root = resolve_fs_device(name);
        return root.device.unlink(root.rest);
      }
      function caml_sys_rename(o, n) {
        var o_root = resolve_fs_device(o), n_root = resolve_fs_device(n);
        if (o_root.device !== n_root.device)
          caml_failwith("caml_sys_rename: cannot move file between two filesystem");
        if (!o_root.device.rename)
          caml_failwith("caml_sys_rename: no implemented");
        o_root.device.rename(o_root.rest, n_root.rest);
      }
      function caml_sys_rmdir(name) {
        var root = resolve_fs_device(name);
        root.device.rmdir(root.rest);
        return 0;
      }
      function caml_sys_system_command(cmd) {
        var cmd = caml_jsstring_of_string(cmd);
        if (typeof __require2 !== "undefined") {
          var child_process = __require2("child_process");
          if (child_process && child_process.execSync)
            try {
              child_process.execSync(cmd, { stdio: "inherit" });
              return 0;
            } catch (e) {
              return 1;
            }
        } else
          return 127;
      }
      var caml_initial_time = (/* @__PURE__ */ new Date()).getTime() * 1e-3;
      function caml_sys_time() {
        var now = (/* @__PURE__ */ new Date()).getTime();
        return now * 1e-3 - caml_initial_time;
      }
      function caml_sys_time_include_children(b) {
        return caml_sys_time();
      }
      function caml_sys_unsafe_getenv(name) {
        return caml_sys_getenv(name);
      }
      function caml_tanh_float(x2) {
        return Math.tanh(x2);
      }
      function caml_to_js_string(s2) {
        return caml_jsstring_of_string(s2);
      }
      function caml_trampoline(res) {
        var c = 1;
        while (res && res.joo_tramp) {
          res = res.joo_tramp.apply(null, res.joo_args);
          c++;
        }
        return res;
      }
      function caml_trampoline_return(f, args, direct) {
        return { joo_tramp: f, joo_args: args, joo_direct: direct };
      }
      function caml_trunc_float(x2) {
        return Math.trunc(x2);
      }
      function caml_uniform_array_append(a1, a2) {
        return caml_array_append(a1, a2);
      }
      function caml_uniform_array_blit(a1, i1, a2, i2, len) {
        return caml_array_blit(a1, i1, a2, i2, len);
      }
      function caml_uniform_array_fill(array, ofs, len, v) {
        return caml_array_fill(array, ofs, len, v);
      }
      function caml_uniform_array_make(len, init) {
        return caml_array_make(len, init);
      }
      function caml_uniform_array_sub(a, i, len) {
        return caml_array_sub(a, i, len);
      }
      function caml_unix_cleanup() {
      }
      function caml_unix_lookup_file(fd, cmd) {
        var fd_desc = caml_sys_fds[fd];
        if (fd_desc === void 0) caml_raise_system_error(1, "EBADF", cmd);
        return fd_desc.file;
      }
      function caml_unix_close(fd) {
        var file = caml_unix_lookup_file(fd, "close");
        file.close(1);
        return 0;
      }
      function caml_unix_closedir(dir_handle) {
        try {
          dir_handle.pointer.closeSync();
        } catch (e) {
          caml_raise_system_error(1, "EBADF", "closedir");
        }
      }
      function caml_unix_filedescr_of_fd(x2) {
        return x2;
      }
      function caml_unix_findclose(dir_handle) {
        return caml_unix_closedir(dir_handle);
      }
      function caml_unix_opendir(path) {
        var root = resolve_fs_device(path);
        if (!root.device.opendir)
          caml_failwith("caml_unix_opendir: not implemented");
        var dir_handle = root.device.opendir(root.rest, true);
        return { pointer: dir_handle, path };
      }
      function caml_unix_readdir(dir_handle) {
        var entry;
        try {
          entry = dir_handle.pointer.readSync();
        } catch (e) {
          caml_raise_system_error(1, "EBADF", "readdir");
        }
        if (entry === null)
          caml_raise_end_of_file();
        else
          return caml_string_of_jsstring(entry.name);
      }
      function caml_unix_findfirst(path) {
        var path_js = caml_jsstring_of_string(path);
        path_js = path_js.replace(/(^|[\\/])\*\.\*$/, "");
        path = caml_string_of_jsstring(path_js);
        var dir_handle = caml_unix_opendir(path), first_entry = caml_unix_readdir(dir_handle);
        return [0, first_entry, dir_handle];
      }
      function caml_unix_findnext(dir_handle) {
        return caml_unix_readdir(dir_handle);
      }
      function caml_unix_fstat(fd) {
        var file = caml_unix_lookup_file(fd, "fstat");
        if (!file.stat) caml_failwith("caml_unix_fstat: not implemented");
        return file.stat(false);
      }
      function caml_unix_fstat_64(fd) {
        var file = caml_unix_lookup_file(fd, "fstat");
        if (!file.stat) caml_failwith("caml_unix_fstat64: not implemented");
        return file.stat(true);
      }
      function caml_unix_ftruncate(fd, len) {
        var file = caml_unix_lookup_file(fd, "ftruncate");
        if (!file.truncate) caml_failwith("caml_unix_ftruncate: not implemented");
        file.truncate(len, 1);
        return 0;
      }
      function caml_unix_ftruncate_64(fd, len) {
        var file = caml_unix_lookup_file(fd, "ftruncate");
        if (!file.truncate)
          caml_failwith("caml_unix_ftruncate_64: not implemented");
        file.truncate(caml_int64_to_float(len), 1);
        return 0;
      }
      function caml_unix_getpwuid(unit) {
        caml_raise_not_found();
      }
      function caml_unix_gettimeofday() {
        return (/* @__PURE__ */ new Date()).getTime() / 1e3;
      }
      function caml_unix_getuid(unit) {
        if (globalThis.process && globalThis.process.getuid)
          return globalThis.process.getuid();
        return 1;
      }
      function caml_unix_gmtime(t) {
        var d = new Date(t * 1e3), d_num = d.getTime(), januaryfirst = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)).getTime(), doy = Math.floor((d_num - januaryfirst) / 864e5);
        return [
          0,
          d.getUTCSeconds(),
          d.getUTCMinutes(),
          d.getUTCHours(),
          d.getUTCDate(),
          d.getUTCMonth(),
          d.getUTCFullYear() - 1900,
          d.getUTCDay(),
          doy,
          false | 0
        ];
      }
      function caml_unix_has_symlink(unit) {
        return fs_node_supported() ? 1 : 0;
      }
      function caml_unix_inchannel_of_filedescr(fd) {
        var file = caml_unix_lookup_file(fd, "out_channel_of_descr");
        file.check_stream_semantics("in_channel_of_descr");
        return caml_ml_open_descriptor_in(fd);
      }
      function caml_unix_inet_addr_of_string() {
        return 0;
      }
      function caml_unix_isatty(fd) {
        if (fs_node_supported()) {
          var tty = __require2("tty");
          return tty.isatty(caml_unix_lookup_file(fd).fd) ? 1 : 0;
        } else
          return 0;
      }
      function caml_unix_localtime(t) {
        var d = new Date(t * 1e3), d_num = d.getTime(), januaryfirst = new Date(d.getFullYear(), 0, 1).getTime(), doy = Math.floor((d_num - januaryfirst) / 864e5), jan = new Date(d.getFullYear(), 0, 1), jul = new Date(d.getFullYear(), 6, 1), stdTimezoneOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        return [
          0,
          d.getSeconds(),
          d.getMinutes(),
          d.getHours(),
          d.getDate(),
          d.getMonth(),
          d.getFullYear() - 1900,
          d.getDay(),
          doy,
          d.getTimezoneOffset() < stdTimezoneOffset | 0
        ];
      }
      function caml_unix_lseek(fd, len, whence) {
        var file = caml_unix_lookup_file(fd, "lseek");
        return file.seek(len, whence, 1);
      }
      function caml_unix_lseek_64(fd, len, whence) {
        var file = caml_unix_lookup_file(fd, "lseek");
        return file.seek(caml_int64_to_float(len), whence, 1);
      }
      function caml_unix_lstat(name) {
        var root = resolve_fs_device(name);
        if (!root.device.lstat) caml_failwith("caml_unix_lstat: not implemented");
        return root.device.lstat(root.rest, false, true);
      }
      function caml_unix_lstat_64(name) {
        var root = resolve_fs_device(name);
        if (!root.device.lstat)
          caml_failwith("caml_unix_lstat_64: not implemented");
        return root.device.lstat(root.rest, true, true);
      }
      function caml_unix_mkdir(name, perm) {
        var root = resolve_fs_device(name);
        if (!root.device.mkdir) caml_failwith("caml_unix_mkdir: not implemented");
        return root.device.mkdir(root.rest, perm, true);
      }
      function caml_unix_mktime(tm) {
        var d = new Date(tm[6] + 1900, tm[5], tm[4], tm[3], tm[2], tm[1]).getTime(), t = Math.floor(d / 1e3), tm2 = caml_unix_localtime(t);
        return [0, t, tm2];
      }
      function caml_unix_open(name, flags, perms) {
        var f = {};
        while (flags) {
          switch (flags[1]) {
            case 0:
              f.rdonly = 1;
              break;
            case 1:
              f.wronly = 1;
              break;
            case 2:
              f.rdwr = 1;
              break;
            case 3:
              f.nonblock = 1;
              break;
            case 4:
              f.append = 1;
              break;
            case 5:
              f.create = 1;
              break;
            case 6:
              f.truncate = 1;
              break;
            case 7:
              f.excl = 1;
              break;
            case 8:
              f.noctty = 1;
              break;
            case 9:
              f.dsync = 1;
              break;
            case 10:
              f.sync = 1;
              break;
          }
          flags = flags[2];
        }
        var root = resolve_fs_device(name), file = root.device.open(root.rest, f, perms, true), idx = caml_sys_fds.length, chanid = new MlChanid(idx);
        caml_sys_fds[idx] = { file, chanid };
        return idx | 0;
      }
      function caml_unix_outchannel_of_filedescr(fd) {
        var file = caml_unix_lookup_file(fd, "out_channel_of_descr");
        file.check_stream_semantics("out_channel_of_descr");
        return caml_ml_open_descriptor_out(fd);
      }
      function caml_unix_read(fd, buf, pos, len) {
        var file = caml_unix_lookup_file(fd, "read");
        return file.read(caml_uint8_array_of_bytes(buf), pos, len, 1);
      }
      function caml_unix_read_bigarray(fd, buf, pos, len) {
        var a = caml_ba_to_typed_array(buf), file = caml_unix_lookup_file(fd, "read");
        return file.read(a, pos, len, 1);
      }
      function caml_unix_readlink(name) {
        var root = resolve_fs_device(name);
        if (!root.device.readlink)
          caml_failwith("caml_unix_readlink: not implemented");
        return root.device.readlink(root.rest, true);
      }
      function caml_unix_rename(o, n) {
        var o_root = resolve_fs_device(o), n_root = resolve_fs_device(n);
        if (o_root.device !== n_root.device)
          caml_raise_system_error(1, "EXDEV", "rename");
        if (!o_root.device.rename)
          caml_failwith("caml_sys_rename: no implemented");
        o_root.device.rename(o_root.rest, n_root.rest, true);
      }
      function caml_unix_rewinddir(dir_handle) {
        caml_unix_closedir(dir_handle);
        var new_dir_handle = caml_unix_opendir(dir_handle.path);
        dir_handle.pointer = new_dir_handle.pointer;
        return 0;
      }
      function caml_unix_rmdir(name) {
        var root = resolve_fs_device(name);
        if (!root.device.rmdir) caml_failwith("caml_unix_rmdir: not implemented");
        return root.device.rmdir(root.rest, true);
      }
      function caml_unix_startup() {
      }
      function caml_unix_stat(name) {
        var root = resolve_fs_device(name);
        if (!root.device.stat) caml_failwith("caml_unix_stat: not implemented");
        return root.device.stat(root.rest, false, true);
      }
      function caml_unix_stat_64(name) {
        var root = resolve_fs_device(name);
        if (!root.device.stat)
          caml_failwith("caml_unix_stat_64: not implemented");
        return root.device.stat(root.rest, true, true);
      }
      function caml_unix_symlink(to_dir, src, dst) {
        var dst_root = resolve_fs_device(dst);
        if (!dst_root.device.symlink)
          caml_failwith("caml_unix_symlink: not implemented");
        return dst_root.device.symlink(to_dir, caml_jsstring_of_string(src), dst_root.rest, true);
      }
      function caml_unix_time() {
        return Math.floor(caml_unix_gettimeofday());
      }
      function caml_unix_truncate(name, len) {
        var root = resolve_fs_device(name);
        if (!root.device.truncate)
          caml_failwith("caml_unix_truncate: not implemented");
        root.device.truncate(root.rest, len, true);
        return 0;
      }
      function caml_unix_truncate_64(name, len) {
        var root = resolve_fs_device(name);
        if (!root.device.truncate)
          caml_failwith("caml_unix_truncate_64: not implemented");
        root.device.truncate(root.rest, caml_int64_to_float(len), true);
        return 0;
      }
      function caml_unix_unlink(name) {
        var root = resolve_fs_device(name);
        if (!root.device.unlink)
          caml_failwith("caml_unix_unlink: not implemented");
        root.device.unlink(root.rest, true);
        return 0;
      }
      function caml_unix_utimes(name, atime, mtime) {
        var root = resolve_fs_device(name);
        if (!root.device.utimes)
          caml_failwith("caml_unix_utimes: not implemented");
        root.device.utimes(root.rest, atime, mtime, true);
        return 0;
      }
      function caml_unix_write(fd, buf, pos, len) {
        var file = caml_unix_lookup_file(fd, "write"), a = caml_uint8_array_of_bytes(buf), written = 0;
        while (len > 0) {
          var n = file.write(a, pos, len, 1);
          written += n;
          pos += n;
          len -= n;
        }
        return written;
      }
      function caml_unix_write_bigarray(fd, buf, pos, len) {
        var a = caml_ba_to_typed_array(buf), file = caml_unix_lookup_file(fd, "write"), written = 0;
        while (len > 0) {
          var n = file.write(a, pos, len, 1);
          written += n;
          pos += n;
          len -= n;
        }
        return written;
      }
      function caml_unmount(name) {
        var path = caml_make_path(name), name = caml_trailing_slash(path.join("/")), idx = -1;
        for (var i = 0; i < jsoo_mount_point.length; i++)
          if (jsoo_mount_point[i].path === name) idx = i;
        if (idx > -1) jsoo_mount_point.splice(idx, 1);
        return 0;
      }
      function caml_update_dummy(x2, y) {
        if (y.fun) {
          x2.fun = y.fun;
          return 0;
        }
        if (typeof y === "function") {
          x2.fun = y;
          return 0;
        }
        var i = y.length;
        while (i--) x2[i] = y[i];
        return 0;
      }
      function caml_weak_set(x2, i, v) {
        if (v === 0) caml_ephe_unset_key(x2, i);
        else caml_ephe_set_key(x2, i, v[1]);
        return 0;
      }
      function caml_wrap_exception(e) {
        {
          if (Array.isArray(e)) return e;
          var exn;
          if (globalThis.RangeError && e instanceof globalThis.RangeError && e.message && e.message.match(/maximum call stack/i))
            exn = caml_global_data.Stack_overflow;
          else if (globalThis.InternalError && e instanceof globalThis.InternalError && e.message && e.message.match(/too much recursion/i))
            exn = caml_global_data.Stack_overflow;
          else if (e instanceof globalThis.Error && caml_named_value("jsError"))
            exn = [0, caml_named_value("jsError"), e];
          else
            exn = [0, caml_global_data.Failure, caml_string_of_jsstring(String(e))];
          if (e instanceof globalThis.Error) exn.js_error = e;
          return exn;
        }
      }
      function caml_xdg_defaults(_unit) {
        return 0;
      }
      function caml_xmlhttprequest_create(unit) {
        if (typeof globalThis.XMLHttpRequest !== "undefined")
          try {
            return new globalThis.XMLHttpRequest();
          } catch (e) {
          }
        caml_failwith("Cannot create a XMLHttpRequest");
      }
      function caml_zstd_initialize(unit) {
        caml_decompress_input = zstd_decompress;
        return 1;
      }
      function compare_digits_nat(nat1, ofs1, nat2, ofs2) {
        if (nat1.data[ofs1] > nat2.data[ofs2]) return 1;
        if (nat1.data[ofs1] < nat2.data[ofs2]) return -1;
        return 0;
      }
      function compare_nat(nat1, ofs1, len1, nat2, ofs2, len2) {
        var a = num_digits_nat(nat1, ofs1, len1), b = num_digits_nat(nat2, ofs2, len2);
        if (a > b) return 1;
        if (a < b) return -1;
        for (var i = len1 - 1; i >= 0; i--) {
          if (nat1.data[ofs1 + i] >>> 0 > nat2.data[ofs2 + i] >>> 0) return 1;
          if (nat1.data[ofs1 + i] >>> 0 < nat2.data[ofs2 + i] >>> 0) return -1;
        }
        return 0;
      }
      function complement_nat(nat, ofs, len) {
        for (var i = 0; i < len; i++)
          nat.data[ofs + i] = (-1 >>> 0) - (nat.data[ofs + i] >>> 0);
      }
      function create_nat(size) {
        var arr = new MlNat(size);
        for (var i = 0; i < size; i++) arr.data[i] = -1;
        return arr;
      }
      function decr_nat(nat, ofs, len, carry_in) {
        var borrow = carry_in === 1 ? 0 : 1;
        for (var i = 0; i < len; i++) {
          var x2 = (nat.data[ofs + i] >>> 0) - borrow;
          nat.data[ofs + i] = x2;
          if (x2 >= 0) {
            borrow = 0;
            break;
          } else borrow = 1;
        }
        return borrow === 1 ? 0 : 1;
      }
      function deserialize_nat(reader, sz) {
        var len = reader.read32s(), nat = new MlNat(len);
        for (var i = 0; i < len; i++) nat.data[i] = reader.read32s();
        sz[0] = len * 4;
        return nat;
      }
      function div_helper(a, b, c) {
        var x2 = a * 65536 + (b >>> 16), y = Math.floor(x2 / c) * 65536, z = x2 % c * 65536, w = z + (b & 65535);
        return [y + Math.floor(w / c), w % c];
      }
      function div_digit_nat(natq, ofsq, natr, ofsr, nat1, ofs1, len, nat2, ofs2) {
        var rem = nat1.data[ofs1 + len - 1] >>> 0;
        for (var i = len - 2; i >= 0; i--) {
          var x2 = div_helper(rem, nat1.data[ofs1 + i] >>> 0, nat2.data[ofs2] >>> 0);
          natq.data[ofsq + i] = x2[0];
          rem = x2[1];
        }
        natr.data[ofsr] = rem;
        return 0;
      }
      function num_leading_zero_bits_in_digit(nat, ofs) {
        var a = nat.data[ofs], b = 0;
        if (a & 4294901760) {
          b += 16;
          a >>>= 16;
        }
        if (a & 65280) {
          b += 8;
          a >>>= 8;
        }
        if (a & 240) {
          b += 4;
          a >>>= 4;
        }
        if (a & 12) {
          b += 2;
          a >>>= 2;
        }
        if (a & 2) {
          b += 1;
          a >>>= 1;
        }
        if (a & 1) b += 1;
        return 32 - b;
      }
      function shift_left_nat(nat1, ofs1, len1, nat2, ofs2, nbits) {
        if (nbits === 0) {
          nat2.data[ofs2] = 0;
          return 0;
        }
        var wrap = 0;
        for (var i = 0; i < len1; i++) {
          var a = nat1.data[ofs1 + i] >>> 0;
          nat1.data[ofs1 + i] = a << nbits | wrap;
          wrap = a >>> 32 - nbits;
        }
        nat2.data[ofs2] = wrap;
        return 0;
      }
      function shift_right_nat(nat1, ofs1, len1, nat2, ofs2, nbits) {
        if (nbits === 0) {
          nat2.data[ofs2] = 0;
          return 0;
        }
        var wrap = 0;
        for (var i = len1 - 1; i >= 0; i--) {
          var a = nat1.data[ofs1 + i] >>> 0;
          nat1.data[ofs1 + i] = a >>> nbits | wrap;
          wrap = a << 32 - nbits;
        }
        nat2.data[ofs2] = wrap;
        return 0;
      }
      function set_to_zero_nat(nat, ofs, len) {
        for (var i = 0; i < len; i++) nat.data[ofs + i] = 0;
        return 0;
      }
      function nat_of_array(l) {
        return new MlNat(l);
      }
      function mult_digit_nat(nat1, ofs1, len1, nat2, ofs2, len2, nat3, ofs3) {
        var carry = 0, a = nat3.data[ofs3] >>> 0;
        for (var i = 0; i < len2; i++) {
          var x1 = (nat1.data[ofs1 + i] >>> 0) + (nat2.data[ofs2 + i] >>> 0) * (a & 65535) + carry, x2 = (nat2.data[ofs2 + i] >>> 0) * (a >>> 16);
          carry = Math.floor(x2 / 65536);
          var x3 = x1 + x2 % 65536 * 65536;
          nat1.data[ofs1 + i] = x3;
          carry += Math.floor(x3 / 4294967296);
        }
        return len2 < len1 && carry ? add_nat(nat1, ofs1 + len2, len1 - len2, nat_of_array([carry]), 0, 1, 0) : carry;
      }
      function sub_nat(nat1, ofs1, len1, nat2, ofs2, len2, carry_in) {
        var borrow = carry_in === 1 ? 0 : 1;
        for (var i = 0; i < len2; i++) {
          var x2 = (nat1.data[ofs1 + i] >>> 0) - (nat2.data[ofs2 + i] >>> 0) - borrow;
          nat1.data[ofs1 + i] = x2;
          if (x2 >= 0) borrow = 0;
          else borrow = 1;
        }
        return decr_nat(nat1, ofs1 + len2, len1 - len2, borrow === 1 ? 0 : 1);
      }
      function div_nat(nat1, ofs1, len1, nat2, ofs2, len2) {
        if (len2 === 1) {
          div_digit_nat(nat1, ofs1 + 1, nat1, ofs1, nat1, ofs1, len1, nat2, ofs2);
          return 0;
        }
        var s2 = num_leading_zero_bits_in_digit(nat2, ofs2 + len2 - 1);
        shift_left_nat(nat2, ofs2, len2, nat_of_array([0]), 0, s2);
        shift_left_nat(nat1, ofs1, len1, nat_of_array([0]), 0, s2);
        var d = (nat2.data[ofs2 + len2 - 1] >>> 0) + 1, a = create_nat(len2 + 1);
        for (var i = len1 - 1; i >= len2; i--) {
          var quo = d === 4294967296 ? nat1.data[ofs1 + i] >>> 0 : div_helper(nat1.data[ofs1 + i] >>> 0, nat1.data[ofs1 + i - 1] >>> 0, d)[0];
          set_to_zero_nat(a, 0, len2 + 1);
          mult_digit_nat(a, 0, len2 + 1, nat2, ofs2, len2, nat_of_array([quo]), 0);
          sub_nat(nat1, ofs1 + i - len2, len2 + 1, a, 0, len2 + 1, 1);
          while (nat1.data[ofs1 + i] !== 0 || compare_nat(nat1, ofs1 + i - len2, len2, nat2, ofs2, len2) >= 0) {
            quo = quo + 1;
            sub_nat(nat1, ofs1 + i - len2, len2 + 1, nat2, ofs2, len2, 1);
          }
          nat1.data[ofs1 + i] = quo;
        }
        shift_right_nat(nat1, ofs1, len2, nat_of_array([0]), 0, s2);
        shift_right_nat(nat2, ofs2, len2, nat_of_array([0]), 0, s2);
        return 0;
      }
      function serialize_nat(writer, nat, sz) {
        var len = nat.data.length;
        writer.write(32, len);
        for (var i = 0; i < len; i++) writer.write(32, nat.data[i]);
        sz[0] = len * 4;
        sz[1] = len * 8;
      }
      function initialize_nat() {
        caml_custom_ops._nat = {
          deserialize: deserialize_nat,
          serialize: serialize_nat,
          hash: caml_hash_nat
        };
      }
      function is_digit_int(nat, ofs) {
        if (nat.data[ofs] >= 0) return 1;
        return 0;
      }
      function is_digit_normalized(nat, ofs) {
        return 1;
      }
      function is_digit_odd(nat, ofs) {
        if (nat.data[ofs] & 1) return 1;
        return 0;
      }
      function is_digit_zero(nat, ofs) {
        if (nat.data[ofs] === 0) return 1;
        return 0;
      }
      function jsoo_create_file_extern(name, content) {
        if (globalThis.jsoo_create_file)
          globalThis.jsoo_create_file(name, content);
        else {
          if (!globalThis.jsoo_fs_tmp) globalThis.jsoo_fs_tmp = [];
          globalThis.jsoo_fs_tmp.push({ name, content });
        }
        return 0;
      }
      function jsoo_effect_not_supported() {
        caml_failwith("Effect handlers are not supported");
      }
      function land_digit_nat(nat1, ofs1, nat2, ofs2) {
        nat1.data[ofs1] &= nat2.data[ofs2];
        return 0;
      }
      function length_nat(x2) {
        return x2.data.length;
      }
      function lor_digit_nat(nat1, ofs1, nat2, ofs2) {
        nat1.data[ofs1] |= nat2.data[ofs2];
        return 0;
      }
      function lxor_digit_nat(nat1, ofs1, nat2, ofs2) {
        nat1.data[ofs1] ^= nat2.data[ofs2];
        return 0;
      }
      function mult_nat(nat1, ofs1, len1, nat2, ofs2, len2, nat3, ofs3, len3) {
        var carry = 0;
        for (var i = 0; i < len3; i++)
          carry += mult_digit_nat(nat1, ofs1 + i, len1 - i, nat2, ofs2, len2, nat3, ofs3 + i);
        return carry;
      }
      function nth_digit_nat(nat, ofs) {
        return nat.data[ofs];
      }
      function nth_digit_nat_native(nat, ofs) {
        return nat.data[ofs];
      }
      var re_match = /* @__PURE__ */ function() {
        var re_word_letters = [
          0,
          0,
          0,
          0,
          0,
          0,
          255,
          3,
          254,
          255,
          255,
          135,
          254,
          255,
          255,
          7,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          255,
          255,
          127,
          255,
          255,
          255,
          127,
          255
        ], opcodes = {
          CHAR: 0,
          CHARNORM: 1,
          STRING: 2,
          STRINGNORM: 3,
          CHARCLASS: 4,
          BOL: 5,
          EOL: 6,
          WORDBOUNDARY: 7,
          BEGGROUP: 8,
          ENDGROUP: 9,
          REFGROUP: 10,
          ACCEPT: 11,
          SIMPLEOPT: 12,
          SIMPLESTAR: 13,
          SIMPLEPLUS: 14,
          GOTO: 15,
          PUSHBACK: 16,
          SETMARK: 17,
          CHECKPROGRESS: 18
        };
        function is_word_letter(c) {
          return re_word_letters[c >> 3] >> (c & 7) & 1;
        }
        function in_bitset(s2, i) {
          return caml_string_get(s2, i >> 3) >> (i & 7) & 1;
        }
        function re_match_impl(re, s2, pos, partial) {
          var prog = caml_js_from_array(re[1]), cpool = caml_js_from_array(re[2]), normtable = caml_jsbytes_of_string(re[3]), numgroups = re[4] | 0, numregisters = re[5] | 0, startchars = re[6] | 0, s2 = caml_uint8_array_of_string(s2), pc = 0, quit = false, stack = [], groups = new Array(numgroups), re_register = new Array(numregisters);
          for (var i = 0; i < groups.length; i++)
            groups[i] = { start: -1, end: -1 };
          groups[0].start = pos;
          function backtrack() {
            while (stack.length) {
              var item = stack.pop();
              if (item.undo)
                item.undo.obj[item.undo.prop] = item.undo.value;
              else if (item.pos) {
                pc = item.pos.pc;
                pos = item.pos.txt;
                return;
              }
            }
            quit = true;
          }
          function push(item) {
            stack.push(item);
          }
          function accept() {
            groups[0].end = pos;
            var result = new Array(1 + groups.length * 2);
            result[0] = 0;
            for (var i2 = 0; i2 < groups.length; i2++) {
              var g = groups[i2];
              if (g.start < 0 || g.end < 0) g.start = g.end = -1;
              result[2 * i2 + 1] = g.start;
              result[2 * i2 + 1 + 1] = g.end;
            }
            return result;
          }
          function prefix_match() {
            if (partial) return accept();
            else backtrack();
          }
          while (!quit) {
            var op = prog[pc] & 255, sarg = prog[pc] >> 8, uarg = sarg & 255, c = s2[pos], group;
            pc++;
            switch (op) {
              case opcodes.CHAR:
                if (pos === s2.length) {
                  prefix_match();
                  break;
                }
                if (c === uarg) pos++;
                else backtrack();
                break;
              case opcodes.CHARNORM:
                if (pos === s2.length) {
                  prefix_match();
                  break;
                }
                if (normtable.charCodeAt(c) === uarg) pos++;
                else backtrack();
                break;
              case opcodes.STRING:
                for (var arg = caml_jsbytes_of_string(cpool[uarg]), i = 0; i < arg.length; i++) {
                  if (pos === s2.length) {
                    prefix_match();
                    break;
                  }
                  if (c === arg.charCodeAt(i))
                    c = s2[++pos];
                  else {
                    backtrack();
                    break;
                  }
                }
                break;
              case opcodes.STRINGNORM:
                for (var arg = caml_jsbytes_of_string(cpool[uarg]), i = 0; i < arg.length; i++) {
                  if (pos === s2.length) {
                    prefix_match();
                    break;
                  }
                  if (normtable.charCodeAt(c) === arg.charCodeAt(i))
                    c = s2[++pos];
                  else {
                    backtrack();
                    break;
                  }
                }
                break;
              case opcodes.CHARCLASS:
                if (pos === s2.length) {
                  prefix_match();
                  break;
                }
                if (in_bitset(cpool[uarg], c)) pos++;
                else backtrack();
                break;
              case opcodes.BOL:
                if (pos > 0 && s2[pos - 1] !== 10) backtrack();
                break;
              case opcodes.EOL:
                if (pos < s2.length && s2[pos] !== 10) backtrack();
                break;
              case opcodes.WORDBOUNDARY:
                if (pos === 0) {
                  if (pos === s2.length) {
                    prefix_match();
                    break;
                  }
                  if (is_word_letter(s2[0])) break;
                  backtrack();
                } else if (pos === s2.length) {
                  if (is_word_letter(s2[pos - 1])) break;
                  backtrack();
                } else {
                  if (is_word_letter(s2[pos - 1]) !== is_word_letter(s2[pos])) break;
                  backtrack();
                }
                break;
              case opcodes.BEGGROUP:
                group = groups[uarg];
                push({ undo: { obj: group, prop: "start", value: group.start } });
                group.start = pos;
                break;
              case opcodes.ENDGROUP:
                group = groups[uarg];
                push({ undo: { obj: group, prop: "end", value: group.end } });
                group.end = pos;
                break;
              case opcodes.REFGROUP:
                group = groups[uarg];
                if (group.start < 0 || group.end < 0) {
                  backtrack();
                  break;
                }
                for (var i = group.start; i < group.end; i++) {
                  if (pos === s2.length) {
                    prefix_match();
                    break;
                  }
                  if (s2[i] !== s2[pos]) {
                    backtrack();
                    break;
                  }
                  pos++;
                }
                break;
              case opcodes.SIMPLEOPT:
                if (in_bitset(cpool[uarg], c)) pos++;
                break;
              case opcodes.SIMPLESTAR:
                while (in_bitset(cpool[uarg], c)) c = s2[++pos];
                break;
              case opcodes.SIMPLEPLUS:
                if (pos === s2.length) {
                  prefix_match();
                  break;
                }
                if (in_bitset(cpool[uarg], c))
                  do
                    c = s2[++pos];
                  while (in_bitset(cpool[uarg], c));
                else
                  backtrack();
                break;
              case opcodes.ACCEPT:
                return accept();
              case opcodes.GOTO:
                pc = pc + sarg;
                break;
              case opcodes.PUSHBACK:
                push({ pos: { pc: pc + sarg, txt: pos } });
                break;
              case opcodes.SETMARK:
                push({ undo: { obj: re_register, prop: uarg, value: re_register[uarg] } });
                re_register[uarg] = pos;
                break;
              case opcodes.CHECKPROGRESS:
                if (re_register[uarg] === pos) backtrack();
                break;
              default:
                throw new Error("Invalid bytecode");
            }
          }
          return 0;
        }
        return re_match_impl;
      }();
      function re_partial_match(re, s2, pos) {
        if (pos < 0 || pos > caml_ml_string_length(s2))
          caml_invalid_argument("Str.partial_match");
        var res = re_match(re, s2, pos, 1);
        return res ? res : [0];
      }
      function re_replacement_text(repl, groups, orig) {
        var repl = caml_jsbytes_of_string(repl), len = repl.length, orig = caml_jsbytes_of_string(orig), res = "", n = 0, cur, start, end, c;
        while (n < len) {
          cur = repl.charAt(n++);
          if (cur !== "\\")
            res += cur;
          else {
            if (n === len) caml_failwith("Str.replace: illegal backslash sequence");
            cur = repl.charAt(n++);
            switch (cur) {
              case "\\":
                res += cur;
                break;
              case "0":
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
                c = +cur;
                if (c * 2 >= groups.length - 1)
                  caml_failwith("Str.replace: reference to unmatched group");
                start = caml_array_get(groups, c * 2);
                end = caml_array_get(groups, c * 2 + 1);
                if (start === -1)
                  caml_failwith("Str.replace: reference to unmatched group");
                res += orig.slice(start, end);
                break;
              default:
                res += "\\" + cur;
            }
          }
        }
        return caml_string_of_jsbytes(res);
      }
      function re_search_backward(re, s2, pos) {
        if (pos < 0 || pos > caml_ml_string_length(s2))
          caml_invalid_argument("Str.search_backward");
        while (pos >= 0) {
          var res = re_match(re, s2, pos, 0);
          if (res) return res;
          pos--;
        }
        return [0];
      }
      function re_search_forward(re, s2, pos) {
        if (pos < 0 || pos > caml_ml_string_length(s2))
          caml_invalid_argument("Str.search_forward");
        while (pos <= caml_ml_string_length(s2)) {
          var res = re_match(re, s2, pos, 0);
          if (res) return res;
          pos++;
        }
        return [0];
      }
      function re_string_match(re, s2, pos) {
        if (pos < 0 || pos > caml_ml_string_length(s2))
          caml_invalid_argument("Str.string_match");
        var res = re_match(re, s2, pos, 0);
        return res ? res : [0];
      }
      function set_digit_nat(nat, ofs, digit) {
        nat.data[ofs] = digit;
        return 0;
      }
      function set_digit_nat_native(nat, ofs, digit) {
        nat.data[ofs] = digit;
        return 0;
      }
      function square_nat(nat1, ofs1, len1, nat2, ofs2, len2) {
        var carry = 0;
        carry += add_nat(nat1, ofs1, len1, nat1, ofs1, len1, 0);
        carry += mult_nat(nat1, ofs1, len1, nat2, ofs2, len2, nat2, ofs2, len2);
        return carry;
      }
      function caml_setup_uncaught_exception_handler() {
        var process = globalThis.process;
        if (process && process.on)
          process.on(
            "uncaughtException",
            function(err, origin) {
              caml_fatal_uncaught_exception(err);
              process.exit(2);
            }
          );
        else if (globalThis.addEventListener)
          globalThis.addEventListener(
            "error",
            function(event) {
              if (event.error) caml_fatal_uncaught_exception(event.error);
            }
          );
      }
      caml_setup_uncaught_exception_handler();
      globalThis.jsoo_runtime = {
        caml_blake2_bytes,
        caml_blake2_string,
        caml_blake2_update,
        caml_blake2_final,
        caml_blake2_create,
        blake2b,
        caml_ml_runtime_events_path,
        caml_runtime_events_read_poll,
        caml_runtime_events_free_cursor,
        caml_runtime_events_create_cursor,
        caml_ml_runtime_events_resume,
        caml_ml_runtime_events_are_active,
        caml_ml_runtime_events_pause,
        caml_ml_runtime_events_start,
        caml_runtime_events_user_resolve,
        caml_runtime_events_user_write,
        caml_runtime_events_user_register,
        caml_custom_event_index,
        caml_zstd_initialize,
        caml_decompress_input,
        zstd_decompress,
        jsoo_effect_not_supported,
        caml_ml_condition_signal,
        caml_ml_condition_broadcast,
        caml_ml_condition_wait,
        caml_ml_condition_new,
        caml_get_continuation_callstack,
        caml_continuation_use_and_update_handler_noexc,
        caml_continuation_use_noexc,
        caml_alloc_stack,
        caml_ml_mutex_unlock,
        caml_ml_mutex_try_lock,
        caml_ml_mutex_lock,
        caml_ml_mutex_new,
        MlMutex,
        caml_lxm_next,
        caml_lxm_daba,
        caml_lxm_M,
        caml_ml_domain_cpu_relax,
        caml_ml_domain_id,
        caml_domain_spawn,
        caml_domain_id,
        caml_ml_domain_index,
        caml_recommended_domain_count,
        caml_atomic_make_contended,
        caml_atomic_exchange,
        caml_atomic_fetch_add,
        caml_atomic_cas,
        caml_atomic_load,
        caml_domain_dls_get,
        caml_domain_dls_compare_and_set,
        caml_domain_dls_set,
        caml_domain_dls,
        caml_ephe_check_data,
        caml_ephe_unset_data,
        caml_ephe_set_data_opt,
        caml_ephe_set_data,
        caml_ephe_get_data_copy,
        caml_ephe_get_data,
        caml_ephe_blit_data,
        caml_ephe_blit_key,
        caml_ephe_check_key,
        caml_ephe_get_key_copy,
        caml_ephe_get_key,
        caml_weak_set,
        caml_weak_create,
        caml_ephe_create,
        caml_ephe_unset_key,
        caml_ephe_set_key,
        caml_ephe_none,
        caml_ephe_data_offset,
        caml_ephe_key_offset,
        caml_raise_system_error,
        caml_unix_inet_addr_of_string,
        caml_unix_findclose,
        caml_unix_findnext,
        caml_unix_findfirst,
        caml_unix_rewinddir,
        caml_unix_closedir,
        caml_unix_readdir,
        caml_unix_opendir,
        caml_unix_has_symlink,
        caml_unix_getpwuid,
        caml_unix_getuid,
        caml_unix_outchannel_of_filedescr,
        caml_unix_inchannel_of_filedescr,
        caml_unix_close,
        caml_unix_ftruncate_64,
        caml_unix_ftruncate,
        caml_unix_lseek_64,
        caml_unix_lseek,
        caml_unix_read_bigarray,
        caml_unix_read,
        caml_unix_write_bigarray,
        caml_unix_write,
        caml_unix_fstat_64,
        caml_unix_fstat,
        caml_unix_lookup_file,
        caml_unix_open,
        caml_unix_truncate_64,
        caml_unix_truncate,
        caml_unix_utimes,
        caml_unix_unlink,
        caml_unix_readlink,
        caml_unix_symlink,
        caml_unix_rmdir,
        caml_unix_mkdir,
        caml_unix_rename,
        caml_unix_lstat_64,
        caml_unix_lstat,
        caml_unix_stat_64,
        caml_unix_stat,
        make_unix_err_args,
        unix_error,
        caml_unix_isatty,
        caml_unix_filedescr_of_fd,
        caml_unix_cleanup,
        caml_unix_startup,
        caml_unix_mktime,
        caml_unix_localtime,
        caml_unix_gmtime,
        caml_unix_time,
        caml_unix_gettimeofday,
        re_replacement_text,
        re_partial_match,
        re_string_match,
        re_search_backward,
        re_search_forward,
        re_match,
        caml_sys_is_regular_file,
        caml_xdg_defaults,
        caml_sys_const_naked_pointers_checked,
        caml_ml_runtime_warnings_enabled,
        caml_ml_enable_runtime_warnings,
        caml_runtime_warnings,
        caml_install_signal_handler,
        caml_runtime_parameters,
        caml_runtime_variant,
        caml_sys_isatty,
        caml_sys_get_config,
        os_type,
        caml_sys_const_backend_type,
        caml_sys_const_ostype_cygwin,
        caml_sys_const_ostype_win32,
        caml_sys_const_ostype_unix,
        caml_sys_const_max_wosize,
        caml_sys_const_int_size,
        caml_sys_const_word_size,
        caml_sys_const_big_endian,
        caml_sys_random_seed,
        caml_sys_time_include_children,
        caml_sys_time,
        caml_sys_system_command,
        caml_sys_executable_name,
        caml_sys_modify_argv,
        caml_sys_argv,
        caml_sys_get_argv,
        caml_executable_name,
        caml_argv,
        caml_sys_unsafe_getenv,
        caml_sys_getenv,
        jsoo_sys_getenv,
        caml_set_static_env,
        jsoo_static_env,
        caml_fatal_uncaught_exception,
        caml_format_exception,
        caml_is_special_exception,
        caml_sys_exit,
        caml_raise_sys_error,
        caml_process_pending_actions_with_root,
        caml_maybe_print_stats,
        caml_is_printable,
        caml_get_global_data,
        caml_register_global,
        jsoo_toplevel_reloc,
        caml_build_symbols,
        caml_global_data,
        caml_named_value,
        caml_register_named_value,
        caml_named_values,
        caml_call_gen,
        caml_set_parser_trace,
        caml_parse_engine,
        caml_parser_trace,
        caml_custom_identifier,
        caml_is_continuation_tag,
        caml_lazy_read_result,
        caml_lazy_reset_to_lazy,
        caml_lazy_update_to_forward,
        caml_lazy_update_to_forcing,
        caml_obj_update_tag,
        caml_obj_add_offset,
        caml_obj_reachable_words,
        caml_obj_set_raw_field,
        caml_obj_raw_field,
        caml_fresh_oo_id,
        caml_set_oo_id,
        caml_oo_last_id,
        caml_get_public_method,
        caml_lazy_make_forward,
        caml_obj_is_shared,
        caml_obj_compare_and_swap,
        caml_obj_dup,
        caml_obj_with_tag,
        caml_obj_block,
        caml_obj_tag,
        caml_alloc_dummy_infix,
        caml_update_dummy,
        deserialize_nat,
        serialize_nat,
        lxor_digit_nat,
        lor_digit_nat,
        land_digit_nat,
        compare_nat,
        compare_digits_nat,
        shift_right_nat,
        div_nat,
        div_digit_nat,
        div_helper,
        shift_left_nat,
        square_nat,
        mult_nat,
        mult_digit_nat,
        sub_nat,
        decr_nat,
        complement_nat,
        add_nat,
        incr_nat,
        is_digit_odd,
        is_digit_normalized,
        is_digit_zero,
        is_digit_int,
        num_leading_zero_bits_in_digit,
        num_digits_nat,
        nth_digit_nat_native,
        set_digit_nat_native,
        nth_digit_nat,
        set_digit_nat,
        blit_nat,
        set_to_zero_nat,
        create_nat,
        nat_of_array,
        length_nat,
        caml_hash_nat,
        MlNat,
        initialize_nat,
        caml_new_string,
        caml_array_of_bytes,
        caml_array_of_string,
        caml_js_to_string,
        caml_to_js_string,
        caml_js_from_string,
        caml_js_to_byte_string,
        caml_is_ml_string,
        caml_ml_bytes_content,
        caml_is_ml_bytes,
        caml_bytes_of_jsbytes,
        caml_string_of_jsstring,
        caml_jsstring_of_string,
        caml_jsbytes_of_string,
        caml_string_of_jsbytes,
        caml_bytes_of_string,
        caml_string_of_bytes,
        caml_string_lessthan,
        caml_string_lessequal,
        caml_string_equal,
        caml_string_compare,
        caml_ml_string_length,
        caml_string_unsafe_get,
        caml_string_concat,
        caml_ml_bytes_length,
        caml_blit_string,
        caml_blit_bytes,
        caml_fill_bytes,
        caml_bytes_greaterthan,
        caml_string_greaterthan,
        caml_bytes_greaterequal,
        caml_string_greaterequal,
        caml_bytes_lessthan,
        caml_bytes_lessequal,
        caml_bytes_notequal,
        caml_string_notequal,
        caml_bytes_equal,
        caml_bytes_compare,
        caml_bytes_of_uint8_array,
        caml_bytes_of_array,
        caml_string_of_uint8_array,
        caml_string_of_array,
        caml_create_bytes,
        caml_create_string,
        caml_uint8_array_of_string,
        caml_uint8_array_of_bytes,
        caml_convert_bytes_to_array,
        caml_convert_string_to_bytes,
        MlBytes,
        caml_bytes_of_utf16_jsstring,
        caml_bytes_set,
        caml_bytes_set64,
        caml_bytes_set32,
        caml_bytes_set16,
        caml_string_set,
        caml_bytes_get,
        caml_bytes_get64,
        caml_string_get64,
        caml_bytes_get32,
        caml_string_get32,
        caml_bytes_get16,
        caml_string_get16,
        caml_string_get,
        caml_bytes_bound_error,
        caml_string_bound_error,
        caml_bytes_unsafe_set,
        caml_bytes_unsafe_get,
        jsoo_is_ascii,
        caml_utf16_of_utf8,
        caml_utf8_of_utf16,
        caml_sub_uint8_array_to_jsbytes,
        caml_subarray_to_jsbytes,
        caml_str_repeat,
        caml_md5_bytes,
        caml_MD5Final,
        caml_MD5Update,
        caml_MD5Init,
        caml_MD5Transform,
        caml_md5_string,
        caml_md5_chan,
        caml_output_value_to_buffer,
        caml_output_value_to_bytes,
        caml_output_value_to_string,
        caml_output_val,
        MlObjectTable,
        caml_marshal_data_size,
        caml_marshal_header_size,
        caml_input_value_from_reader,
        caml_custom_ops,
        caml_nativeint_unmarshal,
        caml_int32_unmarshal,
        caml_int64_marshal,
        caml_int64_unmarshal,
        caml_input_value_from_bytes,
        caml_float_of_bytes,
        BigStringReader,
        MlStringReader,
        UInt8ArrayReader,
        caml_marshal_constants,
        caml_new_lex_engine,
        caml_lex_engine,
        caml_lex_array,
        caml_js_error_of_exception,
        caml_xmlhttprequest_create,
        caml_js_get_console,
        caml_js_html_entities,
        caml_js_html_escape,
        caml_js_object,
        caml_pure_js_expr,
        caml_js_expr,
        caml_js_eval_string,
        caml_js_strict_equals,
        caml_js_equals,
        caml_js_function_arity,
        caml_js_wrap_meth_callback_unsafe,
        caml_js_wrap_meth_callback_strict,
        caml_js_wrap_meth_callback_arguments,
        caml_js_wrap_meth_callback,
        caml_js_wrap_callback_unsafe,
        caml_js_wrap_callback_strict,
        caml_js_wrap_callback_arguments,
        caml_js_wrap_callback,
        caml_ojs_new_arr,
        caml_js_new,
        caml_js_meth_call,
        caml_js_fun_call,
        caml_js_call,
        caml_js_var,
        caml_list_to_js_array,
        caml_list_of_js_array,
        caml_js_to_array,
        caml_js_from_array,
        caml_js_to_int32,
        caml_js_to_float,
        caml_js_from_float,
        caml_js_to_bool,
        caml_js_from_bool,
        caml_js_error_option_of_exception,
        caml_exn_with_js_backtrace,
        caml_maybe_attach_backtrace,
        caml_wrap_exception,
        caml_jsoo_flags_effects,
        caml_jsoo_flags_use_js_string,
        caml_is_js,
        caml_callback,
        caml_trampoline_return,
        caml_trampoline,
        caml_js_typeof,
        caml_js_instanceof,
        caml_js_delete,
        caml_js_get,
        caml_js_set,
        caml_js_pure_expr,
        caml_ml_set_buffered,
        caml_ml_is_buffered,
        caml_ml_output_int,
        caml_ml_pos_out_64,
        caml_ml_pos_out,
        caml_pos_out,
        caml_ml_seek_out_64,
        caml_ml_seek_out,
        caml_seek_out,
        caml_output_value,
        caml_ml_output_char,
        caml_ml_output,
        caml_ml_output_bigarray,
        caml_ml_output_bytes,
        caml_ml_output_ta,
        caml_ml_flush,
        caml_ml_input_scan_line,
        caml_ml_pos_in_64,
        caml_ml_pos_in,
        caml_pos_in,
        caml_ml_seek_in_64,
        caml_ml_seek_in,
        caml_seek_in,
        caml_ml_input_int,
        caml_ml_input_char,
        caml_input_value_to_outside_heap,
        caml_input_value,
        caml_ml_input_block,
        caml_ml_input_bigarray,
        caml_ml_input,
        caml_refill,
        caml_ml_set_channel_refill,
        caml_ml_set_channel_output,
        caml_ml_channel_size_64,
        caml_ml_channel_size,
        caml_ml_close_channel,
        caml_ml_is_binary_mode,
        caml_ml_set_binary_mode,
        caml_channel_descriptor,
        caml_ml_open_descriptor_out_with_flags,
        caml_ml_open_descriptor_in_with_flags,
        caml_ml_open_descriptor_in,
        caml_ml_open_descriptor_out,
        caml_ml_out_channels_list,
        caml_ml_channel_restore,
        caml_ml_channel_redirect,
        caml_ml_channel_get,
        caml_ml_channels,
        caml_ml_set_channel_name,
        caml_sys_open,
        MlChanid,
        caml_sys_close,
        caml_sys_fds,
        caml_int64_bswap,
        caml_int32_bswap,
        caml_bswap16,
        caml_mod,
        caml_div,
        caml_mul,
        caml_int_of_string,
        caml_parse_digit,
        caml_parse_sign_and_base,
        caml_format_int,
        caml_int64_hash,
        caml_int64_to_bytes,
        caml_int64_of_bytes,
        caml_int64_hi32,
        caml_int64_lo32,
        caml_int64_create_lo_hi,
        caml_int64_create_lo_mi_hi,
        caml_int64_of_string,
        caml_int64_format,
        caml_int64_of_float,
        caml_int64_to_float,
        caml_int64_to_int32,
        caml_int64_of_int32,
        caml_int64_mod,
        caml_int64_div,
        caml_int64_shift_right,
        caml_int64_shift_right_unsigned,
        caml_int64_shift_left,
        caml_int64_xor,
        caml_int64_or,
        caml_int64_and,
        caml_int64_is_negative,
        caml_int64_is_zero,
        caml_int64_mul,
        caml_int64_sub,
        caml_int64_add,
        caml_int64_neg,
        caml_int64_compare,
        caml_int64_ult,
        MlInt64,
        caml_int64_offset,
        caml_float_of_string,
        caml_format_float,
        caml_fma_float,
        caml_erfc_float,
        caml_erf_float,
        caml_cbrt_float,
        caml_round_float,
        caml_atanh_float,
        caml_tanh_float,
        caml_asinh_float,
        caml_sinh_float,
        caml_acosh_float,
        caml_cosh_float,
        caml_log10_float,
        caml_hypot_float,
        caml_log2_float,
        caml_log1p_float,
        caml_exp2_float,
        caml_expm1_float,
        caml_signbit_float,
        caml_copysign_float,
        caml_float_compare,
        caml_frexp_float,
        caml_ldexp_float,
        caml_modf_float,
        caml_classify_float,
        caml_int32_float_of_bits,
        caml_trunc_float,
        caml_nextafter_float,
        caml_int64_float_of_bits,
        caml_hexstring_of_float,
        caml_int32_bits_of_float,
        caml_int64_bits_of_float,
        jsoo_floor_log2,
        caml_string_hash,
        caml_hash,
        caml_hash_mix_string,
        caml_hash_mix_bytes,
        caml_hash_mix_bytes_arr,
        caml_hash_mix_jsbytes,
        caml_hash_mix_int64,
        caml_hash_mix_float,
        caml_hash_mix_final,
        caml_hash_mix_int,
        caml_gr_close_subwindow,
        caml_gr_open_subwindow,
        caml_gr_window_id,
        caml_gr_display_mode,
        caml_gr_remember_mode,
        caml_gr_synchronize,
        caml_gr_wait_event,
        caml_gr_sigio_signal,
        caml_gr_sigio_handler,
        caml_gr_blit_image,
        caml_gr_create_image,
        caml_gr_draw_image,
        caml_gr_dump_image,
        caml_gr_make_image,
        caml_gr_text_size,
        caml_gr_set_text_size,
        caml_gr_set_font,
        caml_gr_draw_string,
        caml_gr_draw_char,
        caml_gr_draw_str,
        caml_gr_fill_arc,
        caml_gr_fill_poly,
        caml_gr_fill_rect,
        caml_gr_set_line_width,
        caml_gr_draw_arc,
        caml_gr_arc_aux,
        caml_gr_draw_rect,
        caml_gr_lineto,
        caml_gr_current_y,
        caml_gr_current_x,
        caml_gr_moveto,
        caml_gr_point_color,
        caml_gr_plot,
        caml_gr_set_color,
        caml_gr_size_y,
        caml_gr_size_x,
        caml_gr_clear_graph,
        caml_gr_resize_window,
        caml_gr_set_window_title,
        caml_gr_close_graph,
        caml_gr_doc_of_state,
        caml_gr_state_create,
        caml_gr_state_init,
        caml_gr_open_graph,
        caml_gr_state_set,
        caml_gr_state_get,
        caml_gr_state,
        caml_get_minor_free,
        caml_gc_minor_words,
        caml_gc_major_slice,
        caml_memprof_discard,
        caml_memprof_stop,
        caml_memprof_start,
        caml_final_release,
        caml_final_register_called_without_value,
        caml_final_register,
        caml_gc_get,
        caml_gc_set,
        caml_gc_stat,
        caml_gc_quick_stat,
        caml_gc_counters,
        caml_gc_compaction,
        caml_gc_full_major,
        caml_gc_major,
        caml_gc_minor,
        caml_raise_nodejs_error,
        caml_sys_open_for_node,
        MlNodeFd,
        fs_node_stats_from_js,
        MlNodeDevice,
        fs_node_supported,
        MlFakeFd,
        MlFakeFd_out,
        MlFakeFile,
        MlFakeDevice,
        caml_read_file_content,
        jsoo_create_file,
        caml_create_file,
        caml_fs_init,
        jsoo_create_file_extern,
        caml_ba_map_file_bytecode,
        caml_ba_map_file,
        caml_sys_rmdir,
        caml_sys_mkdir,
        caml_sys_rename,
        caml_sys_is_directory,
        caml_sys_remove,
        caml_sys_read_directory,
        caml_sys_file_exists,
        caml_raise_no_such_file,
        caml_sys_chdir,
        caml_sys_getcwd,
        caml_unmount,
        caml_mount_autoload,
        resolve_fs_device,
        caml_list_mount_point,
        jsoo_mount_point,
        caml_make_path,
        path_is_absolute,
        MlFile,
        caml_root,
        caml_get_root,
        caml_current_dir,
        caml_trailing_slash,
        caml_finish_formatting,
        caml_parse_format,
        caml_array_bound_error,
        caml_raise_not_found,
        caml_raise_zero_divide,
        caml_raise_end_of_file,
        caml_invalid_argument,
        caml_failwith,
        caml_raise_with_string,
        caml_raise_with_args,
        caml_raise_with_arg,
        caml_raise_constant,
        caml_lessthan,
        caml_lessequal,
        caml_greaterthan,
        caml_greaterequal,
        caml_notequal,
        caml_equal,
        caml_int_compare,
        caml_compare,
        caml_compare_val,
        caml_compare_val_number_custom,
        caml_compare_val_get_custom,
        caml_compare_val_tag,
        caml_bigstring_blit_ba_to_bytes,
        caml_bigstring_blit_bytes_to_ba,
        caml_bigstring_blit_string_to_ba,
        caml_bigstring_blit_ba_to_ba,
        caml_bigstring_memcmp,
        bigstring_of_typed_array,
        bigstring_of_array_buffer,
        bigstring_to_typed_array,
        bigstring_to_array_buffer,
        caml_hash_mix_bigstring,
        caml_ba_from_typed_array,
        caml_ba_kind_of_typed_array,
        caml_ba_to_typed_array,
        caml_hash_mix_float16,
        caml_ba_hash,
        caml_ba_create_from,
        caml_ba_deserialize,
        caml_ba_serialize,
        caml_ba_reshape,
        caml_ba_slice,
        caml_ba_sub,
        caml_ba_blit,
        caml_ba_fill,
        caml_ba_set_3,
        caml_ba_set_2,
        caml_ba_set_1,
        caml_ba_uint8_set64,
        caml_ba_uint8_set32,
        caml_ba_uint8_set16,
        caml_ba_set_generic,
        caml_ba_get_3,
        caml_ba_get_2,
        caml_ba_get_1,
        caml_ba_uint8_get64,
        caml_ba_uint8_get32,
        caml_ba_uint8_get16,
        caml_ba_get_generic,
        caml_ba_dim_3,
        caml_ba_dim_2,
        caml_ba_dim_1,
        caml_ba_dim,
        caml_ba_num_dims,
        caml_ba_layout,
        caml_ba_kind,
        caml_ba_change_layout,
        caml_ba_create,
        caml_ba_create_unsafe,
        caml_ba_compare,
        Ml_Bigarray_c_1_1,
        Ml_Bigarray,
        caml_ba_custom_name,
        caml_ba_create_buffer,
        caml_ba_get_size_per_element,
        caml_packFloat16,
        caml_unpackFloat16,
        caml_ba_get_size,
        caml_ba_init,
        caml_convert_raw_backtrace_slot,
        caml_get_current_callstack,
        caml_restore_raw_backtrace,
        caml_raw_backtrace_slot,
        caml_raw_backtrace_next_slot,
        caml_raw_backtrace_length,
        caml_convert_raw_backtrace,
        caml_record_backtrace,
        caml_get_exception_raw_backtrace,
        caml_get_exception_backtrace,
        caml_backtrace_status,
        caml_ml_debug_info_status,
        caml_record_backtrace_runtime_flag,
        caml_record_backtrace_env_flag,
        caml_uniform_array_make,
        caml_floatarray_make_unboxed,
        caml_floatarray_make,
        caml_floatarray_create,
        caml_array_create_float,
        caml_make_float_vect,
        caml_make_vect,
        caml_array_make,
        caml_check_bound,
        caml_uniform_array_fill,
        caml_floatarray_fill_unboxed,
        caml_floatarray_fill,
        caml_array_fill,
        caml_array_get,
        caml_array_set,
        caml_uniform_array_blit,
        caml_floatarray_blit,
        caml_array_blit,
        caml_array_concat,
        caml_uniform_array_append,
        caml_floatarray_append,
        caml_array_append,
        caml_uniform_array_sub,
        caml_floatarray_sub,
        caml_array_sub
      };
      var cst_Assert_failure = "Assert_failure", cst_Division_by_zero = "Division_by_zero", cst_End_of_file = "End_of_file", cst_Failure = "Failure", cst_Invalid_argument = "Invalid_argument", cst_Match_failure = "Match_failure", cst_Not_found = "Not_found", cst_Out_of_memory = "Out_of_memory", cst_Stack_overflow = "Stack_overflow", cst_Sys_blocked_io = "Sys_blocked_io", cst_Sys_error = "Sys_error", cst_Undefined_recursive_module = "Undefined_recursive_module";
      caml_fs_init();
      caml_register_global(0, [248, cst_Out_of_memory, -1], cst_Out_of_memory);
      caml_register_global(1, [248, cst_Sys_error, -2], cst_Sys_error);
      caml_register_global(2, [248, cst_Failure, -3], cst_Failure);
      caml_register_global(3, [248, cst_Invalid_argument, -4], cst_Invalid_argument);
      caml_register_global(4, [248, cst_End_of_file, -5], cst_End_of_file);
      caml_register_global(5, [248, cst_Division_by_zero, -6], cst_Division_by_zero);
      caml_register_global(6, [248, cst_Not_found, -7], cst_Not_found);
      caml_register_global(7, [248, cst_Match_failure, -8], cst_Match_failure);
      caml_register_global(8, [248, cst_Stack_overflow, -9], cst_Stack_overflow);
      caml_register_global(9, [248, cst_Sys_blocked_io, -10], cst_Sys_blocked_io);
      caml_register_global(10, [248, cst_Assert_failure, -11], cst_Assert_failure);
      caml_register_global(
        11,
        [248, cst_Undefined_recursive_module, -12],
        cst_Undefined_recursive_module
      );
      return;
    })(globalThis);
    (function(a) {
      "use strict";
      var a1 = "Stdlib__Obj", L = "Dune__exe__Lib_pyfinalo_js", u = "Stdlib__Gc", bd = "Stdlib__Random", t = 116, ac = "Js_of_ocaml__PerformanceObserver", aM = "Stdlib__Either", K = "Stdlib__Map", bc = "Js_of_ocaml__Intl", a0 = "Stdlib__Domain", bb = "Stdlib__Array", ab = "Assert_failure", s2 = "Stdlib__Lazy", a$ = "Js_of_ocaml__Lib_version", ba = "Jsoo_runtime__", J = "Stdlib__Format", az = "Stdlib__In_channel", a_ = "Stdlib__Dynarray", bu = "Js_of_ocaml__EventSource", aa = "Stdlib__BytesLabels", bt = "Stdlib__Bytes", I = "End_of_file", bs = "Stdlib__Condition", $ = "Stdlib__Marshal", a9 = "Js_of_ocaml__CSS", br = "Out_of_memory", Z = "Js_of_ocaml__Url", _ = "Lib_pyfinalo", aL = "Not_found", bq = "Failure", a8 = "Jsoo_runtime__Runtime_version", a7 = "Stdlib__String", bp = "Stdlib__Printf", ay = "Stdlib", aZ = "Stdlib__Callback", ax = "Stdlib__Filename", aY = "Stdlib__Hashtbl", a6 = "Js_of_ocaml__Geolocation", r = "Invalid_argument", bo = "Stdlib__Mutex", H = "Stdlib__Option", bn = "Stdlib__ListLabels", a5 = "Js_of_ocaml__Dom_html", Y = "Js_of_ocaml__Js", aW = "Js_of_ocaml__IntersectionObserver", aX = "Stdlib__MoreLabels", aw = "Js_of_ocaml", q = "Std_exit", aV = "Js_of_ocaml__Jstable", bl = "Match_failure", bm = "Stdlib__Semaphore", p = "Stdlib__StringLabels", aU = "Js_of_ocaml__File", aK = "Js_of_ocaml__Regexp", bk = 109, o = 112, a4 = "Stdlib__Complex", av = "Stdlib__Int64", a3 = "Stdlib__Sys", G = "Js_of_ocaml__Dom_svg", aJ = "CamlinternalLazy", n = "Stdlib__Scanf", X = "Js_of_ocaml__Worker", bj = "Stdlib__Digest", W = "Stdlib__Char", V = "Stdlib__Int32", F = "Sys_error", bi = "Stdlib__Type", au = 107, a2 = "Stdlib__Unit", E = "Js_of_ocaml__Console", bh = "Stdlib__Nativeint", bg = "Stdlib__Stack", D = "CamlinternalFormat", U = "Stack_overflow", aI = "Stdlib__ArrayLabels", aT = "Stdlib__Printexc", m = 108, C = "Js_of_ocaml__WebSockets", T = "Stdlib__Arg", aH = "Js_of_ocaml__", aS = "Js_of_ocaml__Form", S = "Js_of_ocaml__Dom_events", at = "Undefined_recursive_module", B = "Js_of_ocaml__ResizeObserver", R = "Lib_pyfinalo__Lang", ar = "CamlinternalFormatBasics", as = "Js_of_ocaml__WebGL", aq = "Stdlib__Queue", Q = "Lib_pyfinalo__Interp", l = "Stdlib__Bool", A = "Jsoo_runtime", aR = "Division_by_zero", k = "Js_of_ocaml__Dom", ap = "CamlinternalMod", ao = 114, an = "Stdlib__Parsing", aQ = "Stdlib__Weak", z = 110, am = 113, j = "Js_of_ocaml__Effect_js", al = "Stdlib__Effect", aP = 101, i = "Stdlib__Int", y = "Stdlib__StdLabels", bf = "Js_of_ocaml__Typed_array", h = "Stdlib__Oo", aj = "Stdlib__Bigarray", ak = "Stdlib__List", aG = "Stdlib__Ephemeron", ai = "Js_of_ocaml__MutationObserver", aO = 100, g = 106, ah = 111, aF = "Stdlib__Fun", f = 117, P = "Stdlib__Lexing", x2 = 102, ag = "Js_of_ocaml__Json", be = "Stdlib__Atomic", aE = "Stdlib__Result", e = "Js_of_ocaml__XmlHttpRequest", af = "Stdlib__Set", aD = "Stdlib__Buffer", aN = "Js_of_ocaml__Import", aC = "Stdlib__Out_channel", w = "Stdlib__Seq", d = 103, O = 115, ae = "Sys_blocked_io", N = "Stdlib__Float", ad = "Stdlib__Uchar", aB = 105, v = "CamlinternalOO", M = 104, aA = "Js_of_ocaml__Sys_js", c = a.jsoo_runtime, b = c.caml_get_global_data();
      b.prim_count = 875;
      b.symbols = [0, [0, at, 11], [0, F, 10], [0, ae, 9], [0, aQ, 61], [0, a2, 31], [0, ad, 26], [0, bi, 17], [0, a3, 15], [0, p, 75], [0, a7, 30], [0, y, 77], [0, bg, 42], [0, af, 40], [0, w, 21], [0, bm, 47], [0, n, 63], [0, aE, 23], [0, bd, 59], [0, aq, 43], [0, bp, 50], [0, aT, 52], [0, an, 39], [0, aC, 56], [0, H, 22], [0, h, 66], [0, a1, 16], [0, bh, 37], [0, bo, 45], [0, aX, 76], [0, $, 32], [0, K, 41], [0, bn, 73], [0, ak, 27], [0, P, 38], [0, s2, 20], [0, av, 36], [0, V, 35], [0, i, 28], [0, az, 55], [0, aY, 60], [0, u, 54], [0, aF, 53], [0, J, 62], [0, N, 34], [0, ax, 70], [0, aG, 69], [0, aM, 14], [0, al, 78], [0, a_, 68], [0, a0, 48], [0, bj, 57], [0, bs, 46], [0, a4, 71], [0, W, 25], [0, aZ, 64], [0, aa, 74], [0, bt, 29], [0, aD, 44], [0, l, 24], [0, aj, 58], [0, be, 18], [0, aI, 72], [0, bb, 33], [0, T, 51], [0, ay, 13], [0, q, f], [0, U, 8], [0, br, 7], [0, aL, 6], [0, bl, 5], [0, R, 80], [0, Q, 81], [0, _, 79], [0, a8, 83], [0, ba, 82], [0, A, 84], [0, e, 93], [0, X, 94], [0, C, 95], [0, as, 96], [0, Z, 98], [0, bf, 89], [0, aA, aO], [0, B, aP], [0, aK, 97], [0, ac, x2], [0, ai, d], [0, a$, 99], [0, aV, M], [0, ag, aB], [0, Y, 87], [0, bc, ao], [0, aW, am], [0, aN, 86], [0, a6, o], [0, aS, 92], [0, aU, 90], [0, bu, ah], [0, j, z], [0, G, bk], [0, a5, 91], [0, S, m], [0, k, 88], [0, E, au], [0, a9, g], [0, aH, 85], [0, aw, O], [0, r, 4], [0, bq, 3], [0, I, 2], [0, L, t], [0, aR, 1], [0, v, 65], [0, ap, 67], [0, aJ, 19], [0, ar, 12], [0, D, 49], [0, ab, 0]];
      var bv = [0, bu], bw = [0, a6], bx = [0, 0, [0, bc], ao, 0, 1], by = [0, aW], bz = [0, aV], bA = [0, 0, [0, ag], aB, 0, 1], bB = [0, ai], bC = [0, Z], bD = [0, q];
      b.sections = [0, [0, 118, [0, [0, [0, [0, [0, [0, [0, 0, [0, ab], 0, [0, 0, [0, D], 49, 0, 1], 2], [0, ar], 12, 0, 3], [0, aJ], 19, [0, [0, [0, 0, [0, ap], 67, 0, 1], [0, v], 65, 0, 2], [0, aR], 1, [0, [0, 0, [0, L], t, 0, 1], [0, I], 2, 0, 2], 3], 4], [0, bq], 3, [0, [0, [0, 0, [0, r], 4, [0, 0, [0, aw], O, 0, 1], 2], [0, aH], 85, [0, 0, [0, a9], g, [0, 0, [0, E], au, 0, 1], 2], 3], [0, k], 88, [0, [0, [0, 0, [0, S], m, 0, 1], [0, a5], 91, 0, 2], [0, G], bk, [0, [0, 0, [0, j], z, [0, 0, bv, ah, 0, 1], 2], [0, aU], 90, [0, 0, [0, aS], 92, [0, 0, bw, o, 0, 1], 2], 3], 4], 5], 6], [0, aN], 86, [0, [0, [0, [0, [0, [0, 0, by, am, bx, 2], [0, Y], 87, [0, bA, bz, M, 0, 2], 3], [0, a$], 99, [0, [0, 0, bB, d, 0, 1], [0, ac], x2, 0, 2], 4], [0, aK], 97, [0, [0, 0, [0, B], aP, 0, 1], [0, aA], aO, 0, 2], 5], [0, bf], 89, [0, [0, [0, [0, 0, bC, 98, 0, 1], [0, as], 96, 0, 2], [0, C], 95, 0, 3], [0, X], 94, [0, 0, [0, e], 93, 0, 1], 4], 6], [0, A], 84, [0, [0, 0, [0, ba], 82, [0, 0, [0, a8], 83, 0, 1], 2], [0, _], 79, [0, [0, [0, 0, [0, Q], 81, 0, 1], [0, R], 80, 0, 2], [0, bl], 5, [0, [0, 0, [0, aL], 6, 0, 1], [0, br], 7, [0, 0, [0, U], 8, [0, 0, bD, f, 0, 1], 2], 3], 4], 5], 7], 8], [0, ay], 13, [0, [0, [0, [0, 0, [0, T], 51, 0, 1], [0, bb], 33, [0, 0, [0, aI], 72, 0, 1], 2], [0, be], 18, [0, 0, [0, aj], 58, 0, 1], 3], [0, l], 24, [0, [0, [0, 0, [0, aD], 44, 0, 1], [0, bt], 29, [0, [0, 0, [0, aa], 74, 0, 1], [0, aZ], 64, 0, 2], 3], [0, W], 25, [0, [0, 0, [0, a4], 71, 0, 1], [0, bs], 46, [0, [0, 0, [0, bj], 57, 0, 1], [0, a0], 48, [0, 0, [0, a_], 68, [0, 0, [0, al], 78, 0, 1], 2], 3], 4], 5], 6], 9], [0, aM], 14, [0, [0, [0, [0, [0, [0, 0, [0, aG], 69, [0, 0, [0, ax], 70, 0, 1], 2], [0, N], 34, [0, 0, [0, J], 62, 0, 1], 3], [0, aF], 53, [0, 0, [0, u], 54, [0, [0, 0, [0, aY], 60, 0, 1], [0, az], 55, 0, 2], 3], 4], [0, i], 28, [0, 0, [0, V], 35, [0, 0, [0, av], 36, 0, 1], 2], 5], [0, s2], 20, [0, [0, [0, 0, [0, P], 38, 0, 1], [0, ak], 27, [0, [0, 0, [0, bn], 73, 0, 1], [0, K], 41, 0, 2], 3], [0, $], 32, [0, [0, [0, 0, [0, aX], 76, 0, 1], [0, bo], 45, 0, 2], [0, bh], 37, 0, 3], 4], 6], [0, a1], 16, [0, [0, [0, [0, [0, [0, 0, [0, h], 66, 0, 1], [0, H], 22, [0, 0, [0, aC], 56, 0, 1], 2], [0, an], 39, [0, [0, 0, [0, aT], 52, 0, 1], [0, bp], 50, 0, 2], 3], [0, aq], 43, [0, [0, 0, [0, bd], 59, 0, 1], [0, aE], 23, [0, [0, 0, [0, n], 63, 0, 1], [0, bm], 47, 0, 2], 3], 4], [0, w], 21, [0, [0, 0, [0, af], 40, [0, 0, [0, bg], 42, [0, 0, [0, y], 77, 0, 1], 2], 3], [0, a7], 30, [0, 0, [0, p], 75, 0, 1], 4], 5], [0, a3], 15, [0, [0, [0, 0, [0, bi], 17, 0, 1], [0, ad], 26, [0, 0, [0, a2], 31, [0, 0, [0, aQ], 61, 0, 1], 2], 3], [0, ae], 9, [0, 0, [0, F], 10, [0, 0, [0, at], 11, 0, 1], 2], 4], 6], 7], 10]], 0, c.caml_list_of_js_array(["%caml_format_int_special", "%direct_int_div", "%direct_int_mod", "%direct_int_mul", "%direct_obj_tag", "%identity", "%int_add", "%int_and", "%int_asr", "%int_div", "%int_lsl", "%int_lsr", "%int_mod", "%int_mul", "%int_neg", "%int_or", "%int_sub", "%int_xor", "BigStringReader", "MlBytes", "MlChanid", "MlFakeDevice", "MlFakeFd", "MlFakeFd_out", "MlFakeFile", "MlFile", "MlInt64", "MlMutex", "MlNat", "MlNodeDevice", "MlNodeFd", "MlObjectTable", "MlStringReader", "Ml_Bigarray", "Ml_Bigarray_c_1_1", "UInt8ArrayReader", "add_nat", "bigstring_of_array_buffer", "bigstring_of_typed_array", "bigstring_to_array_buffer", "bigstring_to_typed_array", "blake2b", "blit_nat", "caml_MD5Final", "caml_MD5Init", "caml_MD5Transform", "caml_MD5Update", "caml_abs_float", "caml_acos_float", "caml_acosh_float", "caml_add_float", "caml_alloc_dummy", "caml_alloc_dummy_float", "caml_alloc_dummy_infix", "caml_alloc_stack", "caml_argv", "caml_array_append", "caml_array_blit", "caml_array_bound_error", "caml_array_concat", "caml_array_create_float", "caml_array_fill", "caml_array_get", "caml_array_get_addr", "caml_array_get_float", "caml_array_make", "caml_array_of_bytes", "caml_array_of_string", "caml_array_of_uniform_array", "caml_array_set", "caml_array_set_addr", "caml_array_set_float", "caml_array_sub", "caml_array_unsafe_get", "caml_array_unsafe_get_float", "caml_array_unsafe_set", "caml_array_unsafe_set_addr", "caml_array_unsafe_set_float", "caml_asin_float", "caml_asinh_float", "caml_atan2_float", "caml_atan_float", "caml_atanh_float", "caml_atomic_cas", "caml_atomic_exchange", "caml_atomic_fetch_add", "caml_atomic_load", "caml_atomic_make_contended", "caml_ba_blit", "caml_ba_change_layout", "caml_ba_compare", "caml_ba_create", "caml_ba_create_buffer", "caml_ba_create_from", "caml_ba_create_unsafe", "caml_ba_custom_name", "caml_ba_deserialize", "caml_ba_dim", "caml_ba_dim_1", "caml_ba_dim_2", "caml_ba_dim_3", "caml_ba_fill", "caml_ba_from_typed_array", "caml_ba_get_1", "caml_ba_get_2", "caml_ba_get_3", "caml_ba_get_generic", "caml_ba_get_size", "caml_ba_get_size_per_element", "caml_ba_hash", "caml_ba_init", "caml_ba_kind", "caml_ba_kind_of_typed_array", "caml_ba_layout", "caml_ba_map_file", "caml_ba_map_file_bytecode", "caml_ba_num_dims", "caml_ba_reshape", "caml_ba_serialize", "caml_ba_set_1", "caml_ba_set_2", "caml_ba_set_3", "caml_ba_set_generic", "caml_ba_slice", "caml_ba_sub", "caml_ba_to_typed_array", "caml_ba_uint8_get16", "caml_ba_uint8_get32", "caml_ba_uint8_get64", "caml_ba_uint8_set16", "caml_ba_uint8_set32", "caml_ba_uint8_set64", "caml_backtrace_status", "caml_bigstring_blit_ba_to_ba", "caml_bigstring_blit_ba_to_bytes", "caml_bigstring_blit_bytes_to_ba", "caml_bigstring_blit_string_to_ba", "caml_bigstring_memcmp", "caml_blake2_bytes", "caml_blake2_create", "caml_blake2_final", "caml_blake2_string", "caml_blake2_update", "caml_blit_bytes", "caml_blit_string", "caml_bswap16", "caml_build_symbols", "caml_bytes_bound_error", "caml_bytes_compare", "caml_bytes_equal", "caml_bytes_get", "caml_bytes_get16", "caml_bytes_get32", "caml_bytes_get64", "caml_bytes_greaterequal", "caml_bytes_greaterthan", "caml_bytes_lessequal", "caml_bytes_lessthan", "caml_bytes_notequal", "caml_bytes_of_array", "caml_bytes_of_jsbytes", "caml_bytes_of_string", "caml_bytes_of_uint8_array", "caml_bytes_of_utf16_jsstring", "caml_bytes_set", "caml_bytes_set16", "caml_bytes_set32", "caml_bytes_set64", "caml_bytes_unsafe_get", "caml_bytes_unsafe_set", "caml_call_gen", "caml_callback", "caml_cbrt_float", "caml_ceil_float", "caml_channel_descriptor", "caml_check_bound", "caml_check_bound_float", "caml_check_bound_gen", "caml_classify_float", "caml_compare", "caml_compare_val", "caml_compare_val_get_custom", "caml_compare_val_number_custom", "caml_compare_val_tag", "caml_continuation_use_and_update_handler_noexc", "caml_continuation_use_noexc", "caml_convert_bytes_to_array", "caml_convert_raw_backtrace", "caml_convert_raw_backtrace_slot", "caml_convert_string_to_bytes", "caml_copysign_float", "caml_cos_float", "caml_cosh_float", "caml_create_bytes", "caml_create_file", "caml_create_string", "caml_current_dir", "caml_custom_event_index", "caml_custom_identifier", "caml_custom_ops", "caml_decompress_input", "caml_div", "caml_div_float", "caml_domain_dls", "caml_domain_dls_compare_and_set", "caml_domain_dls_get", "caml_domain_dls_set", "caml_domain_id", "caml_domain_spawn", "caml_ensure_stack_capacity", "caml_ephe_blit_data", "caml_ephe_blit_key", "caml_ephe_check_data", "caml_ephe_check_key", "caml_ephe_create", "caml_ephe_data_offset", "caml_ephe_get_data", "caml_ephe_get_data_copy", "caml_ephe_get_key", "caml_ephe_get_key_copy", "caml_ephe_key_offset", "caml_ephe_none", "caml_ephe_set_data", "caml_ephe_set_data_opt", "caml_ephe_set_key", "caml_ephe_unset_data", "caml_ephe_unset_key", "caml_eq_float", "caml_equal", "caml_erf_float", "caml_erfc_float", "caml_executable_name", "caml_exn_with_js_backtrace", "caml_exp2_float", "caml_exp_float", "caml_expm1_float", "caml_failwith", "caml_fatal_uncaught_exception", "caml_fill_bytes", "caml_final_register", "caml_final_register_called_without_value", "caml_final_release", "caml_finish_formatting", "caml_float_compare", "caml_float_of_bytes", "caml_float_of_int", "caml_float_of_string", "caml_floatarray_append", "caml_floatarray_blit", "caml_floatarray_create", "caml_floatarray_fill", "caml_floatarray_fill_unboxed", "caml_floatarray_get", "caml_floatarray_make", "caml_floatarray_make_unboxed", "caml_floatarray_set", "caml_floatarray_sub", "caml_floatarray_unsafe_get", "caml_floatarray_unsafe_set", "caml_floor_float", "caml_fma_float", "caml_fmod_float", "caml_format_exception", "caml_format_float", "caml_format_int", "caml_fresh_oo_id", "caml_frexp_float", "caml_fs_init", "caml_gc_compaction", "caml_gc_counters", "caml_gc_full_major", "caml_gc_get", "caml_gc_major", "caml_gc_major_slice", "caml_gc_minor", "caml_gc_minor_words", "caml_gc_quick_stat", "caml_gc_set", "caml_gc_stat", "caml_ge_float", "caml_get_continuation_callstack", "caml_get_current_callstack", "caml_get_exception_backtrace", "caml_get_exception_raw_backtrace", "caml_get_global_data", "caml_get_minor_free", "caml_get_public_method", "caml_get_root", "caml_global_data", "caml_gr_arc_aux", "caml_gr_blit_image", "caml_gr_clear_graph", "caml_gr_close_graph", "caml_gr_close_subwindow", "caml_gr_create_image", "caml_gr_current_x", "caml_gr_current_y", "caml_gr_display_mode", "caml_gr_doc_of_state", "caml_gr_draw_arc", "caml_gr_draw_char", "caml_gr_draw_image", "caml_gr_draw_rect", "caml_gr_draw_str", "caml_gr_draw_string", "caml_gr_dump_image", "caml_gr_fill_arc", "caml_gr_fill_poly", "caml_gr_fill_rect", "caml_gr_lineto", "caml_gr_make_image", "caml_gr_moveto", "caml_gr_open_graph", "caml_gr_open_subwindow", "caml_gr_plot", "caml_gr_point_color", "caml_gr_remember_mode", "caml_gr_resize_window", "caml_gr_set_color", "caml_gr_set_font", "caml_gr_set_line_width", "caml_gr_set_text_size", "caml_gr_set_window_title", "caml_gr_sigio_handler", "caml_gr_sigio_signal", "caml_gr_size_x", "caml_gr_size_y", "caml_gr_state", "caml_gr_state_create", "caml_gr_state_get", "caml_gr_state_init", "caml_gr_state_set", "caml_gr_synchronize", "caml_gr_text_size", "caml_gr_wait_event", "caml_gr_window_id", "caml_greaterequal", "caml_greaterthan", "caml_gt_float", "caml_hash", "caml_hash_mix_bigstring", "caml_hash_mix_bytes", "caml_hash_mix_bytes_arr", "caml_hash_mix_final", "caml_hash_mix_float", "caml_hash_mix_float16", "caml_hash_mix_int", "caml_hash_mix_int64", "caml_hash_mix_jsbytes", "caml_hash_mix_string", "caml_hash_nat", "caml_hexstring_of_float", "caml_hypot_float", "caml_input_value", "caml_input_value_from_bytes", "caml_input_value_from_reader", "caml_input_value_to_outside_heap", "caml_install_signal_handler", "caml_int32_add", "caml_int32_and", "caml_int32_bits_of_float", "caml_int32_bswap", "caml_int32_compare", "caml_int32_div", "caml_int32_float_of_bits", "caml_int32_format", "caml_int32_mod", "caml_int32_mul", "caml_int32_neg", "caml_int32_of_float", "caml_int32_of_int", "caml_int32_of_string", "caml_int32_or", "caml_int32_shift_left", "caml_int32_shift_right", "caml_int32_shift_right_unsigned", "caml_int32_sub", "caml_int32_to_float", "caml_int32_to_int", "caml_int32_unmarshal", "caml_int32_xor", "caml_int64_add", "caml_int64_and", "caml_int64_bits_of_float", "caml_int64_bswap", "caml_int64_compare", "caml_int64_create_lo_hi", "caml_int64_create_lo_mi_hi", "caml_int64_div", "caml_int64_float_of_bits", "caml_int64_format", "caml_int64_hash", "caml_int64_hi32", "caml_int64_is_negative", "caml_int64_is_zero", "caml_int64_lo32", "caml_int64_marshal", "caml_int64_mod", "caml_int64_mul", "caml_int64_neg", "caml_int64_of_bytes", "caml_int64_of_float", "caml_int64_of_int", "caml_int64_of_int32", "caml_int64_of_nativeint", "caml_int64_of_string", "caml_int64_offset", "caml_int64_or", "caml_int64_shift_left", "caml_int64_shift_right", "caml_int64_shift_right_unsigned", "caml_int64_sub", "caml_int64_to_bytes", "caml_int64_to_float", "caml_int64_to_int", "caml_int64_to_int32", "caml_int64_to_nativeint", "caml_int64_ult", "caml_int64_unmarshal", "caml_int64_xor", "caml_int_compare", "caml_int_of_float", "caml_int_of_string", "caml_invalid_argument", "caml_is_continuation_tag", "caml_is_js", "caml_is_ml_bytes", "caml_is_ml_string", "caml_is_printable", "caml_is_special_exception", "caml_js_call", "caml_js_delete", "caml_js_equals", "caml_js_error_of_exception", "caml_js_error_option_of_exception", "caml_js_eval_string", "caml_js_expr", "caml_js_from_array", "caml_js_from_bool", "caml_js_from_float", "caml_js_from_int32", "caml_js_from_nativeint", "caml_js_from_string", "caml_js_fun_call", "caml_js_function_arity", "caml_js_get", "caml_js_get_console", "caml_js_html_entities", "caml_js_html_escape", "caml_js_instanceof", "caml_js_meth_call", "caml_js_new", "caml_js_object", "caml_js_pure_expr", "caml_js_set", "caml_js_strict_equals", "caml_js_to_array", "caml_js_to_bool", "caml_js_to_byte_string", "caml_js_to_float", "caml_js_to_int32", "caml_js_to_nativeint", "caml_js_to_string", "caml_js_typeof", "caml_js_var", "caml_js_wrap_callback", "caml_js_wrap_callback_arguments", "caml_js_wrap_callback_strict", "caml_js_wrap_callback_unsafe", "caml_js_wrap_meth_callback", "caml_js_wrap_meth_callback_arguments", "caml_js_wrap_meth_callback_strict", "caml_js_wrap_meth_callback_unsafe", "caml_jsbytes_of_string", "caml_jsoo_flags_effects", "caml_jsoo_flags_use_js_string", "caml_jsstring_of_string", "caml_lazy_make_forward", "caml_lazy_read_result", "caml_lazy_reset_to_lazy", "caml_lazy_update_to_forcing", "caml_lazy_update_to_forward", "caml_ldexp_float", "caml_le_float", "caml_lessequal", "caml_lessthan", "caml_lex_array", "caml_lex_engine", "caml_list_mount_point", "caml_list_of_js_array", "caml_list_to_js_array", "caml_log10_float", "caml_log1p_float", "caml_log2_float", "caml_log_float", "caml_lt_float", "caml_lxm_M", "caml_lxm_daba", "caml_lxm_next", "caml_make_array", "caml_make_float_vect", "caml_make_path", "caml_make_vect", "caml_marshal_constants", "caml_marshal_data_size", "caml_marshal_header_size", "caml_maybe_attach_backtrace", "caml_maybe_print_stats", "caml_md5_bytes", "caml_md5_chan", "caml_md5_string", "caml_memprof_discard", "caml_memprof_start", "caml_memprof_stop", "caml_ml_bytes_content", "caml_ml_bytes_length", "caml_ml_channel_get", "caml_ml_channel_redirect", "caml_ml_channel_restore", "caml_ml_channel_size", "caml_ml_channel_size_64", "caml_ml_channels", "caml_ml_close_channel", "caml_ml_condition_broadcast", "caml_ml_condition_new", "caml_ml_condition_signal", "caml_ml_condition_wait", "caml_ml_debug_info_status", "caml_ml_domain_cpu_relax", "caml_ml_domain_id", "caml_ml_domain_index", "caml_ml_enable_runtime_warnings", "caml_ml_flush", "caml_ml_input", "caml_ml_input_bigarray", "caml_ml_input_block", "caml_ml_input_char", "caml_ml_input_int", "caml_ml_input_scan_line", "caml_ml_is_binary_mode", "caml_ml_is_buffered", "caml_ml_mutex_lock", "caml_ml_mutex_new", "caml_ml_mutex_try_lock", "caml_ml_mutex_unlock", "caml_ml_open_descriptor_in", "caml_ml_open_descriptor_in_with_flags", "caml_ml_open_descriptor_out", "caml_ml_open_descriptor_out_with_flags", "caml_ml_out_channels_list", "caml_ml_output", "caml_ml_output_bigarray", "caml_ml_output_bytes", "caml_ml_output_char", "caml_ml_output_int", "caml_ml_output_ta", "caml_ml_pos_in", "caml_ml_pos_in_64", "caml_ml_pos_out", "caml_ml_pos_out_64", "caml_ml_runtime_events_are_active", "caml_ml_runtime_events_path", "caml_ml_runtime_events_pause", "caml_ml_runtime_events_resume", "caml_ml_runtime_events_start", "caml_ml_runtime_warnings_enabled", "caml_ml_seek_in", "caml_ml_seek_in_64", "caml_ml_seek_out", "caml_ml_seek_out_64", "caml_ml_set_binary_mode", "caml_ml_set_buffered", "caml_ml_set_channel_name", "caml_ml_set_channel_output", "caml_ml_set_channel_refill", "caml_ml_string_length", "caml_mod", "caml_modf_float", "caml_mount_autoload", "caml_mul", "caml_mul_float", "caml_named_value", "caml_named_values", "caml_nativeint_add", "caml_nativeint_and", "caml_nativeint_bswap", "caml_nativeint_compare", "caml_nativeint_div", "caml_nativeint_format", "caml_nativeint_mod", "caml_nativeint_mul", "caml_nativeint_neg", "caml_nativeint_of_float", "caml_nativeint_of_int", "caml_nativeint_of_int32", "caml_nativeint_of_string", "caml_nativeint_or", "caml_nativeint_shift_left", "caml_nativeint_shift_right", "caml_nativeint_shift_right_unsigned", "caml_nativeint_sub", "caml_nativeint_to_float", "caml_nativeint_to_int", "caml_nativeint_to_int32", "caml_nativeint_unmarshal", "caml_nativeint_xor", "caml_neg_float", "caml_neq_float", "caml_new_lex_engine", "caml_new_string", "caml_nextafter_float", "caml_notequal", "caml_obj_add_offset", "caml_obj_block", "caml_obj_compare_and_swap", "caml_obj_dup", "caml_obj_is_shared", "caml_obj_raw_field", "caml_obj_reachable_words", "caml_obj_set_raw_field", "caml_obj_tag", "caml_obj_update_tag", "caml_obj_with_tag", "caml_ojs_new_arr", "caml_oo_last_id", "caml_output_val", "caml_output_value", "caml_output_value_to_buffer", "caml_output_value_to_bytes", "caml_output_value_to_string", "caml_packFloat16", "caml_parse_digit", "caml_parse_engine", "caml_parse_format", "caml_parse_sign_and_base", "caml_parser_trace", "caml_pos_in", "caml_pos_out", "caml_power_float", "caml_process_pending_actions_with_root", "caml_pure_js_expr", "caml_raise_constant", "caml_raise_end_of_file", "caml_raise_no_such_file", "caml_raise_nodejs_error", "caml_raise_not_found", "caml_raise_sys_error", "caml_raise_system_error", "caml_raise_with_arg", "caml_raise_with_args", "caml_raise_with_string", "caml_raise_zero_divide", "caml_raw_backtrace_length", "caml_raw_backtrace_next_slot", "caml_raw_backtrace_slot", "caml_read_file_content", "caml_recommended_domain_count", "caml_record_backtrace", "caml_record_backtrace_env_flag", "caml_record_backtrace_runtime_flag", "caml_refill", "caml_register_global", "caml_register_named_value", "caml_restore_raw_backtrace", "caml_root", "caml_round_float", "caml_runtime_events_create_cursor", "caml_runtime_events_free_cursor", "caml_runtime_events_read_poll", "caml_runtime_events_user_register", "caml_runtime_events_user_resolve", "caml_runtime_events_user_write", "caml_runtime_parameters", "caml_runtime_variant", "caml_runtime_warnings", "caml_seek_in", "caml_seek_out", "caml_set_oo_id", "caml_set_parser_trace", "caml_set_static_env", "caml_signbit_float", "caml_sin_float", "caml_sinh_float", "caml_sqrt_float", "caml_str_repeat", "caml_string_bound_error", "caml_string_compare", "caml_string_concat", "caml_string_equal", "caml_string_get", "caml_string_get16", "caml_string_get32", "caml_string_get64", "caml_string_greaterequal", "caml_string_greaterthan", "caml_string_hash", "caml_string_lessequal", "caml_string_lessthan", "caml_string_notequal", "caml_string_of_array", "caml_string_of_bytes", "caml_string_of_jsbytes", "caml_string_of_jsstring", "caml_string_of_uint8_array", "caml_string_set", "caml_string_unsafe_get", "caml_sub_float", "caml_sub_uint8_array_to_jsbytes", "caml_subarray_to_jsbytes", "caml_sys_argv", "caml_sys_chdir", "caml_sys_close", "caml_sys_const_backend_type", "caml_sys_const_big_endian", "caml_sys_const_int_size", "caml_sys_const_max_wosize", "caml_sys_const_naked_pointers_checked", "caml_sys_const_ostype_cygwin", "caml_sys_const_ostype_unix", "caml_sys_const_ostype_win32", "caml_sys_const_word_size", "caml_sys_executable_name", "caml_sys_exit", "caml_sys_fds", "caml_sys_file_exists", "caml_sys_get_argv", "caml_sys_get_config", "caml_sys_getcwd", "caml_sys_getenv", "caml_sys_is_directory", "caml_sys_is_regular_file", "caml_sys_isatty", "caml_sys_mkdir", "caml_sys_modify_argv", "caml_sys_open", "caml_sys_open_for_node", "caml_sys_random_seed", "caml_sys_read_directory", "caml_sys_remove", "caml_sys_rename", "caml_sys_rmdir", "caml_sys_system_command", "caml_sys_time", "caml_sys_time_include_children", "caml_sys_unsafe_getenv", "caml_tan_float", "caml_tanh_float", "caml_to_js_string", "caml_trailing_slash", "caml_trampoline", "caml_trampoline_return", "caml_trunc_float", "caml_uint8_array_of_bytes", "caml_uint8_array_of_string", "caml_uniform_array_append", "caml_uniform_array_blit", "caml_uniform_array_fill", "caml_uniform_array_make", "caml_uniform_array_sub", "caml_unix_cleanup", "caml_unix_close", "caml_unix_closedir", "caml_unix_filedescr_of_fd", "caml_unix_findclose", "caml_unix_findfirst", "caml_unix_findnext", "caml_unix_fstat", "caml_unix_fstat_64", "caml_unix_ftruncate", "caml_unix_ftruncate_64", "caml_unix_getpwuid", "caml_unix_gettimeofday", "caml_unix_getuid", "caml_unix_gmtime", "caml_unix_has_symlink", "caml_unix_inchannel_of_filedescr", "caml_unix_inet_addr_of_string", "caml_unix_isatty", "caml_unix_localtime", "caml_unix_lookup_file", "caml_unix_lseek", "caml_unix_lseek_64", "caml_unix_lstat", "caml_unix_lstat_64", "caml_unix_mkdir", "caml_unix_mktime", "caml_unix_open", "caml_unix_opendir", "caml_unix_outchannel_of_filedescr", "caml_unix_read", "caml_unix_read_bigarray", "caml_unix_readdir", "caml_unix_readlink", "caml_unix_rename", "caml_unix_rewinddir", "caml_unix_rmdir", "caml_unix_startup", "caml_unix_stat", "caml_unix_stat_64", "caml_unix_symlink", "caml_unix_time", "caml_unix_truncate", "caml_unix_truncate_64", "caml_unix_unlink", "caml_unix_utimes", "caml_unix_write", "caml_unix_write_bigarray", "caml_unmount", "caml_unpackFloat16", "caml_update_dummy", "caml_utf16_of_utf8", "caml_utf8_of_utf16", "caml_weak_create", "caml_weak_set", "caml_wrap_exception", "caml_xdg_defaults", "caml_xmlhttprequest_create", "caml_zstd_initialize", "compare_digits_nat", "compare_nat", "complement_nat", "create_nat", "decr_nat", "deserialize_nat", "div_digit_nat", "div_helper", "div_nat", "fs_node_stats_from_js", "fs_node_supported", "incr_nat", "initialize_nat", "is_digit_int", "is_digit_normalized", "is_digit_odd", "is_digit_zero", "jsoo_create_file", "jsoo_create_file_extern", "jsoo_effect_not_supported", "jsoo_floor_log2", "jsoo_is_ascii", "jsoo_mount_point", "jsoo_static_env", "jsoo_sys_getenv", "jsoo_toplevel_reloc", "land_digit_nat", "length_nat", "lor_digit_nat", "lxor_digit_nat", "make_unix_err_args", "mult_digit_nat", "mult_nat", "nat_of_array", "nth_digit_nat", "nth_digit_nat_native", "num_digits_nat", "num_leading_zero_bits_in_digit", "os_type", "path_is_absolute", "re_match", "re_partial_match", "re_replacement_text", "re_search_backward", "re_search_forward", "re_string_match", "resolve_fs_device", "serialize_nat", "set_digit_nat", "set_digit_nat_native", "set_to_zero_nat", "shift_left_nat", "shift_right_nat", "square_nat", "sub_nat", "unix_error", "zstd_decompress"]), 0];
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime;
      function erase_rel(param) {
        if (typeof param === "number") return 0;
        switch (param[0]) {
          case 0:
            var rest = param[1];
            return [0, erase_rel(rest)];
          case 1:
            var rest$0 = param[1];
            return [1, erase_rel(rest$0)];
          case 2:
            var rest$1 = param[1];
            return [2, erase_rel(rest$1)];
          case 3:
            var rest$2 = param[1];
            return [3, erase_rel(rest$2)];
          case 4:
            var rest$3 = param[1];
            return [4, erase_rel(rest$3)];
          case 5:
            var rest$4 = param[1];
            return [5, erase_rel(rest$4)];
          case 6:
            var rest$5 = param[1];
            return [6, erase_rel(rest$5)];
          case 7:
            var rest$6 = param[1];
            return [7, erase_rel(rest$6)];
          case 8:
            var rest$7 = param[2], ty = param[1];
            return [8, ty, erase_rel(rest$7)];
          case 9:
            var rest$8 = param[3], ty1 = param[1];
            return [9, ty1, ty1, erase_rel(rest$8)];
          case 10:
            var rest$9 = param[1];
            return [10, erase_rel(rest$9)];
          case 11:
            var rest$10 = param[1];
            return [11, erase_rel(rest$10)];
          case 12:
            var rest$11 = param[1];
            return [12, erase_rel(rest$11)];
          case 13:
            var rest$12 = param[1];
            return [13, erase_rel(rest$12)];
          default:
            var rest$13 = param[1];
            return [14, erase_rel(rest$13)];
        }
      }
      function concat_fmtty(fmtty1, fmtty2) {
        if (typeof fmtty1 === "number") return fmtty2;
        switch (fmtty1[0]) {
          case 0:
            var rest = fmtty1[1];
            return [0, concat_fmtty(rest, fmtty2)];
          case 1:
            var rest$0 = fmtty1[1];
            return [1, concat_fmtty(rest$0, fmtty2)];
          case 2:
            var rest$1 = fmtty1[1];
            return [2, concat_fmtty(rest$1, fmtty2)];
          case 3:
            var rest$2 = fmtty1[1];
            return [3, concat_fmtty(rest$2, fmtty2)];
          case 4:
            var rest$3 = fmtty1[1];
            return [4, concat_fmtty(rest$3, fmtty2)];
          case 5:
            var rest$4 = fmtty1[1];
            return [5, concat_fmtty(rest$4, fmtty2)];
          case 6:
            var rest$5 = fmtty1[1];
            return [6, concat_fmtty(rest$5, fmtty2)];
          case 7:
            var rest$6 = fmtty1[1];
            return [7, concat_fmtty(rest$6, fmtty2)];
          case 8:
            var rest$7 = fmtty1[2], ty = fmtty1[1];
            return [8, ty, concat_fmtty(rest$7, fmtty2)];
          case 9:
            var rest$8 = fmtty1[3], ty2 = fmtty1[2], ty1 = fmtty1[1];
            return [9, ty1, ty2, concat_fmtty(rest$8, fmtty2)];
          case 10:
            var rest$9 = fmtty1[1];
            return [10, concat_fmtty(rest$9, fmtty2)];
          case 11:
            var rest$10 = fmtty1[1];
            return [11, concat_fmtty(rest$10, fmtty2)];
          case 12:
            var rest$11 = fmtty1[1];
            return [12, concat_fmtty(rest$11, fmtty2)];
          case 13:
            var rest$12 = fmtty1[1];
            return [13, concat_fmtty(rest$12, fmtty2)];
          default:
            var rest$13 = fmtty1[1];
            return [14, concat_fmtty(rest$13, fmtty2)];
        }
      }
      function concat_fmt(fmt1, fmt2) {
        if (typeof fmt1 === "number") return fmt2;
        switch (fmt1[0]) {
          case 0:
            var rest = fmt1[1];
            return [0, concat_fmt(rest, fmt2)];
          case 1:
            var rest$0 = fmt1[1];
            return [1, concat_fmt(rest$0, fmt2)];
          case 2:
            var rest$1 = fmt1[2], pad = fmt1[1];
            return [2, pad, concat_fmt(rest$1, fmt2)];
          case 3:
            var rest$2 = fmt1[2], pad$0 = fmt1[1];
            return [3, pad$0, concat_fmt(rest$2, fmt2)];
          case 4:
            var rest$3 = fmt1[4], prec = fmt1[3], pad$1 = fmt1[2], iconv = fmt1[1];
            return [4, iconv, pad$1, prec, concat_fmt(rest$3, fmt2)];
          case 5:
            var rest$4 = fmt1[4], prec$0 = fmt1[3], pad$2 = fmt1[2], iconv$0 = fmt1[1];
            return [5, iconv$0, pad$2, prec$0, concat_fmt(rest$4, fmt2)];
          case 6:
            var rest$5 = fmt1[4], prec$1 = fmt1[3], pad$3 = fmt1[2], iconv$1 = fmt1[1];
            return [6, iconv$1, pad$3, prec$1, concat_fmt(rest$5, fmt2)];
          case 7:
            var rest$6 = fmt1[4], prec$2 = fmt1[3], pad$4 = fmt1[2], iconv$2 = fmt1[1];
            return [7, iconv$2, pad$4, prec$2, concat_fmt(rest$6, fmt2)];
          case 8:
            var rest$7 = fmt1[4], prec$3 = fmt1[3], pad$5 = fmt1[2], fconv = fmt1[1];
            return [8, fconv, pad$5, prec$3, concat_fmt(rest$7, fmt2)];
          case 9:
            var rest$8 = fmt1[2], pad$6 = fmt1[1];
            return [9, pad$6, concat_fmt(rest$8, fmt2)];
          case 10:
            var rest$9 = fmt1[1];
            return [10, concat_fmt(rest$9, fmt2)];
          case 11:
            var rest$10 = fmt1[2], str = fmt1[1];
            return [11, str, concat_fmt(rest$10, fmt2)];
          case 12:
            var rest$11 = fmt1[2], chr = fmt1[1];
            return [12, chr, concat_fmt(rest$11, fmt2)];
          case 13:
            var rest$12 = fmt1[3], fmtty = fmt1[2], pad$7 = fmt1[1];
            return [13, pad$7, fmtty, concat_fmt(rest$12, fmt2)];
          case 14:
            var rest$13 = fmt1[3], fmtty$0 = fmt1[2], pad$8 = fmt1[1];
            return [14, pad$8, fmtty$0, concat_fmt(rest$13, fmt2)];
          case 15:
            var rest$14 = fmt1[1];
            return [15, concat_fmt(rest$14, fmt2)];
          case 16:
            var rest$15 = fmt1[1];
            return [16, concat_fmt(rest$15, fmt2)];
          case 17:
            var rest$16 = fmt1[2], fmting_lit = fmt1[1];
            return [17, fmting_lit, concat_fmt(rest$16, fmt2)];
          case 18:
            var rest$17 = fmt1[2], fmting_gen = fmt1[1];
            return [18, fmting_gen, concat_fmt(rest$17, fmt2)];
          case 19:
            var rest$18 = fmt1[1];
            return [19, concat_fmt(rest$18, fmt2)];
          case 20:
            var rest$19 = fmt1[3], char_set = fmt1[2], width_opt = fmt1[1];
            return [20, width_opt, char_set, concat_fmt(rest$19, fmt2)];
          case 21:
            var rest$20 = fmt1[2], counter = fmt1[1];
            return [21, counter, concat_fmt(rest$20, fmt2)];
          case 22:
            var rest$21 = fmt1[1];
            return [22, concat_fmt(rest$21, fmt2)];
          case 23:
            var rest$22 = fmt1[2], ign = fmt1[1];
            return [23, ign, concat_fmt(rest$22, fmt2)];
          default:
            var rest$23 = fmt1[3], f = fmt1[2], arity = fmt1[1];
            return [24, arity, f, concat_fmt(rest$23, fmt2)];
        }
      }
      var CamlinternalFormatBasics = [0, concat_fmtty, erase_rel, concat_fmt];
      runtime.caml_register_global(0, CamlinternalFormatBasics, "CamlinternalFormatBasics");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_false$0 = "false", cst_true$0 = "true", caml_atomic_cas2 = runtime.caml_atomic_cas, caml_atomic_load2 = runtime.caml_atomic_load, caml_create_bytes2 = runtime.caml_create_bytes, caml_float_of_string2 = runtime.caml_float_of_string, caml_int64_float_of_bits2 = runtime.caml_int64_float_of_bits, caml_int_of_string2 = runtime.caml_int_of_string, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_bytes_length2 = runtime.caml_ml_bytes_length, caml_ml_channel_size2 = runtime.caml_ml_channel_size, caml_ml_channel_size_642 = runtime.caml_ml_channel_size_64, caml_ml_close_channel2 = runtime.caml_ml_close_channel, caml_ml_flush2 = runtime.caml_ml_flush, caml_ml_input2 = runtime.caml_ml_input, caml_ml_input_char2 = runtime.caml_ml_input_char, caml_ml_open_descriptor_in2 = runtime.caml_ml_open_descriptor_in, caml_ml_open_descriptor_out2 = runtime.caml_ml_open_descriptor_out, caml_ml_output2 = runtime.caml_ml_output, caml_ml_output_bytes2 = runtime.caml_ml_output_bytes, caml_ml_output_char2 = runtime.caml_ml_output_char, caml_ml_set_binary_mode2 = runtime.caml_ml_set_binary_mode, caml_ml_set_channel_name2 = runtime.caml_ml_set_channel_name, caml_ml_string_length2 = runtime.caml_ml_string_length, caml_string_concat2 = runtime.caml_string_concat, caml_string_of_bytes2 = runtime.caml_string_of_bytes, caml_sys_open2 = runtime.caml_sys_open, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      var global_data = runtime.caml_get_global_data(), CamlinternalFormatBasics = global_data.CamlinternalFormatBasics, Invalid_argument = global_data.Invalid_argument, Failure = global_data.Failure, Match_failure = global_data.Match_failure, Assert_failure = global_data.Assert_failure, Not_found = global_data.Not_found, Out_of_memory = global_data.Out_of_memory, Stack_overflow = global_data.Stack_overflow, Sys_error = global_data.Sys_error, End_of_file = global_data.End_of_file, Division_by_zero = global_data.Division_by_zero, Sys_blocked_io = global_data.Sys_blocked_io, Undefined_recursive_module = global_data.Undefined_recursive_module;
      function failwith(s2) {
        throw caml_maybe_attach_backtrace2([0, Failure, s2], 1);
      }
      function invalid_arg(s2) {
        throw caml_maybe_attach_backtrace2([0, Invalid_argument, s2], 1);
      }
      var Exit = [248, "Stdlib.Exit", runtime.caml_fresh_oo_id(0)];
      function min(x2, y) {
        return runtime.caml_lessequal(x2, y) ? x2 : y;
      }
      function max(x2, y) {
        return runtime.caml_greaterequal(x2, y) ? x2 : y;
      }
      function abs(x2) {
        return 0 <= x2 ? x2 : -x2 | 0;
      }
      function lnot(x2) {
        return x2 ^ -1;
      }
      var infinity = caml_int64_float_of_bits2(runtime.caml_int64_create_lo_mi_hi(0, 0, 32752)), neg_infinity = caml_int64_float_of_bits2(runtime.caml_int64_create_lo_mi_hi(0, 0, 65520)), nan = caml_int64_float_of_bits2(runtime.caml_int64_create_lo_mi_hi(1, 0, 32760)), max_float = caml_int64_float_of_bits2(runtime.caml_int64_create_lo_mi_hi(16777215, 16777215, 32751)), min_float = caml_int64_float_of_bits2(runtime.caml_int64_create_lo_mi_hi(0, 0, 16)), epsilon_float = caml_int64_float_of_bits2(runtime.caml_int64_create_lo_mi_hi(0, 0, 15536)), symbol_concat = caml_string_concat2, cst_char_of_int = "char_of_int", cst_true = cst_true$0, cst_false = cst_false$0, cst_bool_of_string = "bool_of_string", _a_ = [0, 1], _b_ = [0, 0];
      function char_of_int(n) {
        if (0 <= n && 255 >= n) return n;
        return invalid_arg(cst_char_of_int);
      }
      function string_of_bool(b) {
        return b ? cst_true : cst_false;
      }
      function bool_of_string(param) {
        return param !== cst_false$0 ? param !== cst_true$0 ? invalid_arg(cst_bool_of_string) : 1 : 0;
      }
      function bool_of_string_opt(param) {
        return param !== cst_false$0 ? param !== cst_true$0 ? 0 : _a_ : _b_;
      }
      function string_of_int(n) {
        return "" + n;
      }
      function int_of_string_opt(s2) {
        try {
          var _w_ = [0, caml_int_of_string2(s2)];
          return _w_;
        } catch (_x_) {
          var _v_ = caml_wrap_exception2(_x_);
          if (_v_[1] === Failure) return 0;
          throw caml_maybe_attach_backtrace2(_v_, 0);
        }
      }
      function valid_float_lexem(s1) {
        var l = caml_ml_string_length2(s1), i = 0;
        for (; ; ) {
          if (l <= i) return s1 + ".";
          var match = runtime.caml_string_get(s1, i);
          a: {
            if (48 <= match) {
              if (58 > match) break a;
            } else if (45 === match) break a;
            return s1;
          }
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function string_of_float(f) {
        return valid_float_lexem(runtime.caml_format_float("%.12g", f));
      }
      function float_of_string_opt(s2) {
        try {
          var _t_ = [0, caml_float_of_string2(s2)];
          return _t_;
        } catch (_u_) {
          var _s_ = caml_wrap_exception2(_u_);
          if (_s_[1] === Failure) return 0;
          throw caml_maybe_attach_backtrace2(_s_, 0);
        }
      }
      function symbol(l1, l2) {
        if (!l1) return l2;
        var _q_ = l1[2], h1 = l1[1];
        if (!_q_) return [0, h1, l2];
        var match = _q_[2], h2 = _q_[1];
        if (!match) return [0, h1, [0, h2, l2]];
        var tl = match[2], h3 = match[1], block = [0, h3, 24029], dst = block, offset = 1, l1$0 = tl;
        for (; ; ) {
          if (l1$0) {
            var _r_ = l1$0[2], h1$0 = l1$0[1];
            if (_r_) {
              var match$0 = _r_[2], h2$0 = _r_[1];
              if (match$0) {
                var tl$0 = match$0[2], h3$0 = match$0[1], dst$0 = [0, h3$0, 24029];
                dst[1 + offset] = [0, h1$0, [0, h2$0, dst$0]];
                dst = dst$0;
                offset = 1;
                l1$0 = tl$0;
                continue;
              }
              dst[1 + offset] = [0, h1$0, [0, h2$0, l2]];
            } else
              dst[1 + offset] = [0, h1$0, l2];
          } else
            dst[1 + offset] = l2;
          return [0, h1, [0, h2, block]];
        }
      }
      var stdin = caml_ml_open_descriptor_in2(0), stdout = caml_ml_open_descriptor_out2(1), stderr = caml_ml_open_descriptor_out2(2), _c_ = [0, 1, [0, 3, [0, 4, [0, 7, 0]]]], _d_ = [0, 1, [0, 3, [0, 4, [0, 6, 0]]]], cst_output = "output", cst_output_substring = "output_substring", _e_ = [0, 0, [0, 7, 0]], _f_ = [0, 0, [0, 6, 0]], cst_input = "input", cst_really_input = "really_input";
      function open_out_gen(mode, perm, name) {
        var c = caml_ml_open_descriptor_out2(caml_sys_open2(name, mode, perm));
        caml_ml_set_channel_name2(c, name);
        return c;
      }
      function open_out(name) {
        return open_out_gen(_c_, 438, name);
      }
      function open_out_bin(name) {
        return open_out_gen(_d_, 438, name);
      }
      function flush_all(param) {
        var param$0 = runtime.caml_ml_out_channels_list(0);
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], a = param$0[1];
          try {
            caml_ml_flush2(a);
          } catch (_p_) {
            var _o_ = caml_wrap_exception2(_p_);
            if (_o_[1] !== Sys_error) throw caml_maybe_attach_backtrace2(_o_, 0);
          }
          param$0 = l;
        }
      }
      function output_bytes(oc, s2) {
        return caml_ml_output_bytes2(oc, s2, 0, caml_ml_bytes_length2(s2));
      }
      function output_string(oc, s2) {
        return caml_ml_output2(oc, s2, 0, caml_ml_string_length2(s2));
      }
      function output(oc, s2, ofs, len) {
        if (0 <= ofs && 0 <= len && (caml_ml_bytes_length2(s2) - len | 0) >= ofs)
          return caml_ml_output_bytes2(oc, s2, ofs, len);
        return invalid_arg(cst_output);
      }
      function output_substring(oc, s2, ofs, len) {
        if (0 <= ofs && 0 <= len && (caml_ml_string_length2(s2) - len | 0) >= ofs)
          return caml_ml_output2(oc, s2, ofs, len);
        return invalid_arg(cst_output_substring);
      }
      function output_value(chan, v) {
        return runtime.caml_output_value(chan, v, 0);
      }
      function close_out(oc) {
        caml_ml_flush2(oc);
        return caml_ml_close_channel2(oc);
      }
      function close_out_noerr(oc) {
        try {
          caml_ml_flush2(oc);
        } catch (_n_) {
        }
        try {
          var _l_ = caml_ml_close_channel2(oc);
          return _l_;
        } catch (_m_) {
          return 0;
        }
      }
      function open_in_gen(mode, perm, name) {
        var c = caml_ml_open_descriptor_in2(caml_sys_open2(name, mode, perm));
        caml_ml_set_channel_name2(c, name);
        return c;
      }
      function open_in(name) {
        return open_in_gen(_e_, 0, name);
      }
      function open_in_bin(name) {
        return open_in_gen(_f_, 0, name);
      }
      function input(ic, s2, ofs, len) {
        if (0 <= ofs && 0 <= len && (caml_ml_bytes_length2(s2) - len | 0) >= ofs)
          return caml_ml_input2(ic, s2, ofs, len);
        return invalid_arg(cst_input);
      }
      function unsafe_really_input(ic, s2, ofs, len) {
        var ofs$0 = ofs, len$0 = len;
        for (; ; ) {
          if (0 >= len$0) return 0;
          var r = caml_ml_input2(ic, s2, ofs$0, len$0);
          if (0 === r) throw caml_maybe_attach_backtrace2(End_of_file, 1);
          var len$1 = len$0 - r | 0, ofs$1 = ofs$0 + r | 0;
          ofs$0 = ofs$1;
          len$0 = len$1;
        }
      }
      function really_input(ic, s2, ofs, len) {
        if (0 <= ofs && 0 <= len && (caml_ml_bytes_length2(s2) - len | 0) >= ofs)
          return unsafe_really_input(ic, s2, ofs, len);
        return invalid_arg(cst_really_input);
      }
      function really_input_string(ic, len) {
        var s2 = caml_create_bytes2(len);
        really_input(ic, s2, 0, len);
        return caml_string_of_bytes2(s2);
      }
      function input_line(chan) {
        function build_result(buf, pos, param) {
          var pos$0 = pos, param$0 = param;
          for (; ; ) {
            if (!param$0) return buf;
            var tl = param$0[2], hd = param$0[1], len2 = caml_ml_bytes_length2(hd);
            runtime.caml_blit_bytes(hd, 0, buf, pos$0 - len2 | 0, len2);
            var pos$1 = pos$0 - len2 | 0;
            pos$0 = pos$1;
            param$0 = tl;
          }
        }
        var accu = 0, len = 0;
        for (; ; ) {
          var n = runtime.caml_ml_input_scan_line(chan);
          if (0 === n) {
            if (!accu) throw caml_maybe_attach_backtrace2(End_of_file, 1);
            var _k_ = build_result(caml_create_bytes2(len), len, accu);
          } else {
            if (0 >= n) {
              var beg = caml_create_bytes2(-n | 0);
              caml_ml_input2(chan, beg, 0, -n | 0);
              var len$1 = len - n | 0, accu$0 = [0, beg, accu];
              accu = accu$0;
              len = len$1;
              continue;
            }
            var res = caml_create_bytes2(n - 1 | 0);
            caml_ml_input2(chan, res, 0, n - 1 | 0);
            caml_ml_input_char2(chan);
            if (accu)
              var len$0 = (len + n | 0) - 1 | 0, _k_ = build_result(caml_create_bytes2(len$0), len$0, [0, res, accu]);
            else
              var _k_ = res;
          }
          return caml_string_of_bytes2(_k_);
        }
      }
      function close_in_noerr(ic) {
        try {
          var _i_ = caml_ml_close_channel2(ic);
          return _i_;
        } catch (_j_) {
          return 0;
        }
      }
      function print_char(c) {
        return caml_ml_output_char2(stdout, c);
      }
      function print_string(s2) {
        return output_string(stdout, s2);
      }
      function print_bytes(s2) {
        return output_bytes(stdout, s2);
      }
      function print_int(i) {
        return output_string(stdout, "" + i);
      }
      function print_float(f) {
        return output_string(stdout, string_of_float(f));
      }
      function print_endline(s2) {
        output_string(stdout, s2);
        caml_ml_output_char2(stdout, 10);
        return caml_ml_flush2(stdout);
      }
      function print_newline(param) {
        caml_ml_output_char2(stdout, 10);
        return caml_ml_flush2(stdout);
      }
      function prerr_char(c) {
        return caml_ml_output_char2(stderr, c);
      }
      function prerr_string(s2) {
        return output_string(stderr, s2);
      }
      function prerr_bytes(s2) {
        return output_bytes(stderr, s2);
      }
      function prerr_int(i) {
        return output_string(stderr, "" + i);
      }
      function prerr_float(f) {
        return output_string(stderr, string_of_float(f));
      }
      function prerr_endline(s2) {
        output_string(stderr, s2);
        caml_ml_output_char2(stderr, 10);
        return caml_ml_flush2(stderr);
      }
      function prerr_newline(param) {
        caml_ml_output_char2(stderr, 10);
        return caml_ml_flush2(stderr);
      }
      function read_line(param) {
        caml_ml_flush2(stdout);
        return input_line(stdin);
      }
      function read_int(param) {
        return caml_int_of_string2(read_line(0));
      }
      function read_int_opt(param) {
        return int_of_string_opt(read_line(0));
      }
      function read_float(param) {
        return caml_float_of_string2(read_line(0));
      }
      function read_float_opt(param) {
        return float_of_string_opt(read_line(0));
      }
      function string_of_format(param) {
        var str = param[2];
        return str;
      }
      function symbol$0(_h_, param) {
        var str2 = param[2], fmt2 = param[1], str1 = _h_[2], fmt1 = _h_[1], s2 = "%," + str2;
        return [0, caml_call2(CamlinternalFormatBasics[3], fmt1, fmt2), str1 + s2];
      }
      var exit_function = [0, flush_all];
      function at_exit(f) {
        for (; ; ) {
          var f_yet_to_run = [0, 1], old_exit = caml_atomic_load2(exit_function);
          let f_yet_to_run$0 = f_yet_to_run, old_exit$0 = old_exit;
          var new_exit = function(param) {
            if (caml_atomic_cas2(f_yet_to_run$0, 1, 0)) caml_call1(f, 0);
            return caml_call1(old_exit$0, 0);
          }, success = caml_atomic_cas2(exit_function, old_exit, new_exit), _g_ = 1 - success;
          if (!_g_) return _g_;
        }
      }
      var do_domain_local_at_exit = [0, function(param) {
        return 0;
      }];
      function do_at_exit(param) {
        caml_call1(do_domain_local_at_exit[1], 0);
        return caml_call1(caml_atomic_load2(exit_function), 0);
      }
      function exit(retcode) {
        do_at_exit(0);
        return runtime.caml_sys_exit(retcode);
      }
      runtime.caml_register_named_value("Pervasives.do_at_exit", do_at_exit);
      var Stdlib = [
        0,
        invalid_arg,
        failwith,
        Exit,
        Match_failure,
        Assert_failure,
        Invalid_argument,
        Failure,
        Not_found,
        Out_of_memory,
        Stack_overflow,
        Sys_error,
        End_of_file,
        Division_by_zero,
        Sys_blocked_io,
        Undefined_recursive_module,
        min,
        max,
        abs,
        2147483647,
        -2147483648,
        lnot,
        infinity,
        neg_infinity,
        nan,
        max_float,
        min_float,
        epsilon_float,
        symbol_concat,
        char_of_int,
        string_of_bool,
        bool_of_string_opt,
        bool_of_string,
        string_of_int,
        int_of_string_opt,
        string_of_float,
        float_of_string_opt,
        symbol,
        stdin,
        stdout,
        stderr,
        print_char,
        print_string,
        print_bytes,
        print_int,
        print_float,
        print_endline,
        print_newline,
        prerr_char,
        prerr_string,
        prerr_bytes,
        prerr_int,
        prerr_float,
        prerr_endline,
        prerr_newline,
        read_line,
        read_int_opt,
        read_int,
        read_float_opt,
        read_float,
        open_out,
        open_out_bin,
        open_out_gen,
        caml_ml_flush2,
        flush_all,
        caml_ml_output_char2,
        output_string,
        output_bytes,
        output,
        output_substring,
        caml_ml_output_char2,
        runtime.caml_ml_output_int,
        output_value,
        runtime.caml_ml_seek_out,
        runtime.caml_ml_pos_out,
        caml_ml_channel_size2,
        close_out,
        close_out_noerr,
        caml_ml_set_binary_mode2,
        open_in,
        open_in_bin,
        open_in_gen,
        caml_ml_input_char2,
        input_line,
        input,
        really_input,
        really_input_string,
        caml_ml_input_char2,
        runtime.caml_ml_input_int,
        runtime.caml_input_value,
        runtime.caml_ml_seek_in,
        runtime.caml_ml_pos_in,
        caml_ml_channel_size2,
        caml_ml_close_channel2,
        close_in_noerr,
        caml_ml_set_binary_mode2,
        [
          0,
          runtime.caml_ml_seek_out_64,
          runtime.caml_ml_pos_out_64,
          caml_ml_channel_size_642,
          runtime.caml_ml_seek_in_64,
          runtime.caml_ml_pos_in_64,
          caml_ml_channel_size_642
        ],
        string_of_format,
        symbol$0,
        exit,
        at_exit,
        valid_float_lexem,
        unsafe_really_input,
        do_at_exit,
        do_domain_local_at_exit
      ];
      runtime.caml_register_global(45, Stdlib, "Stdlib");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_wrap_exception2 = runtime.caml_wrap_exception, global_data = runtime.caml_get_global_data(), ocaml_version = "5.3.0", ocaml_release = [0, 5, 3, 0, 0], Stdlib = global_data.Stdlib, executable_name = runtime.caml_sys_executable_name(0), os_type2 = runtime.caml_sys_get_config(0)[1], backend_type = [0, "js_of_ocaml"], unix = runtime.caml_sys_const_ostype_unix(0), win32 = runtime.caml_sys_const_ostype_win32(0), cygwin = runtime.caml_sys_const_ostype_cygwin(0), max_array_length = runtime.caml_sys_const_max_wosize(0), max_floatarray_length = max_array_length / 2 | 0, max_string_length = (4 * max_array_length | 0) - 1 | 0;
      function getenv_opt(s2) {
        try {
          var _d_ = [0, runtime.caml_sys_getenv(s2)];
          return _d_;
        } catch (_e_) {
          var _c_ = caml_wrap_exception2(_e_);
          if (_c_ === Stdlib[8]) return 0;
          throw caml_maybe_attach_backtrace2(_c_, 0);
        }
      }
      var interactive = [0, 0];
      function set_signal(sig_num, sig_beh) {
        return 0;
      }
      var Break = [248, "Stdlib.Sys.Break", runtime.caml_fresh_oo_id(0)];
      function catch_break(on) {
        return on ? 0 : 0;
      }
      function Make(_b_, _a_) {
        return [0, 1];
      }
      var Immediate64 = [0, Make], Stdlib_Sys = [
        0,
        executable_name,
        getenv_opt,
        interactive,
        os_type2,
        backend_type,
        unix,
        win32,
        cygwin,
        32,
        32,
        0,
        max_string_length,
        max_array_length,
        max_floatarray_length,
        set_signal,
        -1,
        -2,
        -3,
        -4,
        -5,
        -6,
        -7,
        -8,
        -9,
        -10,
        -11,
        -12,
        -13,
        -14,
        -15,
        -16,
        -17,
        -18,
        -19,
        -20,
        -21,
        -22,
        -23,
        -24,
        -25,
        -26,
        -27,
        -28,
        Break,
        catch_break,
        ocaml_version,
        0,
        ocaml_release,
        runtime.caml_ml_enable_runtime_warnings,
        runtime.caml_ml_runtime_warnings_enabled,
        Immediate64
      ];
      runtime.caml_register_global(4, Stdlib_Sys, "Stdlib__Sys");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_Obj_extension_constructor$1 = "Obj.extension_constructor", caml_check_bound2 = runtime.caml_check_bound, caml_obj_tag2 = runtime.caml_obj_tag;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib = global_data.Stdlib, Stdlib_Sys = global_data.Stdlib__Sys;
      function is_block(a) {
        return 1 - (typeof a === "number" ? 1 : 0);
      }
      function double_field(x2, i) {
        return caml_check_bound2(x2, i)[1 + i];
      }
      function set_double_field(x2, i, v) {
        caml_check_bound2(x2, i)[1 + i] = v;
        return 0;
      }
      var cst_Obj_extension_constructor = cst_Obj_extension_constructor$1, cst_Obj_extension_constructor$0 = cst_Obj_extension_constructor$1;
      function of_val(x2) {
        a: {
          if (is_block(x2) && caml_obj_tag2(x2) !== 248 && 1 <= x2.length - 1) {
            var slot = x2[1];
            break a;
          }
          var slot = x2;
        }
        a: {
          if (is_block(slot) && caml_obj_tag2(slot) === 248) {
            var name2 = slot[1];
            break a;
          }
          var name2 = caml_call1(Stdlib[1], cst_Obj_extension_constructor$0);
        }
        return caml_obj_tag2(name2) === 252 ? slot : caml_call1(Stdlib[1], cst_Obj_extension_constructor);
      }
      function name(slot) {
        return slot[1];
      }
      function id(slot) {
        return slot[2];
      }
      var Extension_constructor = [0, of_val, name, id], max_ephe_length = Stdlib_Sys[13] - 2 | 0, cst_Obj_Ephemeron_create = "Obj.Ephemeron.create", cst_Obj_Ephemeron_get_key = "Obj.Ephemeron.get_key", cst_Obj_Ephemeron_get_key_copy = "Obj.Ephemeron.get_key_copy", cst_Obj_Ephemeron_set_key = "Obj.Ephemeron.set_key", cst_Obj_Ephemeron_unset_key = "Obj.Ephemeron.unset_key", cst_Obj_Ephemeron_check_key = "Obj.Ephemeron.check_key", cst_Obj_Ephemeron_blit_key = "Obj.Ephemeron.blit_key";
      function create(l) {
        var _f_ = 0 <= l ? 1 : 0, _g_ = _f_ ? l <= max_ephe_length ? 1 : 0 : _f_;
        if (1 - _g_) caml_call1(Stdlib[1], cst_Obj_Ephemeron_create);
        return runtime.caml_ephe_create(l);
      }
      function length(x2) {
        return x2.length - 3 | 0;
      }
      function raise_if_invalid_offset(e, o, msg) {
        var _c_ = 0 <= o ? 1 : 0, _d_ = _c_ ? o < length(e) ? 1 : 0 : _c_, _e_ = 1 - _d_;
        return _e_ ? caml_call1(Stdlib[1], msg) : _e_;
      }
      function get_key(e, o) {
        raise_if_invalid_offset(e, o, cst_Obj_Ephemeron_get_key);
        return runtime.caml_ephe_get_key(e, o);
      }
      function get_key_copy(e, o) {
        raise_if_invalid_offset(e, o, cst_Obj_Ephemeron_get_key_copy);
        return runtime.caml_ephe_get_key_copy(e, o);
      }
      function set_key(e, o, x2) {
        raise_if_invalid_offset(e, o, cst_Obj_Ephemeron_set_key);
        return runtime.caml_ephe_set_key(e, o, x2);
      }
      function unset_key(e, o) {
        raise_if_invalid_offset(e, o, cst_Obj_Ephemeron_unset_key);
        return runtime.caml_ephe_unset_key(e, o);
      }
      function check_key(e, o) {
        raise_if_invalid_offset(e, o, cst_Obj_Ephemeron_check_key);
        return runtime.caml_ephe_check_key(e, o);
      }
      function blit_key(e1, o1, e2, o2, l) {
        if (0 <= l && 0 <= o1 && (length(e1) - l | 0) >= o1 && 0 <= o2 && (length(e2) - l | 0) >= o2) {
          var _a_ = 0 !== l ? 1 : 0, _b_ = _a_ ? runtime.caml_ephe_blit_key(e1, o1, e2, o2, l) : _a_;
          return _b_;
        }
        return caml_call1(Stdlib[1], cst_Obj_Ephemeron_blit_key);
      }
      var Stdlib_Obj = [
        0,
        is_block,
        double_field,
        set_double_field,
        0,
        243,
        244,
        245,
        246,
        247,
        248,
        249,
        250,
        251,
        251,
        252,
        253,
        254,
        255,
        1e3,
        1001,
        1002,
        Extension_constructor,
        [
          0,
          create,
          length,
          get_key,
          get_key_copy,
          set_key,
          unset_key,
          check_key,
          blit_key,
          runtime.caml_ephe_get_data,
          runtime.caml_ephe_get_data_copy,
          runtime.caml_ephe_set_data,
          runtime.caml_ephe_unset_data,
          runtime.caml_ephe_check_data,
          runtime.caml_ephe_blit_data,
          max_ephe_length
        ]
      ];
      runtime.caml_register_global(11, Stdlib_Obj, "Stdlib__Obj");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_atomic_exchange2 = runtime.caml_atomic_exchange, caml_atomic_fetch_add2 = runtime.caml_atomic_fetch_add;
      function set(r, x2) {
        caml_atomic_exchange2(r, x2);
        return 0;
      }
      function incr(r) {
        caml_atomic_fetch_add2(r, 1);
        return 0;
      }
      function decr(r) {
        caml_atomic_fetch_add2(r, -1);
        return 0;
      }
      var Stdlib_Atomic = [
        0,
        function(_a_) {
          return [0, _a_];
        },
        runtime.caml_atomic_make_contended,
        runtime.caml_atomic_load,
        set,
        caml_atomic_exchange2,
        runtime.caml_atomic_cas,
        caml_atomic_fetch_add2,
        incr,
        decr
      ];
      runtime.caml_register_global(0, Stdlib_Atomic, "Stdlib__Atomic");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_lazy_update_to_forward2 = runtime.caml_lazy_update_to_forward, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib_Obj = global_data.Stdlib__Obj, Undefined = [248, "CamlinternalLazy.Undefined", runtime.caml_fresh_oo_id(0)];
      function force_gen_lazy_block(only_val, blk) {
        if (0 !== runtime.caml_lazy_update_to_forcing(blk))
          throw caml_maybe_attach_backtrace2(Undefined, 1);
        if (only_val) {
          var closure$0 = blk[1];
          blk[1] = 0;
          var result$0 = caml_call1(closure$0, 0);
          blk[1] = result$0;
          caml_lazy_update_to_forward2(blk);
          return result$0;
        }
        var closure = blk[1];
        blk[1] = 0;
        try {
          var result = caml_call1(closure, 0);
          blk[1] = result;
          caml_lazy_update_to_forward2(blk);
          return result;
        } catch (e$0) {
          var e = caml_wrap_exception2(e$0);
          blk[1] = function(param) {
            throw caml_maybe_attach_backtrace2(e, 0);
          };
          runtime.caml_lazy_reset_to_lazy(blk);
          throw caml_maybe_attach_backtrace2(e, 0);
        }
      }
      function force_lazy_block(blk) {
        return force_gen_lazy_block(0, blk);
      }
      function force_gen(only_val, lzv) {
        var t = runtime.caml_obj_tag(lzv);
        if (t === Stdlib_Obj[12]) return lzv[1];
        if (t === Stdlib_Obj[6]) throw caml_maybe_attach_backtrace2(Undefined, 1);
        return t !== Stdlib_Obj[8] ? lzv : force_gen_lazy_block(only_val, lzv);
      }
      var CamlinternalLazy = [0, Undefined, force_lazy_block, force_gen];
      runtime.caml_register_global(2, CamlinternalLazy, "CamlinternalLazy");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_obj_tag2 = runtime.caml_obj_tag;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      var global_data = runtime.caml_get_global_data(), CamlinternalLazy = global_data.CamlinternalLazy, Stdlib_Obj = global_data.Stdlib__Obj, Undefined = CamlinternalLazy[1];
      function force_val(l) {
        return caml_call2(CamlinternalLazy[3], 1, l);
      }
      function from_fun(f) {
        var x2 = runtime.caml_obj_block(Stdlib_Obj[8], 1);
        x2[1] = f;
        return x2;
      }
      function from_val(v) {
        var t = caml_obj_tag2(v);
        if (t !== Stdlib_Obj[12] && t !== Stdlib_Obj[8] && t !== Stdlib_Obj[6] && t !== Stdlib_Obj[16])
          return v;
        return runtime.caml_lazy_make_forward(v);
      }
      function is_val(l) {
        var _i_ = Stdlib_Obj[8];
        return caml_obj_tag2(l) !== _i_ ? 1 : 0;
      }
      function map(f, x2) {
        return [
          246,
          function(_f_) {
            var _g_ = caml_obj_tag2(x2);
            a:
              if (250 === _g_)
                var _h_ = x2[1];
              else {
                if (246 !== _g_ && 244 !== _g_) {
                  var _h_ = x2;
                  break a;
                }
                var _h_ = caml_call1(CamlinternalLazy[2], x2);
              }
            return caml_call1(f, _h_);
          }
        ];
      }
      function map_val(f, x2) {
        if (!is_val(x2))
          return [
            246,
            function(_c_) {
              var _d_ = caml_obj_tag2(x2);
              a:
                if (250 === _d_)
                  var _e_ = x2[1];
                else {
                  if (246 !== _d_ && 244 !== _d_) {
                    var _e_ = x2;
                    break a;
                  }
                  var _e_ = caml_call1(CamlinternalLazy[2], x2);
                }
              return caml_call1(f, _e_);
            }
          ];
        var _a_ = caml_obj_tag2(x2);
        a:
          if (250 === _a_)
            var _b_ = x2[1];
          else {
            if (246 !== _a_ && 244 !== _a_) {
              var _b_ = x2;
              break a;
            }
            var _b_ = caml_call1(CamlinternalLazy[2], x2);
          }
        return from_val(caml_call1(f, _b_));
      }
      var Stdlib_Lazy = [0, Undefined, map, is_val, from_val, map_val, from_fun, force_val];
      runtime.caml_register_global(2, Stdlib_Lazy, "Stdlib__Lazy");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), Assert_failure = global_data.Assert_failure, Stdlib_Atomic = global_data.Stdlib__Atomic, CamlinternalLazy = global_data.CamlinternalLazy, Stdlib = global_data.Stdlib, Stdlib_Lazy = global_data.Stdlib__Lazy, cst_Seq_init = "Seq.init", cst_Seq_take = "Seq.take", cst_Seq_drop = "Seq.drop";
      function empty(param) {
        return 0;
      }
      function return$0(x2, param) {
        return [0, x2, empty];
      }
      function cons(x2, next, param) {
        return [0, x2, next];
      }
      function append(seq1, seq2, param) {
        var match = caml_call1(seq1, 0);
        if (!match) return caml_call1(seq2, 0);
        var next = match[2], x2 = match[1];
        return [0, x2, function(_au_) {
          return append(next, seq2, _au_);
        }];
      }
      function map(f, seq, param) {
        var match = caml_call1(seq, 0);
        if (!match) return 0;
        var next = match[2], x2 = match[1];
        return [0, caml_call1(f, x2), function(_at_) {
          return map(f, next, _at_);
        }];
      }
      function filter_map(f, seq, param) {
        var seq$0 = seq;
        for (; ; ) {
          var match = caml_call1(seq$0, 0);
          if (!match) return 0;
          var next = match[2], x2 = match[1], match$0 = caml_call1(f, x2);
          if (match$0) {
            var y = match$0[1];
            return [0, y, function(_as_) {
              return filter_map(f, next, _as_);
            }];
          }
          seq$0 = next;
        }
      }
      function filter(f, seq, param) {
        var seq$0 = seq;
        for (; ; ) {
          var match = caml_call1(seq$0, 0);
          if (!match) return 0;
          var next = match[2], x2 = match[1];
          if (caml_call1(f, x2))
            return [0, x2, function(_ar_) {
              return filter(f, next, _ar_);
            }];
          seq$0 = next;
        }
      }
      function concat(seq, param) {
        var match = caml_call1(seq, 0);
        if (!match) return 0;
        var next = match[2], x2 = match[1];
        return append(x2, function(_aq_) {
          return concat(next, _aq_);
        }, 0);
      }
      function flat_map(f, seq, param) {
        var match = caml_call1(seq, 0);
        if (!match) return 0;
        var next = match[2], x2 = match[1];
        return append(
          caml_call1(f, x2),
          function(_ap_) {
            return flat_map(f, next, _ap_);
          },
          0
        );
      }
      function fold_left(f, acc, seq) {
        var acc$0 = acc, seq$0 = seq;
        for (; ; ) {
          var match = caml_call1(seq$0, 0);
          if (!match) return acc$0;
          var next = match[2], x2 = match[1], acc$1 = caml_call2(f, acc$0, x2);
          acc$0 = acc$1;
          seq$0 = next;
        }
      }
      function iter(f, seq) {
        var seq$0 = seq;
        for (; ; ) {
          var match = caml_call1(seq$0, 0);
          if (!match) return 0;
          var next = match[2], x2 = match[1];
          caml_call1(f, x2);
          seq$0 = next;
        }
      }
      function unfold(f, u, param) {
        var match = caml_call1(f, u);
        if (!match) return 0;
        var match$0 = match[1], u$0 = match$0[2], x2 = match$0[1];
        return [0, x2, function(_ao_) {
          return unfold(f, u$0, _ao_);
        }];
      }
      function is_empty(xs) {
        return caml_call1(xs, 0) ? 0 : 1;
      }
      function uncons(xs) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1];
        return [0, [0, x2, xs$0]];
      }
      function length(xs$1) {
        var accu = 0, xs = xs$1;
        for (; ; ) {
          var match = caml_call1(xs, 0);
          if (!match) return accu;
          var xs$0 = match[2], accu$0 = accu + 1 | 0;
          accu = accu$0;
          xs = xs$0;
        }
      }
      function iteri(f, xs$1) {
        var i = 0, xs = xs$1;
        for (; ; ) {
          var match = caml_call1(xs, 0);
          if (!match) return 0;
          var xs$0 = match[2], x2 = match[1];
          caml_call2(f, i, x2);
          var i$0 = i + 1 | 0;
          i = i$0;
          xs = xs$0;
        }
      }
      function fold_lefti(f, accu$1, xs$1) {
        var accu = accu$1, i = 0, xs = xs$1;
        for (; ; ) {
          var match = caml_call1(xs, 0);
          if (!match) return accu;
          var xs$0 = match[2], x2 = match[1], accu$0 = caml_call3(f, accu, i, x2), i$0 = i + 1 | 0;
          accu = accu$0;
          i = i$0;
          xs = xs$0;
        }
      }
      function for_all(p, xs) {
        var xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 1;
          var xs$1 = match[2], x2 = match[1], _an_ = caml_call1(p, x2);
          if (!_an_) return _an_;
          xs$0 = xs$1;
        }
      }
      function exists(p, xs) {
        var xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1], _am_ = caml_call1(p, x2);
          if (_am_) return _am_;
          xs$0 = xs$1;
        }
      }
      function find(p, xs) {
        var xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1];
          if (caml_call1(p, x2)) return [0, x2];
          xs$0 = xs$1;
        }
      }
      function find_index(p, xs) {
        var i = 0, xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1];
          if (caml_call1(p, x2)) return [0, i];
          var i$0 = i + 1 | 0;
          i = i$0;
          xs$0 = xs$1;
        }
      }
      function find_map(f, xs) {
        var xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1], result = caml_call1(f, x2);
          if (result) return result;
          xs$0 = xs$1;
        }
      }
      function find_mapi(f, xs) {
        var i = 0, xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1], result = caml_call2(f, i, x2);
          if (result) return result;
          var i$0 = i + 1 | 0;
          i = i$0;
          xs$0 = xs$1;
        }
      }
      function iter2(f, xs, ys) {
        var xs$0 = xs, ys$0 = ys;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1], match$0 = caml_call1(ys$0, 0);
          if (!match$0) return 0;
          var ys$1 = match$0[2], y = match$0[1];
          caml_call2(f, x2, y);
          xs$0 = xs$1;
          ys$0 = ys$1;
        }
      }
      function fold_left2(f, accu, xs, ys) {
        var accu$0 = accu, xs$0 = xs, ys$0 = ys;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return accu$0;
          var xs$1 = match[2], x2 = match[1], match$0 = caml_call1(ys$0, 0);
          if (!match$0) return accu$0;
          var ys$1 = match$0[2], y = match$0[1], accu$1 = caml_call3(f, accu$0, x2, y);
          accu$0 = accu$1;
          xs$0 = xs$1;
          ys$0 = ys$1;
        }
      }
      function for_all2(f, xs, ys) {
        var xs$0 = xs, ys$0 = ys;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 1;
          var xs$1 = match[2], x2 = match[1], match$0 = caml_call1(ys$0, 0);
          if (!match$0) return 1;
          var ys$1 = match$0[2], y = match$0[1], _al_ = caml_call2(f, x2, y);
          if (!_al_) return _al_;
          xs$0 = xs$1;
          ys$0 = ys$1;
        }
      }
      function exists2(f, xs, ys) {
        var xs$0 = xs, ys$0 = ys;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1], match$0 = caml_call1(ys$0, 0);
          if (!match$0) return 0;
          var ys$1 = match$0[2], y = match$0[1], _ak_ = caml_call2(f, x2, y);
          if (_ak_) return _ak_;
          xs$0 = xs$1;
          ys$0 = ys$1;
        }
      }
      function equal(eq, xs, ys) {
        var xs$0 = xs, ys$0 = ys;
        for (; ; ) {
          var match = caml_call1(xs$0, 0), match$0 = caml_call1(ys$0, 0);
          if (match) {
            if (match$0) {
              var ys$1 = match$0[2], y = match$0[1], xs$1 = match[2], x2 = match[1], _aj_ = caml_call2(eq, x2, y);
              if (!_aj_) return _aj_;
              xs$0 = xs$1;
              ys$0 = ys$1;
              continue;
            }
          } else if (!match$0) return 1;
          return 0;
        }
      }
      function compare(cmp, xs, ys) {
        var xs$0 = xs, ys$0 = ys;
        for (; ; ) {
          var match = caml_call1(xs$0, 0), match$0 = caml_call1(ys$0, 0);
          if (!match) return match$0 ? -1 : 0;
          var xs$1 = match[2], x2 = match[1];
          if (!match$0) return 1;
          var ys$1 = match$0[2], y = match$0[1], c = caml_call2(cmp, x2, y);
          if (0 !== c) return c;
          xs$0 = xs$1;
          ys$0 = ys$1;
        }
      }
      function init_aux(f, i, j, param) {
        if (i >= j) return 0;
        var _ah_ = i + 1 | 0;
        return [
          0,
          caml_call1(f, i),
          function(_ai_) {
            return init_aux(f, _ah_, j, _ai_);
          }
        ];
      }
      function init(n, f) {
        if (0 > n) return caml_call1(Stdlib[1], cst_Seq_init);
        var _af_ = 0;
        return function(_ag_) {
          return init_aux(f, _af_, n, _ag_);
        };
      }
      function repeat(x2, param) {
        return [0, x2, function(_ae_) {
          return repeat(x2, _ae_);
        }];
      }
      function forever(f, param) {
        return [0, caml_call1(f, 0), function(_ad_) {
          return forever(f, _ad_);
        }];
      }
      function cycle_nonempty(xs, param) {
        return append(xs, function(_ac_) {
          return cycle_nonempty(xs, _ac_);
        }, 0);
      }
      function cycle(xs, param) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1];
        function _$_(_ab_) {
          return cycle_nonempty(xs, _ab_);
        }
        return [0, x2, function(_aa_) {
          return append(xs$0, _$_, _aa_);
        }];
      }
      function iterate1(f, x2, param) {
        var y = caml_call1(f, x2);
        return [0, y, function(___) {
          return iterate1(f, y, ___);
        }];
      }
      function iterate(f, x2) {
        function next(_Z_) {
          return iterate1(f, x2, _Z_);
        }
        return function(_Y_) {
          return [0, x2, next];
        };
      }
      function mapi_aux(f, i, xs, param) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1], _W_ = i + 1 | 0;
        return [
          0,
          caml_call2(f, i, x2),
          function(_X_) {
            return mapi_aux(f, _W_, xs$0, _X_);
          }
        ];
      }
      function mapi(f, xs) {
        var _U_ = 0;
        return function(_V_) {
          return mapi_aux(f, _U_, xs, _V_);
        };
      }
      function tail_scan(f, s2, xs, param) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1], s$0 = caml_call2(f, s2, x2);
        return [0, s$0, function(_T_2) {
          return tail_scan(f, s$0, xs$0, _T_2);
        }];
      }
      function scan(f, s2, xs) {
        function next(_S_) {
          return tail_scan(f, s2, xs, _S_);
        }
        return function(_R_) {
          return [0, s2, next];
        };
      }
      function take_aux(n, xs) {
        return 0 === n ? empty : function(param) {
          var match = caml_call1(xs, 0);
          if (!match) return 0;
          var xs$0 = match[2], x2 = match[1];
          return [0, x2, take_aux(n - 1 | 0, xs$0)];
        };
      }
      function take(n, xs) {
        if (n < 0) caml_call1(Stdlib[1], cst_Seq_take);
        return take_aux(n, xs);
      }
      function drop(n, xs) {
        return 0 <= n ? 0 === n ? xs : function(param) {
          var n$0 = n, xs$0 = xs;
          for (; ; ) {
            var match = caml_call1(xs$0, 0);
            if (!match) return 0;
            var xs$1 = match[2], n$1 = n$0 - 1 | 0;
            if (0 === n$1) return caml_call1(xs$1, 0);
            n$0 = n$1;
            xs$0 = xs$1;
          }
        } : caml_call1(Stdlib[1], cst_Seq_drop);
      }
      function take_while(p, xs, param) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1];
        return caml_call1(p, x2) ? [0, x2, function(_Q_) {
          return take_while(p, xs$0, _Q_);
        }] : 0;
      }
      function drop_while(p, xs, param) {
        var xs$0 = xs;
        for (; ; ) {
          var node = caml_call1(xs$0, 0);
          if (!node) return 0;
          var xs$1 = node[2], x2 = node[1];
          if (!caml_call1(p, x2)) return node;
          xs$0 = xs$1;
        }
      }
      function group(eq, xs, param) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1], _J_ = caml_call1(eq, x2);
        function _K_(_P_) {
          return drop_while(_J_, xs$0, _P_);
        }
        var _L_ = caml_call1(eq, x2);
        function next(_O_) {
          return take_while(_L_, xs$0, _O_);
        }
        return [
          0,
          function(_N_) {
            return [0, x2, next];
          },
          function(_M_) {
            return group(eq, _K_, _M_);
          }
        ];
      }
      var Forced_twice = [248, "Stdlib.Seq.Forced_twice", runtime.caml_fresh_oo_id(0)], to_lazy = Stdlib_Lazy[6], _a_ = [0, "seq.ml", 616, 4];
      function failure(param) {
        throw caml_maybe_attach_backtrace2(Forced_twice, 1);
      }
      function memoize(xs) {
        function s$0(param) {
          var match = caml_call1(xs, 0);
          if (!match) return 0;
          var xs$0 = match[2], x2 = match[1];
          return [0, x2, memoize(xs$0)];
        }
        var s2 = caml_call1(to_lazy, s$0);
        return function(param) {
          var _I_ = runtime.caml_obj_tag(s2);
          if (250 === _I_) return s2[1];
          if (246 !== _I_ && 244 !== _I_) return s2;
          return caml_call1(CamlinternalLazy[2], s2);
        };
      }
      function once(xs) {
        function f(param) {
          var match = caml_call1(xs, 0);
          if (!match) return 0;
          var xs$0 = match[2], x2 = match[1];
          return [0, x2, once(xs$0)];
        }
        var action = caml_call1(Stdlib_Atomic[1], f);
        return function(param) {
          var f2 = caml_call2(Stdlib_Atomic[5], action, failure);
          return caml_call1(f2, 0);
        };
      }
      function zip(xs, ys, param) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1], match$0 = caml_call1(ys, 0);
        if (!match$0) return 0;
        var ys$0 = match$0[2], y = match$0[1];
        return [0, [0, x2, y], function(_H_) {
          return zip(xs$0, ys$0, _H_);
        }];
      }
      function map2(f, xs, ys, param) {
        var match = caml_call1(xs, 0);
        if (!match) return 0;
        var xs$0 = match[2], x2 = match[1], match$0 = caml_call1(ys, 0);
        if (!match$0) return 0;
        var ys$0 = match$0[2], y = match$0[1];
        return [
          0,
          caml_call2(f, x2, y),
          function(_G_) {
            return map2(f, xs$0, ys$0, _G_);
          }
        ];
      }
      function interleave(xs, ys, param) {
        var match = caml_call1(xs, 0);
        if (!match) return caml_call1(ys, 0);
        var xs$0 = match[2], x2 = match[1];
        return [0, x2, function(_F_) {
          return interleave(ys, xs$0, _F_);
        }];
      }
      function sorted_merge1(cmp, x2, xs, y, ys) {
        return 0 < caml_call2(cmp, x2, y) ? [
          0,
          y,
          function(_D_) {
            var match = caml_call1(ys, 0);
            if (!match) return [0, x2, xs];
            var ys$0 = match[2], y2 = match[1];
            return sorted_merge1(cmp, x2, xs, y2, ys$0);
          }
        ] : [
          0,
          x2,
          function(_E_) {
            var match = caml_call1(xs, 0);
            if (!match) return [0, y, ys];
            var xs$0 = match[2], x3 = match[1];
            return sorted_merge1(cmp, x3, xs$0, y, ys);
          }
        ];
      }
      function sorted_merge(cmp, xs, ys, param) {
        var match = caml_call1(xs, 0), match$0 = caml_call1(ys, 0);
        if (match) {
          if (match$0) {
            var ys$0 = match$0[2], y = match$0[1], xs$0 = match[2], x2 = match[1];
            return sorted_merge1(cmp, x2, xs$0, y, ys$0);
          }
          var c = match;
        } else {
          if (!match$0) return 0;
          var c = match$0;
        }
        return c;
      }
      function map_fst(xys, param) {
        var match = caml_call1(xys, 0);
        if (!match) return 0;
        var xys$0 = match[2], x2 = match[1][1];
        return [0, x2, function(_C_) {
          return map_fst(xys$0, _C_);
        }];
      }
      function map_snd(xys, param) {
        var match = caml_call1(xys, 0);
        if (!match) return 0;
        var xys$0 = match[2], y = match[1][2];
        return [0, y, function(_B_) {
          return map_snd(xys$0, _B_);
        }];
      }
      function unzip(xys) {
        return [
          0,
          function(_A_) {
            return map_fst(xys, _A_);
          },
          function(_z_) {
            return map_snd(xys, _z_);
          }
        ];
      }
      function filter_map_find_left_map(f, xs, param) {
        var xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1], match$0 = caml_call1(f, x2);
          if (0 === match$0[0]) {
            var y = match$0[1];
            return [
              0,
              y,
              function(_y_) {
                return filter_map_find_left_map(f, xs$1, _y_);
              }
            ];
          }
          xs$0 = xs$1;
        }
      }
      function filter_map_find_right_map(f, xs, param) {
        var xs$0 = xs;
        for (; ; ) {
          var match = caml_call1(xs$0, 0);
          if (!match) return 0;
          var xs$1 = match[2], x2 = match[1], match$0 = caml_call1(f, x2);
          if (0 !== match$0[0]) {
            var z = match$0[1];
            return [
              0,
              z,
              function(_x_) {
                return filter_map_find_right_map(f, xs$1, _x_);
              }
            ];
          }
          xs$0 = xs$1;
        }
      }
      function partition_map(f, xs) {
        return [
          0,
          function(_w_) {
            return filter_map_find_left_map(f, xs, _w_);
          },
          function(_v_) {
            return filter_map_find_right_map(f, xs, _v_);
          }
        ];
      }
      function partition(p, xs) {
        function _s_(x2) {
          return 1 - caml_call1(p, x2);
        }
        return [
          0,
          function(_u_) {
            return filter(p, xs, _u_);
          },
          function(_t_) {
            return filter(_s_, xs, _t_);
          }
        ];
      }
      function peel(xss) {
        return unzip(function(_r_) {
          return filter_map(uncons, xss, _r_);
        });
      }
      function transpose(xss, param) {
        var match = peel(xss), tails = match[2], heads = match[1];
        if (!is_empty(heads))
          return [0, heads, function(_q_) {
            return transpose(tails, _q_);
          }];
        if (is_empty(tails)) return 0;
        throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
      }
      function _b_(remainders, xss, param) {
        var match = caml_call1(xss, 0);
        if (!match) return transpose(remainders, 0);
        var xss$0 = match[2], xs = match[1], match$0 = caml_call1(xs, 0);
        if (match$0) {
          var xs$0 = match$0[2], x2 = match$0[1], match$1 = peel(remainders), tails = match$1[2], heads = match$1[1], _l_ = function(_p_) {
            return [0, xs$0, tails];
          };
          return [
            0,
            function(_o_) {
              return [0, x2, heads];
            },
            function(_n_) {
              return _b_(_l_, xss$0, _n_);
            }
          ];
        }
        var match$2 = peel(remainders), tails$0 = match$2[2], heads$0 = match$2[1];
        return [0, heads$0, function(_m_) {
          return _b_(tails$0, xss$0, _m_);
        }];
      }
      function map_product(f, xs, ys) {
        function _f_(x2) {
          function _j_(y) {
            return caml_call2(f, x2, y);
          }
          return function(_k_) {
            return map(_j_, ys, _k_);
          };
        }
        function xss(_i_) {
          return map(_f_, xs, _i_);
        }
        function _e_(_h_) {
          return _b_(empty, xss, _h_);
        }
        return function(_g_) {
          return concat(_e_, _g_);
        };
      }
      function product(xs, ys) {
        return map_product(function(x2, y) {
          return [0, x2, y];
        }, xs, ys);
      }
      function of_dispenser(it) {
        function c(param) {
          var match = caml_call1(it, 0);
          if (!match) return 0;
          var x2 = match[1];
          return [0, x2, c];
        }
        return c;
      }
      function to_dispenser(xs) {
        var s2 = [0, xs];
        return function(param) {
          var match = caml_call1(s2[1], 0);
          if (!match) return 0;
          var xs2 = match[2], x2 = match[1];
          s2[1] = xs2;
          return [0, x2];
        };
      }
      function ints(i, param) {
        var _c_ = i + 1 | 0;
        return [0, i, function(_d_) {
          return ints(_c_, _d_);
        }];
      }
      var Stdlib_Seq = [
        0,
        is_empty,
        uncons,
        length,
        iter,
        fold_left,
        iteri,
        fold_lefti,
        for_all,
        exists,
        find,
        find_index,
        find_map,
        find_mapi,
        iter2,
        fold_left2,
        for_all2,
        exists2,
        equal,
        compare,
        empty,
        return$0,
        cons,
        init,
        unfold,
        repeat,
        forever,
        cycle,
        iterate,
        map,
        mapi,
        filter,
        filter_map,
        scan,
        take,
        drop,
        take_while,
        drop_while,
        group,
        memoize,
        Forced_twice,
        once,
        transpose,
        append,
        concat,
        flat_map,
        flat_map,
        zip,
        map2,
        interleave,
        sorted_merge,
        product,
        map_product,
        unzip,
        unzip,
        partition_map,
        partition,
        of_dispenser,
        to_dispenser,
        ints
      ];
      runtime.caml_register_global(10, Stdlib_Seq, "Stdlib__Seq");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_bytes_unsafe_set2 = runtime.caml_bytes_unsafe_set, caml_create_bytes2 = runtime.caml_create_bytes, caml_hash2 = runtime.caml_hash, caml_string_of_bytes2 = runtime.caml_string_of_bytes;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      var global_data = runtime.caml_get_global_data(), cst = "\\\\", cst$0 = "\\'", Stdlib = global_data.Stdlib, cst_Char_chr = "Char.chr", cst_b = "\\b", cst_t = "\\t", cst_n = "\\n", cst_r = "\\r";
      function chr(n) {
        if (0 <= n && 255 >= n) return n;
        return caml_call1(Stdlib[1], cst_Char_chr);
      }
      function escaped(c) {
        a: {
          if (40 <= c) {
            if (92 === c) return cst;
            if (127 > c) break a;
          } else {
            if (32 <= c) {
              if (39 <= c) return cst$0;
              break a;
            }
            if (14 > c)
              switch (c) {
                case 8:
                  return cst_b;
                case 9:
                  return cst_t;
                case 10:
                  return cst_n;
                case 13:
                  return cst_r;
              }
          }
          var s2 = caml_create_bytes2(4);
          caml_bytes_unsafe_set2(s2, 0, 92);
          caml_bytes_unsafe_set2(s2, 1, 48 + (c / 100 | 0) | 0);
          caml_bytes_unsafe_set2(s2, 2, 48 + ((c / 10 | 0) % 10 | 0) | 0);
          caml_bytes_unsafe_set2(s2, 3, 48 + (c % 10 | 0) | 0);
          return caml_string_of_bytes2(s2);
        }
        var s$0 = caml_create_bytes2(1);
        caml_bytes_unsafe_set2(s$0, 0, c);
        return caml_string_of_bytes2(s$0);
      }
      function lowercase_ascii(c) {
        return 25 < c - 65 >>> 0 ? c : c + 32 | 0;
      }
      function uppercase_ascii(c) {
        return 25 < c - 97 >>> 0 ? c : c - 32 | 0;
      }
      function compare(c1, c2) {
        return c1 - c2 | 0;
      }
      function equal(c1, c2) {
        return 0 === (c1 - c2 | 0) ? 1 : 0;
      }
      function seeded_hash(seed, x2) {
        return caml_hash2(10, 100, seed, x2);
      }
      function hash(x2) {
        return caml_hash2(10, 100, 0, x2);
      }
      var Stdlib_Char = [
        0,
        chr,
        escaped,
        lowercase_ascii,
        uppercase_ascii,
        compare,
        equal,
        seeded_hash,
        hash
      ];
      runtime.caml_register_global(8, Stdlib_Char, "Stdlib__Char");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_uchar_ml = "uchar.ml", caml_format_int2 = runtime.caml_format_int, caml_hash2 = runtime.caml_hash, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      var global_data = runtime.caml_get_global_data(), err_no_pred = "U+0000 has no predecessor", err_no_succ = "U+10FFFF has no successor", Assert_failure = global_data.Assert_failure, Stdlib = global_data.Stdlib, cst_is_not_a_Unicode_scalar_va = " is not a Unicode scalar value", cst_is_not_a_latin1_character = " is not a latin1 character", cst_U = "U+", lo_bound = 55295, hi_bound = 57344;
      function succ(u) {
        return u === 55295 ? hi_bound : u === 1114111 ? caml_call1(Stdlib[1], err_no_succ) : u + 1 | 0;
      }
      function pred(u) {
        return u === 57344 ? lo_bound : u === 0 ? caml_call1(Stdlib[1], err_no_pred) : u - 1 | 0;
      }
      function is_valid(i) {
        var _m_ = 0 <= i ? 1 : 0, _n_ = _m_ ? i <= 55295 ? 1 : 0 : _m_;
        if (_n_)
          var _o_ = _n_;
        else
          var _p_ = 57344 <= i ? 1 : 0, _o_ = _p_ ? i <= 1114111 ? 1 : 0 : _p_;
        return _o_;
      }
      function of_int(i) {
        if (is_valid(i)) return i;
        var _l_ = caml_call2(Stdlib[28], caml_format_int2("%X", i), cst_is_not_a_Unicode_scalar_va);
        return caml_call1(Stdlib[1], _l_);
      }
      function is_char(u) {
        return u < 256 ? 1 : 0;
      }
      function of_char(c) {
        return c;
      }
      function to_char(u) {
        if (255 >= u) return u;
        var _j_ = caml_call2(
          Stdlib[28],
          caml_format_int2("%04X", u),
          cst_is_not_a_latin1_character
        ), _k_ = caml_call2(Stdlib[28], cst_U, _j_);
        return caml_call1(Stdlib[1], _k_);
      }
      function unsafe_to_char(_i_) {
        return _i_;
      }
      function equal(_h_, _g_) {
        return _h_ === _g_ ? 1 : 0;
      }
      var compare = runtime.caml_int_compare, _a_ = [0, cst_uchar_ml, 89, 7], _b_ = [0, cst_uchar_ml, 84, 18], _c_ = [0, cst_uchar_ml, 95, 7], _d_ = [0, cst_uchar_ml, 92, 18];
      function seeded_hash(seed, x2) {
        return caml_hash2(10, 100, seed, x2);
      }
      function hash(x2) {
        return caml_hash2(10, 100, 0, x2);
      }
      function utf_decode_is_valid(d) {
        return 1 === (d >>> 27 | 0) ? 1 : 0;
      }
      function utf_decode_length(d) {
        return (d >>> 24 | 0) & 7;
      }
      function utf_decode_uchar(d) {
        return d & 16777215;
      }
      function utf_decode(n, u) {
        return (8 | n) << 24 | u;
      }
      function utf_decode_invalid(n) {
        return n << 24 | 65533;
      }
      function utf_8_byte_length(u) {
        if (0 > u) throw caml_maybe_attach_backtrace2([0, Assert_failure, _b_], 1);
        if (127 >= u) return 1;
        if (2047 >= u) return 2;
        if (65535 >= u) return 3;
        if (1114111 < u)
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
        return 4;
      }
      function utf_16_byte_length(u) {
        if (0 > u) throw caml_maybe_attach_backtrace2([0, Assert_failure, _d_], 1);
        if (65535 >= u) return 2;
        if (1114111 < u)
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _c_], 1);
        return 4;
      }
      var Stdlib_Uchar = [
        0,
        0,
        1114111,
        65279,
        65533,
        succ,
        pred,
        is_valid,
        of_int,
        function(_f_) {
          return _f_;
        },
        function(_e_) {
          return _e_;
        },
        is_char,
        of_char,
        to_char,
        unsafe_to_char,
        equal,
        compare,
        seeded_hash,
        hash,
        utf_decode_is_valid,
        utf_decode_uchar,
        utf_decode_length,
        utf_decode,
        utf_decode_invalid,
        utf_8_byte_length,
        utf_16_byte_length
      ];
      runtime.caml_register_global(13, Stdlib_Uchar, "Stdlib__Uchar");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_List_map2$1 = "List.map2", cst_List_nth$1 = "List.nth", caml_compare2 = runtime.caml_compare, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib = global_data.Stdlib, cst_hd = "hd", cst_tl = "tl", cst_nth = "nth", cst_List_nth = cst_List_nth$1, cst_List_nth$0 = cst_List_nth$1;
      function length(l$0) {
        var len = 0, param = l$0;
        for (; ; ) {
          if (!param) return len;
          var l = param[2], len$0 = len + 1 | 0;
          len = len$0;
          param = l;
        }
      }
      function cons(a, l) {
        return [0, a, l];
      }
      function hd(param) {
        if (!param) return caml_call1(Stdlib[2], cst_hd);
        var a = param[1];
        return a;
      }
      function tl(param) {
        if (!param) return caml_call1(Stdlib[2], cst_tl);
        var l = param[2];
        return l;
      }
      function nth(l, n) {
        if (0 > n) return caml_call1(Stdlib[1], cst_List_nth);
        var l$0 = l, n$0 = n;
        for (; ; ) {
          if (!l$0) return caml_call1(Stdlib[2], cst_nth);
          var l$1 = l$0[2], a = l$0[1];
          if (0 === n$0) return a;
          var n$1 = n$0 - 1 | 0;
          l$0 = l$1;
          n$0 = n$1;
        }
      }
      function nth_opt(l, n) {
        if (0 > n) return caml_call1(Stdlib[1], cst_List_nth$0);
        var l$0 = l, n$0 = n;
        for (; ; ) {
          if (!l$0) return 0;
          var l$1 = l$0[2], a = l$0[1];
          if (0 === n$0) return [0, a];
          var n$1 = n$0 - 1 | 0;
          l$0 = l$1;
          n$0 = n$1;
        }
      }
      var append = Stdlib[37], cst_List_init = "List.init", cst_List_map2 = cst_List_map2$1, cst_List_map2$0 = cst_List_map2$1, cst_List_rev_map2 = "List.rev_map2", cst_List_iter2 = "List.iter2", cst_List_fold_left2 = "List.fold_left2", cst_List_fold_right2 = "List.fold_right2", cst_List_for_all2 = "List.for_all2", cst_List_exists2 = "List.exists2", cst_List_take = "List.take", cst_List_drop = "List.drop", _a_ = [0, 0, 0], cst_List_combine = "List.combine";
      function rev_append(l1, l2) {
        var l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (!l1$0) return l2$0;
          var l1$1 = l1$0[2], a = l1$0[1], l2$1 = [0, a, l2$0];
          l1$0 = l1$1;
          l2$0 = l2$1;
        }
      }
      function rev(l) {
        return rev_append(l, 0);
      }
      function init(len, f) {
        if (0 > len) return caml_call1(Stdlib[1], cst_List_init);
        var last = len - 1 | 0, i$1 = 0;
        if (last < 0) return 0;
        if (0 === last) return [0, caml_call1(f, i$1), 0];
        var r1 = caml_call1(f, i$1), r2 = caml_call1(f, 1), block = [0, r2, 24029], dst = block, offset = 1, i = 2;
        for (; ; ) {
          if (last < i)
            dst[1 + offset] = 0;
          else {
            if (i !== last) {
              var r1$0 = caml_call1(f, i), r2$0 = caml_call1(f, i + 1 | 0), dst$0 = [0, r2$0, 24029];
              dst[1 + offset] = [0, r1$0, dst$0];
              var i$0 = i + 2 | 0;
              dst = dst$0;
              offset = 1;
              i = i$0;
              continue;
            }
            dst[1 + offset] = [0, caml_call1(f, i), 0];
          }
          return [0, r1, block];
        }
      }
      function flatten(param) {
        if (!param) return 0;
        var r = param[2], l = param[1], _I_ = flatten(r);
        return caml_call2(Stdlib[37], l, _I_);
      }
      function map(f, param) {
        if (!param) return 0;
        var match = param[2], a1 = param[1];
        if (!match) {
          var r1$0 = caml_call1(f, a1);
          return [0, r1$0, 0];
        }
        var l = match[2], a2 = match[1], r1 = caml_call1(f, a1), r2 = caml_call1(f, a2), block = [0, r2, 24029], dst = block, offset = 1, param$0 = l;
        for (; ; ) {
          if (param$0) {
            var match$0 = param$0[2], a1$0 = param$0[1];
            if (match$0) {
              var l$0 = match$0[2], a2$0 = match$0[1], r1$1 = caml_call1(f, a1$0), r2$0 = caml_call1(f, a2$0), dst$0 = [0, r2$0, 24029];
              dst[1 + offset] = [0, r1$1, dst$0];
              dst = dst$0;
              offset = 1;
              param$0 = l$0;
              continue;
            }
            var r1$2 = caml_call1(f, a1$0);
            dst[1 + offset] = [0, r1$2, 0];
          } else
            dst[1 + offset] = 0;
          return [0, r1, block];
        }
      }
      function mapi(f, l$1) {
        var i$1 = 0;
        if (!l$1) return 0;
        var match = l$1[2], a1 = l$1[1];
        if (!match) {
          var r1$0 = caml_call2(f, i$1, a1);
          return [0, r1$0, 0];
        }
        var l = match[2], a2 = match[1], r1 = caml_call2(f, i$1, a1), r2 = caml_call2(f, 1, a2), block = [0, r2, 24029], dst = block, offset = 1, i = 2, param = l;
        for (; ; ) {
          if (param) {
            var match$0 = param[2], a1$0 = param[1];
            if (match$0) {
              var l$0 = match$0[2], a2$0 = match$0[1], r1$1 = caml_call2(f, i, a1$0), r2$0 = caml_call2(f, i + 1 | 0, a2$0), dst$0 = [0, r2$0, 24029];
              dst[1 + offset] = [0, r1$1, dst$0];
              var i$0 = i + 2 | 0;
              dst = dst$0;
              offset = 1;
              i = i$0;
              param = l$0;
              continue;
            }
            var r1$2 = caml_call2(f, i, a1$0);
            dst[1 + offset] = [0, r1$2, 0];
          } else
            dst[1 + offset] = 0;
          return [0, r1, block];
        }
      }
      function rev_map(f, l) {
        var accu = 0, param = l;
        for (; ; ) {
          if (!param) return accu;
          var l$0 = param[2], a = param[1], accu$0 = [0, caml_call1(f, a), accu];
          accu = accu$0;
          param = l$0;
        }
      }
      function iter(f, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], a = param$0[1];
          caml_call1(f, a);
          param$0 = l;
        }
      }
      function iteri(f, l$0) {
        var i = 0, param = l$0;
        for (; ; ) {
          if (!param) return 0;
          var l = param[2], a = param[1];
          caml_call2(f, i, a);
          var i$0 = i + 1 | 0;
          i = i$0;
          param = l;
        }
      }
      function fold_left(f, accu, l) {
        var accu$0 = accu, l$0 = l;
        for (; ; ) {
          if (!l$0) return accu$0;
          var l$1 = l$0[2], a = l$0[1], accu$1 = caml_call2(f, accu$0, a);
          accu$0 = accu$1;
          l$0 = l$1;
        }
      }
      function fold_right(f, l, accu) {
        if (!l) return accu;
        var l$0 = l[2], a = l[1];
        return caml_call2(f, a, fold_right(f, l$0, accu));
      }
      function map2(f, l1, l2) {
        if (l1) {
          var _G_ = l1[2], a1 = l1[1];
          if (_G_) {
            if (l2) {
              var match = l2[2];
              if (match) {
                var l2$0 = match[2], b2 = match[1], b1 = l2[1], l1$0 = _G_[2], a2 = _G_[1], r1 = caml_call2(f, a1, b1), r2 = caml_call2(f, a2, b2), block = [0, r2, 24029], dst = block, offset = 1, l1$1 = l1$0, l2$1 = l2$0;
                for (; ; ) {
                  a: {
                    if (l1$1) {
                      var _H_ = l1$1[2], a1$0 = l1$1[1];
                      if (_H_) {
                        if (l2$1) {
                          var match$0 = l2$1[2];
                          if (match$0) {
                            var l2$2 = match$0[2], b2$0 = match$0[1], b1$1 = l2$1[1], l1$2 = _H_[2], a2$0 = _H_[1], r1$1 = caml_call2(f, a1$0, b1$1), r2$0 = caml_call2(f, a2$0, b2$0), dst$0 = [0, r2$0, 24029];
                            dst[1 + offset] = [0, r1$1, dst$0];
                            dst = dst$0;
                            offset = 1;
                            l1$1 = l1$2;
                            l2$1 = l2$2;
                            continue;
                          }
                        }
                      } else if (l2$1 && !l2$1[2]) {
                        var b1$2 = l2$1[1], r1$2 = caml_call2(f, a1$0, b1$2);
                        dst[1 + offset] = [0, r1$2, 0];
                        break a;
                      }
                    } else if (!l2$1) {
                      dst[1 + offset] = 0;
                      break a;
                    }
                    dst[1 + offset] = caml_call1(Stdlib[1], cst_List_map2$0);
                  }
                  return [0, r1, block];
                }
              }
            }
          } else if (l2 && !l2[2]) {
            var b1$0 = l2[1], r1$0 = caml_call2(f, a1, b1$0);
            return [0, r1$0, 0];
          }
        } else if (!l2) return 0;
        return caml_call1(Stdlib[1], cst_List_map2);
      }
      function rev_map2(f, l1, l2) {
        var accu = 0, l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (l1$0) {
            if (l2$0) {
              var l2$1 = l2$0[2], a2 = l2$0[1], l1$1 = l1$0[2], a1 = l1$0[1], accu$0 = [0, caml_call2(f, a1, a2), accu];
              accu = accu$0;
              l1$0 = l1$1;
              l2$0 = l2$1;
              continue;
            }
          } else if (!l2$0) return accu;
          return caml_call1(Stdlib[1], cst_List_rev_map2);
        }
      }
      function iter2(f, l1, l2) {
        var l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (l1$0) {
            if (l2$0) {
              var l2$1 = l2$0[2], a2 = l2$0[1], l1$1 = l1$0[2], a1 = l1$0[1];
              caml_call2(f, a1, a2);
              l1$0 = l1$1;
              l2$0 = l2$1;
              continue;
            }
          } else if (!l2$0) return 0;
          return caml_call1(Stdlib[1], cst_List_iter2);
        }
      }
      function fold_left2(f, accu, l1, l2) {
        var accu$0 = accu, l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (l1$0) {
            if (l2$0) {
              var l2$1 = l2$0[2], a2 = l2$0[1], l1$1 = l1$0[2], a1 = l1$0[1], accu$1 = caml_call3(f, accu$0, a1, a2);
              accu$0 = accu$1;
              l1$0 = l1$1;
              l2$0 = l2$1;
              continue;
            }
          } else if (!l2$0) return accu$0;
          return caml_call1(Stdlib[1], cst_List_fold_left2);
        }
      }
      function fold_right2(f, l1, l2, accu) {
        if (l1) {
          if (l2) {
            var l2$0 = l2[2], a2 = l2[1], l1$0 = l1[2], a1 = l1[1];
            return caml_call3(f, a1, a2, fold_right2(f, l1$0, l2$0, accu));
          }
        } else if (!l2) return accu;
        return caml_call1(Stdlib[1], cst_List_fold_right2);
      }
      function for_all(p, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 1;
          var l = param$0[2], a = param$0[1], _F_ = caml_call1(p, a);
          if (!_F_) return _F_;
          param$0 = l;
        }
      }
      function exists(p, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], a = param$0[1], _E_ = caml_call1(p, a);
          if (_E_) return _E_;
          param$0 = l;
        }
      }
      function for_all2(p, l1, l2) {
        var l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (l1$0) {
            if (l2$0) {
              var l2$1 = l2$0[2], a2 = l2$0[1], l1$1 = l1$0[2], a1 = l1$0[1], _D_ = caml_call2(p, a1, a2);
              if (!_D_) return _D_;
              l1$0 = l1$1;
              l2$0 = l2$1;
              continue;
            }
          } else if (!l2$0) return 1;
          return caml_call1(Stdlib[1], cst_List_for_all2);
        }
      }
      function exists2(p, l1, l2) {
        var l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (l1$0) {
            if (l2$0) {
              var l2$1 = l2$0[2], a2 = l2$0[1], l1$1 = l1$0[2], a1 = l1$0[1], _C_ = caml_call2(p, a1, a2);
              if (_C_) return _C_;
              l1$0 = l1$1;
              l2$0 = l2$1;
              continue;
            }
          } else if (!l2$0) return 0;
          return caml_call1(Stdlib[1], cst_List_exists2);
        }
      }
      function mem(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], a = param$0[1], _B_ = 0 === caml_compare2(a, x2) ? 1 : 0;
          if (_B_) return _B_;
          param$0 = l;
        }
      }
      function memq(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], a = param$0[1], _A_ = a === x2 ? 1 : 0;
          if (_A_) return _A_;
          param$0 = l;
        }
      }
      function assoc(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
          var l = param$0[2], match = param$0[1], b = match[2], a = match[1];
          if (0 === caml_compare2(a, x2)) return b;
          param$0 = l;
        }
      }
      function assoc_opt(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], match = param$0[1], b = match[2], a = match[1];
          if (0 === caml_compare2(a, x2)) return [0, b];
          param$0 = l;
        }
      }
      function assq(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
          var l = param$0[2], match = param$0[1], b = match[2], a = match[1];
          if (a === x2) return b;
          param$0 = l;
        }
      }
      function assq_opt(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], match = param$0[1], b = match[2], a = match[1];
          if (a === x2) return [0, b];
          param$0 = l;
        }
      }
      function mem_assoc(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], a = param$0[1][1], _z_ = 0 === caml_compare2(a, x2) ? 1 : 0;
          if (_z_) return _z_;
          param$0 = l;
        }
      }
      function mem_assq(x2, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], a = param$0[1][1], _y_ = a === x2 ? 1 : 0;
          if (_y_) return _y_;
          param$0 = l;
        }
      }
      function remove_assoc(x2, param) {
        if (!param) return 0;
        var l = param[2], pair = param[1], a = pair[1];
        return 0 === caml_compare2(a, x2) ? l : [0, pair, remove_assoc(x2, l)];
      }
      function remove_assq(x2, param) {
        if (!param) return 0;
        var l = param[2], pair = param[1], a = pair[1];
        return a === x2 ? l : [0, pair, remove_assq(x2, l)];
      }
      function find(p, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
          var l = param$0[2], x2 = param$0[1];
          if (caml_call1(p, x2)) return x2;
          param$0 = l;
        }
      }
      function find_opt(p, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], x2 = param$0[1];
          if (caml_call1(p, x2)) return [0, x2];
          param$0 = l;
        }
      }
      function find_index(p) {
        var i = 0;
        return function(param$0) {
          var i$0 = i, param = param$0;
          for (; ; ) {
            if (!param) return 0;
            var l = param[2], a = param[1];
            if (caml_call1(p, a)) return [0, i$0];
            var i$1 = i$0 + 1 | 0;
            i$0 = i$1;
            param = l;
          }
        };
      }
      function find_map(f, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], x2 = param$0[1], result = caml_call1(f, x2);
          if (result) return result;
          param$0 = l;
        }
      }
      function find_mapi(f) {
        var i = 0;
        return function(param$0) {
          var i$0 = i, param = param$0;
          for (; ; ) {
            if (!param) return 0;
            var l = param[2], x2 = param[1], result = caml_call2(f, i$0, x2);
            if (result) return result;
            var i$1 = i$0 + 1 | 0;
            i$0 = i$1;
            param = l;
          }
        };
      }
      function find_all(p, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], x2 = param$0[1];
          if (caml_call1(p, x2)) {
            var block = [0, x2, 24029], dst = block, offset = 1, param$1 = l;
            for (; ; ) {
              if (!param$1) {
                dst[1 + offset] = 0;
                return block;
              }
              var l$0 = param$1[2], x$0 = param$1[1];
              if (caml_call1(p, x$0)) {
                var dst$0 = [0, x$0, 24029];
                dst[1 + offset] = dst$0;
                dst = dst$0;
                offset = 1;
                param$1 = l$0;
              } else
                param$1 = l$0;
            }
          } else
            param$0 = l;
        }
      }
      function filteri(p, l$1) {
        var i = 0, param = l$1;
        for (; ; ) {
          if (!param) return 0;
          var l = param[2], x2 = param[1], i$0 = i + 1 | 0;
          if (caml_call2(p, i, x2)) break;
          i = i$0;
          param = l;
        }
        var block = [0, x2, 24029], dst = block, offset = 1, i$1 = i$0, param$0 = l;
        for (; ; ) {
          if (!param$0) {
            dst[1 + offset] = 0;
            return block;
          }
          var l$0 = param$0[2], x$0 = param$0[1], i$2 = i$1 + 1 | 0;
          if (caml_call2(p, i$1, x$0)) {
            var dst$0 = [0, x$0, 24029];
            dst[1 + offset] = dst$0;
            dst = dst$0;
            offset = 1;
            i$1 = i$2;
            param$0 = l$0;
          } else {
            i$1 = i$2;
            param$0 = l$0;
          }
        }
      }
      function filter_map(f, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], x2 = param$0[1], match = caml_call1(f, x2);
          if (match) {
            var v = match[1], block = [0, v, 24029], dst = block, offset = 1, param$1 = l;
            for (; ; ) {
              if (!param$1) {
                dst[1 + offset] = 0;
                return block;
              }
              var l$0 = param$1[2], x$0 = param$1[1], match$0 = caml_call1(f, x$0);
              if (match$0) {
                var v$0 = match$0[1], dst$0 = [0, v$0, 24029];
                dst[1 + offset] = dst$0;
                dst = dst$0;
                offset = 1;
                param$1 = l$0;
              } else
                param$1 = l$0;
            }
          } else
            param$0 = l;
        }
      }
      function concat_map(f, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var xs = param$0[2], x2 = param$0[1], ys = caml_call1(f, x2);
          if (ys) {
            var ys$1 = ys[2], y = ys[1], block = [0, y, 24029], dst = block, offset = 1, ys$2 = ys$1, xs$1 = xs;
            for (; ; )
              if (ys$2) {
                var ys$3 = ys$2[2], y$0 = ys$2[1], dst$0 = [0, y$0, 24029];
                dst[1 + offset] = dst$0;
                dst = dst$0;
                offset = 1;
                ys$2 = ys$3;
              } else {
                if (!xs$1) {
                  dst[1 + offset] = 0;
                  return block;
                }
                var xs$0 = xs$1[2], x$0 = xs$1[1], ys$0 = caml_call1(f, x$0);
                ys$2 = ys$0;
                xs$1 = xs$0;
              }
          } else
            param$0 = xs;
        }
      }
      function take(n, l) {
        if (n < 0) caml_call1(Stdlib[1], cst_List_take);
        if (0 !== n && l) {
          var l$0 = l[2], x2 = l[1], block = [0, x2, 24029], n$0 = n - 1 | 0, dst = block, offset = 1, n$1 = n$0, l$1 = l$0;
          for (; ; ) {
            if (0 !== n$1 && l$1) {
              var l$2 = l$1[2], x$0 = l$1[1], dst$0 = [0, x$0, 24029];
              dst[1 + offset] = dst$0;
              var n$2 = n$1 - 1 | 0;
              dst = dst$0;
              offset = 1;
              n$1 = n$2;
              l$1 = l$2;
              continue;
            }
            dst[1 + offset] = 0;
            return block;
          }
        }
        return 0;
      }
      function drop(n, rest) {
        if (n < 0) caml_call1(Stdlib[1], cst_List_drop);
        var i = 0, rest$0 = rest;
        for (; ; ) {
          if (rest$0) {
            var rest$1 = rest$0[2];
            if (i < n) {
              var i$0 = i + 1 | 0;
              i = i$0;
              rest$0 = rest$1;
              continue;
            }
          }
          return rest$0;
        }
      }
      function take_while(p, rest) {
        if (rest) {
          var rest$0 = rest[2], x2 = rest[1];
          if (caml_call1(p, x2)) {
            var block = [0, x2, 24029], dst = block, offset = 1, rest$1 = rest$0;
            for (; ; ) {
              if (rest$1) {
                var rest$2 = rest$1[2], x$0 = rest$1[1];
                if (caml_call1(p, x$0)) {
                  var dst$0 = [0, x$0, 24029];
                  dst[1 + offset] = dst$0;
                  dst = dst$0;
                  offset = 1;
                  rest$1 = rest$2;
                  continue;
                }
              }
              dst[1 + offset] = 0;
              return block;
            }
          }
        }
        return 0;
      }
      function drop_while(p, rest) {
        var rest$0 = rest;
        for (; ; ) {
          if (rest$0) {
            var rest$1 = rest$0[2], x2 = rest$0[1];
            if (caml_call1(p, x2)) {
              rest$0 = rest$1;
              continue;
            }
          }
          return rest$0;
        }
      }
      function fold_left_map(f, accu, l) {
        var accu$0 = accu, l_accu = 0, param = l;
        for (; ; ) {
          if (!param) return [0, accu$0, rev(l_accu)];
          var l$0 = param[2], x2 = param[1], match = caml_call2(f, accu$0, x2), x$0 = match[2], accu$1 = match[1], l_accu$0 = [0, x$0, l_accu];
          accu$0 = accu$1;
          l_accu = l_accu$0;
          param = l$0;
        }
      }
      function partition(p, l) {
        var yes = 0, no = 0, param = l;
        for (; ; ) {
          if (!param) {
            var _x_ = rev(no);
            return [0, rev(yes), _x_];
          }
          var l$0 = param[2], x2 = param[1];
          if (caml_call1(p, x2)) {
            var yes$0 = [0, x2, yes];
            yes = yes$0;
            param = l$0;
          } else {
            var no$0 = [0, x2, no];
            no = no$0;
            param = l$0;
          }
        }
      }
      function partition_map(p, l) {
        var left = 0, right = 0, param = l;
        for (; ; ) {
          if (!param) {
            var _w_ = rev(right);
            return [0, rev(left), _w_];
          }
          var l$0 = param[2], x2 = param[1], match = caml_call1(p, x2);
          if (0 === match[0]) {
            var v = match[1], left$0 = [0, v, left];
            left = left$0;
            param = l$0;
          } else {
            var v$0 = match[1], right$0 = [0, v$0, right];
            right = right$0;
            param = l$0;
          }
        }
      }
      function split(param) {
        if (!param) return _a_;
        var l = param[2], match = param[1], y = match[2], x2 = match[1], match$0 = split(l), ry = match$0[2], rx = match$0[1];
        return [0, [0, x2, rx], [0, y, ry]];
      }
      function combine(l1, l2) {
        if (l1) {
          if (l2) {
            var l2$0 = l2[2], a2 = l2[1], l1$0 = l1[2], a1 = l1[1];
            return [0, [0, a1, a2], combine(l1$0, l2$0)];
          }
        } else if (!l2) return 0;
        return caml_call1(Stdlib[1], cst_List_combine);
      }
      function merge(cmp, l1, l2) {
        if (!l1) return l2;
        if (!l2) return l1;
        var t2 = l2[2], h2 = l2[1], t1 = l1[2], h1 = l1[1];
        return 0 < caml_call2(cmp, h1, h2) ? [0, h2, merge(cmp, l1, t2)] : [0, h1, merge(cmp, t1, l2)];
      }
      function stable_sort(cmp, l) {
        function sort(n, l2) {
          if (2 === n) {
            if (l2) {
              var match = l2[2];
              if (match) {
                var tl2 = match[2], x2 = match[1], x1 = l2[1], s2 = 0 < caml_call2(cmp, x1, x2) ? [0, x2, [0, x1, 0]] : [0, x1, [0, x2, 0]];
                return [0, s2, tl2];
              }
            }
          } else if (3 === n && l2) {
            var _v_ = l2[2];
            if (_v_) {
              var match$2 = _v_[2];
              if (match$2) {
                var tl$1 = match$2[2], x3 = match$2[1], x2$0 = _v_[1], x1$0 = l2[1], s$0 = 0 < caml_call2(cmp, x1$0, x2$0) ? 0 < caml_call2(cmp, x1$0, x3) ? 0 < caml_call2(cmp, x2$0, x3) ? [0, x3, [0, x2$0, [0, x1$0, 0]]] : [0, x2$0, [0, x3, [0, x1$0, 0]]] : [0, x2$0, [0, x1$0, [0, x3, 0]]] : 0 < caml_call2(cmp, x2$0, x3) ? 0 < caml_call2(cmp, x1$0, x3) ? [0, x3, [0, x1$0, [0, x2$0, 0]]] : [0, x1$0, [0, x3, [0, x2$0, 0]]] : [0, x1$0, [0, x2$0, [0, x3, 0]]];
                return [0, s$0, tl$1];
              }
            }
          }
          var n1 = n >> 1, n2 = n - n1 | 0, match$0 = rev_sort(n1, l2), l2$0 = match$0[2], s1 = match$0[1], match$1 = rev_sort(n2, l2$0), tl$0 = match$1[2], s22 = match$1[1], l1 = s1, l22 = s22, accu = 0;
          for (; ; ) {
            if (l1) {
              if (l22) {
                var t2 = l22[2], h2 = l22[1], t1 = l1[2], h1 = l1[1];
                if (0 < caml_call2(cmp, h1, h2)) {
                  var accu$0 = [0, h1, accu];
                  l1 = t1;
                  accu = accu$0;
                  continue;
                }
                var accu$1 = [0, h2, accu];
                l22 = t2;
                accu = accu$1;
                continue;
              }
              var _u_ = rev_append(l1, accu);
            } else
              var _u_ = rev_append(l22, accu);
            return [0, _u_, tl$0];
          }
        }
        function rev_sort(n, l2) {
          if (2 === n) {
            if (l2) {
              var match = l2[2];
              if (match) {
                var tl2 = match[2], x2 = match[1], x1 = l2[1], s2 = 0 < caml_call2(cmp, x1, x2) ? [0, x1, [0, x2, 0]] : [0, x2, [0, x1, 0]];
                return [0, s2, tl2];
              }
            }
          } else if (3 === n && l2) {
            var _t_ = l2[2];
            if (_t_) {
              var match$2 = _t_[2];
              if (match$2) {
                var tl$1 = match$2[2], x3 = match$2[1], x2$0 = _t_[1], x1$0 = l2[1], s$0 = 0 < caml_call2(cmp, x1$0, x2$0) ? 0 < caml_call2(cmp, x2$0, x3) ? [0, x1$0, [0, x2$0, [0, x3, 0]]] : 0 < caml_call2(cmp, x1$0, x3) ? [0, x1$0, [0, x3, [0, x2$0, 0]]] : [0, x3, [0, x1$0, [0, x2$0, 0]]] : 0 < caml_call2(cmp, x1$0, x3) ? [0, x2$0, [0, x1$0, [0, x3, 0]]] : 0 < caml_call2(cmp, x2$0, x3) ? [0, x2$0, [0, x3, [0, x1$0, 0]]] : [0, x3, [0, x2$0, [0, x1$0, 0]]];
                return [0, s$0, tl$1];
              }
            }
          }
          var n1 = n >> 1, n2 = n - n1 | 0, match$0 = sort(n1, l2), l2$0 = match$0[2], s1 = match$0[1], match$1 = sort(n2, l2$0), tl$0 = match$1[2], s22 = match$1[1], l1 = s1, l22 = s22, accu = 0;
          for (; ; ) {
            if (l1) {
              if (l22) {
                var t2 = l22[2], h2 = l22[1], t1 = l1[2], h1 = l1[1];
                if (0 < caml_call2(cmp, h1, h2)) {
                  var accu$0 = [0, h2, accu];
                  l22 = t2;
                  accu = accu$0;
                  continue;
                }
                var accu$1 = [0, h1, accu];
                l1 = t1;
                accu = accu$1;
                continue;
              }
              var _s_ = rev_append(l1, accu);
            } else
              var _s_ = rev_append(l22, accu);
            return [0, _s_, tl$0];
          }
        }
        var len = length(l);
        return 2 <= len ? sort(len, l)[1] : l;
      }
      function sort_uniq(cmp, l) {
        function sort(n, l2) {
          if (2 === n) {
            if (l2) {
              var match = l2[2];
              if (match) {
                var tl2 = match[2], x2 = match[1], x1 = l2[1], c$0 = caml_call2(cmp, x1, x2), s2 = 0 === c$0 ? [0, x1, 0] : 0 <= c$0 ? [0, x2, [0, x1, 0]] : [0, x1, [0, x2, 0]];
                return [0, s2, tl2];
              }
            }
          } else if (3 === n && l2) {
            var _m_ = l2[2];
            if (_m_) {
              var match$2 = _m_[2];
              if (match$2) {
                var tl$1 = match$2[2], x3 = match$2[1], x2$0 = _m_[1], x1$0 = l2[1], c$1 = caml_call2(cmp, x1$0, x2$0);
                if (0 === c$1)
                  var c$2 = caml_call2(cmp, x2$0, x3), _n_ = 0 === c$2 ? [0, x2$0, 0] : 0 <= c$2 ? [0, x3, [0, x2$0, 0]] : [0, x2$0, [0, x3, 0]], s$0 = _n_;
                else if (0 <= c$1) {
                  var c$3 = caml_call2(cmp, x1$0, x3);
                  if (0 === c$3)
                    var _o_ = [0, x2$0, [0, x1$0, 0]];
                  else if (0 <= c$3)
                    var c$4 = caml_call2(cmp, x2$0, x3), _p_ = 0 === c$4 ? [0, x2$0, [0, x1$0, 0]] : 0 <= c$4 ? [0, x3, [0, x2$0, [0, x1$0, 0]]] : [0, x2$0, [0, x3, [0, x1$0, 0]]], _o_ = _p_;
                  else
                    var _o_ = [0, x2$0, [0, x1$0, [0, x3, 0]]];
                  var s$0 = _o_;
                } else {
                  var c$5 = caml_call2(cmp, x2$0, x3);
                  if (0 === c$5)
                    var _q_ = [0, x1$0, [0, x2$0, 0]];
                  else if (0 <= c$5)
                    var c$6 = caml_call2(cmp, x1$0, x3), _r_ = 0 === c$6 ? [0, x1$0, [0, x2$0, 0]] : 0 <= c$6 ? [0, x3, [0, x1$0, [0, x2$0, 0]]] : [0, x1$0, [0, x3, [0, x2$0, 0]]], _q_ = _r_;
                  else
                    var _q_ = [0, x1$0, [0, x2$0, [0, x3, 0]]];
                  var s$0 = _q_;
                }
                return [0, s$0, tl$1];
              }
            }
          }
          var n1 = n >> 1, n2 = n - n1 | 0, match$0 = rev_sort(n1, l2), l2$0 = match$0[2], s1 = match$0[1], match$1 = rev_sort(n2, l2$0), tl$0 = match$1[2], s22 = match$1[1], l1 = s1, l22 = s22, accu = 0;
          for (; ; ) {
            if (l1) {
              if (l22) {
                var t2 = l22[2], h2 = l22[1], t1 = l1[2], h1 = l1[1], c = caml_call2(cmp, h1, h2);
                if (0 === c) {
                  var accu$0 = [0, h1, accu];
                  l1 = t1;
                  l22 = t2;
                  accu = accu$0;
                  continue;
                }
                if (0 < c) {
                  var accu$1 = [0, h1, accu];
                  l1 = t1;
                  accu = accu$1;
                  continue;
                }
                var accu$2 = [0, h2, accu];
                l22 = t2;
                accu = accu$2;
                continue;
              }
              var _l_ = rev_append(l1, accu);
            } else
              var _l_ = rev_append(l22, accu);
            return [0, _l_, tl$0];
          }
        }
        function rev_sort(n, l2) {
          if (2 === n) {
            if (l2) {
              var match = l2[2];
              if (match) {
                var tl2 = match[2], x2 = match[1], x1 = l2[1], c$0 = caml_call2(cmp, x1, x2), s2 = 0 === c$0 ? [0, x1, 0] : 0 < c$0 ? [0, x1, [0, x2, 0]] : [0, x2, [0, x1, 0]];
                return [0, s2, tl2];
              }
            }
          } else if (3 === n && l2) {
            var _f_ = l2[2];
            if (_f_) {
              var match$2 = _f_[2];
              if (match$2) {
                var tl$1 = match$2[2], x3 = match$2[1], x2$0 = _f_[1], x1$0 = l2[1], c$1 = caml_call2(cmp, x1$0, x2$0);
                if (0 === c$1)
                  var c$2 = caml_call2(cmp, x2$0, x3), _g_ = 0 === c$2 ? [0, x2$0, 0] : 0 < c$2 ? [0, x2$0, [0, x3, 0]] : [0, x3, [0, x2$0, 0]], s$0 = _g_;
                else if (0 < c$1) {
                  var c$3 = caml_call2(cmp, x2$0, x3);
                  if (0 === c$3)
                    var _h_ = [0, x1$0, [0, x2$0, 0]];
                  else if (0 < c$3)
                    var _h_ = [0, x1$0, [0, x2$0, [0, x3, 0]]];
                  else
                    var c$4 = caml_call2(cmp, x1$0, x3), _i_ = 0 === c$4 ? [0, x1$0, [0, x2$0, 0]] : 0 < c$4 ? [0, x1$0, [0, x3, [0, x2$0, 0]]] : [0, x3, [0, x1$0, [0, x2$0, 0]]], _h_ = _i_;
                  var s$0 = _h_;
                } else {
                  var c$5 = caml_call2(cmp, x1$0, x3);
                  if (0 === c$5)
                    var _j_ = [0, x2$0, [0, x1$0, 0]];
                  else if (0 < c$5)
                    var _j_ = [0, x2$0, [0, x1$0, [0, x3, 0]]];
                  else
                    var c$6 = caml_call2(cmp, x2$0, x3), _k_ = 0 === c$6 ? [0, x2$0, [0, x1$0, 0]] : 0 < c$6 ? [0, x2$0, [0, x3, [0, x1$0, 0]]] : [0, x3, [0, x2$0, [0, x1$0, 0]]], _j_ = _k_;
                  var s$0 = _j_;
                }
                return [0, s$0, tl$1];
              }
            }
          }
          var n1 = n >> 1, n2 = n - n1 | 0, match$0 = sort(n1, l2), l2$0 = match$0[2], s1 = match$0[1], match$1 = sort(n2, l2$0), tl$0 = match$1[2], s22 = match$1[1], l1 = s1, l22 = s22, accu = 0;
          for (; ; ) {
            if (l1) {
              if (l22) {
                var t2 = l22[2], h2 = l22[1], t1 = l1[2], h1 = l1[1], c = caml_call2(cmp, h1, h2);
                if (0 === c) {
                  var accu$0 = [0, h1, accu];
                  l1 = t1;
                  l22 = t2;
                  accu = accu$0;
                  continue;
                }
                if (0 <= c) {
                  var accu$1 = [0, h2, accu];
                  l22 = t2;
                  accu = accu$1;
                  continue;
                }
                var accu$2 = [0, h1, accu];
                l1 = t1;
                accu = accu$2;
                continue;
              }
              var _e_ = rev_append(l1, accu);
            } else
              var _e_ = rev_append(l22, accu);
            return [0, _e_, tl$0];
          }
        }
        var len = length(l);
        return 2 <= len ? sort(len, l)[1] : l;
      }
      function compare_lengths(l1, l2) {
        var l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (!l1$0) return l2$0 ? -1 : 0;
          if (!l2$0) return 1;
          var l2$1 = l2$0[2], l1$1 = l1$0[2];
          l1$0 = l1$1;
          l2$0 = l2$1;
        }
      }
      function compare_length_with(l, n) {
        var l$0 = l, n$0 = n;
        for (; ; ) {
          if (!l$0) return 0 === n$0 ? 0 : 0 < n$0 ? -1 : 1;
          var l$1 = l$0[2];
          if (0 >= n$0) return 1;
          var n$1 = n$0 - 1 | 0;
          l$0 = l$1;
          n$0 = n$1;
        }
      }
      function is_empty(param) {
        return param ? 0 : 1;
      }
      function equal(eq, l1, l2) {
        var l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (l1$0) {
            if (l2$0) {
              var l2$1 = l2$0[2], a2 = l2$0[1], l1$1 = l1$0[2], a1 = l1$0[1], _d_ = caml_call2(eq, a1, a2);
              if (!_d_) return _d_;
              l1$0 = l1$1;
              l2$0 = l2$1;
              continue;
            }
          } else if (!l2$0) return 1;
          return 0;
        }
      }
      function compare(cmp, l1, l2) {
        var l1$0 = l1, l2$0 = l2;
        for (; ; ) {
          if (!l1$0) return l2$0 ? -1 : 0;
          var l1$1 = l1$0[2], a1 = l1$0[1];
          if (!l2$0) return 1;
          var l2$1 = l2$0[2], a2 = l2$0[1], c = caml_call2(cmp, a1, a2);
          if (0 !== c) return c;
          l1$0 = l1$1;
          l2$0 = l2$1;
        }
      }
      function to_seq(l) {
        function aux(l2, param) {
          if (!l2) return 0;
          var tail = l2[2], x2 = l2[1];
          return [0, x2, function(_c_) {
            return aux(tail, _c_);
          }];
        }
        return function(_b_) {
          return aux(l, _b_);
        };
      }
      function of_seq(seq) {
        var match = caml_call1(seq, 0);
        if (!match) return 0;
        var seq$0 = match[2], x1 = match[1], match$0 = caml_call1(seq$0, 0);
        if (!match$0) return [0, x1, 0];
        var seq$1 = match$0[2], x2 = match$0[1], block = [0, x2, 24029], dst = block, offset = 1, seq$2 = seq$1;
        for (; ; ) {
          var match$1 = caml_call1(seq$2, 0);
          if (match$1) {
            var seq$3 = match$1[2], x1$0 = match$1[1], match$2 = caml_call1(seq$3, 0);
            if (match$2) {
              var seq$4 = match$2[2], x2$0 = match$2[1], dst$0 = [0, x2$0, 24029];
              dst[1 + offset] = [0, x1$0, dst$0];
              dst = dst$0;
              offset = 1;
              seq$2 = seq$4;
              continue;
            }
            dst[1 + offset] = [0, x1$0, 0];
          } else
            dst[1 + offset] = 0;
          return [0, x1, block];
        }
      }
      var Stdlib_List = [
        0,
        length,
        compare_lengths,
        compare_length_with,
        is_empty,
        cons,
        hd,
        tl,
        nth,
        nth_opt,
        rev,
        init,
        append,
        rev_append,
        flatten,
        flatten,
        equal,
        compare,
        iter,
        iteri,
        map,
        mapi,
        rev_map,
        filter_map,
        concat_map,
        fold_left_map,
        fold_left,
        fold_right,
        iter2,
        map2,
        rev_map2,
        fold_left2,
        fold_right2,
        for_all,
        exists,
        for_all2,
        exists2,
        mem,
        memq,
        find,
        find_opt,
        find_index,
        find_map,
        find_mapi,
        find_all,
        find_all,
        filteri,
        take,
        drop,
        take_while,
        drop_while,
        partition,
        partition_map,
        assoc,
        assoc_opt,
        assq,
        assq_opt,
        mem_assoc,
        mem_assq,
        remove_assoc,
        remove_assq,
        split,
        combine,
        stable_sort,
        stable_sort,
        stable_sort,
        sort_uniq,
        merge,
        to_seq,
        of_seq
      ];
      runtime.caml_register_global(19, Stdlib_List, "Stdlib__List");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_hash2 = runtime.caml_hash;
      function abs(x2) {
        return 0 <= x2 ? x2 : -x2 | 0;
      }
      function lognot(x2) {
        return x2 ^ -1;
      }
      function equal(_b_, _a_) {
        return _b_ === _a_ ? 1 : 0;
      }
      var compare = runtime.caml_int_compare;
      function min(x2, y) {
        return x2 <= y ? x2 : y;
      }
      function max(x2, y) {
        return y <= x2 ? x2 : y;
      }
      function to_string(x2) {
        return "" + x2;
      }
      function seeded_hash(seed, x2) {
        return caml_hash2(10, 100, seed, x2);
      }
      function hash(x2) {
        return caml_hash2(10, 100, 0, x2);
      }
      var Stdlib_Int = [
        0,
        0,
        1,
        -1,
        abs,
        2147483647,
        -2147483648,
        lognot,
        equal,
        compare,
        min,
        max,
        to_string,
        seeded_hash,
        hash
      ];
      runtime.caml_register_global(1, Stdlib_Int, "Stdlib__Int");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_bytes_ml = "bytes.ml", cst_index_out_of_bounds$3 = "index out of bounds", caml_blit_bytes2 = runtime.caml_blit_bytes, caml_bswap162 = runtime.caml_bswap16, caml_bytes_get2 = runtime.caml_bytes_get, caml_bytes_get162 = runtime.caml_bytes_get16, caml_bytes_get322 = runtime.caml_bytes_get32, caml_bytes_get642 = runtime.caml_bytes_get64, caml_bytes_of_string2 = runtime.caml_bytes_of_string, caml_bytes_set2 = runtime.caml_bytes_set, caml_bytes_set162 = runtime.caml_bytes_set16, caml_bytes_set322 = runtime.caml_bytes_set32, caml_bytes_set642 = runtime.caml_bytes_set64, caml_bytes_unsafe_get2 = runtime.caml_bytes_unsafe_get, caml_bytes_unsafe_set2 = runtime.caml_bytes_unsafe_set, caml_create_bytes2 = runtime.caml_create_bytes, caml_fill_bytes2 = runtime.caml_fill_bytes, caml_int32_bswap2 = runtime.caml_int32_bswap, caml_int64_bswap2 = runtime.caml_int64_bswap, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_bytes_length2 = runtime.caml_ml_bytes_length, caml_string_of_bytes2 = runtime.caml_string_of_bytes, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      var dummy = 0, global_data = runtime.caml_get_global_data(), Stdlib = global_data.Stdlib, Stdlib_Uchar = global_data.Stdlib__Uchar, Assert_failure = global_data.Assert_failure, Stdlib_Sys = global_data.Stdlib__Sys, Stdlib_Int = global_data.Stdlib__Int, Stdlib_Seq = global_data.Stdlib__Seq, Stdlib_Char = global_data.Stdlib__Char;
      function make(n, c) {
        var s2 = caml_create_bytes2(n);
        caml_fill_bytes2(s2, 0, n, c);
        return s2;
      }
      function init(n, f) {
        var s2 = caml_create_bytes2(n), _ap_ = n - 1 | 0, _ao_ = 0;
        if (_ap_ >= 0) {
          var i = _ao_;
          for (; ; ) {
            caml_bytes_unsafe_set2(s2, i, caml_call1(f, i));
            var _aq_ = i + 1 | 0;
            if (_ap_ === i) break;
            i = _aq_;
          }
        }
        return s2;
      }
      var empty = caml_create_bytes2(0), cst_String_sub_Bytes_sub = "String.sub / Bytes.sub", cst_Bytes_extend = "Bytes.extend", cst_String_fill_Bytes_fill = "String.fill / Bytes.fill", cst_Bytes_blit = "Bytes.blit", cst_String_blit_Bytes_blit_str = "String.blit / Bytes.blit_string", cst_Bytes_concat = "Bytes.concat", cst_String_index_from_Bytes_in = "String.index_from / Bytes.index_from", cst_String_index_from_opt_Byte = "String.index_from_opt / Bytes.index_from_opt", cst_String_rindex_from_Bytes_r = "String.rindex_from / Bytes.rindex_from", cst_String_rindex_from_opt_Byt = "String.rindex_from_opt / Bytes.rindex_from_opt", cst_String_contains_from_Bytes = "String.contains_from / Bytes.contains_from", cst_String_rcontains_from_Byte = "String.rcontains_from / Bytes.rcontains_from";
      function copy(s2) {
        var len = caml_ml_bytes_length2(s2), r = caml_create_bytes2(len);
        caml_blit_bytes2(s2, 0, r, 0, len);
        return r;
      }
      function to_string(b) {
        return caml_string_of_bytes2(copy(b));
      }
      function of_string(s2) {
        return copy(caml_bytes_of_string2(s2));
      }
      function sub(s2, ofs, len) {
        if (0 <= ofs && 0 <= len && (caml_ml_bytes_length2(s2) - len | 0) >= ofs) {
          var r = caml_create_bytes2(len);
          caml_blit_bytes2(s2, ofs, r, 0, len);
          return r;
        }
        return caml_call1(Stdlib[1], cst_String_sub_Bytes_sub);
      }
      function sub_string(b, ofs, len) {
        return caml_string_of_bytes2(sub(b, ofs, len));
      }
      function symbol(a, b) {
        var c = a + b | 0, _an_ = b < 0 ? 1 : 0, match = c < 0 ? 1 : 0;
        a: {
          if (a < 0) {
            if (_an_ && !match) break a;
          } else if (!_an_ && match) break a;
          return c;
        }
        return caml_call1(Stdlib[1], cst_Bytes_extend);
      }
      function extend(s2, left, right) {
        var len = symbol(symbol(caml_ml_bytes_length2(s2), left), right), r = caml_create_bytes2(len);
        if (0 <= left)
          var dstoff = left, srcoff = 0;
        else
          var dstoff = 0, srcoff = -left | 0;
        var cpylen = caml_call2(
          Stdlib_Int[10],
          caml_ml_bytes_length2(s2) - srcoff | 0,
          len - dstoff | 0
        );
        if (0 < cpylen) caml_blit_bytes2(s2, srcoff, r, dstoff, cpylen);
        return r;
      }
      function fill(s2, ofs, len, c) {
        if (0 <= ofs && 0 <= len && (caml_ml_bytes_length2(s2) - len | 0) >= ofs)
          return caml_fill_bytes2(s2, ofs, len, c);
        return caml_call1(Stdlib[1], cst_String_fill_Bytes_fill);
      }
      function blit(s1, ofs1, s2, ofs2, len) {
        if (0 <= len && 0 <= ofs1 && (caml_ml_bytes_length2(s1) - len | 0) >= ofs1 && 0 <= ofs2 && (caml_ml_bytes_length2(s2) - len | 0) >= ofs2)
          return caml_blit_bytes2(s1, ofs1, s2, ofs2, len);
        return caml_call1(Stdlib[1], cst_Bytes_blit);
      }
      function blit_string(s1, ofs1, s2, ofs2, len) {
        if (0 <= len && 0 <= ofs1 && (runtime.caml_ml_string_length(s1) - len | 0) >= ofs1 && 0 <= ofs2 && (caml_ml_bytes_length2(s2) - len | 0) >= ofs2)
          return runtime.caml_blit_string(s1, ofs1, s2, ofs2, len);
        return caml_call1(Stdlib[1], cst_String_blit_Bytes_blit_str);
      }
      function iter(f, a) {
        var _al_ = caml_ml_bytes_length2(a) - 1 | 0, _ak_ = 0;
        if (_al_ >= 0) {
          var i = _ak_;
          for (; ; ) {
            caml_call1(f, caml_bytes_unsafe_get2(a, i));
            var _am_ = i + 1 | 0;
            if (_al_ === i) break;
            i = _am_;
          }
        }
        return 0;
      }
      function iteri(f, a) {
        var _ai_ = caml_ml_bytes_length2(a) - 1 | 0, _ah_ = 0;
        if (_ai_ >= 0) {
          var i = _ah_;
          for (; ; ) {
            caml_call2(f, i, caml_bytes_unsafe_get2(a, i));
            var _aj_ = i + 1 | 0;
            if (_ai_ === i) break;
            i = _aj_;
          }
        }
        return 0;
      }
      function concat(sep, l) {
        if (!l) return empty;
        var seplen = caml_ml_bytes_length2(sep);
        a: {
          b: {
            var acc = 0, param = l, pos$1 = 0;
            for (; ; ) {
              if (!param) break;
              var hd = param[1];
              if (!param[2]) break b;
              var tl = param[2], x2 = (caml_ml_bytes_length2(hd) + seplen | 0) + acc | 0, acc$0 = acc <= x2 ? x2 : caml_call1(Stdlib[1], cst_Bytes_concat);
              acc = acc$0;
              param = tl;
            }
            var _ag_ = acc;
            break a;
          }
          var _ag_ = caml_ml_bytes_length2(hd) + acc | 0;
        }
        var dst = caml_create_bytes2(_ag_), pos = pos$1, param$0 = l;
        for (; ; ) {
          if (!param$0) return dst;
          var hd$0 = param$0[1];
          if (!param$0[2]) {
            caml_blit_bytes2(hd$0, 0, dst, pos, caml_ml_bytes_length2(hd$0));
            return dst;
          }
          var tl$0 = param$0[2];
          caml_blit_bytes2(hd$0, 0, dst, pos, caml_ml_bytes_length2(hd$0));
          caml_blit_bytes2(sep, 0, dst, pos + caml_ml_bytes_length2(hd$0) | 0, seplen);
          var pos$0 = (pos + caml_ml_bytes_length2(hd$0) | 0) + seplen | 0;
          pos = pos$0;
          param$0 = tl$0;
        }
      }
      function cat(s1, s2) {
        var l1 = caml_ml_bytes_length2(s1), l2 = caml_ml_bytes_length2(s2), r = caml_create_bytes2(l1 + l2 | 0);
        caml_blit_bytes2(s1, 0, r, 0, l1);
        caml_blit_bytes2(s2, 0, r, l1, l2);
        return r;
      }
      function is_space(param) {
        var _af_ = param - 9 | 0;
        a: {
          if (4 < _af_ >>> 0) {
            if (23 !== _af_) break a;
          } else if (2 === _af_) break a;
          return 1;
        }
        return 0;
      }
      function trim(s2) {
        var len = caml_ml_bytes_length2(s2), i = [0, 0];
        for (; ; ) {
          if (i[1] >= len) break;
          if (!is_space(caml_bytes_unsafe_get2(s2, i[1]))) break;
          i[1]++;
        }
        var j = [0, len - 1 | 0];
        for (; ; ) {
          if (i[1] <= j[1] && is_space(caml_bytes_unsafe_get2(s2, j[1]))) {
            j[1]--;
            continue;
          }
          return i[1] <= j[1] ? sub(s2, i[1], (j[1] - i[1] | 0) + 1 | 0) : empty;
        }
      }
      function unsafe_escape(s2) {
        var n = [0, 0], ___ = caml_ml_bytes_length2(s2) - 1 | 0, _Z_ = 0;
        if (___ >= 0) {
          var i$0 = _Z_;
          for (; ; ) {
            var match = caml_bytes_unsafe_get2(s2, i$0);
            a: {
              b: {
                c: {
                  if (32 <= match) {
                    var _ac_ = match - 34 | 0;
                    if (58 < _ac_ >>> 0) {
                      if (93 <= _ac_) break c;
                    } else if (56 < _ac_ - 1 >>> 0) break b;
                    var _ad_ = 1;
                    break a;
                  }
                  if (11 <= match) {
                    if (13 === match) break b;
                  } else if (8 <= match) break b;
                }
                var _ad_ = 4;
                break a;
              }
              var _ad_ = 2;
            }
            n[1] = n[1] + _ad_ | 0;
            var _ae_ = i$0 + 1 | 0;
            if (___ === i$0) break;
            i$0 = _ae_;
          }
        }
        if (n[1] === caml_ml_bytes_length2(s2)) return s2;
        var s$0 = caml_create_bytes2(n[1]);
        n[1] = 0;
        var _aa_ = caml_ml_bytes_length2(s2) - 1 | 0, _$_ = 0;
        if (_aa_ >= 0) {
          var i = _$_;
          for (; ; ) {
            var c = caml_bytes_unsafe_get2(s2, i);
            a: {
              b: {
                c: {
                  if (35 <= c) {
                    if (92 !== c) {
                      if (127 <= c) break c;
                      break b;
                    }
                  } else {
                    if (32 > c) {
                      if (14 <= c) break c;
                      switch (c) {
                        case 8:
                          caml_bytes_unsafe_set2(s$0, n[1], 92);
                          n[1]++;
                          caml_bytes_unsafe_set2(s$0, n[1], 98);
                          break a;
                        case 9:
                          caml_bytes_unsafe_set2(s$0, n[1], 92);
                          n[1]++;
                          caml_bytes_unsafe_set2(s$0, n[1], 116);
                          break a;
                        case 10:
                          caml_bytes_unsafe_set2(s$0, n[1], 92);
                          n[1]++;
                          caml_bytes_unsafe_set2(s$0, n[1], 110);
                          break a;
                        case 13:
                          caml_bytes_unsafe_set2(s$0, n[1], 92);
                          n[1]++;
                          caml_bytes_unsafe_set2(s$0, n[1], 114);
                          break a;
                        default:
                          break c;
                      }
                    }
                    if (34 > c) break b;
                  }
                  caml_bytes_unsafe_set2(s$0, n[1], 92);
                  n[1]++;
                  caml_bytes_unsafe_set2(s$0, n[1], c);
                  break a;
                }
                caml_bytes_unsafe_set2(s$0, n[1], 92);
                n[1]++;
                caml_bytes_unsafe_set2(s$0, n[1], 48 + (c / 100 | 0) | 0);
                n[1]++;
                caml_bytes_unsafe_set2(s$0, n[1], 48 + ((c / 10 | 0) % 10 | 0) | 0);
                n[1]++;
                caml_bytes_unsafe_set2(s$0, n[1], 48 + (c % 10 | 0) | 0);
                break a;
              }
              caml_bytes_unsafe_set2(s$0, n[1], c);
            }
            n[1]++;
            var _ab_ = i + 1 | 0;
            if (_aa_ === i) break;
            i = _ab_;
          }
        }
        return s$0;
      }
      function escaped(b) {
        var b$0 = copy(b);
        return unsafe_escape(b$0);
      }
      function map(f, s2) {
        var l = caml_ml_bytes_length2(s2);
        if (0 === l) return s2;
        var r = caml_create_bytes2(l), _X_ = l - 1 | 0, _W_ = 0;
        if (_X_ >= 0) {
          var i = _W_;
          for (; ; ) {
            caml_bytes_unsafe_set2(r, i, caml_call1(f, caml_bytes_unsafe_get2(s2, i)));
            var _Y_ = i + 1 | 0;
            if (_X_ === i) break;
            i = _Y_;
          }
        }
        return r;
      }
      function mapi(f, s2) {
        var l = caml_ml_bytes_length2(s2);
        if (0 === l) return s2;
        var r = caml_create_bytes2(l), _U_ = l - 1 | 0, _T_2 = 0;
        if (_U_ >= 0) {
          var i = _T_2;
          for (; ; ) {
            caml_bytes_unsafe_set2(r, i, caml_call2(f, i, caml_bytes_unsafe_get2(s2, i)));
            var _V_ = i + 1 | 0;
            if (_U_ === i) break;
            i = _V_;
          }
        }
        return r;
      }
      function fold_left(f, x2, a) {
        var r = [0, x2], _R_ = caml_ml_bytes_length2(a) - 1 | 0, _Q_ = 0;
        if (_R_ >= 0) {
          var i = _Q_;
          for (; ; ) {
            r[1] = caml_call2(f, r[1], caml_bytes_unsafe_get2(a, i));
            var _S_ = i + 1 | 0;
            if (_R_ === i) break;
            i = _S_;
          }
        }
        return r[1];
      }
      function fold_right(f, a, x2) {
        var r = [0, x2], _O_ = caml_ml_bytes_length2(a) - 1 | 0;
        if (_O_ >= 0) {
          var i = _O_;
          for (; ; ) {
            r[1] = caml_call2(f, caml_bytes_unsafe_get2(a, i), r[1]);
            var _P_ = i - 1 | 0;
            if (0 === i) break;
            i = _P_;
          }
        }
        return r[1];
      }
      function exists(p, s2) {
        var n = caml_ml_bytes_length2(s2), i = 0;
        for (; ; ) {
          if (i === n) return 0;
          if (caml_call1(p, caml_bytes_unsafe_get2(s2, i))) return 1;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function for_all(p, s2) {
        var n = caml_ml_bytes_length2(s2), i = 0;
        for (; ; ) {
          if (i === n) return 1;
          if (!caml_call1(p, caml_bytes_unsafe_get2(s2, i))) return 0;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function uppercase_ascii(s2) {
        return map(Stdlib_Char[4], s2);
      }
      function lowercase_ascii(s2) {
        return map(Stdlib_Char[3], s2);
      }
      function apply1(f, s2) {
        if (0 === caml_ml_bytes_length2(s2)) return s2;
        var r = copy(s2);
        caml_bytes_unsafe_set2(r, 0, caml_call1(f, caml_bytes_unsafe_get2(s2, 0)));
        return r;
      }
      function capitalize_ascii(s2) {
        return apply1(Stdlib_Char[4], s2);
      }
      function uncapitalize_ascii(s2) {
        return apply1(Stdlib_Char[3], s2);
      }
      function starts_with(prefix, s2) {
        var len_s = caml_ml_bytes_length2(s2), len_pre = caml_ml_bytes_length2(prefix), _N_ = len_pre <= len_s ? 1 : 0;
        if (!_N_) return _N_;
        var i = 0;
        for (; ; ) {
          if (i === len_pre) return 1;
          if (caml_bytes_unsafe_get2(s2, i) !== caml_bytes_unsafe_get2(prefix, i))
            return 0;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function ends_with(suffix, s2) {
        var len_s = caml_ml_bytes_length2(s2), len_suf = caml_ml_bytes_length2(suffix), diff = len_s - len_suf | 0, _M_ = 0 <= diff ? 1 : 0;
        if (!_M_) return _M_;
        var i = 0;
        for (; ; ) {
          if (i === len_suf) return 1;
          if (caml_bytes_unsafe_get2(s2, diff + i | 0) !== caml_bytes_unsafe_get2(suffix, i))
            return 0;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function index_rec(s2, lim, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (lim <= i$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
          if (caml_bytes_unsafe_get2(s2, i$0) === c) return i$0;
          var i$1 = i$0 + 1 | 0;
          i$0 = i$1;
        }
      }
      function index(s2, c) {
        return index_rec(s2, caml_ml_bytes_length2(s2), 0, c);
      }
      function index_rec_opt(s2, lim, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (lim <= i$0) return 0;
          if (caml_bytes_unsafe_get2(s2, i$0) === c) return [0, i$0];
          var i$1 = i$0 + 1 | 0;
          i$0 = i$1;
        }
      }
      function index_opt(s2, c) {
        return index_rec_opt(s2, caml_ml_bytes_length2(s2), 0, c);
      }
      function index_from(s2, i, c) {
        var l = caml_ml_bytes_length2(s2);
        if (0 <= i && l >= i) return index_rec(s2, l, i, c);
        return caml_call1(Stdlib[1], cst_String_index_from_Bytes_in);
      }
      function index_from_opt(s2, i, c) {
        var l = caml_ml_bytes_length2(s2);
        if (0 <= i && l >= i) return index_rec_opt(s2, l, i, c);
        return caml_call1(Stdlib[1], cst_String_index_from_opt_Byte);
      }
      function rindex_rec(s2, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (0 > i$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
          if (caml_bytes_unsafe_get2(s2, i$0) === c) return i$0;
          var i$1 = i$0 - 1 | 0;
          i$0 = i$1;
        }
      }
      function rindex(s2, c) {
        return rindex_rec(s2, caml_ml_bytes_length2(s2) - 1 | 0, c);
      }
      function rindex_from(s2, i, c) {
        if (-1 <= i && caml_ml_bytes_length2(s2) > i) return rindex_rec(s2, i, c);
        return caml_call1(Stdlib[1], cst_String_rindex_from_Bytes_r);
      }
      function rindex_rec_opt(s2, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (0 > i$0) return 0;
          if (caml_bytes_unsafe_get2(s2, i$0) === c) return [0, i$0];
          var i$1 = i$0 - 1 | 0;
          i$0 = i$1;
        }
      }
      function rindex_opt(s2, c) {
        return rindex_rec_opt(s2, caml_ml_bytes_length2(s2) - 1 | 0, c);
      }
      function rindex_from_opt(s2, i, c) {
        if (-1 <= i && caml_ml_bytes_length2(s2) > i) return rindex_rec_opt(s2, i, c);
        return caml_call1(Stdlib[1], cst_String_rindex_from_opt_Byt);
      }
      function contains_from(s2, i, c) {
        var l = caml_ml_bytes_length2(s2);
        if (0 <= i && l >= i)
          try {
            index_rec(s2, l, i, c);
            var _K_ = 1;
            return _K_;
          } catch (_L_) {
            var _J_ = caml_wrap_exception2(_L_);
            if (_J_ === Stdlib[8]) return 0;
            throw caml_maybe_attach_backtrace2(_J_, 0);
          }
        return caml_call1(Stdlib[1], cst_String_contains_from_Bytes);
      }
      function contains(s2, c) {
        return contains_from(s2, 0, c);
      }
      function rcontains_from(s2, i, c) {
        if (0 <= i && caml_ml_bytes_length2(s2) > i)
          try {
            rindex_rec(s2, i, c);
            var _H_ = 1;
            return _H_;
          } catch (_I_) {
            var _G_ = caml_wrap_exception2(_I_);
            if (_G_ === Stdlib[8]) return 0;
            throw caml_maybe_attach_backtrace2(_G_, 0);
          }
        return caml_call1(Stdlib[1], cst_String_rcontains_from_Byte);
      }
      var compare = runtime.caml_bytes_compare, cst_Bytes_of_seq_cannot_grow_b = "Bytes.of_seq: cannot grow bytes";
      function split_on_char(sep, s2) {
        var r = [0, 0], j = [0, caml_ml_bytes_length2(s2)], _C_ = caml_ml_bytes_length2(s2) - 1 | 0;
        if (_C_ >= 0) {
          var i = _C_;
          for (; ; ) {
            if (caml_bytes_unsafe_get2(s2, i) === sep) {
              var _E_ = r[1];
              r[1] = [0, sub(s2, i + 1 | 0, (j[1] - i | 0) - 1 | 0), _E_];
              j[1] = i;
            }
            var _F_ = i - 1 | 0;
            if (0 === i) break;
            i = _F_;
          }
        }
        var _D_ = r[1];
        return [0, sub(s2, 0, j[1]), _D_];
      }
      function to_seq(s2) {
        function aux(i, param) {
          if (i === caml_ml_bytes_length2(s2)) return 0;
          var x2 = caml_bytes_get2(s2, i), _A_ = i + 1 | 0;
          return [0, x2, function(_B_) {
            return aux(_A_, _B_);
          }];
        }
        var _y_ = 0;
        return function(_z_) {
          return aux(_y_, _z_);
        };
      }
      function to_seqi(s2) {
        function aux(i, param) {
          if (i === caml_ml_bytes_length2(s2)) return 0;
          var x2 = caml_bytes_get2(s2, i), _w_ = i + 1 | 0;
          return [0, [0, i, x2], function(_x_) {
            return aux(_w_, _x_);
          }];
        }
        var _u_ = 0;
        return function(_v_) {
          return aux(_u_, _v_);
        };
      }
      function of_seq(i) {
        var n = [0, 0], buf = [0, make(256, 0)];
        caml_call2(
          Stdlib_Seq[4],
          function(c) {
            if (n[1] === caml_ml_bytes_length2(buf[1])) {
              var new_len = caml_call2(
                Stdlib_Int[10],
                2 * caml_ml_bytes_length2(buf[1]) | 0,
                Stdlib_Sys[12]
              );
              if (caml_ml_bytes_length2(buf[1]) === new_len)
                caml_call1(Stdlib[2], cst_Bytes_of_seq_cannot_grow_b);
              var new_buf = make(new_len, 0);
              blit(buf[1], 0, new_buf, 0, n[1]);
              buf[1] = new_buf;
            }
            caml_bytes_set2(buf[1], n[1], c);
            n[1]++;
            return 0;
          },
          i
        );
        return sub(buf[1], 0, n[1]);
      }
      function unsafe_get_uint16_le(b, i) {
        return Stdlib_Sys[11] ? caml_bswap162(caml_bytes_get162(b, i)) : caml_bytes_get162(b, i);
      }
      function unsafe_get_uint16_be(b, i) {
        return Stdlib_Sys[11] ? caml_bytes_get162(b, i) : caml_bswap162(caml_bytes_get162(b, i));
      }
      function get_int8(b, i) {
        var _s_ = Stdlib_Sys[10] - 8 | 0, _t_ = Stdlib_Sys[10] - 8 | 0;
        return caml_bytes_get2(b, i) << _t_ >> _s_;
      }
      function get_uint16_le(b, i) {
        return Stdlib_Sys[11] ? caml_bswap162(caml_bytes_get162(b, i)) : caml_bytes_get162(b, i);
      }
      function get_uint16_be(b, i) {
        return Stdlib_Sys[11] ? caml_bytes_get162(b, i) : caml_bswap162(caml_bytes_get162(b, i));
      }
      function get_int16_ne(b, i) {
        var _q_ = Stdlib_Sys[10] - 16 | 0, _r_ = Stdlib_Sys[10] - 16 | 0;
        return caml_bytes_get162(b, i) << _r_ >> _q_;
      }
      function get_int16_le(b, i) {
        var _o_ = Stdlib_Sys[10] - 16 | 0, _p_ = Stdlib_Sys[10] - 16 | 0;
        return get_uint16_le(b, i) << _p_ >> _o_;
      }
      function get_int16_be(b, i) {
        var _m_ = Stdlib_Sys[10] - 16 | 0, _n_ = Stdlib_Sys[10] - 16 | 0;
        return get_uint16_be(b, i) << _n_ >> _m_;
      }
      function get_int32_le(b, i) {
        return Stdlib_Sys[11] ? caml_int32_bswap2(caml_bytes_get322(b, i)) : caml_bytes_get322(b, i);
      }
      function get_int32_be(b, i) {
        return Stdlib_Sys[11] ? caml_bytes_get322(b, i) : caml_int32_bswap2(caml_bytes_get322(b, i));
      }
      function get_int64_le(b, i) {
        return Stdlib_Sys[11] ? caml_int64_bswap2(caml_bytes_get642(b, i)) : caml_bytes_get642(b, i);
      }
      function get_int64_be(b, i) {
        return Stdlib_Sys[11] ? caml_bytes_get642(b, i) : caml_int64_bswap2(caml_bytes_get642(b, i));
      }
      function unsafe_set_uint16_le(b, i, x2) {
        if (Stdlib_Sys[11]) {
          caml_bytes_set162(b, i, caml_bswap162(x2));
          return;
        }
        caml_bytes_set162(b, i, x2);
      }
      function unsafe_set_uint16_be(b, i, x2) {
        if (Stdlib_Sys[11]) {
          caml_bytes_set162(b, i, x2);
          return;
        }
        caml_bytes_set162(b, i, caml_bswap162(x2));
      }
      function set_int16_le(b, i, x2) {
        return Stdlib_Sys[11] ? caml_bytes_set162(b, i, caml_bswap162(x2)) : caml_bytes_set162(b, i, x2);
      }
      function set_int16_be(b, i, x2) {
        return Stdlib_Sys[11] ? caml_bytes_set162(b, i, x2) : caml_bytes_set162(b, i, caml_bswap162(x2));
      }
      function set_int32_le(b, i, x2) {
        return Stdlib_Sys[11] ? caml_bytes_set322(b, i, caml_int32_bswap2(x2)) : caml_bytes_set322(b, i, x2);
      }
      function set_int32_be(b, i, x2) {
        return Stdlib_Sys[11] ? caml_bytes_set322(b, i, x2) : caml_bytes_set322(b, i, caml_int32_bswap2(x2));
      }
      function set_int64_le(b, i, x2) {
        return Stdlib_Sys[11] ? caml_bytes_set642(b, i, caml_int64_bswap2(x2)) : caml_bytes_set642(b, i, x2);
      }
      function set_int64_be(b, i, x2) {
        return Stdlib_Sys[11] ? caml_bytes_set642(b, i, x2) : caml_bytes_set642(b, i, caml_int64_bswap2(x2));
      }
      var set_uint8 = caml_bytes_set2, set_uint16_ne = caml_bytes_set162, dec_invalid = Stdlib_Uchar[23], _a_ = [0, cst_bytes_ml, 679, 9], _b_ = [0, cst_bytes_ml, 654, 20], cst_index_out_of_bounds = cst_index_out_of_bounds$3, cst_index_out_of_bounds$0 = cst_index_out_of_bounds$3, _c_ = [0, cst_bytes_ml, 777, 9], _d_ = [0, cst_bytes_ml, 766, 20], cst_index_out_of_bounds$1 = cst_index_out_of_bounds$3, cst_index_out_of_bounds$2 = cst_index_out_of_bounds$3, _e_ = [0, cst_bytes_ml, 831, 9], _f_ = [0, cst_bytes_ml, 820, 20];
      function dec_ret(n, u) {
        var _l_ = caml_call1(Stdlib_Uchar[9], u);
        return caml_call2(Stdlib_Uchar[22], n, _l_);
      }
      function not_in_x80_to_xBF(b) {
        return 2 !== (b >>> 6 | 0) ? 1 : 0;
      }
      function not_in_xA0_to_xBF(b) {
        return 5 !== (b >>> 5 | 0) ? 1 : 0;
      }
      function not_in_x80_to_x9F(b) {
        return 4 !== (b >>> 5 | 0) ? 1 : 0;
      }
      function not_in_x90_to_xBF(b) {
        var _j_ = b < 144 ? 1 : 0, _k_ = _j_ || (191 < b ? 1 : 0);
        return _k_;
      }
      function not_in_x80_to_x8F(b) {
        return 8 !== (b >>> 4 | 0) ? 1 : 0;
      }
      function utf_8_uchar_3(b0, b1, b2) {
        return (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
      }
      function utf_8_uchar_4(b0, b1, b2, b3) {
        return (b0 & 7) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
      }
      function get_utf_8_uchar(b, i) {
        var b0 = caml_bytes_get2(b, i), max = caml_ml_bytes_length2(b) - 1 | 0;
        a: {
          if (224 <= b0) {
            if (237 <= b0) {
              if (245 <= b0) break a;
              switch (b0 - 237 | 0) {
                case 0:
                  var i$0 = i + 1 | 0;
                  if (max < i$0) return caml_call1(dec_invalid, 1);
                  var b1$4 = caml_bytes_unsafe_get2(b, i$0);
                  if (not_in_x80_to_x9F(b1$4)) return caml_call1(dec_invalid, 1);
                  var i$1 = i$0 + 1 | 0;
                  if (max < i$1) return caml_call1(dec_invalid, 2);
                  var b2$3 = caml_bytes_unsafe_get2(b, i$1);
                  return not_in_x80_to_xBF(b2$3) ? caml_call1(dec_invalid, 2) : dec_ret(3, utf_8_uchar_3(b0, b1$4, b2$3));
                case 3:
                  var i$4 = i + 1 | 0;
                  if (max < i$4) return caml_call1(dec_invalid, 1);
                  var b1$2 = caml_bytes_unsafe_get2(b, i$4);
                  if (not_in_x90_to_xBF(b1$2)) return caml_call1(dec_invalid, 1);
                  var i$5 = i$4 + 1 | 0;
                  if (max < i$5) return caml_call1(dec_invalid, 2);
                  var b2$1 = caml_bytes_unsafe_get2(b, i$5);
                  if (not_in_x80_to_xBF(b2$1)) return caml_call1(dec_invalid, 2);
                  var i$6 = i$5 + 1 | 0;
                  if (max < i$6) return caml_call1(dec_invalid, 3);
                  var b3$1 = caml_bytes_unsafe_get2(b, i$6);
                  return not_in_x80_to_xBF(b3$1) ? caml_call1(dec_invalid, 3) : dec_ret(4, utf_8_uchar_4(b0, b1$2, b2$1, b3$1));
                case 7:
                  var i$10 = i + 1 | 0;
                  if (max < i$10) return caml_call1(dec_invalid, 1);
                  var b1$0 = caml_bytes_unsafe_get2(b, i$10);
                  if (not_in_x80_to_x8F(b1$0)) return caml_call1(dec_invalid, 1);
                  var i$11 = i$10 + 1 | 0;
                  if (max < i$11) return caml_call1(dec_invalid, 2);
                  var b2 = caml_bytes_unsafe_get2(b, i$11);
                  if (not_in_x80_to_xBF(b2)) return caml_call1(dec_invalid, 2);
                  var i$12 = i$11 + 1 | 0;
                  if (max < i$12) return caml_call1(dec_invalid, 3);
                  var b3 = caml_bytes_unsafe_get2(b, i$12);
                  return not_in_x80_to_xBF(b3) ? caml_call1(dec_invalid, 3) : dec_ret(4, utf_8_uchar_4(b0, b1$0, b2, b3));
                case 1:
                case 2:
                  break;
                default:
                  var i$7 = i + 1 | 0;
                  if (max < i$7) return caml_call1(dec_invalid, 1);
                  var b1$1 = caml_bytes_unsafe_get2(b, i$7);
                  if (not_in_x80_to_xBF(b1$1)) return caml_call1(dec_invalid, 1);
                  var i$8 = i$7 + 1 | 0;
                  if (max < i$8) return caml_call1(dec_invalid, 2);
                  var b2$0 = caml_bytes_unsafe_get2(b, i$8);
                  if (not_in_x80_to_xBF(b2$0)) return caml_call1(dec_invalid, 2);
                  var i$9 = i$8 + 1 | 0;
                  if (max < i$9) return caml_call1(dec_invalid, 3);
                  var b3$0 = caml_bytes_unsafe_get2(b, i$9);
                  return not_in_x80_to_xBF(b3$0) ? caml_call1(dec_invalid, 3) : dec_ret(4, utf_8_uchar_4(b0, b1$1, b2$0, b3$0));
              }
            } else if (225 > b0) {
              var i$13 = i + 1 | 0;
              if (max < i$13) return caml_call1(dec_invalid, 1);
              var b1$5 = caml_bytes_unsafe_get2(b, i$13);
              if (not_in_xA0_to_xBF(b1$5)) return caml_call1(dec_invalid, 1);
              var i$14 = i$13 + 1 | 0;
              if (max < i$14) return caml_call1(dec_invalid, 2);
              var b2$4 = caml_bytes_unsafe_get2(b, i$14);
              return not_in_x80_to_xBF(b2$4) ? caml_call1(dec_invalid, 2) : dec_ret(3, utf_8_uchar_3(b0, b1$5, b2$4));
            }
            var i$2 = i + 1 | 0;
            if (max < i$2) return caml_call1(dec_invalid, 1);
            var b1$3 = caml_bytes_unsafe_get2(b, i$2);
            if (not_in_x80_to_xBF(b1$3)) return caml_call1(dec_invalid, 1);
            var i$3 = i$2 + 1 | 0;
            if (max < i$3) return caml_call1(dec_invalid, 2);
            var b2$2 = caml_bytes_unsafe_get2(b, i$3);
            return not_in_x80_to_xBF(b2$2) ? caml_call1(dec_invalid, 2) : dec_ret(3, utf_8_uchar_3(b0, b1$3, b2$2));
          }
          if (128 > b0) return dec_ret(1, b0);
          if (194 <= b0) {
            var i$15 = i + 1 | 0;
            if (max < i$15) return caml_call1(dec_invalid, 1);
            var b1 = caml_bytes_unsafe_get2(b, i$15);
            return not_in_x80_to_xBF(b1) ? caml_call1(dec_invalid, 1) : dec_ret(2, (b0 & 31) << 6 | b1 & 63);
          }
        }
        return caml_call1(dec_invalid, 1);
      }
      function set_utf_8_uchar(b, i, u) {
        function set(_i_, _h_, _g_) {
          caml_bytes_unsafe_set2(_i_, _h_, _g_);
        }
        var max = caml_ml_bytes_length2(b) - 1 | 0, u$0 = caml_call1(Stdlib_Uchar[10], u);
        if (0 > u$0)
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _b_], 1);
        if (127 >= u$0) {
          caml_bytes_set2(b, i, u$0);
          return 1;
        }
        if (2047 >= u$0) {
          var last$1 = i + 1 | 0;
          return max < last$1 ? 0 : (caml_bytes_set2(b, i, 192 | u$0 >>> 6 | 0), set(b, last$1, 128 | u$0 & 63), 2);
        }
        if (65535 >= u$0) {
          var last$0 = i + 2 | 0;
          return max < last$0 ? 0 : (caml_bytes_set2(b, i, 224 | u$0 >>> 12 | 0), set(b, i + 1 | 0, 128 | (u$0 >>> 6 | 0) & 63), set(b, last$0, 128 | u$0 & 63), 3);
        }
        if (1114111 < u$0)
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
        var last = i + 3 | 0;
        return max < last ? 0 : (caml_bytes_set2(b, i, 240 | u$0 >>> 18 | 0), set(b, i + 1 | 0, 128 | (u$0 >>> 12 | 0) & 63), set(b, i + 2 | 0, 128 | (u$0 >>> 6 | 0) & 63), set(b, last, 128 | u$0 & 63), 4);
      }
      function is_valid_utf_8(b) {
        var max = caml_ml_bytes_length2(b) - 1 | 0, i = 0;
        for (; ; ) {
          if (max < i) return 1;
          var match = caml_bytes_unsafe_get2(b, i);
          a: {
            if (224 <= match) {
              if (237 <= match) {
                if (245 <= match) break a;
                switch (match - 237 | 0) {
                  case 0:
                    var last = i + 2 | 0;
                    if (max >= last && !not_in_x80_to_x9F(caml_bytes_unsafe_get2(b, i + 1 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, last))) {
                      var i$0 = last + 1 | 0;
                      i = i$0;
                      continue;
                    }
                    return 0;
                  case 3:
                    var last$1 = i + 3 | 0;
                    if (max >= last$1 && !not_in_x90_to_xBF(caml_bytes_unsafe_get2(b, i + 1 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, i + 2 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, last$1))) {
                      var i$2 = last$1 + 1 | 0;
                      i = i$2;
                      continue;
                    }
                    return 0;
                  case 7:
                    var last$3 = i + 3 | 0;
                    if (max >= last$3 && !not_in_x80_to_x8F(caml_bytes_unsafe_get2(b, i + 1 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, i + 2 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, last$3))) {
                      var i$4 = last$3 + 1 | 0;
                      i = i$4;
                      continue;
                    }
                    return 0;
                  case 1:
                  case 2:
                    break;
                  default:
                    var last$2 = i + 3 | 0;
                    if (max >= last$2 && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, i + 1 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, i + 2 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, last$2))) {
                      var i$3 = last$2 + 1 | 0;
                      i = i$3;
                      continue;
                    }
                    return 0;
                }
              } else if (225 > match) {
                var last$4 = i + 2 | 0;
                if (max >= last$4 && !not_in_xA0_to_xBF(caml_bytes_unsafe_get2(b, i + 1 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, last$4))) {
                  var i$5 = last$4 + 1 | 0;
                  i = i$5;
                  continue;
                }
                return 0;
              }
              var last$0 = i + 2 | 0;
              if (max >= last$0 && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, i + 1 | 0)) && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, last$0))) {
                var i$1 = last$0 + 1 | 0;
                i = i$1;
                continue;
              }
              return 0;
            }
            if (128 > match) {
              var i$7 = i + 1 | 0;
              i = i$7;
              continue;
            }
            if (194 <= match) {
              var last$5 = i + 1 | 0;
              if (max >= last$5 && !not_in_x80_to_xBF(caml_bytes_unsafe_get2(b, last$5))) {
                var i$6 = last$5 + 1 | 0;
                i = i$6;
                continue;
              }
              return 0;
            }
          }
          return 0;
        }
      }
      function get_utf_16be_uchar(b, i) {
        var max = caml_ml_bytes_length2(b) - 1 | 0;
        if (0 <= i && max >= i) {
          if (i === max) return caml_call1(dec_invalid, 1);
          var hi = unsafe_get_uint16_be(b, i);
          if (55296 <= hi && 57343 >= hi) {
            if (56319 < hi) return caml_call1(dec_invalid, 2);
            var last = i + 3 | 0;
            if (max < last) return caml_call1(dec_invalid, (max - i | 0) + 1 | 0);
            var lo = unsafe_get_uint16_be(b, i + 2 | 0);
            if (56320 <= lo && 57343 >= lo) {
              var u = ((hi & 1023) << 10 | lo & 1023) + 65536 | 0;
              return dec_ret(4, u);
            }
            return caml_call1(dec_invalid, 2);
          }
          return dec_ret(2, hi);
        }
        return caml_call1(Stdlib[1], cst_index_out_of_bounds);
      }
      function set_utf_16be_uchar(b, i, u) {
        var max = caml_ml_bytes_length2(b) - 1 | 0;
        if (0 <= i && max >= i) {
          var u$0 = caml_call1(Stdlib_Uchar[10], u);
          if (0 > u$0)
            throw caml_maybe_attach_backtrace2([0, Assert_failure, _d_], 1);
          if (65535 >= u$0) {
            var last$0 = i + 1 | 0;
            return max < last$0 ? 0 : (unsafe_set_uint16_be(b, i, u$0), 2);
          }
          if (1114111 < u$0)
            throw caml_maybe_attach_backtrace2([0, Assert_failure, _c_], 1);
          var last = i + 3 | 0;
          if (max < last) return 0;
          var u$1 = u$0 - 65536 | 0, hi = 55296 | u$1 >>> 10 | 0, lo = 56320 | u$1 & 1023;
          unsafe_set_uint16_be(b, i, hi);
          unsafe_set_uint16_be(b, i + 2 | 0, lo);
          return 4;
        }
        return caml_call1(Stdlib[1], cst_index_out_of_bounds$0);
      }
      function is_valid_utf_16be(b) {
        var max = caml_ml_bytes_length2(b) - 1 | 0, i = 0;
        for (; ; ) {
          if (max < i) return 1;
          if (i === max) return 0;
          var u = unsafe_get_uint16_be(b, i);
          if (55296 <= u && 57343 >= u) {
            if (56319 < u) return 0;
            var last = i + 3 | 0;
            if (max < last) return 0;
            var u$0 = unsafe_get_uint16_be(b, i + 2 | 0);
            if (56320 <= u$0 && 57343 >= u$0) {
              var i$1 = i + 4 | 0;
              i = i$1;
              continue;
            }
            return 0;
          }
          var i$0 = i + 2 | 0;
          i = i$0;
        }
      }
      function get_utf_16le_uchar(b, i) {
        var max = caml_ml_bytes_length2(b) - 1 | 0;
        if (0 <= i && max >= i) {
          if (i === max) return caml_call1(dec_invalid, 1);
          var hi = unsafe_get_uint16_le(b, i);
          if (55296 <= hi && 57343 >= hi) {
            if (56319 < hi) return caml_call1(dec_invalid, 2);
            var last = i + 3 | 0;
            if (max < last) return caml_call1(dec_invalid, (max - i | 0) + 1 | 0);
            var lo = unsafe_get_uint16_le(b, i + 2 | 0);
            if (56320 <= lo && 57343 >= lo) {
              var u = ((hi & 1023) << 10 | lo & 1023) + 65536 | 0;
              return dec_ret(4, u);
            }
            return caml_call1(dec_invalid, 2);
          }
          return dec_ret(2, hi);
        }
        return caml_call1(Stdlib[1], cst_index_out_of_bounds$1);
      }
      function set_utf_16le_uchar(b, i, u) {
        var max = caml_ml_bytes_length2(b) - 1 | 0;
        if (0 <= i && max >= i) {
          var u$0 = caml_call1(Stdlib_Uchar[10], u);
          if (0 > u$0)
            throw caml_maybe_attach_backtrace2([0, Assert_failure, _f_], 1);
          if (65535 >= u$0) {
            var last$0 = i + 1 | 0;
            return max < last$0 ? 0 : (unsafe_set_uint16_le(b, i, u$0), 2);
          }
          if (1114111 < u$0)
            throw caml_maybe_attach_backtrace2([0, Assert_failure, _e_], 1);
          var last = i + 3 | 0;
          if (max < last) return 0;
          var u$1 = u$0 - 65536 | 0, hi = 55296 | u$1 >>> 10 | 0, lo = 56320 | u$1 & 1023;
          unsafe_set_uint16_le(b, i, hi);
          unsafe_set_uint16_le(b, i + 2 | 0, lo);
          return 4;
        }
        return caml_call1(Stdlib[1], cst_index_out_of_bounds$2);
      }
      function is_valid_utf_16le(b) {
        var max = caml_ml_bytes_length2(b) - 1 | 0, i = 0;
        for (; ; ) {
          if (max < i) return 1;
          if (i === max) return 0;
          var u = unsafe_get_uint16_le(b, i);
          if (55296 <= u && 57343 >= u) {
            if (56319 < u) return 0;
            var last = i + 3 | 0;
            if (max < last) return 0;
            var u$0 = unsafe_get_uint16_le(b, i + 2 | 0);
            if (56320 <= u$0 && 57343 >= u$0) {
              var i$1 = i + 4 | 0;
              i = i$1;
              continue;
            }
            return 0;
          }
          var i$0 = i + 2 | 0;
          i = i$0;
        }
      }
      var Stdlib_Bytes = [
        0,
        make,
        init,
        empty,
        copy,
        of_string,
        to_string,
        sub,
        sub_string,
        extend,
        fill,
        blit,
        blit_string,
        concat,
        cat,
        iter,
        iteri,
        map,
        mapi,
        fold_left,
        fold_right,
        for_all,
        exists,
        trim,
        escaped,
        index,
        index_opt,
        rindex,
        rindex_opt,
        index_from,
        index_from_opt,
        rindex_from,
        rindex_from_opt,
        contains,
        contains_from,
        rcontains_from,
        uppercase_ascii,
        lowercase_ascii,
        capitalize_ascii,
        uncapitalize_ascii,
        compare,
        runtime.caml_bytes_equal,
        starts_with,
        ends_with,
        caml_string_of_bytes2,
        caml_bytes_of_string2,
        split_on_char,
        to_seq,
        to_seqi,
        of_seq,
        get_utf_8_uchar,
        set_utf_8_uchar,
        is_valid_utf_8,
        get_utf_16be_uchar,
        set_utf_16be_uchar,
        is_valid_utf_16be,
        get_utf_16le_uchar,
        set_utf_16le_uchar,
        is_valid_utf_16le,
        caml_bytes_get2,
        get_int8,
        caml_bytes_get162,
        get_uint16_be,
        get_uint16_le,
        get_int16_ne,
        get_int16_be,
        get_int16_le,
        caml_bytes_get322,
        get_int32_be,
        get_int32_le,
        caml_bytes_get642,
        get_int64_be,
        get_int64_le,
        set_uint8,
        caml_bytes_set2,
        set_uint16_ne,
        set_int16_be,
        set_int16_le,
        caml_bytes_set162,
        set_int16_be,
        set_int16_le,
        caml_bytes_set322,
        set_int32_be,
        set_int32_le,
        caml_bytes_set642,
        set_int64_be,
        set_int64_le,
        unsafe_escape
      ];
      runtime.caml_register_global(30, Stdlib_Bytes, "Stdlib__Bytes");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst$0 = "", caml_blit_string2 = runtime.caml_blit_string, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_string_length2 = runtime.caml_ml_string_length, caml_string_equal2 = runtime.caml_string_equal, caml_string_hash2 = runtime.caml_string_hash, caml_string_unsafe_get2 = runtime.caml_string_unsafe_get, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), cst = cst$0, empty = cst$0, Stdlib = global_data.Stdlib, Stdlib_Bytes = global_data.Stdlib__Bytes, bts = Stdlib_Bytes[44], bos = Stdlib_Bytes[45];
      function make(n, c) {
        return caml_call1(bts, caml_call2(Stdlib_Bytes[1], n, c));
      }
      function init(n, f) {
        return caml_call1(bts, caml_call2(Stdlib_Bytes[2], n, f));
      }
      var of_bytes = Stdlib_Bytes[6], to_bytes = Stdlib_Bytes[5];
      function sub(s2, ofs, len) {
        var _X_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call3(Stdlib_Bytes[7], _X_, ofs, len));
      }
      var blit = Stdlib_Bytes[12], cst_String_concat = "String.concat";
      function concat(sep, l) {
        if (!l) return cst;
        var seplen = caml_ml_string_length2(sep);
        a: {
          b: {
            var acc = 0, param = l, pos$1 = 0;
            for (; ; ) {
              if (!param) break;
              var hd = param[1];
              if (!param[2]) break b;
              var tl = param[2], x2 = (caml_ml_string_length2(hd) + seplen | 0) + acc | 0, acc$0 = acc <= x2 ? x2 : caml_call1(Stdlib[1], cst_String_concat);
              acc = acc$0;
              param = tl;
            }
            var _W_ = acc;
            break a;
          }
          var _W_ = caml_ml_string_length2(hd) + acc | 0;
        }
        var dst = runtime.caml_create_bytes(_W_), pos = pos$1, param$0 = l;
        for (; ; ) {
          if (param$0) {
            var hd$0 = param$0[1];
            if (param$0[2]) {
              var tl$0 = param$0[2];
              caml_blit_string2(hd$0, 0, dst, pos, caml_ml_string_length2(hd$0));
              caml_blit_string2(sep, 0, dst, pos + caml_ml_string_length2(hd$0) | 0, seplen);
              var pos$0 = (pos + caml_ml_string_length2(hd$0) | 0) + seplen | 0;
              pos = pos$0;
              param$0 = tl$0;
              continue;
            }
            caml_blit_string2(hd$0, 0, dst, pos, caml_ml_string_length2(hd$0));
          }
          return caml_call1(bts, dst);
        }
      }
      var cat = Stdlib[28], cst_String_index_from_Bytes_in = "String.index_from / Bytes.index_from", cst_String_index_from_opt_Byte = "String.index_from_opt / Bytes.index_from_opt", cst_String_rindex_from_Bytes_r = "String.rindex_from / Bytes.rindex_from", cst_String_rindex_from_opt_Byt = "String.rindex_from_opt / Bytes.rindex_from_opt", cst_String_contains_from_Bytes = "String.contains_from / Bytes.contains_from", cst_String_rcontains_from_Byte = "String.rcontains_from / Bytes.rcontains_from";
      function iter(f, s2) {
        var _U_ = caml_ml_string_length2(s2) - 1 | 0, _T_2 = 0;
        if (_U_ >= 0) {
          var i = _T_2;
          for (; ; ) {
            caml_call1(f, caml_string_unsafe_get2(s2, i));
            var _V_ = i + 1 | 0;
            if (_U_ === i) break;
            i = _V_;
          }
        }
        return 0;
      }
      function iteri(f, s2) {
        var _R_ = caml_ml_string_length2(s2) - 1 | 0, _Q_ = 0;
        if (_R_ >= 0) {
          var i = _Q_;
          for (; ; ) {
            caml_call2(f, i, caml_string_unsafe_get2(s2, i));
            var _S_ = i + 1 | 0;
            if (_R_ === i) break;
            i = _S_;
          }
        }
        return 0;
      }
      function map(f, s2) {
        var _P_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call2(Stdlib_Bytes[17], f, _P_));
      }
      function mapi(f, s2) {
        var _O_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call2(Stdlib_Bytes[18], f, _O_));
      }
      function fold_right(f, x2, a) {
        var _N_ = caml_call1(bos, x2);
        return caml_call3(Stdlib_Bytes[20], f, _N_, a);
      }
      function fold_left(f, a, x2) {
        var _M_ = caml_call1(bos, x2);
        return caml_call3(Stdlib_Bytes[19], f, a, _M_);
      }
      function exists(f, s2) {
        var _L_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[22], f, _L_);
      }
      function for_all(f, s2) {
        var _K_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[21], f, _K_);
      }
      function is_space(param) {
        var _J_ = param - 9 | 0;
        a: {
          if (4 < _J_ >>> 0) {
            if (23 !== _J_) break a;
          } else if (2 === _J_) break a;
          return 1;
        }
        return 0;
      }
      function trim(s2) {
        if (s2 === cst$0) return s2;
        if (!is_space(caml_string_unsafe_get2(s2, 0)) && !is_space(caml_string_unsafe_get2(s2, caml_ml_string_length2(s2) - 1 | 0)))
          return s2;
        var _I_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call1(Stdlib_Bytes[23], _I_));
      }
      function escaped(s2) {
        var b = caml_call1(bos, s2), b$0 = caml_call1(Stdlib_Bytes[87], b);
        return b === b$0 ? s2 : caml_call1(bts, b$0);
      }
      function index_rec(s2, lim, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (lim <= i$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
          if (caml_string_unsafe_get2(s2, i$0) === c) return i$0;
          var i$1 = i$0 + 1 | 0;
          i$0 = i$1;
        }
      }
      function index(s2, c) {
        return index_rec(s2, caml_ml_string_length2(s2), 0, c);
      }
      function index_rec_opt(s2, lim, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (lim <= i$0) return 0;
          if (caml_string_unsafe_get2(s2, i$0) === c) return [0, i$0];
          var i$1 = i$0 + 1 | 0;
          i$0 = i$1;
        }
      }
      function index_opt(s2, c) {
        return index_rec_opt(s2, caml_ml_string_length2(s2), 0, c);
      }
      function index_from(s2, i, c) {
        var l = caml_ml_string_length2(s2);
        if (0 <= i && l >= i) return index_rec(s2, l, i, c);
        return caml_call1(Stdlib[1], cst_String_index_from_Bytes_in);
      }
      function index_from_opt(s2, i, c) {
        var l = caml_ml_string_length2(s2);
        if (0 <= i && l >= i) return index_rec_opt(s2, l, i, c);
        return caml_call1(Stdlib[1], cst_String_index_from_opt_Byte);
      }
      function rindex_rec(s2, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (0 > i$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
          if (caml_string_unsafe_get2(s2, i$0) === c) return i$0;
          var i$1 = i$0 - 1 | 0;
          i$0 = i$1;
        }
      }
      function rindex(s2, c) {
        return rindex_rec(s2, caml_ml_string_length2(s2) - 1 | 0, c);
      }
      function rindex_from(s2, i, c) {
        if (-1 <= i && caml_ml_string_length2(s2) > i) return rindex_rec(s2, i, c);
        return caml_call1(Stdlib[1], cst_String_rindex_from_Bytes_r);
      }
      function rindex_rec_opt(s2, i, c) {
        var i$0 = i;
        for (; ; ) {
          if (0 > i$0) return 0;
          if (caml_string_unsafe_get2(s2, i$0) === c) return [0, i$0];
          var i$1 = i$0 - 1 | 0;
          i$0 = i$1;
        }
      }
      function rindex_opt(s2, c) {
        return rindex_rec_opt(s2, caml_ml_string_length2(s2) - 1 | 0, c);
      }
      function rindex_from_opt(s2, i, c) {
        if (-1 <= i && caml_ml_string_length2(s2) > i)
          return rindex_rec_opt(s2, i, c);
        return caml_call1(Stdlib[1], cst_String_rindex_from_opt_Byt);
      }
      function contains_from(s2, i, c) {
        var l = caml_ml_string_length2(s2);
        if (0 <= i && l >= i)
          try {
            index_rec(s2, l, i, c);
            var _G_ = 1;
            return _G_;
          } catch (_H_) {
            var _F_ = caml_wrap_exception2(_H_);
            if (_F_ === Stdlib[8]) return 0;
            throw caml_maybe_attach_backtrace2(_F_, 0);
          }
        return caml_call1(Stdlib[1], cst_String_contains_from_Bytes);
      }
      function contains(s2, c) {
        return contains_from(s2, 0, c);
      }
      function rcontains_from(s2, i, c) {
        if (0 <= i && caml_ml_string_length2(s2) > i)
          try {
            rindex_rec(s2, i, c);
            var _D_ = 1;
            return _D_;
          } catch (_E_) {
            var _C_ = caml_wrap_exception2(_E_);
            if (_C_ === Stdlib[8]) return 0;
            throw caml_maybe_attach_backtrace2(_C_, 0);
          }
        return caml_call1(Stdlib[1], cst_String_rcontains_from_Byte);
      }
      function uppercase_ascii(s2) {
        var _B_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call1(Stdlib_Bytes[36], _B_));
      }
      function lowercase_ascii(s2) {
        var _A_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call1(Stdlib_Bytes[37], _A_));
      }
      function capitalize_ascii(s2) {
        var _z_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call1(Stdlib_Bytes[38], _z_));
      }
      function uncapitalize_ascii(s2) {
        var _y_ = caml_call1(bos, s2);
        return caml_call1(bts, caml_call1(Stdlib_Bytes[39], _y_));
      }
      function starts_with(prefix, s2) {
        var len_s = caml_ml_string_length2(s2), len_pre = caml_ml_string_length2(prefix), _x_ = len_pre <= len_s ? 1 : 0;
        if (!_x_) return _x_;
        var i = 0;
        for (; ; ) {
          if (i === len_pre) return 1;
          if (caml_string_unsafe_get2(s2, i) !== caml_string_unsafe_get2(prefix, i))
            return 0;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function ends_with(suffix, s2) {
        var len_s = caml_ml_string_length2(s2), len_suf = caml_ml_string_length2(suffix), diff = len_s - len_suf | 0, _w_ = 0 <= diff ? 1 : 0;
        if (!_w_) return _w_;
        var i = 0;
        for (; ; ) {
          if (i === len_suf) return 1;
          if (caml_string_unsafe_get2(s2, diff + i | 0) !== caml_string_unsafe_get2(suffix, i))
            return 0;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function hash(x2) {
        return caml_string_hash2(0, x2);
      }
      function split_on_char(sep, s2) {
        var r = [0, 0], j = [0, caml_ml_string_length2(s2)], _s_ = caml_ml_string_length2(s2) - 1 | 0;
        if (_s_ >= 0) {
          var i = _s_;
          for (; ; ) {
            if (caml_string_unsafe_get2(s2, i) === sep) {
              var _u_ = r[1];
              r[1] = [0, sub(s2, i + 1 | 0, (j[1] - i | 0) - 1 | 0), _u_];
              j[1] = i;
            }
            var _v_ = i - 1 | 0;
            if (0 === i) break;
            i = _v_;
          }
        }
        var _t_ = r[1];
        return [0, sub(s2, 0, j[1]), _t_];
      }
      var compare = runtime.caml_string_compare;
      function to_seq(s2) {
        var _r_ = caml_call1(bos, s2);
        return caml_call1(Stdlib_Bytes[47], _r_);
      }
      function to_seqi(s2) {
        var _q_ = caml_call1(bos, s2);
        return caml_call1(Stdlib_Bytes[48], _q_);
      }
      function of_seq(g) {
        return caml_call1(bts, caml_call1(Stdlib_Bytes[49], g));
      }
      function get_utf_8_uchar(s2, i) {
        var _p_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[50], _p_, i);
      }
      function is_valid_utf_8(s2) {
        var _o_ = caml_call1(bos, s2);
        return caml_call1(Stdlib_Bytes[52], _o_);
      }
      function get_utf_16be_uchar(s2, i) {
        var _n_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[53], _n_, i);
      }
      function is_valid_utf_16be(s2) {
        var _m_ = caml_call1(bos, s2);
        return caml_call1(Stdlib_Bytes[55], _m_);
      }
      function get_utf_16le_uchar(s2, i) {
        var _l_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[56], _l_, i);
      }
      function is_valid_utf_16le(s2) {
        var _k_ = caml_call1(bos, s2);
        return caml_call1(Stdlib_Bytes[58], _k_);
      }
      function get_int8(s2, i) {
        var _j_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[60], _j_, i);
      }
      function get_uint16_le(s2, i) {
        var _i_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[63], _i_, i);
      }
      function get_uint16_be(s2, i) {
        var _h_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[62], _h_, i);
      }
      function get_int16_ne(s2, i) {
        var _g_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[64], _g_, i);
      }
      function get_int16_le(s2, i) {
        var _f_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[66], _f_, i);
      }
      function get_int16_be(s2, i) {
        var _e_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[65], _e_, i);
      }
      function get_int32_le(s2, i) {
        var _d_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[69], _d_, i);
      }
      function get_int32_be(s2, i) {
        var _c_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[68], _c_, i);
      }
      function get_int64_le(s2, i) {
        var _b_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[72], _b_, i);
      }
      function get_int64_be(s2, i) {
        var _a_ = caml_call1(bos, s2);
        return caml_call2(Stdlib_Bytes[71], _a_, i);
      }
      var Stdlib_String = [
        0,
        make,
        init,
        empty,
        of_bytes,
        to_bytes,
        blit,
        concat,
        cat,
        caml_string_equal2,
        compare,
        starts_with,
        ends_with,
        contains_from,
        rcontains_from,
        contains,
        sub,
        split_on_char,
        map,
        mapi,
        fold_left,
        fold_right,
        for_all,
        exists,
        trim,
        escaped,
        uppercase_ascii,
        lowercase_ascii,
        capitalize_ascii,
        uncapitalize_ascii,
        iter,
        iteri,
        index_from,
        index_from_opt,
        rindex_from,
        rindex_from_opt,
        index,
        index_opt,
        rindex,
        rindex_opt,
        to_seq,
        to_seqi,
        of_seq,
        get_utf_8_uchar,
        is_valid_utf_8,
        get_utf_16be_uchar,
        is_valid_utf_16be,
        get_utf_16le_uchar,
        is_valid_utf_16le,
        runtime.caml_string_get,
        get_int8,
        runtime.caml_string_get16,
        get_uint16_be,
        get_uint16_le,
        get_int16_ne,
        get_int16_be,
        get_int16_le,
        runtime.caml_string_get32,
        hash,
        caml_string_hash2,
        get_int32_be,
        get_int32_le,
        runtime.caml_string_get64,
        get_int64_be,
        get_int64_le
      ];
      runtime.caml_register_global(12, Stdlib_String, "Stdlib__String");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_array_make2 = runtime.caml_array_make, caml_array_sub2 = runtime.caml_array_sub, caml_check_bound2 = runtime.caml_check_bound, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), cst = "", Stdlib_Seq = global_data.Stdlib__Seq, Stdlib = global_data.Stdlib, Stdlib_String = global_data.Stdlib__String, Assert_failure = global_data.Assert_failure, Floatarray = [0], cst_Array_init = "Array.init", cst_Array_make_matrix = "Array.make_matrix", cst_Array_init_matrix = "Array.init_matrix", cst_Array_sub = "Array.sub", cst_Array_fill = "Array.fill", cst_Array_blit = "Array.blit", cst_Array_iter2_arrays_must_ha = "Array.iter2: arrays must have the same length", cst_Array_map2_arrays_must_hav = "Array.map2: arrays must have the same length", cst_Array_for_all2 = "Array.for_all2", cst_Array_exists2 = "Array.exists2", cst_Array_combine = "Array.combine";
      function init(l, f) {
        if (0 === l) return [0];
        if (0 > l) return caml_call1(Stdlib[1], cst_Array_init);
        var res = caml_array_make2(l, caml_call1(f, 0)), _aL_ = l - 1 | 0, _aK_ = 1;
        if (_aL_ >= 1) {
          var i = _aK_;
          for (; ; ) {
            res[1 + i] = caml_call1(f, i);
            var _aM_ = i + 1 | 0;
            if (_aL_ === i) break;
            i = _aM_;
          }
        }
        return res;
      }
      function make_matrix(sx, sy, init2) {
        if (sy < 0) caml_call1(Stdlib[1], cst_Array_make_matrix);
        var res = caml_array_make2(sx, [0]);
        if (0 < sy) {
          var _aI_ = sx - 1 | 0, _aH_ = 0;
          if (_aI_ >= 0) {
            var x2 = _aH_;
            for (; ; ) {
              res[1 + x2] = caml_array_make2(sy, init2);
              var _aJ_ = x2 + 1 | 0;
              if (_aI_ === x2) break;
              x2 = _aJ_;
            }
          }
        }
        return res;
      }
      function init_matrix(sx, sy, f) {
        if (sy < 0) caml_call1(Stdlib[1], cst_Array_init_matrix);
        var res = caml_array_make2(sx, [0]);
        if (0 < sy) {
          var _aC_ = sx - 1 | 0, _aB_ = 0;
          if (_aC_ >= 0) {
            var x2 = _aB_;
            for (; ; ) {
              var row = caml_array_make2(sy, caml_call2(f, x2, 0)), _aE_ = sy - 1 | 0, _aD_ = 1;
              if (_aE_ >= 1) {
                var y = _aD_;
                for (; ; ) {
                  row[1 + y] = caml_call2(f, x2, y);
                  var _aG_ = y + 1 | 0;
                  if (_aE_ === y) break;
                  y = _aG_;
                }
              }
              res[1 + x2] = row;
              var _aF_ = x2 + 1 | 0;
              if (_aC_ === x2) break;
              x2 = _aF_;
            }
          }
        }
        return res;
      }
      function copy(a) {
        var l = a.length - 1;
        return 0 === l ? [0] : caml_array_sub2(a, 0, l);
      }
      function append(a1, a2) {
        var l1 = a1.length - 1;
        return 0 === l1 ? copy(a2) : 0 === a2.length - 1 ? caml_array_sub2(a1, 0, l1) : runtime.caml_array_append(a1, a2);
      }
      function sub(a, ofs, len) {
        if (0 <= ofs && 0 <= len && (a.length - 1 - len | 0) >= ofs)
          return caml_array_sub2(a, ofs, len);
        return caml_call1(Stdlib[1], cst_Array_sub);
      }
      function fill(a, ofs, len, v) {
        if (0 <= ofs && 0 <= len && (a.length - 1 - len | 0) >= ofs)
          return runtime.caml_array_fill(a, ofs, len, v);
        return caml_call1(Stdlib[1], cst_Array_fill);
      }
      function blit(a1, ofs1, a2, ofs2, len) {
        if (0 <= len && 0 <= ofs1 && (a1.length - 1 - len | 0) >= ofs1 && 0 <= ofs2 && (a2.length - 1 - len | 0) >= ofs2)
          return runtime.caml_array_blit(a1, ofs1, a2, ofs2, len);
        return caml_call1(Stdlib[1], cst_Array_blit);
      }
      function iter(f, a) {
        var _az_ = a.length - 2 | 0, _ay_ = 0;
        if (_az_ >= 0) {
          var i = _ay_;
          for (; ; ) {
            caml_call1(f, a[1 + i]);
            var _aA_ = i + 1 | 0;
            if (_az_ === i) break;
            i = _aA_;
          }
        }
        return 0;
      }
      function iter2(f, a, b) {
        if (a.length - 1 !== b.length - 1)
          return caml_call1(Stdlib[1], cst_Array_iter2_arrays_must_ha);
        var _aw_ = a.length - 2 | 0, _av_ = 0;
        if (_aw_ >= 0) {
          var i = _av_;
          for (; ; ) {
            caml_call2(f, a[1 + i], b[1 + i]);
            var _ax_ = i + 1 | 0;
            if (_aw_ === i) break;
            i = _ax_;
          }
        }
        return 0;
      }
      function map(f, a) {
        var l = a.length - 1;
        if (0 === l) return [0];
        var r = caml_array_make2(l, caml_call1(f, a[1])), _at_ = l - 1 | 0, _as_ = 1;
        if (_at_ >= 1) {
          var i = _as_;
          for (; ; ) {
            r[1 + i] = caml_call1(f, a[1 + i]);
            var _au_ = i + 1 | 0;
            if (_at_ === i) break;
            i = _au_;
          }
        }
        return r;
      }
      function map_inplace(f, a) {
        var _aq_ = a.length - 2 | 0, _ap_ = 0;
        if (_aq_ >= 0) {
          var i = _ap_;
          for (; ; ) {
            a[1 + i] = caml_call1(f, a[1 + i]);
            var _ar_ = i + 1 | 0;
            if (_aq_ === i) break;
            i = _ar_;
          }
        }
        return 0;
      }
      function mapi_inplace(f, a) {
        var _an_ = a.length - 2 | 0, _am_ = 0;
        if (_an_ >= 0) {
          var i = _am_;
          for (; ; ) {
            a[1 + i] = caml_call2(f, i, a[1 + i]);
            var _ao_ = i + 1 | 0;
            if (_an_ === i) break;
            i = _ao_;
          }
        }
        return 0;
      }
      function map2(f, a, b) {
        var la = a.length - 1, lb = b.length - 1;
        if (la !== lb)
          return caml_call1(Stdlib[1], cst_Array_map2_arrays_must_hav);
        if (0 === la) return [0];
        var r = caml_array_make2(la, caml_call2(f, a[1], b[1])), _ak_ = la - 1 | 0, _aj_ = 1;
        if (_ak_ >= 1) {
          var i = _aj_;
          for (; ; ) {
            r[1 + i] = caml_call2(f, a[1 + i], b[1 + i]);
            var _al_ = i + 1 | 0;
            if (_ak_ === i) break;
            i = _al_;
          }
        }
        return r;
      }
      function iteri(f, a) {
        var _ah_ = a.length - 2 | 0, _ag_ = 0;
        if (_ah_ >= 0) {
          var i = _ag_;
          for (; ; ) {
            caml_call2(f, i, a[1 + i]);
            var _ai_ = i + 1 | 0;
            if (_ah_ === i) break;
            i = _ai_;
          }
        }
        return 0;
      }
      function mapi(f, a) {
        var l = a.length - 1;
        if (0 === l) return [0];
        var r = caml_array_make2(l, caml_call2(f, 0, a[1])), _ae_ = l - 1 | 0, _ad_ = 1;
        if (_ae_ >= 1) {
          var i = _ad_;
          for (; ; ) {
            r[1 + i] = caml_call2(f, i, a[1 + i]);
            var _af_ = i + 1 | 0;
            if (_ae_ === i) break;
            i = _af_;
          }
        }
        return r;
      }
      function to_list(a) {
        var i$1 = a.length - 2 | 0, i = i$1, res = 0;
        for (; ; ) {
          if (0 > i) return res;
          var res$0 = [0, a[1 + i], res], i$0 = i - 1 | 0;
          i = i$0;
          res = res$0;
        }
      }
      function list_length(accu, param) {
        var accu$0 = accu, param$0 = param;
        for (; ; ) {
          if (!param$0) return accu$0;
          var t = param$0[2], accu$1 = accu$0 + 1 | 0;
          accu$0 = accu$1;
          param$0 = t;
        }
      }
      function of_list(l) {
        if (!l) return [0];
        var tl = l[2], hd = l[1], a = caml_array_make2(list_length(0, l), hd), i = 1, param = tl;
        for (; ; ) {
          if (!param) return a;
          var tl$0 = param[2], hd$0 = param[1];
          a[1 + i] = hd$0;
          var i$0 = i + 1 | 0;
          i = i$0;
          param = tl$0;
        }
      }
      function fold_left(f, x2, a) {
        var r = [0, x2], _ab_ = a.length - 2 | 0, _aa_ = 0;
        if (_ab_ >= 0) {
          var i = _aa_;
          for (; ; ) {
            r[1] = caml_call2(f, r[1], a[1 + i]);
            var _ac_ = i + 1 | 0;
            if (_ab_ === i) break;
            i = _ac_;
          }
        }
        return r[1];
      }
      function fold_left_map(f, acc, input_array) {
        var len = input_array.length - 1;
        if (0 === len) return [0, acc, [0]];
        var match = caml_call2(f, acc, input_array[1]), elt = match[2], acc$0 = match[1], output_array = caml_array_make2(len, elt), acc$1 = [0, acc$0], ___ = len - 1 | 0, _Z_ = 1;
        if (___ >= 1) {
          var i = _Z_;
          for (; ; ) {
            var match$0 = caml_call2(f, acc$1[1], input_array[1 + i]), elt$0 = match$0[2], acc$2 = match$0[1];
            acc$1[1] = acc$2;
            output_array[1 + i] = elt$0;
            var _$_ = i + 1 | 0;
            if (___ === i) break;
            i = _$_;
          }
        }
        return [0, acc$1[1], output_array];
      }
      function fold_right(f, a, x2) {
        var r = [0, x2], _X_ = a.length - 2 | 0;
        if (_X_ >= 0) {
          var i = _X_;
          for (; ; ) {
            r[1] = caml_call2(f, a[1 + i], r[1]);
            var _Y_ = i - 1 | 0;
            if (0 === i) break;
            i = _Y_;
          }
        }
        return r[1];
      }
      function exists(p, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 0;
          if (caml_call1(p, a[1 + i])) return 1;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function for_all(p, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 1;
          if (!caml_call1(p, a[1 + i])) return 0;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function for_all2(p, l1, l2) {
        var n1 = l1.length - 1, n2 = l2.length - 1;
        if (n1 !== n2) return caml_call1(Stdlib[1], cst_Array_for_all2);
        var i = 0;
        for (; ; ) {
          if (i === n1) return 1;
          if (!caml_call2(p, l1[1 + i], l2[1 + i])) return 0;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function exists2(p, l1, l2) {
        var n1 = l1.length - 1, n2 = l2.length - 1;
        if (n1 !== n2) return caml_call1(Stdlib[1], cst_Array_exists2);
        var i = 0;
        for (; ; ) {
          if (i === n1) return 0;
          if (caml_call2(p, l1[1 + i], l2[1 + i])) return 1;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function mem(x2, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 0;
          if (0 === runtime.caml_compare(a[1 + i], x2)) return 1;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function memq(x2, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 0;
          if (x2 === a[1 + i]) return 1;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function find_opt(p, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 0;
          var x2 = a[1 + i];
          if (caml_call1(p, x2)) return [0, x2];
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function find_index(p, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 0;
          if (caml_call1(p, a[1 + i])) return [0, i];
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function find_map(f, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 0;
          var r = caml_call1(f, a[1 + i]);
          if (r) return r;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function find_mapi(f, a) {
        var n = a.length - 1, i = 0;
        for (; ; ) {
          if (i === n) return 0;
          var r = caml_call2(f, i, a[1 + i]);
          if (r) return r;
          var i$0 = i + 1 | 0;
          i = i$0;
        }
      }
      function split(x2) {
        if (runtime.caml_equal(x2, [0])) return [0, [0], [0]];
        var match = x2[1], b0 = match[2], a0 = match[1], n = x2.length - 1, a = caml_array_make2(n, a0), b = caml_array_make2(n, b0), _V_ = n - 1 | 0, _U_ = 1;
        if (_V_ >= 1) {
          var i = _U_;
          for (; ; ) {
            var match$0 = x2[1 + i], bi = match$0[2], ai = match$0[1];
            a[1 + i] = ai;
            b[1 + i] = bi;
            var _W_ = i + 1 | 0;
            if (_V_ === i) break;
            i = _W_;
          }
        }
        return [0, a, b];
      }
      function combine(a, b) {
        var na = a.length - 1, nb = b.length - 1;
        if (na !== nb) caml_call1(Stdlib[1], cst_Array_combine);
        if (0 === na) return [0];
        var x2 = caml_array_make2(na, [0, a[1], b[1]]), _S_ = na - 1 | 0, _R_ = 1;
        if (_S_ >= 1) {
          var i = _R_;
          for (; ; ) {
            x2[1 + i] = [0, a[1 + i], b[1 + i]];
            var _T_2 = i + 1 | 0;
            if (_S_ === i) break;
            i = _T_2;
          }
        }
        return x2;
      }
      var Bottom = [248, "Stdlib.Array.Bottom", runtime.caml_fresh_oo_id(0)], _a_ = [0, "array.ml", 369, 4], _b_ = [0, "]", 0], cst_out_of_expected_range_0 = ", out of expected range [0; ", cst_returned = "' returned ", cst_Array_shuffle_rand = "Array.shuffle: 'rand ";
      function sort(cmp, a) {
        function maxson(l2, i2) {
          var i31 = ((i2 + i2 | 0) + i2 | 0) + 1 | 0, x2 = [0, i31];
          if ((i31 + 2 | 0) < l2) {
            var _K_ = i31 + 1 | 0, _L_ = caml_check_bound2(a, _K_)[1 + _K_];
            if (caml_call2(cmp, caml_check_bound2(a, i31)[1 + i31], _L_) < 0)
              x2[1] = i31 + 1 | 0;
            var _M_ = i31 + 2 | 0, _N_ = caml_check_bound2(a, _M_)[1 + _M_], _O_ = x2[1];
            if (caml_call2(cmp, caml_check_bound2(a, _O_)[1 + _O_], _N_) < 0)
              x2[1] = i31 + 2 | 0;
            return x2[1];
          }
          if ((i31 + 1 | 0) < l2) {
            var _P_ = i31 + 1 | 0, _Q_ = caml_check_bound2(a, _P_)[1 + _P_];
            if (0 > caml_call2(cmp, caml_check_bound2(a, i31)[1 + i31], _Q_))
              return i31 + 1 | 0;
          }
          if (i31 < l2) return i31;
          throw caml_maybe_attach_backtrace2([0, Bottom, i2], 1);
        }
        var l = a.length - 1, _E_ = ((l + 1 | 0) / 3 | 0) - 1 | 0;
        if (_E_ >= 0) {
          var i$6 = _E_;
          for (; ; ) {
            var e$1 = caml_check_bound2(a, i$6)[1 + i$6];
            try {
              var i = i$6;
              for (; ; ) {
                var j = maxson(l, i);
                if (0 >= caml_call2(cmp, caml_check_bound2(a, j)[1 + j], e$1)) break;
                var _B_ = caml_check_bound2(a, j)[1 + j];
                caml_check_bound2(a, i)[1 + i] = _B_;
                i = j;
              }
              caml_check_bound2(a, i)[1 + i] = e$1;
            } catch (exn$02) {
              var exn = caml_wrap_exception2(exn$02);
              if (exn[1] !== Bottom) throw caml_maybe_attach_backtrace2(exn, 0);
              var i$0 = exn[2];
              caml_check_bound2(a, i$0)[1 + i$0] = e$1;
            }
            var _J_ = i$6 - 1 | 0;
            if (0 === i$6) break;
            i$6 = _J_;
          }
        }
        var _F_ = l - 1 | 0;
        if (_F_ >= 2) {
          var i$4 = _F_;
          for (; ; ) {
            var e$0 = caml_check_bound2(a, i$4)[1 + i$4];
            a[1 + i$4] = caml_check_bound2(a, 0)[1];
            var i$5 = 0;
            try {
              var i$1 = i$5;
              for (; ; ) {
                var j$0 = maxson(i$4, i$1), _C_ = caml_check_bound2(a, j$0)[1 + j$0];
                caml_check_bound2(a, i$1)[1 + i$1] = _C_;
                i$1 = j$0;
              }
            } catch (exn2) {
              var exn$0 = caml_wrap_exception2(exn2);
              if (exn$0[1] !== Bottom) throw caml_maybe_attach_backtrace2(exn$0, 0);
              var i$2 = exn$0[2];
              a: {
                b: {
                  var i$3 = i$2;
                  for (; ; ) {
                    var father = (i$3 - 1 | 0) / 3 | 0;
                    if (i$3 === father)
                      throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
                    if (0 <= caml_call2(cmp, caml_check_bound2(a, father)[1 + father], e$0))
                      break;
                    var _D_ = caml_check_bound2(a, father)[1 + father];
                    caml_check_bound2(a, i$3)[1 + i$3] = _D_;
                    if (0 >= father) break b;
                    i$3 = father;
                  }
                  caml_check_bound2(a, i$3)[1 + i$3] = e$0;
                  break a;
                }
                caml_check_bound2(a, 0)[1] = e$0;
              }
              var _I_ = i$4 - 1 | 0;
              if (2 === i$4) break;
              i$4 = _I_;
            }
          }
        }
        var _G_ = 1 < l ? 1 : 0;
        if (_G_) {
          var e = caml_check_bound2(a, 1)[2];
          a[2] = caml_check_bound2(a, 0)[1];
          a[1] = e;
          var _H_ = 0;
        } else
          var _H_ = _G_;
        return _H_;
      }
      function stable_sort(cmp, a) {
        function merge(src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
          var src1r = src1ofs + src1len | 0, src2r = src2ofs + src2len | 0, s2$1 = caml_check_bound2(src2, src2ofs)[1 + src2ofs], s1$1 = caml_check_bound2(a, src1ofs)[1 + src1ofs], i1 = src1ofs, s1 = s1$1, i2 = src2ofs, s2 = s2$1, d = dstofs;
          for (; ; )
            if (0 < caml_call2(cmp, s1, s2)) {
              caml_check_bound2(dst, d)[1 + d] = s2;
              var i2$0 = i2 + 1 | 0;
              if (i2$0 >= src2r) return blit(a, i1, dst, d + 1 | 0, src1r - i1 | 0);
              var d$0 = d + 1 | 0, s2$0 = caml_check_bound2(src2, i2$0)[1 + i2$0];
              i2 = i2$0;
              s2 = s2$0;
              d = d$0;
            } else {
              caml_check_bound2(dst, d)[1 + d] = s1;
              var i1$0 = i1 + 1 | 0;
              if (i1$0 >= src1r)
                return blit(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
              var d$1 = d + 1 | 0, s1$0 = caml_check_bound2(a, i1$0)[1 + i1$0];
              i1 = i1$0;
              s1 = s1$0;
              d = d$1;
            }
        }
        function isortto(srcofs, dst, dstofs, len) {
          var _t_ = len - 1 | 0, _s_ = 0;
          if (_t_ >= 0) {
            var i = _s_;
            for (; ; ) {
              var _u_ = srcofs + i | 0, e = caml_check_bound2(a, _u_)[1 + _u_], j = [0, (dstofs + i | 0) - 1 | 0];
              for (; ; ) {
                if (dstofs > j[1]) break;
                var _v_ = j[1];
                if (0 >= caml_call2(cmp, caml_check_bound2(dst, _v_)[1 + _v_], e))
                  break;
                var _w_ = j[1], _x_ = caml_check_bound2(dst, _w_)[1 + _w_], _y_ = j[1] + 1 | 0;
                caml_check_bound2(dst, _y_)[1 + _y_] = _x_;
                j[1]--;
              }
              var _z_ = j[1] + 1 | 0;
              caml_check_bound2(dst, _z_)[1 + _z_] = e;
              var _A_ = i + 1 | 0;
              if (_t_ === i) break;
              i = _A_;
            }
          }
          return 0;
        }
        function sortto(srcofs, dst, dstofs, len) {
          if (len <= 5) return isortto(srcofs, dst, dstofs, len);
          var l12 = len / 2 | 0, l22 = len - l12 | 0;
          sortto(srcofs + l12 | 0, dst, dstofs + l12 | 0, l22);
          sortto(srcofs, a, srcofs + l22 | 0, l12);
          return merge(srcofs + l22 | 0, l12, dst, dstofs + l12 | 0, l22, dst, dstofs);
        }
        var l = a.length - 1;
        if (l <= 5) return isortto(0, a, 0, l);
        var l1 = l / 2 | 0, l2 = l - l1 | 0, t = caml_array_make2(l2, caml_check_bound2(a, 0)[1]);
        sortto(l1, t, 0, l2);
        sortto(0, a, l2, l1);
        return merge(l2, l1, t, 0, l2, a, 0);
      }
      function shuffle(rand, a) {
        var _o_ = a.length - 2 | 0;
        if (_o_ >= 1) {
          var i = _o_;
          for (; ; ) {
            var j = caml_call1(rand, i + 1 | 0), _p_ = 0 <= j ? 1 : 0, _q_ = _p_ ? j <= i ? 1 : 0 : _p_;
            if (1 - _q_) {
              var int$0 = Stdlib[33], _k_ = [0, cst_out_of_expected_range_0, [0, caml_call1(int$0, i), _b_]], _l_ = [0, cst_returned, [0, caml_call1(int$0, j), _k_]], _m_ = [0, cst_Array_shuffle_rand, [0, caml_call1(int$0, i + 1 | 0), _l_]], _n_ = caml_call2(Stdlib_String[7], cst, _m_);
              caml_call1(Stdlib[1], _n_);
            }
            var v = a[1 + i];
            a[1 + i] = a[1 + j];
            a[1 + j] = v;
            var _r_ = i - 1 | 0;
            if (1 === i) break;
            i = _r_;
          }
        }
        return 0;
      }
      function to_seq(a) {
        function aux(i, param) {
          if (i >= a.length - 1) return 0;
          var x2 = a[1 + i], _i_ = i + 1 | 0;
          return [0, x2, function(_j_) {
            return aux(_i_, _j_);
          }];
        }
        var _g_ = 0;
        return function(_h_) {
          return aux(_g_, _h_);
        };
      }
      function to_seqi(a) {
        function aux(i, param) {
          if (i >= a.length - 1) return 0;
          var x2 = a[1 + i], _e_ = i + 1 | 0;
          return [0, [0, i, x2], function(_f_) {
            return aux(_e_, _f_);
          }];
        }
        var _c_ = 0;
        return function(_d_) {
          return aux(_c_, _d_);
        };
      }
      function of_seq(i$2) {
        var l = caml_call3(Stdlib_Seq[5], function(acc, x2) {
          return [0, x2, acc];
        }, 0, i$2);
        if (!l) return [0];
        var tl = l[2], hd = l[1], len = list_length(0, l), a = caml_array_make2(len, hd), i$1 = len - 2 | 0, i = i$1, param = tl;
        for (; ; ) {
          if (!param) return a;
          var tl$0 = param[2], hd$0 = param[1];
          a[1 + i] = hd$0;
          var i$0 = i - 1 | 0;
          i = i$0;
          param = tl$0;
        }
      }
      var Stdlib_Array = [
        0,
        init,
        make_matrix,
        init_matrix,
        append,
        runtime.caml_array_concat,
        sub,
        copy,
        fill,
        blit,
        to_list,
        of_list,
        iter,
        iteri,
        map,
        map_inplace,
        mapi,
        mapi_inplace,
        fold_left,
        fold_left_map,
        fold_right,
        iter2,
        map2,
        for_all,
        exists,
        for_all2,
        exists2,
        mem,
        memq,
        find_opt,
        find_index,
        find_map,
        find_mapi,
        split,
        combine,
        sort,
        stable_sort,
        stable_sort,
        shuffle,
        to_seq,
        to_seqi,
        of_seq,
        Floatarray
      ];
      runtime.caml_register_global(22, Stdlib_Array, "Stdlib__Array");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_Map_bal$3 = "Map.bal", caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib = global_data.Stdlib, Assert_failure = global_data.Assert_failure, Stdlib_Seq = global_data.Stdlib__Seq, Stdlib_List = global_data.Stdlib__List, cst_Map_bal = cst_Map_bal$3, cst_Map_bal$0 = cst_Map_bal$3, cst_Map_bal$1 = cst_Map_bal$3, cst_Map_bal$2 = cst_Map_bal$3, cst_Map_remove_min_elt = "Map.remove_min_elt", _a_ = [0, 0, 0, 0], _b_ = [0, "map.ml", 408, 10], _c_ = [0, 0, 0], Stdlib_Map = [
        0,
        function(Ord) {
          function height(param) {
            if (!param) return 0;
            var h = param[5];
            return h;
          }
          function create(l, x2, d, r) {
            var hl = height(l), hr = height(r), _K_ = hr <= hl ? hl + 1 | 0 : hr + 1 | 0;
            return [0, l, x2, d, r, _K_];
          }
          function singleton(x2, d) {
            return [0, 0, x2, d, 0, 1];
          }
          function bal(l, x2, d, r) {
            if (l) var h = l[5], hl = h;
            else var hl = 0;
            if (r) var h$0 = r[5], hr = h$0;
            else var hr = 0;
            if ((hr + 2 | 0) < hl) {
              if (!l) return caml_call1(Stdlib[1], cst_Map_bal$0);
              var lr = l[4], ld = l[3], lv = l[2], ll = l[1], _F_ = height(lr);
              if (_F_ <= height(ll))
                return create(ll, lv, ld, create(lr, x2, d, r));
              if (!lr) return caml_call1(Stdlib[1], cst_Map_bal);
              var lrr = lr[4], lrd = lr[3], lrv = lr[2], lrl = lr[1], _G_ = create(lrr, x2, d, r);
              return create(create(ll, lv, ld, lrl), lrv, lrd, _G_);
            }
            if ((hl + 2 | 0) >= hr) {
              var _J_ = hr <= hl ? hl + 1 | 0 : hr + 1 | 0;
              return [0, l, x2, d, r, _J_];
            }
            if (!r) return caml_call1(Stdlib[1], cst_Map_bal$2);
            var rr = r[4], rd = r[3], rv = r[2], rl = r[1], _H_ = height(rl);
            if (_H_ <= height(rr)) return create(create(l, x2, d, rl), rv, rd, rr);
            if (!rl) return caml_call1(Stdlib[1], cst_Map_bal$1);
            var rlr = rl[4], rld = rl[3], rlv = rl[2], rll = rl[1], _I_ = create(rlr, rv, rd, rr);
            return create(create(l, x2, d, rll), rlv, rld, _I_);
          }
          var empty = 0;
          function is_empty(param) {
            return param ? 0 : 1;
          }
          function add(x2, data, m) {
            if (!m) return [0, 0, x2, data, 0, 1];
            var h = m[5], r = m[4], d = m[3], v = m[2], l = m[1], c = caml_call2(Ord[1], x2, v);
            if (0 === c) return d === data ? m : [0, l, x2, data, r, h];
            if (0 <= c) {
              var rr = add(x2, data, r);
              return r === rr ? m : bal(l, v, d, rr);
            }
            var ll = add(x2, data, l);
            return l === ll ? m : bal(ll, v, d, r);
          }
          function find(x2, param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
              var r = param$0[4], d = param$0[3], v = param$0[2], l = param$0[1], c = caml_call2(Ord[1], x2, v);
              if (0 === c) return d;
              var r$0 = 0 <= c ? r : l;
              param$0 = r$0;
            }
          }
          function find_first(f, param$0) {
            var param$1 = param$0;
            for (; ; ) {
              if (!param$1) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
              var r$0 = param$1[4], d0$1 = param$1[3], v0$1 = param$1[2], l$0 = param$1[1];
              if (caml_call1(f, v0$1)) {
                var v0 = v0$1, d0 = d0$1, param = l$0;
                for (; ; ) {
                  if (!param) return [0, v0, d0];
                  var r = param[4], d0$0 = param[3], v0$0 = param[2], l = param[1];
                  if (caml_call1(f, v0$0)) {
                    v0 = v0$0;
                    d0 = d0$0;
                    param = l;
                  } else
                    param = r;
                }
              } else
                param$1 = r$0;
            }
          }
          function find_first_opt(f, param$0) {
            var param$1 = param$0;
            for (; ; ) {
              if (!param$1) return 0;
              var r$0 = param$1[4], d0$1 = param$1[3], v0$1 = param$1[2], l$0 = param$1[1];
              if (caml_call1(f, v0$1)) {
                var v0 = v0$1, d0 = d0$1, param = l$0;
                for (; ; ) {
                  if (!param) return [0, [0, v0, d0]];
                  var r = param[4], d0$0 = param[3], v0$0 = param[2], l = param[1];
                  if (caml_call1(f, v0$0)) {
                    v0 = v0$0;
                    d0 = d0$0;
                    param = l;
                  } else
                    param = r;
                }
              } else
                param$1 = r$0;
            }
          }
          function find_last(f, param$0) {
            var param$1 = param$0;
            for (; ; ) {
              if (!param$1) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
              var r$0 = param$1[4], d0$1 = param$1[3], v0$1 = param$1[2], l$0 = param$1[1];
              if (caml_call1(f, v0$1)) {
                var v0 = v0$1, d0 = d0$1, param = r$0;
                for (; ; ) {
                  if (!param) return [0, v0, d0];
                  var r = param[4], d0$0 = param[3], v0$0 = param[2], l = param[1];
                  if (caml_call1(f, v0$0)) {
                    v0 = v0$0;
                    d0 = d0$0;
                    param = r;
                  } else
                    param = l;
                }
              } else
                param$1 = l$0;
            }
          }
          function find_last_opt(f, param$0) {
            var param$1 = param$0;
            for (; ; ) {
              if (!param$1) return 0;
              var r$0 = param$1[4], d0$1 = param$1[3], v0$1 = param$1[2], l$0 = param$1[1];
              if (caml_call1(f, v0$1)) {
                var v0 = v0$1, d0 = d0$1, param = r$0;
                for (; ; ) {
                  if (!param) return [0, [0, v0, d0]];
                  var r = param[4], d0$0 = param[3], v0$0 = param[2], l = param[1];
                  if (caml_call1(f, v0$0)) {
                    v0 = v0$0;
                    d0 = d0$0;
                    param = r;
                  } else
                    param = l;
                }
              } else
                param$1 = l$0;
            }
          }
          function find_opt(x2, param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) return 0;
              var r = param$0[4], d = param$0[3], v = param$0[2], l = param$0[1], c = caml_call2(Ord[1], x2, v);
              if (0 === c) return [0, d];
              var r$0 = 0 <= c ? r : l;
              param$0 = r$0;
            }
          }
          function mem(x2, param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) return 0;
              var r = param$0[4], v = param$0[2], l = param$0[1], c = caml_call2(Ord[1], x2, v), _E_ = 0 === c ? 1 : 0;
              if (_E_) return _E_;
              var r$0 = 0 <= c ? r : l;
              param$0 = r$0;
            }
          }
          function min_binding(param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
              var l = param$0[1];
              if (!l) {
                var d = param$0[3], v = param$0[2];
                return [0, v, d];
              }
              param$0 = l;
            }
          }
          function min_binding_opt(param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) return 0;
              var l = param$0[1];
              if (!l) {
                var d = param$0[3], v = param$0[2];
                return [0, [0, v, d]];
              }
              param$0 = l;
            }
          }
          function max_binding(param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
              if (!param$0[4]) {
                var d = param$0[3], v = param$0[2];
                return [0, v, d];
              }
              var r = param$0[4];
              param$0 = r;
            }
          }
          function max_binding_opt(param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) return 0;
              if (!param$0[4]) {
                var d = param$0[3], v = param$0[2];
                return [0, [0, v, d]];
              }
              var r = param$0[4];
              param$0 = r;
            }
          }
          function remove_min_binding(param) {
            if (!param) return caml_call1(Stdlib[1], cst_Map_remove_min_elt);
            var l = param[1];
            if (l) {
              var r = param[4], d = param[3], v = param[2];
              return bal(remove_min_binding(l), v, d, r);
            }
            var r$0 = param[4];
            return r$0;
          }
          function _d_(t1, t2) {
            if (!t1) return t2;
            if (!t2) return t1;
            var match = min_binding(t2), d = match[2], x2 = match[1];
            return bal(t1, x2, d, remove_min_binding(t2));
          }
          function remove(x2, m) {
            if (!m) return 0;
            var r = m[4], d = m[3], v = m[2], l = m[1], c = caml_call2(Ord[1], x2, v);
            if (0 === c) return _d_(l, r);
            if (0 <= c) {
              var rr = remove(x2, r);
              return r === rr ? m : bal(l, v, d, rr);
            }
            var ll = remove(x2, l);
            return l === ll ? m : bal(ll, v, d, r);
          }
          function update(x2, f, m) {
            if (!m) {
              var match$0 = caml_call1(f, 0);
              if (!match$0) return 0;
              var data$0 = match$0[1];
              return [0, 0, x2, data$0, 0, 1];
            }
            var h = m[5], r = m[4], d = m[3], v = m[2], l = m[1], c = caml_call2(Ord[1], x2, v);
            if (0 === c) {
              var match = caml_call1(f, [0, d]);
              if (!match) return _d_(l, r);
              var data = match[1];
              return d === data ? m : [0, l, x2, data, r, h];
            }
            if (0 <= c) {
              var rr = update(x2, f, r);
              return r === rr ? m : bal(l, v, d, rr);
            }
            var ll = update(x2, f, l);
            return l === ll ? m : bal(ll, v, d, r);
          }
          function add_to_list(x2, data, m) {
            function add2(param) {
              if (!param) return [0, [0, data, 0]];
              var l = param[1];
              return [0, [0, data, l]];
            }
            return update(x2, add2, m);
          }
          function iter(f, param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) return 0;
              var r = param$0[4], d = param$0[3], v = param$0[2], l = param$0[1];
              iter(f, l);
              caml_call2(f, v, d);
              param$0 = r;
            }
          }
          function map(f, param) {
            if (!param) return 0;
            var h = param[5], r = param[4], d = param[3], v = param[2], l = param[1], l$0 = map(f, l), d$0 = caml_call1(f, d), r$0 = map(f, r);
            return [0, l$0, v, d$0, r$0, h];
          }
          function mapi(f, param) {
            if (!param) return 0;
            var h = param[5], r = param[4], d = param[3], v = param[2], l = param[1], l$0 = mapi(f, l), d$0 = caml_call2(f, v, d), r$0 = mapi(f, r);
            return [0, l$0, v, d$0, r$0, h];
          }
          function fold(f, m, accu) {
            var m$0 = m, accu$0 = accu;
            for (; ; ) {
              if (!m$0) return accu$0;
              var r = m$0[4], d = m$0[3], v = m$0[2], l = m$0[1], accu$1 = caml_call3(f, v, d, fold(f, l, accu$0));
              m$0 = r;
              accu$0 = accu$1;
            }
          }
          function for_all(p, param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) return 1;
              var r = param$0[4], d = param$0[3], v = param$0[2], l = param$0[1], _B_ = caml_call2(p, v, d);
              if (_B_) {
                var _C_ = for_all(p, l);
                if (_C_) {
                  param$0 = r;
                  continue;
                }
                var _D_ = _C_;
              } else
                var _D_ = _B_;
              return _D_;
            }
          }
          function exists(p, param) {
            var param$0 = param;
            for (; ; ) {
              if (!param$0) return 0;
              var r = param$0[4], d = param$0[3], v = param$0[2], l = param$0[1], _y_ = caml_call2(p, v, d);
              if (_y_)
                var _z_ = _y_;
              else {
                var _A_ = exists(p, l);
                if (!_A_) {
                  param$0 = r;
                  continue;
                }
                var _z_ = _A_;
              }
              return _z_;
            }
          }
          function add_min_binding(k, x2, param) {
            if (!param) return singleton(k, x2);
            var r = param[4], d = param[3], v = param[2], l = param[1];
            return bal(add_min_binding(k, x2, l), v, d, r);
          }
          function add_max_binding(k, x2, param) {
            if (!param) return singleton(k, x2);
            var r = param[4], d = param[3], v = param[2], l = param[1];
            return bal(l, v, d, add_max_binding(k, x2, r));
          }
          function join(l, v, d, r) {
            if (!l) return add_min_binding(v, d, r);
            if (!r) return add_max_binding(v, d, l);
            var rh = r[5], rr = r[4], rd = r[3], rv = r[2], rl = r[1], lh = l[5], lr = l[4], ld = l[3], lv = l[2], ll = l[1];
            return (rh + 2 | 0) < lh ? bal(ll, lv, ld, join(lr, v, d, r)) : (lh + 2 | 0) < rh ? bal(join(l, v, d, rl), rv, rd, rr) : create(l, v, d, r);
          }
          function concat(t1, t2) {
            if (!t1) return t2;
            if (!t2) return t1;
            var match = min_binding(t2), d = match[2], x2 = match[1];
            return join(t1, x2, d, remove_min_binding(t2));
          }
          function concat_or_join(t1, v, d, t2) {
            if (!d) return concat(t1, t2);
            var d$0 = d[1];
            return join(t1, v, d$0, t2);
          }
          function split(x2, param) {
            if (!param) return _a_;
            var r = param[4], d = param[3], v = param[2], l = param[1], c = caml_call2(Ord[1], x2, v);
            if (0 === c) return [0, l, [0, d], r];
            if (0 <= c) {
              var match = split(x2, r), rr = match[3], pres = match[2], lr = match[1];
              return [0, join(l, v, d, lr), pres, rr];
            }
            var match$0 = split(x2, l), rl = match$0[3], pres$0 = match$0[2], ll = match$0[1];
            return [0, ll, pres$0, join(rl, v, d, r)];
          }
          function merge(f, s1, s2) {
            if (s1) {
              var h1 = s1[5], r1 = s1[4], d1 = s1[3], v1 = s1[2], l1 = s1[1];
              if (height(s2) <= h1) {
                var match = split(v1, s2), r2 = match[3], d2 = match[2], l2 = match[1], _u_ = merge(f, r1, r2), _v_ = caml_call3(f, v1, [0, d1], d2);
                return concat_or_join(merge(f, l1, l2), v1, _v_, _u_);
              }
            } else if (!s2) return 0;
            if (!s2)
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _b_], 1);
            var r2$0 = s2[4], d2$0 = s2[3], v2 = s2[2], l2$0 = s2[1], match$0 = split(v2, s1), r1$0 = match$0[3], d1$0 = match$0[2], l1$0 = match$0[1], _w_ = merge(f, r1$0, r2$0), _x_ = caml_call3(f, v2, d1$0, [0, d2$0]);
            return concat_or_join(merge(f, l1$0, l2$0), v2, _x_, _w_);
          }
          function union(f, s1, s2) {
            if (s1) {
              if (s2) {
                var h2 = s2[5], r2 = s2[4], d2 = s2[3], v2 = s2[2], l2 = s2[1], h1 = s1[5], r1 = s1[4], d1 = s1[3], v1 = s1[2], l1 = s1[1];
                if (h2 <= h1) {
                  var match = split(v1, s2), r2$0 = match[3], d2$0 = match[2], l2$0 = match[1], l = union(f, l1, l2$0), r = union(f, r1, r2$0);
                  if (!d2$0) return join(l, v1, d1, r);
                  var d2$1 = d2$0[1];
                  return concat_or_join(l, v1, caml_call3(f, v1, d1, d2$1), r);
                }
                var match$0 = split(v2, s1), r1$0 = match$0[3], d1$0 = match$0[2], l1$0 = match$0[1], l$0 = union(f, l1$0, l2), r$0 = union(f, r1$0, r2);
                if (!d1$0) return join(l$0, v2, d2, r$0);
                var d1$1 = d1$0[1];
                return concat_or_join(l$0, v2, caml_call3(f, v2, d1$1, d2), r$0);
              }
              var s3 = s1;
            } else
              var s3 = s2;
            return s3;
          }
          function filter(p, m) {
            if (!m) return 0;
            var r = m[4], d = m[3], v = m[2], l = m[1], l$0 = filter(p, l), pvd = caml_call2(p, v, d), r$0 = filter(p, r);
            if (!pvd) return concat(l$0, r$0);
            if (l === l$0 && r === r$0) return m;
            return join(l$0, v, d, r$0);
          }
          function filter_map(f, param) {
            if (!param) return 0;
            var r = param[4], d = param[3], v = param[2], l = param[1], l$0 = filter_map(f, l), fvd = caml_call2(f, v, d), r$0 = filter_map(f, r);
            if (!fvd) return concat(l$0, r$0);
            var d$0 = fvd[1];
            return join(l$0, v, d$0, r$0);
          }
          function partition(p, param) {
            if (!param) return _c_;
            var r = param[4], d = param[3], v = param[2], l = param[1], match = partition(p, l), lf = match[2], lt = match[1], pvd = caml_call2(p, v, d), match$0 = partition(p, r), rf = match$0[2], rt = match$0[1];
            if (pvd) {
              var _s_ = concat(lf, rf);
              return [0, join(lt, v, d, rt), _s_];
            }
            var _t_ = join(lf, v, d, rf);
            return [0, concat(lt, rt), _t_];
          }
          function cons_enum(m, e) {
            var m$0 = m, e$0 = e;
            for (; ; ) {
              if (!m$0) return e$0;
              var r = m$0[4], d = m$0[3], v = m$0[2], l = m$0[1], e$1 = [0, v, d, r, e$0];
              m$0 = l;
              e$0 = e$1;
            }
          }
          function compare(cmp, m1, m2) {
            var e2$2 = cons_enum(m2, 0), e1$2 = cons_enum(m1, 0), e1 = e1$2, e2 = e2$2;
            for (; ; ) {
              if (!e1) return e2 ? -1 : 0;
              if (!e2) return 1;
              var e2$0 = e2[4], r2 = e2[3], d2 = e2[2], v2 = e2[1], e1$0 = e1[4], r1 = e1[3], d1 = e1[2], v1 = e1[1], c = caml_call2(Ord[1], v1, v2);
              if (0 !== c) return c;
              var c$0 = caml_call2(cmp, d1, d2);
              if (0 !== c$0) return c$0;
              var e2$1 = cons_enum(r2, e2$0), e1$1 = cons_enum(r1, e1$0);
              e1 = e1$1;
              e2 = e2$1;
            }
          }
          function equal(cmp, m1, m2) {
            var e2$2 = cons_enum(m2, 0), e1$2 = cons_enum(m1, 0), e1 = e1$2, e2 = e2$2;
            for (; ; ) {
              if (!e1) return e2 ? 0 : 1;
              if (!e2) return 0;
              var e2$0 = e2[4], r2 = e2[3], d2 = e2[2], v2 = e2[1], e1$0 = e1[4], r1 = e1[3], d1 = e1[2], v1 = e1[1], _p_ = 0 === caml_call2(Ord[1], v1, v2) ? 1 : 0;
              if (_p_) {
                var _q_ = caml_call2(cmp, d1, d2);
                if (_q_) {
                  var e2$1 = cons_enum(r2, e2$0), e1$1 = cons_enum(r1, e1$0);
                  e1 = e1$1;
                  e2 = e2$1;
                  continue;
                }
                var _r_ = _q_;
              } else
                var _r_ = _p_;
              return _r_;
            }
          }
          function cardinal(param) {
            if (!param) return 0;
            var r = param[4], l = param[1], _o_ = cardinal(r);
            return (cardinal(l) + 1 | 0) + _o_ | 0;
          }
          function bindings_aux(accu, param) {
            var accu$0 = accu, param$0 = param;
            for (; ; ) {
              if (!param$0) return accu$0;
              var r = param$0[4], d = param$0[3], v = param$0[2], l = param$0[1], accu$1 = [0, [0, v, d], bindings_aux(accu$0, r)];
              accu$0 = accu$1;
              param$0 = l;
            }
          }
          function bindings(s2) {
            return bindings_aux(0, s2);
          }
          function of_list(bs) {
            return caml_call3(
              Stdlib_List[26],
              function(m, param) {
                var v = param[2], k = param[1];
                return add(k, v, m);
              },
              empty,
              bs
            );
          }
          function add_seq(i, m) {
            return caml_call3(
              Stdlib_Seq[5],
              function(m2, param) {
                var v = param[2], k = param[1];
                return add(k, v, m2);
              },
              m,
              i
            );
          }
          function of_seq(i) {
            return add_seq(i, empty);
          }
          function seq_of_enum(c, param) {
            if (!c) return 0;
            var rest = c[4], t = c[3], v = c[2], k = c[1], _m_ = cons_enum(t, rest);
            return [0, [0, k, v], function(_n_) {
              return seq_of_enum(_m_, _n_);
            }];
          }
          function to_seq(m) {
            var _k_ = cons_enum(m, 0);
            return function(_l_) {
              return seq_of_enum(_k_, _l_);
            };
          }
          function snoc_enum(s2, e) {
            var s$0 = s2, e$0 = e;
            for (; ; ) {
              if (!s$0) return e$0;
              var r = s$0[4], d = s$0[3], v = s$0[2], l = s$0[1], e$1 = [0, v, d, l, e$0];
              s$0 = r;
              e$0 = e$1;
            }
          }
          function rev_seq_of_enum(c, param) {
            if (!c) return 0;
            var rest = c[4], t = c[3], v = c[2], k = c[1], _i_ = snoc_enum(t, rest);
            return [
              0,
              [0, k, v],
              function(_j_) {
                return rev_seq_of_enum(_i_, _j_);
              }
            ];
          }
          function to_rev_seq(c) {
            var _g_ = snoc_enum(c, 0);
            return function(_h_) {
              return rev_seq_of_enum(_g_, _h_);
            };
          }
          function to_seq_from(low, m) {
            a: {
              b: {
                var m$0 = m, c = 0;
                for (; ; ) {
                  if (!m$0) break;
                  var r = m$0[4], d = m$0[3], v = m$0[2], l = m$0[1], n = caml_call2(Ord[1], v, low);
                  if (0 === n) break b;
                  if (0 <= n) {
                    var c$0 = [0, v, d, r, c];
                    m$0 = l;
                    c = c$0;
                  } else
                    m$0 = r;
                }
                var _e_ = c;
                break a;
              }
              var _e_ = [0, v, d, r, c];
            }
            return function(_f_) {
              return seq_of_enum(_e_, _f_);
            };
          }
          return [
            0,
            empty,
            add,
            add_to_list,
            update,
            singleton,
            remove,
            merge,
            union,
            cardinal,
            bindings,
            min_binding,
            min_binding_opt,
            max_binding,
            max_binding_opt,
            min_binding,
            min_binding_opt,
            find,
            find_opt,
            find_first,
            find_first_opt,
            find_last,
            find_last_opt,
            iter,
            fold,
            map,
            mapi,
            filter,
            filter_map,
            partition,
            split,
            is_empty,
            mem,
            equal,
            compare,
            for_all,
            exists,
            bindings,
            of_list,
            to_seq,
            to_rev_seq,
            to_seq_from,
            add_seq,
            of_seq
          ];
        }
      ];
      runtime.caml_register_global(12, Stdlib_Map, "Stdlib__Map");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib_Seq = global_data.Stdlib__Seq, Stdlib_List = global_data.Stdlib__List, Empty = [248, "Stdlib.Stack.Empty", runtime.caml_fresh_oo_id(0)];
      function create(param) {
        return [0, 0, 0];
      }
      function clear(s2) {
        s2[1] = 0;
        s2[2] = 0;
        return 0;
      }
      function copy(s2) {
        return [0, s2[1], s2[2]];
      }
      function push(x2, s2) {
        s2[1] = [0, x2, s2[1]];
        s2[2] = s2[2] + 1 | 0;
        return 0;
      }
      function pop(s2) {
        var match = s2[1];
        if (!match) throw caml_maybe_attach_backtrace2(Empty, 1);
        var tl = match[2], hd = match[1];
        s2[1] = tl;
        s2[2] = s2[2] - 1 | 0;
        return hd;
      }
      function pop_opt(s2) {
        var match = s2[1];
        if (!match) return 0;
        var tl = match[2], hd = match[1];
        s2[1] = tl;
        s2[2] = s2[2] - 1 | 0;
        return [0, hd];
      }
      function drop(s2) {
        var match = s2[1];
        if (!match) throw caml_maybe_attach_backtrace2(Empty, 1);
        var tl = match[2];
        s2[1] = tl;
        s2[2] = s2[2] - 1 | 0;
        return 0;
      }
      function top(s2) {
        var match = s2[1];
        if (!match) throw caml_maybe_attach_backtrace2(Empty, 1);
        var hd = match[1];
        return hd;
      }
      function top_opt(s2) {
        var match = s2[1];
        if (!match) return 0;
        var hd = match[1];
        return [0, hd];
      }
      function is_empty(s2) {
        return 0 === s2[1] ? 1 : 0;
      }
      function length(s2) {
        return s2[2];
      }
      function iter(f, s2) {
        return caml_call2(Stdlib_List[18], f, s2[1]);
      }
      function fold(f, acc, s2) {
        return caml_call3(Stdlib_List[26], f, acc, s2[1]);
      }
      function to_seq(s2) {
        return caml_call1(Stdlib_List[68], s2[1]);
      }
      function add_seq(q, i) {
        return caml_call2(Stdlib_Seq[4], function(x2) {
          return push(x2, q);
        }, i);
      }
      function of_seq(g) {
        var s2 = create(0);
        add_seq(s2, g);
        return s2;
      }
      var Stdlib_Stack = [
        0,
        Empty,
        create,
        push,
        pop,
        pop_opt,
        drop,
        top,
        top_opt,
        clear,
        copy,
        is_empty,
        length,
        iter,
        fold,
        to_seq,
        add_seq,
        of_seq
      ];
      runtime.caml_register_global(3, Stdlib_Stack, "Stdlib__Stack");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib_Seq = global_data.Stdlib__Seq, Empty = [248, "Stdlib.Queue.Empty", runtime.caml_fresh_oo_id(0)];
      function create(param) {
        return [0, 0, 0, 0];
      }
      function clear(q) {
        q[1] = 0;
        q[2] = 0;
        q[3] = 0;
        return 0;
      }
      function add(x2, q) {
        var cell = [0, x2, 0], match = q[3];
        return match ? (q[1] = q[1] + 1 | 0, match[2] = cell, q[3] = cell, 0) : (q[1] = 1, q[2] = cell, q[3] = cell, 0);
      }
      function peek(q) {
        var match = q[2];
        if (!match) throw caml_maybe_attach_backtrace2(Empty, 1);
        var content = match[1];
        return content;
      }
      function peek_opt(q) {
        var match = q[2];
        if (!match) return 0;
        var content = match[1];
        return [0, content];
      }
      function take(q) {
        var _g_ = q[2];
        if (!_g_) throw caml_maybe_attach_backtrace2(Empty, 1);
        var content = _g_[1];
        if (_g_[2]) {
          var next = _g_[2];
          q[1] = q[1] - 1 | 0;
          q[2] = next;
          return content;
        }
        clear(q);
        return content;
      }
      function take_opt(q) {
        var _f_ = q[2];
        if (!_f_) return 0;
        var content = _f_[1];
        if (_f_[2]) {
          var next = _f_[2];
          q[1] = q[1] - 1 | 0;
          q[2] = next;
          return [0, content];
        }
        clear(q);
        return [0, content];
      }
      function drop(q) {
        var _e_ = q[2];
        if (!_e_) throw caml_maybe_attach_backtrace2(Empty, 1);
        if (!_e_[2]) return clear(q);
        var next = _e_[2];
        q[1] = q[1] - 1 | 0;
        q[2] = next;
        return 0;
      }
      function copy(q) {
        var cell$0 = q[2], q_res = [0, q[1], 0, 0], prev = 0, cell = cell$0;
        for (; ; ) {
          if (!cell) {
            q_res[3] = prev;
            return q_res;
          }
          var content = cell[1], next = cell[2], prev$0 = [0, content, 0];
          if (prev) prev[2] = prev$0;
          else q_res[2] = prev$0;
          prev = prev$0;
          cell = next;
        }
      }
      function is_empty(q) {
        return 0 === q[1] ? 1 : 0;
      }
      function length(q) {
        return q[1];
      }
      function iter(f, q) {
        var cell$0 = q[2], cell = cell$0;
        for (; ; ) {
          if (!cell) return 0;
          var content = cell[1], next = cell[2];
          caml_call1(f, content);
          cell = next;
        }
      }
      function fold(f, accu$1, q) {
        var cell$0 = q[2], accu = accu$1, cell = cell$0;
        for (; ; ) {
          if (!cell) return accu;
          var content = cell[1], next = cell[2], accu$0 = caml_call2(f, accu, content);
          accu = accu$0;
          cell = next;
        }
      }
      function transfer(q1, q2) {
        var _d_ = 0 < q1[1] ? 1 : 0;
        if (!_d_) return _d_;
        var match = q2[3];
        return match ? (q2[1] = q2[1] + q1[1] | 0, match[2] = q1[2], q2[3] = q1[3], clear(q1)) : (q2[1] = q1[1], q2[2] = q1[2], q2[3] = q1[3], clear(q1));
      }
      function to_seq(q) {
        function aux(c, param) {
          if (!c) return 0;
          var x2 = c[1], next = c[2];
          return [0, x2, function(_c_) {
            return aux(next, _c_);
          }];
        }
        var _a_ = q[2];
        return function(_b_) {
          return aux(_a_, _b_);
        };
      }
      function add_seq(q, i) {
        return caml_call2(Stdlib_Seq[4], function(x2) {
          return add(x2, q);
        }, i);
      }
      function of_seq(g) {
        var q = create(0);
        add_seq(q, g);
        return q;
      }
      var Stdlib_Queue = [
        0,
        Empty,
        create,
        add,
        add,
        take,
        take_opt,
        take,
        peek,
        peek_opt,
        peek,
        drop,
        clear,
        copy,
        is_empty,
        length,
        iter,
        fold,
        transfer,
        to_seq,
        add_seq,
        of_seq
      ];
      runtime.caml_register_global(2, Stdlib_Queue, "Stdlib__Queue");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_bswap162 = runtime.caml_bswap16, caml_bytes_get2 = runtime.caml_bytes_get, caml_bytes_set2 = runtime.caml_bytes_set, caml_bytes_set162 = runtime.caml_bytes_set16, caml_bytes_set322 = runtime.caml_bytes_set32, caml_bytes_set642 = runtime.caml_bytes_set64, caml_bytes_unsafe_set2 = runtime.caml_bytes_unsafe_set, caml_create_bytes2 = runtime.caml_create_bytes, caml_int32_bswap2 = runtime.caml_int32_bswap, caml_int64_bswap2 = runtime.caml_int64_bswap, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_bytes_length2 = runtime.caml_ml_bytes_length, caml_ml_string_length2 = runtime.caml_ml_string_length, caml_string_get2 = runtime.caml_string_get, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call4(f, a0, a1, a2, a3) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 4 ? f(a0, a1, a2, a3) : runtime.caml_call_gen(f, [a0, a1, a2, a3]);
      }
      function caml_call5(f, a0, a1, a2, a3, a4) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 5 ? f(a0, a1, a2, a3, a4) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib_Bytes = global_data.Stdlib__Bytes, Stdlib_Sys = global_data.Stdlib__Sys, Stdlib_Seq = global_data.Stdlib__Seq, Stdlib = global_data.Stdlib, Stdlib_String = global_data.Stdlib__String, Assert_failure = global_data.Assert_failure, cst_Buffer_sub = "Buffer.sub", cst_Buffer_blit = "Buffer.blit", cst_Buffer_nth = "Buffer.nth", cst_Buffer_add_cannot_grow_buf = "Buffer.add: cannot grow buffer", dummy = 0;
      function create(n) {
        var n$0 = 1 <= n ? n : 1, n$1 = Stdlib_Sys[12] < n$0 ? Stdlib_Sys[12] : n$0, s2 = caml_create_bytes2(n$1);
        return [0, [0, s2, n$1], 0, s2];
      }
      function contents(b) {
        return caml_call3(Stdlib_Bytes[8], b[1][1], 0, b[2]);
      }
      function to_bytes(b) {
        return caml_call3(Stdlib_Bytes[7], b[1][1], 0, b[2]);
      }
      function sub(b, ofs, len) {
        if (0 <= ofs && 0 <= len && (b[2] - len | 0) >= ofs)
          return caml_call3(Stdlib_Bytes[8], b[1][1], ofs, len);
        return caml_call1(Stdlib[1], cst_Buffer_sub);
      }
      function blit(src, srcoff, dst, dstoff, len) {
        if (0 <= len && 0 <= srcoff && (src[2] - len | 0) >= srcoff && 0 <= dstoff && (caml_ml_bytes_length2(dst) - len | 0) >= dstoff)
          return caml_call5(Stdlib_Bytes[11], src[1][1], srcoff, dst, dstoff, len);
        return caml_call1(Stdlib[1], cst_Buffer_blit);
      }
      function nth(b, ofs) {
        var position = b[2], match = b[1], length2 = match[2], buffer = match[1];
        if (0 <= ofs && position > ofs && length2 >= position)
          return runtime.caml_bytes_unsafe_get(buffer, ofs);
        return caml_call1(Stdlib[1], cst_Buffer_nth);
      }
      function length(b) {
        return b[2];
      }
      function clear(b) {
        b[2] = 0;
        return 0;
      }
      function reset(b) {
        b[2] = 0;
        var inner = [0, b[3], caml_ml_bytes_length2(b[3])];
        b[1] = inner;
        return 0;
      }
      function resize(b, more) {
        var old_pos = b[2], old_len = b[1][2], new_len = [0, old_len];
        for (; ; ) {
          if (new_len[1] >= (old_pos + more | 0)) break;
          new_len[1] = 2 * new_len[1] | 0;
        }
        if (Stdlib_Sys[12] < new_len[1])
          if ((old_pos + more | 0) <= Stdlib_Sys[12])
            new_len[1] = Stdlib_Sys[12];
          else
            caml_call1(Stdlib[2], cst_Buffer_add_cannot_grow_buf);
        var new_buffer = caml_create_bytes2(new_len[1]);
        caml_call5(Stdlib_Bytes[11], b[1][1], 0, new_buffer, 0, b[2]);
        b[1] = [0, new_buffer, new_len[1]];
      }
      function add_char(b, c) {
        var pos = b[2], match = b[1], length2 = match[2], buffer = match[1];
        if (length2 <= pos) {
          resize(b, 1);
          caml_bytes_set2(b[1][1], b[2], c);
        } else
          caml_bytes_unsafe_set2(buffer, pos, c);
        b[2] = pos + 1 | 0;
        return 0;
      }
      var uchar_utf_8_byte_length_max = 4, uchar_utf_16_byte_length_max = 4, cst_Buffer_add_substring = "Buffer.add_substring", cst_Buffer_add_subbytes = "Buffer.add_subbytes", cst_Buffer_add_channel = "Buffer.add_channel", _a_ = [0, "buffer.ml", 222, 9], cst_Buffer_truncate = "Buffer.truncate";
      function add_utf_8_uchar(b, u) {
        for (; ; ) {
          var pos = b[2];
          if (b[1][2] <= pos) resize(b, uchar_utf_8_byte_length_max);
          var n = caml_call3(Stdlib_Bytes[51], b[1][1], pos, u);
          if (0 !== n) {
            b[2] = pos + n | 0;
            return 0;
          }
          resize(b, uchar_utf_8_byte_length_max);
        }
      }
      function add_utf_16be_uchar(b, u) {
        for (; ; ) {
          var pos = b[2];
          if (b[1][2] <= pos) resize(b, uchar_utf_16_byte_length_max);
          var n = caml_call3(Stdlib_Bytes[54], b[1][1], pos, u);
          if (0 !== n) {
            b[2] = pos + n | 0;
            return 0;
          }
          resize(b, uchar_utf_16_byte_length_max);
        }
      }
      function add_utf_16le_uchar(b, u) {
        for (; ; ) {
          var pos = b[2];
          if (b[1][2] <= pos) resize(b, uchar_utf_16_byte_length_max);
          var n = caml_call3(Stdlib_Bytes[57], b[1][1], pos, u);
          if (0 !== n) {
            b[2] = pos + n | 0;
            return 0;
          }
          resize(b, uchar_utf_16_byte_length_max);
        }
      }
      function add_substring(b, s2, offset, len) {
        var _v_ = offset < 0 ? 1 : 0;
        if (_v_)
          var _w_ = _v_;
        else
          var _x_ = len < 0 ? 1 : 0, _w_ = _x_ || ((caml_ml_string_length2(s2) - len | 0) < offset ? 1 : 0);
        if (_w_) caml_call1(Stdlib[1], cst_Buffer_add_substring);
        var position = b[2], match = b[1], length2 = match[2], buffer = match[1], new_position = position + len | 0;
        if (length2 < new_position) {
          resize(b, len);
          caml_call5(Stdlib_Bytes[12], s2, offset, b[1][1], b[2], len);
        } else
          runtime.caml_blit_string(s2, offset, buffer, position, len);
        b[2] = new_position;
        return 0;
      }
      function add_subbytes(b, bytes, offset, len) {
        var _s_ = offset < 0 ? 1 : 0;
        if (_s_)
          var _t_ = _s_;
        else
          var _u_ = len < 0 ? 1 : 0, _t_ = _u_ || ((caml_ml_bytes_length2(bytes) - len | 0) < offset ? 1 : 0);
        if (_t_) caml_call1(Stdlib[1], cst_Buffer_add_subbytes);
        var position = b[2], match = b[1], length2 = match[2], buffer = match[1], new_position = position + len | 0;
        if (length2 < new_position) {
          resize(b, len);
          caml_call5(Stdlib_Bytes[11], bytes, offset, b[1][1], b[2], len);
        } else
          runtime.caml_blit_bytes(bytes, offset, buffer, position, len);
        b[2] = new_position;
        return 0;
      }
      function add_string(b, s2) {
        return add_substring(b, s2, 0, caml_ml_string_length2(s2));
      }
      function add_bytes(b, bytes) {
        return add_subbytes(b, bytes, 0, caml_ml_bytes_length2(bytes));
      }
      function add_buffer(b, bs) {
        return add_subbytes(b, bs[1][1], 0, bs[2]);
      }
      function add_channel(b, ic, to_read$1) {
        var _q_ = to_read$1 < 0 ? 1 : 0, _r_ = _q_ || (Stdlib_Sys[12] < to_read$1 ? 1 : 0);
        if (_r_) caml_call1(Stdlib[1], cst_Buffer_add_channel);
        if (b[1][2] < (b[2] + to_read$1 | 0)) resize(b, to_read$1);
        var ofs$1 = b[2], buf = b[1][1], already_read = 0, ofs = ofs$1, to_read = to_read$1;
        for (; ; ) {
          if (0 !== to_read) {
            var r = caml_call4(Stdlib[84], ic, buf, ofs, to_read);
            if (0 !== r) {
              var already_read$0 = already_read + r | 0, ofs$0 = ofs + r | 0, to_read$0 = to_read - r | 0;
              already_read = already_read$0;
              ofs = ofs$0;
              to_read = to_read$0;
              continue;
            }
          }
          b[2] = b[2] + already_read | 0;
          if (already_read < to_read$1)
            throw caml_maybe_attach_backtrace2(Stdlib[12], 1);
          return 0;
        }
      }
      function output_buffer(oc, b) {
        return caml_call4(Stdlib[68], oc, b[1][1], 0, b[2]);
      }
      function add_substitute(b, f, s2) {
        var lim$1 = caml_ml_string_length2(s2), previous = 32, i$4 = 0;
        for (; ; ) {
          if (i$4 >= lim$1) {
            var _o_ = 92 === previous ? 1 : 0;
            return _o_ ? add_char(b, previous) : _o_;
          }
          var previous$0 = caml_string_get2(s2, i$4);
          if (36 === previous$0)
            if (92 === previous) {
              add_char(b, previous$0);
              var i$5 = i$4 + 1 | 0;
              previous = 32;
              i$4 = i$5;
            } else {
              var start = i$4 + 1 | 0;
              try {
                if (lim$1 <= start) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                var opening = caml_string_get2(s2, start);
                a: {
                  if (40 !== opening && 123 !== opening) {
                    var lim$0 = caml_ml_string_length2(s2);
                    b: {
                      c: {
                        d: {
                          var i$2 = start;
                          for (; ; ) {
                            if (lim$0 <= i$2) break c;
                            var match = caml_string_get2(s2, i$2);
                            if (91 <= match) {
                              if (97 <= match) {
                                if (123 <= match) break d;
                              } else if (95 !== match) break d;
                            } else if (58 <= match) {
                              if (65 > match) break;
                            } else if (48 > match) break d;
                            var i$3 = i$2 + 1 | 0;
                            i$2 = i$3;
                          }
                        }
                        var stop$0 = i$2;
                        break b;
                      }
                      var stop$0 = lim$0;
                    }
                    if (stop$0 === start)
                      throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                    var val = [
                      0,
                      caml_call3(Stdlib_String[16], s2, start, stop$0 - start | 0),
                      stop$0
                    ];
                    break a;
                  }
                  var new_start = start + 1 | 0, k$2 = 0;
                  if (40 === opening)
                    var closing = 41;
                  else {
                    if (123 !== opening)
                      throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
                    var closing = 125;
                  }
                  var lim = caml_ml_string_length2(s2), k = k$2, stop = new_start;
                  for (; ; ) {
                    if (lim <= stop) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                    if (caml_string_get2(s2, stop) === opening) {
                      var i = stop + 1 | 0, k$0 = k + 1 | 0;
                      k = k$0;
                      stop = i;
                    } else if (caml_string_get2(s2, stop) === closing) {
                      if (0 === k) break;
                      var i$0 = stop + 1 | 0, k$1 = k - 1 | 0;
                      k = k$1;
                      stop = i$0;
                    } else {
                      var i$1 = stop + 1 | 0;
                      stop = i$1;
                    }
                  }
                  var val = [
                    0,
                    caml_call3(Stdlib_String[16], s2, new_start, (stop - start | 0) - 1 | 0),
                    stop + 1 | 0
                  ];
                }
              } catch (_p_) {
                var _n_ = caml_wrap_exception2(_p_);
                if (_n_ !== Stdlib[8]) throw caml_maybe_attach_backtrace2(_n_, 0);
                add_char(b, 36);
                previous = 32;
                i$4 = start;
                continue;
              }
              var next_i = val[2], ident = val[1];
              add_string(b, caml_call1(f, ident));
              previous = 32;
              i$4 = next_i;
            }
          else {
            if (92 === previous) add_char(b, previous);
            if (92 !== previous$0) add_char(b, previous$0);
            var i$6 = i$4 + 1 | 0;
            previous = previous$0;
            i$4 = i$6;
          }
        }
      }
      function truncate(b, len) {
        if (0 <= len && b[2] >= len) {
          b[2] = len;
          return 0;
        }
        return caml_call1(Stdlib[1], cst_Buffer_truncate);
      }
      function to_seq(b) {
        function aux(i, param) {
          if (b[2] <= i) return 0;
          var x2 = caml_bytes_get2(b[1][1], i), _l_ = i + 1 | 0;
          return [0, x2, function(_m_) {
            return aux(_l_, _m_);
          }];
        }
        var _j_ = 0;
        return function(_k_) {
          return aux(_j_, _k_);
        };
      }
      function to_seqi(b) {
        function aux(i, param) {
          if (b[2] <= i) return 0;
          var x2 = caml_bytes_get2(b[1][1], i), _h_ = i + 1 | 0;
          return [0, [0, i, x2], function(_i_) {
            return aux(_h_, _i_);
          }];
        }
        var _f_ = 0;
        return function(_g_) {
          return aux(_f_, _g_);
        };
      }
      function add_seq(b, seq) {
        return caml_call2(Stdlib_Seq[4], function(_e_) {
          return add_char(b, _e_);
        }, seq);
      }
      function of_seq(i) {
        var b = create(32);
        add_seq(b, i);
        return b;
      }
      function add_int8(b, x2) {
        var position = b[2], match = b[1], length2 = match[2], buffer = match[1], new_position = position + 1 | 0;
        if (length2 < new_position) {
          resize(b, 1);
          caml_bytes_set2(b[1][1], b[2], x2);
        } else
          caml_bytes_unsafe_set2(buffer, position, x2);
        b[2] = new_position;
        return 0;
      }
      function add_int16_ne(b, x2) {
        var position = b[2], match = b[1], length2 = match[2], buffer = match[1], new_position = position + 2 | 0;
        if (length2 < new_position) {
          resize(b, 2);
          caml_bytes_set162(b[1][1], b[2], x2);
        } else
          caml_bytes_set162(buffer, position, x2);
        b[2] = new_position;
        return 0;
      }
      function add_int32_ne(b, x2) {
        var position = b[2], match = b[1], length2 = match[2], buffer = match[1], new_position = position + 4 | 0;
        if (length2 < new_position) {
          resize(b, 4);
          caml_bytes_set322(b[1][1], b[2], x2);
        } else
          caml_bytes_set322(buffer, position, x2);
        b[2] = new_position;
        return 0;
      }
      function add_int64_ne(b, x2) {
        var position = b[2], match = b[1], length2 = match[2], buffer = match[1], new_position = position + 8 | 0;
        if (length2 < new_position) {
          resize(b, 8);
          caml_bytes_set642(b[1][1], b[2], x2);
        } else
          caml_bytes_set642(buffer, position, x2);
        b[2] = new_position;
        return 0;
      }
      function add_int16_le(b, x2) {
        var _d_ = Stdlib_Sys[11] ? caml_bswap162(x2) : x2;
        return add_int16_ne(b, _d_);
      }
      function add_int16_be(b, x2) {
        var x$0 = Stdlib_Sys[11] ? x2 : caml_bswap162(x2);
        return add_int16_ne(b, x$0);
      }
      function add_int32_le(b, x2) {
        var _c_ = Stdlib_Sys[11] ? caml_int32_bswap2(x2) : x2;
        return add_int32_ne(b, _c_);
      }
      function add_int32_be(b, x2) {
        var x$0 = Stdlib_Sys[11] ? x2 : caml_int32_bswap2(x2);
        return add_int32_ne(b, x$0);
      }
      function add_int64_le(b, x2) {
        var _b_ = Stdlib_Sys[11] ? caml_int64_bswap2(x2) : x2;
        return add_int64_ne(b, _b_);
      }
      function add_int64_be(b, x2) {
        var x$0 = Stdlib_Sys[11] ? x2 : caml_int64_bswap2(x2);
        return add_int64_ne(b, x$0);
      }
      var Stdlib_Buffer = [
        0,
        create,
        contents,
        to_bytes,
        sub,
        blit,
        nth,
        length,
        clear,
        reset,
        output_buffer,
        truncate,
        add_char,
        add_utf_8_uchar,
        add_utf_16le_uchar,
        add_utf_16be_uchar,
        add_string,
        add_bytes,
        add_substring,
        add_subbytes,
        add_substitute,
        add_buffer,
        add_channel,
        to_seq,
        to_seqi,
        add_seq,
        of_seq,
        add_int8,
        add_int8,
        add_int16_ne,
        add_int16_be,
        add_int16_le,
        add_int16_ne,
        add_int16_be,
        add_int16_le,
        add_int32_ne,
        add_int32_be,
        add_int32_le,
        add_int64_ne,
        add_int64_be,
        add_int64_le
      ];
      runtime.caml_register_global(15, Stdlib_Buffer, "Stdlib__Buffer");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_mutex_lock2 = runtime.caml_ml_mutex_lock, caml_ml_mutex_unlock2 = runtime.caml_ml_mutex_unlock, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function protect(m, f) {
        caml_ml_mutex_lock2(m);
        try {
          var x2 = caml_call1(f, 0);
        } catch (e$0) {
          var e = caml_wrap_exception2(e$0);
          caml_ml_mutex_unlock2(m);
          throw caml_maybe_attach_backtrace2(e, 0);
        }
        caml_ml_mutex_unlock2(m);
        return x2;
      }
      var Stdlib_Mutex = [
        0,
        runtime.caml_ml_mutex_new,
        caml_ml_mutex_lock2,
        runtime.caml_ml_mutex_try_lock,
        caml_ml_mutex_unlock2,
        protect
      ];
      runtime.caml_register_global(0, Stdlib_Mutex, "Stdlib__Mutex");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, Stdlib_Condition = [
        0,
        runtime.caml_ml_condition_new,
        runtime.caml_ml_condition_wait,
        runtime.caml_ml_condition_signal,
        runtime.caml_ml_condition_broadcast
      ];
      runtime.caml_register_global(0, Stdlib_Condition, "Stdlib__Condition");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_array_make2 = runtime.caml_array_make, caml_check_bound2 = runtime.caml_check_bound, caml_domain_dls_get2 = runtime.caml_domain_dls_get, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_domain_id2 = runtime.caml_ml_domain_id, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call5(f, a0, a1, a2, a3, a4) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 5 ? f(a0, a1, a2, a3, a4) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4]);
      }
      var dummy = 0, global_data = runtime.caml_get_global_data(), Stdlib_Condition = global_data.Stdlib__Condition, Stdlib_Mutex = global_data.Stdlib__Mutex, Stdlib_Atomic = global_data.Stdlib__Atomic, Stdlib = global_data.Stdlib, Stdlib_Array = global_data.Stdlib__Array, Stdlib_List = global_data.Stdlib__List, Assert_failure = global_data.Assert_failure;
      function cpu_relax(param) {
        return runtime.caml_ml_domain_cpu_relax(0);
      }
      var none = [0, 0];
      function create_dls(param) {
        var st = caml_array_make2(8, none);
        runtime.caml_domain_dls_set(st);
      }
      create_dls(0);
      var key_counter = caml_call1(Stdlib_Atomic[1], 0), parent_keys = caml_call1(Stdlib_Atomic[1], 0), _a_ = [0, "domain.ml", 184, 13];
      function new_key(split_from_parent, init_orphan) {
        var idx = caml_call2(Stdlib_Atomic[7], key_counter, 1), k = [0, idx, init_orphan];
        if (split_from_parent) {
          var split = split_from_parent[1], ki = [0, k, split];
          for (; ; ) {
            var l = caml_call1(Stdlib_Atomic[3], parent_keys);
            if (!(1 - caml_call3(Stdlib_Atomic[6], parent_keys, l, [0, ki, l])))
              break;
          }
        }
        return k;
      }
      function maybe_grow(idx) {
        for (; ; ) {
          var st = caml_domain_dls_get2(0), sz = st.length - 1;
          if (idx < sz) return st;
          var new_sz = sz;
          for (; ; ) {
            if (idx < new_sz) break;
            var s2 = 2 * new_sz | 0;
            new_sz = s2;
          }
          var new_st = caml_array_make2(new_sz, none);
          caml_call5(Stdlib_Array[9], st, 0, new_st, 0, sz);
          if (runtime.caml_domain_dls_compare_and_set(st, new_st)) return new_st;
        }
      }
      function set(param, x2) {
        var idx = param[1], st = maybe_grow(idx);
        caml_check_bound2(st, idx)[1 + idx] = x2;
        return 0;
      }
      function get(param) {
        var init = param[2], idx = param[1], st = maybe_grow(idx), oldval = caml_check_bound2(st, idx)[1 + idx];
        if (oldval !== none) return oldval;
        var new_obj = caml_call1(init, 0), st$0 = caml_domain_dls_get2(0), curval = caml_check_bound2(st$0, idx)[1 + idx], _e_ = curval === oldval ? (st$0[1 + idx] = new_obj, 1) : 0;
        if (_e_) return new_obj;
        var updated_obj = caml_check_bound2(st$0, idx)[1 + idx];
        if (updated_obj !== none) return updated_obj;
        throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
      }
      function get_id(param) {
        var domain = param[1];
        return domain;
      }
      function self2(param) {
        return caml_ml_domain_id2(0);
      }
      function is_main_domain(param) {
        return 0 === caml_ml_domain_id2(0) ? 1 : 0;
      }
      var first_domain_spawned = caml_call1(Stdlib_Atomic[1], 0), first_spawn_function = [0, function(param) {
      }], cst_first_domain_already_spawn = "first domain already spawned";
      function before_first_spawn(f) {
        if (caml_call1(Stdlib_Atomic[3], first_domain_spawned))
          throw caml_maybe_attach_backtrace2([0, Stdlib[6], cst_first_domain_already_spawn], 1);
        var old_f = first_spawn_function[1];
        function new_f(param) {
          caml_call1(old_f, 0);
          return caml_call1(f, 0);
        }
        first_spawn_function[1] = new_f;
        return 0;
      }
      var at_exit_key = new_key(0, function(param) {
        return function(param2) {
          return 0;
        };
      });
      function at_exit(f) {
        var old_exit = get(at_exit_key);
        function new_exit(param) {
          caml_call1(f, 0);
          return caml_call1(old_exit, 0);
        }
        return set(at_exit_key, new_exit);
      }
      function do_at_exit(param) {
        var f = get(at_exit_key);
        return caml_call1(f, 0);
      }
      Stdlib[104][1] = do_at_exit;
      function spawn(f) {
        if (1 - caml_call1(Stdlib_Atomic[3], first_domain_spawned)) {
          caml_call2(Stdlib_Atomic[4], first_domain_spawned, 1);
          caml_call1(first_spawn_function[1], 0);
          first_spawn_function[1] = function(param) {
            return 0;
          };
        }
        var _b_ = caml_call1(Stdlib_Atomic[3], parent_keys), pk = caml_call2(
          Stdlib_List[20],
          function(param) {
            var split = param[2], k = param[1];
            return [0, k, caml_call1(split, get(k))];
          },
          _b_
        ), _c_ = caml_call1(Stdlib_Condition[1], 0), term_sync = [0, 0, caml_call1(Stdlib_Mutex[1], 0), _c_];
        function body(param) {
          try {
            create_dls(0);
            caml_call2(
              Stdlib_List[18],
              function(param2) {
                var v = param2[2], k = param2[1];
                return set(k, v);
              },
              pk
            );
            var res = caml_call1(f, 0);
          } catch (exn$0) {
            var exn = caml_wrap_exception2(exn$0);
            try {
              do_at_exit(0);
            } catch (_d_) {
            }
            throw caml_maybe_attach_backtrace2(exn, 0);
          }
          do_at_exit(0);
          return res;
        }
        var domain = runtime.caml_domain_spawn(body, term_sync);
        return [0, domain, term_sync];
      }
      function join(param) {
        var term_sync = param[2];
        function loop(param2) {
          for (; ; ) {
            var match2 = term_sync[1];
            if (match2) {
              var res = match2[1];
              return res;
            }
            caml_call2(Stdlib_Condition[2], term_sync[3], term_sync[2]);
          }
        }
        var match = caml_call2(Stdlib_Mutex[5], term_sync[2], loop);
        if (0 === match[0]) {
          var x2 = match[1];
          return x2;
        }
        var ex = match[1];
        throw caml_maybe_attach_backtrace2(ex, 1);
      }
      var recommended_domain_count = runtime.caml_recommended_domain_count, Stdlib_Domain = [
        0,
        spawn,
        join,
        get_id,
        self2,
        before_first_spawn,
        at_exit,
        cpu_relax,
        is_main_domain,
        recommended_domain_count,
        runtime.caml_ml_domain_index,
        [0, new_key, get, set]
      ];
      runtime.caml_register_global(9, Stdlib_Domain, "Stdlib__Domain");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst$43 = "", cst_and = " and ", cst_Li$3 = "%Li", cst_i$3 = "%i", cst_li$3 = "%li", cst_ni$3 = "%ni", cst_u$0 = "%u", cst$42 = "' '", cst$41 = "'#'", cst$39 = "'*'", cst$40 = "'+'", cst$44 = ", ", cst_0$3 = "0", cst_at_character_number = ": at character number ", cst$38 = "@[", cst$37 = "@{", cst_bad_input_format_type_mism = "bad input: format type mismatch between ", cst_bad_input_format_type_mism$0 = "bad input: format type mismatch between %S and %S", cst_camlinternalFormat_ml = "camlinternalFormat.ml", cst_invalid_format = "invalid format ", cst_precision$3 = "precision", caml_blit_string2 = runtime.caml_blit_string, caml_bytes_set2 = runtime.caml_bytes_set, caml_create_bytes2 = runtime.caml_create_bytes, caml_format_float2 = runtime.caml_format_float, caml_format_int2 = runtime.caml_format_int, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_string_length2 = runtime.caml_ml_string_length, caml_notequal2 = runtime.caml_notequal, caml_string_get2 = runtime.caml_string_get, caml_string_unsafe_get2 = runtime.caml_string_unsafe_get, caml_trampoline2 = runtime.caml_trampoline, caml_trampoline_return2 = runtime.caml_trampoline_return, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call4(f, a0, a1, a2, a3) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 4 ? f(a0, a1, a2, a3) : runtime.caml_call_gen(f, [a0, a1, a2, a3]);
      }
      function caml_call5(f, a0, a1, a2, a3, a4) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 5 ? f(a0, a1, a2, a3, a4) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4]);
      }
      var dummy = 0, global_data = runtime.caml_get_global_data(), cst$9 = "%{", cst$10 = "%}", cst$11 = "%(", cst$12 = "%)", cst$13 = "%?", cst$18 = cst$37, cst$19 = cst$38, cst$20 = cst$37, cst$21 = cst$38, cst$22 = cst$37, cst$23 = cst$38, cst$26 = cst$39, cst$24 = "'-'", cst$25 = cst$39, cst$27 = cst$40, cst$28 = cst$41, cst$29 = cst$42, cst$30 = cst$40, cst$31 = "'_'", sub_format = [0, 0, cst$43], formatting_lit = [0, "@;", 1, 0], cst$35 = cst$41, cst$32 = cst$40, cst$33 = cst$40, cst$34 = cst$42, cst$36 = cst$40, cst_unexpected_end_of_format = "unexpected end of format", cst$17 = ".", cst$14 = "%!", cst$15 = cst$37, cst$16 = cst$38, cst$8 = "%%", cst$0 = "@]", cst$1 = "@}", cst$2 = "@?", cst$3 = "@\n", cst$4 = "@.", cst$5 = "@@", cst$6 = "@%", cst$7 = "@", cst = ".*", Assert_failure = global_data.Assert_failure, CamlinternalFormatBasics = global_data.CamlinternalFormatBasics, Stdlib = global_data.Stdlib, Stdlib_Buffer = global_data.Stdlib__Buffer, Stdlib_String = global_data.Stdlib__String, Stdlib_Sys = global_data.Stdlib__Sys, Stdlib_Char = global_data.Stdlib__Char, Stdlib_Bytes = global_data.Stdlib__Bytes, Stdlib_Int = global_data.Stdlib__Int, _a_ = [0, 0, 0], cst_c = "%c", cst_s = "%s", cst_i = cst_i$3, cst_li = cst_li$3, cst_ni = cst_ni$3, cst_Li = cst_Li$3, cst_f = "%f", cst_B = "%B", cst_a = "%a", cst_t = "%t", cst_r = "%r", cst_r$0 = "%_r", cst_0c = "0c", _b_ = [0, cst_camlinternalFormat_ml, 850, 23], _c_ = [0, cst_camlinternalFormat_ml, 837, 26], _d_ = [0, cst_camlinternalFormat_ml, 847, 28], _e_ = [0, cst_camlinternalFormat_ml, 815, 21], _f_ = [0, cst_camlinternalFormat_ml, 819, 21], _g_ = [0, cst_camlinternalFormat_ml, 823, 19], _h_ = [0, cst_camlinternalFormat_ml, 827, 22], _i_ = [0, cst_camlinternalFormat_ml, 832, 30], _j_ = [0, cst_camlinternalFormat_ml, 851, 23], _k_ = [0, cst_camlinternalFormat_ml, 836, 26], _l_ = [0, cst_camlinternalFormat_ml, 846, 28], _m_ = [0, cst_camlinternalFormat_ml, 814, 21], _n_ = [0, cst_camlinternalFormat_ml, 818, 21], _o_ = [0, cst_camlinternalFormat_ml, 822, 19], _p_ = [0, cst_camlinternalFormat_ml, 826, 22], _q_ = [0, cst_camlinternalFormat_ml, 831, 30];
      function create_char_set(param) {
        return caml_call2(Stdlib_Bytes[1], 32, 0);
      }
      function add_in_char_set(char_set, c) {
        var str_ind = c >>> 3 | 0, mask = 1 << (c & 7), _cU_ = runtime.caml_bytes_get(char_set, str_ind) | mask;
        return caml_bytes_set2(char_set, str_ind, caml_call1(Stdlib[29], _cU_));
      }
      function freeze_char_set(char_set) {
        return caml_call1(Stdlib_Bytes[6], char_set);
      }
      function rev_char_set(char_set) {
        var char_set$0 = create_char_set(0), i = 0;
        for (; ; ) {
          var _cS_ = caml_string_get2(char_set, i) ^ 255;
          caml_bytes_set2(char_set$0, i, caml_call1(Stdlib[29], _cS_));
          var _cT_ = i + 1 | 0;
          if (31 === i) return caml_call1(Stdlib_Bytes[44], char_set$0);
          i = _cT_;
        }
      }
      function is_in_char_set(char_set, c) {
        var str_ind = c >>> 3 | 0, mask = 1 << (c & 7);
        return 0 !== (caml_string_get2(char_set, str_ind) & mask) ? 1 : 0;
      }
      function pad_of_pad_opt(pad_opt) {
        if (!pad_opt) return 0;
        var width = pad_opt[1];
        return [0, 1, width];
      }
      function param_format_of_ignored_format(ign, fmt) {
        if (typeof ign === "number")
          switch (ign) {
            case 0:
              return [0, [0, fmt]];
            case 1:
              return [0, [1, fmt]];
            case 2:
              return [0, [19, fmt]];
            default:
              return [0, [22, fmt]];
          }
        switch (ign[0]) {
          case 0:
            var pad_opt = ign[1];
            return [0, [2, pad_of_pad_opt(pad_opt), fmt]];
          case 1:
            var pad_opt$0 = ign[1];
            return [0, [3, pad_of_pad_opt(pad_opt$0), fmt]];
          case 2:
            var pad_opt$1 = ign[2], iconv = ign[1];
            return [0, [4, iconv, pad_of_pad_opt(pad_opt$1), 0, fmt]];
          case 3:
            var pad_opt$2 = ign[2], iconv$0 = ign[1];
            return [0, [5, iconv$0, pad_of_pad_opt(pad_opt$2), 0, fmt]];
          case 4:
            var pad_opt$3 = ign[2], iconv$1 = ign[1];
            return [0, [6, iconv$1, pad_of_pad_opt(pad_opt$3), 0, fmt]];
          case 5:
            var pad_opt$4 = ign[2], iconv$2 = ign[1];
            return [0, [7, iconv$2, pad_of_pad_opt(pad_opt$4), 0, fmt]];
          case 6:
            var prec_opt = ign[2], pad_opt$5 = ign[1];
            if (prec_opt)
              var ndec = prec_opt[1], _cR_ = [0, ndec];
            else
              var _cR_ = 0;
            return [0, [8, _a_, pad_of_pad_opt(pad_opt$5), _cR_, fmt]];
          case 7:
            var pad_opt$6 = ign[1];
            return [0, [9, pad_of_pad_opt(pad_opt$6), fmt]];
          case 8:
            var fmtty = ign[2], pad_opt$7 = ign[1];
            return [0, [13, pad_opt$7, fmtty, fmt]];
          case 9:
            var fmtty$0 = ign[2], pad_opt$8 = ign[1];
            return [0, [14, pad_opt$8, fmtty$0, fmt]];
          case 10:
            var char_set = ign[2], width_opt = ign[1];
            return [0, [20, width_opt, char_set, fmt]];
          default:
            var counter = ign[1];
            return [0, [21, counter, fmt]];
        }
      }
      function default_float_precision(fconv) {
        return 5 === fconv[2] ? 12 : -6;
      }
      function buffer_create(init_size) {
        return [0, 0, caml_create_bytes2(init_size)];
      }
      function buffer_check_size(buf, overhead) {
        var len = runtime.caml_ml_bytes_length(buf[2]), min_len = buf[1] + overhead | 0;
        if (len < min_len) {
          var new_len = caml_call2(Stdlib_Int[11], len * 2 | 0, min_len), new_str = caml_create_bytes2(new_len);
          caml_call5(Stdlib_Bytes[11], buf[2], 0, new_str, 0, len);
          buf[2] = new_str;
        }
      }
      function buffer_add_char(buf, c) {
        buffer_check_size(buf, 1);
        caml_bytes_set2(buf[2], buf[1], c);
        buf[1] = buf[1] + 1 | 0;
      }
      function buffer_add_string(buf, s2) {
        var str_len = caml_ml_string_length2(s2);
        buffer_check_size(buf, str_len);
        caml_call5(Stdlib_String[6], s2, 0, buf[2], buf[1], str_len);
        buf[1] = buf[1] + str_len | 0;
      }
      function buffer_contents(buf) {
        return caml_call3(Stdlib_Bytes[8], buf[2], 0, buf[1]);
      }
      function char_of_iconv(iconv) {
        switch (iconv) {
          case 6:
          case 7:
            return 120;
          case 8:
          case 9:
            return 88;
          case 10:
          case 11:
            return 111;
          case 12:
          case 15:
            return 117;
          case 0:
          case 1:
          case 2:
          case 13:
            return 100;
          default:
            return 105;
        }
      }
      function char_of_fconv(opt, fconv) {
        var cF = opt ? opt[1] : 70;
        switch (fconv[2]) {
          case 0:
            return 102;
          case 1:
            return 101;
          case 2:
            return 69;
          case 3:
            return 103;
          case 4:
            return 71;
          case 5:
            return cF;
          case 6:
            return 104;
          case 7:
            return 72;
          default:
            return 70;
        }
      }
      function bprint_padty(buf, padty) {
        switch (padty) {
          case 0:
            return buffer_add_char(buf, 45);
          case 1:
            return;
          default:
            return buffer_add_char(buf, 48);
        }
      }
      function bprint_ignored_flag(buf, ign_flag) {
        return ign_flag ? buffer_add_char(buf, 95) : ign_flag;
      }
      function bprint_pad_opt(buf, pad_opt) {
        if (!pad_opt) return;
        var width = pad_opt[1];
        return buffer_add_string(buf, caml_call1(Stdlib_Int[12], width));
      }
      function bprint_padding(buf, pad) {
        if (typeof pad === "number") return;
        if (0 === pad[0]) {
          var n = pad[2], padty = pad[1];
          bprint_padty(buf, padty);
          return buffer_add_string(buf, caml_call1(Stdlib_Int[12], n));
        }
        var padty$0 = pad[1];
        bprint_padty(buf, padty$0);
        return buffer_add_char(buf, 42);
      }
      function bprint_precision(buf, prec) {
        if (typeof prec !== "number") {
          var n = prec[1];
          buffer_add_char(buf, 46);
          return buffer_add_string(buf, caml_call1(Stdlib_Int[12], n));
        }
        if (prec) return buffer_add_string(buf, cst);
      }
      function bprint_iconv_flag(buf, iconv) {
        switch (iconv) {
          case 1:
          case 4:
            return buffer_add_char(buf, 43);
          case 2:
          case 5:
            return buffer_add_char(buf, 32);
          case 7:
          case 9:
          case 11:
          case 13:
          case 14:
          case 15:
            return buffer_add_char(buf, 35);
          default:
            return;
        }
      }
      function bprint_altint_fmt(buf, ign_flag, iconv, pad, prec, c) {
        buffer_add_char(buf, 37);
        bprint_ignored_flag(buf, ign_flag);
        bprint_iconv_flag(buf, iconv);
        bprint_padding(buf, pad);
        bprint_precision(buf, prec);
        buffer_add_char(buf, c);
        return buffer_add_char(buf, char_of_iconv(iconv));
      }
      function bprint_fconv_flag(buf, fconv) {
        switch (fconv[1]) {
          case 0:
            break;
          case 1:
            buffer_add_char(buf, 43);
            break;
          default:
            buffer_add_char(buf, 32);
        }
        if (8 <= fconv[2]) return buffer_add_char(buf, 35);
      }
      function string_of_formatting_lit(formatting_lit2) {
        if (typeof formatting_lit2 === "number")
          switch (formatting_lit2) {
            case 0:
              return cst$0;
            case 1:
              return cst$1;
            case 2:
              return cst$2;
            case 3:
              return cst$3;
            case 4:
              return cst$4;
            case 5:
              return cst$5;
            default:
              return cst$6;
          }
        switch (formatting_lit2[0]) {
          case 0:
            var str = formatting_lit2[1];
            return str;
          case 1:
            var str$0 = formatting_lit2[1];
            return str$0;
          default:
            var c = formatting_lit2[1], _cQ_ = caml_call2(Stdlib_String[1], 1, c);
            return caml_call2(Stdlib[28], cst$7, _cQ_);
        }
      }
      function bprint_char_literal(buf, chr) {
        return 37 === chr ? buffer_add_string(buf, cst$8) : buffer_add_char(buf, chr);
      }
      function bprint_string_literal(buf, str) {
        var _cO_ = caml_ml_string_length2(str) - 1 | 0, _cN_ = 0;
        if (_cO_ >= 0) {
          var i = _cN_;
          for (; ; ) {
            bprint_char_literal(buf, caml_string_get2(str, i));
            var _cP_ = i + 1 | 0;
            if (_cO_ === i) break;
            i = _cP_;
          }
        }
      }
      function bprint_fmtty(buf, fmtty) {
        var fmtty$0 = fmtty;
        for (; ; ) {
          if (typeof fmtty$0 === "number") return;
          switch (fmtty$0[0]) {
            case 0:
              var fmtty$1 = fmtty$0[1];
              buffer_add_string(buf, cst_c);
              fmtty$0 = fmtty$1;
              break;
            case 1:
              var fmtty$2 = fmtty$0[1];
              buffer_add_string(buf, cst_s);
              fmtty$0 = fmtty$2;
              break;
            case 2:
              var fmtty$3 = fmtty$0[1];
              buffer_add_string(buf, cst_i);
              fmtty$0 = fmtty$3;
              break;
            case 3:
              var fmtty$4 = fmtty$0[1];
              buffer_add_string(buf, cst_li);
              fmtty$0 = fmtty$4;
              break;
            case 4:
              var fmtty$5 = fmtty$0[1];
              buffer_add_string(buf, cst_ni);
              fmtty$0 = fmtty$5;
              break;
            case 5:
              var fmtty$6 = fmtty$0[1];
              buffer_add_string(buf, cst_Li);
              fmtty$0 = fmtty$6;
              break;
            case 6:
              var fmtty$7 = fmtty$0[1];
              buffer_add_string(buf, cst_f);
              fmtty$0 = fmtty$7;
              break;
            case 7:
              var fmtty$8 = fmtty$0[1];
              buffer_add_string(buf, cst_B);
              fmtty$0 = fmtty$8;
              break;
            case 8:
              var fmtty$9 = fmtty$0[2], sub_fmtty = fmtty$0[1];
              buffer_add_string(buf, cst$9);
              bprint_fmtty(buf, sub_fmtty);
              buffer_add_string(buf, cst$10);
              fmtty$0 = fmtty$9;
              break;
            case 9:
              var fmtty$10 = fmtty$0[3], sub_fmtty$0 = fmtty$0[1];
              buffer_add_string(buf, cst$11);
              bprint_fmtty(buf, sub_fmtty$0);
              buffer_add_string(buf, cst$12);
              fmtty$0 = fmtty$10;
              break;
            case 10:
              var fmtty$11 = fmtty$0[1];
              buffer_add_string(buf, cst_a);
              fmtty$0 = fmtty$11;
              break;
            case 11:
              var fmtty$12 = fmtty$0[1];
              buffer_add_string(buf, cst_t);
              fmtty$0 = fmtty$12;
              break;
            case 12:
              var fmtty$13 = fmtty$0[1];
              buffer_add_string(buf, cst$13);
              fmtty$0 = fmtty$13;
              break;
            case 13:
              var fmtty$14 = fmtty$0[1];
              buffer_add_string(buf, cst_r);
              fmtty$0 = fmtty$14;
              break;
            default:
              var fmtty$15 = fmtty$0[1];
              buffer_add_string(buf, cst_r$0);
              fmtty$0 = fmtty$15;
          }
        }
      }
      function int_of_custom_arity(param) {
        if (!param) return 0;
        var x2 = param[1];
        return 1 + int_of_custom_arity(x2) | 0;
      }
      function string_of_fmt(fmt) {
        var buf = buffer_create(16);
        function fmtiter(fmt2, ign_flag) {
          var fmt$0 = fmt2, ign_flag$0 = ign_flag;
          for (; ; ) {
            if (typeof fmt$0 === "number") return;
            switch (fmt$0[0]) {
              case 0:
                var rest = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                buffer_add_char(buf, 99);
                fmt$0 = rest;
                ign_flag$0 = 0;
                break;
              case 1:
                var rest$0 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                buffer_add_char(buf, 67);
                fmt$0 = rest$0;
                ign_flag$0 = 0;
                break;
              case 2:
                var rest$1 = fmt$0[2], pad = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_padding(buf, pad);
                buffer_add_char(buf, 115);
                fmt$0 = rest$1;
                ign_flag$0 = 0;
                break;
              case 3:
                var rest$2 = fmt$0[2], pad$0 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_padding(buf, pad$0);
                buffer_add_char(buf, 83);
                fmt$0 = rest$2;
                ign_flag$0 = 0;
                break;
              case 4:
                var rest$3 = fmt$0[4], prec = fmt$0[3], pad$1 = fmt$0[2], iconv = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_iconv_flag(buf, iconv);
                bprint_padding(buf, pad$1);
                bprint_precision(buf, prec);
                buffer_add_char(buf, char_of_iconv(iconv));
                fmt$0 = rest$3;
                ign_flag$0 = 0;
                break;
              case 5:
                var rest$4 = fmt$0[4], prec$0 = fmt$0[3], pad$2 = fmt$0[2], iconv$0 = fmt$0[1];
                bprint_altint_fmt(buf, ign_flag$0, iconv$0, pad$2, prec$0, 108);
                fmt$0 = rest$4;
                ign_flag$0 = 0;
                break;
              case 6:
                var rest$5 = fmt$0[4], prec$1 = fmt$0[3], pad$3 = fmt$0[2], iconv$1 = fmt$0[1];
                bprint_altint_fmt(buf, ign_flag$0, iconv$1, pad$3, prec$1, 110);
                fmt$0 = rest$5;
                ign_flag$0 = 0;
                break;
              case 7:
                var rest$6 = fmt$0[4], prec$2 = fmt$0[3], pad$4 = fmt$0[2], iconv$2 = fmt$0[1];
                bprint_altint_fmt(buf, ign_flag$0, iconv$2, pad$4, prec$2, 76);
                fmt$0 = rest$6;
                ign_flag$0 = 0;
                break;
              case 8:
                var rest$7 = fmt$0[4], prec$3 = fmt$0[3], pad$5 = fmt$0[2], fconv = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_fconv_flag(buf, fconv);
                bprint_padding(buf, pad$5);
                bprint_precision(buf, prec$3);
                buffer_add_char(buf, char_of_fconv(0, fconv));
                fmt$0 = rest$7;
                ign_flag$0 = 0;
                break;
              case 9:
                var rest$8 = fmt$0[2], pad$6 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_padding(buf, pad$6);
                buffer_add_char(buf, 66);
                fmt$0 = rest$8;
                ign_flag$0 = 0;
                break;
              case 10:
                var rest$9 = fmt$0[1];
                buffer_add_string(buf, cst$14);
                fmt$0 = rest$9;
                break;
              case 11:
                var rest$10 = fmt$0[2], str = fmt$0[1];
                bprint_string_literal(buf, str);
                fmt$0 = rest$10;
                break;
              case 12:
                var rest$11 = fmt$0[2], chr = fmt$0[1];
                bprint_char_literal(buf, chr);
                fmt$0 = rest$11;
                break;
              case 13:
                var rest$12 = fmt$0[3], fmtty = fmt$0[2], pad_opt = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_pad_opt(buf, pad_opt);
                buffer_add_char(buf, 123);
                bprint_fmtty(buf, fmtty);
                buffer_add_char(buf, 37);
                buffer_add_char(buf, 125);
                fmt$0 = rest$12;
                ign_flag$0 = 0;
                break;
              case 14:
                var rest$13 = fmt$0[3], fmtty$0 = fmt$0[2], pad_opt$0 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_pad_opt(buf, pad_opt$0);
                buffer_add_char(buf, 40);
                bprint_fmtty(buf, fmtty$0);
                buffer_add_char(buf, 37);
                buffer_add_char(buf, 41);
                fmt$0 = rest$13;
                ign_flag$0 = 0;
                break;
              case 15:
                var rest$14 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                buffer_add_char(buf, 97);
                fmt$0 = rest$14;
                ign_flag$0 = 0;
                break;
              case 16:
                var rest$15 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                buffer_add_char(buf, 116);
                fmt$0 = rest$15;
                ign_flag$0 = 0;
                break;
              case 17:
                var rest$16 = fmt$0[2], fmting_lit = fmt$0[1];
                bprint_string_literal(buf, string_of_formatting_lit(fmting_lit));
                fmt$0 = rest$16;
                break;
              case 18:
                var rest$17 = fmt$0[2], fmting_gen = fmt$0[1];
                if (0 === fmting_gen[0]) {
                  var str$0 = fmting_gen[1][2];
                  buffer_add_string(buf, cst$15);
                  buffer_add_string(buf, str$0);
                } else {
                  var str$1 = fmting_gen[1][2];
                  buffer_add_string(buf, cst$16);
                  buffer_add_string(buf, str$1);
                }
                fmt$0 = rest$17;
                break;
              case 19:
                var rest$18 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                buffer_add_char(buf, 114);
                fmt$0 = rest$18;
                ign_flag$0 = 0;
                break;
              case 20:
                var rest$19 = fmt$0[3], char_set = fmt$0[2], width_opt = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_pad_opt(buf, width_opt);
                var print_char = function(buf2, i2) {
                  var c = caml_call1(Stdlib[29], i2);
                  return 37 === c ? (buffer_add_char(buf2, 37), buffer_add_char(buf2, 37)) : 64 === c ? (buffer_add_char(buf2, 37), buffer_add_char(buf2, 64)) : buffer_add_char(buf2, c);
                };
                buffer_add_char(buf, 91);
                var set = is_in_char_set(char_set, 0) ? (buffer_add_char(buf, 94), rev_char_set(char_set)) : char_set;
                let set$0 = set;
                var is_alone = function(c) {
                  var after = caml_call1(Stdlib_Char[1], c + 1 | 0), before = caml_call1(Stdlib_Char[1], c - 1 | 0), _cJ_ = is_in_char_set(set$0, c);
                  if (_cJ_)
                    var _cK_ = is_in_char_set(set$0, before), _cL_ = _cK_ ? is_in_char_set(set$0, after) : _cK_, _cM_ = 1 - _cL_;
                  else
                    var _cM_ = _cJ_;
                  return _cM_;
                };
                if (is_alone(93)) buffer_add_char(buf, 93);
                a:
                  b: {
                    c: {
                      d: {
                        var i = 1;
                        for (; ; ) {
                          if (i >= 256) break;
                          if (is_in_char_set(set, caml_call1(Stdlib[29], i))) {
                            var switcher = caml_call1(Stdlib[29], i) - 45 | 0;
                            if (48 < switcher >>> 0) {
                              if (210 <= switcher) break d;
                            } else if (46 < switcher - 1 >>> 0) {
                              var i$2 = i + 1 | 0;
                              i = i$2;
                              continue;
                            }
                            var i$1 = i + 1 | 0;
                            if (is_in_char_set(set, caml_call1(Stdlib[29], i$1))) {
                              var switcher$0 = caml_call1(Stdlib[29], i$1) - 45 | 0;
                              if (48 < switcher$0 >>> 0) {
                                if (210 <= switcher$0) break c;
                              } else if (46 < switcher$0 - 1 >>> 0 && !is_in_char_set(set, caml_call1(Stdlib[29], i$1 + 1 | 0))) {
                                print_char(buf, i$1 - 1 | 0);
                                var i$5 = i$1 + 1 | 0;
                                i = i$5;
                                continue;
                              }
                              if (is_in_char_set(set, caml_call1(Stdlib[29], i$1 + 1 | 0))) {
                                var j = i$1 + 2 | 0, i$3 = i$1 - 1 | 0, j$0 = j;
                                for (; ; ) {
                                  if (256 === j$0) break;
                                  if (!is_in_char_set(set, caml_call1(Stdlib[29], j$0))) break;
                                  var j$1 = j$0 + 1 | 0;
                                  j$0 = j$1;
                                }
                                print_char(buf, i$3);
                                print_char(buf, 45);
                                print_char(buf, j$0 - 1 | 0);
                                if (j$0 >= 256) break b;
                                var i$7 = j$0 + 1 | 0;
                                i = i$7;
                              } else {
                                print_char(buf, i$1 - 1 | 0);
                                print_char(buf, i$1);
                                var i$4 = i$1 + 2 | 0;
                                i = i$4;
                              }
                            } else {
                              print_char(buf, i$1 - 1 | 0);
                              var i$6 = i$1 + 1 | 0;
                              i = i$6;
                            }
                          } else {
                            var i$0 = i + 1 | 0;
                            i = i$0;
                          }
                        }
                        break a;
                      }
                      print_char(buf, 255);
                      break a;
                    }
                    print_char(buf, 254);
                    print_char(buf, 255);
                    break a;
                  }
                if (is_alone(45)) buffer_add_char(buf, 45);
                buffer_add_char(buf, 93);
                fmt$0 = rest$19;
                ign_flag$0 = 0;
                break;
              case 21:
                var rest$20 = fmt$0[2], counter = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                switch (counter) {
                  case 0:
                    var _cF_ = 108;
                    break;
                  case 1:
                    var _cF_ = 110;
                    break;
                  default:
                    var _cF_ = 78;
                }
                buffer_add_char(buf, _cF_);
                fmt$0 = rest$20;
                ign_flag$0 = 0;
                break;
              case 22:
                var rest$21 = fmt$0[1];
                buffer_add_char(buf, 37);
                bprint_ignored_flag(buf, ign_flag$0);
                bprint_string_literal(buf, cst_0c);
                fmt$0 = rest$21;
                ign_flag$0 = 0;
                break;
              case 23:
                var rest$22 = fmt$0[2], ign = fmt$0[1], fmt$1 = param_format_of_ignored_format(ign, rest$22)[1];
                fmt$0 = fmt$1;
                ign_flag$0 = 1;
                break;
              default:
                var rest$23 = fmt$0[3], arity = fmt$0[1], _cH_ = int_of_custom_arity(arity), _cG_ = 1;
                if (_cH_ >= 1) {
                  var i$8 = _cG_;
                  for (; ; ) {
                    buffer_add_char(buf, 37);
                    bprint_ignored_flag(buf, ign_flag$0);
                    buffer_add_char(buf, 63);
                    var _cI_ = i$8 + 1 | 0;
                    if (_cH_ === i$8) break;
                    i$8 = _cI_;
                  }
                }
                fmt$0 = rest$23;
                ign_flag$0 = 0;
            }
          }
        }
        fmtiter(fmt, 0);
        return buffer_contents(buf);
      }
      function symm(param) {
        if (typeof param === "number") return 0;
        switch (param[0]) {
          case 0:
            var rest = param[1];
            return [0, symm(rest)];
          case 1:
            var rest$0 = param[1];
            return [1, symm(rest$0)];
          case 2:
            var rest$1 = param[1];
            return [2, symm(rest$1)];
          case 3:
            var rest$2 = param[1];
            return [3, symm(rest$2)];
          case 4:
            var rest$3 = param[1];
            return [4, symm(rest$3)];
          case 5:
            var rest$4 = param[1];
            return [5, symm(rest$4)];
          case 6:
            var rest$5 = param[1];
            return [6, symm(rest$5)];
          case 7:
            var rest$6 = param[1];
            return [7, symm(rest$6)];
          case 8:
            var rest$7 = param[2], ty = param[1];
            return [8, ty, symm(rest$7)];
          case 9:
            var rest$8 = param[3], ty2 = param[2], ty1 = param[1];
            return [9, ty2, ty1, symm(rest$8)];
          case 10:
            var rest$9 = param[1];
            return [10, symm(rest$9)];
          case 11:
            var rest$10 = param[1];
            return [11, symm(rest$10)];
          case 12:
            var rest$11 = param[1];
            return [12, symm(rest$11)];
          case 13:
            var rest$12 = param[1];
            return [13, symm(rest$12)];
          default:
            var rest$13 = param[1];
            return [14, symm(rest$13)];
        }
      }
      function fmtty_rel_det(param) {
        if (typeof param === "number")
          return [0, , function(param2) {
          }, , function(param2) {
          }];
        switch (param[0]) {
          case 0:
            var rest = param[1], match = fmtty_rel_det(rest), de = match[4], af = match[2];
            return [0, , function(param2) {
              af(0);
            }, , de];
          case 1:
            var rest$0 = param[1], match$0 = fmtty_rel_det(rest$0), de$0 = match$0[4], af$0 = match$0[2];
            return [0, , function(param2) {
              af$0(0);
            }, , de$0];
          case 2:
            var rest$1 = param[1], match$1 = fmtty_rel_det(rest$1), de$1 = match$1[4], af$1 = match$1[2];
            return [0, , function(param2) {
              af$1(0);
            }, , de$1];
          case 3:
            var rest$2 = param[1], match$2 = fmtty_rel_det(rest$2), de$2 = match$2[4], af$2 = match$2[2];
            return [0, , function(param2) {
              af$2(0);
            }, , de$2];
          case 4:
            var rest$3 = param[1], match$3 = fmtty_rel_det(rest$3), de$3 = match$3[4], af$3 = match$3[2];
            return [0, , function(param2) {
              af$3(0);
            }, , de$3];
          case 5:
            var rest$4 = param[1], match$4 = fmtty_rel_det(rest$4), de$4 = match$4[4], af$4 = match$4[2];
            return [0, , function(param2) {
              af$4(0);
            }, , de$4];
          case 6:
            var rest$5 = param[1], match$5 = fmtty_rel_det(rest$5), de$5 = match$5[4], af$5 = match$5[2];
            return [0, , function(param2) {
              af$5(0);
            }, , de$5];
          case 7:
            var rest$6 = param[1], match$6 = fmtty_rel_det(rest$6), de$6 = match$6[4], af$6 = match$6[2];
            return [0, , function(param2) {
              af$6(0);
            }, , de$6];
          case 8:
            var rest$7 = param[2], match$7 = fmtty_rel_det(rest$7), de$7 = match$7[4], af$7 = match$7[2];
            return [0, , function(param2) {
              af$7(0);
            }, , de$7];
          case 9:
            var rest$8 = param[3], ty2 = param[2], ty1 = param[1], match$8 = fmtty_rel_det(rest$8), de$8 = match$8[4], af$8 = match$8[2], ty = trans(symm(ty1), ty2), match$9 = fmtty_rel_det(ty), jd = match$9[4], ga = match$9[2];
            return [
              0,
              ,
              function(param2) {
                ga(0);
                af$8(0);
              },
              ,
              function(param2) {
                jd(0);
                de$8(0);
              }
            ];
          case 10:
            var rest$9 = param[1], match$10 = fmtty_rel_det(rest$9), de$9 = match$10[4], af$9 = match$10[2];
            return [0, , function(param2) {
              af$9(0);
            }, , de$9];
          case 11:
            var rest$10 = param[1], match$11 = fmtty_rel_det(rest$10), de$10 = match$11[4], af$10 = match$11[2];
            return [0, , function(param2) {
              af$10(0);
            }, , de$10];
          case 12:
            var rest$11 = param[1], match$12 = fmtty_rel_det(rest$11), de$11 = match$12[4], af$11 = match$12[2];
            return [0, , function(param2) {
              af$11(0);
            }, , de$11];
          case 13:
            var rest$12 = param[1], match$13 = fmtty_rel_det(rest$12), de$12 = match$13[4], af$12 = match$13[2];
            return [0, , function(param2) {
              af$12(0);
            }, , function(param2) {
              de$12(0);
            }];
          default:
            var rest$13 = param[1], match$14 = fmtty_rel_det(rest$13), de$13 = match$14[4], af$13 = match$14[2];
            return [0, , function(param2) {
              af$13(0);
            }, , function(param2) {
              de$13(0);
            }];
        }
      }
      function trans(ty1, ty2) {
        a: {
          b: {
            c: {
              d: {
                e: {
                  f: {
                    g: {
                      if (typeof ty1 !== "number") {
                        switch (ty1[0]) {
                          case 0:
                            var rest1 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 0:
                                  var rest2 = ty2[1];
                                  return [0, trans(rest1, rest2)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 1:
                            var rest1$0 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 1:
                                  var rest2$0 = ty2[1];
                                  return [1, trans(rest1$0, rest2$0)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 2:
                            var rest1$1 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 2:
                                  var rest2$1 = ty2[1];
                                  return [2, trans(rest1$1, rest2$1)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 3:
                            var rest1$2 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 3:
                                  var rest2$2 = ty2[1];
                                  return [3, trans(rest1$2, rest2$2)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 4:
                            var rest1$3 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 4:
                                  var rest2$3 = ty2[1];
                                  return [4, trans(rest1$3, rest2$3)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 5:
                            var rest1$4 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 5:
                                  var rest2$4 = ty2[1];
                                  return [5, trans(rest1$4, rest2$4)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 6:
                            var rest1$5 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 6:
                                  var rest2$5 = ty2[1];
                                  return [6, trans(rest1$5, rest2$5)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 7:
                            var rest1$6 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 7:
                                  var rest2$6 = ty2[1];
                                  return [7, trans(rest1$6, rest2$6)];
                                case 8:
                                  break f;
                                case 9:
                                  break g;
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            break;
                          case 8:
                            var rest1$7 = ty1[2], ty1$0 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 8:
                                  var rest2$7 = ty2[2], ty2$0 = ty2[1], _cE_ = trans(rest1$7, rest2$7);
                                  return [8, trans(ty1$0, ty2$0), _cE_];
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            throw caml_maybe_attach_backtrace2([0, Assert_failure, _k_], 1);
                          case 9:
                            var rest1$8 = ty1[3], ty12 = ty1[2], ty11 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 8:
                                  break f;
                                case 9:
                                  var rest2$8 = ty2[3], ty22 = ty2[2], ty21 = ty2[1], ty = trans(symm(ty12), ty21), match = fmtty_rel_det(ty), f4 = match[4], f2 = match[2];
                                  f2(0);
                                  f4(0);
                                  return [9, ty11, ty22, trans(rest1$8, rest2$8)];
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  break e;
                              }
                            throw caml_maybe_attach_backtrace2([0, Assert_failure, _l_], 1);
                          case 10:
                            var rest1$9 = ty1[1];
                            if (typeof ty2 !== "number" && 10 === ty2[0]) {
                              var rest2$9 = ty2[1];
                              return [10, trans(rest1$9, rest2$9)];
                            }
                            throw caml_maybe_attach_backtrace2([0, Assert_failure, _m_], 1);
                          case 11:
                            var rest1$10 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 10:
                                  break a;
                                case 11:
                                  var rest2$10 = ty2[1];
                                  return [11, trans(rest1$10, rest2$10)];
                              }
                            throw caml_maybe_attach_backtrace2([0, Assert_failure, _n_], 1);
                          case 12:
                            var rest1$11 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  var rest2$11 = ty2[1];
                                  return [12, trans(rest1$11, rest2$11)];
                              }
                            throw caml_maybe_attach_backtrace2([0, Assert_failure, _o_], 1);
                          case 13:
                            var rest1$12 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  var rest2$12 = ty2[1];
                                  return [13, trans(rest1$12, rest2$12)];
                              }
                            throw caml_maybe_attach_backtrace2([0, Assert_failure, _p_], 1);
                          default:
                            var rest1$13 = ty1[1];
                            if (typeof ty2 !== "number")
                              switch (ty2[0]) {
                                case 10:
                                  break a;
                                case 11:
                                  break b;
                                case 12:
                                  break c;
                                case 13:
                                  break d;
                                case 14:
                                  var rest2$13 = ty2[1];
                                  return [14, trans(rest1$13, rest2$13)];
                              }
                            throw caml_maybe_attach_backtrace2([0, Assert_failure, _q_], 1);
                        }
                        throw caml_maybe_attach_backtrace2([0, Assert_failure, _j_], 1);
                      }
                      if (typeof ty2 === "number") return 0;
                      switch (ty2[0]) {
                        case 10:
                          break a;
                        case 11:
                          break b;
                        case 12:
                          break c;
                        case 13:
                          break d;
                        case 14:
                          break e;
                        case 8:
                          break f;
                        case 9:
                          break;
                        default:
                          throw caml_maybe_attach_backtrace2([0, Assert_failure, _b_], 1);
                      }
                    }
                    throw caml_maybe_attach_backtrace2([0, Assert_failure, _d_], 1);
                  }
                  throw caml_maybe_attach_backtrace2([0, Assert_failure, _c_], 1);
                }
                throw caml_maybe_attach_backtrace2([0, Assert_failure, _i_], 1);
              }
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _h_], 1);
            }
            throw caml_maybe_attach_backtrace2([0, Assert_failure, _g_], 1);
          }
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _f_], 1);
        }
        throw caml_maybe_attach_backtrace2([0, Assert_failure, _e_], 1);
      }
      function fmtty_of_fmt(fmtty) {
        var fmtty$0 = fmtty;
        for (; ; ) {
          if (typeof fmtty$0 === "number") return 0;
          switch (fmtty$0[0]) {
            case 0:
              var rest = fmtty$0[1];
              return [0, fmtty_of_fmt(rest)];
            case 1:
              var rest$0 = fmtty$0[1];
              return [0, fmtty_of_fmt(rest$0)];
            case 2:
              var rest$1 = fmtty$0[2], pad = fmtty$0[1];
              return fmtty_of_padding_fmtty(pad, [1, fmtty_of_fmt(rest$1)]);
            case 3:
              var rest$2 = fmtty$0[2], pad$0 = fmtty$0[1];
              return fmtty_of_padding_fmtty(pad$0, [1, fmtty_of_fmt(rest$2)]);
            case 4:
              var rest$3 = fmtty$0[4], prec = fmtty$0[3], pad$1 = fmtty$0[2], ty_rest = fmtty_of_fmt(rest$3), prec_ty = fmtty_of_precision_fmtty(prec, [2, ty_rest]);
              return fmtty_of_padding_fmtty(pad$1, prec_ty);
            case 5:
              var rest$4 = fmtty$0[4], prec$0 = fmtty$0[3], pad$2 = fmtty$0[2], ty_rest$0 = fmtty_of_fmt(rest$4), prec_ty$0 = fmtty_of_precision_fmtty(prec$0, [3, ty_rest$0]);
              return fmtty_of_padding_fmtty(pad$2, prec_ty$0);
            case 6:
              var rest$5 = fmtty$0[4], prec$1 = fmtty$0[3], pad$3 = fmtty$0[2], ty_rest$1 = fmtty_of_fmt(rest$5), prec_ty$1 = fmtty_of_precision_fmtty(prec$1, [4, ty_rest$1]);
              return fmtty_of_padding_fmtty(pad$3, prec_ty$1);
            case 7:
              var rest$6 = fmtty$0[4], prec$2 = fmtty$0[3], pad$4 = fmtty$0[2], ty_rest$2 = fmtty_of_fmt(rest$6), prec_ty$2 = fmtty_of_precision_fmtty(prec$2, [5, ty_rest$2]);
              return fmtty_of_padding_fmtty(pad$4, prec_ty$2);
            case 8:
              var rest$7 = fmtty$0[4], prec$3 = fmtty$0[3], pad$5 = fmtty$0[2], ty_rest$3 = fmtty_of_fmt(rest$7), prec_ty$3 = fmtty_of_precision_fmtty(prec$3, [6, ty_rest$3]);
              return fmtty_of_padding_fmtty(pad$5, prec_ty$3);
            case 9:
              var rest$8 = fmtty$0[2], pad$6 = fmtty$0[1];
              return fmtty_of_padding_fmtty(pad$6, [7, fmtty_of_fmt(rest$8)]);
            case 10:
              var fmtty$1 = fmtty$0[1];
              fmtty$0 = fmtty$1;
              break;
            case 11:
              var fmtty$2 = fmtty$0[2];
              fmtty$0 = fmtty$2;
              break;
            case 12:
              var fmtty$3 = fmtty$0[2];
              fmtty$0 = fmtty$3;
              break;
            case 13:
              var rest$9 = fmtty$0[3], ty = fmtty$0[2];
              return [8, ty, fmtty_of_fmt(rest$9)];
            case 14:
              var rest$10 = fmtty$0[3], ty$0 = fmtty$0[2];
              return [9, ty$0, ty$0, fmtty_of_fmt(rest$10)];
            case 15:
              var rest$11 = fmtty$0[1];
              return [10, fmtty_of_fmt(rest$11)];
            case 16:
              var rest$12 = fmtty$0[1];
              return [11, fmtty_of_fmt(rest$12)];
            case 17:
              var fmtty$4 = fmtty$0[2];
              fmtty$0 = fmtty$4;
              break;
            case 18:
              var rest$13 = fmtty$0[2], formatting_gen = fmtty$0[1], _cB_ = fmtty_of_fmt(rest$13);
              if (0 === formatting_gen[0])
                var fmt = formatting_gen[1][1], _cC_ = fmtty_of_fmt(fmt);
              else
                var fmt$0 = formatting_gen[1][1], _cC_ = fmtty_of_fmt(fmt$0);
              return caml_call2(CamlinternalFormatBasics[1], _cC_, _cB_);
            case 19:
              var rest$14 = fmtty$0[1];
              return [13, fmtty_of_fmt(rest$14)];
            case 20:
              var rest$15 = fmtty$0[3];
              return [1, fmtty_of_fmt(rest$15)];
            case 21:
              var rest$16 = fmtty$0[2];
              return [2, fmtty_of_fmt(rest$16)];
            case 22:
              var rest$17 = fmtty$0[1];
              return [0, fmtty_of_fmt(rest$17)];
            case 23:
              var fmtty$5 = fmtty$0[2], ign = fmtty$0[1];
              if (typeof ign === "number")
                switch (ign) {
                  case 0:
                    fmtty$0 = fmtty$5;
                    break;
                  case 1:
                    fmtty$0 = fmtty$5;
                    break;
                  case 2:
                    return [14, fmtty_of_fmt(fmtty$5)];
                  default:
                    fmtty$0 = fmtty$5;
                }
              else
                switch (ign[0]) {
                  case 0:
                    fmtty$0 = fmtty$5;
                    break;
                  case 1:
                    fmtty$0 = fmtty$5;
                    break;
                  case 2:
                    fmtty$0 = fmtty$5;
                    break;
                  case 3:
                    fmtty$0 = fmtty$5;
                    break;
                  case 4:
                    fmtty$0 = fmtty$5;
                    break;
                  case 5:
                    fmtty$0 = fmtty$5;
                    break;
                  case 6:
                    fmtty$0 = fmtty$5;
                    break;
                  case 7:
                    fmtty$0 = fmtty$5;
                    break;
                  case 8:
                    fmtty$0 = fmtty$5;
                    break;
                  case 9:
                    var fmtty$6 = ign[2], _cD_ = fmtty_of_fmt(fmtty$5);
                    return caml_call2(CamlinternalFormatBasics[1], fmtty$6, _cD_);
                  case 10:
                    fmtty$0 = fmtty$5;
                    break;
                  default:
                    fmtty$0 = fmtty$5;
                }
              break;
            default:
              var rest$18 = fmtty$0[3], arity = fmtty$0[1];
              return fmtty_of_custom(arity, fmtty_of_fmt(rest$18));
          }
        }
      }
      function fmtty_of_custom(arity, fmtty) {
        if (!arity) return fmtty;
        var arity$0 = arity[1];
        return [12, fmtty_of_custom(arity$0, fmtty)];
      }
      function fmtty_of_padding_fmtty(pad, fmtty) {
        return typeof pad === "number" ? fmtty : 0 === pad[0] ? fmtty : [2, fmtty];
      }
      function fmtty_of_precision_fmtty(prec, fmtty) {
        return typeof prec === "number" ? prec ? [2, fmtty] : fmtty : fmtty;
      }
      var Type_mismatch = [248, "CamlinternalFormat.Type_mismatch", runtime.caml_fresh_oo_id(0)], cst_d = "%d", cst_d$0 = "%+d", cst_d$1 = "% d", cst_i$0 = cst_i$3, cst_i$1 = "%+i", cst_i$2 = "% i", cst_x = "%x", cst_x$0 = "%#x", cst_X = "%X", cst_X$0 = "%#X", cst_o = "%o", cst_o$0 = "%#o", cst_u = cst_u$0, cst_Ld = "%Ld", cst_Ld$0 = "%+Ld", cst_Ld$1 = "% Ld", cst_Li$0 = cst_Li$3, cst_Li$1 = "%+Li", cst_Li$2 = "% Li", cst_Lx = "%Lx", cst_Lx$0 = "%#Lx", cst_LX = "%LX", cst_LX$0 = "%#LX", cst_Lo = "%Lo", cst_Lo$0 = "%#Lo", cst_Lu = "%Lu", cst_ld = "%ld", cst_ld$0 = "%+ld", cst_ld$1 = "% ld", cst_li$0 = cst_li$3, cst_li$1 = "%+li", cst_li$2 = "% li", cst_lx = "%lx", cst_lx$0 = "%#lx", cst_lX = "%lX", cst_lX$0 = "%#lX", cst_lo = "%lo", cst_lo$0 = "%#lo", cst_lu = "%lu", cst_nd = "%nd", cst_nd$0 = "%+nd", cst_nd$1 = "% nd", cst_ni$0 = cst_ni$3, cst_ni$1 = "%+ni", cst_ni$2 = "% ni", cst_nx = "%nx", cst_nx$0 = "%#nx", cst_nX = "%nX", cst_nX$0 = "%#nX", cst_no = "%no", cst_no$0 = "%#no", cst_nu = "%nu", _r_ = [0, 103], cst_neg_infinity = "neg_infinity", cst_infinity = "infinity", cst_nan = "nan", _s_ = [0, cst_camlinternalFormat_ml, 1558, 4], cst_Printf_bad_conversion = "Printf: bad conversion %[", _t_ = [0, cst_camlinternalFormat_ml, 1626, 39], _u_ = [0, cst_camlinternalFormat_ml, 1649, 31], _v_ = [0, cst_camlinternalFormat_ml, 1650, 31], cst_Printf_bad_conversion$0 = "Printf: bad conversion %_", _w_ = [0, cst_camlinternalFormat_ml, 1830, 8], _x_ = [0, 0, 4], _y_ = [
        0,
        [11, "invalid box description ", [3, 0, 0]],
        "invalid box description %S"
      ], _z_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [11, cst_at_character_number, [4, 0, 0, 0, [11, cst$44, [2, 0, 0]]]]
          ]
        ],
        "invalid format %S: at character number %d, %s"
      ], cst_non_zero_widths_are_unsupp = "non-zero widths are unsupported for %c conversions", _A_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              cst_at_character_number,
              [4, 0, 0, 0, [11, ", '", [0, [11, "' without ", [2, 0, 0]]]]]
            ]
          ]
        ],
        "invalid format %S: at character number %d, '%c' without %s"
      ], _B_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              cst_at_character_number,
              [4, 0, 0, 0, [11, cst$44, [2, 0, [11, " expected, read ", [1, 0]]]]]
            ]
          ]
        ],
        "invalid format %S: at character number %d, %s expected, read %C"
      ], _C_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              cst_at_character_number,
              [4, 0, 0, 0, [11, ", duplicate flag ", [1, 0]]]
            ]
          ]
        ],
        "invalid format %S: at character number %d, duplicate flag %C"
      ], cst_padding = "padding", _D_ = [0, 1, 0], cst_0 = cst_0$3, _E_ = [0, 0], cst_precision = cst_precision$3, _F_ = [1, 0], _G_ = [1, 1], cst_precision$0 = cst_precision$3, _H_ = [1, 1], cst_precision$1 = cst_precision$3, cst_0$0 = cst_0$3, _I_ = [1, 1], cst_0$1 = cst_0$3, cst_0$2 = "'0'", _J_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              cst_at_character_number,
              [
                4,
                0,
                0,
                0,
                [11, ', invalid conversion "', [12, 37, [0, [12, 34, 0]]]]
              ]
            ]
          ]
        ],
        'invalid format %S: at character number %d, invalid conversion "%%%c"'
      ], _K_ = [0, 0], cst_padding$0 = "`padding'", _L_ = [0, 0], cst_precision$2 = "`precision'", _M_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              cst_at_character_number,
              [
                4,
                0,
                0,
                0,
                [
                  11,
                  ", flag ",
                  [
                    1,
                    [
                      11,
                      " is only allowed after the '",
                      [12, 37, [11, "', before padding and precision", 0]]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        "invalid format %S: at character number %d, flag %C is only allowed after the '%%', before padding and precision"
      ], _N_ = [0, [12, 64, 0]], _O_ = [0, "@ ", 1, 0], _P_ = [0, "@,", 0, 0], _Q_ = [2, 60], _R_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              ": '",
              [
                12,
                37,
                [
                  11,
                  "' alone is not accepted in character sets, use ",
                  [
                    12,
                    37,
                    [
                      12,
                      37,
                      [11, " instead at position ", [4, 0, 0, 0, [12, 46, 0]]]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        "invalid format %S: '%%' alone is not accepted in character sets, use %%%% instead at position %d."
      ], _S_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              ": integer ",
              [4, 0, 0, 0, [11, " is greater than the limit ", [4, 0, 0, 0, 0]]]
            ]
          ]
        ],
        "invalid format %S: integer %d is greater than the limit %d"
      ], _T_2 = [0, cst_camlinternalFormat_ml, 2837, 11], cst_digit = "digit", _U_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              ': unclosed sub-format, expected "',
              [12, 37, [0, [11, '" at character number ', [4, 0, 0, 0, 0]]]]
            ]
          ]
        ],
        'invalid format %S: unclosed sub-format, expected "%%%c" at character number %d'
      ], cst_character = "character ')'", cst_character$0 = "character '}'", _V_ = [0, cst_camlinternalFormat_ml, 2899, 34], _W_ = [0, cst_camlinternalFormat_ml, 2935, 28], _X_ = [0, cst_camlinternalFormat_ml, 2957, 11], _Y_ = [
        0,
        [
          11,
          cst_invalid_format,
          [
            3,
            0,
            [
              11,
              cst_at_character_number,
              [
                4,
                0,
                0,
                0,
                [
                  11,
                  cst$44,
                  [
                    2,
                    0,
                    [
                      11,
                      " is incompatible with '",
                      [0, [11, "' in sub-format ", [3, 0, 0]]]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ],
        "invalid format %S: at character number %d, %s is incompatible with '%c' in sub-format %S"
      ], _Z_ = [
        0,
        [11, cst_bad_input_format_type_mism, [3, 0, [11, cst_and, [3, 0, 0]]]],
        cst_bad_input_format_type_mism$0
      ], ___ = [
        0,
        [11, cst_bad_input_format_type_mism, [3, 0, [11, cst_and, [3, 0, 0]]]],
        cst_bad_input_format_type_mism$0
      ];
      function type_padding(pad, fmtty) {
        if (typeof pad === "number") return [0, 0, fmtty];
        if (0 === pad[0]) {
          var w = pad[2], padty = pad[1];
          return [0, [0, padty, w], fmtty];
        }
        if (typeof fmtty !== "number" && 2 === fmtty[0]) {
          var rest = fmtty[1], padty$0 = pad[1];
          return [0, [1, padty$0], rest];
        }
        throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
      }
      function type_padprec(pad, prec, fmtty) {
        var match = type_padding(pad, fmtty);
        if (typeof prec !== "number") {
          var rest$1 = match[2], pad$2 = match[1], p = prec[1];
          return [0, pad$2, [0, p], rest$1];
        }
        if (!prec) {
          var rest$0 = match[2], pad$1 = match[1];
          return [0, pad$1, 0, rest$0];
        }
        var match$0 = match[2];
        if (typeof match$0 !== "number" && 2 === match$0[0]) {
          var rest = match$0[1], pad$0 = match[1];
          return [0, pad$0, 1, rest];
        }
        throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
      }
      function type_format(fmt, fmtty) {
        var _cA_ = type_format_gen(fmt, fmtty);
        if (typeof _cA_[2] !== "number")
          throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
        var fmt$0 = _cA_[1];
        return fmt$0;
      }
      function type_format_gen(fmt, fmtty0) {
        if (typeof fmt === "number") return [0, 0, fmtty0];
        switch (fmt[0]) {
          case 0:
            if (typeof fmtty0 !== "number" && 0 === fmtty0[0]) {
              var fmtty_rest = fmtty0[1], fmt_rest = fmt[1], match = type_format_gen(fmt_rest, fmtty_rest), fmtty = match[2], fmt$0 = match[1];
              return [0, [0, fmt$0], fmtty];
            }
            break;
          case 1:
            if (typeof fmtty0 !== "number" && 0 === fmtty0[0]) {
              var fmtty_rest$0 = fmtty0[1], fmt_rest$0 = fmt[1], match$0 = type_format_gen(fmt_rest$0, fmtty_rest$0), fmtty$0 = match$0[2], fmt$1 = match$0[1];
              return [0, [1, fmt$1], fmtty$0];
            }
            break;
          case 2:
            var fmt_rest$1 = fmt[2], pad = fmt[1], match$1 = type_padding(pad, fmtty0), pad$0 = match$1[1], match$2 = match$1[2];
            if (typeof match$2 !== "number" && 1 === match$2[0]) {
              var fmtty_rest$1 = match$2[1], match$3 = type_format_gen(fmt_rest$1, fmtty_rest$1), fmtty$1 = match$3[2], fmt$2 = match$3[1];
              return [0, [2, pad$0, fmt$2], fmtty$1];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 3:
            var fmt_rest$2 = fmt[2], pad$1 = fmt[1], match$4 = type_padding(pad$1, fmtty0), pad$2 = match$4[1], match$5 = match$4[2];
            if (typeof match$5 !== "number" && 1 === match$5[0]) {
              var fmtty_rest$2 = match$5[1], match$6 = type_format_gen(fmt_rest$2, fmtty_rest$2), fmtty$2 = match$6[2], fmt$3 = match$6[1];
              return [0, [3, pad$2, fmt$3], fmtty$2];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 4:
            var fmt_rest$3 = fmt[4], prec = fmt[3], pad$3 = fmt[2], iconv = fmt[1], match$7 = type_padprec(pad$3, prec, fmtty0), pad$4 = match$7[1], match$8 = match$7[3];
            if (typeof match$8 !== "number" && 2 === match$8[0]) {
              var fmtty_rest$3 = match$8[1], prec$0 = match$7[2], match$9 = type_format_gen(fmt_rest$3, fmtty_rest$3), fmtty$3 = match$9[2], fmt$4 = match$9[1];
              return [0, [4, iconv, pad$4, prec$0, fmt$4], fmtty$3];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 5:
            var fmt_rest$4 = fmt[4], prec$1 = fmt[3], pad$5 = fmt[2], iconv$0 = fmt[1], match$10 = type_padprec(pad$5, prec$1, fmtty0), pad$6 = match$10[1], match$11 = match$10[3];
            if (typeof match$11 !== "number" && 3 === match$11[0]) {
              var fmtty_rest$4 = match$11[1], prec$2 = match$10[2], match$12 = type_format_gen(fmt_rest$4, fmtty_rest$4), fmtty$4 = match$12[2], fmt$5 = match$12[1];
              return [0, [5, iconv$0, pad$6, prec$2, fmt$5], fmtty$4];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 6:
            var fmt_rest$5 = fmt[4], prec$3 = fmt[3], pad$7 = fmt[2], iconv$1 = fmt[1], match$13 = type_padprec(pad$7, prec$3, fmtty0), pad$8 = match$13[1], match$14 = match$13[3];
            if (typeof match$14 !== "number" && 4 === match$14[0]) {
              var fmtty_rest$5 = match$14[1], prec$4 = match$13[2], match$15 = type_format_gen(fmt_rest$5, fmtty_rest$5), fmtty$5 = match$15[2], fmt$6 = match$15[1];
              return [0, [6, iconv$1, pad$8, prec$4, fmt$6], fmtty$5];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 7:
            var fmt_rest$6 = fmt[4], prec$5 = fmt[3], pad$9 = fmt[2], iconv$2 = fmt[1], match$16 = type_padprec(pad$9, prec$5, fmtty0), pad$10 = match$16[1], match$17 = match$16[3];
            if (typeof match$17 !== "number" && 5 === match$17[0]) {
              var fmtty_rest$6 = match$17[1], prec$6 = match$16[2], match$18 = type_format_gen(fmt_rest$6, fmtty_rest$6), fmtty$6 = match$18[2], fmt$7 = match$18[1];
              return [0, [7, iconv$2, pad$10, prec$6, fmt$7], fmtty$6];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 8:
            var fmt_rest$7 = fmt[4], prec$7 = fmt[3], pad$11 = fmt[2], fconv = fmt[1], match$19 = type_padprec(pad$11, prec$7, fmtty0), pad$12 = match$19[1], match$20 = match$19[3];
            if (typeof match$20 !== "number" && 6 === match$20[0]) {
              var fmtty_rest$7 = match$20[1], prec$8 = match$19[2], match$21 = type_format_gen(fmt_rest$7, fmtty_rest$7), fmtty$7 = match$21[2], fmt$8 = match$21[1];
              return [0, [8, fconv, pad$12, prec$8, fmt$8], fmtty$7];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 9:
            var fmt_rest$8 = fmt[2], pad$13 = fmt[1], match$22 = type_padding(pad$13, fmtty0), pad$14 = match$22[1], match$23 = match$22[2];
            if (typeof match$23 !== "number" && 7 === match$23[0]) {
              var fmtty_rest$8 = match$23[1], match$24 = type_format_gen(fmt_rest$8, fmtty_rest$8), fmtty$8 = match$24[2], fmt$9 = match$24[1];
              return [0, [9, pad$14, fmt$9], fmtty$8];
            }
            throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
          case 10:
            var fmt_rest$9 = fmt[1], match$25 = type_format_gen(fmt_rest$9, fmtty0), fmtty$9 = match$25[2], fmt$10 = match$25[1];
            return [0, [10, fmt$10], fmtty$9];
          case 11:
            var fmt_rest$10 = fmt[2], str = fmt[1], match$26 = type_format_gen(fmt_rest$10, fmtty0), fmtty$10 = match$26[2], fmt$11 = match$26[1];
            return [0, [11, str, fmt$11], fmtty$10];
          case 12:
            var fmt_rest$11 = fmt[2], chr = fmt[1], match$27 = type_format_gen(fmt_rest$11, fmtty0), fmtty$11 = match$27[2], fmt$12 = match$27[1];
            return [0, [12, chr, fmt$12], fmtty$11];
          case 13:
            if (typeof fmtty0 !== "number" && 8 === fmtty0[0]) {
              var fmtty_rest$9 = fmtty0[2], sub_fmtty = fmtty0[1], fmt_rest$12 = fmt[3], sub_fmtty$0 = fmt[2], pad_opt = fmt[1];
              if (caml_notequal2([0, sub_fmtty$0], [0, sub_fmtty]))
                throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
              var match$28 = type_format_gen(fmt_rest$12, fmtty_rest$9), fmtty$12 = match$28[2], fmt$13 = match$28[1];
              return [0, [13, pad_opt, sub_fmtty, fmt$13], fmtty$12];
            }
            break;
          case 14:
            if (typeof fmtty0 !== "number" && 9 === fmtty0[0]) {
              var fmtty_rest$10 = fmtty0[3], sub_fmtty1 = fmtty0[1], fmt_rest$13 = fmt[3], sub_fmtty$1 = fmt[2], pad_opt$0 = fmt[1], _cy_ = [0, caml_call1(CamlinternalFormatBasics[2], sub_fmtty1)];
              if (caml_notequal2([0, caml_call1(CamlinternalFormatBasics[2], sub_fmtty$1)], _cy_))
                throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
              var match$29 = type_format_gen(
                fmt_rest$13,
                caml_call1(CamlinternalFormatBasics[2], fmtty_rest$10)
              ), fmtty$13 = match$29[2], fmt$14 = match$29[1];
              return [0, [14, pad_opt$0, sub_fmtty1, fmt$14], fmtty$13];
            }
            break;
          case 15:
            if (typeof fmtty0 !== "number" && 10 === fmtty0[0]) {
              var fmtty_rest$11 = fmtty0[1], fmt_rest$14 = fmt[1], match$30 = type_format_gen(fmt_rest$14, fmtty_rest$11), fmtty$14 = match$30[2], fmt$15 = match$30[1];
              return [0, [15, fmt$15], fmtty$14];
            }
            break;
          case 16:
            if (typeof fmtty0 !== "number" && 11 === fmtty0[0]) {
              var fmtty_rest$12 = fmtty0[1], fmt_rest$15 = fmt[1], match$31 = type_format_gen(fmt_rest$15, fmtty_rest$12), fmtty$15 = match$31[2], fmt$16 = match$31[1];
              return [0, [16, fmt$16], fmtty$15];
            }
            break;
          case 17:
            var fmt_rest$16 = fmt[2], formatting_lit2 = fmt[1], match$32 = type_format_gen(fmt_rest$16, fmtty0), fmtty$16 = match$32[2], fmt$17 = match$32[1];
            return [0, [17, formatting_lit2, fmt$17], fmtty$16];
          case 18:
            var fmt_rest$17 = fmt[2], formatting_gen = fmt[1];
            if (0 === formatting_gen[0]) {
              var match$36 = formatting_gen[1], str$0 = match$36[2], fmt1 = match$36[1], match$37 = type_format_gen(fmt1, fmtty0), fmtty2 = match$37[2], fmt2 = match$37[1], match$38 = type_format_gen(fmt_rest$17, fmtty2), fmtty3 = match$38[2], fmt3 = match$38[1];
              return [0, [18, [0, [0, fmt2, str$0]], fmt3], fmtty3];
            }
            var match$39 = formatting_gen[1], str$1 = match$39[2], fmt1$0 = match$39[1], match$40 = type_format_gen(fmt1$0, fmtty0), fmtty2$0 = match$40[2], fmt2$0 = match$40[1], match$41 = type_format_gen(fmt_rest$17, fmtty2$0), fmtty3$0 = match$41[2], fmt3$0 = match$41[1];
            return [0, [18, [1, [0, fmt2$0, str$1]], fmt3$0], fmtty3$0];
          case 19:
            if (typeof fmtty0 !== "number" && 13 === fmtty0[0]) {
              var fmtty_rest$13 = fmtty0[1], fmt_rest$18 = fmt[1], match$33 = type_format_gen(fmt_rest$18, fmtty_rest$13), fmtty$17 = match$33[2], fmt$18 = match$33[1];
              return [0, [19, fmt$18], fmtty$17];
            }
            break;
          case 20:
            if (typeof fmtty0 !== "number" && 1 === fmtty0[0]) {
              var fmtty_rest$14 = fmtty0[1], fmt_rest$19 = fmt[3], char_set = fmt[2], width_opt = fmt[1], match$34 = type_format_gen(fmt_rest$19, fmtty_rest$14), fmtty$18 = match$34[2], fmt$19 = match$34[1];
              return [0, [20, width_opt, char_set, fmt$19], fmtty$18];
            }
            break;
          case 21:
            if (typeof fmtty0 !== "number" && 2 === fmtty0[0]) {
              var fmtty_rest$15 = fmtty0[1], fmt_rest$20 = fmt[2], counter = fmt[1], match$35 = type_format_gen(fmt_rest$20, fmtty_rest$15), fmtty$19 = match$35[2], fmt$20 = match$35[1];
              return [0, [21, counter, fmt$20], fmtty$19];
            }
            break;
          case 23:
            var rest = fmt[2], ign = fmt[1];
            if (typeof ign !== "number")
              switch (ign[0]) {
                case 0:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 1:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 2:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 3:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 4:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 5:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 6:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 7:
                  return type_ignored_param_one(ign, rest, fmtty0);
                case 8:
                  var sub_fmtty$2 = ign[2], pad_opt$1 = ign[1];
                  return type_ignored_param_one([8, pad_opt$1, sub_fmtty$2], rest, fmtty0);
                case 9:
                  var sub_fmtty$3 = ign[2], pad_opt$2 = ign[1], _cz_ = type_ignored_format_substituti(sub_fmtty$3, rest, fmtty0), match$43 = _cz_[2], fmtty$21 = match$43[2], fmt$22 = match$43[1], sub_fmtty$4 = _cz_[1];
                  return [0, [23, [9, pad_opt$2, sub_fmtty$4], fmt$22], fmtty$21];
                case 10:
                  return type_ignored_param_one(ign, rest, fmtty0);
                default:
                  return type_ignored_param_one(ign, rest, fmtty0);
              }
            switch (ign) {
              case 0:
                return type_ignored_param_one(ign, rest, fmtty0);
              case 1:
                return type_ignored_param_one(ign, rest, fmtty0);
              case 2:
                if (typeof fmtty0 !== "number" && 14 === fmtty0[0]) {
                  var fmtty_rest$16 = fmtty0[1], match$42 = type_format_gen(rest, fmtty_rest$16), fmtty$20 = match$42[2], fmt$21 = match$42[1];
                  return [0, [23, 2, fmt$21], fmtty$20];
                }
                throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
              default:
                return type_ignored_param_one(ign, rest, fmtty0);
            }
        }
        throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
      }
      function type_ignored_param_one(ign, fmt, fmtty) {
        var match = type_format_gen(fmt, fmtty), fmtty$0 = match[2], fmt$0 = match[1];
        return [0, [23, ign, fmt$0], fmtty$0];
      }
      function type_ignored_format_substituti(sub_fmtty, fmt, fmtty) {
        if (typeof sub_fmtty === "number")
          return [0, 0, type_format_gen(fmt, fmtty)];
        switch (sub_fmtty[0]) {
          case 0:
            if (typeof fmtty !== "number" && 0 === fmtty[0]) {
              var fmtty_rest = fmtty[1], sub_fmtty_rest = sub_fmtty[1], match = type_ignored_format_substituti(sub_fmtty_rest, fmt, fmtty_rest), fmt$0 = match[2], sub_fmtty_rest$0 = match[1];
              return [0, [0, sub_fmtty_rest$0], fmt$0];
            }
            break;
          case 1:
            if (typeof fmtty !== "number" && 1 === fmtty[0]) {
              var fmtty_rest$0 = fmtty[1], sub_fmtty_rest$1 = sub_fmtty[1], match$0 = type_ignored_format_substituti(sub_fmtty_rest$1, fmt, fmtty_rest$0), fmt$1 = match$0[2], sub_fmtty_rest$2 = match$0[1];
              return [0, [1, sub_fmtty_rest$2], fmt$1];
            }
            break;
          case 2:
            if (typeof fmtty !== "number" && 2 === fmtty[0]) {
              var fmtty_rest$1 = fmtty[1], sub_fmtty_rest$3 = sub_fmtty[1], match$1 = type_ignored_format_substituti(sub_fmtty_rest$3, fmt, fmtty_rest$1), fmt$2 = match$1[2], sub_fmtty_rest$4 = match$1[1];
              return [0, [2, sub_fmtty_rest$4], fmt$2];
            }
            break;
          case 3:
            if (typeof fmtty !== "number" && 3 === fmtty[0]) {
              var fmtty_rest$2 = fmtty[1], sub_fmtty_rest$5 = sub_fmtty[1], match$2 = type_ignored_format_substituti(sub_fmtty_rest$5, fmt, fmtty_rest$2), fmt$3 = match$2[2], sub_fmtty_rest$6 = match$2[1];
              return [0, [3, sub_fmtty_rest$6], fmt$3];
            }
            break;
          case 4:
            if (typeof fmtty !== "number" && 4 === fmtty[0]) {
              var fmtty_rest$3 = fmtty[1], sub_fmtty_rest$7 = sub_fmtty[1], match$3 = type_ignored_format_substituti(sub_fmtty_rest$7, fmt, fmtty_rest$3), fmt$4 = match$3[2], sub_fmtty_rest$8 = match$3[1];
              return [0, [4, sub_fmtty_rest$8], fmt$4];
            }
            break;
          case 5:
            if (typeof fmtty !== "number" && 5 === fmtty[0]) {
              var fmtty_rest$4 = fmtty[1], sub_fmtty_rest$9 = sub_fmtty[1], match$4 = type_ignored_format_substituti(sub_fmtty_rest$9, fmt, fmtty_rest$4), fmt$5 = match$4[2], sub_fmtty_rest$10 = match$4[1];
              return [0, [5, sub_fmtty_rest$10], fmt$5];
            }
            break;
          case 6:
            if (typeof fmtty !== "number" && 6 === fmtty[0]) {
              var fmtty_rest$5 = fmtty[1], sub_fmtty_rest$11 = sub_fmtty[1], match$5 = type_ignored_format_substituti(sub_fmtty_rest$11, fmt, fmtty_rest$5), fmt$6 = match$5[2], sub_fmtty_rest$12 = match$5[1];
              return [0, [6, sub_fmtty_rest$12], fmt$6];
            }
            break;
          case 7:
            if (typeof fmtty !== "number" && 7 === fmtty[0]) {
              var fmtty_rest$6 = fmtty[1], sub_fmtty_rest$13 = sub_fmtty[1], match$6 = type_ignored_format_substituti(sub_fmtty_rest$13, fmt, fmtty_rest$6), fmt$7 = match$6[2], sub_fmtty_rest$14 = match$6[1];
              return [0, [7, sub_fmtty_rest$14], fmt$7];
            }
            break;
          case 8:
            if (typeof fmtty !== "number" && 8 === fmtty[0]) {
              var fmtty_rest$7 = fmtty[2], sub2_fmtty = fmtty[1], sub_fmtty_rest$15 = sub_fmtty[2], sub2_fmtty$0 = sub_fmtty[1];
              if (caml_notequal2([0, sub2_fmtty$0], [0, sub2_fmtty]))
                throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
              var match$7 = type_ignored_format_substituti(sub_fmtty_rest$15, fmt, fmtty_rest$7), fmt$8 = match$7[2], sub_fmtty_rest$16 = match$7[1];
              return [0, [8, sub2_fmtty, sub_fmtty_rest$16], fmt$8];
            }
            break;
          case 9:
            if (typeof fmtty !== "number" && 9 === fmtty[0]) {
              var fmtty_rest$8 = fmtty[3], sub2_fmtty$1 = fmtty[2], sub1_fmtty = fmtty[1], sub_fmtty_rest$17 = sub_fmtty[3], sub2_fmtty$2 = sub_fmtty[2], sub1_fmtty$0 = sub_fmtty[1], _cw_ = [0, caml_call1(CamlinternalFormatBasics[2], sub1_fmtty)];
              if (caml_notequal2([0, caml_call1(CamlinternalFormatBasics[2], sub1_fmtty$0)], _cw_))
                throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
              var _cx_ = [0, caml_call1(CamlinternalFormatBasics[2], sub2_fmtty$1)];
              if (caml_notequal2([0, caml_call1(CamlinternalFormatBasics[2], sub2_fmtty$2)], _cx_))
                throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
              var sub_fmtty$0 = trans(symm(sub1_fmtty), sub2_fmtty$1), match$8 = fmtty_rel_det(sub_fmtty$0), f4 = match$8[4], f2 = match$8[2];
              f2(0);
              f4(0);
              var match$9 = type_ignored_format_substituti(
                caml_call1(CamlinternalFormatBasics[2], sub_fmtty_rest$17),
                fmt,
                fmtty_rest$8
              ), fmt$9 = match$9[2], sub_fmtty_rest$18 = match$9[1];
              return [
                0,
                [9, sub1_fmtty, sub2_fmtty$1, symm(sub_fmtty_rest$18)],
                fmt$9
              ];
            }
            break;
          case 10:
            if (typeof fmtty !== "number" && 10 === fmtty[0]) {
              var fmtty_rest$9 = fmtty[1], sub_fmtty_rest$19 = sub_fmtty[1], match$10 = type_ignored_format_substituti(sub_fmtty_rest$19, fmt, fmtty_rest$9), fmt$10 = match$10[2], sub_fmtty_rest$20 = match$10[1];
              return [0, [10, sub_fmtty_rest$20], fmt$10];
            }
            break;
          case 11:
            if (typeof fmtty !== "number" && 11 === fmtty[0]) {
              var fmtty_rest$10 = fmtty[1], sub_fmtty_rest$21 = sub_fmtty[1], match$11 = type_ignored_format_substituti(sub_fmtty_rest$21, fmt, fmtty_rest$10), fmt$11 = match$11[2], sub_fmtty_rest$22 = match$11[1];
              return [0, [11, sub_fmtty_rest$22], fmt$11];
            }
            break;
          case 13:
            if (typeof fmtty !== "number" && 13 === fmtty[0]) {
              var fmtty_rest$11 = fmtty[1], sub_fmtty_rest$23 = sub_fmtty[1], match$12 = type_ignored_format_substituti(sub_fmtty_rest$23, fmt, fmtty_rest$11), fmt$12 = match$12[2], sub_fmtty_rest$24 = match$12[1];
              return [0, [13, sub_fmtty_rest$24], fmt$12];
            }
            break;
          case 14:
            if (typeof fmtty !== "number" && 14 === fmtty[0]) {
              var fmtty_rest$12 = fmtty[1], sub_fmtty_rest$25 = sub_fmtty[1], match$13 = type_ignored_format_substituti(sub_fmtty_rest$25, fmt, fmtty_rest$12), fmt$13 = match$13[2], sub_fmtty_rest$26 = match$13[1];
              return [0, [14, sub_fmtty_rest$26], fmt$13];
            }
            break;
        }
        throw caml_maybe_attach_backtrace2(Type_mismatch, 1);
      }
      function recast(fmt, fmtty) {
        var _cv_ = symm(fmtty);
        return type_format(fmt, caml_call1(CamlinternalFormatBasics[2], _cv_));
      }
      function fix_padding(padty, width, str) {
        var len = caml_ml_string_length2(str), padty$0 = 0 <= width ? padty : 0, width$0 = caml_call1(Stdlib[18], width);
        if (width$0 <= len) return str;
        var _cu_ = 2 === padty$0 ? 48 : 32, res = caml_call2(Stdlib_Bytes[1], width$0, _cu_);
        switch (padty$0) {
          case 0:
            caml_call5(Stdlib_String[6], str, 0, res, 0, len);
            break;
          case 1:
            caml_call5(Stdlib_String[6], str, 0, res, width$0 - len | 0, len);
            break;
          default:
            a:
              if (0 < len) {
                if (43 !== caml_string_get2(str, 0) && 45 !== caml_string_get2(str, 0) && 32 !== caml_string_get2(str, 0))
                  break a;
                caml_bytes_set2(res, 0, caml_string_get2(str, 0));
                caml_call5(
                  Stdlib_String[6],
                  str,
                  1,
                  res,
                  (width$0 - len | 0) + 1 | 0,
                  len - 1 | 0
                );
                break;
              }
            a:
              if (1 < len && 48 === caml_string_get2(str, 0)) {
                if (120 !== caml_string_get2(str, 1) && 88 !== caml_string_get2(str, 1))
                  break a;
                caml_bytes_set2(res, 1, caml_string_get2(str, 1));
                caml_call5(
                  Stdlib_String[6],
                  str,
                  2,
                  res,
                  (width$0 - len | 0) + 2 | 0,
                  len - 2 | 0
                );
                break;
              }
            caml_call5(Stdlib_String[6], str, 0, res, width$0 - len | 0, len);
        }
        return caml_call1(Stdlib_Bytes[44], res);
      }
      function fix_int_precision(prec, str) {
        var prec$0 = caml_call1(Stdlib[18], prec), len = caml_ml_string_length2(str), c = caml_string_get2(str, 0);
        a: {
          b: {
            if (58 > c) {
              if (32 !== c) {
                if (43 > c) break a;
                switch (c - 43 | 0) {
                  case 5:
                    c:
                      if (len < (prec$0 + 2 | 0) && 1 < len) {
                        if (120 !== caml_string_get2(str, 1) && 88 !== caml_string_get2(str, 1))
                          break c;
                        var res$1 = caml_call2(Stdlib_Bytes[1], prec$0 + 2 | 0, 48);
                        caml_bytes_set2(res$1, 1, caml_string_get2(str, 1));
                        caml_call5(
                          Stdlib_String[6],
                          str,
                          2,
                          res$1,
                          (prec$0 - len | 0) + 4 | 0,
                          len - 2 | 0
                        );
                        return caml_call1(Stdlib_Bytes[44], res$1);
                      }
                    break b;
                  case 0:
                  case 2:
                    break;
                  case 1:
                  case 3:
                  case 4:
                    break a;
                  default:
                    break b;
                }
              }
              if (len >= (prec$0 + 1 | 0)) break a;
              var res$0 = caml_call2(Stdlib_Bytes[1], prec$0 + 1 | 0, 48);
              caml_bytes_set2(res$0, 0, c);
              caml_call5(
                Stdlib_String[6],
                str,
                1,
                res$0,
                (prec$0 - len | 0) + 2 | 0,
                len - 1 | 0
              );
              return caml_call1(Stdlib_Bytes[44], res$0);
            }
            if (71 <= c) {
              if (5 < c - 97 >>> 0) break a;
            } else if (65 > c) break a;
          }
          if (len < prec$0) {
            var res = caml_call2(Stdlib_Bytes[1], prec$0, 48);
            caml_call5(Stdlib_String[6], str, 0, res, prec$0 - len | 0, len);
            return caml_call1(Stdlib_Bytes[44], res);
          }
        }
        return str;
      }
      function string_to_caml_string(str) {
        var str$0 = caml_call1(Stdlib_String[25], str), l = caml_ml_string_length2(str$0), res = caml_call2(Stdlib_Bytes[1], l + 2 | 0, 34);
        caml_blit_string2(str$0, 0, res, 1, l);
        return caml_call1(Stdlib_Bytes[44], res);
      }
      function format_of_fconv(fconv, prec) {
        var prec$0 = caml_call1(Stdlib[18], prec), symb = char_of_fconv(_r_, fconv), buf = buffer_create(16);
        buffer_add_char(buf, 37);
        bprint_fconv_flag(buf, fconv);
        buffer_add_char(buf, 46);
        buffer_add_string(buf, caml_call1(Stdlib_Int[12], prec$0));
        buffer_add_char(buf, symb);
        return buffer_contents(buf);
      }
      function transform_int_alt(iconv, s2) {
        if (13 > iconv) return s2;
        var n = [0, 0], _cp_ = caml_ml_string_length2(s2) - 1 | 0, _co_ = 0;
        if (_cp_ >= 0) {
          var i$0 = _co_;
          for (; ; ) {
            if (9 >= caml_string_unsafe_get2(s2, i$0) - 48 >>> 0) n[1]++;
            var _ct_ = i$0 + 1 | 0;
            if (_cp_ === i$0) break;
            i$0 = _ct_;
          }
        }
        var digits = n[1], buf = caml_create_bytes2(caml_ml_string_length2(s2) + ((digits - 1 | 0) / 3 | 0) | 0), pos = [0, 0];
        function put(c2) {
          caml_bytes_set2(buf, pos[1], c2);
          pos[1]++;
        }
        var left = [0, ((digits - 1 | 0) % 3 | 0) + 1 | 0], _cr_ = caml_ml_string_length2(s2) - 1 | 0, _cq_ = 0;
        if (_cr_ >= 0) {
          var i = _cq_;
          for (; ; ) {
            var c = caml_string_unsafe_get2(s2, i);
            if (9 < c - 48 >>> 0)
              put(c);
            else {
              if (0 === left[1]) {
                put(95);
                left[1] = 3;
              }
              left[1]--;
              put(c);
            }
            var _cs_ = i + 1 | 0;
            if (_cr_ === i) break;
            i = _cs_;
          }
        }
        return caml_call1(Stdlib_Bytes[44], buf);
      }
      function convert_int(iconv, n) {
        switch (iconv) {
          case 1:
            var _cn_ = cst_d$0;
            break;
          case 2:
            var _cn_ = cst_d$1;
            break;
          case 4:
            var _cn_ = cst_i$1;
            break;
          case 5:
            var _cn_ = cst_i$2;
            break;
          case 6:
            var _cn_ = cst_x;
            break;
          case 7:
            var _cn_ = cst_x$0;
            break;
          case 8:
            var _cn_ = cst_X;
            break;
          case 9:
            var _cn_ = cst_X$0;
            break;
          case 10:
            var _cn_ = cst_o;
            break;
          case 11:
            var _cn_ = cst_o$0;
            break;
          case 0:
          case 13:
            var _cn_ = cst_d;
            break;
          case 3:
          case 14:
            var _cn_ = cst_i$0;
            break;
          default:
            var _cn_ = cst_u;
        }
        return transform_int_alt(iconv, caml_format_int2(_cn_, n));
      }
      function convert_int32(iconv, n) {
        switch (iconv) {
          case 1:
            var _cm_ = cst_ld$0;
            break;
          case 2:
            var _cm_ = cst_ld$1;
            break;
          case 4:
            var _cm_ = cst_li$1;
            break;
          case 5:
            var _cm_ = cst_li$2;
            break;
          case 6:
            var _cm_ = cst_lx;
            break;
          case 7:
            var _cm_ = cst_lx$0;
            break;
          case 8:
            var _cm_ = cst_lX;
            break;
          case 9:
            var _cm_ = cst_lX$0;
            break;
          case 10:
            var _cm_ = cst_lo;
            break;
          case 11:
            var _cm_ = cst_lo$0;
            break;
          case 0:
          case 13:
            var _cm_ = cst_ld;
            break;
          case 3:
          case 14:
            var _cm_ = cst_li$0;
            break;
          default:
            var _cm_ = cst_lu;
        }
        return transform_int_alt(iconv, caml_format_int2(_cm_, n));
      }
      function convert_nativeint(iconv, n) {
        switch (iconv) {
          case 1:
            var _cl_ = cst_nd$0;
            break;
          case 2:
            var _cl_ = cst_nd$1;
            break;
          case 4:
            var _cl_ = cst_ni$1;
            break;
          case 5:
            var _cl_ = cst_ni$2;
            break;
          case 6:
            var _cl_ = cst_nx;
            break;
          case 7:
            var _cl_ = cst_nx$0;
            break;
          case 8:
            var _cl_ = cst_nX;
            break;
          case 9:
            var _cl_ = cst_nX$0;
            break;
          case 10:
            var _cl_ = cst_no;
            break;
          case 11:
            var _cl_ = cst_no$0;
            break;
          case 0:
          case 13:
            var _cl_ = cst_nd;
            break;
          case 3:
          case 14:
            var _cl_ = cst_ni$0;
            break;
          default:
            var _cl_ = cst_nu;
        }
        return transform_int_alt(iconv, caml_format_int2(_cl_, n));
      }
      function convert_int64(iconv, n) {
        switch (iconv) {
          case 1:
            var _ck_ = cst_Ld$0;
            break;
          case 2:
            var _ck_ = cst_Ld$1;
            break;
          case 4:
            var _ck_ = cst_Li$1;
            break;
          case 5:
            var _ck_ = cst_Li$2;
            break;
          case 6:
            var _ck_ = cst_Lx;
            break;
          case 7:
            var _ck_ = cst_Lx$0;
            break;
          case 8:
            var _ck_ = cst_LX;
            break;
          case 9:
            var _ck_ = cst_LX$0;
            break;
          case 10:
            var _ck_ = cst_Lo;
            break;
          case 11:
            var _ck_ = cst_Lo$0;
            break;
          case 0:
          case 13:
            var _ck_ = cst_Ld;
            break;
          case 3:
          case 14:
            var _ck_ = cst_Li$0;
            break;
          default:
            var _ck_ = cst_Lu;
        }
        return transform_int_alt(iconv, runtime.caml_int64_format(_ck_, n));
      }
      function convert_float(fconv, prec, x2) {
        function hex(param) {
          switch (fconv[1]) {
            case 0:
              var sign = 45;
              break;
            case 1:
              var sign = 43;
              break;
            default:
              var sign = 32;
          }
          return runtime.caml_hexstring_of_float(x2, prec, sign);
        }
        function caml_special_val(str2) {
          var match = runtime.caml_classify_float(x2);
          return 3 === match ? x2 < 0 ? cst_neg_infinity : cst_infinity : 4 <= match ? cst_nan : str2;
        }
        switch (fconv[2]) {
          case 5:
            var str = caml_format_float2(format_of_fconv(fconv, prec), x2), len = caml_ml_string_length2(str), i = 0;
            for (; ; ) {
              if (i === len)
                var _ch_ = 0;
              else {
                var _cg_ = caml_string_get2(str, i) - 46 | 0;
                a: {
                  if (23 < _cg_ >>> 0) {
                    if (55 === _cg_) break a;
                  } else if (21 < _cg_ - 1 >>> 0) break a;
                  var i$0 = i + 1 | 0;
                  i = i$0;
                  continue;
                }
                var _ch_ = 1;
              }
              var _ci_ = _ch_ ? str : caml_call2(Stdlib[28], str, cst$17);
              return caml_special_val(_ci_);
            }
          case 6:
            return hex(0);
          case 7:
            var _cj_ = hex(0);
            return caml_call1(Stdlib_String[26], _cj_);
          case 8:
            return caml_special_val(hex(0));
          default:
            return caml_format_float2(format_of_fconv(fconv, prec), x2);
        }
      }
      function string_of_fmtty(fmtty) {
        var buf = buffer_create(16);
        bprint_fmtty(buf, fmtty);
        return buffer_contents(buf);
      }
      function make_printf$0(counter, k, acc, fmt) {
        var k$0 = k, acc$0 = acc, fmt$0 = fmt;
        for (; ; ) {
          if (typeof fmt$0 === "number") return caml_call1(k$0, acc$0);
          switch (fmt$0[0]) {
            case 0:
              var rest = fmt$0[1];
              return function(c) {
                var new_acc2 = [5, acc$0, c];
                return make_printf(k$0, new_acc2, rest);
              };
            case 1:
              var rest$0 = fmt$0[1];
              return function(c) {
                var str2 = caml_call1(Stdlib_Char[2], c), l = caml_ml_string_length2(str2), res = caml_call2(Stdlib_Bytes[1], l + 2 | 0, 39);
                caml_blit_string2(str2, 0, res, 1, l);
                var new_acc2 = [4, acc$0, caml_call1(Stdlib_Bytes[44], res)];
                return make_printf(k$0, new_acc2, rest$0);
              };
            case 2:
              var rest$1 = fmt$0[2], pad = fmt$0[1];
              return make_padding(k$0, acc$0, rest$1, pad, function(str2) {
                return str2;
              });
            case 3:
              var rest$2 = fmt$0[2], pad$0 = fmt$0[1];
              return make_padding(k$0, acc$0, rest$2, pad$0, string_to_caml_string);
            case 4:
              var rest$3 = fmt$0[4], prec = fmt$0[3], pad$1 = fmt$0[2], iconv = fmt$0[1];
              return make_int_padding_precision(k$0, acc$0, rest$3, pad$1, prec, convert_int, iconv);
            case 5:
              var rest$4 = fmt$0[4], prec$0 = fmt$0[3], pad$2 = fmt$0[2], iconv$0 = fmt$0[1];
              return make_int_padding_precision(k$0, acc$0, rest$4, pad$2, prec$0, convert_int32, iconv$0);
            case 6:
              var rest$5 = fmt$0[4], prec$1 = fmt$0[3], pad$3 = fmt$0[2], iconv$1 = fmt$0[1];
              return make_int_padding_precision(
                k$0,
                acc$0,
                rest$5,
                pad$3,
                prec$1,
                convert_nativeint,
                iconv$1
              );
            case 7:
              var rest$6 = fmt$0[4], prec$2 = fmt$0[3], pad$4 = fmt$0[2], iconv$2 = fmt$0[1];
              return make_int_padding_precision(k$0, acc$0, rest$6, pad$4, prec$2, convert_int64, iconv$2);
            case 8:
              var rest$7 = fmt$0[4], prec$3 = fmt$0[3], pad$5 = fmt$0[2], fconv = fmt$0[1];
              if (typeof pad$5 === "number") {
                if (typeof prec$3 === "number")
                  return prec$3 ? function(p2, x2) {
                    var str2 = convert_float(fconv, p2, x2);
                    return make_printf(k$0, [4, acc$0, str2], rest$7);
                  } : function(x2) {
                    var str2 = convert_float(fconv, default_float_precision(fconv), x2);
                    return make_printf(k$0, [4, acc$0, str2], rest$7);
                  };
                var p = prec$3[1];
                return function(x2) {
                  var str2 = convert_float(fconv, p, x2);
                  return make_printf(k$0, [4, acc$0, str2], rest$7);
                };
              }
              if (0 === pad$5[0]) {
                var w = pad$5[2], padty = pad$5[1];
                if (typeof prec$3 === "number")
                  return prec$3 ? function(p2, x2) {
                    var str2 = fix_padding(padty, w, convert_float(fconv, p2, x2));
                    return make_printf(k$0, [4, acc$0, str2], rest$7);
                  } : function(x2) {
                    var str2 = convert_float(fconv, default_float_precision(fconv), x2), str$0 = fix_padding(padty, w, str2);
                    return make_printf(k$0, [4, acc$0, str$0], rest$7);
                  };
                var p$0 = prec$3[1];
                return function(x2) {
                  var str2 = fix_padding(padty, w, convert_float(fconv, p$0, x2));
                  return make_printf(k$0, [4, acc$0, str2], rest$7);
                };
              }
              var padty$0 = pad$5[1];
              if (typeof prec$3 === "number")
                return prec$3 ? function(w2, p2, x2) {
                  var str2 = fix_padding(padty$0, w2, convert_float(fconv, p2, x2));
                  return make_printf(k$0, [4, acc$0, str2], rest$7);
                } : function(w2, x2) {
                  var str2 = convert_float(fconv, default_float_precision(fconv), x2), str$0 = fix_padding(padty$0, w2, str2);
                  return make_printf(k$0, [4, acc$0, str$0], rest$7);
                };
              var p$1 = prec$3[1];
              return function(w2, x2) {
                var str2 = fix_padding(padty$0, w2, convert_float(fconv, p$1, x2));
                return make_printf(k$0, [4, acc$0, str2], rest$7);
              };
            case 9:
              var rest$8 = fmt$0[2], pad$6 = fmt$0[1];
              return make_padding(k$0, acc$0, rest$8, pad$6, Stdlib[30]);
            case 10:
              var rest$9 = fmt$0[1], acc$1 = [7, acc$0];
              acc$0 = acc$1;
              fmt$0 = rest$9;
              break;
            case 11:
              var rest$10 = fmt$0[2], str = fmt$0[1], acc$2 = [2, acc$0, str];
              acc$0 = acc$2;
              fmt$0 = rest$10;
              break;
            case 12:
              var rest$11 = fmt$0[2], chr = fmt$0[1], acc$3 = [3, acc$0, chr];
              acc$0 = acc$3;
              fmt$0 = rest$11;
              break;
            case 13:
              var rest$12 = fmt$0[3], sub_fmtty = fmt$0[2], ty = string_of_fmtty(sub_fmtty);
              return function(str2) {
                return make_printf(k$0, [4, acc$0, ty], rest$12);
              };
            case 14:
              var rest$13 = fmt$0[3], fmtty = fmt$0[2];
              return function(param) {
                var fmt2 = param[1], _cf_ = recast(fmt2, fmtty);
                return make_printf(
                  k$0,
                  acc$0,
                  caml_call2(CamlinternalFormatBasics[3], _cf_, rest$13)
                );
              };
            case 15:
              var rest$14 = fmt$0[1];
              return function(f2, x2) {
                return make_printf(
                  k$0,
                  [6, acc$0, function(o) {
                    return caml_call2(f2, o, x2);
                  }],
                  rest$14
                );
              };
            case 16:
              var rest$15 = fmt$0[1];
              return function(f2) {
                return make_printf(k$0, [6, acc$0, f2], rest$15);
              };
            case 17:
              var rest$16 = fmt$0[2], fmting_lit = fmt$0[1], acc$4 = [0, acc$0, fmting_lit];
              acc$0 = acc$4;
              fmt$0 = rest$16;
              break;
            case 18:
              var _cd_ = fmt$0[1];
              if (0 === _cd_[0]) {
                var rest$17 = fmt$0[2], fmt$1 = _cd_[1][1];
                let acc2 = acc$0, k2 = k$0, rest2 = rest$17;
                var k$1 = function(kacc) {
                  return make_printf(k2, [1, acc2, [0, kacc]], rest2);
                };
                k$0 = k$1;
                acc$0 = 0;
                fmt$0 = fmt$1;
              } else {
                var rest$18 = fmt$0[2], fmt$2 = _cd_[1][1];
                let acc2 = acc$0, k2 = k$0, rest2 = rest$18;
                var k$2 = function(kacc) {
                  return make_printf(k2, [1, acc2, [1, kacc]], rest2);
                };
                k$0 = k$2;
                acc$0 = 0;
                fmt$0 = fmt$2;
              }
              break;
            case 19:
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _s_], 1);
            case 20:
              var rest$19 = fmt$0[3], new_acc = [8, acc$0, cst_Printf_bad_conversion];
              return function(param) {
                return make_printf(k$0, new_acc, rest$19);
              };
            case 21:
              var rest$20 = fmt$0[2];
              return function(n) {
                var new_acc2 = [4, acc$0, caml_format_int2(cst_u$0, n)];
                return make_printf(k$0, new_acc2, rest$20);
              };
            case 22:
              var rest$21 = fmt$0[1];
              return function(c) {
                var new_acc2 = [5, acc$0, c];
                return make_printf(k$0, new_acc2, rest$21);
              };
            case 23:
              var rest$22 = fmt$0[2], ign = fmt$0[1];
              if (counter >= 50)
                return caml_trampoline_return2(make_ignored_param$0, [0, k$0, acc$0, ign, rest$22]);
              var counter$1 = counter + 1 | 0;
              return make_ignored_param$0(counter$1, k$0, acc$0, ign, rest$22);
            default:
              var rest$23 = fmt$0[3], f = fmt$0[2], arity = fmt$0[1], _ce_ = caml_call1(f, 0);
              if (counter >= 50)
                return caml_trampoline_return2(make_custom$0, [0, k$0, acc$0, rest$23, arity, _ce_]);
              var counter$0 = counter + 1 | 0;
              return make_custom$0(counter$0, k$0, acc$0, rest$23, arity, _ce_);
          }
        }
      }
      function make_printf(k, acc, fmt) {
        return caml_trampoline2(make_printf$0(0, k, acc, fmt));
      }
      function make_ignored_param$0(counter, k, acc, ign, fmt) {
        if (typeof ign === "number")
          switch (ign) {
            case 0:
              if (counter >= 50)
                return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
              var counter$0 = counter + 1 | 0;
              return make_invalid_arg(counter$0, k, acc, fmt);
            case 1:
              if (counter >= 50)
                return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
              var counter$1 = counter + 1 | 0;
              return make_invalid_arg(counter$1, k, acc, fmt);
            case 2:
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _t_], 1);
            default:
              if (counter >= 50)
                return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
              var counter$2 = counter + 1 | 0;
              return make_invalid_arg(counter$2, k, acc, fmt);
          }
        switch (ign[0]) {
          case 0:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$3 = counter + 1 | 0;
            return make_invalid_arg(counter$3, k, acc, fmt);
          case 1:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$4 = counter + 1 | 0;
            return make_invalid_arg(counter$4, k, acc, fmt);
          case 2:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$5 = counter + 1 | 0;
            return make_invalid_arg(counter$5, k, acc, fmt);
          case 3:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$6 = counter + 1 | 0;
            return make_invalid_arg(counter$6, k, acc, fmt);
          case 4:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$7 = counter + 1 | 0;
            return make_invalid_arg(counter$7, k, acc, fmt);
          case 5:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$8 = counter + 1 | 0;
            return make_invalid_arg(counter$8, k, acc, fmt);
          case 6:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$9 = counter + 1 | 0;
            return make_invalid_arg(counter$9, k, acc, fmt);
          case 7:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$10 = counter + 1 | 0;
            return make_invalid_arg(counter$10, k, acc, fmt);
          case 8:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$11 = counter + 1 | 0;
            return make_invalid_arg(counter$11, k, acc, fmt);
          case 9:
            var fmtty = ign[2];
            if (counter >= 50)
              return caml_trampoline_return2(make_from_fmtty$0, [0, k, acc, fmtty, fmt]);
            var counter$14 = counter + 1 | 0;
            return make_from_fmtty$0(counter$14, k, acc, fmtty, fmt);
          case 10:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$12 = counter + 1 | 0;
            return make_invalid_arg(counter$12, k, acc, fmt);
          default:
            if (counter >= 50)
              return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
            var counter$13 = counter + 1 | 0;
            return make_invalid_arg(counter$13, k, acc, fmt);
        }
      }
      function make_ignored_param(k, acc, ign, fmt) {
        return caml_trampoline2(make_ignored_param$0(0, k, acc, ign, fmt));
      }
      function make_from_fmtty$0(counter, k, acc, fmtty, fmt) {
        if (typeof fmtty !== "number")
          switch (fmtty[0]) {
            case 0:
              var rest = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest, fmt);
              };
            case 1:
              var rest$0 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$0, fmt);
              };
            case 2:
              var rest$1 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$1, fmt);
              };
            case 3:
              var rest$2 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$2, fmt);
              };
            case 4:
              var rest$3 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$3, fmt);
              };
            case 5:
              var rest$4 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$4, fmt);
              };
            case 6:
              var rest$5 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$5, fmt);
              };
            case 7:
              var rest$6 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$6, fmt);
              };
            case 8:
              var rest$7 = fmtty[2];
              return function(param) {
                return make_from_fmtty(k, acc, rest$7, fmt);
              };
            case 9:
              var rest$8 = fmtty[3], ty2 = fmtty[2], ty1 = fmtty[1], ty = trans(symm(ty1), ty2);
              return function(param) {
                return make_from_fmtty(
                  k,
                  acc,
                  caml_call2(CamlinternalFormatBasics[1], ty, rest$8),
                  fmt
                );
              };
            case 10:
              var rest$9 = fmtty[1];
              return function(_cc_, param) {
                return make_from_fmtty(k, acc, rest$9, fmt);
              };
            case 11:
              var rest$10 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$10, fmt);
              };
            case 12:
              var rest$11 = fmtty[1];
              return function(param) {
                return make_from_fmtty(k, acc, rest$11, fmt);
              };
            case 13:
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _u_], 1);
            default:
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _v_], 1);
          }
        if (counter >= 50)
          return caml_trampoline_return2(make_invalid_arg, [0, k, acc, fmt]);
        var counter$0 = counter + 1 | 0;
        return make_invalid_arg(counter$0, k, acc, fmt);
      }
      function make_from_fmtty(k, acc, fmtty, fmt) {
        return caml_trampoline2(make_from_fmtty$0(0, k, acc, fmtty, fmt));
      }
      function make_invalid_arg(counter, k, acc, fmt) {
        var _cb_ = [8, acc, cst_Printf_bad_conversion$0];
        if (counter >= 50)
          return caml_trampoline_return2(make_printf$0, [0, k, _cb_, fmt]);
        var counter$0 = counter + 1 | 0;
        return make_printf$0(counter$0, k, _cb_, fmt);
      }
      function make_padding(k, acc, fmt, pad, trans2) {
        if (typeof pad === "number")
          return function(x2) {
            var new_acc = [4, acc, caml_call1(trans2, x2)];
            return make_printf(k, new_acc, fmt);
          };
        if (0 === pad[0]) {
          var width = pad[2], padty = pad[1];
          return function(x2) {
            var new_acc = [4, acc, fix_padding(padty, width, caml_call1(trans2, x2))];
            return make_printf(k, new_acc, fmt);
          };
        }
        var padty$0 = pad[1];
        return function(w, x2) {
          var new_acc = [4, acc, fix_padding(padty$0, w, caml_call1(trans2, x2))];
          return make_printf(k, new_acc, fmt);
        };
      }
      function make_int_padding_precision(k, acc, fmt, pad, prec, trans2, iconv) {
        if (typeof pad === "number") {
          if (typeof prec === "number")
            return prec ? function(p2, x2) {
              var str = fix_int_precision(p2, caml_call2(trans2, iconv, x2));
              return make_printf(k, [4, acc, str], fmt);
            } : function(x2) {
              var str = caml_call2(trans2, iconv, x2);
              return make_printf(k, [4, acc, str], fmt);
            };
          var p = prec[1];
          return function(x2) {
            var str = fix_int_precision(p, caml_call2(trans2, iconv, x2));
            return make_printf(k, [4, acc, str], fmt);
          };
        }
        if (0 === pad[0]) {
          var w = pad[2], padty = pad[1];
          if (typeof prec === "number")
            return prec ? function(p2, x2) {
              var str = fix_padding(
                padty,
                w,
                fix_int_precision(p2, caml_call2(trans2, iconv, x2))
              );
              return make_printf(k, [4, acc, str], fmt);
            } : function(x2) {
              var str = fix_padding(padty, w, caml_call2(trans2, iconv, x2));
              return make_printf(k, [4, acc, str], fmt);
            };
          var p$0 = prec[1];
          return function(x2) {
            var str = fix_padding(padty, w, fix_int_precision(p$0, caml_call2(trans2, iconv, x2)));
            return make_printf(k, [4, acc, str], fmt);
          };
        }
        var padty$0 = pad[1];
        if (typeof prec === "number")
          return prec ? function(w2, p2, x2) {
            var str = fix_padding(
              padty$0,
              w2,
              fix_int_precision(p2, caml_call2(trans2, iconv, x2))
            );
            return make_printf(k, [4, acc, str], fmt);
          } : function(w2, x2) {
            var str = fix_padding(padty$0, w2, caml_call2(trans2, iconv, x2));
            return make_printf(k, [4, acc, str], fmt);
          };
        var p$1 = prec[1];
        return function(w2, x2) {
          var str = fix_padding(padty$0, w2, fix_int_precision(p$1, caml_call2(trans2, iconv, x2)));
          return make_printf(k, [4, acc, str], fmt);
        };
      }
      function make_custom$0(counter, k, acc, rest, arity, f) {
        if (arity) {
          var arity$0 = arity[1];
          return function(x2) {
            return make_custom(k, acc, rest, arity$0, caml_call1(f, x2));
          };
        }
        var _ca_ = [4, acc, f];
        if (counter >= 50)
          return caml_trampoline_return2(make_printf$0, [0, k, _ca_, rest]);
        var counter$0 = counter + 1 | 0;
        return make_printf$0(counter$0, k, _ca_, rest);
      }
      function make_custom(k, acc, rest, arity, f) {
        return caml_trampoline2(make_custom$0(0, k, acc, rest, arity, f));
      }
      function make_iprintf$0(counter, k, o, fmt) {
        var k$0 = k, fmt$0 = fmt;
        for (; ; ) {
          if (typeof fmt$0 === "number") return caml_call1(k$0, o);
          switch (fmt$0[0]) {
            case 0:
              var rest = fmt$0[1], x2 = make_iprintf(k$0, o, rest);
              return function(_b$_) {
                return x2;
              };
            case 1:
              var rest$0 = fmt$0[1], x$0 = make_iprintf(k$0, o, rest$0);
              return function(_b__) {
                return x$0;
              };
            case 2:
              var _bM_ = fmt$0[1];
              if (typeof _bM_ === "number") {
                var rest$1 = fmt$0[2], x$1 = make_iprintf(k$0, o, rest$1);
                return function(_b9_) {
                  return x$1;
                };
              }
              if (0 === _bM_[0]) {
                var rest$2 = fmt$0[2], x$2 = make_iprintf(k$0, o, rest$2);
                return function(_b8_) {
                  return x$2;
                };
              }
              var rest$3 = fmt$0[2], x$3 = make_iprintf(k$0, o, rest$3), x$4 = function(_b7_) {
                return x$3;
              };
              return function(_b6_) {
                return x$4;
              };
            case 3:
              var _bN_ = fmt$0[1];
              if (typeof _bN_ === "number") {
                var rest$4 = fmt$0[2], x$5 = make_iprintf(k$0, o, rest$4);
                return function(_b5_) {
                  return x$5;
                };
              }
              if (0 === _bN_[0]) {
                var rest$5 = fmt$0[2], x$6 = make_iprintf(k$0, o, rest$5);
                return function(_b4_) {
                  return x$6;
                };
              }
              var rest$6 = fmt$0[2], x$7 = make_iprintf(k$0, o, rest$6), x$8 = function(_b3_) {
                return x$7;
              };
              return function(_b2_) {
                return x$8;
              };
            case 4:
              var rest$7 = fmt$0[4], prec = fmt$0[3], pad = fmt$0[2];
              return fn_of_padding_precision(k$0, o, rest$7, pad, prec);
            case 5:
              var rest$8 = fmt$0[4], prec$0 = fmt$0[3], pad$0 = fmt$0[2];
              return fn_of_padding_precision(k$0, o, rest$8, pad$0, prec$0);
            case 6:
              var rest$9 = fmt$0[4], prec$1 = fmt$0[3], pad$1 = fmt$0[2];
              return fn_of_padding_precision(k$0, o, rest$9, pad$1, prec$1);
            case 7:
              var rest$10 = fmt$0[4], prec$2 = fmt$0[3], pad$2 = fmt$0[2];
              return fn_of_padding_precision(k$0, o, rest$10, pad$2, prec$2);
            case 8:
              var rest$11 = fmt$0[4], prec$3 = fmt$0[3], pad$3 = fmt$0[2];
              return fn_of_padding_precision(k$0, o, rest$11, pad$3, prec$3);
            case 9:
              var _bO_ = fmt$0[1];
              if (typeof _bO_ === "number") {
                var rest$12 = fmt$0[2], x$9 = make_iprintf(k$0, o, rest$12);
                return function(_b1_) {
                  return x$9;
                };
              }
              if (0 === _bO_[0]) {
                var rest$13 = fmt$0[2], x$10 = make_iprintf(k$0, o, rest$13);
                return function(_b0_) {
                  return x$10;
                };
              }
              var rest$14 = fmt$0[2], x$11 = make_iprintf(k$0, o, rest$14), x$12 = function(_bZ_) {
                return x$11;
              };
              return function(_bY_) {
                return x$12;
              };
            case 10:
              var rest$15 = fmt$0[1];
              fmt$0 = rest$15;
              break;
            case 11:
              var rest$16 = fmt$0[2];
              fmt$0 = rest$16;
              break;
            case 12:
              var rest$17 = fmt$0[2];
              fmt$0 = rest$17;
              break;
            case 13:
              var rest$18 = fmt$0[3], x$13 = make_iprintf(k$0, o, rest$18);
              return function(_bX_) {
                return x$13;
              };
            case 14:
              var rest$19 = fmt$0[3], fmtty = fmt$0[2];
              return function(param) {
                var fmt2 = param[1], _bW_ = recast(fmt2, fmtty);
                return make_iprintf(
                  k$0,
                  o,
                  caml_call2(CamlinternalFormatBasics[3], _bW_, rest$19)
                );
              };
            case 15:
              var rest$20 = fmt$0[1], x$14 = make_iprintf(k$0, o, rest$20), x$15 = function(_bV_) {
                return x$14;
              };
              return function(_bU_) {
                return x$15;
              };
            case 16:
              var rest$21 = fmt$0[1], x$16 = make_iprintf(k$0, o, rest$21);
              return function(_bT_) {
                return x$16;
              };
            case 17:
              var rest$22 = fmt$0[2];
              fmt$0 = rest$22;
              break;
            case 18:
              var _bP_ = fmt$0[1];
              if (0 === _bP_[0]) {
                var rest$23 = fmt$0[2], fmt$1 = _bP_[1][1];
                let k2 = k$0, rest2 = rest$23;
                var k$1 = function(koc) {
                  return make_iprintf(k2, koc, rest2);
                };
                k$0 = k$1;
                fmt$0 = fmt$1;
              } else {
                var rest$24 = fmt$0[2], fmt$2 = _bP_[1][1];
                let k2 = k$0, rest2 = rest$24;
                var k$2 = function(koc) {
                  return make_iprintf(k2, koc, rest2);
                };
                k$0 = k$2;
                fmt$0 = fmt$2;
              }
              break;
            case 19:
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _w_], 1);
            case 20:
              var rest$25 = fmt$0[3], x$17 = make_iprintf(k$0, o, rest$25);
              return function(_bS_) {
                return x$17;
              };
            case 21:
              var rest$26 = fmt$0[2], x$18 = make_iprintf(k$0, o, rest$26);
              return function(_bR_) {
                return x$18;
              };
            case 22:
              var rest$27 = fmt$0[1], x$19 = make_iprintf(k$0, o, rest$27);
              return function(_bQ_) {
                return x$19;
              };
            case 23:
              var rest$28 = fmt$0[2], ign = fmt$0[1];
              return make_ignored_param(function(param) {
                return caml_call1(k$0, o);
              }, 0, ign, rest$28);
            default:
              var rest$29 = fmt$0[3], arity = fmt$0[1];
              if (counter >= 50)
                return caml_trampoline_return2(fn_of_custom_arity$0, [0, k$0, o, rest$29, arity]);
              var counter$0 = counter + 1 | 0;
              return fn_of_custom_arity$0(counter$0, k$0, o, rest$29, arity);
          }
        }
      }
      function make_iprintf(k, o, fmt) {
        return caml_trampoline2(make_iprintf$0(0, k, o, fmt));
      }
      function fn_of_padding_precision(k, o, fmt, pad, prec) {
        if (typeof pad === "number") {
          if (typeof prec !== "number") {
            var x$2 = make_iprintf(k, o, fmt);
            return function(_bL_) {
              return x$2;
            };
          }
          if (prec) {
            var x2 = make_iprintf(k, o, fmt), x$0 = function(_bK_) {
              return x2;
            };
            return function(_bJ_) {
              return x$0;
            };
          }
          var x$1 = make_iprintf(k, o, fmt);
          return function(_bI_) {
            return x$1;
          };
        }
        if (0 === pad[0]) {
          if (typeof prec !== "number") {
            var x$6 = make_iprintf(k, o, fmt);
            return function(_bH_) {
              return x$6;
            };
          }
          if (prec) {
            var x$3 = make_iprintf(k, o, fmt), x$4 = function(_bG_) {
              return x$3;
            };
            return function(_bF_) {
              return x$4;
            };
          }
          var x$5 = make_iprintf(k, o, fmt);
          return function(_bE_) {
            return x$5;
          };
        }
        if (typeof prec !== "number") {
          var x$12 = make_iprintf(k, o, fmt), x$13 = function(_bD_) {
            return x$12;
          };
          return function(_bC_) {
            return x$13;
          };
        }
        if (prec) {
          var x$7 = make_iprintf(k, o, fmt), x$8 = function(_bB_) {
            return x$7;
          }, x$9 = function(_bA_) {
            return x$8;
          };
          return function(_bz_) {
            return x$9;
          };
        }
        var x$10 = make_iprintf(k, o, fmt);
        function x$11(_by_) {
          return x$10;
        }
        return function(_bx_) {
          return x$11;
        };
      }
      function fn_of_custom_arity$0(counter, k, o, fmt, param) {
        if (param) {
          var arity = param[1], x2 = fn_of_custom_arity(k, o, fmt, arity);
          return function(_bw_) {
            return x2;
          };
        }
        if (counter >= 50)
          return caml_trampoline_return2(make_iprintf$0, [0, k, o, fmt]);
        var counter$0 = counter + 1 | 0;
        return make_iprintf$0(counter$0, k, o, fmt);
      }
      function fn_of_custom_arity(k, o, fmt, param) {
        return caml_trampoline2(fn_of_custom_arity$0(0, k, o, fmt, param));
      }
      function output_acc(o, acc) {
        var acc$0 = acc;
        for (; ; ) {
          if (typeof acc$0 === "number") return 0;
          switch (acc$0[0]) {
            case 0:
              var fmting_lit = acc$0[2], p = acc$0[1], s2 = string_of_formatting_lit(fmting_lit);
              output_acc(o, p);
              return caml_call2(Stdlib[66], o, s2);
            case 1:
              var match = acc$0[2], p$0 = acc$0[1];
              if (0 === match[0]) {
                var acc$1 = match[1];
                output_acc(o, p$0);
                caml_call2(Stdlib[66], o, cst$18);
                acc$0 = acc$1;
              } else {
                var acc$2 = match[1];
                output_acc(o, p$0);
                caml_call2(Stdlib[66], o, cst$19);
                acc$0 = acc$2;
              }
              break;
            case 6:
              var f = acc$0[2], p$3 = acc$0[1];
              output_acc(o, p$3);
              return caml_call1(f, o);
            case 7:
              var p$4 = acc$0[1];
              output_acc(o, p$4);
              return caml_call1(Stdlib[63], o);
            case 8:
              var msg = acc$0[2], p$5 = acc$0[1];
              output_acc(o, p$5);
              return caml_call1(Stdlib[1], msg);
            case 2:
            case 4:
              var s$0 = acc$0[2], p$1 = acc$0[1];
              output_acc(o, p$1);
              return caml_call2(Stdlib[66], o, s$0);
            default:
              var c = acc$0[2], p$2 = acc$0[1];
              output_acc(o, p$2);
              return caml_call2(Stdlib[65], o, c);
          }
        }
      }
      function bufput_acc(b, acc) {
        var acc$0 = acc;
        for (; ; ) {
          if (typeof acc$0 === "number") return 0;
          switch (acc$0[0]) {
            case 0:
              var fmting_lit = acc$0[2], p = acc$0[1], s2 = string_of_formatting_lit(fmting_lit);
              bufput_acc(b, p);
              return caml_call2(Stdlib_Buffer[16], b, s2);
            case 1:
              var match = acc$0[2], p$0 = acc$0[1];
              if (0 === match[0]) {
                var acc$1 = match[1];
                bufput_acc(b, p$0);
                caml_call2(Stdlib_Buffer[16], b, cst$20);
                acc$0 = acc$1;
              } else {
                var acc$2 = match[1];
                bufput_acc(b, p$0);
                caml_call2(Stdlib_Buffer[16], b, cst$21);
                acc$0 = acc$2;
              }
              break;
            case 6:
              var f = acc$0[2], p$3 = acc$0[1];
              bufput_acc(b, p$3);
              return caml_call1(f, b);
            case 7:
              var acc$3 = acc$0[1];
              acc$0 = acc$3;
              break;
            case 8:
              var msg = acc$0[2], p$4 = acc$0[1];
              bufput_acc(b, p$4);
              return caml_call1(Stdlib[1], msg);
            case 2:
            case 4:
              var s$0 = acc$0[2], p$1 = acc$0[1];
              bufput_acc(b, p$1);
              return caml_call2(Stdlib_Buffer[16], b, s$0);
            default:
              var c = acc$0[2], p$2 = acc$0[1];
              bufput_acc(b, p$2);
              return caml_call2(Stdlib_Buffer[12], b, c);
          }
        }
      }
      function strput_acc(b, acc) {
        var acc$0 = acc;
        for (; ; ) {
          if (typeof acc$0 === "number") return 0;
          switch (acc$0[0]) {
            case 0:
              var fmting_lit = acc$0[2], p = acc$0[1], s2 = string_of_formatting_lit(fmting_lit);
              strput_acc(b, p);
              return caml_call2(Stdlib_Buffer[16], b, s2);
            case 1:
              var match = acc$0[2], p$0 = acc$0[1];
              if (0 === match[0]) {
                var acc$1 = match[1];
                strput_acc(b, p$0);
                caml_call2(Stdlib_Buffer[16], b, cst$22);
                acc$0 = acc$1;
              } else {
                var acc$2 = match[1];
                strput_acc(b, p$0);
                caml_call2(Stdlib_Buffer[16], b, cst$23);
                acc$0 = acc$2;
              }
              break;
            case 6:
              var f = acc$0[2], p$3 = acc$0[1];
              strput_acc(b, p$3);
              var _bv_ = caml_call1(f, 0);
              return caml_call2(Stdlib_Buffer[16], b, _bv_);
            case 7:
              var acc$3 = acc$0[1];
              acc$0 = acc$3;
              break;
            case 8:
              var msg = acc$0[2], p$4 = acc$0[1];
              strput_acc(b, p$4);
              return caml_call1(Stdlib[1], msg);
            case 2:
            case 4:
              var s$0 = acc$0[2], p$1 = acc$0[1];
              strput_acc(b, p$1);
              return caml_call2(Stdlib_Buffer[16], b, s$0);
            default:
              var c = acc$0[2], p$2 = acc$0[1];
              strput_acc(b, p$2);
              return caml_call2(Stdlib_Buffer[12], b, c);
          }
        }
      }
      function failwith_message(param) {
        var fmt = param[1], buf = caml_call1(Stdlib_Buffer[1], 256);
        function k(acc) {
          strput_acc(buf, acc);
          var _bu_ = caml_call1(Stdlib_Buffer[2], buf);
          return caml_call1(Stdlib[2], _bu_);
        }
        return make_printf(k, 0, fmt);
      }
      function open_box_of_string(str) {
        if (str === cst$43) return _x_;
        var len = caml_ml_string_length2(str);
        function invalid_box(param) {
          return caml_call1(failwith_message(_y_), str);
        }
        function parse_spaces(i) {
          var i$0 = i;
          for (; ; ) {
            if (i$0 === len) return i$0;
            var match2 = caml_string_get2(str, i$0);
            if (9 !== match2 && 32 !== match2) return i$0;
            var i$1 = i$0 + 1 | 0;
            i$0 = i$1;
          }
        }
        var wstart = parse_spaces(0);
        a:
          b: {
            var wend = wstart;
            for (; ; ) {
              if (wend === len) break b;
              if (25 < caml_string_get2(str, wend) - 97 >>> 0) break;
              var j = wend + 1 | 0;
              wend = j;
            }
            break a;
          }
        var box_name = caml_call3(Stdlib_String[16], str, wstart, wend - wstart | 0), nstart = parse_spaces(wend);
        a:
          b: {
            var nend = nstart;
            for (; ; ) {
              if (nend === len) break b;
              var match = caml_string_get2(str, nend);
              if (48 <= match) {
                if (58 <= match) break;
              } else if (45 !== match) break;
              var j$0 = nend + 1 | 0;
              nend = j$0;
            }
            break a;
          }
        if (nstart === nend)
          var indent = 0;
        else
          try {
            var _bs_ = runtime.caml_int_of_string(caml_call3(Stdlib_String[16], str, nstart, nend - nstart | 0)), indent = _bs_;
          } catch (_bt_) {
            var _br_ = caml_wrap_exception2(_bt_);
            if (_br_[1] !== Stdlib[7]) throw caml_maybe_attach_backtrace2(_br_, 0);
            var indent = invalid_box(0);
          }
        var exp_end = parse_spaces(nend);
        if (exp_end !== len) invalid_box(0);
        a: {
          if (box_name !== cst$43 && box_name !== "b") {
            if (box_name === "h") {
              var box_type = 0;
              break a;
            }
            if (box_name === "hov") {
              var box_type = 3;
              break a;
            }
            if (box_name === "hv") {
              var box_type = 2;
              break a;
            }
            if (box_name !== "v") {
              var box_type = invalid_box(0);
              break a;
            }
            var box_type = 1;
            break a;
          }
          var box_type = 4;
        }
        return [0, indent, box_type];
      }
      function make_padding_fmt_ebb(pad, fmt) {
        if (typeof pad === "number") return [0, 0, fmt];
        if (0 === pad[0]) {
          var w = pad[2], s2 = pad[1];
          return [0, [0, s2, w], fmt];
        }
        var s$0 = pad[1];
        return [0, [1, s$0], fmt];
      }
      function make_padprec_fmt_ebb(pad, prec, fmt) {
        if (typeof prec === "number")
          var match = prec ? [0, 1] : [0, 0];
        else
          var p = prec[1], match = [0, [0, p]];
        var prec$0 = match[1];
        if (typeof pad === "number") return [0, 0, prec$0, fmt];
        if (0 === pad[0]) {
          var w = pad[2], s2 = pad[1];
          return [0, [0, s2, w], prec$0, fmt];
        }
        var s$0 = pad[1];
        return [0, [1, s$0], prec$0, fmt];
      }
      function fmt_ebb_of_string(legacy_behavior, str) {
        if (legacy_behavior)
          var flag = legacy_behavior[1], legacy_behavior$0 = flag;
        else
          var legacy_behavior$0 = 1;
        function invalid_format_message(str_ind, msg) {
          return caml_call3(failwith_message(_z_), str, str_ind, msg);
        }
        function invalid_format_without(str_ind, c, s2) {
          return caml_call4(failwith_message(_A_), str, str_ind, c, s2);
        }
        function expected_character(str_ind, expected, read) {
          return caml_call4(failwith_message(_B_), str, str_ind, expected, read);
        }
        function parse(lit_start, end_ind) {
          a: {
            var str_ind = lit_start;
            for (; ; ) {
              if (str_ind === end_ind) return add_literal(lit_start, str_ind, 0);
              var match = caml_string_get2(str, str_ind);
              if (37 === match) break;
              if (64 === match) break a;
              var str_ind$1 = str_ind + 1 | 0;
              str_ind = str_ind$1;
            }
            var str_ind$2 = str_ind + 1 | 0;
            if (str_ind$2 === end_ind)
              invalid_format_message(end_ind, cst_unexpected_end_of_format);
            var match$1 = 95 === caml_string_get2(str, str_ind$2) ? parse_flags(str_ind, str_ind$2 + 1 | 0, end_ind, 1) : parse_flags(str_ind, str_ind$2, end_ind, 0), fmt_rest = match$1[1];
            return add_literal(lit_start, str_ind, fmt_rest);
          }
          var str_ind$0 = str_ind + 1 | 0;
          a:
            if (str_ind$0 === end_ind)
              var match$0 = _N_;
            else {
              var c = caml_string_get2(str, str_ind$0);
              if (65 <= c) {
                if (94 <= c) {
                  var switcher = c - 123 | 0;
                  if (2 >= switcher >>> 0)
                    switch (switcher) {
                      case 0:
                        var match$0 = parse_tag(1, str_ind$0 + 1 | 0, end_ind);
                        break a;
                      case 1:
                        break;
                      default:
                        var fmt_rest$2 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, 1, fmt_rest$2]];
                        break a;
                    }
                } else if (91 <= c)
                  switch (c - 91 | 0) {
                    case 0:
                      var match$0 = parse_tag(0, str_ind$0 + 1 | 0, end_ind);
                      break a;
                    case 1:
                      break;
                    default:
                      var fmt_rest$3 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, 0, fmt_rest$3]];
                      break a;
                  }
              } else {
                if (10 === c) {
                  var fmt_rest$4 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, 3, fmt_rest$4]];
                  break a;
                }
                if (32 <= c)
                  switch (c - 32 | 0) {
                    case 0:
                      var fmt_rest$5 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, _O_, fmt_rest$5]];
                      break a;
                    case 5:
                      if ((str_ind$0 + 1 | 0) < end_ind && 37 === caml_string_get2(str, str_ind$0 + 1 | 0)) {
                        var fmt_rest$6 = parse(str_ind$0 + 2 | 0, end_ind)[1], match$0 = [0, [17, 6, fmt_rest$6]];
                        break a;
                      }
                      var fmt_rest$7 = parse(str_ind$0, end_ind)[1], match$0 = [0, [12, 64, fmt_rest$7]];
                      break a;
                    case 12:
                      var fmt_rest$8 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, _P_, fmt_rest$8]];
                      break a;
                    case 14:
                      var fmt_rest$9 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, 4, fmt_rest$9]];
                      break a;
                    case 27:
                      var str_ind$3 = str_ind$0 + 1 | 0;
                      b:
                        try {
                          var _bg_ = str_ind$3 === end_ind ? 1 : 0, _bh_ = _bg_ || (60 !== caml_string_get2(str, str_ind$3) ? 1 : 0);
                          if (_bh_) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                          var str_ind_1 = parse_spaces(str_ind$3 + 1 | 0, end_ind), match$2 = caml_string_get2(str, str_ind_1);
                          c: {
                            if (48 <= match$2) {
                              if (58 > match$2) break c;
                            } else if (45 === match$2) break c;
                            throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                          }
                          var match$3 = parse_integer(str_ind_1, end_ind), width = match$3[2], str_ind_2 = match$3[1], str_ind_3 = parse_spaces(str_ind_2, end_ind), switcher$0 = caml_string_get2(str, str_ind_3) - 45 | 0;
                          if (12 < switcher$0 >>> 0) {
                            if (17 === switcher$0) {
                              var s2 = caml_call3(
                                Stdlib_String[16],
                                str,
                                str_ind$3 - 2 | 0,
                                (str_ind_3 - str_ind$3 | 0) + 3 | 0
                              ), _bi_ = [0, s2, width, 0], _bj_ = str_ind_3 + 1 | 0, formatting_lit$0 = _bi_, next_ind = _bj_;
                              break b;
                            }
                          } else if (1 < switcher$0 - 1 >>> 0) {
                            var match$4 = parse_integer(str_ind_3, end_ind), offset = match$4[2], str_ind_4 = match$4[1], str_ind_5 = parse_spaces(str_ind_4, end_ind);
                            if (62 !== caml_string_get2(str, str_ind_5))
                              throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                            var s$0 = caml_call3(
                              Stdlib_String[16],
                              str,
                              str_ind$3 - 2 | 0,
                              (str_ind_5 - str_ind$3 | 0) + 3 | 0
                            ), _bk_ = [0, s$0, width, offset], _bl_ = str_ind_5 + 1 | 0, formatting_lit$0 = _bk_, next_ind = _bl_;
                            break b;
                          }
                          throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                        } catch (_bq_) {
                          var _bf_ = caml_wrap_exception2(_bq_);
                          if (_bf_ !== Stdlib[8] && _bf_[1] !== Stdlib[7])
                            throw caml_maybe_attach_backtrace2(_bf_, 0);
                          var formatting_lit$0 = formatting_lit, next_ind = str_ind$3;
                        }
                      var fmt_rest$12 = parse(next_ind, end_ind)[1], match$0 = [0, [17, formatting_lit$0, fmt_rest$12]];
                      break a;
                    case 28:
                      var str_ind$4 = str_ind$0 + 1 | 0;
                      try {
                        var str_ind_1$0 = parse_spaces(str_ind$4, end_ind), match$6 = caml_string_get2(str, str_ind_1$0);
                        b: {
                          c: {
                            if (48 <= match$6) {
                              if (58 > match$6) break c;
                            } else if (45 === match$6) break c;
                            var _bo_ = 0;
                            break b;
                          }
                          var match$7 = parse_integer(str_ind_1$0, end_ind), size = match$7[2], str_ind_2$0 = match$7[1], str_ind_3$0 = parse_spaces(str_ind_2$0, end_ind);
                          if (62 !== caml_string_get2(str, str_ind_3$0))
                            throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
                          var s$1 = caml_call3(
                            Stdlib_String[16],
                            str,
                            str_ind$4 - 2 | 0,
                            (str_ind_3$0 - str_ind$4 | 0) + 3 | 0
                          ), _bo_ = [0, [0, str_ind_3$0 + 1 | 0, [1, s$1, size]]];
                        }
                        var _bn_ = _bo_;
                      } catch (_bp_) {
                        var _bm_ = caml_wrap_exception2(_bp_);
                        if (_bm_ !== Stdlib[8] && _bm_[1] !== Stdlib[7])
                          throw caml_maybe_attach_backtrace2(_bm_, 0);
                        var _bn_ = 0;
                      }
                      if (_bn_)
                        var match$5 = _bn_[1], formatting_lit$1 = match$5[2], next_ind$0 = match$5[1], fmt_rest$13 = parse(next_ind$0, end_ind)[1], _be_ = [0, [17, formatting_lit$1, fmt_rest$13]];
                      else
                        var fmt_rest$14 = parse(str_ind$4, end_ind)[1], _be_ = [0, [17, _Q_, fmt_rest$14]];
                      var match$0 = _be_;
                      break a;
                    case 31:
                      var fmt_rest$10 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, 2, fmt_rest$10]];
                      break a;
                    case 32:
                      var fmt_rest$11 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, 5, fmt_rest$11]];
                      break a;
                  }
              }
              var fmt_rest$1 = parse(str_ind$0 + 1 | 0, end_ind)[1], match$0 = [0, [17, [2, c], fmt_rest$1]];
            }
          var fmt_rest$0 = match$0[1];
          return add_literal(lit_start, str_ind, fmt_rest$0);
        }
        function parse_flags(pct_ind, str_ind, end_ind, ign) {
          var zero = [0, 0], minus = [0, 0], plus = [0, 0], space = [0, 0], hash = [0, 0];
          function set_flag(str_ind2, flag2) {
            var _bb_ = flag2[1], _bc_ = _bb_ ? 1 - legacy_behavior$0 : _bb_;
            if (_bc_) {
              var _bd_ = caml_string_get2(str, str_ind2);
              caml_call3(failwith_message(_C_), str, str_ind2, _bd_);
            }
            flag2[1] = 1;
          }
          a:
            b: {
              var str_ind$0 = str_ind;
              c:
                for (; ; ) {
                  if (str_ind$0 === end_ind)
                    invalid_format_message(end_ind, cst_unexpected_end_of_format);
                  var switcher = caml_string_get2(str, str_ind$0) - 32 | 0;
                  if (16 < switcher >>> 0) break b;
                  switch (switcher) {
                    case 0:
                      set_flag(str_ind$0, space);
                      var str_ind$1 = str_ind$0 + 1 | 0;
                      str_ind$0 = str_ind$1;
                      break;
                    case 3:
                      set_flag(str_ind$0, hash);
                      var str_ind$2 = str_ind$0 + 1 | 0;
                      str_ind$0 = str_ind$2;
                      break;
                    case 11:
                      set_flag(str_ind$0, plus);
                      var str_ind$3 = str_ind$0 + 1 | 0;
                      str_ind$0 = str_ind$3;
                      break;
                    case 13:
                      set_flag(str_ind$0, minus);
                      var str_ind$4 = str_ind$0 + 1 | 0;
                      str_ind$0 = str_ind$4;
                      break;
                    case 16:
                      set_flag(str_ind$0, zero);
                      var str_ind$5 = str_ind$0 + 1 | 0;
                      str_ind$0 = str_ind$5;
                      break;
                    default:
                      break c;
                  }
                }
              break a;
            }
          var space$0 = space[1], hash$0 = hash[1], plus$0 = plus[1], minus$0 = minus[1], zero$0 = zero[1];
          if (str_ind$0 === end_ind)
            invalid_format_message(end_ind, cst_unexpected_end_of_format);
          var padty = zero$0 ? minus$0 ? legacy_behavior$0 ? 0 : incompatible_flag(pct_ind, str_ind$0, 45, cst_0) : 2 : minus$0 ? 0 : 1, match = caml_string_get2(str, str_ind$0);
          if (48 <= match) {
            if (58 > match) {
              var match$0 = parse_positive(str_ind$0, end_ind, 0), width = match$0[2], new_ind = match$0[1];
              return parse_after_padding(
                pct_ind,
                new_ind,
                end_ind,
                minus$0,
                plus$0,
                hash$0,
                space$0,
                ign,
                [0, padty, width]
              );
            }
          } else if (42 === match)
            return parse_after_padding(
              pct_ind,
              str_ind$0 + 1 | 0,
              end_ind,
              minus$0,
              plus$0,
              hash$0,
              space$0,
              ign,
              [1, padty]
            );
          switch (padty) {
            case 0:
              if (1 - legacy_behavior$0)
                invalid_format_without(str_ind$0 - 1 | 0, 45, cst_padding);
              return parse_after_padding(
                pct_ind,
                str_ind$0,
                end_ind,
                minus$0,
                plus$0,
                hash$0,
                space$0,
                ign,
                0
              );
            case 1:
              return parse_after_padding(
                pct_ind,
                str_ind$0,
                end_ind,
                minus$0,
                plus$0,
                hash$0,
                space$0,
                ign,
                0
              );
            default:
              return parse_after_padding(
                pct_ind,
                str_ind$0,
                end_ind,
                minus$0,
                plus$0,
                hash$0,
                space$0,
                ign,
                _D_
              );
          }
        }
        function parse_after_padding(pct_ind, str_ind, end_ind, minus, plus, hash, space, ign, pad) {
          if (str_ind === end_ind)
            invalid_format_message(end_ind, cst_unexpected_end_of_format);
          var symb = caml_string_get2(str, str_ind);
          if (46 !== symb)
            return parse_conversion(
              pct_ind,
              str_ind + 1 | 0,
              end_ind,
              plus,
              hash,
              space,
              ign,
              pad,
              0,
              pad,
              symb
            );
          var str_ind$0 = str_ind + 1 | 0;
          if (str_ind$0 === end_ind)
            invalid_format_message(end_ind, cst_unexpected_end_of_format);
          function parse_literal(minus2, str_ind2) {
            var match = parse_positive(str_ind2, end_ind, 0), prec = match[2], new_ind = match[1];
            return parse_after_precision(
              pct_ind,
              new_ind,
              end_ind,
              minus2,
              plus,
              hash,
              space,
              ign,
              pad,
              [0, prec]
            );
          }
          var symb$0 = caml_string_get2(str, str_ind$0);
          if (48 <= symb$0) {
            if (58 > symb$0) return parse_literal(minus, str_ind$0);
          } else if (42 <= symb$0)
            switch (symb$0 - 42 | 0) {
              case 0:
                return parse_after_precision(
                  pct_ind,
                  str_ind$0 + 1 | 0,
                  end_ind,
                  minus,
                  plus,
                  hash,
                  space,
                  ign,
                  pad,
                  1
                );
              case 1:
              case 3:
                if (legacy_behavior$0) {
                  var _ba_ = str_ind$0 + 1 | 0, minus$0 = minus || (45 === symb$0 ? 1 : 0);
                  return parse_literal(minus$0, _ba_);
                }
                break;
            }
          return legacy_behavior$0 ? parse_after_precision(
            pct_ind,
            str_ind$0,
            end_ind,
            minus,
            plus,
            hash,
            space,
            ign,
            pad,
            _E_
          ) : invalid_format_without(str_ind$0 - 1 | 0, 46, cst_precision);
        }
        function parse_after_precision(pct_ind, str_ind, end_ind, minus, plus, hash, space, ign, pad, prec) {
          if (str_ind === end_ind)
            invalid_format_message(end_ind, cst_unexpected_end_of_format);
          function parse_conv(padprec) {
            return parse_conversion(
              pct_ind,
              str_ind + 1 | 0,
              end_ind,
              plus,
              hash,
              space,
              ign,
              pad,
              prec,
              padprec,
              caml_string_get2(str, str_ind)
            );
          }
          if (typeof pad !== "number") return parse_conv(pad);
          if (typeof prec === "number" && !prec) return parse_conv(0);
          if (minus) {
            if (typeof prec === "number") return parse_conv(_F_);
            var n = prec[1];
            return parse_conv([0, 0, n]);
          }
          if (typeof prec === "number") return parse_conv(_G_);
          var n$0 = prec[1];
          return parse_conv([0, 1, n$0]);
        }
        function parse_conversion(pct_ind, str_ind, end_ind, plus, hash, space, ign, pad, prec, padprec, symb) {
          var plus_used = [0, 0], hash_used = [0, 0], space_used = [0, 0], ign_used = [0, 0], pad_used = [0, 0], prec_used = [0, 0];
          function get_plus(param) {
            plus_used[1] = 1;
            return plus;
          }
          function get_hash(param) {
            hash_used[1] = 1;
            return hash;
          }
          function get_space(param) {
            space_used[1] = 1;
            return space;
          }
          function get_ign(param) {
            ign_used[1] = 1;
            return ign;
          }
          function get_pad(param) {
            pad_used[1] = 1;
            return pad;
          }
          function get_prec(param) {
            prec_used[1] = 1;
            return prec;
          }
          function get_padprec(param) {
            pad_used[1] = 1;
            return padprec;
          }
          function get_int_pad(param) {
            var pad2 = get_pad(0), match2 = get_prec(0);
            if (typeof match2 === "number" && !match2) return pad2;
            if (typeof pad2 === "number") return 0;
            if (0 !== pad2[0])
              return 2 <= pad2[1] ? legacy_behavior$0 ? _H_ : incompatible_flag(pct_ind, str_ind, 48, cst_precision$1) : pad2;
            if (2 > pad2[1]) return pad2;
            var n = pad2[2];
            return legacy_behavior$0 ? [0, 1, n] : incompatible_flag(pct_ind, str_ind, 48, cst_precision$0);
          }
          function check_no_0(symb2, pad2) {
            if (typeof pad2 === "number") return pad2;
            if (0 !== pad2[0])
              return 2 <= pad2[1] ? legacy_behavior$0 ? _I_ : incompatible_flag(pct_ind, str_ind, symb2, cst_0$1) : pad2;
            if (2 > pad2[1]) return pad2;
            var width = pad2[2];
            return legacy_behavior$0 ? [0, 1, width] : incompatible_flag(pct_ind, str_ind, symb2, cst_0$0);
          }
          function opt_of_pad(c2, pad2) {
            if (typeof pad2 === "number") return 0;
            if (0 === pad2[0])
              switch (pad2[1]) {
                case 0:
                  var width = pad2[2];
                  return legacy_behavior$0 ? [0, width] : incompatible_flag(pct_ind, str_ind, c2, cst$24);
                case 1:
                  var width$0 = pad2[2];
                  return [0, width$0];
                default:
                  var width$1 = pad2[2];
                  return legacy_behavior$0 ? [0, width$1] : incompatible_flag(pct_ind, str_ind, c2, cst_0$2);
              }
            return incompatible_flag(pct_ind, str_ind, c2, cst$25);
          }
          function get_pad_opt(c2) {
            return opt_of_pad(c2, get_pad(0));
          }
          function get_padprec_opt(c2) {
            return opt_of_pad(c2, get_padprec(0));
          }
          a: {
            if (124 > symb)
              switch (symb) {
                case 33:
                  var fmt_rest$5 = parse(str_ind, end_ind)[1], fmt_result = [0, [10, fmt_rest$5]];
                  break a;
                case 40:
                  var sub_end = search_subformat_end(str_ind, end_ind, 41), fmt_rest$7 = parse(sub_end + 2 | 0, end_ind)[1], sub_fmt = parse(str_ind, sub_end)[1], sub_fmtty = fmtty_of_fmt(sub_fmt);
                  if (get_ign(0))
                    var ignored$2 = [9, get_pad_opt(95), sub_fmtty], _aJ_ = [0, [23, ignored$2, fmt_rest$7]];
                  else
                    var _aJ_ = [0, [14, get_pad_opt(40), sub_fmtty, fmt_rest$7]];
                  var fmt_result = _aJ_;
                  break a;
                case 44:
                  var fmt_result = parse(str_ind, end_ind);
                  break a;
                case 67:
                  var fmt_rest$10 = parse(str_ind, end_ind)[1], _aL_ = get_ign(0) ? [0, [23, 1, fmt_rest$10]] : [0, [1, fmt_rest$10]], fmt_result = _aL_;
                  break a;
                case 78:
                  var fmt_rest$14 = parse(str_ind, end_ind)[1], counter$0 = 2;
                  if (get_ign(0))
                    var ignored$6 = [11, counter$0], _aR_ = [0, [23, ignored$6, fmt_rest$14]];
                  else
                    var _aR_ = [0, [21, counter$0, fmt_rest$14]];
                  var fmt_result = _aR_;
                  break a;
                case 83:
                  var pad$6 = check_no_0(symb, get_padprec(0)), fmt_rest$15 = parse(str_ind, end_ind)[1];
                  if (get_ign(0))
                    var ignored$7 = [1, get_padprec_opt(95)], _aS_ = [0, [23, ignored$7, fmt_rest$15]];
                  else
                    var match$5 = make_padding_fmt_ebb(pad$6, fmt_rest$15), fmt_rest$16 = match$5[2], pad$7 = match$5[1], _aS_ = [0, [3, pad$7, fmt_rest$16]];
                  var fmt_result = _aS_;
                  break a;
                case 91:
                  if (str_ind === end_ind)
                    invalid_format_message(end_ind, cst_unexpected_end_of_format);
                  var char_set = create_char_set(0), add_range = function(c$0, c2) {
                    if (c2 >= c$0) {
                      var i = c$0;
                      for (; ; ) {
                        add_in_char_set(char_set, caml_call1(Stdlib[29], i));
                        var _a$_ = i + 1 | 0;
                        if (c2 === i) break;
                        i = _a$_;
                      }
                    }
                  }, fail_single_percent = function(str_ind2) {
                    return caml_call2(failwith_message(_R_), str, str_ind2);
                  }, parse_char_set_content = function(counter2, str_ind2, end_ind2) {
                    var str_ind$02 = str_ind2;
                    for (; ; ) {
                      if (str_ind$02 === end_ind2)
                        invalid_format_message(end_ind2, cst_unexpected_end_of_format);
                      var c2 = caml_string_get2(str, str_ind$02);
                      if (45 !== c2) {
                        if (93 === c2) return str_ind$02 + 1 | 0;
                        var _a__ = str_ind$02 + 1 | 0;
                        if (counter2 >= 50)
                          return caml_trampoline_return2(parse_char_set_after_char$0, [0, _a__, end_ind2, c2]);
                        var counter$02 = counter2 + 1 | 0;
                        return parse_char_set_after_char$0(counter$02, _a__, end_ind2, c2);
                      }
                      add_in_char_set(char_set, 45);
                      var str_ind$12 = str_ind$02 + 1 | 0;
                      str_ind$02 = str_ind$12;
                    }
                  }, parse_char_set_after_char$0 = function(counter2, str_ind2, end_ind2, c2) {
                    var str_ind$02 = str_ind2, c$0 = c2;
                    for (; ; ) {
                      if (str_ind$02 === end_ind2)
                        invalid_format_message(end_ind2, cst_unexpected_end_of_format);
                      var c$1 = caml_string_get2(str, str_ind$02);
                      a: {
                        if (46 <= c$1) {
                          if (64 !== c$1) {
                            if (93 !== c$1) break a;
                            add_in_char_set(char_set, c$0);
                            return str_ind$02 + 1 | 0;
                          }
                        } else if (37 !== c$1) {
                          if (45 > c$1) break a;
                          var str_ind$2 = str_ind$02 + 1 | 0;
                          if (str_ind$2 === end_ind2)
                            invalid_format_message(end_ind2, cst_unexpected_end_of_format);
                          var c$2 = caml_string_get2(str, str_ind$2);
                          if (37 === c$2) {
                            if ((str_ind$2 + 1 | 0) === end_ind2)
                              invalid_format_message(end_ind2, cst_unexpected_end_of_format);
                            var c$3 = caml_string_get2(str, str_ind$2 + 1 | 0);
                            if (37 !== c$3 && 64 !== c$3)
                              return fail_single_percent(str_ind$2);
                            add_range(c$0, c$3);
                            var _a8_ = str_ind$2 + 2 | 0;
                            if (counter2 >= 50)
                              return caml_trampoline_return2(parse_char_set_content, [0, _a8_, end_ind2]);
                            var counter$1 = counter2 + 1 | 0;
                            return parse_char_set_content(counter$1, _a8_, end_ind2);
                          }
                          if (93 === c$2) {
                            add_in_char_set(char_set, c$0);
                            add_in_char_set(char_set, 45);
                            return str_ind$2 + 1 | 0;
                          }
                          add_range(c$0, c$2);
                          var _a9_ = str_ind$2 + 1 | 0;
                          if (counter2 >= 50)
                            return caml_trampoline_return2(parse_char_set_content, [0, _a9_, end_ind2]);
                          var counter$02 = counter2 + 1 | 0;
                          return parse_char_set_content(counter$02, _a9_, end_ind2);
                        }
                        if (37 === c$0) {
                          add_in_char_set(char_set, c$1);
                          var _a7_ = str_ind$02 + 1 | 0;
                          if (counter2 >= 50)
                            return caml_trampoline_return2(parse_char_set_content, [0, _a7_, end_ind2]);
                          var counter$2 = counter2 + 1 | 0;
                          return parse_char_set_content(counter$2, _a7_, end_ind2);
                        }
                      }
                      if (37 === c$0) fail_single_percent(str_ind$02);
                      add_in_char_set(char_set, c$0);
                      var str_ind$12 = str_ind$02 + 1 | 0;
                      str_ind$02 = str_ind$12;
                      c$0 = c$1;
                    }
                  }, parse_char_set_after_char = function(str_ind2, end_ind2, c2) {
                    return caml_trampoline2(parse_char_set_after_char$0(0, str_ind2, end_ind2, c2));
                  };
                  if (str_ind === end_ind)
                    invalid_format_message(end_ind, cst_unexpected_end_of_format);
                  if (94 === caml_string_get2(str, str_ind))
                    var str_ind$0 = str_ind + 1 | 0, reverse = 1, str_ind$1 = str_ind$0;
                  else
                    var reverse = 0, str_ind$1 = str_ind;
                  if (str_ind$1 === end_ind)
                    invalid_format_message(end_ind, cst_unexpected_end_of_format);
                  var c = caml_string_get2(str, str_ind$1), next_ind = parse_char_set_after_char(str_ind$1 + 1 | 0, end_ind, c), char_set$0 = freeze_char_set(char_set), char_set$1 = reverse ? rev_char_set(char_set$0) : char_set$0, fmt_rest$19 = parse(next_ind, end_ind)[1];
                  if (get_ign(0))
                    var ignored$9 = [10, get_pad_opt(95), char_set$1], _aX_ = [0, [23, ignored$9, fmt_rest$19]];
                  else
                    var _aX_ = [0, [20, get_pad_opt(91), char_set$1, fmt_rest$19]];
                  var fmt_result = _aX_;
                  break a;
                case 97:
                  var fmt_rest$20 = parse(str_ind, end_ind)[1], fmt_result = [0, [15, fmt_rest$20]];
                  break a;
                case 99:
                  var char_format = function(fmt_rest2) {
                    return get_ign(0) ? [0, [23, 0, fmt_rest2]] : [0, [0, fmt_rest2]];
                  }, fmt_rest$21 = parse(str_ind, end_ind)[1], match$7 = get_pad_opt(99);
                  if (match$7) {
                    if (0 === match$7[1])
                      var _aY_ = get_ign(0) ? [0, [23, 3, fmt_rest$21]] : [0, [22, fmt_rest$21]], _aZ_ = _aY_;
                    else
                      var _aZ_ = legacy_behavior$0 ? char_format(fmt_rest$21) : invalid_format_message(str_ind, cst_non_zero_widths_are_unsupp);
                    var _a0_ = _aZ_;
                  } else
                    var _a0_ = char_format(fmt_rest$21);
                  var fmt_result = _a0_;
                  break a;
                case 114:
                  var fmt_rest$22 = parse(str_ind, end_ind)[1], _a1_ = get_ign(0) ? [0, [23, 2, fmt_rest$22]] : [0, [19, fmt_rest$22]], fmt_result = _a1_;
                  break a;
                case 115:
                  var pad$9 = check_no_0(symb, get_padprec(0)), fmt_rest$23 = parse(str_ind, end_ind)[1];
                  if (get_ign(0))
                    var ignored$10 = [0, get_padprec_opt(95)], _a2_ = [0, [23, ignored$10, fmt_rest$23]];
                  else
                    var match$8 = make_padding_fmt_ebb(pad$9, fmt_rest$23), fmt_rest$24 = match$8[2], pad$10 = match$8[1], _a2_ = [0, [2, pad$10, fmt_rest$24]];
                  var fmt_result = _a2_;
                  break a;
                case 116:
                  var fmt_rest$25 = parse(str_ind, end_ind)[1], fmt_result = [0, [16, fmt_rest$25]];
                  break a;
                case 123:
                  var sub_end$0 = search_subformat_end(str_ind, end_ind, 125), sub_fmt$0 = parse(str_ind, sub_end$0)[1], fmt_rest$26 = parse(sub_end$0 + 2 | 0, end_ind)[1], sub_fmtty$0 = fmtty_of_fmt(sub_fmt$0);
                  if (get_ign(0))
                    var ignored$11 = [8, get_pad_opt(95), sub_fmtty$0], _a3_ = [0, [23, ignored$11, fmt_rest$26]];
                  else
                    var _a3_ = [0, [13, get_pad_opt(123), sub_fmtty$0, fmt_rest$26]];
                  var fmt_result = _a3_;
                  break a;
                case 66:
                case 98:
                  var pad$3 = check_no_0(symb, get_padprec(0)), fmt_rest$8 = parse(str_ind, end_ind)[1];
                  if (get_ign(0))
                    var ignored$3 = [7, get_padprec_opt(95)], _aK_ = [0, [23, ignored$3, fmt_rest$8]];
                  else
                    var match$3 = make_padding_fmt_ebb(pad$3, fmt_rest$8), fmt_rest$9 = match$3[2], pad$4 = match$3[1], _aK_ = [0, [9, pad$4, fmt_rest$9]];
                  var fmt_result = _aK_;
                  break a;
                case 37:
                case 64:
                  var fmt_rest$6 = parse(str_ind, end_ind)[1], fmt_result = [0, [12, symb, fmt_rest$6]];
                  break a;
                case 76:
                case 108:
                case 110:
                  if (str_ind !== end_ind) {
                    var symb$0 = caml_string_get2(str, str_ind), _a4_ = symb$0 - 88 | 0;
                    b: {
                      if (32 >= _a4_ >>> 0)
                        switch (_a4_) {
                          case 0:
                          case 12:
                          case 17:
                          case 23:
                          case 29:
                          case 32:
                            var _aQ_ = 1;
                            break b;
                        }
                      var _aQ_ = 0;
                    }
                    if (_aQ_) break;
                  }
                  var fmt_rest$13 = parse(str_ind, end_ind)[1];
                  b: {
                    if (108 <= symb) {
                      if (111 > symb)
                        switch (symb - 108 | 0) {
                          case 0:
                            var counter = 0;
                            break b;
                          case 1:
                            break;
                          default:
                            var counter = 1;
                            break b;
                        }
                    } else if (76 === symb) {
                      var counter = 2;
                      break b;
                    }
                    throw caml_maybe_attach_backtrace2([0, Assert_failure, _V_], 1);
                  }
                  if (get_ign(0))
                    var ignored$5 = [11, counter], _aP_ = [0, [23, ignored$5, fmt_rest$13]];
                  else
                    var _aP_ = [0, [21, counter, fmt_rest$13]];
                  var fmt_result = _aP_;
                  break a;
                case 32:
                case 35:
                case 43:
                case 45:
                case 95:
                  var fmt_result = caml_call3(failwith_message(_M_), str, pct_ind, symb);
                  break a;
                case 88:
                case 100:
                case 105:
                case 111:
                case 117:
                case 120:
                  var _aT_ = get_space(0), _aU_ = get_hash(0), iconv$2 = compute_int_conv(pct_ind, str_ind, get_plus(0), _aU_, _aT_, symb), fmt_rest$17 = parse(str_ind, end_ind)[1];
                  if (get_ign(0))
                    var ignored$8 = [2, iconv$2, get_pad_opt(95)], _aV_ = [0, [23, ignored$8, fmt_rest$17]];
                  else
                    var _aW_ = get_prec(0), match$6 = make_padprec_fmt_ebb(get_int_pad(0), _aW_, fmt_rest$17), fmt_rest$18 = match$6[3], prec$4 = match$6[2], pad$8 = match$6[1], _aV_ = [0, [4, iconv$2, pad$8, prec$4, fmt_rest$18]];
                  var fmt_result = _aV_;
                  break a;
                case 69:
                case 70:
                case 71:
                case 72:
                case 101:
                case 102:
                case 103:
                case 104:
                  var space$1 = get_space(0), hash$1 = get_hash(0), plus$2 = get_plus(0), flag2 = plus$2 ? space$1 ? legacy_behavior$0 ? 1 : incompatible_flag(pct_ind, str_ind, 32, cst$36) : 1 : space$1 ? 2 : 0;
                  b: {
                    c:
                      if (73 <= symb) {
                        var switcher = symb - 101 | 0;
                        if (3 >= switcher >>> 0) {
                          switch (switcher) {
                            case 0:
                              var _a5_ = 1;
                              break;
                            case 1:
                              var _a5_ = 0;
                              break;
                            case 2:
                              var _a5_ = 3;
                              break;
                            default:
                              var _a5_ = 6;
                          }
                          var kind = _a5_;
                          break b;
                        }
                      } else if (69 <= symb) {
                        switch (symb - 69 | 0) {
                          case 0:
                            var _a6_ = 2;
                            break;
                          case 1:
                            break c;
                          case 2:
                            var _a6_ = 4;
                            break;
                          default:
                            var _a6_ = 7;
                        }
                        var kind = _a6_;
                        break b;
                      }
                    if (hash$1) {
                      if (70 === symb) {
                        var kind = 8;
                        break b;
                      }
                    } else if (70 === symb) {
                      var kind = 5;
                      break b;
                    }
                    throw caml_maybe_attach_backtrace2([0, Assert_failure, _X_], 1);
                  }
                  var fconv = [0, flag2, kind], fmt_rest$11 = parse(str_ind, end_ind)[1];
                  if (get_ign(0)) {
                    var match = get_prec(0);
                    if (typeof match === "number")
                      var _aM_ = match ? incompatible_flag(pct_ind, str_ind, 95, cst$26) : 0;
                    else
                      var ndec = match[1], _aM_ = [0, ndec];
                    var ignored$4 = [6, get_pad_opt(95), _aM_], _aN_ = [0, [23, ignored$4, fmt_rest$11]];
                  } else
                    var _aO_ = get_prec(0), match$4 = make_padprec_fmt_ebb(get_pad(0), _aO_, fmt_rest$11), fmt_rest$12 = match$4[3], prec$3 = match$4[2], pad$5 = match$4[1], _aN_ = [0, [8, fconv, pad$5, prec$3, fmt_rest$12]];
                  var fmt_result = _aN_;
                  break a;
              }
            b:
              if (108 <= symb) {
                if (111 > symb) {
                  switch (symb - 108 | 0) {
                    case 0:
                      var _at_ = caml_string_get2(str, str_ind), _au_ = get_space(0), _av_ = get_hash(0), iconv = compute_int_conv(pct_ind, str_ind + 1 | 0, get_plus(0), _av_, _au_, _at_), fmt_rest = parse(str_ind + 1 | 0, end_ind)[1];
                      if (get_ign(0))
                        var ignored = [3, iconv, get_pad_opt(95)], _aw_ = [0, [23, ignored, fmt_rest]];
                      else
                        var _ay_ = get_prec(0), match$0 = make_padprec_fmt_ebb(get_int_pad(0), _ay_, fmt_rest), fmt_rest$0 = match$0[3], prec$0 = match$0[2], pad$0 = match$0[1], _aw_ = [0, [5, iconv, pad$0, prec$0, fmt_rest$0]];
                      var _ax_ = _aw_;
                      break;
                    case 1:
                      break b;
                    default:
                      var _az_ = caml_string_get2(str, str_ind), _aA_ = get_space(0), _aB_ = get_hash(0), iconv$0 = compute_int_conv(pct_ind, str_ind + 1 | 0, get_plus(0), _aB_, _aA_, _az_), fmt_rest$1 = parse(str_ind + 1 | 0, end_ind)[1];
                      if (get_ign(0))
                        var ignored$0 = [4, iconv$0, get_pad_opt(95)], _aC_ = [0, [23, ignored$0, fmt_rest$1]];
                      else
                        var _aD_ = get_prec(0), match$1 = make_padprec_fmt_ebb(get_int_pad(0), _aD_, fmt_rest$1), fmt_rest$2 = match$1[3], prec$1 = match$1[2], pad$1 = match$1[1], _aC_ = [0, [6, iconv$0, pad$1, prec$1, fmt_rest$2]];
                      var _ax_ = _aC_;
                  }
                  var fmt_result = _ax_;
                  break a;
                }
              } else if (76 === symb) {
                var _aE_ = caml_string_get2(str, str_ind), _aF_ = get_space(0), _aG_ = get_hash(0), iconv$1 = compute_int_conv(pct_ind, str_ind + 1 | 0, get_plus(0), _aG_, _aF_, _aE_), fmt_rest$3 = parse(str_ind + 1 | 0, end_ind)[1];
                if (get_ign(0))
                  var ignored$1 = [5, iconv$1, get_pad_opt(95)], _aH_ = [0, [23, ignored$1, fmt_rest$3]];
                else
                  var _aI_ = get_prec(0), match$2 = make_padprec_fmt_ebb(get_int_pad(0), _aI_, fmt_rest$3), fmt_rest$4 = match$2[3], prec$2 = match$2[2], pad$2 = match$2[1], _aH_ = [0, [7, iconv$1, pad$2, prec$2, fmt_rest$4]];
                var fmt_result = _aH_;
                break a;
              }
            var fmt_result = caml_call3(failwith_message(_J_), str, str_ind - 1 | 0, symb);
          }
          if (1 - legacy_behavior$0) {
            var _ak_ = 1 - plus_used[1], plus$0 = _ak_ ? plus : _ak_;
            if (plus$0) incompatible_flag(pct_ind, str_ind, symb, cst$27);
            var _al_ = 1 - hash_used[1], hash$0 = _al_ ? hash : _al_;
            if (hash$0) incompatible_flag(pct_ind, str_ind, symb, cst$28);
            var _am_ = 1 - space_used[1], space$0 = _am_ ? space : _am_;
            if (space$0) incompatible_flag(pct_ind, str_ind, symb, cst$29);
            var _an_ = 1 - pad_used[1], _ao_ = _an_ ? caml_notequal2([0, pad], _K_) : _an_;
            if (_ao_) incompatible_flag(pct_ind, str_ind, symb, cst_padding$0);
            var _ap_ = 1 - prec_used[1], _aq_ = _ap_ ? caml_notequal2([0, prec], _L_) : _ap_;
            if (_aq_) {
              var _ar_ = ign ? 95 : symb;
              incompatible_flag(pct_ind, str_ind, _ar_, cst_precision$2);
            }
            var plus$1 = ign ? plus : ign;
            if (plus$1) incompatible_flag(pct_ind, str_ind, 95, cst$30);
          }
          var _as_ = 1 - ign_used[1], ign$0 = _as_ ? ign : _as_;
          a:
            if (ign$0) {
              b: {
                if (38 <= symb) {
                  if (44 !== symb && 64 !== symb) break b;
                } else if (33 !== symb && 37 > symb) break b;
                if (legacy_behavior$0) break a;
              }
              incompatible_flag(pct_ind, str_ind, symb, cst$31);
            }
          return fmt_result;
        }
        function parse_tag(is_open_tag, str_ind, end_ind) {
          try {
            if (str_ind === end_ind) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
            if (60 !== caml_string_get2(str, str_ind))
              throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
            var ind = caml_call3(Stdlib_String[32], str, str_ind + 1 | 0, 62);
            if (end_ind <= ind) throw caml_maybe_attach_backtrace2(Stdlib[8], 1);
            var sub_str = caml_call3(Stdlib_String[16], str, str_ind, (ind - str_ind | 0) + 1 | 0), fmt_rest$0 = parse(ind + 1 | 0, end_ind)[1], sub_fmt = parse(str_ind, ind + 1 | 0)[1], sub_format$0 = [0, sub_fmt, sub_str], formatting$0 = is_open_tag ? [0, sub_format$0] : [1, sub_format$0], _ai_ = [0, [18, formatting$0, fmt_rest$0]];
            return _ai_;
          } catch (_aj_) {
            var _ah_ = caml_wrap_exception2(_aj_);
            if (_ah_ !== Stdlib[8]) throw caml_maybe_attach_backtrace2(_ah_, 0);
            var fmt_rest = parse(str_ind, end_ind)[1], formatting = is_open_tag ? [0, sub_format] : [1, sub_format];
            return [0, [18, formatting, fmt_rest]];
          }
        }
        function parse_spaces(str_ind, end_ind) {
          var str_ind$0 = str_ind;
          for (; ; ) {
            if (str_ind$0 === end_ind)
              invalid_format_message(end_ind, cst_unexpected_end_of_format);
            if (32 !== caml_string_get2(str, str_ind$0)) return str_ind$0;
            var str_ind$1 = str_ind$0 + 1 | 0;
            str_ind$0 = str_ind$1;
          }
        }
        function parse_positive(str_ind, end_ind, acc) {
          var str_ind$0 = str_ind, acc$0 = acc;
          for (; ; ) {
            if (str_ind$0 === end_ind)
              invalid_format_message(end_ind, cst_unexpected_end_of_format);
            var c = caml_string_get2(str, str_ind$0);
            if (9 < c - 48 >>> 0) return [0, str_ind$0, acc$0];
            var new_acc = (acc$0 * 10 | 0) + (c - 48 | 0) | 0;
            if (Stdlib_Sys[12] < new_acc) {
              var _ag_ = Stdlib_Sys[12];
              return caml_call3(failwith_message(_S_), str, new_acc, _ag_);
            }
            var str_ind$1 = str_ind$0 + 1 | 0;
            str_ind$0 = str_ind$1;
            acc$0 = new_acc;
          }
        }
        function parse_integer(str_ind, end_ind) {
          if (str_ind === end_ind)
            invalid_format_message(end_ind, cst_unexpected_end_of_format);
          var match = caml_string_get2(str, str_ind);
          if (48 <= match) {
            if (58 > match) return parse_positive(str_ind, end_ind, 0);
          } else if (45 === match) {
            if ((str_ind + 1 | 0) === end_ind)
              invalid_format_message(end_ind, cst_unexpected_end_of_format);
            var c = caml_string_get2(str, str_ind + 1 | 0);
            if (9 < c - 48 >>> 0)
              return expected_character(str_ind + 1 | 0, cst_digit, c);
            var match$0 = parse_positive(str_ind + 1 | 0, end_ind, 0), n = match$0[2], next_ind = match$0[1];
            return [0, next_ind, -n | 0];
          }
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _T_2], 1);
        }
        function add_literal(lit_start, str_ind, fmt) {
          var size = str_ind - lit_start | 0;
          return 0 === size ? [0, fmt] : 1 === size ? [0, [12, caml_string_get2(str, lit_start), fmt]] : [
            0,
            [
              11,
              caml_call3(Stdlib_String[16], str, lit_start, size),
              fmt
            ]
          ];
        }
        function search_subformat_end(str_ind, end_ind, c) {
          var str_ind$0 = str_ind;
          for (; ; ) {
            if (str_ind$0 === end_ind)
              caml_call3(failwith_message(_U_), str, c, end_ind);
            if (37 === caml_string_get2(str, str_ind$0)) {
              if ((str_ind$0 + 1 | 0) === end_ind)
                invalid_format_message(end_ind, cst_unexpected_end_of_format);
              if (caml_string_get2(str, str_ind$0 + 1 | 0) === c) return str_ind$0;
              var match = caml_string_get2(str, str_ind$0 + 1 | 0);
              if (95 <= match) {
                if (123 <= match) {
                  if (126 > match)
                    switch (match - 123 | 0) {
                      case 0:
                        var sub_end = search_subformat_end(str_ind$0 + 2 | 0, end_ind, 125), str_ind$2 = sub_end + 2 | 0;
                        str_ind$0 = str_ind$2;
                        continue;
                      case 1:
                        break;
                      default:
                        return expected_character(str_ind$0 + 1 | 0, cst_character, 125);
                    }
                } else if (96 > match) {
                  if ((str_ind$0 + 2 | 0) === end_ind)
                    invalid_format_message(end_ind, cst_unexpected_end_of_format);
                  var match$0 = caml_string_get2(str, str_ind$0 + 2 | 0);
                  if (40 === match$0) {
                    var sub_end$0 = search_subformat_end(str_ind$0 + 3 | 0, end_ind, 41), str_ind$3 = sub_end$0 + 2 | 0;
                    str_ind$0 = str_ind$3;
                    continue;
                  }
                  if (123 === match$0) {
                    var sub_end$1 = search_subformat_end(str_ind$0 + 3 | 0, end_ind, 125), str_ind$4 = sub_end$1 + 2 | 0;
                    str_ind$0 = str_ind$4;
                    continue;
                  }
                  var str_ind$5 = str_ind$0 + 3 | 0;
                  str_ind$0 = str_ind$5;
                  continue;
                }
              } else {
                if (40 === match) {
                  var sub_end$2 = search_subformat_end(str_ind$0 + 2 | 0, end_ind, 41), str_ind$6 = sub_end$2 + 2 | 0;
                  str_ind$0 = str_ind$6;
                  continue;
                }
                if (41 === match)
                  return expected_character(str_ind$0 + 1 | 0, cst_character$0, 41);
              }
              var str_ind$1 = str_ind$0 + 2 | 0;
              str_ind$0 = str_ind$1;
            } else {
              var str_ind$7 = str_ind$0 + 1 | 0;
              str_ind$0 = str_ind$7;
            }
          }
        }
        function compute_int_conv(pct_ind, str_ind, plus, hash, space, symb) {
          var plus$0 = plus, hash$0 = hash, space$0 = space;
          for (; ; ) {
            a: {
              if (plus$0) {
                if (!hash$0) {
                  if (space$0) break a;
                  if (100 === symb) return 1;
                  if (105 === symb) return 4;
                  break a;
                }
              } else {
                if (!hash$0) {
                  if (space$0) {
                    if (100 === symb) return 2;
                    if (105 === symb) return 5;
                    break a;
                  }
                  var switcher$1 = symb - 88 | 0;
                  if (32 < switcher$1 >>> 0) break a;
                  switch (switcher$1) {
                    case 0:
                      return 8;
                    case 12:
                      return 0;
                    case 17:
                      return 3;
                    case 23:
                      return 10;
                    case 29:
                      return 12;
                    case 32:
                      return 6;
                    default:
                      break a;
                  }
                }
                if (!space$0) {
                  var switcher$0 = symb - 88 | 0;
                  if (32 >= switcher$0 >>> 0)
                    switch (switcher$0) {
                      case 0:
                        return 9;
                      case 12:
                        return 13;
                      case 17:
                        return 14;
                      case 23:
                        return 11;
                      case 29:
                        return 15;
                      case 32:
                        return 7;
                    }
                }
              }
              var switcher = symb - 88 | 0;
              if (32 >= switcher >>> 0)
                switch (switcher) {
                  case 0:
                    if (legacy_behavior$0) return 9;
                    break;
                  case 23:
                    if (legacy_behavior$0) return 11;
                    break;
                  case 32:
                    if (legacy_behavior$0) return 7;
                    break;
                  case 12:
                  case 17:
                  case 29:
                    if (!legacy_behavior$0)
                      return incompatible_flag(pct_ind, str_ind, symb, cst$35);
                    hash$0 = 0;
                    continue;
                }
            }
            if (plus$0)
              if (space$0) {
                if (!legacy_behavior$0)
                  return incompatible_flag(pct_ind, str_ind, 32, cst$32);
                space$0 = 0;
              } else {
                if (!legacy_behavior$0)
                  return incompatible_flag(pct_ind, str_ind, symb, cst$33);
                plus$0 = 0;
              }
            else {
              if (!space$0)
                throw caml_maybe_attach_backtrace2([0, Assert_failure, _W_], 1);
              if (!legacy_behavior$0)
                return incompatible_flag(pct_ind, str_ind, symb, cst$34);
              space$0 = 0;
            }
          }
        }
        function incompatible_flag(pct_ind, str_ind, symb, option) {
          var subfmt = caml_call3(Stdlib_String[16], str, pct_ind, str_ind - pct_ind | 0);
          return caml_call5(failwith_message(_Y_), str, pct_ind, option, symb, subfmt);
        }
        return parse(0, caml_ml_string_length2(str));
      }
      function format_of_string_fmtty(str, fmtty) {
        var fmt = fmt_ebb_of_string(0, str)[1];
        try {
          var _ae_ = [0, type_format(fmt, fmtty), str];
          return _ae_;
        } catch (_af_) {
          var _ac_ = caml_wrap_exception2(_af_);
          if (_ac_ !== Type_mismatch) throw caml_maybe_attach_backtrace2(_ac_, 0);
          var _ad_ = string_of_fmtty(fmtty);
          return caml_call2(failwith_message(_Z_), str, _ad_);
        }
      }
      function format_of_string_format(str, param) {
        var str$0 = param[2], fmt = param[1], fmt$0 = fmt_ebb_of_string(0, str)[1];
        try {
          var _aa_ = [0, type_format(fmt$0, fmtty_of_fmt(fmt)), str];
          return _aa_;
        } catch (_ab_) {
          var _$_ = caml_wrap_exception2(_ab_);
          if (_$_ === Type_mismatch)
            return caml_call2(failwith_message(___), str, str$0);
          throw caml_maybe_attach_backtrace2(_$_, 0);
        }
      }
      var CamlinternalFormat = [
        0,
        is_in_char_set,
        rev_char_set,
        create_char_set,
        add_in_char_set,
        freeze_char_set,
        param_format_of_ignored_format,
        make_printf,
        make_iprintf,
        output_acc,
        bufput_acc,
        strput_acc,
        type_format,
        fmt_ebb_of_string,
        format_of_string_fmtty,
        format_of_string_format,
        char_of_iconv,
        string_of_formatting_lit,
        string_of_fmtty,
        string_of_fmt,
        open_box_of_string,
        symm,
        trans,
        recast
      ];
      runtime.caml_register_global(197, CamlinternalFormat, "CamlinternalFormat");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib_Buffer = global_data.Stdlib__Buffer, CamlinternalFormat = global_data.CamlinternalFormat, Stdlib = global_data.Stdlib;
      function kfprintf(k, o, param) {
        var fmt = param[1];
        return caml_call3(
          CamlinternalFormat[7],
          function(acc) {
            caml_call2(CamlinternalFormat[9], o, acc);
            return caml_call1(k, o);
          },
          0,
          fmt
        );
      }
      function kbprintf(k, b, param) {
        var fmt = param[1];
        return caml_call3(
          CamlinternalFormat[7],
          function(acc) {
            caml_call2(CamlinternalFormat[10], b, acc);
            return caml_call1(k, b);
          },
          0,
          fmt
        );
      }
      function ikfprintf(k, oc, param) {
        var fmt = param[1];
        return caml_call3(CamlinternalFormat[8], k, oc, fmt);
      }
      function fprintf(oc, fmt) {
        return kfprintf(function(_d_) {
          return 0;
        }, oc, fmt);
      }
      function bprintf(b, fmt) {
        return kbprintf(function(_c_) {
          return 0;
        }, b, fmt);
      }
      function ifprintf(oc, fmt) {
        return ikfprintf(function(_b_) {
          return 0;
        }, oc, fmt);
      }
      function ibprintf(b, fmt) {
        return ikfprintf(function(_a_) {
          return 0;
        }, b, fmt);
      }
      function printf(fmt) {
        return fprintf(Stdlib[39], fmt);
      }
      function eprintf(fmt) {
        return fprintf(Stdlib[40], fmt);
      }
      function ksprintf(k, param) {
        var fmt = param[1];
        function k$0(acc) {
          var buf = caml_call1(Stdlib_Buffer[1], 64);
          caml_call2(CamlinternalFormat[11], buf, acc);
          return caml_call1(k, caml_call1(Stdlib_Buffer[2], buf));
        }
        return caml_call3(CamlinternalFormat[7], k$0, 0, fmt);
      }
      function sprintf(fmt) {
        return ksprintf(function(s2) {
          return s2;
        }, fmt);
      }
      var Stdlib_Printf = [
        0,
        fprintf,
        printf,
        eprintf,
        sprintf,
        bprintf,
        ifprintf,
        ibprintf,
        kfprintf,
        ikfprintf,
        ksprintf,
        kbprintf,
        ikfprintf,
        ksprintf
      ];
      runtime.caml_register_global(3, Stdlib_Printf, "Stdlib__Printf");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst$4 = "", cst_s = "%s\n", cst_Program_not_linked_with_g_$0 = "(Program not linked with -g, cannot print stack backtrace)\n", cst_characters = ", characters ", cst_Fatal_error_exception = "Fatal error: exception ", cst_Fatal_error_exception_s = "Fatal error: exception %s\n", cst_Uncaught_exception = "Uncaught exception: ", cst_Uncaught_exception_s = "Uncaught exception: %s\n", caml_check_bound2 = runtime.caml_check_bound, caml_get_exception_raw_backtra = runtime.caml_get_exception_raw_backtrace, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_obj_tag2 = runtime.caml_obj_tag, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call6(f, a0, a1, a2, a3, a4, a5) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 6 ? f(a0, a1, a2, a3, a4, a5) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4, a5]);
      }
      function caml_call8(f, a0, a1, a2, a3, a4, a5, a6, a7) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 8 ? f(a0, a1, a2, a3, a4, a5, a6, a7) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4, a5, a6, a7]);
      }
      var global_data = runtime.caml_get_global_data(), cst$0 = cst$4, cst$3 = cst$4, partial = [4, 0, 0, 0, [12, 45, [4, 0, 0, 0, 0]]], cst$1 = cst$4, cst$2 = cst$4, cst = "_", locfmt = [
        0,
        [
          11,
          'File "',
          [
            2,
            0,
            [
              11,
              '", line ',
              [
                4,
                0,
                0,
                0,
                [
                  11,
                  cst_characters,
                  [4, 0, 0, 0, [12, 45, [4, 0, 0, 0, [11, ": ", [2, 0, 0]]]]]
                ]
              ]
            ]
          ]
        ],
        'File "%s", line %d, characters %d-%d: %s'
      ], Stdlib_Printf = global_data.Stdlib__Printf, Stdlib_Atomic = global_data.Stdlib__Atomic, Stdlib = global_data.Stdlib, Stdlib_Buffer = global_data.Stdlib__Buffer, Stdlib_Obj = global_data.Stdlib__Obj, printers = caml_call1(Stdlib_Atomic[1], 0), _a_ = [0, [3, 0, 0], "%S"], _b_ = [0, [4, 0, 0, 0, 0], "%d"], _c_ = [0, [11, ", ", [2, 0, [2, 0, 0]]], ", %s%s"], _d_ = [0, [12, 40, [2, 0, [2, 0, [12, 41, 0]]]], "(%s%s)"], _e_ = [0, [12, 40, [2, 0, [12, 41, 0]]], "(%s)"], cst_Out_of_memory2 = "Out of memory", cst_Stack_overflow2 = "Stack overflow", cst_Pattern_matching_failed = "Pattern matching failed", cst_Assertion_failed = "Assertion failed", cst_Undefined_recursive_module2 = "Undefined recursive module", _f_ = [
        0,
        [11, cst_Uncaught_exception, [2, 0, [12, 10, 0]]],
        cst_Uncaught_exception_s
      ], _g_ = [
        0,
        [11, cst_Uncaught_exception, [2, 0, [12, 10, 0]]],
        cst_Uncaught_exception_s
      ], cst_Raised_at = "Raised at", cst_Re_raised_at = "Re-raised at", cst_Raised_by_primitive_operat = "Raised by primitive operation at", cst_Called_from = "Called from", _h_ = [0, [12, 32, [4, 0, 0, 0, 0]], " %d"], cst_inlined = " (inlined)", _i_ = [
        0,
        [
          2,
          0,
          [
            12,
            32,
            [
              2,
              0,
              [
                11,
                ' in file "',
                [
                  2,
                  0,
                  [
                    12,
                    34,
                    [2, 0, [11, ", line", [2, 0, [11, cst_characters, partial]]]]
                  ]
                ]
              ]
            ]
          ]
        ],
        '%s %s in file "%s"%s, line%s, characters %d-%d'
      ], _j_ = [0, [11, "s ", [4, 0, 0, 0, [12, 45, [4, 0, 0, 0, 0]]]], "s %d-%d"], _k_ = [0, [2, 0, [11, " unknown location", 0]], "%s unknown location"], _l_ = [0, [2, 0, [12, 10, 0]], cst_s], _m_ = [
        0,
        [11, cst_Program_not_linked_with_g_$0, 0],
        cst_Program_not_linked_with_g_$0
      ], _n_ = [0, [2, 0, [12, 10, 0]], cst_s], cst_Program_not_linked_with_g_ = cst_Program_not_linked_with_g_$0;
      function field(x2, i) {
        var f = x2[1 + i];
        if (!caml_call1(Stdlib_Obj[1], f))
          return caml_call2(Stdlib_Printf[4], _b_, f);
        var _ah_ = Stdlib_Obj[15];
        if (caml_obj_tag2(f) === _ah_) return caml_call2(Stdlib_Printf[4], _a_, f);
        var _ai_ = Stdlib_Obj[16];
        return caml_obj_tag2(f) === _ai_ ? caml_call1(Stdlib[35], f) : cst;
      }
      function other_fields(x2, i) {
        if (x2.length - 1 <= i) return cst$0;
        var _af_ = other_fields(x2, i + 1 | 0), _ag_ = field(x2, i);
        return caml_call3(Stdlib_Printf[4], _c_, _ag_, _af_);
      }
      function use_printers(x2) {
        var param = caml_call1(Stdlib_Atomic[3], printers);
        for (; ; ) {
          if (!param) return 0;
          var tl = param[2], hd = param[1];
          a: {
            try {
              var val = caml_call1(hd, x2);
            } catch (_ae_) {
              break a;
            }
            if (val) {
              var s2 = val[1];
              return [0, s2];
            }
          }
          param = tl;
        }
      }
      function string_of_extension_constructo(t) {
        if (0 === caml_obj_tag2(t)) {
          var constructor = t[1][1], match = t.length - 1;
          if (2 < match >>> 0)
            var _aa_ = other_fields(t, 2), _ab_ = field(t, 1), _ad_ = caml_call3(Stdlib_Printf[4], _d_, _ab_, _aa_);
          else
            switch (match) {
              case 0:
                var _ad_ = cst$1;
                break;
              case 1:
                var _ad_ = cst$2;
                break;
              default:
                var _ac_ = field(t, 1), _ad_ = caml_call2(Stdlib_Printf[4], _e_, _ac_);
            }
          var match$0 = [0, constructor, [0, _ad_]];
        } else
          var match$0 = [0, t[1], 0];
        var fields_opt = match$0[2], constructor$0 = match$0[1];
        if (!fields_opt) return constructor$0;
        var f = fields_opt[1];
        return caml_call2(Stdlib[28], constructor$0, f);
      }
      function to_string_default(x2) {
        if (x2 === Stdlib[9]) return cst_Out_of_memory2;
        if (x2 === Stdlib[10]) return cst_Stack_overflow2;
        if (x2[1] === Stdlib[4]) {
          var match = x2[2], char$0 = match[3], line = match[2], file = match[1];
          return caml_call6(
            Stdlib_Printf[4],
            locfmt,
            file,
            line,
            char$0,
            char$0 + 5 | 0,
            cst_Pattern_matching_failed
          );
        }
        if (x2[1] === Stdlib[5]) {
          var match$0 = x2[2], char$1 = match$0[3], line$0 = match$0[2], file$0 = match$0[1];
          return caml_call6(
            Stdlib_Printf[4],
            locfmt,
            file$0,
            line$0,
            char$1,
            char$1 + 6 | 0,
            cst_Assertion_failed
          );
        }
        if (x2[1] !== Stdlib[15]) return string_of_extension_constructo(x2);
        var match$1 = x2[2], char$2 = match$1[3], line$1 = match$1[2], file$1 = match$1[1];
        return caml_call6(
          Stdlib_Printf[4],
          locfmt,
          file$1,
          line$1,
          char$2,
          char$2 + 6 | 0,
          cst_Undefined_recursive_module2
        );
      }
      function to_string(e) {
        var match = use_printers(e);
        if (!match) return to_string_default(e);
        var s2 = match[1];
        return s2;
      }
      function print(fct, arg) {
        try {
          var _$_ = caml_call1(fct, arg);
          return _$_;
        } catch (x$0) {
          var x2 = caml_wrap_exception2(x$0), ___ = to_string(x2);
          caml_call2(Stdlib_Printf[3], _f_, ___);
          caml_call1(Stdlib[63], Stdlib[40]);
          throw caml_maybe_attach_backtrace2(x2, 0);
        }
      }
      function catch$0(fct, arg) {
        try {
          var _Z_ = caml_call1(fct, arg);
          return _Z_;
        } catch (x$0) {
          var x2 = caml_wrap_exception2(x$0);
          caml_call1(Stdlib[63], Stdlib[39]);
          var _Y_ = to_string(x2);
          caml_call2(Stdlib_Printf[3], _g_, _Y_);
          return caml_call1(Stdlib[99], 2);
        }
      }
      function raw_backtrace_entries(bt) {
        return bt;
      }
      function convert_raw_backtrace(bt) {
        return [0, runtime.caml_convert_raw_backtrace(bt)];
      }
      function format_backtrace_slot(pos, slot) {
        function info(is_raise) {
          return is_raise ? 0 === pos ? cst_Raised_at : cst_Re_raised_at : 0 === pos ? cst_Raised_by_primitive_operat : cst_Called_from;
        }
        if (0 === slot[0]) {
          var lines = slot[3] === slot[6] ? caml_call2(Stdlib_Printf[4], _h_, slot[3]) : caml_call3(Stdlib_Printf[4], _j_, slot[3], slot[6]), _R_ = slot[7], _S_ = slot[4], _T_2 = slot[8] ? cst_inlined : cst$3, _U_ = slot[2], _V_ = slot[9], _W_ = info(slot[1]);
          return [
            0,
            caml_call8(Stdlib_Printf[4], _i_, _W_, _V_, _U_, _T_2, lines, _S_, _R_)
          ];
        }
        if (slot[1]) return 0;
        var _X_ = info(0);
        return [0, caml_call2(Stdlib_Printf[4], _k_, _X_)];
      }
      function print_raw_backtrace(outchan, raw_backtrace) {
        var backtrace = convert_raw_backtrace(raw_backtrace);
        if (!backtrace) return caml_call2(Stdlib_Printf[1], outchan, _m_);
        var a = backtrace[1], _P_ = a.length - 2 | 0, _O_ = 0;
        if (_P_ >= 0) {
          var i = _O_;
          for (; ; ) {
            var match = format_backtrace_slot(i, caml_check_bound2(a, i)[1 + i]);
            if (match) {
              var str = match[1];
              caml_call3(Stdlib_Printf[1], outchan, _l_, str);
            }
            var _Q_ = i + 1 | 0;
            if (_P_ === i) break;
            i = _Q_;
          }
        }
        return 0;
      }
      function print_backtrace(outchan) {
        return print_raw_backtrace(outchan, caml_get_exception_raw_backtra(0));
      }
      function raw_backtrace_to_string(raw_backtrace) {
        var backtrace = convert_raw_backtrace(raw_backtrace);
        if (!backtrace) return cst_Program_not_linked_with_g_;
        var a = backtrace[1], b = caml_call1(Stdlib_Buffer[1], 1024), _M_ = a.length - 2 | 0, _L_ = 0;
        if (_M_ >= 0) {
          var i = _L_;
          for (; ; ) {
            var match = format_backtrace_slot(i, caml_check_bound2(a, i)[1 + i]);
            if (match) {
              var str = match[1];
              caml_call3(Stdlib_Printf[5], b, _n_, str);
            }
            var _N_ = i + 1 | 0;
            if (_M_ === i) break;
            i = _N_;
          }
        }
        return caml_call1(Stdlib_Buffer[2], b);
      }
      function backtrace_slot_is_raise(param) {
        return 0 === param[0] ? param[1] : param[1];
      }
      function backtrace_slot_is_inline(param) {
        return 0 === param[0] ? param[8] : 0;
      }
      function backtrace_slot_location(param) {
        return 0 === param[0] ? [
          0,
          [0, param[2], param[3], param[4], param[5], param[6], param[7]]
        ] : 0;
      }
      function backtrace_slot_defname(param) {
        if (0 === param[0] && param[9] !== cst$4) return [0, param[9]];
        return 0;
      }
      function backtrace_slots(raw_backtrace) {
        var match = convert_raw_backtrace(raw_backtrace);
        if (!match) return 0;
        var backtrace = match[1], i$1 = backtrace.length - 2 | 0, i = i$1;
        for (; ; ) {
          if (-1 === i)
            var _K_ = 0;
          else {
            var _J_ = 0 === caml_check_bound2(backtrace, i)[1 + i][0] ? 1 : 0;
            if (!_J_) {
              var i$0 = i - 1 | 0;
              i = i$0;
              continue;
            }
            var _K_ = _J_;
          }
          return _K_ ? [0, backtrace] : 0;
        }
      }
      function backtrace_slots_of_raw_entry(entry) {
        return backtrace_slots([0, entry]);
      }
      function raw_backtrace_length(bt) {
        return bt.length - 1;
      }
      function get_backtrace(param) {
        return raw_backtrace_to_string(caml_get_exception_raw_backtra(0));
      }
      function register_printer(fn) {
        for (; ; ) {
          var old_printers = caml_call1(Stdlib_Atomic[3], printers), new_printers = [0, fn, old_printers], success = caml_call3(Stdlib_Atomic[6], printers, old_printers, new_printers), _I_ = 1 - success;
          if (!_I_) return _I_;
        }
      }
      function exn_slot(x2) {
        return 0 === caml_obj_tag2(x2) ? x2[1] : x2;
      }
      function exn_slot_id(x2) {
        var slot = exn_slot(x2);
        return slot[2];
      }
      function exn_slot_name(x2) {
        var slot = exn_slot(x2);
        return slot[1];
      }
      var errors = [
        0,
        cst$4,
        "(Cannot print locations:\n bytecode executable program file not found)",
        "(Cannot print locations:\n bytecode executable program file appears to be corrupt)",
        "(Cannot print locations:\n bytecode executable program file has wrong magic number)",
        "(Cannot print locations:\n bytecode executable program file cannot be opened;\n -- too many open files. Try running with OCAMLRUNPARAM=b=2)"
      ].slice(), _o_ = [
        0,
        [11, cst_Fatal_error_exception, [2, 0, [12, 10, 0]]],
        cst_Fatal_error_exception_s
      ];
      function default_uncaught_exception_han(exn, raw_backtrace) {
        var _F_ = to_string(exn);
        caml_call2(Stdlib_Printf[3], _o_, _F_);
        print_raw_backtrace(Stdlib[40], raw_backtrace);
        var status = runtime.caml_ml_debug_info_status(0);
        if (status < 0) {
          var _G_ = caml_call1(Stdlib[18], status), _H_ = caml_check_bound2(errors, _G_)[1 + _G_];
          caml_call1(Stdlib[53], _H_);
        }
        return caml_call1(Stdlib[63], Stdlib[40]);
      }
      var uncaught_exception_handler = [0, default_uncaught_exception_han];
      function set_uncaught_exception_handler(fn) {
        uncaught_exception_handler[1] = fn;
        return 0;
      }
      var empty_backtrace = [0], cst_Fatal_error_out_of_memory_ = "Fatal error: out of memory in uncaught exception handler", _p_ = [
        0,
        [11, cst_Fatal_error_exception, [2, 0, [12, 10, 0]]],
        cst_Fatal_error_exception_s
      ], _q_ = [
        0,
        [
          11,
          "Fatal error in uncaught exception handler: exception ",
          [2, 0, [12, 10, 0]]
        ],
        "Fatal error in uncaught exception handler: exception %s\n"
      ];
      function handle_uncaught_exception(exn$0, debugger_in_use) {
        try {
          try {
            var raw_backtrace = debugger_in_use ? empty_backtrace : caml_get_exception_raw_backtra(0);
            try {
              caml_call1(Stdlib[103], 0);
            } catch (_E_) {
            }
            try {
              var _A_ = caml_call2(uncaught_exception_handler[1], exn$0, raw_backtrace), _z_ = _A_;
            } catch (exn$1) {
              var exn = caml_wrap_exception2(exn$1), raw_backtrace$0 = caml_get_exception_raw_backtra(0), _x_ = to_string(exn$0);
              caml_call2(Stdlib_Printf[3], _p_, _x_);
              print_raw_backtrace(Stdlib[40], raw_backtrace);
              var _y_ = to_string(exn);
              caml_call2(Stdlib_Printf[3], _q_, _y_);
              print_raw_backtrace(Stdlib[40], raw_backtrace$0);
              var _z_ = caml_call1(Stdlib[63], Stdlib[40]);
            }
            var _B_ = _z_;
          } catch (_D_) {
            var _w_ = caml_wrap_exception2(_D_);
            if (_w_ !== Stdlib[9]) throw caml_maybe_attach_backtrace2(_w_, 0);
            var _B_ = caml_call1(Stdlib[53], cst_Fatal_error_out_of_memory_);
          }
          return _B_;
        } catch (_C_) {
          return 0;
        }
      }
      runtime.caml_register_named_value("Printexc.handle_uncaught_exception", handle_uncaught_exception);
      var Stdlib_Printexc = [
        0,
        to_string,
        to_string_default,
        print,
        catch$0,
        print_backtrace,
        get_backtrace,
        runtime.caml_record_backtrace,
        runtime.caml_backtrace_status,
        register_printer,
        use_printers,
        raw_backtrace_entries,
        function(_v_) {
          return caml_get_exception_raw_backtra(_v_);
        },
        print_raw_backtrace,
        raw_backtrace_to_string,
        default_uncaught_exception_han,
        set_uncaught_exception_handler,
        backtrace_slots,
        backtrace_slots_of_raw_entry,
        [
          0,
          backtrace_slot_is_raise,
          backtrace_slot_is_inline,
          backtrace_slot_location,
          backtrace_slot_defname,
          format_backtrace_slot
        ],
        raw_backtrace_length,
        function(_u_, _t_) {
          return runtime.caml_raw_backtrace_slot(_u_, _t_);
        },
        function(_s_) {
          return runtime.caml_convert_raw_backtrace_slot(_s_);
        },
        function(_r_) {
          return runtime.caml_raw_backtrace_next_slot(_r_);
        },
        exn_slot_id,
        exn_slot_name,
        string_of_extension_constructo
      ];
      runtime.caml_register_global(43, Stdlib_Printexc, "Stdlib__Printexc");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst$16 = "", cst$15 = ">", caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_ml_string_length2 = runtime.caml_ml_string_length;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call4(f, a0, a1, a2, a3) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 4 ? f(a0, a1, a2, a3) : runtime.caml_call_gen(f, [a0, a1, a2, a3]);
      }
      var dummy = 0, global_data = runtime.caml_get_global_data(), cst$14 = ".", cst$11 = cst$15, cst$12 = "</", cst$13 = cst$16, cst$8 = cst$15, cst$9 = "<", cst$10 = cst$16, cst$7 = "\n", cst$3 = cst$16, cst$4 = cst$16, cst$5 = cst$16, cst$6 = cst$16, cst = cst$16, cst$0 = cst$16, cst$1 = cst$16, cst$2 = cst$16, _a_ = [0, cst$16, 0, cst$16], Stdlib_Queue = global_data.Stdlib__Queue, CamlinternalFormat = global_data.CamlinternalFormat, Stdlib = global_data.Stdlib, Stdlib_String = global_data.Stdlib__String, Stdlib_Domain = global_data.Stdlib__Domain, Stdlib_Buffer = global_data.Stdlib__Buffer, Stdlib_Seq = global_data.Stdlib__Seq, Stdlib_Array = global_data.Stdlib__Array, Stdlib_List = global_data.Stdlib__List, Stdlib_Stack = global_data.Stdlib__Stack, Stdlib_Int = global_data.Stdlib__Int, Stdlib_Bytes = global_data.Stdlib__Bytes;
      function id(x2) {
        return x2;
      }
      var zero = 0, unknown = -1, String_tag = [248, "Stdlib.Format.String_tag", runtime.caml_fresh_oo_id(0)];
      function pp_enqueue(state, token) {
        state[13] = state[13] + token[3] | 0;
        return caml_call2(Stdlib_Queue[3], token, state[28]);
      }
      var pp_infinity = 1000000010, _b_ = [0, cst$16], _c_ = [1, "margin <= max_indent"], _d_ = [1, "margin >= pp_infinity"], _e_ = [0, 0], _f_ = [1, "max_indent < 2"], cst_Format_pp_set_geometry = "Format.pp_set_geometry: ";
      function pp_output_string(state, s2) {
        return caml_call3(state[17], s2, 0, caml_ml_string_length2(s2));
      }
      function pp_output_newline(state) {
        return caml_call1(state[19], 0);
      }
      function format_pp_text(state, size, text) {
        state[9] = state[9] - size | 0;
        pp_output_string(state, text);
        state[11] = 0;
      }
      function format_string(state, s2) {
        var _a$_ = s2 !== cst$16 ? 1 : 0;
        return _a$_ ? format_pp_text(state, caml_ml_string_length2(s2), s2) : _a$_;
      }
      function break_new_line(state, param, width) {
        var after = param[3], offset = param[2], before = param[1];
        format_string(state, before);
        pp_output_newline(state);
        state[11] = 1;
        var indent = (state[6] - width | 0) + offset | 0, real_indent = caml_call2(Stdlib_Int[10], state[8], indent);
        state[10] = real_indent;
        state[9] = state[6] - state[10] | 0;
        var n = state[10];
        caml_call1(state[21], n);
        return format_string(state, after);
      }
      function break_same_line(state, param) {
        var after = param[3], width = param[2], before = param[1];
        format_string(state, before);
        state[9] = state[9] - width | 0;
        caml_call1(state[20], width);
        return format_string(state, after);
      }
      function format_pp_token(state, size$0, param) {
        if (typeof param === "number")
          switch (param) {
            case 0:
              var match$3 = caml_call1(Stdlib_Stack[8], state[3]);
              if (!match$3) return;
              var tabs = match$3[1][1], add_tab = function(n2, ls) {
                if (!ls) return [0, n2, 0];
                var l = ls[2], x2 = ls[1];
                return runtime.caml_lessthan(n2, x2) ? [0, n2, ls] : [0, x2, add_tab(n2, l)];
              };
              tabs[1] = add_tab(state[6] - state[9] | 0, tabs[1]);
              return;
            case 1:
              caml_call1(Stdlib_Stack[5], state[2]);
              return;
            case 2:
              caml_call1(Stdlib_Stack[5], state[3]);
              return;
            case 3:
              var match$4 = caml_call1(Stdlib_Stack[8], state[2]);
              if (!match$4) return pp_output_newline(state);
              var width$0 = match$4[1][2];
              return break_new_line(state, _a_, width$0);
            case 4:
              var _a9_ = state[10] !== (state[6] - state[9] | 0) ? 1 : 0;
              if (!_a9_) return _a9_;
              var match$1 = caml_call1(Stdlib_Queue[6], state[28]);
              if (!match$1) return;
              var match$2 = match$1[1], size = match$2[1], length = match$2[3];
              state[12] = state[12] - length | 0;
              state[9] = state[9] + size | 0;
              return;
            default:
              var match$5 = caml_call1(Stdlib_Stack[5], state[5]);
              if (!match$5) return;
              var tag_name = match$5[1], marker = caml_call1(state[25], tag_name);
              return pp_output_string(state, marker);
          }
        switch (param[0]) {
          case 0:
            var s2 = param[1];
            return format_pp_text(state, size$0, s2);
          case 1:
            var len = param[3], pos = param[2], source = param[1];
            state[9] = state[9] - size$0 | 0;
            caml_call3(state[17], source, pos, len);
            state[11] = 0;
            return;
          case 2:
            var breaks = param[2], fits = param[1], off = breaks[2], before = breaks[1], match$6 = caml_call1(Stdlib_Stack[8], state[2]);
            if (!match$6) return;
            var match$7 = match$6[1], width$1 = match$7[2], box_type$0 = match$7[1];
            switch (box_type$0) {
              case 0:
                return break_same_line(state, fits);
              case 1:
                return break_new_line(state, breaks, width$1);
              case 2:
                return break_new_line(state, breaks, width$1);
              case 3:
                return state[9] < (size$0 + caml_ml_string_length2(before) | 0) ? break_new_line(state, breaks, width$1) : break_same_line(state, fits);
              case 4:
                return state[11] ? break_same_line(state, fits) : state[9] < (size$0 + caml_ml_string_length2(before) | 0) ? break_new_line(state, breaks, width$1) : ((state[6] - width$1 | 0) + off | 0) < state[10] ? break_new_line(state, breaks, width$1) : break_same_line(state, fits);
              default:
                return break_same_line(state, fits);
            }
          case 3:
            var off$0 = param[2], n = param[1], insertion_point = state[6] - state[9] | 0, match$8 = caml_call1(Stdlib_Stack[8], state[3]);
            if (!match$8) return;
            var tabs$0 = match$8[1][1], match$9 = tabs$0[1];
            if (match$9) {
              var first = match$9[1], param$0 = tabs$0[1];
              for (; ; ) {
                if (param$0) {
                  var tail = param$0[2], head = param$0[1];
                  if (insertion_point > head) {
                    param$0 = tail;
                    continue;
                  }
                  var _a__ = head;
                } else
                  var _a__ = first;
                var tab = _a__;
                break;
              }
            } else
              var tab = insertion_point;
            var offset = tab - insertion_point | 0;
            return 0 <= offset ? break_same_line(state, [0, cst$0, offset + n | 0, cst]) : break_new_line(state, [0, cst$2, tab + off$0 | 0, cst$1], state[6]);
          case 4:
            var ty = param[2], off$1 = param[1], insertion_point$0 = state[6] - state[9] | 0;
            if (state[8] < insertion_point$0) {
              var match = caml_call1(Stdlib_Stack[8], state[2]);
              if (match) {
                var match$0 = match[1], width = match$0[2], box_type = match$0[1];
                if (state[9] < width && 3 >= box_type - 1 >>> 0)
                  break_new_line(state, _a_, width);
              } else
                pp_output_newline(state);
            }
            var width$2 = state[9] - off$1 | 0, box_type$1 = 1 === ty ? 1 : state[9] < size$0 ? ty : 5;
            return caml_call2(Stdlib_Stack[3], [0, box_type$1, width$2], state[2]);
          case 5:
            var tbox = param[1];
            return caml_call2(Stdlib_Stack[3], tbox, state[3]);
          default:
            var tag_name$0 = param[1], marker$0 = caml_call1(state[24], tag_name$0);
            pp_output_string(state, marker$0);
            return caml_call2(Stdlib_Stack[3], tag_name$0, state[5]);
        }
      }
      function advance_left(state) {
        for (; ; ) {
          var match = caml_call1(Stdlib_Queue[9], state[28]);
          if (!match) return 0;
          var match$0 = match[1], size = match$0[1], length = match$0[3], token = match$0[2], pending_count = state[13] - state[12] | 0, _a7_ = 0 <= size ? 1 : 0, _a8_ = _a7_ || (state[9] <= pending_count ? 1 : 0);
          if (!_a8_) return _a8_;
          caml_call1(Stdlib_Queue[5], state[28]);
          var size$0 = 0 <= size ? size : pp_infinity;
          format_pp_token(state, size$0, token);
          state[12] = length + state[12] | 0;
        }
      }
      function enqueue_advance(state, tok) {
        pp_enqueue(state, tok);
        return advance_left(state);
      }
      function enqueue_string_as(state, size, s2) {
        return enqueue_advance(state, [0, size, [0, s2], size]);
      }
      function initialize_scan_stack(stack) {
        caml_call1(Stdlib_Stack[9], stack);
        var queue_elem = [0, unknown, _b_, 0];
        return caml_call2(Stdlib_Stack[3], [0, -1, queue_elem], stack);
      }
      function set_size(state, ty) {
        var match = caml_call1(Stdlib_Stack[8], state[1]);
        if (!match) return;
        var match$0 = match[1], queue_elem = match$0[2], left_total = match$0[1], size = queue_elem[1];
        if (left_total < state[12]) return initialize_scan_stack(state[1]);
        var _a6_ = queue_elem[2];
        if (typeof _a6_ !== "number")
          switch (_a6_[0]) {
            case 4:
              if (1 - ty) {
                var x$0 = state[13] + size | 0;
                queue_elem[1] = x$0;
                caml_call1(Stdlib_Stack[5], state[1]);
              }
              return;
            case 2:
            case 3:
              if (ty) {
                var x2 = state[13] + size | 0;
                queue_elem[1] = x2;
                caml_call1(Stdlib_Stack[5], state[1]);
              }
              return;
          }
      }
      function scan_push(state, b, token) {
        pp_enqueue(state, token);
        if (b) set_size(state, 1);
        var elem = [0, state[13], token];
        return caml_call2(Stdlib_Stack[3], elem, state[1]);
      }
      function pp_open_box_gen(state, indent, br_ty) {
        state[14] = state[14] + 1 | 0;
        if (state[14] < state[15]) {
          var size = -state[13] | 0, elem = [0, size, [4, indent, br_ty], 0];
          return scan_push(state, 0, elem);
        }
        var _a5_ = state[14] === state[15] ? 1 : 0;
        if (!_a5_) return _a5_;
        var s2 = state[16], x2 = caml_ml_string_length2(s2);
        return enqueue_string_as(state, x2, s2);
      }
      function pp_close_box(state, param) {
        var _a3_ = 1 < state[14] ? 1 : 0;
        if (_a3_) {
          if (state[14] < state[15]) {
            pp_enqueue(state, [0, zero, 1, 0]);
            set_size(state, 1);
            set_size(state, 0);
          }
          state[14] = state[14] - 1 | 0;
          var _a4_ = 0;
        } else
          var _a4_ = _a3_;
        return _a4_;
      }
      function pp_open_stag(state, tag_name) {
        if (state[22]) {
          caml_call2(Stdlib_Stack[3], tag_name, state[4]);
          caml_call1(state[26], tag_name);
        }
        var _a2_ = state[23];
        if (!_a2_) return _a2_;
        var token = [6, tag_name];
        return pp_enqueue(state, [0, zero, token, 0]);
      }
      function pp_close_stag(state, param) {
        if (state[23]) pp_enqueue(state, [0, zero, 5, 0]);
        var _a0_ = state[22];
        if (_a0_) {
          var match = caml_call1(Stdlib_Stack[5], state[4]);
          if (match) {
            var tag_name = match[1];
            return caml_call1(state[27], tag_name);
          }
          var _a1_ = 0;
        } else
          var _a1_ = _a0_;
        return _a1_;
      }
      function pp_set_print_tags(state, b) {
        state[22] = b;
        return 0;
      }
      function pp_set_mark_tags(state, b) {
        state[23] = b;
        return 0;
      }
      function pp_get_print_tags(state, param) {
        return state[22];
      }
      function pp_get_mark_tags(state, param) {
        return state[23];
      }
      function pp_set_tags(state, b) {
        pp_set_print_tags(state, b);
        return pp_set_mark_tags(state, b);
      }
      function pp_get_formatter_stag_function(state, param) {
        return [0, state[24], state[25], state[26], state[27]];
      }
      function pp_set_formatter_stag_function(state, param) {
        var pct = param[4], pot = param[3], mct = param[2], mot = param[1];
        state[24] = mot;
        state[25] = mct;
        state[26] = pot;
        state[27] = pct;
        return 0;
      }
      function pp_rinit(state) {
        state[12] = 1;
        state[13] = 1;
        caml_call1(Stdlib_Queue[12], state[28]);
        initialize_scan_stack(state[1]);
        caml_call1(Stdlib_Stack[9], state[2]);
        caml_call1(Stdlib_Stack[9], state[3]);
        caml_call1(Stdlib_Stack[9], state[4]);
        caml_call1(Stdlib_Stack[9], state[5]);
        state[10] = 0;
        state[14] = 0;
        state[9] = state[6];
        return pp_open_box_gen(state, 0, 3);
      }
      function pp_flush_queue(state, end_with_newline) {
        caml_call2(
          Stdlib_Stack[13],
          function(param) {
            return pp_close_stag(state, 0);
          },
          state[4]
        );
        for (; ; ) {
          if (1 >= state[14]) {
            state[13] = pp_infinity;
            advance_left(state);
            if (end_with_newline) pp_output_newline(state);
            return pp_rinit(state);
          }
          pp_close_box(state, 0);
        }
      }
      function pp_print_as_size(state, size, s2) {
        var _aZ_ = state[14] < state[15] ? 1 : 0;
        return _aZ_ ? enqueue_string_as(state, size, s2) : _aZ_;
      }
      function pp_print_as(state, isize, s2) {
        return pp_print_as_size(state, isize, s2);
      }
      function pp_print_string(state, s2) {
        var isize = caml_ml_string_length2(s2);
        return pp_print_as_size(state, isize, s2);
      }
      function pp_print_substring_as(pos, len, state, size, source) {
        var _aY_ = state[14] < state[15] ? 1 : 0;
        if (!_aY_) return _aY_;
        var token = [1, source, pos, len];
        return enqueue_advance(state, [0, size, token, size]);
      }
      function pp_print_substring(pos, len, state, s2) {
        return pp_print_substring_as(pos, len, state, len, s2);
      }
      function pp_print_bytes(state, s2) {
        var s$0 = caml_call1(Stdlib_Bytes[6], s2), isize = runtime.caml_ml_bytes_length(s2);
        return pp_print_as_size(state, isize, s$0);
      }
      function pp_print_int(state, i) {
        return pp_print_string(state, caml_call1(Stdlib_Int[12], i));
      }
      function pp_print_float(state, f) {
        return pp_print_string(state, caml_call1(Stdlib[35], f));
      }
      function pp_print_bool(state, b) {
        return pp_print_string(state, caml_call1(Stdlib[30], b));
      }
      function pp_print_char(state, c) {
        var s2 = caml_call2(Stdlib_String[1], 1, c);
        return pp_print_as_size(state, 1, s2);
      }
      function pp_print_nothing(state, param) {
        return 0;
      }
      function pp_open_hbox(state, param) {
        return pp_open_box_gen(state, 0, 0);
      }
      function pp_open_vbox(state, indent) {
        return pp_open_box_gen(state, indent, 1);
      }
      function pp_open_hvbox(state, indent) {
        return pp_open_box_gen(state, indent, 2);
      }
      function pp_open_hovbox(state, indent) {
        return pp_open_box_gen(state, indent, 3);
      }
      function pp_open_box(state, indent) {
        return pp_open_box_gen(state, indent, 4);
      }
      function pp_print_newline(state, param) {
        pp_flush_queue(state, 1);
        return caml_call1(state[18], 0);
      }
      function pp_print_flush(state, param) {
        pp_flush_queue(state, 0);
        return caml_call1(state[18], 0);
      }
      function pp_force_newline(state, param) {
        var _aX_ = state[14] < state[15] ? 1 : 0;
        return _aX_ ? enqueue_advance(state, [0, zero, 3, 0]) : _aX_;
      }
      function pp_print_if_newline(state, param) {
        var _aW_ = state[14] < state[15] ? 1 : 0;
        return _aW_ ? enqueue_advance(state, [0, zero, 4, 0]) : _aW_;
      }
      function pp_print_custom_break(state, fits, breaks) {
        var after = fits[3], width = fits[2], before = fits[1], _aV_ = state[14] < state[15] ? 1 : 0;
        if (!_aV_) return _aV_;
        var size = -state[13] | 0, token = [2, fits, breaks], length = (caml_ml_string_length2(before) + width | 0) + caml_ml_string_length2(after) | 0, elem = [0, size, token, length];
        return scan_push(state, 1, elem);
      }
      function pp_print_break(state, width, offset) {
        return pp_print_custom_break(state, [0, cst$6, width, cst$5], [0, cst$4, offset, cst$3]);
      }
      function pp_print_space(state, param) {
        return pp_print_break(state, 1, 0);
      }
      function pp_print_cut(state, param) {
        return pp_print_break(state, 0, 0);
      }
      function pp_open_tbox(state, param) {
        state[14] = state[14] + 1 | 0;
        var _aU_ = state[14] < state[15] ? 1 : 0;
        if (!_aU_) return _aU_;
        var elem = [0, zero, [5, [0, [0, 0]]], 0];
        return enqueue_advance(state, elem);
      }
      function pp_close_tbox(state, param) {
        var _aR_ = 1 < state[14] ? 1 : 0;
        if (_aR_) {
          var _aS_ = state[14] < state[15] ? 1 : 0;
          if (_aS_) {
            var elem = [0, zero, 2, 0];
            enqueue_advance(state, elem);
            state[14] = state[14] - 1 | 0;
            var _aT_ = 0;
          } else
            var _aT_ = _aS_;
        } else
          var _aT_ = _aR_;
        return _aT_;
      }
      function pp_print_tbreak(state, width, offset) {
        var _aQ_ = state[14] < state[15] ? 1 : 0;
        if (!_aQ_) return _aQ_;
        var size = -state[13] | 0, elem = [0, size, [3, width, offset], width];
        return scan_push(state, 1, elem);
      }
      function pp_print_tab(state, param) {
        return pp_print_tbreak(state, 0, 0);
      }
      function pp_set_tab(state, param) {
        var _aP_ = state[14] < state[15] ? 1 : 0;
        if (!_aP_) return _aP_;
        var elem = [0, zero, 0, 0];
        return enqueue_advance(state, elem);
      }
      function pp_set_max_boxes(state, n) {
        var _aN_ = 1 < n ? 1 : 0, _aO_ = _aN_ ? (state[15] = n, 0) : _aN_;
        return _aO_;
      }
      function pp_get_max_boxes(state, param) {
        return state[15];
      }
      function pp_over_max_boxes(state, param) {
        return state[14] === state[15] ? 1 : 0;
      }
      function pp_set_ellipsis_text(state, s2) {
        state[16] = s2;
        return 0;
      }
      function pp_get_ellipsis_text(state, param) {
        return state[16];
      }
      function pp_limit(n) {
        return n < 1000000010 ? n : 1000000009;
      }
      function pp_set_max_indent(state, n$0) {
        var _aM_ = 1 < n$0 ? 1 : 0;
        if (!_aM_) return _aM_;
        var n$1 = state[6] - n$0 | 0, _aL_ = 1 <= n$1 ? 1 : 0;
        if (!_aL_) return _aL_;
        var n = pp_limit(n$1);
        state[7] = n;
        state[8] = state[6] - state[7] | 0;
        return pp_rinit(state);
      }
      function pp_get_max_indent(state, param) {
        return state[8];
      }
      function pp_set_margin(state, n) {
        var _aJ_ = 1 <= n ? 1 : 0;
        if (!_aJ_) return _aJ_;
        var n$0 = pp_limit(n);
        state[6] = n$0;
        if (state[8] <= state[6])
          var new_max_indent = state[8];
        else
          var _aK_ = caml_call2(Stdlib_Int[11], state[6] - state[7] | 0, state[6] / 2 | 0), new_max_indent = caml_call2(Stdlib_Int[11], _aK_, 1);
        return pp_set_max_indent(state, new_max_indent);
      }
      function validate_geometry(param) {
        var margin = param[2], max_indent = param[1];
        return 2 <= max_indent ? margin <= max_indent ? _c_ : 1000000010 <= margin ? _d_ : _e_ : _f_;
      }
      function check_geometry(geometry) {
        return 0 === validate_geometry(geometry)[0] ? 1 : 0;
      }
      function pp_get_margin(state, param) {
        return state[6];
      }
      function pp_set_full_geometry(state, param) {
        var margin = param[2], max_indent = param[1];
        pp_set_margin(state, margin);
        pp_set_max_indent(state, max_indent);
        return 0;
      }
      function pp_set_geometry(state, max_indent, margin) {
        var geometry = [0, max_indent, margin], match = validate_geometry(geometry);
        if (0 === match[0]) return pp_set_full_geometry(state, geometry);
        var msg = match[1], _aI_ = caml_call2(Stdlib[28], cst_Format_pp_set_geometry, msg);
        throw caml_maybe_attach_backtrace2([0, Stdlib[6], _aI_], 1);
      }
      function pp_safe_set_geometry(state, max_indent, margin) {
        var geometry = [0, max_indent, margin];
        return 0 === validate_geometry(geometry)[0] ? pp_set_full_geometry(state, geometry) : 0;
      }
      function pp_get_geometry(state, param) {
        return [0, state[8], state[6]];
      }
      function pp_update_geometry(state, update) {
        var geometry = pp_get_geometry(state, 0);
        return pp_set_full_geometry(state, caml_call1(update, geometry));
      }
      function pp_set_formatter_out_functions(state, param) {
        var j = param[5], i = param[4], h = param[3], g = param[2], f = param[1];
        state[17] = f;
        state[18] = g;
        state[19] = h;
        state[20] = i;
        state[21] = j;
        return 0;
      }
      function pp_get_formatter_out_functions(state, param) {
        return [0, state[17], state[18], state[19], state[20], state[21]];
      }
      function pp_set_formatter_output_functi(state, f, g) {
        state[17] = f;
        state[18] = g;
        return 0;
      }
      function pp_get_formatter_output_functi(state, param) {
        return [0, state[17], state[18]];
      }
      function display_newline(state, param) {
        return caml_call3(state[17], cst$7, 0, 1);
      }
      var blank_line = caml_call2(Stdlib_String[1], 80, 32), _g_ = [4, 0, 3];
      function display_blanks(state, n) {
        var n$0 = n;
        for (; ; ) {
          var _aH_ = 0 < n$0 ? 1 : 0;
          if (!_aH_) return _aH_;
          if (80 >= n$0) return caml_call3(state[17], blank_line, 0, n$0);
          caml_call3(state[17], blank_line, 0, 80);
          var n$1 = n$0 - 80 | 0;
          n$0 = n$1;
        }
      }
      function pp_set_formatter_out_channel(state, oc) {
        state[17] = caml_call1(Stdlib[69], oc);
        state[18] = function(param) {
          return caml_call1(Stdlib[63], oc);
        };
        state[19] = function(_aG_) {
          return display_newline(state, _aG_);
        };
        state[20] = function(_aF_) {
          return display_blanks(state, _aF_);
        };
        state[21] = function(_aE_) {
          return display_blanks(state, _aE_);
        };
        return 0;
      }
      function default_pp_mark_open_tag(param) {
        if (param[1] !== String_tag) return cst$10;
        var s2 = param[2], _aD_ = caml_call2(Stdlib[28], s2, cst$8);
        return caml_call2(Stdlib[28], cst$9, _aD_);
      }
      function default_pp_mark_close_tag(param) {
        if (param[1] !== String_tag) return cst$13;
        var s2 = param[2], _aC_ = caml_call2(Stdlib[28], s2, cst$11);
        return caml_call2(Stdlib[28], cst$12, _aC_);
      }
      function default_pp_print_open_tag(_aB_) {
        return 0;
      }
      function default_pp_print_close_tag(_aA_) {
        return 0;
      }
      function pp_make_formatter(f, g, h, i, j) {
        var pp_queue = caml_call1(Stdlib_Queue[2], 0), sys_tok = [0, unknown, _g_, 0];
        caml_call2(Stdlib_Queue[3], sys_tok, pp_queue);
        var scan_stack = caml_call1(Stdlib_Stack[2], 0);
        initialize_scan_stack(scan_stack);
        caml_call2(Stdlib_Stack[3], [0, 1, sys_tok], scan_stack);
        var pp_margin = 78, _aw_ = Stdlib[19], _ax_ = caml_call1(Stdlib_Stack[2], 0), _ay_ = caml_call1(Stdlib_Stack[2], 0), _az_ = caml_call1(Stdlib_Stack[2], 0);
        return [
          0,
          scan_stack,
          caml_call1(Stdlib_Stack[2], 0),
          _az_,
          _ay_,
          _ax_,
          pp_margin,
          10,
          68,
          pp_margin,
          0,
          1,
          1,
          1,
          1,
          _aw_,
          cst$14,
          f,
          g,
          h,
          i,
          j,
          0,
          0,
          default_pp_mark_open_tag,
          default_pp_mark_close_tag,
          default_pp_print_open_tag,
          default_pp_print_close_tag,
          pp_queue
        ];
      }
      function formatter_of_out_functions(out_funs) {
        return pp_make_formatter(out_funs[1], out_funs[2], out_funs[3], out_funs[4], out_funs[5]);
      }
      function make_formatter(output, flush) {
        var ppf = pp_make_formatter(
          output,
          flush,
          function(_av_) {
            return 0;
          },
          function(_au_) {
            return 0;
          },
          function(_at_) {
            return 0;
          }
        );
        ppf[19] = function(_as_) {
          return display_newline(ppf, _as_);
        };
        ppf[20] = function(_ar_) {
          return display_blanks(ppf, _ar_);
        };
        ppf[21] = function(_aq_) {
          return display_blanks(ppf, _aq_);
        };
        return ppf;
      }
      function formatter_of_out_channel(oc) {
        return make_formatter(
          caml_call1(Stdlib[69], oc),
          function(param) {
            return caml_call1(Stdlib[63], oc);
          }
        );
      }
      function formatter_of_buffer(b) {
        return make_formatter(caml_call1(Stdlib_Buffer[18], b), function(_ap_) {
          return 0;
        });
      }
      var pp_buffer_size = 512;
      function pp_make_buffer(param) {
        return caml_call1(Stdlib_Buffer[1], pp_buffer_size);
      }
      var stdbuf = pp_make_buffer(0), std_formatter = formatter_of_out_channel(Stdlib[39]), err_formatter = formatter_of_out_channel(Stdlib[40]), str_formatter = formatter_of_buffer(stdbuf), stdbuf_key = caml_call2(Stdlib_Domain[11][1], 0, pp_make_buffer);
      caml_call2(Stdlib_Domain[11][3], stdbuf_key, stdbuf);
      var str_formatter_key = caml_call2(
        Stdlib_Domain[11][1],
        0,
        function(param) {
          return formatter_of_buffer(caml_call1(Stdlib_Domain[11][2], stdbuf_key));
        }
      );
      caml_call2(Stdlib_Domain[11][3], str_formatter_key, str_formatter);
      function buffered_out_string(key, str, ofs, len) {
        var _ao_ = caml_call1(Stdlib_Domain[11][2], key);
        return caml_call4(Stdlib_Buffer[18], _ao_, str, ofs, len);
      }
      function buffered_out_flush(oc, key, param) {
        var buf = caml_call1(Stdlib_Domain[11][2], key), len = caml_call1(Stdlib_Buffer[7], buf), str = caml_call1(Stdlib_Buffer[2], buf);
        caml_call4(Stdlib[69], oc, str, 0, len);
        caml_call1(Stdlib[63], oc);
        return caml_call1(Stdlib_Buffer[8], buf);
      }
      var std_buf_key = caml_call2(
        Stdlib_Domain[11][1],
        0,
        function(param) {
          return caml_call1(Stdlib_Buffer[1], pp_buffer_size);
        }
      ), err_buf_key = caml_call2(
        Stdlib_Domain[11][1],
        0,
        function(param) {
          return caml_call1(Stdlib_Buffer[1], pp_buffer_size);
        }
      ), std_formatter_key = caml_call2(
        Stdlib_Domain[11][1],
        0,
        function(param) {
          var _ac_ = Stdlib[39], ppf = pp_make_formatter(
            function(_al_, _am_, _an_) {
              return buffered_out_string(std_buf_key, _al_, _am_, _an_);
            },
            function(_ak_) {
              return buffered_out_flush(_ac_, std_buf_key, _ak_);
            },
            function(_aj_) {
              return 0;
            },
            function(_ai_) {
              return 0;
            },
            function(_ah_) {
              return 0;
            }
          );
          ppf[19] = function(_ag_) {
            return display_newline(ppf, _ag_);
          };
          ppf[20] = function(_af_) {
            return display_blanks(ppf, _af_);
          };
          ppf[21] = function(_ae_) {
            return display_blanks(ppf, _ae_);
          };
          caml_call1(
            Stdlib_Domain[6],
            function(_ad_) {
              return pp_print_flush(ppf, _ad_);
            }
          );
          return ppf;
        }
      );
      caml_call2(Stdlib_Domain[11][3], std_formatter_key, std_formatter);
      var err_formatter_key = caml_call2(
        Stdlib_Domain[11][1],
        0,
        function(param) {
          var _S_ = Stdlib[40], ppf = pp_make_formatter(
            function(_$_, _aa_, _ab_) {
              return buffered_out_string(err_buf_key, _$_, _aa_, _ab_);
            },
            function(___) {
              return buffered_out_flush(_S_, err_buf_key, ___);
            },
            function(_Z_) {
              return 0;
            },
            function(_Y_) {
              return 0;
            },
            function(_X_) {
              return 0;
            }
          );
          ppf[19] = function(_W_) {
            return display_newline(ppf, _W_);
          };
          ppf[20] = function(_V_) {
            return display_blanks(ppf, _V_);
          };
          ppf[21] = function(_U_) {
            return display_blanks(ppf, _U_);
          };
          caml_call1(Stdlib_Domain[6], function(_T_2) {
            return pp_print_flush(ppf, _T_2);
          });
          return ppf;
        }
      );
      caml_call2(Stdlib_Domain[11][3], err_formatter_key, err_formatter);
      function get_std_formatter(param) {
        return caml_call1(Stdlib_Domain[11][2], std_formatter_key);
      }
      function get_err_formatter(param) {
        return caml_call1(Stdlib_Domain[11][2], err_formatter_key);
      }
      function get_str_formatter(param) {
        return caml_call1(Stdlib_Domain[11][2], str_formatter_key);
      }
      function get_stdbuf(param) {
        return caml_call1(Stdlib_Domain[11][2], stdbuf_key);
      }
      function flush_buffer_formatter(buf, ppf) {
        pp_flush_queue(ppf, 0);
        var s2 = caml_call1(Stdlib_Buffer[2], buf);
        caml_call1(Stdlib_Buffer[9], buf);
        return s2;
      }
      function flush_str_formatter(param) {
        var stdbuf2 = caml_call1(Stdlib_Domain[11][2], stdbuf_key), str_formatter2 = caml_call1(Stdlib_Domain[11][2], str_formatter_key);
        return flush_buffer_formatter(stdbuf2, str_formatter2);
      }
      function make_synchronized_formatter(output, flush) {
        return caml_call2(
          Stdlib_Domain[11][1],
          0,
          function(param) {
            var buf = caml_call1(Stdlib_Buffer[1], pp_buffer_size), output$0 = caml_call1(Stdlib_Buffer[18], buf);
            function flush$0(param2) {
              var _R_ = caml_call1(Stdlib_Buffer[7], buf);
              caml_call3(output, caml_call1(Stdlib_Buffer[2], buf), 0, _R_);
              caml_call1(Stdlib_Buffer[8], buf);
              return caml_call1(flush, 0);
            }
            return make_formatter(output$0, flush$0);
          }
        );
      }
      function synchronized_formatter_of_out_(oc) {
        return make_synchronized_formatter(
          caml_call1(Stdlib[69], oc),
          function(param) {
            return caml_call1(Stdlib[63], oc);
          }
        );
      }
      function make_symbolic_output_buffer(param) {
        return [0, 0];
      }
      function clear_symbolic_output_buffer(sob) {
        sob[1] = 0;
        return 0;
      }
      function get_symbolic_output_buffer(sob) {
        return caml_call1(Stdlib_List[10], sob[1]);
      }
      function flush_symbolic_output_buffer(sob) {
        var items = get_symbolic_output_buffer(sob);
        clear_symbolic_output_buffer(sob);
        return items;
      }
      function add_symbolic_output_item(sob, item) {
        sob[1] = [0, item, sob[1]];
        return 0;
      }
      function formatter_of_symbolic_output_b(sob) {
        function f(s2, i2, n) {
          return add_symbolic_output_item(sob, [0, caml_call3(Stdlib_String[16], s2, i2, n)]);
        }
        function g(_Q_) {
          return add_symbolic_output_item(sob, 0);
        }
        function h(_P_) {
          return add_symbolic_output_item(sob, 1);
        }
        function i(n) {
          return add_symbolic_output_item(sob, [1, n]);
        }
        function j(n) {
          return add_symbolic_output_item(sob, [2, n]);
        }
        return pp_make_formatter(f, g, h, i, j);
      }
      function open_hbox(v) {
        return pp_open_hbox(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function open_vbox(v) {
        return pp_open_vbox(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function open_hvbox(v) {
        return pp_open_hvbox(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function open_hovbox(v) {
        return pp_open_hovbox(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function open_box(v) {
        return pp_open_box(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function close_box(v) {
        return pp_close_box(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function open_stag(v) {
        return pp_open_stag(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function close_stag(v) {
        return pp_close_stag(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_as(isize, w) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return pp_print_as_size(state, isize, w);
      }
      function print_string(v) {
        return pp_print_string(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_substring(pos, len, v) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return pp_print_substring_as(pos, len, state, len, v);
      }
      function print_substring_as(pos, len, as_len, v) {
        return pp_print_substring_as(
          pos,
          len,
          caml_call1(Stdlib_Domain[11][2], std_formatter_key),
          as_len,
          v
        );
      }
      function print_bytes(v) {
        return pp_print_bytes(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_int(v) {
        return pp_print_int(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_float(v) {
        return pp_print_float(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_char(v) {
        return pp_print_char(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_bool(v) {
        return pp_print_bool(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_break(v, w) {
        return pp_print_break(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v, w);
      }
      function print_cut(v) {
        return pp_print_cut(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_space(v) {
        return pp_print_space(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function force_newline(v) {
        return pp_force_newline(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_flush(v) {
        return pp_print_flush(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_newline(v) {
        return pp_print_newline(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_if_newline(v) {
        return pp_print_if_newline(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function open_tbox(v) {
        return pp_open_tbox(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function close_tbox(v) {
        return pp_close_tbox(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_tbreak(v, w) {
        return pp_print_tbreak(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v, w);
      }
      function set_tab(v) {
        return pp_set_tab(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function print_tab(v) {
        return pp_print_tab(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function set_margin(v) {
        return pp_set_margin(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_margin(v) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return state[6];
      }
      function set_max_indent(v) {
        return pp_set_max_indent(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_max_indent(v) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return state[8];
      }
      function set_geometry(max_indent, margin) {
        return pp_set_geometry(
          caml_call1(Stdlib_Domain[11][2], std_formatter_key),
          max_indent,
          margin
        );
      }
      function safe_set_geometry(max_indent, margin) {
        return pp_safe_set_geometry(
          caml_call1(Stdlib_Domain[11][2], std_formatter_key),
          max_indent,
          margin
        );
      }
      function get_geometry(v) {
        return pp_get_geometry(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function update_geometry(v) {
        return pp_update_geometry(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function set_max_boxes(v) {
        return pp_set_max_boxes(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_max_boxes(v) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return state[15];
      }
      function over_max_boxes(v) {
        return pp_over_max_boxes(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function set_ellipsis_text(v) {
        return pp_set_ellipsis_text(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_ellipsis_text(v) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return state[16];
      }
      function set_formatter_out_channel(v) {
        return pp_set_formatter_out_channel(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function set_formatter_out_functions(v) {
        return pp_set_formatter_out_functions(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_formatter_out_functions(v) {
        return pp_get_formatter_out_functions(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function set_formatter_output_functions(v, w) {
        return pp_set_formatter_output_functi(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v, w);
      }
      function get_formatter_output_functions(v) {
        return pp_get_formatter_output_functi(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function set_formatter_stag_functions(v) {
        return pp_set_formatter_stag_function(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_formatter_stag_functions(v) {
        return pp_get_formatter_stag_function(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function set_print_tags(v) {
        return pp_set_print_tags(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_print_tags(v) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return state[22];
      }
      function set_mark_tags(v) {
        return pp_set_mark_tags(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function get_mark_tags(v) {
        var state = caml_call1(Stdlib_Domain[11][2], std_formatter_key);
        return state[23];
      }
      function set_tags(v) {
        return pp_set_tags(caml_call1(Stdlib_Domain[11][2], std_formatter_key), v);
      }
      function pp_print_iter(opt, iter, pp_v, ppf, v) {
        var pp_sep = opt ? opt[1] : pp_print_cut, is_first = [0, 1];
        function pp_v$0(v2) {
          if (is_first[1]) is_first[1] = 0;
          else caml_call2(pp_sep, ppf, 0);
          return caml_call2(pp_v, ppf, v2);
        }
        return caml_call2(iter, pp_v$0, v);
      }
      function pp_print_list(opt, pp_v, ppf, v) {
        var pp_sep = opt ? opt[1] : pp_print_cut;
        return pp_print_iter([0, pp_sep], Stdlib_List[18], pp_v, ppf, v);
      }
      function pp_print_array(opt, pp_v, ppf, v) {
        var pp_sep = opt ? opt[1] : pp_print_cut;
        return pp_print_iter([0, pp_sep], Stdlib_Array[12], pp_v, ppf, v);
      }
      function pp_print_seq(opt, pp_v, ppf, seq) {
        var pp_sep = opt ? opt[1] : pp_print_cut;
        return pp_print_iter([0, pp_sep], Stdlib_Seq[4], pp_v, ppf, seq);
      }
      function pp_print_text(state, s2) {
        var len = caml_ml_string_length2(s2), left = [0, 0], right = [0, 0];
        function flush(param) {
          var len2 = right[1] - left[1] | 0, pos = left[1];
          pp_print_substring_as(pos, len2, state, len2, s2);
          right[1]++;
          left[1] = right[1];
          return 0;
        }
        for (; ; ) {
          if (right[1] === len) {
            var _O_ = left[1] !== len ? 1 : 0;
            return _O_ ? flush(0) : _O_;
          }
          var match = runtime.caml_string_get(s2, right[1]);
          if (10 === match) {
            flush(0);
            pp_force_newline(state, 0);
          } else if (32 === match) {
            flush(0);
            pp_print_space(state, 0);
          } else
            right[1]++;
        }
      }
      function pp_print_option(opt, pp_v, ppf, param) {
        var none = opt ? opt[1] : function(_N_, param2) {
          return 0;
        };
        if (!param) return caml_call2(none, ppf, 0);
        var v = param[1];
        return caml_call2(pp_v, ppf, v);
      }
      function pp_print_result(ok, error, ppf, param) {
        if (0 === param[0]) {
          var v = param[1];
          return caml_call2(ok, ppf, v);
        }
        var e = param[1];
        return caml_call2(error, ppf, e);
      }
      function pp_print_either(left, right, ppf, param) {
        if (0 === param[0]) {
          var l = param[1];
          return caml_call2(left, ppf, l);
        }
        var r = param[1];
        return caml_call2(right, ppf, r);
      }
      function compute_tag(output, tag_acc) {
        var buf = caml_call1(Stdlib_Buffer[1], 16), ppf = formatter_of_buffer(buf);
        caml_call2(output, ppf, tag_acc);
        pp_print_flush(ppf, 0);
        var len = caml_call1(Stdlib_Buffer[7], buf);
        return 2 <= len ? caml_call3(Stdlib_Buffer[4], buf, 1, len - 2 | 0) : caml_call1(Stdlib_Buffer[2], buf);
      }
      function output_formatting_lit(ppf, fmting_lit) {
        if (typeof fmting_lit === "number")
          switch (fmting_lit) {
            case 0:
              return pp_close_box(ppf, 0);
            case 1:
              return pp_close_stag(ppf, 0);
            case 2:
              return pp_print_flush(ppf, 0);
            case 3:
              return pp_force_newline(ppf, 0);
            case 4:
              return pp_print_newline(ppf, 0);
            case 5:
              return pp_print_char(ppf, 64);
            default:
              return pp_print_char(ppf, 37);
          }
        switch (fmting_lit[0]) {
          case 0:
            var offset = fmting_lit[3], width = fmting_lit[2];
            return pp_print_break(ppf, width, offset);
          case 1:
            return 0;
          default:
            var c = fmting_lit[1];
            pp_print_char(ppf, 64);
            return pp_print_char(ppf, c);
        }
      }
      function output_acc(ppf, acc) {
        if (typeof acc === "number") return 0;
        a: {
          b: {
            c: {
              switch (acc[0]) {
                case 0:
                  var f = acc[2], p = acc[1];
                  output_acc(ppf, p);
                  return output_formatting_lit(ppf, f);
                case 1:
                  var match = acc[2], p$0 = acc[1];
                  if (0 === match[0]) {
                    var acc$0 = match[1];
                    output_acc(ppf, p$0);
                    return pp_open_stag(ppf, [0, String_tag, compute_tag(output_acc, acc$0)]);
                  }
                  var acc$1 = match[1];
                  output_acc(ppf, p$0);
                  var _E_ = compute_tag(output_acc, acc$1), match$0 = caml_call1(CamlinternalFormat[20], _E_), bty = match$0[2], indent = match$0[1];
                  return pp_open_box_gen(ppf, indent, bty);
                case 2:
                  var _F_ = acc[1];
                  if (typeof _F_ !== "number" && 0 === _F_[0]) {
                    var _G_ = _F_[2];
                    if (typeof _G_ !== "number" && 1 === _G_[0]) {
                      var s$0 = acc[2], size = _G_[2], p$2 = _F_[1];
                      break b;
                    }
                  }
                  var s2 = acc[2], p$1 = _F_;
                  break a;
                case 3:
                  var _H_ = acc[1];
                  if (typeof _H_ !== "number" && 0 === _H_[0]) {
                    var _I_ = _H_[2];
                    if (typeof _I_ !== "number" && 1 === _I_[0]) {
                      var c$0 = acc[2], size$0 = _I_[2], p$4 = _H_[1];
                      break;
                    }
                  }
                  var c = acc[2], p$3 = _H_;
                  break c;
                case 4:
                  var _J_ = acc[1];
                  if (typeof _J_ !== "number" && 0 === _J_[0]) {
                    var _K_ = _J_[2];
                    if (typeof _K_ !== "number" && 1 === _K_[0]) {
                      var s$0 = acc[2], size = _K_[2], p$2 = _J_[1];
                      break b;
                    }
                  }
                  var s2 = acc[2], p$1 = _J_;
                  break a;
                case 5:
                  var _L_ = acc[1];
                  if (typeof _L_ !== "number" && 0 === _L_[0]) {
                    var _M_ = _L_[2];
                    if (typeof _M_ !== "number" && 1 === _M_[0]) {
                      var c$0 = acc[2], size$0 = _M_[2], p$4 = _L_[1];
                      break;
                    }
                  }
                  var c = acc[2], p$3 = _L_;
                  break c;
                case 6:
                  var f$0 = acc[2], p$5 = acc[1];
                  output_acc(ppf, p$5);
                  return caml_call1(f$0, ppf);
                case 7:
                  var p$6 = acc[1];
                  output_acc(ppf, p$6);
                  return pp_print_flush(ppf, 0);
                default:
                  var msg = acc[2], p$7 = acc[1];
                  output_acc(ppf, p$7);
                  return caml_call1(Stdlib[1], msg);
              }
              output_acc(ppf, p$4);
              return pp_print_as_size(ppf, size$0, caml_call2(Stdlib_String[1], 1, c$0));
            }
            output_acc(ppf, p$3);
            return pp_print_char(ppf, c);
          }
          output_acc(ppf, p$2);
          return pp_print_as_size(ppf, size, s$0);
        }
        output_acc(ppf, p$1);
        return pp_print_string(ppf, s2);
      }
      function strput_acc(ppf, acc) {
        if (typeof acc === "number") return 0;
        a: {
          b: {
            c: {
              switch (acc[0]) {
                case 0:
                  var f = acc[2], p = acc[1];
                  strput_acc(ppf, p);
                  return output_formatting_lit(ppf, f);
                case 1:
                  var match = acc[2], p$0 = acc[1];
                  if (0 === match[0]) {
                    var acc$0 = match[1];
                    strput_acc(ppf, p$0);
                    return pp_open_stag(ppf, [0, String_tag, compute_tag(strput_acc, acc$0)]);
                  }
                  var acc$1 = match[1];
                  strput_acc(ppf, p$0);
                  var _v_ = compute_tag(strput_acc, acc$1), match$0 = caml_call1(CamlinternalFormat[20], _v_), bty = match$0[2], indent = match$0[1];
                  return pp_open_box_gen(ppf, indent, bty);
                case 2:
                  var _w_ = acc[1];
                  if (typeof _w_ !== "number" && 0 === _w_[0]) {
                    var _x_ = _w_[2];
                    if (typeof _x_ !== "number" && 1 === _x_[0]) {
                      var s$0 = acc[2], size = _x_[2], p$2 = _w_[1];
                      break b;
                    }
                  }
                  var s2 = acc[2], p$1 = _w_;
                  break a;
                case 3:
                  var _y_ = acc[1];
                  if (typeof _y_ !== "number" && 0 === _y_[0]) {
                    var _z_ = _y_[2];
                    if (typeof _z_ !== "number" && 1 === _z_[0]) {
                      var c$0 = acc[2], size$0 = _z_[2], p$4 = _y_[1];
                      break;
                    }
                  }
                  var c = acc[2], p$3 = _y_;
                  break c;
                case 4:
                  var _A_ = acc[1];
                  if (typeof _A_ !== "number" && 0 === _A_[0]) {
                    var _B_ = _A_[2];
                    if (typeof _B_ !== "number" && 1 === _B_[0]) {
                      var s$0 = acc[2], size = _B_[2], p$2 = _A_[1];
                      break b;
                    }
                  }
                  var s2 = acc[2], p$1 = _A_;
                  break a;
                case 5:
                  var _C_ = acc[1];
                  if (typeof _C_ !== "number" && 0 === _C_[0]) {
                    var _D_ = _C_[2];
                    if (typeof _D_ !== "number" && 1 === _D_[0]) {
                      var c$0 = acc[2], size$0 = _D_[2], p$4 = _C_[1];
                      break;
                    }
                  }
                  var c = acc[2], p$3 = _C_;
                  break c;
                case 6:
                  var p$5 = acc[1];
                  if (typeof p$5 !== "number" && 0 === p$5[0]) {
                    var match$1 = p$5[2];
                    if (typeof match$1 !== "number" && 1 === match$1[0]) {
                      var f$1 = acc[2], size$1 = match$1[2], p$6 = p$5[1];
                      strput_acc(ppf, p$6);
                      return pp_print_as_size(ppf, size$1, caml_call1(f$1, 0));
                    }
                  }
                  var f$0 = acc[2];
                  strput_acc(ppf, p$5);
                  return pp_print_string(ppf, caml_call1(f$0, 0));
                case 7:
                  var p$7 = acc[1];
                  strput_acc(ppf, p$7);
                  return pp_print_flush(ppf, 0);
                default:
                  var msg = acc[2], p$8 = acc[1];
                  strput_acc(ppf, p$8);
                  return caml_call1(Stdlib[1], msg);
              }
              strput_acc(ppf, p$4);
              return pp_print_as_size(ppf, size$0, caml_call2(Stdlib_String[1], 1, c$0));
            }
            strput_acc(ppf, p$3);
            return pp_print_char(ppf, c);
          }
          strput_acc(ppf, p$2);
          return pp_print_as_size(ppf, size, s$0);
        }
        strput_acc(ppf, p$1);
        return pp_print_string(ppf, s2);
      }
      function kfprintf(k, ppf, param) {
        var fmt = param[1];
        return caml_call3(
          CamlinternalFormat[7],
          function(acc) {
            output_acc(ppf, acc);
            return caml_call1(k, ppf);
          },
          0,
          fmt
        );
      }
      function ikfprintf(k, ppf, param) {
        var fmt = param[1];
        return caml_call3(CamlinternalFormat[8], k, ppf, fmt);
      }
      function ifprintf(ppf, param) {
        var fmt = param[1];
        return caml_call3(CamlinternalFormat[8], function(_u_) {
          return 0;
        }, 0, fmt);
      }
      function fprintf(ppf) {
        function _r_(_t_) {
          return 0;
        }
        return function(_s_) {
          return kfprintf(_r_, ppf, _s_);
        };
      }
      function printf(param) {
        var fmt = param[1];
        return caml_call3(
          CamlinternalFormat[7],
          function(acc) {
            return output_acc(caml_call1(Stdlib_Domain[11][2], std_formatter_key), acc);
          },
          0,
          fmt
        );
      }
      function eprintf(param) {
        var fmt = param[1];
        return caml_call3(
          CamlinternalFormat[7],
          function(acc) {
            return output_acc(caml_call1(Stdlib_Domain[11][2], err_formatter_key), acc);
          },
          0,
          fmt
        );
      }
      function kdprintf(k, param) {
        var fmt = param[1];
        return caml_call3(
          CamlinternalFormat[7],
          function(acc) {
            return caml_call1(k, function(ppf) {
              return output_acc(ppf, acc);
            });
          },
          0,
          fmt
        );
      }
      function dprintf(fmt) {
        return kdprintf(function(i) {
          return i;
        }, fmt);
      }
      function ksprintf(k, param) {
        var fmt = param[1], b = pp_make_buffer(0), ppf = formatter_of_buffer(b);
        function k$0(acc) {
          strput_acc(ppf, acc);
          return caml_call1(k, flush_buffer_formatter(b, ppf));
        }
        return caml_call3(CamlinternalFormat[7], k$0, 0, fmt);
      }
      function sprintf(fmt) {
        return ksprintf(id, fmt);
      }
      function kasprintf(k, param) {
        var fmt = param[1], b = pp_make_buffer(0), ppf = formatter_of_buffer(b);
        function k$0(acc) {
          output_acc(ppf, acc);
          return caml_call1(k, flush_buffer_formatter(b, ppf));
        }
        return caml_call3(CamlinternalFormat[7], k$0, 0, fmt);
      }
      function asprintf(fmt) {
        return kasprintf(id, fmt);
      }
      function flush_standard_formatters(param) {
        pp_print_flush(caml_call1(Stdlib_Domain[11][2], std_formatter_key), 0);
        return pp_print_flush(caml_call1(Stdlib_Domain[11][2], err_formatter_key), 0);
      }
      caml_call1(Stdlib[100], flush_standard_formatters);
      caml_call1(
        Stdlib_Domain[5],
        function(param) {
          flush_standard_formatters(0);
          var fs = pp_get_formatter_out_functions(std_formatter, 0), _h_ = Stdlib[39];
          pp_set_formatter_out_functions(
            std_formatter,
            [
              0,
              function(_o_, _p_, _q_) {
                return buffered_out_string(std_buf_key, _o_, _p_, _q_);
              },
              function(_n_) {
                return buffered_out_flush(_h_, std_buf_key, _n_);
              },
              fs[3],
              fs[4],
              fs[5]
            ]
          );
          var fs$0 = pp_get_formatter_out_functions(err_formatter, 0), _i_ = Stdlib[40];
          return pp_set_formatter_out_functions(
            err_formatter,
            [
              0,
              function(_k_, _l_, _m_) {
                return buffered_out_string(err_buf_key, _k_, _l_, _m_);
              },
              function(_j_) {
                return buffered_out_flush(_i_, err_buf_key, _j_);
              },
              fs$0[3],
              fs$0[4],
              fs$0[5]
            ]
          );
        }
      );
      var Stdlib_Format = [
        0,
        pp_open_box,
        open_box,
        pp_close_box,
        close_box,
        pp_open_hbox,
        open_hbox,
        pp_open_vbox,
        open_vbox,
        pp_open_hvbox,
        open_hvbox,
        pp_open_hovbox,
        open_hovbox,
        pp_print_string,
        print_string,
        pp_print_substring,
        print_substring,
        pp_print_bytes,
        print_bytes,
        pp_print_as,
        print_as,
        pp_print_substring_as,
        print_substring_as,
        pp_print_int,
        print_int,
        pp_print_float,
        print_float,
        pp_print_char,
        print_char,
        pp_print_bool,
        print_bool,
        pp_print_nothing,
        pp_print_space,
        print_space,
        pp_print_cut,
        print_cut,
        pp_print_break,
        print_break,
        pp_print_custom_break,
        pp_force_newline,
        force_newline,
        pp_print_if_newline,
        print_if_newline,
        pp_print_flush,
        print_flush,
        pp_print_newline,
        print_newline,
        pp_infinity,
        pp_set_margin,
        set_margin,
        pp_get_margin,
        get_margin,
        pp_set_max_indent,
        set_max_indent,
        pp_get_max_indent,
        get_max_indent,
        check_geometry,
        pp_set_geometry,
        set_geometry,
        pp_safe_set_geometry,
        safe_set_geometry,
        pp_update_geometry,
        update_geometry,
        pp_get_geometry,
        get_geometry,
        pp_set_max_boxes,
        set_max_boxes,
        pp_get_max_boxes,
        get_max_boxes,
        pp_over_max_boxes,
        over_max_boxes,
        pp_open_tbox,
        open_tbox,
        pp_close_tbox,
        close_tbox,
        pp_set_tab,
        set_tab,
        pp_print_tab,
        print_tab,
        pp_print_tbreak,
        print_tbreak,
        pp_set_ellipsis_text,
        set_ellipsis_text,
        pp_get_ellipsis_text,
        get_ellipsis_text,
        String_tag,
        pp_open_stag,
        open_stag,
        pp_close_stag,
        close_stag,
        pp_set_tags,
        set_tags,
        pp_set_print_tags,
        set_print_tags,
        pp_set_mark_tags,
        set_mark_tags,
        pp_get_print_tags,
        get_print_tags,
        pp_get_mark_tags,
        get_mark_tags,
        pp_set_formatter_out_channel,
        set_formatter_out_channel,
        pp_set_formatter_output_functi,
        set_formatter_output_functions,
        pp_get_formatter_output_functi,
        get_formatter_output_functions,
        pp_set_formatter_out_functions,
        set_formatter_out_functions,
        pp_get_formatter_out_functions,
        get_formatter_out_functions,
        pp_set_formatter_stag_function,
        set_formatter_stag_functions,
        pp_get_formatter_stag_function,
        get_formatter_stag_functions,
        formatter_of_out_channel,
        synchronized_formatter_of_out_,
        std_formatter,
        get_std_formatter,
        err_formatter,
        get_err_formatter,
        formatter_of_buffer,
        stdbuf,
        get_stdbuf,
        str_formatter,
        get_str_formatter,
        flush_str_formatter,
        make_formatter,
        make_synchronized_formatter,
        formatter_of_out_functions,
        make_symbolic_output_buffer,
        clear_symbolic_output_buffer,
        get_symbolic_output_buffer,
        flush_symbolic_output_buffer,
        add_symbolic_output_item,
        formatter_of_symbolic_output_b,
        pp_print_iter,
        pp_print_list,
        pp_print_array,
        pp_print_seq,
        pp_print_text,
        pp_print_option,
        pp_print_result,
        pp_print_either,
        fprintf,
        printf,
        eprintf,
        sprintf,
        asprintf,
        dprintf,
        ifprintf,
        kfprintf,
        kdprintf,
        ikfprintf,
        ksprintf,
        kasprintf
      ];
      runtime.caml_register_global(38, Stdlib_Format, "Stdlib__Format");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_register_named_value2 = runtime.caml_register_named_value, global_data = runtime.caml_get_global_data(), Stdlib_Obj = global_data.Stdlib__Obj, register = caml_register_named_value2;
      function register_exception(name, exn) {
        var _a_ = Stdlib_Obj[10], slot = runtime.caml_obj_tag(exn) === _a_ ? exn : exn[1];
        return caml_register_named_value2(name, slot);
      }
      var Stdlib_Callback = [0, register, register_exception];
      runtime.caml_register_global(1, Stdlib_Callback, "Stdlib__Callback");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_camlinternalOO_ml = "camlinternalOO.ml", caml_array_make2 = runtime.caml_array_make, caml_check_bound2 = runtime.caml_check_bound, caml_div2 = runtime.caml_div, caml_get_public_method2 = runtime.caml_get_public_method, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace, caml_obj_block2 = runtime.caml_obj_block, caml_set_oo_id2 = runtime.caml_set_oo_id, caml_string_compare2 = runtime.caml_string_compare, caml_wrap_exception2 = runtime.caml_wrap_exception;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call5(f, a0, a1, a2, a3, a4) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 5 ? f(a0, a1, a2, a3, a4) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4]);
      }
      var global_data = runtime.caml_get_global_data(), Assert_failure = global_data.Assert_failure, Stdlib_Sys = global_data.Stdlib__Sys, Stdlib_Obj = global_data.Stdlib__Obj, Stdlib = global_data.Stdlib, Stdlib_Array = global_data.Stdlib__Array, Stdlib_List = global_data.Stdlib__List, Stdlib_Map = global_data.Stdlib__Map;
      function copy(o) {
        var o$0 = o.slice();
        return caml_set_oo_id2(o$0);
      }
      var params = [0, 1, 1, 1, 3, 16];
      function public_method_label(s2) {
        var accu = [0, 0], _al_ = runtime.caml_ml_string_length(s2) - 1 | 0, _ak_ = 0;
        if (_al_ >= 0) {
          var i = _ak_;
          for (; ; ) {
            var _am_ = runtime.caml_string_get(s2, i);
            accu[1] = (223 * accu[1] | 0) + _am_ | 0;
            var _an_ = i + 1 | 0;
            if (_al_ === i) break;
            i = _an_;
          }
        }
        accu[1] = accu[1] & 2147483647;
        var tag = 1073741823 < accu[1] ? accu[1] + 2147483648 | 0 : accu[1];
        return tag;
      }
      var compare = caml_string_compare2, Vars = caml_call1(Stdlib_Map[1], [0, compare]), compare$0 = caml_string_compare2, Meths = caml_call1(Stdlib_Map[1], [0, compare$0]), compare$1 = runtime.caml_int_compare, Labs = caml_call1(Stdlib_Map[1], [0, compare$1]), dummy_table = [0, 0, [0, 0], Meths[1], Labs[1], 0, 0, Vars[1], 0], table_count = [0, 0], dummy_met = caml_obj_block2(0, 0), initial_object_size = 2;
      function fit_size(n) {
        return 2 < n ? fit_size((n + 1 | 0) / 2 | 0) * 2 | 0 : n;
      }
      function new_table(pub_labels) {
        table_count[1]++;
        var len = pub_labels.length - 1, methods = caml_array_make2((len * 2 | 0) + 2 | 0, dummy_met);
        caml_check_bound2(methods, 0)[1] = len;
        var _ad_ = Stdlib_Sys[9], _ae_ = (runtime.caml_mul(fit_size(len), _ad_) / 8 | 0) - 1 | 0;
        caml_check_bound2(methods, 1)[2] = _ae_;
        var _ag_ = len - 1 | 0, _af_ = 0;
        if (_ag_ >= 0) {
          var i = _af_;
          for (; ; ) {
            var _ai_ = (i * 2 | 0) + 3 | 0, _ah_ = caml_check_bound2(pub_labels, i)[1 + i];
            caml_check_bound2(methods, _ai_)[1 + _ai_] = _ah_;
            var _aj_ = i + 1 | 0;
            if (_ag_ === i) break;
            i = _aj_;
          }
        }
        return [
          0,
          initial_object_size,
          methods,
          Meths[1],
          Labs[1],
          0,
          0,
          Vars[1],
          0
        ];
      }
      function resize(array, new_size) {
        var old_size = array[2].length - 1, _ab_ = old_size < new_size ? 1 : 0;
        if (_ab_) {
          var new_buck = caml_array_make2(new_size, dummy_met);
          caml_call5(Stdlib_Array[9], array[2], 0, new_buck, 0, old_size);
          array[2] = new_buck;
          var _ac_ = 0;
        } else
          var _ac_ = _ab_;
        return _ac_;
      }
      var method_count = [0, 0], inst_var_count = [0, 0], _a_ = [0, cst_camlinternalOO_ml, 279, 50], _b_ = [0, cst_camlinternalOO_ml, 407, 13], _c_ = [0, cst_camlinternalOO_ml, 410, 13], _d_ = [0, cst_camlinternalOO_ml, 413, 13], _e_ = [0, cst_camlinternalOO_ml, 416, 13], _f_ = [0, cst_camlinternalOO_ml, 419, 13], _g_ = [0, cst_camlinternalOO_ml, 437, 17];
      function new_method(table) {
        var index = table[2].length - 1;
        resize(table, index + 1 | 0);
        return index;
      }
      function get_method_label(table, name) {
        try {
          var _$_ = caml_call2(Meths[17], name, table[3]);
          return _$_;
        } catch (_aa_) {
          var ___ = caml_wrap_exception2(_aa_);
          if (___ !== Stdlib[8]) throw caml_maybe_attach_backtrace2(___, 0);
          var label = new_method(table);
          table[3] = caml_call3(Meths[2], name, label, table[3]);
          table[4] = caml_call3(Labs[2], label, 1, table[4]);
          return label;
        }
      }
      function get_method_labels(table, names) {
        return caml_call2(
          Stdlib_Array[14],
          function(_Z_) {
            return get_method_label(table, _Z_);
          },
          names
        );
      }
      function set_method(table, label, element) {
        method_count[1]++;
        return caml_call2(Labs[17], label, table[4]) ? (resize(table, label + 1 | 0), caml_check_bound2(table[2], label)[1 + label] = element, 0) : (table[6] = [0, [0, label, element], table[6]], 0);
      }
      function get_method(table, label) {
        try {
          var _X_ = caml_call2(Stdlib_List[53], label, table[6]);
          return _X_;
        } catch (_Y_) {
          var _W_ = caml_wrap_exception2(_Y_);
          if (_W_ === Stdlib[8])
            return caml_check_bound2(table[2], label)[1 + label];
          throw caml_maybe_attach_backtrace2(_W_, 0);
        }
      }
      function to_list(arr) {
        return 0 === arr ? 0 : caml_call1(Stdlib_Array[10], arr);
      }
      function narrow(table, vars, virt_meths, concr_meths) {
        var vars$0 = to_list(vars), virt_meths$0 = to_list(virt_meths), concr_meths$0 = to_list(concr_meths), virt_meth_labs = caml_call2(
          Stdlib_List[20],
          function(_V_) {
            return get_method_label(table, _V_);
          },
          virt_meths$0
        ), concr_meth_labs = caml_call2(
          Stdlib_List[20],
          function(_U_) {
            return get_method_label(table, _U_);
          },
          concr_meths$0
        );
        table[5] = [
          0,
          [0, table[3], table[4], table[6], table[7], virt_meth_labs, vars$0],
          table[5]
        ];
        table[7] = caml_call3(
          Vars[24],
          function(lab, info, tvars) {
            return caml_call2(Stdlib_List[37], lab, vars$0) ? caml_call3(Vars[2], lab, info, tvars) : tvars;
          },
          table[7],
          Vars[1]
        );
        var by_name = [0, Meths[1]], by_label = [0, Labs[1]];
        caml_call3(
          Stdlib_List[28],
          function(met, label) {
            by_name[1] = caml_call3(Meths[2], met, label, by_name[1]);
            var _P_ = by_label[1];
            try {
              var _S_ = caml_call2(Labs[17], label, table[4]), _R_ = _S_;
            } catch (_T_2) {
              var _Q_ = caml_wrap_exception2(_T_2);
              if (_Q_ !== Stdlib[8]) throw caml_maybe_attach_backtrace2(_Q_, 0);
              var _R_ = 1;
            }
            by_label[1] = caml_call3(Labs[2], label, _R_, _P_);
            return 0;
          },
          concr_meths$0,
          concr_meth_labs
        );
        caml_call3(
          Stdlib_List[28],
          function(met, label) {
            by_name[1] = caml_call3(Meths[2], met, label, by_name[1]);
            by_label[1] = caml_call3(Labs[2], label, 0, by_label[1]);
            return 0;
          },
          virt_meths$0,
          virt_meth_labs
        );
        table[3] = by_name[1];
        table[4] = by_label[1];
        table[6] = caml_call3(
          Stdlib_List[27],
          function(met, hm) {
            var lab = met[1];
            return caml_call2(Stdlib_List[37], lab, virt_meth_labs) ? hm : [0, met, hm];
          },
          table[6],
          0
        );
        return 0;
      }
      function widen(table) {
        var match = caml_call1(Stdlib_List[6], table[5]), vars = match[6], virt_meths = match[5], saved_vars = match[4], saved_hidden_meths = match[3], by_label = match[2], by_name = match[1];
        table[5] = caml_call1(Stdlib_List[7], table[5]);
        table[7] = caml_call3(
          Stdlib_List[26],
          function(s2, v) {
            var _O_ = caml_call2(Vars[17], v, table[7]);
            return caml_call3(Vars[2], v, _O_, s2);
          },
          saved_vars,
          vars
        );
        table[3] = by_name;
        table[4] = by_label;
        table[6] = caml_call3(
          Stdlib_List[27],
          function(met, hm) {
            var lab = met[1];
            return caml_call2(Stdlib_List[37], lab, virt_meths) ? hm : [0, met, hm];
          },
          table[6],
          saved_hidden_meths
        );
        return 0;
      }
      function new_variable(table, name) {
        try {
          var _M_ = caml_call2(Vars[17], name, table[7]);
          return _M_;
        } catch (_N_) {
          var _L_ = caml_wrap_exception2(_N_);
          if (_L_ !== Stdlib[8]) throw caml_maybe_attach_backtrace2(_L_, 0);
          var index = table[1];
          table[1] = index + 1 | 0;
          if (name !== "") table[7] = caml_call3(Vars[2], name, index, table[7]);
          return index;
        }
      }
      function to_array(arr) {
        return runtime.caml_equal(arr, 0) ? [0] : arr;
      }
      function new_methods_variables(table, meths, vals) {
        var meths$0 = to_array(meths), nmeths = meths$0.length - 1, nvals = vals.length - 1, res = caml_array_make2(nmeths + nvals | 0, 0), _D_ = nmeths - 1 | 0, _C_ = 0;
        if (_D_ >= 0) {
          var i$0 = _C_;
          for (; ; ) {
            var _J_ = get_method_label(table, caml_check_bound2(meths$0, i$0)[1 + i$0]);
            caml_check_bound2(res, i$0)[1 + i$0] = _J_;
            var _K_ = i$0 + 1 | 0;
            if (_D_ === i$0) break;
            i$0 = _K_;
          }
        }
        var _F_ = nvals - 1 | 0, _E_ = 0;
        if (_F_ >= 0) {
          var i = _E_;
          for (; ; ) {
            var _H_ = i + nmeths | 0, _G_ = new_variable(table, caml_check_bound2(vals, i)[1 + i]);
            caml_check_bound2(res, _H_)[1 + _H_] = _G_;
            var _I_ = i + 1 | 0;
            if (_F_ === i) break;
            i = _I_;
          }
        }
        return res;
      }
      function get_variable(table, name) {
        try {
          var _A_ = caml_call2(Vars[17], name, table[7]);
          return _A_;
        } catch (_B_) {
          var _z_ = caml_wrap_exception2(_B_);
          if (_z_ === Stdlib[8])
            throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
          throw caml_maybe_attach_backtrace2(_z_, 0);
        }
      }
      function get_variables(table, names) {
        return caml_call2(
          Stdlib_Array[14],
          function(_y_) {
            return get_variable(table, _y_);
          },
          names
        );
      }
      function add_initializer(table, f) {
        table[8] = [0, f, table[8]];
        return 0;
      }
      function create_table(public_methods) {
        if (0 === public_methods) return new_table([0]);
        var tags = caml_call2(Stdlib_Array[14], public_method_label, public_methods), table = new_table(tags);
        caml_call2(
          Stdlib_Array[13],
          function(i, met) {
            var lab = (i * 2 | 0) + 2 | 0;
            table[3] = caml_call3(Meths[2], met, lab, table[3]);
            table[4] = caml_call3(Labs[2], lab, 1, table[4]);
            return 0;
          },
          public_methods
        );
        return table;
      }
      function init_class(table) {
        inst_var_count[1] = (inst_var_count[1] + table[1] | 0) - 1 | 0;
        table[8] = caml_call1(Stdlib_List[10], table[8]);
        var _x_ = Stdlib_Sys[9];
        return resize(
          table,
          3 + caml_div2(caml_check_bound2(table[2], 1)[2] * 16 | 0, _x_) | 0
        );
      }
      function inherits(cla, vals, virt_meths, concr_meths, param, top) {
        var env = param[3], super$0 = param[2];
        narrow(cla, vals, virt_meths, concr_meths);
        var init = top ? caml_call2(super$0, cla, env) : caml_call1(super$0, cla);
        widen(cla);
        var _s_ = to_array(concr_meths), _t_ = [
          0,
          caml_call2(
            Stdlib_Array[14],
            function(nm) {
              return get_method(cla, get_method_label(cla, nm));
            },
            _s_
          ),
          0
        ], _u_ = to_array(vals), _v_ = [
          0,
          [0, init],
          [
            0,
            caml_call2(
              Stdlib_Array[14],
              function(_w_) {
                return get_variable(cla, _w_);
              },
              _u_
            ),
            _t_
          ]
        ];
        return caml_call1(Stdlib_Array[5], _v_);
      }
      function make_class(pub_meths, class_init) {
        var table = create_table(pub_meths), env_init = caml_call1(class_init, table);
        init_class(table);
        return [0, caml_call1(env_init, 0), class_init, 0];
      }
      function make_class_store(pub_meths, class_init, init_table) {
        var table = create_table(pub_meths), env_init = caml_call1(class_init, table);
        init_class(table);
        init_table[2] = class_init;
        init_table[1] = env_init;
        return 0;
      }
      function dummy_class(loc) {
        function undef(param) {
          throw caml_maybe_attach_backtrace2([0, Stdlib[15], loc], 1);
        }
        return [0, undef, undef, 0];
      }
      function create_object(table) {
        var obj = caml_obj_block2(Stdlib_Obj[10], table[1]);
        obj[1] = table[2];
        return caml_set_oo_id2(obj);
      }
      function create_object_opt(obj_0, table) {
        if (obj_0) return obj_0;
        var obj = caml_obj_block2(Stdlib_Obj[10], table[1]);
        obj[1] = table[2];
        return caml_set_oo_id2(obj);
      }
      function iter_f(obj, param) {
        var param$0 = param;
        for (; ; ) {
          if (!param$0) return 0;
          var l = param$0[2], f = param$0[1];
          caml_call1(f, obj);
          param$0 = l;
        }
      }
      function run_initializers(obj, table) {
        var inits = table[8], _r_ = 0 !== inits ? 1 : 0;
        return _r_ ? iter_f(obj, inits) : _r_;
      }
      function run_initializers_opt(obj_0, obj, table) {
        if (obj_0) return obj;
        var inits = table[8];
        if (0 !== inits) iter_f(obj, inits);
        return obj;
      }
      function create_object_and_run_initiali(obj_0, table) {
        if (obj_0) return obj_0;
        var obj = create_object(table);
        run_initializers(obj, table);
        return obj;
      }
      function get_data(param) {
        if (param) return param[2];
        throw caml_maybe_attach_backtrace2([0, Assert_failure, _e_], 1);
      }
      function build_path(n, keys, tables) {
        var res = [0, 0, 0, 0], r = [0, res], _o_ = 0;
        if (n >= 0) {
          var i = _o_;
          for (; ; ) {
            var _p_ = r[1];
            r[1] = [0, caml_check_bound2(keys, i)[1 + i], _p_, 0];
            var _q_ = i + 1 | 0;
            if (n === i) break;
            i = _q_;
          }
        }
        var v = r[1];
        if (!tables)
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _b_], 1);
        tables[2] = v;
        return res;
      }
      function lookup_tables(root, keys) {
        var root_data = get_data(root);
        if (!root_data) return build_path(keys.length - 2 | 0, keys, root);
        var i$1 = keys.length - 2 | 0, i = i$1, tables$0 = root_data;
        for (; ; ) {
          if (0 > i) return tables$0;
          var key = caml_check_bound2(keys, i)[1 + i], tables$1 = tables$0;
          for (; ; ) {
            if (!tables$1)
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _d_], 1);
            if (tables$1[1] === key) break;
            if (!tables$1)
              throw caml_maybe_attach_backtrace2([0, Assert_failure, _f_], 1);
            var tables = tables$1[3];
            if (!tables) {
              var next = [0, key, 0, 0];
              if (!tables$1)
                throw caml_maybe_attach_backtrace2([0, Assert_failure, _c_], 1);
              tables$1[3] = next;
              return build_path(i - 1 | 0, keys, next);
            }
            tables$1 = tables;
          }
          var tables_data = get_data(tables$1);
          if (!tables_data)
            throw caml_maybe_attach_backtrace2([0, Assert_failure, _g_], 1);
          var i$0 = i - 1 | 0;
          i = i$0;
          tables$0 = tables_data;
        }
      }
      function new_cache(table) {
        var n = new_method(table);
        a: {
          if (0 !== (n % 2 | 0)) {
            var _n_ = Stdlib_Sys[9];
            if ((2 + caml_div2(caml_check_bound2(table[2], 1)[2] * 16 | 0, _n_) | 0) >= n) {
              var n$0 = new_method(table);
              break a;
            }
          }
          var n$0 = n;
        }
        caml_check_bound2(table[2], n$0)[1 + n$0] = 0;
        return n$0;
      }
      function set_methods(table, methods) {
        var len = methods.length - 1, i = [0, 0];
        for (; ; ) {
          if (i[1] >= len) return 0;
          var _h_ = i[1], label = caml_check_bound2(methods, _h_)[1 + _h_], next = function(param) {
            i[1]++;
            var _m_ = i[1];
            return caml_check_bound2(methods, _m_)[1 + _m_];
          }, clo = next(0);
          if (typeof clo === "number")
            switch (clo) {
              case 0:
                var x2 = next(0);
                let x$20 = x2;
                var clo$0 = function(obj) {
                  return x$20;
                };
                break;
              case 1:
                var n = next(0);
                let n$38 = n;
                var clo$0 = function(obj) {
                  return obj[1 + n$38];
                };
                break;
              case 2:
                var e = next(0), n$0 = next(0);
                let e$10 = e, n$37 = n$0;
                var clo$0 = function(obj) {
                  return obj[1 + e$10][1 + n$37];
                };
                break;
              case 3:
                var n$1 = next(0);
                let n$36 = n$1;
                var clo$0 = function(obj) {
                  return caml_call1(obj[1][1 + n$36], obj);
                };
                break;
              case 4:
                var n$2 = next(0);
                let n$35 = n$2;
                var clo$0 = function(obj, x3) {
                  obj[1 + n$35] = x3;
                  return 0;
                };
                break;
              case 5:
                var f = next(0), x$0 = next(0);
                let f$20 = f, x$19 = x$0;
                var clo$0 = function(obj) {
                  return caml_call1(f$20, x$19);
                };
                break;
              case 6:
                var f$0 = next(0), n$3 = next(0);
                let f$19 = f$0, n$34 = n$3;
                var clo$0 = function(obj) {
                  return caml_call1(f$19, obj[1 + n$34]);
                };
                break;
              case 7:
                var f$1 = next(0), e$0 = next(0), n$4 = next(0);
                let f$18 = f$1, e$9 = e$0, n$33 = n$4;
                var clo$0 = function(obj) {
                  return caml_call1(f$18, obj[1 + e$9][1 + n$33]);
                };
                break;
              case 8:
                var f$2 = next(0), n$5 = next(0);
                let f$17 = f$2, n$32 = n$5;
                var clo$0 = function(obj) {
                  return caml_call1(f$17, caml_call1(obj[1][1 + n$32], obj));
                };
                break;
              case 9:
                var f$3 = next(0), x$1 = next(0), y = next(0);
                let f$16 = f$3, x$18 = x$1, y$0 = y;
                var clo$0 = function(obj) {
                  return caml_call2(f$16, x$18, y$0);
                };
                break;
              case 10:
                var f$4 = next(0), x$2 = next(0), n$6 = next(0);
                let f$15 = f$4, x$17 = x$2, n$31 = n$6;
                var clo$0 = function(obj) {
                  return caml_call2(f$15, x$17, obj[1 + n$31]);
                };
                break;
              case 11:
                var f$5 = next(0), x$3 = next(0), e$1 = next(0), n$7 = next(0);
                let f$14 = f$5, x$16 = x$3, e$8 = e$1, n$30 = n$7;
                var clo$0 = function(obj) {
                  return caml_call2(f$14, x$16, obj[1 + e$8][1 + n$30]);
                };
                break;
              case 12:
                var f$6 = next(0), x$4 = next(0), n$8 = next(0);
                let f$13 = f$6, x$15 = x$4, n$29 = n$8;
                var clo$0 = function(obj) {
                  return caml_call2(f$13, x$15, caml_call1(obj[1][1 + n$29], obj));
                };
                break;
              case 13:
                var f$7 = next(0), n$9 = next(0), x$5 = next(0);
                let f$12 = f$7, n$28 = n$9, x$14 = x$5;
                var clo$0 = function(obj) {
                  return caml_call2(f$12, obj[1 + n$28], x$14);
                };
                break;
              case 14:
                var f$8 = next(0), e$2 = next(0), n$10 = next(0), x$6 = next(0);
                let f$11 = f$8, e$7 = e$2, n$27 = n$10, x$13 = x$6;
                var clo$0 = function(obj) {
                  return caml_call2(f$11, obj[1 + e$7][1 + n$27], x$13);
                };
                break;
              case 15:
                var f$9 = next(0), n$11 = next(0), x$7 = next(0);
                let f$10 = f$9, n$26 = n$11, x$12 = x$7;
                var clo$0 = function(obj) {
                  return caml_call2(f$10, caml_call1(obj[1][1 + n$26], obj), x$12);
                };
                break;
              case 16:
                var n$12 = next(0), x$8 = next(0);
                let n$25 = n$12, x$11 = x$8;
                var clo$0 = function(obj) {
                  return caml_call2(obj[1][1 + n$25], obj, x$11);
                };
                break;
              case 17:
                var n$13 = next(0), m = next(0);
                let n$24 = n$13, m$12 = m;
                var clo$0 = function(obj) {
                  return caml_call2(obj[1][1 + n$24], obj, obj[1 + m$12]);
                };
                break;
              case 18:
                var n$14 = next(0), e$3 = next(0), m$0 = next(0);
                let n$23 = n$14, e$6 = e$3, m$11 = m$0;
                var clo$0 = function(obj) {
                  return caml_call2(obj[1][1 + n$23], obj, obj[1 + e$6][1 + m$11]);
                };
                break;
              case 19:
                var n$15 = next(0), m$1 = next(0);
                let n$22 = n$15, m$10 = m$1;
                var clo$0 = function(obj) {
                  var _l_ = caml_call1(obj[1][1 + m$10], obj);
                  return caml_call2(obj[1][1 + n$22], obj, _l_);
                };
                break;
              case 20:
                var m$2 = next(0), x$9 = next(0);
                new_cache(table);
                let m$9 = m$2, x$10 = x$9;
                var clo$0 = function(obj) {
                  return caml_call1(caml_get_public_method2(x$10, m$9, 0), x$10);
                };
                break;
              case 21:
                var m$3 = next(0), n$16 = next(0);
                new_cache(table);
                let m$8 = m$3, n$21 = n$16;
                var clo$0 = function(obj) {
                  var _k_ = obj[1 + n$21];
                  return caml_call1(caml_get_public_method2(_k_, m$8, 0), _k_);
                };
                break;
              case 22:
                var m$4 = next(0), e$4 = next(0), n$17 = next(0);
                new_cache(table);
                let m$7 = m$4, e$5 = e$4, n$20 = n$17;
                var clo$0 = function(obj) {
                  var _j_ = obj[1 + e$5][1 + n$20];
                  return caml_call1(caml_get_public_method2(_j_, m$7, 0), _j_);
                };
                break;
              default:
                var m$5 = next(0), n$18 = next(0);
                new_cache(table);
                let m$6 = m$5, n$19 = n$18;
                var clo$0 = function(obj) {
                  var _i_ = caml_call1(obj[1][1 + n$19], obj);
                  return caml_call1(caml_get_public_method2(_i_, m$6, 0), _i_);
                };
            }
          else
            var clo$0 = clo;
          set_method(table, label, clo$0);
          i[1]++;
        }
      }
      function stats(param) {
        return [0, table_count[1], method_count[1], inst_var_count[1]];
      }
      var CamlinternalOO = [
        0,
        public_method_label,
        new_method,
        new_variable,
        new_methods_variables,
        get_variable,
        get_variables,
        get_method_label,
        get_method_labels,
        get_method,
        set_method,
        set_methods,
        narrow,
        widen,
        add_initializer,
        dummy_table,
        create_table,
        init_class,
        inherits,
        make_class,
        make_class_store,
        dummy_class,
        copy,
        create_object,
        create_object_opt,
        run_initializers,
        run_initializers_opt,
        create_object_and_run_initiali,
        lookup_tables,
        params,
        stats
      ];
      runtime.caml_register_global(17, CamlinternalOO, "CamlinternalOO");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, cst_s = '"%s"', cst = "??";
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call4(f, a0, a1, a2, a3) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 4 ? f(a0, a1, a2, a3) : runtime.caml_call_gen(f, [a0, a1, a2, a3]);
      }
      function caml_call6(f, a0, a1, a2, a3, a4, a5) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 6 ? f(a0, a1, a2, a3, a4, a5) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4, a5]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib_Format = global_data.Stdlib__Format, Stdlib_String = global_data.Stdlib__String, _a_ = [0, [12, 34, [2, 0, [12, 34, 0]]], cst_s];
      function pp_repr(ppf, param) {
        if (0 === param[0]) {
          var x2 = param[1];
          return caml_call2(Stdlib_Format[23], ppf, x2);
        }
        var s2 = param[1], _h_ = caml_call1(Stdlib_String[25], s2);
        return caml_call3(Stdlib_Format[143], ppf, _a_, _h_);
      }
      var InitialRepr = [0, pp_repr], _b_ = [0, [11, cst, 0], cst], _c_ = [0, [12, 34, [2, 0, [12, 34, 0]]], cst_s], _d_ = [0, [15, [12, 43, [15, 0]]], "%a+%a"], _e_ = [0, [15, [12, 42, [15, 0]]], "%a*%a"], _f_ = [0, [11, "len(", [15, [12, 41, 0]]], "len(%a)"];
      function pp_repr$0(ppf, param) {
        if (typeof param === "number")
          return caml_call2(Stdlib_Format[143], ppf, _b_);
        switch (param[0]) {
          case 0:
            var x2 = param[1];
            return caml_call2(Stdlib_Format[23], ppf, x2);
          case 1:
            var s2 = param[1], _g_ = caml_call1(Stdlib_String[25], s2);
            return caml_call3(Stdlib_Format[143], ppf, _c_, _g_);
          case 2:
            var e2 = param[2], e1 = param[1];
            return caml_call6(Stdlib_Format[143], ppf, _d_, pp_repr$0, e1, pp_repr$0, e2);
          case 3:
            var e2$0 = param[2], e1$0 = param[1];
            return caml_call6(
              Stdlib_Format[143],
              ppf,
              _e_,
              pp_repr$0,
              e1$0,
              pp_repr$0,
              e2$0
            );
          default:
            var e = param[1];
            return caml_call4(Stdlib_Format[143], ppf, _f_, pp_repr$0, e);
        }
      }
      var UntypedAst = [0, pp_repr$0], pp_irepr = InitialRepr[1], pp_urepr = UntypedAst[1], Lib_pyfinalo_Lang = [0, InitialRepr, UntypedAst, pp_irepr, pp_urepr];
      runtime.caml_register_global(8, Lib_pyfinalo_Lang, "Lib_pyfinalo__Lang");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      function caml_call4(f, a0, a1, a2, a3) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 4 ? f(a0, a1, a2, a3) : runtime.caml_call_gen(f, [a0, a1, a2, a3]);
      }
      function caml_call5(f, a0, a1, a2, a3, a4) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 5 ? f(a0, a1, a2, a3, a4) : runtime.caml_call_gen(f, [a0, a1, a2, a3, a4]);
      }
      var global_data = runtime.caml_get_global_data(), Lib_pyfinalo_Lang = global_data.Lib_pyfinalo__Lang, Stdlib_Format = global_data.Stdlib__Format;
      function int$0(x2) {
        return [0, x2];
      }
      function str(x2) {
        return [1, x2];
      }
      function add(_E_, param) {
        var y = param[1], x2 = _E_[1];
        return [0, x2 + y | 0];
      }
      function mul(_D_, param) {
        var y = param[1], x2 = _D_[1];
        return [0, runtime.caml_mul(x2, y)];
      }
      function len(param) {
        var s2 = param[1];
        return [0, runtime.caml_ml_string_length(s2)];
      }
      var DirectValInterp = [0, int$0, str, add, mul, len];
      function int$1(x2) {
        return [0, x2];
      }
      function str$0(x2) {
        return [1, x2];
      }
      function add$0(x2, y) {
        return [2, x2, y];
      }
      function mul$0(x2, y) {
        return [3, x2, y];
      }
      function len$0(s2) {
        return [4, s2];
      }
      var UntypedAstInterp = [0, int$1, str$0, add$0, mul$0, len$0], _a_ = [0, [15, [11, " : int", 0]], "%a : int"], _b_ = [0, [15, [11, " : string", 0]], "%a : string"], _c_ = [0, [11, "ill-typed:", [15, 0]], "ill-typed:%a"];
      function TypeChecking(Tgt) {
        function int$02(x2) {
          var _C_ = caml_call1(UntypedAstInterp[1], x2);
          return [0, caml_call1(Tgt[1], x2), _C_];
        }
        function str2(s2) {
          var _B_ = caml_call1(UntypedAstInterp[2], s2);
          return [1, caml_call1(Tgt[2], s2), _B_];
        }
        function ast(param) {
          switch (param[0]) {
            case 0:
              var term = param[2];
              return term;
            case 1:
              var term$0 = param[2];
              return term$0;
            default:
              var term$1 = param[1];
              return term$1;
          }
        }
        function sub_ill2(e1, e2, otherwise) {
          if (2 === e1[0]) {
            var term$0 = e1[1];
            return [2, term$0];
          }
          if (2 !== e2[0]) return otherwise;
          var term = e2[1];
          return [2, term];
        }
        function add2(e1, e2) {
          var _z_ = ast(e2), _A_ = ast(e1), term = caml_call2(UntypedAstInterp[3], _A_, _z_);
          if (0 === e1[0]) {
            var e1$0 = e1[1];
            if (0 === e2[0]) {
              var e2$0 = e2[1];
              return [0, caml_call2(Tgt[3], e1$0, e2$0), term];
            }
          }
          return sub_ill2(e1, e2, [2, term]);
        }
        function mul2(e1, e2) {
          var _x_ = ast(e2), _y_ = ast(e1), term = caml_call2(UntypedAstInterp[4], _y_, _x_);
          if (0 === e1[0]) {
            var e1$0 = e1[1];
            if (0 === e2[0]) {
              var e2$0 = e2[1];
              return [0, caml_call2(Tgt[4], e1$0, e2$0), term];
            }
          }
          return sub_ill2(e1, e2, [2, term]);
        }
        function len2(e) {
          var _w_ = ast(e), term = caml_call1(UntypedAstInterp[5], _w_);
          switch (e[0]) {
            case 0:
              return [2, term];
            case 1:
              var e$0 = e[1];
              return [0, caml_call1(Tgt[5], e$0), term];
            default:
              var term$0 = e[1];
              return [2, term$0];
          }
        }
        function pp_repr(vppf, ppf, param) {
          switch (param[0]) {
            case 0:
              var v = param[1];
              return caml_call4(Stdlib_Format[143], ppf, _a_, vppf, v);
            case 1:
              var v$0 = param[1];
              return caml_call4(Stdlib_Format[143], ppf, _b_, vppf, v$0);
            default:
              var term = param[1];
              return caml_call4(Stdlib_Format[143], ppf, _c_, Lib_pyfinalo_Lang[4], term);
          }
        }
        return [0, int$02, str2, ast, add2, mul2, len2, pp_repr];
      }
      var CheckingDirectValInterp = TypeChecking(DirectValInterp), _d_ = [0, [15, [11, " evaluates to ", [15, 0]]], "%a evaluates to %a"];
      function explain(param) {
        var term = param[2], v = param[1];
        return caml_call5(
          Stdlib_Format[147],
          _d_,
          Lib_pyfinalo_Lang[4],
          term,
          Lib_pyfinalo_Lang[3],
          v
        );
      }
      function int$2(x2) {
        var _v_ = caml_call1(UntypedAstInterp[1], x2);
        return [0, caml_call1(DirectValInterp[1], x2), _v_];
      }
      function str$1(s2) {
        var _u_ = caml_call1(UntypedAstInterp[2], s2);
        return [0, caml_call1(DirectValInterp[2], s2), _u_];
      }
      function add$1(_s_, param) {
        var y = param[2], y$0 = param[1], x2 = _s_[2], x$0 = _s_[1], _t_ = caml_call2(UntypedAstInterp[3], x2, y);
        return [0, caml_call2(DirectValInterp[3], x$0, y$0), _t_];
      }
      function mul$1(_q_, param) {
        var y = param[2], y$0 = param[1], x2 = _q_[2], x$0 = _q_[1], _r_ = caml_call2(UntypedAstInterp[4], x2, y);
        return [0, caml_call2(DirectValInterp[4], x$0, y$0), _r_];
      }
      function len$1(param) {
        var s2 = param[2], s$0 = param[1], _p_ = caml_call1(UntypedAstInterp[5], s2);
        return [0, caml_call1(DirectValInterp[5], s$0), _p_];
      }
      var ExplainInterpTyped = [0, explain, int$2, str$1, add$1, mul$1, len$1], Checker = TypeChecking(DirectValInterp), _e_ = [
        0,
        [15, [11, " evaluates to integer ", [15, 0]]],
        "%a evaluates to integer %a"
      ], _f_ = [
        0,
        [15, [11, " evaluates to string ", [15, 0]]],
        "%a evaluates to string %a"
      ], _g_ = [0, [15, [11, " is ill-typed", 0]], "%a is ill-typed"], _h_ = [
        0,
        [15, [11, " contains ill-typed subterm ", [15, 0]]],
        "%a contains ill-typed subterm %a"
      ];
      function explain$0(param) {
        var term = param[2], v = param[1];
        switch (v[0]) {
          case 0:
            var v$0 = v[1];
            return caml_call5(
              Stdlib_Format[147],
              _e_,
              Lib_pyfinalo_Lang[4],
              term,
              Lib_pyfinalo_Lang[3],
              v$0
            );
          case 1:
            var v$1 = v[1];
            return caml_call5(
              Stdlib_Format[147],
              _f_,
              Lib_pyfinalo_Lang[4],
              term,
              Lib_pyfinalo_Lang[3],
              v$1
            );
          default:
            var sub = v[1];
            return runtime.caml_equal(sub, term) ? caml_call3(Stdlib_Format[147], _g_, Lib_pyfinalo_Lang[4], term) : caml_call5(
              Stdlib_Format[147],
              _h_,
              Lib_pyfinalo_Lang[4],
              term,
              Lib_pyfinalo_Lang[4],
              sub
            );
        }
      }
      function int$3(x2) {
        var _o_ = caml_call1(UntypedAstInterp[1], x2);
        return [0, caml_call1(Checker[1], x2), _o_];
      }
      function str$2(s2) {
        var _n_ = caml_call1(UntypedAstInterp[2], s2);
        return [0, caml_call1(Checker[2], s2), _n_];
      }
      function add$2(_l_, param) {
        var y = param[2], y$0 = param[1], x2 = _l_[2], x$0 = _l_[1], _m_ = caml_call2(UntypedAstInterp[3], x2, y);
        return [0, caml_call2(Checker[4], x$0, y$0), _m_];
      }
      function mul$2(_j_, param) {
        var y = param[2], y$0 = param[1], x2 = _j_[2], x$0 = _j_[1], _k_ = caml_call2(UntypedAstInterp[4], x2, y);
        return [0, caml_call2(Checker[5], x$0, y$0), _k_];
      }
      function len$2(param) {
        var s2 = param[2], s$0 = param[1], _i_ = caml_call1(UntypedAstInterp[5], s2);
        return [0, caml_call1(Checker[6], s$0), _i_];
      }
      var ExplainInterpUntyped = [0, Checker, explain$0, int$3, str$2, add$2, mul$2, len$2], Lib_pyfinalo_Interp = [
        0,
        DirectValInterp,
        UntypedAstInterp,
        TypeChecking,
        CheckingDirectValInterp,
        ExplainInterpTyped,
        ExplainInterpUntyped
      ];
      runtime.caml_register_global(10, Lib_pyfinalo_Interp, "Lib_pyfinalo__Interp");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, s2 = "6.0.1", git_version = "", Jsoo_runtime_Runtime_version = [0, s2, git_version];
      runtime.caml_register_global(2, Jsoo_runtime_Runtime_version, "Jsoo_runtime__Runtime_version");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_maybe_attach_backtrace2 = runtime.caml_maybe_attach_backtrace;
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      var global_data = runtime.caml_get_global_data(), Assert_failure = global_data.Assert_failure, Jsoo_runtime_Runtime_version = global_data.Jsoo_runtime__Runtime_version, Stdlib_Callback = global_data.Stdlib__Callback, Js = [0], _a_ = [0, "lib/runtime/jsoo_runtime.ml", 143, 13];
      function effects(param) {
        var match = runtime.caml_jsoo_flags_effects(0);
        if (match === "cps") return 3356934;
        if (match === "disabled") return -709493348;
        if (match !== "double-translation")
          throw caml_maybe_attach_backtrace2([0, Assert_failure, _a_], 1);
        return -766114909;
      }
      var Config = [0, effects], version = Jsoo_runtime_Runtime_version[1], git_version = Jsoo_runtime_Runtime_version[2], Sys = [0, Config, version, git_version], Exn = [248, "Jsoo_runtime.Error.Exn", runtime.caml_fresh_oo_id(0)];
      caml_call2(Stdlib_Callback[2], "jsError", [0, Exn, [0]]);
      function raise(exn) {
        throw exn;
      }
      var Error2 = [
        0,
        raise,
        runtime.caml_exn_with_js_backtrace,
        runtime.caml_js_error_option_of_exception,
        Exn
      ], For_compatibility_only = [0], Bigstring = [0], Typed_array = [0, Bigstring], Int64 = [0], Effect = [0], Jsoo_runtime = [0, Js, Sys, Error2, For_compatibility_only, Typed_array, Int64, Effect];
      runtime.caml_register_global(10, Jsoo_runtime, "Jsoo_runtime");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, global_data = runtime.caml_get_global_data(), Stdlib_String = global_data.Stdlib__String, Stdlib_Char = global_data.Stdlib__Char, Poly = [0];
      function max(x2, y) {
        return y <= x2 ? x2 : y;
      }
      function min(x2, y) {
        return x2 <= y ? x2 : y;
      }
      var Int_replace_polymorphic_compar = [0, max, min], make = Stdlib_String[1], init = Stdlib_String[2], empty = Stdlib_String[3], of_bytes = Stdlib_String[4], to_bytes = Stdlib_String[5], blit = Stdlib_String[6], concat = Stdlib_String[7], cat = Stdlib_String[8], compare = Stdlib_String[10], starts_with = Stdlib_String[11], ends_with = Stdlib_String[12], contains_from = Stdlib_String[13], rcontains_from = Stdlib_String[14], contains = Stdlib_String[15], sub = Stdlib_String[16], split_on_char = Stdlib_String[17], map = Stdlib_String[18], mapi = Stdlib_String[19], fold_left = Stdlib_String[20], fold_right = Stdlib_String[21], for_all = Stdlib_String[22], exists = Stdlib_String[23], trim = Stdlib_String[24], escaped = Stdlib_String[25], uppercase_ascii = Stdlib_String[26], lowercase_ascii = Stdlib_String[27], capitalize_ascii = Stdlib_String[28], uncapitalize_ascii = Stdlib_String[29], iter = Stdlib_String[30], iteri = Stdlib_String[31], index_from = Stdlib_String[32], index_from_opt = Stdlib_String[33], rindex_from = Stdlib_String[34], rindex_from_opt = Stdlib_String[35], index = Stdlib_String[36], index_opt = Stdlib_String[37], rindex = Stdlib_String[38], rindex_opt = Stdlib_String[39], to_seq = Stdlib_String[40], to_seqi = Stdlib_String[41], of_seq = Stdlib_String[42], get_utf_8_uchar = Stdlib_String[43], is_valid_utf_8 = Stdlib_String[44], get_utf_16be_uchar = Stdlib_String[45], is_valid_utf_16be = Stdlib_String[46], get_utf_16le_uchar = Stdlib_String[47], is_valid_utf_16le = Stdlib_String[48], get_uint8 = Stdlib_String[49], get_int8 = Stdlib_String[50], get_uint16_ne = Stdlib_String[51], get_uint16_be = Stdlib_String[52], get_uint16_le = Stdlib_String[53], get_int16_ne = Stdlib_String[54], get_int16_be = Stdlib_String[55], get_int16_le = Stdlib_String[56], get_int32_ne = Stdlib_String[57], hash = Stdlib_String[58], seeded_hash = Stdlib_String[59], get_int32_be = Stdlib_String[60], get_int32_le = Stdlib_String[61], get_int64_ne = Stdlib_String[62], get_int64_be = Stdlib_String[63], get_int64_le = Stdlib_String[64], equal = runtime.caml_string_equal, String2 = [
        0,
        make,
        init,
        empty,
        of_bytes,
        to_bytes,
        blit,
        concat,
        cat,
        compare,
        starts_with,
        ends_with,
        contains_from,
        rcontains_from,
        contains,
        sub,
        split_on_char,
        map,
        mapi,
        fold_left,
        fold_right,
        for_all,
        exists,
        trim,
        escaped,
        uppercase_ascii,
        lowercase_ascii,
        capitalize_ascii,
        uncapitalize_ascii,
        iter,
        iteri,
        index_from,
        index_from_opt,
        rindex_from,
        rindex_from_opt,
        index,
        index_opt,
        rindex,
        rindex_opt,
        to_seq,
        to_seqi,
        of_seq,
        get_utf_8_uchar,
        is_valid_utf_8,
        get_utf_16be_uchar,
        is_valid_utf_16be,
        get_utf_16le_uchar,
        is_valid_utf_16le,
        get_uint8,
        get_int8,
        get_uint16_ne,
        get_uint16_be,
        get_uint16_le,
        get_int16_ne,
        get_int16_be,
        get_int16_le,
        get_int32_ne,
        hash,
        seeded_hash,
        get_int32_be,
        get_int32_le,
        get_int64_ne,
        get_int64_be,
        get_int64_le,
        equal
      ], chr = Stdlib_Char[1], escaped$0 = Stdlib_Char[2], lowercase_ascii$0 = Stdlib_Char[3], uppercase_ascii$0 = Stdlib_Char[4], compare$0 = Stdlib_Char[5], seeded_hash$0 = Stdlib_Char[7], hash$0 = Stdlib_Char[8];
      function equal$0(x2, y) {
        return x2 === y ? 1 : 0;
      }
      var Char = [
        0,
        chr,
        escaped$0,
        lowercase_ascii$0,
        uppercase_ascii$0,
        compare$0,
        seeded_hash$0,
        hash$0,
        equal$0
      ], max$0 = Int_replace_polymorphic_compar[1], min$0 = Int_replace_polymorphic_compar[2], Js_of_ocaml_Import = [0, Poly, Int_replace_polymorphic_compar, String2, Char, max$0, min$0];
      runtime.caml_register_global(2, Js_of_ocaml_Import, "Js_of_ocaml__Import");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var jsoo_exports = typeof module === "object" && module.exports || globalThis2, runtime = globalThis2.jsoo_runtime, cst_parseFloat$0 = "parseFloat", cst_parseInt$0 = "parseInt", caml_js_get2 = runtime.caml_js_get, caml_js_set2 = runtime.caml_js_set, caml_js_wrap_callback2 = runtime.caml_js_wrap_callback, caml_string_of_jsstring2 = runtime.caml_string_of_jsstring;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      var global_data = runtime.caml_get_global_data(), Js_of_ocaml_Import = global_data.Js_of_ocaml__Import, Stdlib = global_data.Stdlib, Jsoo_runtime = global_data.Jsoo_runtime, Stdlib_Printexc = global_data.Stdlib__Printexc, global = globalThis2, Unsafe = [0, global], null$0 = null, undefined$0 = void 0;
      function return$0(_p_) {
        return _p_;
      }
      function map(x2, f) {
        return x2 == null$0 ? null$0 : caml_call1(f, x2);
      }
      function bind(x2, f) {
        return x2 == null$0 ? null$0 : caml_call1(f, x2);
      }
      function test(x2) {
        return 1 - (x2 == null$0 ? 1 : 0);
      }
      function iter(x2, f) {
        var _o_ = 1 - (x2 == null$0 ? 1 : 0);
        return _o_ ? caml_call1(f, x2) : _o_;
      }
      function case$0(x2, f, g) {
        return x2 == null$0 ? caml_call1(f, 0) : caml_call1(g, x2);
      }
      function get(x2, f) {
        return x2 == null$0 ? caml_call1(f, 0) : x2;
      }
      function option(x2) {
        if (!x2) return null$0;
        var x$0 = x2[1];
        return x$0;
      }
      function to_option(x2) {
        return x2 == null$0 ? 0 : [0, x2];
      }
      var Opt = [
        0,
        null$0,
        return$0,
        map,
        bind,
        test,
        iter,
        case$0,
        get,
        option,
        to_option
      ];
      function return$1(_n_) {
        return _n_;
      }
      function map$0(x2, f) {
        return x2 === undefined$0 ? undefined$0 : caml_call1(f, x2);
      }
      function bind$0(x2, f) {
        return x2 === undefined$0 ? undefined$0 : caml_call1(f, x2);
      }
      function test$0(x2) {
        return 1 - (x2 === undefined$0 ? 1 : 0);
      }
      function iter$0(x2, f) {
        var _m_ = 1 - (x2 === undefined$0 ? 1 : 0);
        return _m_ ? caml_call1(f, x2) : _m_;
      }
      function case$1(x2, f, g) {
        return x2 === undefined$0 ? caml_call1(f, 0) : caml_call1(g, x2);
      }
      function get$0(x2, f) {
        return x2 === undefined$0 ? caml_call1(f, 0) : x2;
      }
      function option$0(x2) {
        if (!x2) return undefined$0;
        var x$0 = x2[1];
        return x$0;
      }
      function to_option$0(x2) {
        return x2 === undefined$0 ? 0 : [0, x2];
      }
      var Optdef = [
        0,
        undefined$0,
        return$1,
        map$0,
        bind$0,
        test$0,
        iter$0,
        case$1,
        get$0,
        option$0,
        to_option$0
      ];
      function coerce(x2, f, g) {
        var _l_ = caml_call1(f, x2);
        return caml_call2(Opt[8], _l_, function(param) {
          return caml_call1(g, x2);
        });
      }
      function coerce_opt(x2, f, g) {
        var _k_ = caml_call2(Opt[4], x2, f);
        return caml_call2(Opt[8], _k_, function(param) {
          return caml_call1(g, x2);
        });
      }
      var true$0 = true, false$0 = false, nfc = "NFC", nfd = "NFD", nfkc = "NFKC", nfkd = "NFKD", t0 = Unsafe[1], string_constr = t0.String, t1 = Unsafe[1], regExp = t1.RegExp, t2 = Unsafe[1], object_constructor = t2.Object;
      function object_keys(t3) {
        return object_constructor.keys(t3);
      }
      var t5 = Unsafe[1], array_constructor = t5.Array, array_get = caml_js_get2, array_set = caml_js_set2;
      function array_map(f, t7) {
        var cb = caml_js_wrap_callback2(function(x2, idx, param) {
          return caml_call1(f, x2);
        });
        return t7.map(cb);
      }
      function array_mapi(f, t7) {
        var cb = caml_js_wrap_callback2(function(x2, idx, param) {
          return caml_call2(f, idx, x2);
        });
        return t7.map(cb);
      }
      function str_array(_j_) {
        return _j_;
      }
      function match_result(_i_) {
        return _i_;
      }
      var t8 = Unsafe[1], date_constr = t8.Date, t9 = Unsafe[1], math = t9.Math, t10 = Unsafe[1], error_constr = t10.Error, include = Jsoo_runtime[3], raise = include[1], exn_with_js_backtrace = include[2], of_exn = include[3], Error2 = include[4];
      function name(t11) {
        return caml_string_of_jsstring2(t11.name);
      }
      function message(t12) {
        return caml_string_of_jsstring2(t12.message);
      }
      function stack(t13) {
        var _h_ = caml_call2(Opt[3], t13.stack, caml_string_of_jsstring2);
        return caml_call1(Opt[10], _h_);
      }
      function to_string(t14) {
        return caml_string_of_jsstring2(t14.toString());
      }
      function raise_js_error(e) {
        return caml_call1(raise, e);
      }
      function string_of_error(e) {
        return to_string(e);
      }
      var t15 = Unsafe[1], JSON = t15.JSON, cst_parseInt = cst_parseInt$0, cst_parseFloat = cst_parseFloat$0;
      function decodeURI(s2) {
        var t16 = Unsafe[1];
        return t16.decodeURI(s2);
      }
      function decodeURIComponent(s2) {
        var t17 = Unsafe[1];
        return t17.decodeURIComponent(s2);
      }
      function encodeURI(s2) {
        var t18 = Unsafe[1];
        return t18.encodeURI(s2);
      }
      function encodeURIComponent(s2) {
        var t19 = Unsafe[1];
        return t19.encodeURIComponent(s2);
      }
      function escape(s2) {
        var t20 = Unsafe[1];
        return t20.escape(s2);
      }
      function unescape(s2) {
        var t21 = Unsafe[1];
        return t21.unescape(s2);
      }
      function isNaN(i) {
        var t22 = Unsafe[1];
        return t22.isNaN(i) | 0;
      }
      function parseInt(s2) {
        var t23 = Unsafe[1], s$0 = t23.parseInt(s2);
        return isNaN(s$0) ? caml_call1(Stdlib[2], cst_parseInt) : s$0;
      }
      function parseFloat(s2) {
        var t24 = Unsafe[1], s$0 = t24.parseFloat(s2);
        return isNaN(s$0) ? caml_call1(Stdlib[2], cst_parseFloat) : s$0;
      }
      caml_call1(
        Stdlib_Printexc[9],
        function(e) {
          if (e instanceof error_constr) return [0, to_string(e)];
          if (e[1] !== Error2) return 0;
          var e$0 = e[2];
          return [0, to_string(e$0)];
        }
      );
      var cst_function = "function";
      function export_js(field, x2) {
        var _f_ = caml_string_of_jsstring2(typeof x2);
        a: {
          if (caml_call2(Js_of_ocaml_Import[3][64], _f_, cst_function) && 0 < x2.length) {
            var _g_ = caml_js_wrap_callback2(x2);
            break a;
          }
          var _g_ = x2;
        }
        return jsoo_exports[field] = _g_;
      }
      function export$0(field, x2) {
        return export_js(runtime.caml_jsstring_of_string(field), x2);
      }
      function export_all(obj) {
        var keys = object_constructor.keys(obj), t25 = caml_js_wrap_callback2(function(key, _e_, param) {
          return export_js(key, obj[key]);
        });
        return keys.forEach(t25);
      }
      var Js_of_ocaml_Js = [
        0,
        null$0,
        function(_d_) {
          return _d_;
        },
        undefined$0,
        function(_c_) {
          return _c_;
        },
        Opt,
        Optdef,
        true$0,
        false$0,
        nfd,
        nfc,
        nfkd,
        nfkc,
        string_constr,
        regExp,
        regExp,
        regExp,
        object_keys,
        array_constructor,
        array_constructor,
        array_get,
        array_set,
        array_map,
        array_mapi,
        str_array,
        match_result,
        date_constr,
        date_constr,
        date_constr,
        date_constr,
        date_constr,
        date_constr,
        date_constr,
        date_constr,
        date_constr,
        math,
        error_constr,
        [
          0,
          to_string,
          name,
          message,
          stack,
          raise,
          exn_with_js_backtrace,
          of_exn,
          Error2,
          function(_b_) {
            return _b_;
          },
          function(_a_) {
            return _a_;
          }
        ],
        JSON,
        decodeURI,
        decodeURIComponent,
        encodeURI,
        encodeURIComponent,
        escape,
        unescape,
        isNaN,
        parseInt,
        parseFloat,
        coerce,
        coerce_opt,
        export$0,
        export_all,
        Unsafe,
        string_of_error,
        raise_js_error,
        exn_with_js_backtrace,
        runtime.caml_js_error_of_exception,
        Error2
      ];
      runtime.caml_register_global(42, Js_of_ocaml_Js, "Js_of_ocaml__Js");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime, caml_js_wrap_meth_callback2 = runtime.caml_js_wrap_meth_callback;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      function caml_call2(f, a0, a1) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 2 ? f(a0, a1) : runtime.caml_call_gen(f, [a0, a1]);
      }
      function caml_call3(f, a0, a1, a2) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 3 ? f(a0, a1, a2) : runtime.caml_call_gen(f, [a0, a1, a2]);
      }
      var global_data = runtime.caml_get_global_data(), mod_name = "pyfinalo";
      global_data.CamlinternalOO;
      var Js_of_ocaml_Js = global_data.Js_of_ocaml__Js, Stdlib_Format = global_data.Stdlib__Format, Lib_pyfinalo_Lang = global_data.Lib_pyfinalo__Lang, Lib_pyfinalo_Interp = global_data.Lib_pyfinalo__Interp, vpp = caml_call1(Lib_pyfinalo_Interp[4][7], Lib_pyfinalo_Lang[3]), _b_ = Lib_pyfinalo_Interp[4], _a_ = [0, [15, 0], "%a"], _c_ = _b_[6], _d_ = _b_[5], _e_ = _b_[4], _f_ = _b_[2], _g_ = _b_[1];
      function t14(param, e) {
        return caml_call1(_c_, e);
      }
      function t13(param, e1, e2) {
        return caml_call2(_d_, e1, e2);
      }
      function t12(param, e1, e2) {
        return caml_call2(_e_, e1, e2);
      }
      function t11(param, x2) {
        return caml_call1(_g_, x2 | 0);
      }
      function t10(param, s2) {
        return caml_call1(_f_, runtime.caml_string_of_jsstring(s2));
      }
      function t9(param, e) {
        return runtime.caml_jsstring_of_string(caml_call3(Stdlib_Format[147], _a_, vpp, e));
      }
      caml_call2(
        Js_of_ocaml_Js[50],
        mod_name,
        {
          desc: "CheckingDirectValInterp",
          show: caml_js_wrap_meth_callback2(t9),
          str: caml_js_wrap_meth_callback2(t10),
          int: caml_js_wrap_meth_callback2(t11),
          add: caml_js_wrap_meth_callback2(t12),
          mul: caml_js_wrap_meth_callback2(t13),
          len: caml_js_wrap_meth_callback2(t14)
        }
      );
      var Dune_exe_Lib_pyfinalo_js = [0];
      runtime.caml_register_global(18, Dune_exe_Lib_pyfinalo_js, "Dune__exe__Lib_pyfinalo_js");
      return;
    })(globalThis);
    (function(globalThis2) {
      "use strict";
      var runtime = globalThis2.jsoo_runtime;
      function caml_call1(f, a0) {
        return (f.l >= 0 ? f.l : f.l = f.length) === 1 ? f(a0) : runtime.caml_call_gen(f, [a0]);
      }
      var global_data = runtime.caml_get_global_data(), Stdlib = global_data.Stdlib;
      caml_call1(Stdlib[103], 0);
      var Std_exit = [0];
      runtime.caml_register_global(1, Std_exit, "Std_exit");
      return;
    })(globalThis);
  }
});
var raw_default = require_lib_pyfinalo_js_bc();

// wrapper.js
var pyfinalo = raw_default.pyfinalo;
var wrapper_default = pyfinalo;
export {
  wrapper_default as default,
  pyfinalo
};

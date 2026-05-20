(function () {
  const O = document.createElement("link").relList;
  if (O && O.supports && O.supports("modulepreload")) return;
  for (const C of document.querySelectorAll('link[rel="modulepreload"]')) d(C);
  new MutationObserver((C) => {
    for (const X of C)
      if (X.type === "childList")
        for (const L of X.addedNodes)
          L.tagName === "LINK" && L.rel === "modulepreload" && d(L);
  }).observe(document, { childList: !0, subtree: !0 });
  function N(C) {
    const X = {};
    return (
      C.integrity && (X.integrity = C.integrity),
      C.referrerPolicy && (X.referrerPolicy = C.referrerPolicy),
      C.crossOrigin === "use-credentials"
        ? (X.credentials = "include")
        : C.crossOrigin === "anonymous"
          ? (X.credentials = "omit")
          : (X.credentials = "same-origin"),
      X
    );
  }
  function d(C) {
    if (C.ep) return;
    C.ep = !0;
    const X = N(C);
    fetch(C.href, X);
  }
})();
var of = { exports: {} },
  Eu = {};
var Ar;
function dy() {
  if (Ar) return Eu;
  Ar = 1;
  var g = Symbol.for("react.transitional.element"),
    O = Symbol.for("react.fragment");
  function N(d, C, X) {
    var L = null;
    if (
      (X !== void 0 && (L = "" + X),
      C.key !== void 0 && (L = "" + C.key),
      "key" in C)
    ) {
      X = {};
      for (var ll in C) ll !== "key" && (X[ll] = C[ll]);
    } else X = C;
    return (
      (C = X.ref),
      { $$typeof: g, type: d, key: L, ref: C !== void 0 ? C : null, props: X }
    );
  }
  return ((Eu.Fragment = O), (Eu.jsx = N), (Eu.jsxs = N), Eu);
}
var zr;
function ry() {
  return (zr || ((zr = 1), (of.exports = dy())), of.exports);
}
var r = ry(),
  df = { exports: {} },
  V = {};
var pr;
function my() {
  if (pr) return V;
  pr = 1;
  var g = Symbol.for("react.transitional.element"),
    O = Symbol.for("react.portal"),
    N = Symbol.for("react.fragment"),
    d = Symbol.for("react.strict_mode"),
    C = Symbol.for("react.profiler"),
    X = Symbol.for("react.consumer"),
    L = Symbol.for("react.context"),
    ll = Symbol.for("react.forward_ref"),
    D = Symbol.for("react.suspense"),
    b = Symbol.for("react.memo"),
    J = Symbol.for("react.lazy"),
    H = Symbol.for("react.activity"),
    W = Symbol.iterator;
  function El(o) {
    return o === null || typeof o != "object"
      ? null
      : ((o = (W && o[W]) || o["@@iterator"]),
        typeof o == "function" ? o : null);
  }
  var tl = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    q = Object.assign,
    dl = {};
  function jl(o, T, M) {
    ((this.props = o),
      (this.context = T),
      (this.refs = dl),
      (this.updater = M || tl));
  }
  ((jl.prototype.isReactComponent = {}),
    (jl.prototype.setState = function (o, T) {
      if (typeof o != "object" && typeof o != "function" && o != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, o, T, "setState");
    }),
    (jl.prototype.forceUpdate = function (o) {
      this.updater.enqueueForceUpdate(this, o, "forceUpdate");
    }));
  function xl() {}
  xl.prototype = jl.prototype;
  function Al(o, T, M) {
    ((this.props = o),
      (this.context = T),
      (this.refs = dl),
      (this.updater = M || tl));
  }
  var Wl = (Al.prototype = new xl());
  ((Wl.constructor = Al), q(Wl, jl.prototype), (Wl.isPureReactComponent = !0));
  var $l = Array.isArray;
  function Bl() {}
  var $ = { H: null, A: null, T: null, S: null },
    ql = Object.prototype.hasOwnProperty;
  function et(o, T, M) {
    var x = M.ref;
    return {
      $$typeof: g,
      type: o,
      key: T,
      ref: x !== void 0 ? x : null,
      props: M,
    };
  }
  function Yl(o, T) {
    return et(o.type, T, o.props);
  }
  function yt(o) {
    return typeof o == "object" && o !== null && o.$$typeof === g;
  }
  function Vl(o) {
    var T = { "=": "=0", ":": "=2" };
    return (
      "$" +
      o.replace(/[=:]/g, function (M) {
        return T[M];
      })
    );
  }
  var Ut = /\/+/g;
  function Nt(o, T) {
    return typeof o == "object" && o !== null && o.key != null
      ? Vl("" + o.key)
      : T.toString(36);
  }
  function ut(o) {
    switch (o.status) {
      case "fulfilled":
        return o.value;
      case "rejected":
        throw o.reason;
      default:
        switch (
          (typeof o.status == "string"
            ? o.then(Bl, Bl)
            : ((o.status = "pending"),
              o.then(
                function (T) {
                  o.status === "pending" &&
                    ((o.status = "fulfilled"), (o.value = T));
                },
                function (T) {
                  o.status === "pending" &&
                    ((o.status = "rejected"), (o.reason = T));
                },
              )),
          o.status)
        ) {
          case "fulfilled":
            return o.value;
          case "rejected":
            throw o.reason;
        }
    }
    throw o;
  }
  function A(o, T, M, x, Q) {
    var _ = typeof o;
    (_ === "undefined" || _ === "boolean") && (o = null);
    var Z = !1;
    if (o === null) Z = !0;
    else
      switch (_) {
        case "bigint":
        case "string":
        case "number":
          Z = !0;
          break;
        case "object":
          switch (o.$$typeof) {
            case g:
            case O:
              Z = !0;
              break;
            case J:
              return ((Z = o._init), A(Z(o._payload), T, M, x, Q));
          }
      }
    if (Z)
      return (
        (Q = Q(o)),
        (Z = x === "" ? "." + Nt(o, 0) : x),
        $l(Q)
          ? ((M = ""),
            Z != null && (M = Z.replace(Ut, "$&/") + "/"),
            A(Q, T, M, "", function (_e) {
              return _e;
            }))
          : Q != null &&
            (yt(Q) &&
              (Q = Yl(
                Q,
                M +
                  (Q.key == null || (o && o.key === Q.key)
                    ? ""
                    : ("" + Q.key).replace(Ut, "$&/") + "/") +
                  Z,
              )),
            T.push(Q)),
        1
      );
    Z = 0;
    var Sl = x === "" ? "." : x + ":";
    if ($l(o))
      for (var Tl = 0; Tl < o.length; Tl++)
        ((x = o[Tl]), (_ = Sl + Nt(x, Tl)), (Z += A(x, T, M, _, Q)));
    else if (((Tl = El(o)), typeof Tl == "function"))
      for (o = Tl.call(o), Tl = 0; !(x = o.next()).done; )
        ((x = x.value), (_ = Sl + Nt(x, Tl++)), (Z += A(x, T, M, _, Q)));
    else if (_ === "object") {
      if (typeof o.then == "function") return A(ut(o), T, M, x, Q);
      throw (
        (T = String(o)),
        Error(
          "Objects are not valid as a React child (found: " +
            (T === "[object Object]"
              ? "object with keys {" + Object.keys(o).join(", ") + "}"
              : T) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return Z;
  }
  function R(o, T, M) {
    if (o == null) return o;
    var x = [],
      Q = 0;
    return (
      A(o, x, "", "", function (_) {
        return T.call(M, _, Q++);
      }),
      x
    );
  }
  function Y(o) {
    if (o._status === -1) {
      var T = o._result;
      ((T = T()),
        T.then(
          function (M) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 1), (o._result = M));
          },
          function (M) {
            (o._status === 0 || o._status === -1) &&
              ((o._status = 2), (o._result = M));
          },
        ),
        o._status === -1 && ((o._status = 0), (o._result = T)));
    }
    if (o._status === 1) return o._result.default;
    throw o._result;
  }
  var nl =
      typeof reportError == "function"
        ? reportError
        : function (o) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var T = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof o == "object" &&
                  o !== null &&
                  typeof o.message == "string"
                    ? String(o.message)
                    : String(o),
                error: o,
              });
              if (!window.dispatchEvent(T)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", o);
              return;
            }
            console.error(o);
          },
    il = {
      map: R,
      forEach: function (o, T, M) {
        R(
          o,
          function () {
            T.apply(this, arguments);
          },
          M,
        );
      },
      count: function (o) {
        var T = 0;
        return (
          R(o, function () {
            T++;
          }),
          T
        );
      },
      toArray: function (o) {
        return (
          R(o, function (T) {
            return T;
          }) || []
        );
      },
      only: function (o) {
        if (!yt(o))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return o;
      },
    };
  return (
    (V.Activity = H),
    (V.Children = il),
    (V.Component = jl),
    (V.Fragment = N),
    (V.Profiler = C),
    (V.PureComponent = Al),
    (V.StrictMode = d),
    (V.Suspense = D),
    (V.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = $),
    (V.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (o) {
        return $.H.useMemoCache(o);
      },
    }),
    (V.cache = function (o) {
      return function () {
        return o.apply(null, arguments);
      };
    }),
    (V.cacheSignal = function () {
      return null;
    }),
    (V.cloneElement = function (o, T, M) {
      if (o == null)
        throw Error(
          "The argument must be a React element, but you passed " + o + ".",
        );
      var x = q({}, o.props),
        Q = o.key;
      if (T != null)
        for (_ in (T.key !== void 0 && (Q = "" + T.key), T))
          !ql.call(T, _) ||
            _ === "key" ||
            _ === "__self" ||
            _ === "__source" ||
            (_ === "ref" && T.ref === void 0) ||
            (x[_] = T[_]);
      var _ = arguments.length - 2;
      if (_ === 1) x.children = M;
      else if (1 < _) {
        for (var Z = Array(_), Sl = 0; Sl < _; Sl++) Z[Sl] = arguments[Sl + 2];
        x.children = Z;
      }
      return et(o.type, Q, x);
    }),
    (V.createContext = function (o) {
      return (
        (o = {
          $$typeof: L,
          _currentValue: o,
          _currentValue2: o,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (o.Provider = o),
        (o.Consumer = { $$typeof: X, _context: o }),
        o
      );
    }),
    (V.createElement = function (o, T, M) {
      var x,
        Q = {},
        _ = null;
      if (T != null)
        for (x in (T.key !== void 0 && (_ = "" + T.key), T))
          ql.call(T, x) &&
            x !== "key" &&
            x !== "__self" &&
            x !== "__source" &&
            (Q[x] = T[x]);
      var Z = arguments.length - 2;
      if (Z === 1) Q.children = M;
      else if (1 < Z) {
        for (var Sl = Array(Z), Tl = 0; Tl < Z; Tl++)
          Sl[Tl] = arguments[Tl + 2];
        Q.children = Sl;
      }
      if (o && o.defaultProps)
        for (x in ((Z = o.defaultProps), Z)) Q[x] === void 0 && (Q[x] = Z[x]);
      return et(o, _, Q);
    }),
    (V.createRef = function () {
      return { current: null };
    }),
    (V.forwardRef = function (o) {
      return { $$typeof: ll, render: o };
    }),
    (V.isValidElement = yt),
    (V.lazy = function (o) {
      return { $$typeof: J, _payload: { _status: -1, _result: o }, _init: Y };
    }),
    (V.memo = function (o, T) {
      return { $$typeof: b, type: o, compare: T === void 0 ? null : T };
    }),
    (V.startTransition = function (o) {
      var T = $.T,
        M = {};
      $.T = M;
      try {
        var x = o(),
          Q = $.S;
        (Q !== null && Q(M, x),
          typeof x == "object" &&
            x !== null &&
            typeof x.then == "function" &&
            x.then(Bl, nl));
      } catch (_) {
        nl(_);
      } finally {
        (T !== null && M.types !== null && (T.types = M.types), ($.T = T));
      }
    }),
    (V.unstable_useCacheRefresh = function () {
      return $.H.useCacheRefresh();
    }),
    (V.use = function (o) {
      return $.H.use(o);
    }),
    (V.useActionState = function (o, T, M) {
      return $.H.useActionState(o, T, M);
    }),
    (V.useCallback = function (o, T) {
      return $.H.useCallback(o, T);
    }),
    (V.useContext = function (o) {
      return $.H.useContext(o);
    }),
    (V.useDebugValue = function () {}),
    (V.useDeferredValue = function (o, T) {
      return $.H.useDeferredValue(o, T);
    }),
    (V.useEffect = function (o, T) {
      return $.H.useEffect(o, T);
    }),
    (V.useEffectEvent = function (o) {
      return $.H.useEffectEvent(o);
    }),
    (V.useId = function () {
      return $.H.useId();
    }),
    (V.useImperativeHandle = function (o, T, M) {
      return $.H.useImperativeHandle(o, T, M);
    }),
    (V.useInsertionEffect = function (o, T) {
      return $.H.useInsertionEffect(o, T);
    }),
    (V.useLayoutEffect = function (o, T) {
      return $.H.useLayoutEffect(o, T);
    }),
    (V.useMemo = function (o, T) {
      return $.H.useMemo(o, T);
    }),
    (V.useOptimistic = function (o, T) {
      return $.H.useOptimistic(o, T);
    }),
    (V.useReducer = function (o, T, M) {
      return $.H.useReducer(o, T, M);
    }),
    (V.useRef = function (o) {
      return $.H.useRef(o);
    }),
    (V.useState = function (o) {
      return $.H.useState(o);
    }),
    (V.useSyncExternalStore = function (o, T, M) {
      return $.H.useSyncExternalStore(o, T, M);
    }),
    (V.useTransition = function () {
      return $.H.useTransition();
    }),
    (V.version = "19.2.0"),
    V
  );
}
var Tr;
function gf() {
  return (Tr || ((Tr = 1), (df.exports = my())), df.exports);
}
var ol = gf(),
  rf = { exports: {} },
  Au = {},
  mf = { exports: {} },
  hf = {};
var Or;
function hy() {
  return (
    Or ||
      ((Or = 1),
      (function (g) {
        function O(A, R) {
          var Y = A.length;
          A.push(R);
          l: for (; 0 < Y; ) {
            var nl = (Y - 1) >>> 1,
              il = A[nl];
            if (0 < C(il, R)) ((A[nl] = R), (A[Y] = il), (Y = nl));
            else break l;
          }
        }
        function N(A) {
          return A.length === 0 ? null : A[0];
        }
        function d(A) {
          if (A.length === 0) return null;
          var R = A[0],
            Y = A.pop();
          if (Y !== R) {
            A[0] = Y;
            l: for (var nl = 0, il = A.length, o = il >>> 1; nl < o; ) {
              var T = 2 * (nl + 1) - 1,
                M = A[T],
                x = T + 1,
                Q = A[x];
              if (0 > C(M, Y))
                x < il && 0 > C(Q, M)
                  ? ((A[nl] = Q), (A[x] = Y), (nl = x))
                  : ((A[nl] = M), (A[T] = Y), (nl = T));
              else if (x < il && 0 > C(Q, Y))
                ((A[nl] = Q), (A[x] = Y), (nl = x));
              else break l;
            }
          }
          return R;
        }
        function C(A, R) {
          var Y = A.sortIndex - R.sortIndex;
          return Y !== 0 ? Y : A.id - R.id;
        }
        if (
          ((g.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var X = performance;
          g.unstable_now = function () {
            return X.now();
          };
        } else {
          var L = Date,
            ll = L.now();
          g.unstable_now = function () {
            return L.now() - ll;
          };
        }
        var D = [],
          b = [],
          J = 1,
          H = null,
          W = 3,
          El = !1,
          tl = !1,
          q = !1,
          dl = !1,
          jl = typeof setTimeout == "function" ? setTimeout : null,
          xl = typeof clearTimeout == "function" ? clearTimeout : null,
          Al = typeof setImmediate < "u" ? setImmediate : null;
        function Wl(A) {
          for (var R = N(b); R !== null; ) {
            if (R.callback === null) d(b);
            else if (R.startTime <= A)
              (d(b), (R.sortIndex = R.expirationTime), O(D, R));
            else break;
            R = N(b);
          }
        }
        function $l(A) {
          if (((q = !1), Wl(A), !tl))
            if (N(D) !== null) ((tl = !0), Bl || ((Bl = !0), Vl()));
            else {
              var R = N(b);
              R !== null && ut($l, R.startTime - A);
            }
        }
        var Bl = !1,
          $ = -1,
          ql = 5,
          et = -1;
        function Yl() {
          return dl ? !0 : !(g.unstable_now() - et < ql);
        }
        function yt() {
          if (((dl = !1), Bl)) {
            var A = g.unstable_now();
            et = A;
            var R = !0;
            try {
              l: {
                ((tl = !1), q && ((q = !1), xl($), ($ = -1)), (El = !0));
                var Y = W;
                try {
                  t: {
                    for (
                      Wl(A), H = N(D);
                      H !== null && !(H.expirationTime > A && Yl());
                    ) {
                      var nl = H.callback;
                      if (typeof nl == "function") {
                        ((H.callback = null), (W = H.priorityLevel));
                        var il = nl(H.expirationTime <= A);
                        if (((A = g.unstable_now()), typeof il == "function")) {
                          ((H.callback = il), Wl(A), (R = !0));
                          break t;
                        }
                        (H === N(D) && d(D), Wl(A));
                      } else d(D);
                      H = N(D);
                    }
                    if (H !== null) R = !0;
                    else {
                      var o = N(b);
                      (o !== null && ut($l, o.startTime - A), (R = !1));
                    }
                  }
                  break l;
                } finally {
                  ((H = null), (W = Y), (El = !1));
                }
                R = void 0;
              }
            } finally {
              R ? Vl() : (Bl = !1);
            }
          }
        }
        var Vl;
        if (typeof Al == "function")
          Vl = function () {
            Al(yt);
          };
        else if (typeof MessageChannel < "u") {
          var Ut = new MessageChannel(),
            Nt = Ut.port2;
          ((Ut.port1.onmessage = yt),
            (Vl = function () {
              Nt.postMessage(null);
            }));
        } else
          Vl = function () {
            jl(yt, 0);
          };
        function ut(A, R) {
          $ = jl(function () {
            A(g.unstable_now());
          }, R);
        }
        ((g.unstable_IdlePriority = 5),
          (g.unstable_ImmediatePriority = 1),
          (g.unstable_LowPriority = 4),
          (g.unstable_NormalPriority = 3),
          (g.unstable_Profiling = null),
          (g.unstable_UserBlockingPriority = 2),
          (g.unstable_cancelCallback = function (A) {
            A.callback = null;
          }),
          (g.unstable_forceFrameRate = function (A) {
            0 > A || 125 < A
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (ql = 0 < A ? Math.floor(1e3 / A) : 5);
          }),
          (g.unstable_getCurrentPriorityLevel = function () {
            return W;
          }),
          (g.unstable_next = function (A) {
            switch (W) {
              case 1:
              case 2:
              case 3:
                var R = 3;
                break;
              default:
                R = W;
            }
            var Y = W;
            W = R;
            try {
              return A();
            } finally {
              W = Y;
            }
          }),
          (g.unstable_requestPaint = function () {
            dl = !0;
          }),
          (g.unstable_runWithPriority = function (A, R) {
            switch (A) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                A = 3;
            }
            var Y = W;
            W = A;
            try {
              return R();
            } finally {
              W = Y;
            }
          }),
          (g.unstable_scheduleCallback = function (A, R, Y) {
            var nl = g.unstable_now();
            switch (
              (typeof Y == "object" && Y !== null
                ? ((Y = Y.delay),
                  (Y = typeof Y == "number" && 0 < Y ? nl + Y : nl))
                : (Y = nl),
              A)
            ) {
              case 1:
                var il = -1;
                break;
              case 2:
                il = 250;
                break;
              case 5:
                il = 1073741823;
                break;
              case 4:
                il = 1e4;
                break;
              default:
                il = 5e3;
            }
            return (
              (il = Y + il),
              (A = {
                id: J++,
                callback: R,
                priorityLevel: A,
                startTime: Y,
                expirationTime: il,
                sortIndex: -1,
              }),
              Y > nl
                ? ((A.sortIndex = Y),
                  O(b, A),
                  N(D) === null &&
                    A === N(b) &&
                    (q ? (xl($), ($ = -1)) : (q = !0), ut($l, Y - nl)))
                : ((A.sortIndex = il),
                  O(D, A),
                  tl || El || ((tl = !0), Bl || ((Bl = !0), Vl()))),
              A
            );
          }),
          (g.unstable_shouldYield = Yl),
          (g.unstable_wrapCallback = function (A) {
            var R = W;
            return function () {
              var Y = W;
              W = R;
              try {
                return A.apply(this, arguments);
              } finally {
                W = Y;
              }
            };
          }));
      })(hf)),
    hf
  );
}
var Nr;
function yy() {
  return (Nr || ((Nr = 1), (mf.exports = hy())), mf.exports);
}
var yf = { exports: {} },
  Kl = {};
var _r;
function vy() {
  if (_r) return Kl;
  _r = 1;
  var g = gf();
  function O(D) {
    var b = "https://react.dev/errors/" + D;
    if (1 < arguments.length) {
      b += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var J = 2; J < arguments.length; J++)
        b += "&args[]=" + encodeURIComponent(arguments[J]);
    }
    return (
      "Minified React error #" +
      D +
      "; visit " +
      b +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function N() {}
  var d = {
      d: {
        f: N,
        r: function () {
          throw Error(O(522));
        },
        D: N,
        C: N,
        L: N,
        m: N,
        X: N,
        S: N,
        M: N,
      },
      p: 0,
      findDOMNode: null,
    },
    C = Symbol.for("react.portal");
  function X(D, b, J) {
    var H =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: C,
      key: H == null ? null : "" + H,
      children: D,
      containerInfo: b,
      implementation: J,
    };
  }
  var L = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function ll(D, b) {
    if (D === "font") return "";
    if (typeof b == "string") return b === "use-credentials" ? b : "";
  }
  return (
    (Kl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = d),
    (Kl.createPortal = function (D, b) {
      var J =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!b || (b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11))
        throw Error(O(299));
      return X(D, b, null, J);
    }),
    (Kl.flushSync = function (D) {
      var b = L.T,
        J = d.p;
      try {
        if (((L.T = null), (d.p = 2), D)) return D();
      } finally {
        ((L.T = b), (d.p = J), d.d.f());
      }
    }),
    (Kl.preconnect = function (D, b) {
      typeof D == "string" &&
        (b
          ? ((b = b.crossOrigin),
            (b =
              typeof b == "string"
                ? b === "use-credentials"
                  ? b
                  : ""
                : void 0))
          : (b = null),
        d.d.C(D, b));
    }),
    (Kl.prefetchDNS = function (D) {
      typeof D == "string" && d.d.D(D);
    }),
    (Kl.preinit = function (D, b) {
      if (typeof D == "string" && b && typeof b.as == "string") {
        var J = b.as,
          H = ll(J, b.crossOrigin),
          W = typeof b.integrity == "string" ? b.integrity : void 0,
          El = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
        J === "style"
          ? d.d.S(D, typeof b.precedence == "string" ? b.precedence : void 0, {
              crossOrigin: H,
              integrity: W,
              fetchPriority: El,
            })
          : J === "script" &&
            d.d.X(D, {
              crossOrigin: H,
              integrity: W,
              fetchPriority: El,
              nonce: typeof b.nonce == "string" ? b.nonce : void 0,
            });
      }
    }),
    (Kl.preinitModule = function (D, b) {
      if (typeof D == "string")
        if (typeof b == "object" && b !== null) {
          if (b.as == null || b.as === "script") {
            var J = ll(b.as, b.crossOrigin);
            d.d.M(D, {
              crossOrigin: J,
              integrity: typeof b.integrity == "string" ? b.integrity : void 0,
              nonce: typeof b.nonce == "string" ? b.nonce : void 0,
            });
          }
        } else b == null && d.d.M(D);
    }),
    (Kl.preload = function (D, b) {
      if (
        typeof D == "string" &&
        typeof b == "object" &&
        b !== null &&
        typeof b.as == "string"
      ) {
        var J = b.as,
          H = ll(J, b.crossOrigin);
        d.d.L(D, J, {
          crossOrigin: H,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0,
          nonce: typeof b.nonce == "string" ? b.nonce : void 0,
          type: typeof b.type == "string" ? b.type : void 0,
          fetchPriority:
            typeof b.fetchPriority == "string" ? b.fetchPriority : void 0,
          referrerPolicy:
            typeof b.referrerPolicy == "string" ? b.referrerPolicy : void 0,
          imageSrcSet:
            typeof b.imageSrcSet == "string" ? b.imageSrcSet : void 0,
          imageSizes: typeof b.imageSizes == "string" ? b.imageSizes : void 0,
          media: typeof b.media == "string" ? b.media : void 0,
        });
      }
    }),
    (Kl.preloadModule = function (D, b) {
      if (typeof D == "string")
        if (b) {
          var J = ll(b.as, b.crossOrigin);
          d.d.m(D, {
            as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
            crossOrigin: J,
            integrity: typeof b.integrity == "string" ? b.integrity : void 0,
          });
        } else d.d.m(D);
    }),
    (Kl.requestFormReset = function (D) {
      d.d.r(D);
    }),
    (Kl.unstable_batchedUpdates = function (D, b) {
      return D(b);
    }),
    (Kl.useFormState = function (D, b, J) {
      return L.H.useFormState(D, b, J);
    }),
    (Kl.useFormStatus = function () {
      return L.H.useHostTransitionStatus();
    }),
    (Kl.version = "19.2.0"),
    Kl
  );
}
var Dr;
function gy() {
  if (Dr) return yf.exports;
  Dr = 1;
  function g() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g);
      } catch (O) {
        console.error(O);
      }
  }
  return (g(), (yf.exports = vy()), yf.exports);
}
var Rr;
function Sy() {
  if (Rr) return Au;
  Rr = 1;
  var g = yy(),
    O = gf(),
    N = gy();
  function d(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function C(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function X(l) {
    var t = l,
      a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do ((t = l), (t.flags & 4098) !== 0 && (a = t.return), (l = t.return));
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function L(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function ll(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function D(l) {
    if (X(l) !== l) throw Error(d(188));
  }
  function b(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = X(l)), t === null)) throw Error(d(188));
      return t !== l ? null : l;
    }
    for (var a = l, e = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (((e = u.return), e !== null)) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return (D(u), l);
          if (n === e) return (D(u), t);
          n = n.sibling;
        }
        throw Error(d(188));
      }
      if (a.return !== e.return) ((a = u), (e = n));
      else {
        for (var c = !1, i = u.child; i; ) {
          if (i === a) {
            ((c = !0), (a = u), (e = n));
            break;
          }
          if (i === e) {
            ((c = !0), (e = u), (a = n));
            break;
          }
          i = i.sibling;
        }
        if (!c) {
          for (i = n.child; i; ) {
            if (i === a) {
              ((c = !0), (a = n), (e = u));
              break;
            }
            if (i === e) {
              ((c = !0), (e = n), (a = u));
              break;
            }
            i = i.sibling;
          }
          if (!c) throw Error(d(189));
        }
      }
      if (a.alternate !== e) throw Error(d(190));
    }
    if (a.tag !== 3) throw Error(d(188));
    return a.stateNode.current === a ? l : t;
  }
  function J(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = J(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var H = Object.assign,
    W = Symbol.for("react.element"),
    El = Symbol.for("react.transitional.element"),
    tl = Symbol.for("react.portal"),
    q = Symbol.for("react.fragment"),
    dl = Symbol.for("react.strict_mode"),
    jl = Symbol.for("react.profiler"),
    xl = Symbol.for("react.consumer"),
    Al = Symbol.for("react.context"),
    Wl = Symbol.for("react.forward_ref"),
    $l = Symbol.for("react.suspense"),
    Bl = Symbol.for("react.suspense_list"),
    $ = Symbol.for("react.memo"),
    ql = Symbol.for("react.lazy"),
    et = Symbol.for("react.activity"),
    Yl = Symbol.for("react.memo_cache_sentinel"),
    yt = Symbol.iterator;
  function Vl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (yt && l[yt]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var Ut = Symbol.for("react.client.reference");
  function Nt(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ut ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case q:
        return "Fragment";
      case jl:
        return "Profiler";
      case dl:
        return "StrictMode";
      case $l:
        return "Suspense";
      case Bl:
        return "SuspenseList";
      case et:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case tl:
          return "Portal";
        case Al:
          return l.displayName || "Context";
        case xl:
          return (l._context.displayName || "Context") + ".Consumer";
        case Wl:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case $:
          return (
            (t = l.displayName || null),
            t !== null ? t : Nt(l.type) || "Memo"
          );
        case ql:
          ((t = l._payload), (l = l._init));
          try {
            return Nt(l(t));
          } catch {}
      }
    return null;
  }
  var ut = Array.isArray,
    A = O.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    R = N.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Y = { pending: !1, data: null, method: null, action: null },
    nl = [],
    il = -1;
  function o(l) {
    return { current: l };
  }
  function T(l) {
    0 > il || ((l.current = nl[il]), (nl[il] = null), il--);
  }
  function M(l, t) {
    (il++, (nl[il] = l.current), (l.current = t));
  }
  var x = o(null),
    Q = o(null),
    _ = o(null),
    Z = o(null);
  function Sl(l, t) {
    switch ((M(_, t), M(Q, l), M(x, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Vd(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          ((t = Vd(t)), (l = Kd(t, l)));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    (T(x), M(x, l));
  }
  function Tl() {
    (T(x), T(Q), T(_));
  }
  function _e(l) {
    l.memoizedState !== null && M(Z, l);
    var t = x.current,
      a = Kd(t, l.type);
    t !== a && (M(Q, l), M(x, a));
  }
  function pu(l) {
    (Q.current === l && (T(x), T(Q)),
      Z.current === l && (T(Z), (vu._currentValue = Y)));
  }
  var Kn, bf;
  function Ta(l) {
    if (Kn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        ((Kn = (t && t[1]) || ""),
          (bf =
            -1 <
            a.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < a.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Kn +
      l +
      bf
    );
  }
  var Jn = !1;
  function wn(l, t) {
    if (!l || Jn) return "";
    Jn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var p = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(p.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(p, []);
                } catch (S) {
                  var v = S;
                }
                Reflect.construct(l, [], p);
              } else {
                try {
                  p.call();
                } catch (S) {
                  v = S;
                }
                l.call(p.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (S) {
                v = S;
              }
              (p = l()) &&
                typeof p.catch == "function" &&
                p.catch(function () {});
            }
          } catch (S) {
            if (S && v && typeof S.stack == "string") return [S.stack, v.stack];
          }
          return [null, null];
        },
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        e.DetermineComponentFrameRoot,
        "name",
      );
      u &&
        u.configurable &&
        Object.defineProperty(e.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var n = e.DetermineComponentFrameRoot(),
        c = n[0],
        i = n[1];
      if (c && i) {
        var f = c.split(`
`),
          y = i.split(`
`);
        for (
          u = e = 0;
          e < f.length && !f[e].includes("DetermineComponentFrameRoot");
        )
          e++;
        for (; u < y.length && !y[u].includes("DetermineComponentFrameRoot"); )
          u++;
        if (e === f.length || u === y.length)
          for (
            e = f.length - 1, u = y.length - 1;
            1 <= e && 0 <= u && f[e] !== y[u];
          )
            u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (f[e] !== y[u]) {
            if (e !== 1 || u !== 1)
              do
                if ((e--, u--, 0 > u || f[e] !== y[u])) {
                  var E =
                    `
` + f[e].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      E.includes("<anonymous>") &&
                      (E = E.replace("<anonymous>", l.displayName)),
                    E
                  );
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      ((Jn = !1), (Error.prepareStackTrace = a));
    }
    return (a = l ? l.displayName || l.name : "") ? Ta(a) : "";
  }
  function Qr(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ta(l.type);
      case 16:
        return Ta("Lazy");
      case 13:
        return l.child !== t && t !== null
          ? Ta("Suspense Fallback")
          : Ta("Suspense");
      case 19:
        return Ta("SuspenseList");
      case 0:
      case 15:
        return wn(l.type, !1);
      case 11:
        return wn(l.type.render, !1);
      case 1:
        return wn(l.type, !0);
      case 31:
        return Ta("Activity");
      default:
        return "";
    }
  }
  function Ef(l) {
    try {
      var t = "",
        a = null;
      do ((t += Qr(l, a)), (a = l), (l = l.return));
      while (l);
      return t;
    } catch (e) {
      return (
        `
Error generating stack: ` +
        e.message +
        `
` +
        e.stack
      );
    }
  }
  var Wn = Object.prototype.hasOwnProperty,
    $n = g.unstable_scheduleCallback,
    Fn = g.unstable_cancelCallback,
    Lr = g.unstable_shouldYield,
    Vr = g.unstable_requestPaint,
    nt = g.unstable_now,
    Kr = g.unstable_getCurrentPriorityLevel,
    Af = g.unstable_ImmediatePriority,
    zf = g.unstable_UserBlockingPriority,
    Tu = g.unstable_NormalPriority,
    Jr = g.unstable_LowPriority,
    pf = g.unstable_IdlePriority,
    wr = g.log,
    Wr = g.unstable_setDisableYieldValue,
    De = null,
    ct = null;
  function Pt(l) {
    if (
      (typeof wr == "function" && Wr(l),
      ct && typeof ct.setStrictMode == "function")
    )
      try {
        ct.setStrictMode(De, l);
      } catch {}
  }
  var it = Math.clz32 ? Math.clz32 : kr,
    $r = Math.log,
    Fr = Math.LN2;
  function kr(l) {
    return ((l >>>= 0), l === 0 ? 32 : (31 - (($r(l) / Fr) | 0)) | 0);
  }
  var Ou = 256,
    Nu = 262144,
    _u = 4194304;
  function Oa(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Du(l, t, a) {
    var e = l.pendingLanes;
    if (e === 0) return 0;
    var u = 0,
      n = l.suspendedLanes,
      c = l.pingedLanes;
    l = l.warmLanes;
    var i = e & 134217727;
    return (
      i !== 0
        ? ((e = i & ~n),
          e !== 0
            ? (u = Oa(e))
            : ((c &= i),
              c !== 0
                ? (u = Oa(c))
                : a || ((a = i & ~l), a !== 0 && (u = Oa(a)))))
        : ((i = e & ~n),
          i !== 0
            ? (u = Oa(i))
            : c !== 0
              ? (u = Oa(c))
              : a || ((a = e & ~l), a !== 0 && (u = Oa(a)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & n) === 0 &&
            ((n = u & -u),
            (a = t & -t),
            n >= a || (n === 32 && (a & 4194048) !== 0))
          ? t
          : u
    );
  }
  function Re(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Ir(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Tf() {
    var l = _u;
    return ((_u <<= 1), (_u & 62914560) === 0 && (_u = 4194304), l);
  }
  function kn(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function Me(l, t) {
    ((l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
  }
  function Pr(l, t, a, e, u, n) {
    var c = l.pendingLanes;
    ((l.pendingLanes = a),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= a),
      (l.entangledLanes &= a),
      (l.errorRecoveryDisabledLanes &= a),
      (l.shellSuspendCounter = 0));
    var i = l.entanglements,
      f = l.expirationTimes,
      y = l.hiddenUpdates;
    for (a = c & ~a; 0 < a; ) {
      var E = 31 - it(a),
        p = 1 << E;
      ((i[E] = 0), (f[E] = -1));
      var v = y[E];
      if (v !== null)
        for (y[E] = null, E = 0; E < v.length; E++) {
          var S = v[E];
          S !== null && (S.lane &= -536870913);
        }
      a &= ~p;
    }
    (e !== 0 && Of(l, e, 0),
      n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(c & ~t)));
  }
  function Of(l, t, a) {
    ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
    var e = 31 - it(t);
    ((l.entangledLanes |= t),
      (l.entanglements[e] = l.entanglements[e] | 1073741824 | (a & 261930)));
  }
  function Nf(l, t) {
    var a = (l.entangledLanes |= t);
    for (l = l.entanglements; a; ) {
      var e = 31 - it(a),
        u = 1 << e;
      ((u & t) | (l[e] & t) && (l[e] |= t), (a &= ~u));
    }
  }
  function _f(l, t) {
    var a = t & -t;
    return (
      (a = (a & 42) !== 0 ? 1 : In(a)),
      (a & (l.suspendedLanes | t)) !== 0 ? 0 : a
    );
  }
  function In(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Pn(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Df() {
    var l = R.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : hr(l.type));
  }
  function Rf(l, t) {
    var a = R.p;
    try {
      return ((R.p = l), t());
    } finally {
      R.p = a;
    }
  }
  var la = Math.random().toString(36).slice(2),
    Gl = "__reactFiber$" + la,
    Fl = "__reactProps$" + la,
    La = "__reactContainer$" + la,
    lc = "__reactEvents$" + la,
    lm = "__reactListeners$" + la,
    tm = "__reactHandles$" + la,
    Mf = "__reactResources$" + la,
    je = "__reactMarker$" + la;
  function tc(l) {
    (delete l[Gl], delete l[Fl], delete l[lc], delete l[lm], delete l[tm]);
  }
  function Va(l) {
    var t = l[Gl];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if ((t = a[La] || a[Gl])) {
        if (
          ((a = t.alternate),
          t.child !== null || (a !== null && a.child !== null))
        )
          for (l = Id(l); l !== null; ) {
            if ((a = l[Gl])) return a;
            l = Id(l);
          }
        return t;
      }
      ((l = a), (a = l.parentNode));
    }
    return null;
  }
  function Ka(l) {
    if ((l = l[Gl] || l[La])) {
      var t = l.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return l;
    }
    return null;
  }
  function xe(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(d(33));
  }
  function Ja(l) {
    var t = l[Mf];
    return (
      t ||
        (t = l[Mf] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Ul(l) {
    l[je] = !0;
  }
  var jf = new Set(),
    xf = {};
  function Na(l, t) {
    (wa(l, t), wa(l + "Capture", t));
  }
  function wa(l, t) {
    for (xf[l] = t, l = 0; l < t.length; l++) jf.add(t[l]);
  }
  var am = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Cf = {},
    Uf = {};
  function em(l) {
    return Wn.call(Uf, l)
      ? !0
      : Wn.call(Cf, l)
        ? !1
        : am.test(l)
          ? (Uf[l] = !0)
          : ((Cf[l] = !0), !1);
  }
  function Ru(l, t, a) {
    if (em(t))
      if (a === null) l.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var e = t.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
  }
  function Mu(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function Ht(l, t, a, e) {
    if (e === null) l.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + e);
    }
  }
  function vt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Hf(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function um(l, t, a) {
    var e = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof e < "u" &&
      typeof e.get == "function" &&
      typeof e.set == "function"
    ) {
      var u = e.get,
        n = e.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (c) {
            ((a = "" + c), n.call(this, c));
          },
        }),
        Object.defineProperty(l, t, { enumerable: e.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (c) {
            a = "" + c;
          },
          stopTracking: function () {
            ((l._valueTracker = null), delete l[t]);
          },
        }
      );
    }
  }
  function ac(l) {
    if (!l._valueTracker) {
      var t = Hf(l) ? "checked" : "value";
      l._valueTracker = um(l, t, "" + l[t]);
    }
  }
  function Bf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var a = t.getValue(),
      e = "";
    return (
      l && (e = Hf(l) ? (l.checked ? "true" : "false") : l.value),
      (l = e),
      l !== a ? (t.setValue(l), !0) : !1
    );
  }
  function ju(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var nm = /[\n"\\]/g;
  function gt(l) {
    return l.replace(nm, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function ec(l, t, a, e, u, n, c, i) {
    ((l.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (l.type = c)
        : l.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + vt(t))
          : l.value !== "" + vt(t) && (l.value = "" + vt(t))
        : (c !== "submit" && c !== "reset") || l.removeAttribute("value"),
      t != null
        ? uc(l, c, vt(t))
        : a != null
          ? uc(l, c, vt(a))
          : e != null && l.removeAttribute("value"),
      u == null && n != null && (l.defaultChecked = !!n),
      u != null &&
        (l.checked = u && typeof u != "function" && typeof u != "symbol"),
      i != null &&
      typeof i != "function" &&
      typeof i != "symbol" &&
      typeof i != "boolean"
        ? (l.name = "" + vt(i))
        : l.removeAttribute("name"));
  }
  function qf(l, t, a, e, u, n, c, i) {
    if (
      (n != null &&
        typeof n != "function" &&
        typeof n != "symbol" &&
        typeof n != "boolean" &&
        (l.type = n),
      t != null || a != null)
    ) {
      if (!((n !== "submit" && n !== "reset") || t != null)) {
        ac(l);
        return;
      }
      ((a = a != null ? "" + vt(a) : ""),
        (t = t != null ? "" + vt(t) : a),
        i || t === l.value || (l.value = t),
        (l.defaultValue = t));
    }
    ((e = e ?? u),
      (e = typeof e != "function" && typeof e != "symbol" && !!e),
      (l.checked = i ? l.checked : !!e),
      (l.defaultChecked = !!e),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (l.name = c),
      ac(l));
  }
  function uc(l, t, a) {
    (t === "number" && ju(l.ownerDocument) === l) ||
      l.defaultValue === "" + a ||
      (l.defaultValue = "" + a);
  }
  function Wa(l, t, a, e) {
    if (((l = l.options), t)) {
      t = {};
      for (var u = 0; u < a.length; u++) t["$" + a[u]] = !0;
      for (a = 0; a < l.length; a++)
        ((u = t.hasOwnProperty("$" + l[a].value)),
          l[a].selected !== u && (l[a].selected = u),
          u && e && (l[a].defaultSelected = !0));
    } else {
      for (a = "" + vt(a), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === a) {
          ((l[u].selected = !0), e && (l[u].defaultSelected = !0));
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Yf(l, t, a) {
    if (
      t != null &&
      ((t = "" + vt(t)), t !== l.value && (l.value = t), a == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + vt(a) : "";
  }
  function Gf(l, t, a, e) {
    if (t == null) {
      if (e != null) {
        if (a != null) throw Error(d(92));
        if (ut(e)) {
          if (1 < e.length) throw Error(d(93));
          e = e[0];
        }
        a = e;
      }
      (a == null && (a = ""), (t = a));
    }
    ((a = vt(t)),
      (l.defaultValue = a),
      (e = l.textContent),
      e === a && e !== "" && e !== null && (l.value = e),
      ac(l));
  }
  function $a(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var cm = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Zf(l, t, a) {
    var e = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === ""
      ? e
        ? l.setProperty(t, "")
        : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
      : e
        ? l.setProperty(t, a)
        : typeof a != "number" || a === 0 || cm.has(t)
          ? t === "float"
            ? (l.cssFloat = a)
            : (l[t] = ("" + a).trim())
          : (l[t] = a + "px");
  }
  function Xf(l, t, a) {
    if (t != null && typeof t != "object") throw Error(d(62));
    if (((l = l.style), a != null)) {
      for (var e in a)
        !a.hasOwnProperty(e) ||
          (t != null && t.hasOwnProperty(e)) ||
          (e.indexOf("--") === 0
            ? l.setProperty(e, "")
            : e === "float"
              ? (l.cssFloat = "")
              : (l[e] = ""));
      for (var u in t)
        ((e = t[u]), t.hasOwnProperty(u) && a[u] !== e && Zf(l, u, e));
    } else for (var n in t) t.hasOwnProperty(n) && Zf(l, n, t[n]);
  }
  function nc(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var im = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    fm =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function xu(l) {
    return fm.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function Bt() {}
  var cc = null;
  function ic(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var Fa = null,
    ka = null;
  function Qf(l) {
    var t = Ka(l);
    if (t && (l = t.stateNode)) {
      var a = l[Fl] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (ec(
              l,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
            ),
            (t = a.name),
            a.type === "radio" && t != null)
          ) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (
              a = a.querySelectorAll(
                'input[name="' + gt("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < a.length;
              t++
            ) {
              var e = a[t];
              if (e !== l && e.form === l.form) {
                var u = e[Fl] || null;
                if (!u) throw Error(d(90));
                ec(
                  e,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name,
                );
              }
            }
            for (t = 0; t < a.length; t++)
              ((e = a[t]), e.form === l.form && Bf(e));
          }
          break l;
        case "textarea":
          Yf(l, a.value, a.defaultValue);
          break l;
        case "select":
          ((t = a.value), t != null && Wa(l, !!a.multiple, t, !1));
      }
    }
  }
  var fc = !1;
  function Lf(l, t, a) {
    if (fc) return l(t, a);
    fc = !0;
    try {
      var e = l(t);
      return e;
    } finally {
      if (
        ((fc = !1),
        (Fa !== null || ka !== null) &&
          (En(), Fa && ((t = Fa), (l = ka), (ka = Fa = null), Qf(t), l)))
      )
        for (t = 0; t < l.length; t++) Qf(l[t]);
    }
  }
  function Ce(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var e = a[Fl] || null;
    if (e === null) return null;
    a = e[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((e = !e.disabled) ||
          ((l = l.type),
          (e = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !e));
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (a && typeof a != "function") throw Error(d(231, t, typeof a));
    return a;
  }
  var qt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    sc = !1;
  if (qt)
    try {
      var Ue = {};
      (Object.defineProperty(Ue, "passive", {
        get: function () {
          sc = !0;
        },
      }),
        window.addEventListener("test", Ue, Ue),
        window.removeEventListener("test", Ue, Ue));
    } catch {
      sc = !1;
    }
  var ta = null,
    oc = null,
    Cu = null;
  function Vf() {
    if (Cu) return Cu;
    var l,
      t = oc,
      a = t.length,
      e,
      u = "value" in ta ? ta.value : ta.textContent,
      n = u.length;
    for (l = 0; l < a && t[l] === u[l]; l++);
    var c = a - l;
    for (e = 1; e <= c && t[a - e] === u[n - e]; e++);
    return (Cu = u.slice(l, 1 < e ? 1 - e : void 0));
  }
  function Uu(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Hu() {
    return !0;
  }
  function Kf() {
    return !1;
  }
  function kl(l) {
    function t(a, e, u, n, c) {
      ((this._reactName = a),
        (this._targetInst = u),
        (this.type = e),
        (this.nativeEvent = n),
        (this.target = c),
        (this.currentTarget = null));
      for (var i in l)
        l.hasOwnProperty(i) && ((a = l[i]), (this[i] = a ? a(n) : n[i]));
      return (
        (this.isDefaultPrevented = (
          n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1
        )
          ? Hu
          : Kf),
        (this.isPropagationStopped = Kf),
        this
      );
    }
    return (
      H(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a &&
            (a.preventDefault
              ? a.preventDefault()
              : typeof a.returnValue != "unknown" && (a.returnValue = !1),
            (this.isDefaultPrevented = Hu));
        },
        stopPropagation: function () {
          var a = this.nativeEvent;
          a &&
            (a.stopPropagation
              ? a.stopPropagation()
              : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0),
            (this.isPropagationStopped = Hu));
        },
        persist: function () {},
        isPersistent: Hu,
      }),
      t
    );
  }
  var _a = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Bu = kl(_a),
    He = H({}, _a, { view: 0, detail: 0 }),
    sm = kl(He),
    dc,
    rc,
    Be,
    qu = H({}, He, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: hc,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== Be &&
              (Be && l.type === "mousemove"
                ? ((dc = l.screenX - Be.screenX), (rc = l.screenY - Be.screenY))
                : (rc = dc = 0),
              (Be = l)),
            dc);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : rc;
      },
    }),
    Jf = kl(qu),
    om = H({}, qu, { dataTransfer: 0 }),
    dm = kl(om),
    rm = H({}, He, { relatedTarget: 0 }),
    mc = kl(rm),
    mm = H({}, _a, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    hm = kl(mm),
    ym = H({}, _a, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    vm = kl(ym),
    gm = H({}, _a, { data: 0 }),
    wf = kl(gm),
    Sm = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    bm = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Em = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Am(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = Em[l])
        ? !!t[l]
        : !1;
  }
  function hc() {
    return Am;
  }
  var zm = H({}, He, {
      key: function (l) {
        if (l.key) {
          var t = Sm[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = Uu(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? bm[l.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: hc,
      charCode: function (l) {
        return l.type === "keypress" ? Uu(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? Uu(l)
          : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
      },
    }),
    pm = kl(zm),
    Tm = H({}, qu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Wf = kl(Tm),
    Om = H({}, He, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: hc,
    }),
    Nm = kl(Om),
    _m = H({}, _a, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Dm = kl(_m),
    Rm = H({}, qu, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
            ? -l.wheelDeltaX
            : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
              ? -l.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Mm = kl(Rm),
    jm = H({}, _a, { newState: 0, oldState: 0 }),
    xm = kl(jm),
    Cm = [9, 13, 27, 32],
    yc = qt && "CompositionEvent" in window,
    qe = null;
  qt && "documentMode" in document && (qe = document.documentMode);
  var Um = qt && "TextEvent" in window && !qe,
    $f = qt && (!yc || (qe && 8 < qe && 11 >= qe)),
    Ff = " ",
    kf = !1;
  function If(l, t) {
    switch (l) {
      case "keyup":
        return Cm.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Pf(l) {
    return (
      (l = l.detail),
      typeof l == "object" && "data" in l ? l.data : null
    );
  }
  var Ia = !1;
  function Hm(l, t) {
    switch (l) {
      case "compositionend":
        return Pf(t);
      case "keypress":
        return t.which !== 32 ? null : ((kf = !0), Ff);
      case "textInput":
        return ((l = t.data), l === Ff && kf ? null : l);
      default:
        return null;
    }
  }
  function Bm(l, t) {
    if (Ia)
      return l === "compositionend" || (!yc && If(l, t))
        ? ((l = Vf()), (Cu = oc = ta = null), (Ia = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return $f && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var qm = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ls(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!qm[l.type] : t === "textarea";
  }
  function ts(l, t, a, e) {
    (Fa ? (ka ? ka.push(e) : (ka = [e])) : (Fa = e),
      (t = _n(t, "onChange")),
      0 < t.length &&
        ((a = new Bu("onChange", "change", null, a, e)),
        l.push({ event: a, listeners: t })));
  }
  var Ye = null,
    Ge = null;
  function Ym(l) {
    Yd(l, 0);
  }
  function Yu(l) {
    var t = xe(l);
    if (Bf(t)) return l;
  }
  function as(l, t) {
    if (l === "change") return t;
  }
  var es = !1;
  if (qt) {
    var vc;
    if (qt) {
      var gc = "oninput" in document;
      if (!gc) {
        var us = document.createElement("div");
        (us.setAttribute("oninput", "return;"),
          (gc = typeof us.oninput == "function"));
      }
      vc = gc;
    } else vc = !1;
    es = vc && (!document.documentMode || 9 < document.documentMode);
  }
  function ns() {
    Ye && (Ye.detachEvent("onpropertychange", cs), (Ge = Ye = null));
  }
  function cs(l) {
    if (l.propertyName === "value" && Yu(Ge)) {
      var t = [];
      (ts(t, Ge, l, ic(l)), Lf(Ym, t));
    }
  }
  function Gm(l, t, a) {
    l === "focusin"
      ? (ns(), (Ye = t), (Ge = a), Ye.attachEvent("onpropertychange", cs))
      : l === "focusout" && ns();
  }
  function Zm(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Yu(Ge);
  }
  function Xm(l, t) {
    if (l === "click") return Yu(t);
  }
  function Qm(l, t) {
    if (l === "input" || l === "change") return Yu(t);
  }
  function Lm(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var ft = typeof Object.is == "function" ? Object.is : Lm;
  function Ze(l, t) {
    if (ft(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var a = Object.keys(l),
      e = Object.keys(t);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Wn.call(t, u) || !ft(l[u], t[u])) return !1;
    }
    return !0;
  }
  function is(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function fs(l, t) {
    var a = is(l);
    l = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (((e = l + a.textContent.length), l <= t && e >= t))
          return { node: a, offset: t - l };
        l = e;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = is(a);
    }
  }
  function ss(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? ss(l, t.parentNode)
            : "contains" in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function os(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = ju(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) l = t.contentWindow;
      else break;
      t = ju(l.document);
    }
    return t;
  }
  function Sc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var Vm = qt && "documentMode" in document && 11 >= document.documentMode,
    Pa = null,
    bc = null,
    Xe = null,
    Ec = !1;
  function ds(l, t, a) {
    var e =
      a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    Ec ||
      Pa == null ||
      Pa !== ju(e) ||
      ((e = Pa),
      "selectionStart" in e && Sc(e)
        ? (e = { start: e.selectionStart, end: e.selectionEnd })
        : ((e = (
            (e.ownerDocument && e.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (e = {
            anchorNode: e.anchorNode,
            anchorOffset: e.anchorOffset,
            focusNode: e.focusNode,
            focusOffset: e.focusOffset,
          })),
      (Xe && Ze(Xe, e)) ||
        ((Xe = e),
        (e = _n(bc, "onSelect")),
        0 < e.length &&
          ((t = new Bu("onSelect", "select", null, t, a)),
          l.push({ event: t, listeners: e }),
          (t.target = Pa))));
  }
  function Da(l, t) {
    var a = {};
    return (
      (a[l.toLowerCase()] = t.toLowerCase()),
      (a["Webkit" + l] = "webkit" + t),
      (a["Moz" + l] = "moz" + t),
      a
    );
  }
  var le = {
      animationend: Da("Animation", "AnimationEnd"),
      animationiteration: Da("Animation", "AnimationIteration"),
      animationstart: Da("Animation", "AnimationStart"),
      transitionrun: Da("Transition", "TransitionRun"),
      transitionstart: Da("Transition", "TransitionStart"),
      transitioncancel: Da("Transition", "TransitionCancel"),
      transitionend: Da("Transition", "TransitionEnd"),
    },
    Ac = {},
    rs = {};
  qt &&
    ((rs = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete le.animationend.animation,
      delete le.animationiteration.animation,
      delete le.animationstart.animation),
    "TransitionEvent" in window || delete le.transitionend.transition);
  function Ra(l) {
    if (Ac[l]) return Ac[l];
    if (!le[l]) return l;
    var t = le[l],
      a;
    for (a in t) if (t.hasOwnProperty(a) && a in rs) return (Ac[l] = t[a]);
    return l;
  }
  var ms = Ra("animationend"),
    hs = Ra("animationiteration"),
    ys = Ra("animationstart"),
    Km = Ra("transitionrun"),
    Jm = Ra("transitionstart"),
    wm = Ra("transitioncancel"),
    vs = Ra("transitionend"),
    gs = new Map(),
    zc =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  zc.push("scrollEnd");
  function _t(l, t) {
    (gs.set(l, t), Na(t, [l]));
  }
  var Gu =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" &&
                  l !== null &&
                  typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    St = [],
    te = 0,
    pc = 0;
  function Zu() {
    for (var l = te, t = (pc = te = 0); t < l; ) {
      var a = St[t];
      St[t++] = null;
      var e = St[t];
      St[t++] = null;
      var u = St[t];
      St[t++] = null;
      var n = St[t];
      if (((St[t++] = null), e !== null && u !== null)) {
        var c = e.pending;
        (c === null ? (u.next = u) : ((u.next = c.next), (c.next = u)),
          (e.pending = u));
      }
      n !== 0 && Ss(a, u, n);
    }
  }
  function Xu(l, t, a, e) {
    ((St[te++] = l),
      (St[te++] = t),
      (St[te++] = a),
      (St[te++] = e),
      (pc |= e),
      (l.lanes |= e),
      (l = l.alternate),
      l !== null && (l.lanes |= e));
  }
  function Tc(l, t, a, e) {
    return (Xu(l, t, a, e), Qu(l));
  }
  function Ma(l, t) {
    return (Xu(l, null, null, t), Qu(l));
  }
  function Ss(l, t, a) {
    l.lanes |= a;
    var e = l.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = l.return; n !== null; )
      ((n.childLanes |= a),
        (e = n.alternate),
        e !== null && (e.childLanes |= a),
        n.tag === 22 &&
          ((l = n.stateNode), l === null || l._visibility & 1 || (u = !0)),
        (l = n),
        (n = n.return));
    return l.tag === 3
      ? ((n = l.stateNode),
        u &&
          t !== null &&
          ((u = 31 - it(a)),
          (l = n.hiddenUpdates),
          (e = l[u]),
          e === null ? (l[u] = [t]) : e.push(t),
          (t.lane = a | 536870912)),
        n)
      : null;
  }
  function Qu(l) {
    if (50 < su) throw ((su = 0), (Ci = null), Error(d(185)));
    for (var t = l.return; t !== null; ) ((l = t), (t = l.return));
    return l.tag === 3 ? l.stateNode : null;
  }
  var ae = {};
  function Wm(l, t, a, e) {
    ((this.tag = l),
      (this.key = a),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = e),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function st(l, t, a, e) {
    return new Wm(l, t, a, e);
  }
  function Oc(l) {
    return ((l = l.prototype), !(!l || !l.isReactComponent));
  }
  function Yt(l, t) {
    var a = l.alternate;
    return (
      a === null
        ? ((a = st(l.tag, t, l.key, l.mode)),
          (a.elementType = l.elementType),
          (a.type = l.type),
          (a.stateNode = l.stateNode),
          (a.alternate = l),
          (l.alternate = a))
        : ((a.pendingProps = t),
          (a.type = l.type),
          (a.flags = 0),
          (a.subtreeFlags = 0),
          (a.deletions = null)),
      (a.flags = l.flags & 65011712),
      (a.childLanes = l.childLanes),
      (a.lanes = l.lanes),
      (a.child = l.child),
      (a.memoizedProps = l.memoizedProps),
      (a.memoizedState = l.memoizedState),
      (a.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (a.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (a.sibling = l.sibling),
      (a.index = l.index),
      (a.ref = l.ref),
      (a.refCleanup = l.refCleanup),
      a
    );
  }
  function bs(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return (
      a === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = a.childLanes),
          (l.lanes = a.lanes),
          (l.child = a.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = a.memoizedProps),
          (l.memoizedState = a.memoizedState),
          (l.updateQueue = a.updateQueue),
          (l.type = a.type),
          (t = a.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function Lu(l, t, a, e, u, n) {
    var c = 0;
    if (((e = l), typeof l == "function")) Oc(l) && (c = 1);
    else if (typeof l == "string")
      c = Ph(l, a, x.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
    else
      l: switch (l) {
        case et:
          return (
            (l = st(31, a, t, u)),
            (l.elementType = et),
            (l.lanes = n),
            l
          );
        case q:
          return ja(a.children, u, n, t);
        case dl:
          ((c = 8), (u |= 24));
          break;
        case jl:
          return (
            (l = st(12, a, t, u | 2)),
            (l.elementType = jl),
            (l.lanes = n),
            l
          );
        case $l:
          return (
            (l = st(13, a, t, u)),
            (l.elementType = $l),
            (l.lanes = n),
            l
          );
        case Bl:
          return (
            (l = st(19, a, t, u)),
            (l.elementType = Bl),
            (l.lanes = n),
            l
          );
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case Al:
                c = 10;
                break l;
              case xl:
                c = 9;
                break l;
              case Wl:
                c = 11;
                break l;
              case $:
                c = 14;
                break l;
              case ql:
                ((c = 16), (e = null));
                break l;
            }
          ((c = 29),
            (a = Error(d(130, l === null ? "null" : typeof l, ""))),
            (e = null));
      }
    return (
      (t = st(c, a, t, u)),
      (t.elementType = l),
      (t.type = e),
      (t.lanes = n),
      t
    );
  }
  function ja(l, t, a, e) {
    return ((l = st(7, l, e, t)), (l.lanes = a), l);
  }
  function Nc(l, t, a) {
    return ((l = st(6, l, null, t)), (l.lanes = a), l);
  }
  function Es(l) {
    var t = st(18, null, null, 0);
    return ((t.stateNode = l), t);
  }
  function _c(l, t, a) {
    return (
      (t = st(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = a),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var As = new WeakMap();
  function bt(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = As.get(l);
      return a !== void 0
        ? a
        : ((t = { value: l, source: t, stack: Ef(t) }), As.set(l, t), t);
    }
    return { value: l, source: t, stack: Ef(t) };
  }
  var ee = [],
    ue = 0,
    Vu = null,
    Qe = 0,
    Et = [],
    At = 0,
    aa = null,
    Mt = 1,
    jt = "";
  function Gt(l, t) {
    ((ee[ue++] = Qe), (ee[ue++] = Vu), (Vu = l), (Qe = t));
  }
  function zs(l, t, a) {
    ((Et[At++] = Mt), (Et[At++] = jt), (Et[At++] = aa), (aa = l));
    var e = Mt;
    l = jt;
    var u = 32 - it(e) - 1;
    ((e &= ~(1 << u)), (a += 1));
    var n = 32 - it(t) + u;
    if (30 < n) {
      var c = u - (u % 5);
      ((n = (e & ((1 << c) - 1)).toString(32)),
        (e >>= c),
        (u -= c),
        (Mt = (1 << (32 - it(t) + u)) | (a << u) | e),
        (jt = n + l));
    } else ((Mt = (1 << n) | (a << u) | e), (jt = l));
  }
  function Dc(l) {
    l.return !== null && (Gt(l, 1), zs(l, 1, 0));
  }
  function Rc(l) {
    for (; l === Vu; )
      ((Vu = ee[--ue]), (ee[ue] = null), (Qe = ee[--ue]), (ee[ue] = null));
    for (; l === aa; )
      ((aa = Et[--At]),
        (Et[At] = null),
        (jt = Et[--At]),
        (Et[At] = null),
        (Mt = Et[--At]),
        (Et[At] = null));
  }
  function ps(l, t) {
    ((Et[At++] = Mt),
      (Et[At++] = jt),
      (Et[At++] = aa),
      (Mt = t.id),
      (jt = t.overflow),
      (aa = l));
  }
  var Zl = null,
    vl = null,
    al = !1,
    ea = null,
    zt = !1,
    Mc = Error(d(519));
  function ua(l) {
    var t = Error(
      d(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Le(bt(t, l)), Mc);
  }
  function Ts(l) {
    var t = l.stateNode,
      a = l.type,
      e = l.memoizedProps;
    switch (((t[Gl] = l), (t[Fl] = e), a)) {
      case "dialog":
        (k("cancel", t), k("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        k("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < du.length; a++) k(du[a], t);
        break;
      case "source":
        k("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (k("error", t), k("load", t));
        break;
      case "details":
        k("toggle", t);
        break;
      case "input":
        (k("invalid", t),
          qf(
            t,
            e.value,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name,
            !0,
          ));
        break;
      case "select":
        k("invalid", t);
        break;
      case "textarea":
        (k("invalid", t), Gf(t, e.value, e.defaultValue, e.children));
    }
    ((a = e.children),
      (typeof a != "string" && typeof a != "number" && typeof a != "bigint") ||
      t.textContent === "" + a ||
      e.suppressHydrationWarning === !0 ||
      Qd(t.textContent, a)
        ? (e.popover != null && (k("beforetoggle", t), k("toggle", t)),
          e.onScroll != null && k("scroll", t),
          e.onScrollEnd != null && k("scrollend", t),
          e.onClick != null && (t.onclick = Bt),
          (t = !0))
        : (t = !1),
      t || ua(l, !0));
  }
  function Os(l) {
    for (Zl = l.return; Zl; )
      switch (Zl.tag) {
        case 5:
        case 31:
        case 13:
          zt = !1;
          return;
        case 27:
        case 3:
          zt = !0;
          return;
        default:
          Zl = Zl.return;
      }
  }
  function ne(l) {
    if (l !== Zl) return !1;
    if (!al) return (Os(l), (al = !0), !1);
    var t = l.tag,
      a;
    if (
      ((a = t !== 3 && t !== 27) &&
        ((a = t === 5) &&
          ((a = l.type),
          (a =
            !(a !== "form" && a !== "button") || Wi(l.type, l.memoizedProps))),
        (a = !a)),
      a && vl && ua(l),
      Os(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(d(317));
      vl = kd(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(d(317));
      vl = kd(l);
    } else
      t === 27
        ? ((t = vl), Sa(l.type) ? ((l = Pi), (Pi = null), (vl = l)) : (vl = t))
        : (vl = Zl ? Tt(l.stateNode.nextSibling) : null);
    return !0;
  }
  function xa() {
    ((vl = Zl = null), (al = !1));
  }
  function jc() {
    var l = ea;
    return (
      l !== null &&
        (tt === null ? (tt = l) : tt.push.apply(tt, l), (ea = null)),
      l
    );
  }
  function Le(l) {
    ea === null ? (ea = [l]) : ea.push(l);
  }
  var xc = o(null),
    Ca = null,
    Zt = null;
  function na(l, t, a) {
    (M(xc, t._currentValue), (t._currentValue = a));
  }
  function Xt(l) {
    ((l._currentValue = xc.current), T(xc));
  }
  function Cc(l, t, a) {
    for (; l !== null; ) {
      var e = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), e !== null && (e.childLanes |= t))
          : e !== null && (e.childLanes & t) !== t && (e.childLanes |= t),
        l === a)
      )
        break;
      l = l.return;
    }
  }
  function Uc(l, t, a, e) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var c = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var i = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (i.context === t[f]) {
              ((n.lanes |= a),
                (i = n.alternate),
                i !== null && (i.lanes |= a),
                Cc(n.return, a, l),
                e || (c = null));
              break l;
            }
          n = i.next;
        }
      } else if (u.tag === 18) {
        if (((c = u.return), c === null)) throw Error(d(341));
        ((c.lanes |= a),
          (n = c.alternate),
          n !== null && (n.lanes |= a),
          Cc(c, a, l),
          (c = null));
      } else c = u.child;
      if (c !== null) c.return = u;
      else
        for (c = u; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (((u = c.sibling), u !== null)) {
            ((u.return = c.return), (c = u));
            break;
          }
          c = c.return;
        }
      u = c;
    }
  }
  function ce(l, t, a, e) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var c = u.alternate;
        if (c === null) throw Error(d(387));
        if (((c = c.memoizedProps), c !== null)) {
          var i = u.type;
          ft(u.pendingProps.value, c.value) ||
            (l !== null ? l.push(i) : (l = [i]));
        }
      } else if (u === Z.current) {
        if (((c = u.alternate), c === null)) throw Error(d(387));
        c.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (l !== null ? l.push(vu) : (l = [vu]));
      }
      u = u.return;
    }
    (l !== null && Uc(t, l, a, e), (t.flags |= 262144));
  }
  function Ku(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!ft(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function Ua(l) {
    ((Ca = l),
      (Zt = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null));
  }
  function Xl(l) {
    return Ns(Ca, l);
  }
  function Ju(l, t) {
    return (Ca === null && Ua(l), Ns(l, t));
  }
  function Ns(l, t) {
    var a = t._currentValue;
    if (((t = { context: t, memoizedValue: a, next: null }), Zt === null)) {
      if (l === null) throw Error(d(308));
      ((Zt = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288));
    } else Zt = Zt.next = t;
    return a;
  }
  var $m =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (a, e) {
                  l.push(e);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                l.forEach(function (a) {
                  return a();
                }));
            };
          },
    Fm = g.unstable_scheduleCallback,
    km = g.unstable_NormalPriority,
    _l = {
      $$typeof: Al,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Hc() {
    return { controller: new $m(), data: new Map(), refCount: 0 };
  }
  function Ve(l) {
    (l.refCount--,
      l.refCount === 0 &&
        Fm(km, function () {
          l.controller.abort();
        }));
  }
  var Ke = null,
    Bc = 0,
    ie = 0,
    fe = null;
  function Im(l, t) {
    if (Ke === null) {
      var a = (Ke = []);
      ((Bc = 0),
        (ie = Gi()),
        (fe = {
          status: "pending",
          value: void 0,
          then: function (e) {
            a.push(e);
          },
        }));
    }
    return (Bc++, t.then(_s, _s), t);
  }
  function _s() {
    if (--Bc === 0 && Ke !== null) {
      fe !== null && (fe.status = "fulfilled");
      var l = Ke;
      ((Ke = null), (ie = 0), (fe = null));
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Pm(l, t) {
    var a = [],
      e = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          a.push(u);
        },
      };
    return (
      l.then(
        function () {
          ((e.status = "fulfilled"), (e.value = t));
          for (var u = 0; u < a.length; u++) (0, a[u])(t);
        },
        function (u) {
          for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++)
            (0, a[u])(void 0);
        },
      ),
      e
    );
  }
  var Ds = A.S;
  A.S = function (l, t) {
    ((rd = nt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        Im(l, t),
      Ds !== null && Ds(l, t));
  };
  var Ha = o(null);
  function qc() {
    var l = Ha.current;
    return l !== null ? l : yl.pooledCache;
  }
  function wu(l, t) {
    t === null ? M(Ha, Ha.current) : M(Ha, t.pool);
  }
  function Rs() {
    var l = qc();
    return l === null ? null : { parent: _l._currentValue, pool: l };
  }
  var se = Error(d(460)),
    Yc = Error(d(474)),
    Wu = Error(d(542)),
    $u = { then: function () {} };
  function Ms(l) {
    return ((l = l.status), l === "fulfilled" || l === "rejected");
  }
  function js(l, t, a) {
    switch (
      ((a = l[a]),
      a === void 0 ? l.push(t) : a !== t && (t.then(Bt, Bt), (t = a)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), Cs(l), l);
      default:
        if (typeof t.status == "string") t.then(Bt, Bt);
        else {
          if (((l = yl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(d(482));
          ((l = t),
            (l.status = "pending"),
            l.then(
              function (e) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "fulfilled"), (u.value = e));
                }
              },
              function (e) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "rejected"), (u.reason = e));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), Cs(l), l);
        }
        throw ((qa = t), se);
    }
  }
  function Ba(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function"
        ? ((qa = a), se)
        : a;
    }
  }
  var qa = null;
  function xs() {
    if (qa === null) throw Error(d(459));
    var l = qa;
    return ((qa = null), l);
  }
  function Cs(l) {
    if (l === se || l === Wu) throw Error(d(483));
  }
  var oe = null,
    Je = 0;
  function Fu(l) {
    var t = Je;
    return ((Je += 1), oe === null && (oe = []), js(oe, l, t));
  }
  function we(l, t) {
    ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
  }
  function ku(l, t) {
    throw t.$$typeof === W
      ? Error(d(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          d(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l,
          ),
        ));
  }
  function Us(l) {
    function t(m, s) {
      if (l) {
        var h = m.deletions;
        h === null ? ((m.deletions = [s]), (m.flags |= 16)) : h.push(s);
      }
    }
    function a(m, s) {
      if (!l) return null;
      for (; s !== null; ) (t(m, s), (s = s.sibling));
      return null;
    }
    function e(m) {
      for (var s = new Map(); m !== null; )
        (m.key !== null ? s.set(m.key, m) : s.set(m.index, m), (m = m.sibling));
      return s;
    }
    function u(m, s) {
      return ((m = Yt(m, s)), (m.index = 0), (m.sibling = null), m);
    }
    function n(m, s, h) {
      return (
        (m.index = h),
        l
          ? ((h = m.alternate),
            h !== null
              ? ((h = h.index), h < s ? ((m.flags |= 67108866), s) : h)
              : ((m.flags |= 67108866), s))
          : ((m.flags |= 1048576), s)
      );
    }
    function c(m) {
      return (l && m.alternate === null && (m.flags |= 67108866), m);
    }
    function i(m, s, h, z) {
      return s === null || s.tag !== 6
        ? ((s = Nc(h, m.mode, z)), (s.return = m), s)
        : ((s = u(s, h)), (s.return = m), s);
    }
    function f(m, s, h, z) {
      var B = h.type;
      return B === q
        ? E(m, s, h.props.children, z, h.key)
        : s !== null &&
            (s.elementType === B ||
              (typeof B == "object" &&
                B !== null &&
                B.$$typeof === ql &&
                Ba(B) === s.type))
          ? ((s = u(s, h.props)), we(s, h), (s.return = m), s)
          : ((s = Lu(h.type, h.key, h.props, null, m.mode, z)),
            we(s, h),
            (s.return = m),
            s);
    }
    function y(m, s, h, z) {
      return s === null ||
        s.tag !== 4 ||
        s.stateNode.containerInfo !== h.containerInfo ||
        s.stateNode.implementation !== h.implementation
        ? ((s = _c(h, m.mode, z)), (s.return = m), s)
        : ((s = u(s, h.children || [])), (s.return = m), s);
    }
    function E(m, s, h, z, B) {
      return s === null || s.tag !== 7
        ? ((s = ja(h, m.mode, z, B)), (s.return = m), s)
        : ((s = u(s, h)), (s.return = m), s);
    }
    function p(m, s, h) {
      if (
        (typeof s == "string" && s !== "") ||
        typeof s == "number" ||
        typeof s == "bigint"
      )
        return ((s = Nc("" + s, m.mode, h)), (s.return = m), s);
      if (typeof s == "object" && s !== null) {
        switch (s.$$typeof) {
          case El:
            return (
              (h = Lu(s.type, s.key, s.props, null, m.mode, h)),
              we(h, s),
              (h.return = m),
              h
            );
          case tl:
            return ((s = _c(s, m.mode, h)), (s.return = m), s);
          case ql:
            return ((s = Ba(s)), p(m, s, h));
        }
        if (ut(s) || Vl(s))
          return ((s = ja(s, m.mode, h, null)), (s.return = m), s);
        if (typeof s.then == "function") return p(m, Fu(s), h);
        if (s.$$typeof === Al) return p(m, Ju(m, s), h);
        ku(m, s);
      }
      return null;
    }
    function v(m, s, h, z) {
      var B = s !== null ? s.key : null;
      if (
        (typeof h == "string" && h !== "") ||
        typeof h == "number" ||
        typeof h == "bigint"
      )
        return B !== null ? null : i(m, s, "" + h, z);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case El:
            return h.key === B ? f(m, s, h, z) : null;
          case tl:
            return h.key === B ? y(m, s, h, z) : null;
          case ql:
            return ((h = Ba(h)), v(m, s, h, z));
        }
        if (ut(h) || Vl(h)) return B !== null ? null : E(m, s, h, z, null);
        if (typeof h.then == "function") return v(m, s, Fu(h), z);
        if (h.$$typeof === Al) return v(m, s, Ju(m, h), z);
        ku(m, h);
      }
      return null;
    }
    function S(m, s, h, z, B) {
      if (
        (typeof z == "string" && z !== "") ||
        typeof z == "number" ||
        typeof z == "bigint"
      )
        return ((m = m.get(h) || null), i(s, m, "" + z, B));
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case El:
            return (
              (m = m.get(z.key === null ? h : z.key) || null),
              f(s, m, z, B)
            );
          case tl:
            return (
              (m = m.get(z.key === null ? h : z.key) || null),
              y(s, m, z, B)
            );
          case ql:
            return ((z = Ba(z)), S(m, s, h, z, B));
        }
        if (ut(z) || Vl(z))
          return ((m = m.get(h) || null), E(s, m, z, B, null));
        if (typeof z.then == "function") return S(m, s, h, Fu(z), B);
        if (z.$$typeof === Al) return S(m, s, h, Ju(s, z), B);
        ku(s, z);
      }
      return null;
    }
    function j(m, s, h, z) {
      for (
        var B = null, el = null, U = s, w = (s = 0), P = null;
        U !== null && w < h.length;
        w++
      ) {
        U.index > w ? ((P = U), (U = null)) : (P = U.sibling);
        var ul = v(m, U, h[w], z);
        if (ul === null) {
          U === null && (U = P);
          break;
        }
        (l && U && ul.alternate === null && t(m, U),
          (s = n(ul, s, w)),
          el === null ? (B = ul) : (el.sibling = ul),
          (el = ul),
          (U = P));
      }
      if (w === h.length) return (a(m, U), al && Gt(m, w), B);
      if (U === null) {
        for (; w < h.length; w++)
          ((U = p(m, h[w], z)),
            U !== null &&
              ((s = n(U, s, w)),
              el === null ? (B = U) : (el.sibling = U),
              (el = U)));
        return (al && Gt(m, w), B);
      }
      for (U = e(U); w < h.length; w++)
        ((P = S(U, m, w, h[w], z)),
          P !== null &&
            (l && P.alternate !== null && U.delete(P.key === null ? w : P.key),
            (s = n(P, s, w)),
            el === null ? (B = P) : (el.sibling = P),
            (el = P)));
      return (
        l &&
          U.forEach(function (pa) {
            return t(m, pa);
          }),
        al && Gt(m, w),
        B
      );
    }
    function G(m, s, h, z) {
      if (h == null) throw Error(d(151));
      for (
        var B = null, el = null, U = s, w = (s = 0), P = null, ul = h.next();
        U !== null && !ul.done;
        w++, ul = h.next()
      ) {
        U.index > w ? ((P = U), (U = null)) : (P = U.sibling);
        var pa = v(m, U, ul.value, z);
        if (pa === null) {
          U === null && (U = P);
          break;
        }
        (l && U && pa.alternate === null && t(m, U),
          (s = n(pa, s, w)),
          el === null ? (B = pa) : (el.sibling = pa),
          (el = pa),
          (U = P));
      }
      if (ul.done) return (a(m, U), al && Gt(m, w), B);
      if (U === null) {
        for (; !ul.done; w++, ul = h.next())
          ((ul = p(m, ul.value, z)),
            ul !== null &&
              ((s = n(ul, s, w)),
              el === null ? (B = ul) : (el.sibling = ul),
              (el = ul)));
        return (al && Gt(m, w), B);
      }
      for (U = e(U); !ul.done; w++, ul = h.next())
        ((ul = S(U, m, w, ul.value, z)),
          ul !== null &&
            (l &&
              ul.alternate !== null &&
              U.delete(ul.key === null ? w : ul.key),
            (s = n(ul, s, w)),
            el === null ? (B = ul) : (el.sibling = ul),
            (el = ul)));
      return (
        l &&
          U.forEach(function (oy) {
            return t(m, oy);
          }),
        al && Gt(m, w),
        B
      );
    }
    function hl(m, s, h, z) {
      if (
        (typeof h == "object" &&
          h !== null &&
          h.type === q &&
          h.key === null &&
          (h = h.props.children),
        typeof h == "object" && h !== null)
      ) {
        switch (h.$$typeof) {
          case El:
            l: {
              for (var B = h.key; s !== null; ) {
                if (s.key === B) {
                  if (((B = h.type), B === q)) {
                    if (s.tag === 7) {
                      (a(m, s.sibling),
                        (z = u(s, h.props.children)),
                        (z.return = m),
                        (m = z));
                      break l;
                    }
                  } else if (
                    s.elementType === B ||
                    (typeof B == "object" &&
                      B !== null &&
                      B.$$typeof === ql &&
                      Ba(B) === s.type)
                  ) {
                    (a(m, s.sibling),
                      (z = u(s, h.props)),
                      we(z, h),
                      (z.return = m),
                      (m = z));
                    break l;
                  }
                  a(m, s);
                  break;
                } else t(m, s);
                s = s.sibling;
              }
              h.type === q
                ? ((z = ja(h.props.children, m.mode, z, h.key)),
                  (z.return = m),
                  (m = z))
                : ((z = Lu(h.type, h.key, h.props, null, m.mode, z)),
                  we(z, h),
                  (z.return = m),
                  (m = z));
            }
            return c(m);
          case tl:
            l: {
              for (B = h.key; s !== null; ) {
                if (s.key === B)
                  if (
                    s.tag === 4 &&
                    s.stateNode.containerInfo === h.containerInfo &&
                    s.stateNode.implementation === h.implementation
                  ) {
                    (a(m, s.sibling),
                      (z = u(s, h.children || [])),
                      (z.return = m),
                      (m = z));
                    break l;
                  } else {
                    a(m, s);
                    break;
                  }
                else t(m, s);
                s = s.sibling;
              }
              ((z = _c(h, m.mode, z)), (z.return = m), (m = z));
            }
            return c(m);
          case ql:
            return ((h = Ba(h)), hl(m, s, h, z));
        }
        if (ut(h)) return j(m, s, h, z);
        if (Vl(h)) {
          if (((B = Vl(h)), typeof B != "function")) throw Error(d(150));
          return ((h = B.call(h)), G(m, s, h, z));
        }
        if (typeof h.then == "function") return hl(m, s, Fu(h), z);
        if (h.$$typeof === Al) return hl(m, s, Ju(m, h), z);
        ku(m, h);
      }
      return (typeof h == "string" && h !== "") ||
        typeof h == "number" ||
        typeof h == "bigint"
        ? ((h = "" + h),
          s !== null && s.tag === 6
            ? (a(m, s.sibling), (z = u(s, h)), (z.return = m), (m = z))
            : (a(m, s), (z = Nc(h, m.mode, z)), (z.return = m), (m = z)),
          c(m))
        : a(m, s);
    }
    return function (m, s, h, z) {
      try {
        Je = 0;
        var B = hl(m, s, h, z);
        return ((oe = null), B);
      } catch (U) {
        if (U === se || U === Wu) throw U;
        var el = st(29, U, null, m.mode);
        return ((el.lanes = z), (el.return = m), el);
      } finally {
      }
    };
  }
  var Ya = Us(!0),
    Hs = Us(!1),
    ca = !1;
  function Gc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Zc(l, t) {
    ((l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        }));
  }
  function ia(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function fa(l, t, a) {
    var e = l.updateQueue;
    if (e === null) return null;
    if (((e = e.shared), (cl & 2) !== 0)) {
      var u = e.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (e.pending = t),
        (t = Qu(l)),
        Ss(l, null, a),
        t
      );
    }
    return (Xu(l, e, t, a), Qu(l));
  }
  function We(l, t, a) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (a & 4194048) !== 0))
    ) {
      var e = t.lanes;
      ((e &= l.pendingLanes), (a |= e), (t.lanes = a), Nf(l, a));
    }
  }
  function Xc(l, t) {
    var a = l.updateQueue,
      e = l.alternate;
    if (e !== null && ((e = e.updateQueue), a === e)) {
      var u = null,
        n = null;
      if (((a = a.firstBaseUpdate), a !== null)) {
        do {
          var c = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null,
          };
          (n === null ? (u = n = c) : (n = n.next = c), (a = a.next));
        } while (a !== null);
        n === null ? (u = n = t) : (n = n.next = t);
      } else u = n = t;
      ((a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks,
      }),
        (l.updateQueue = a));
      return;
    }
    ((l = a.lastBaseUpdate),
      l === null ? (a.firstBaseUpdate = t) : (l.next = t),
      (a.lastBaseUpdate = t));
  }
  var Qc = !1;
  function $e() {
    if (Qc) {
      var l = fe;
      if (l !== null) throw l;
    }
  }
  function Fe(l, t, a, e) {
    Qc = !1;
    var u = l.updateQueue;
    ca = !1;
    var n = u.firstBaseUpdate,
      c = u.lastBaseUpdate,
      i = u.shared.pending;
    if (i !== null) {
      u.shared.pending = null;
      var f = i,
        y = f.next;
      ((f.next = null), c === null ? (n = y) : (c.next = y), (c = f));
      var E = l.alternate;
      E !== null &&
        ((E = E.updateQueue),
        (i = E.lastBaseUpdate),
        i !== c &&
          (i === null ? (E.firstBaseUpdate = y) : (i.next = y),
          (E.lastBaseUpdate = f)));
    }
    if (n !== null) {
      var p = u.baseState;
      ((c = 0), (E = y = f = null), (i = n));
      do {
        var v = i.lane & -536870913,
          S = v !== i.lane;
        if (S ? (I & v) === v : (e & v) === v) {
          (v !== 0 && v === ie && (Qc = !0),
            E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  tag: i.tag,
                  payload: i.payload,
                  callback: null,
                  next: null,
                }));
          l: {
            var j = l,
              G = i;
            v = t;
            var hl = a;
            switch (G.tag) {
              case 1:
                if (((j = G.payload), typeof j == "function")) {
                  p = j.call(hl, p, v);
                  break l;
                }
                p = j;
                break l;
              case 3:
                j.flags = (j.flags & -65537) | 128;
              case 0:
                if (
                  ((j = G.payload),
                  (v = typeof j == "function" ? j.call(hl, p, v) : j),
                  v == null)
                )
                  break l;
                p = H({}, p, v);
                break l;
              case 2:
                ca = !0;
            }
          }
          ((v = i.callback),
            v !== null &&
              ((l.flags |= 64),
              S && (l.flags |= 8192),
              (S = u.callbacks),
              S === null ? (u.callbacks = [v]) : S.push(v)));
        } else
          ((S = {
            lane: v,
            tag: i.tag,
            payload: i.payload,
            callback: i.callback,
            next: null,
          }),
            E === null ? ((y = E = S), (f = p)) : (E = E.next = S),
            (c |= v));
        if (((i = i.next), i === null)) {
          if (((i = u.shared.pending), i === null)) break;
          ((S = i),
            (i = S.next),
            (S.next = null),
            (u.lastBaseUpdate = S),
            (u.shared.pending = null));
        }
      } while (!0);
      (E === null && (f = p),
        (u.baseState = f),
        (u.firstBaseUpdate = y),
        (u.lastBaseUpdate = E),
        n === null && (u.shared.lanes = 0),
        (ma |= c),
        (l.lanes = c),
        (l.memoizedState = p));
    }
  }
  function Bs(l, t) {
    if (typeof l != "function") throw Error(d(191, l));
    l.call(t);
  }
  function qs(l, t) {
    var a = l.callbacks;
    if (a !== null)
      for (l.callbacks = null, l = 0; l < a.length; l++) Bs(a[l], t);
  }
  var de = o(null),
    Iu = o(0);
  function Ys(l, t) {
    ((l = Ft), M(Iu, l), M(de, t), (Ft = l | t.baseLanes));
  }
  function Lc() {
    (M(Iu, Ft), M(de, de.current));
  }
  function Vc() {
    ((Ft = Iu.current), T(de), T(Iu));
  }
  var ot = o(null),
    pt = null;
  function sa(l) {
    var t = l.alternate;
    (M(Ol, Ol.current & 1),
      M(ot, l),
      pt === null &&
        (t === null || de.current !== null || t.memoizedState !== null) &&
        (pt = l));
  }
  function Kc(l) {
    (M(Ol, Ol.current), M(ot, l), pt === null && (pt = l));
  }
  function Gs(l) {
    l.tag === 22
      ? (M(Ol, Ol.current), M(ot, l), pt === null && (pt = l))
      : oa();
  }
  function oa() {
    (M(Ol, Ol.current), M(ot, ot.current));
  }
  function dt(l) {
    (T(ot), pt === l && (pt = null), T(Ol));
  }
  var Ol = o(0);
  function Pu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && ((a = a.dehydrated), a === null || ki(a) || Ii(a)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Qt = 0,
    K = null,
    rl = null,
    Dl = null,
    ln = !1,
    re = !1,
    Ga = !1,
    tn = 0,
    ke = 0,
    me = null,
    lh = 0;
  function zl() {
    throw Error(d(321));
  }
  function Jc(l, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < l.length; a++)
      if (!ft(l[a], t[a])) return !1;
    return !0;
  }
  function wc(l, t, a, e, u, n) {
    return (
      (Qt = n),
      (K = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (A.H = l === null || l.memoizedState === null ? po : fi),
      (Ga = !1),
      (n = a(e, u)),
      (Ga = !1),
      re && (n = Xs(t, a, e, u)),
      Zs(l),
      n
    );
  }
  function Zs(l) {
    A.H = lu;
    var t = rl !== null && rl.next !== null;
    if (((Qt = 0), (Dl = rl = K = null), (ln = !1), (ke = 0), (me = null), t))
      throw Error(d(300));
    l === null ||
      Rl ||
      ((l = l.dependencies), l !== null && Ku(l) && (Rl = !0));
  }
  function Xs(l, t, a, e) {
    K = l;
    var u = 0;
    do {
      if ((re && (me = null), (ke = 0), (re = !1), 25 <= u))
        throw Error(d(301));
      if (((u += 1), (Dl = rl = null), l.updateQueue != null)) {
        var n = l.updateQueue;
        ((n.lastEffect = null),
          (n.events = null),
          (n.stores = null),
          n.memoCache != null && (n.memoCache.index = 0));
      }
      ((A.H = To), (n = t(a, e)));
    } while (re);
    return n;
  }
  function th() {
    var l = A.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? Ie(t) : t),
      (l = l.useState()[0]),
      (rl !== null ? rl.memoizedState : null) !== l && (K.flags |= 1024),
      t
    );
  }
  function Wc() {
    var l = tn !== 0;
    return ((tn = 0), l);
  }
  function $c(l, t, a) {
    ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~a));
  }
  function Fc(l) {
    if (ln) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        (t !== null && (t.pending = null), (l = l.next));
      }
      ln = !1;
    }
    ((Qt = 0), (Dl = rl = K = null), (re = !1), (ke = tn = 0), (me = null));
  }
  function Jl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Dl === null ? (K.memoizedState = Dl = l) : (Dl = Dl.next = l), Dl);
  }
  function Nl() {
    if (rl === null) {
      var l = K.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = rl.next;
    var t = Dl === null ? K.memoizedState : Dl.next;
    if (t !== null) ((Dl = t), (rl = l));
    else {
      if (l === null)
        throw K.alternate === null ? Error(d(467)) : Error(d(310));
      ((rl = l),
        (l = {
          memoizedState: rl.memoizedState,
          baseState: rl.baseState,
          baseQueue: rl.baseQueue,
          queue: rl.queue,
          next: null,
        }),
        Dl === null ? (K.memoizedState = Dl = l) : (Dl = Dl.next = l));
    }
    return Dl;
  }
  function an() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ie(l) {
    var t = ke;
    return (
      (ke += 1),
      me === null && (me = []),
      (l = js(me, l, t)),
      (t = K),
      (Dl === null ? t.memoizedState : Dl.next) === null &&
        ((t = t.alternate),
        (A.H = t === null || t.memoizedState === null ? po : fi)),
      l
    );
  }
  function en(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Ie(l);
      if (l.$$typeof === Al) return Xl(l);
    }
    throw Error(d(438, String(l)));
  }
  function kc(l) {
    var t = null,
      a = K.updateQueue;
    if ((a !== null && (t = a.memoCache), t == null)) {
      var e = K.alternate;
      e !== null &&
        ((e = e.updateQueue),
        e !== null &&
          ((e = e.memoCache),
          e != null &&
            (t = {
              data: e.data.map(function (u) {
                return u.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      a === null && ((a = an()), (K.updateQueue = a)),
      (a.memoCache = t),
      (a = t.data[t.index]),
      a === void 0)
    )
      for (a = t.data[t.index] = Array(l), e = 0; e < l; e++) a[e] = Yl;
    return (t.index++, a);
  }
  function Lt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function un(l) {
    var t = Nl();
    return Ic(t, rl, l);
  }
  function Ic(l, t, a) {
    var e = l.queue;
    if (e === null) throw Error(d(311));
    e.lastRenderedReducer = a;
    var u = l.baseQueue,
      n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var c = u.next;
        ((u.next = n.next), (n.next = c));
      }
      ((t.baseQueue = u = n), (e.pending = null));
    }
    if (((n = l.baseState), u === null)) l.memoizedState = n;
    else {
      t = u.next;
      var i = (c = null),
        f = null,
        y = t,
        E = !1;
      do {
        var p = y.lane & -536870913;
        if (p !== y.lane ? (I & p) === p : (Qt & p) === p) {
          var v = y.revertLane;
          if (v === 0)
            (f !== null &&
              (f = f.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: y.action,
                  hasEagerState: y.hasEagerState,
                  eagerState: y.eagerState,
                  next: null,
                }),
              p === ie && (E = !0));
          else if ((Qt & v) === v) {
            ((y = y.next), v === ie && (E = !0));
            continue;
          } else
            ((p = {
              lane: 0,
              revertLane: y.revertLane,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null,
            }),
              f === null ? ((i = f = p), (c = n)) : (f = f.next = p),
              (K.lanes |= v),
              (ma |= v));
          ((p = y.action),
            Ga && a(n, p),
            (n = y.hasEagerState ? y.eagerState : a(n, p)));
        } else
          ((v = {
            lane: p,
            revertLane: y.revertLane,
            gesture: y.gesture,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null,
          }),
            f === null ? ((i = f = v), (c = n)) : (f = f.next = v),
            (K.lanes |= p),
            (ma |= p));
        y = y.next;
      } while (y !== null && y !== t);
      if (
        (f === null ? (c = n) : (f.next = i),
        !ft(n, l.memoizedState) && ((Rl = !0), E && ((a = fe), a !== null)))
      )
        throw a;
      ((l.memoizedState = n),
        (l.baseState = c),
        (l.baseQueue = f),
        (e.lastRenderedState = n));
    }
    return (u === null && (e.lanes = 0), [l.memoizedState, e.dispatch]);
  }
  function Pc(l) {
    var t = Nl(),
      a = t.queue;
    if (a === null) throw Error(d(311));
    a.lastRenderedReducer = l;
    var e = a.dispatch,
      u = a.pending,
      n = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var c = (u = u.next);
      do ((n = l(n, c.action)), (c = c.next));
      while (c !== u);
      (ft(n, t.memoizedState) || (Rl = !0),
        (t.memoizedState = n),
        t.baseQueue === null && (t.baseState = n),
        (a.lastRenderedState = n));
    }
    return [n, e];
  }
  function Qs(l, t, a) {
    var e = K,
      u = Nl(),
      n = al;
    if (n) {
      if (a === void 0) throw Error(d(407));
      a = a();
    } else a = t();
    var c = !ft((rl || u).memoizedState, a);
    if (
      (c && ((u.memoizedState = a), (Rl = !0)),
      (u = u.queue),
      ai(Ks.bind(null, e, u, l), [l]),
      u.getSnapshot !== t || c || (Dl !== null && Dl.memoizedState.tag & 1))
    ) {
      if (
        ((e.flags |= 2048),
        he(9, { destroy: void 0 }, Vs.bind(null, e, u, a, t), null),
        yl === null)
      )
        throw Error(d(349));
      n || (Qt & 127) !== 0 || Ls(e, t, a);
    }
    return a;
  }
  function Ls(l, t, a) {
    ((l.flags |= 16384),
      (l = { getSnapshot: t, value: a }),
      (t = K.updateQueue),
      t === null
        ? ((t = an()), (K.updateQueue = t), (t.stores = [l]))
        : ((a = t.stores), a === null ? (t.stores = [l]) : a.push(l)));
  }
  function Vs(l, t, a, e) {
    ((t.value = a), (t.getSnapshot = e), Js(t) && ws(l));
  }
  function Ks(l, t, a) {
    return a(function () {
      Js(t) && ws(l);
    });
  }
  function Js(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !ft(l, a);
    } catch {
      return !0;
    }
  }
  function ws(l) {
    var t = Ma(l, 2);
    t !== null && at(t, l, 2);
  }
  function li(l) {
    var t = Jl();
    if (typeof l == "function") {
      var a = l;
      if (((l = a()), Ga)) {
        Pt(!0);
        try {
          a();
        } finally {
          Pt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function Ws(l, t, a, e) {
    return ((l.baseState = a), Ic(l, rl, typeof e == "function" ? e : Lt));
  }
  function ah(l, t, a, e, u) {
    if (fn(l)) throw Error(d(485));
    if (((l = t.action), l !== null)) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          n.listeners.push(c);
        },
      };
      (A.T !== null ? a(!0) : (n.isTransition = !1),
        e(n),
        (a = t.pending),
        a === null
          ? ((n.next = t.pending = n), $s(t, n))
          : ((n.next = a.next), (t.pending = a.next = n)));
    }
  }
  function $s(l, t) {
    var a = t.action,
      e = t.payload,
      u = l.state;
    if (t.isTransition) {
      var n = A.T,
        c = {};
      A.T = c;
      try {
        var i = a(u, e),
          f = A.S;
        (f !== null && f(c, i), Fs(l, t, i));
      } catch (y) {
        ti(l, t, y);
      } finally {
        (n !== null && c.types !== null && (n.types = c.types), (A.T = n));
      }
    } else
      try {
        ((n = a(u, e)), Fs(l, t, n));
      } catch (y) {
        ti(l, t, y);
      }
  }
  function Fs(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function"
      ? a.then(
          function (e) {
            ks(l, t, e);
          },
          function (e) {
            return ti(l, t, e);
          },
        )
      : ks(l, t, a);
  }
  function ks(l, t, a) {
    ((t.status = "fulfilled"),
      (t.value = a),
      Is(t),
      (l.state = a),
      (t = l.pending),
      t !== null &&
        ((a = t.next),
        a === t ? (l.pending = null) : ((a = a.next), (t.next = a), $s(l, a))));
  }
  function ti(l, t, a) {
    var e = l.pending;
    if (((l.pending = null), e !== null)) {
      e = e.next;
      do ((t.status = "rejected"), (t.reason = a), Is(t), (t = t.next));
      while (t !== e);
    }
    l.action = null;
  }
  function Is(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Ps(l, t) {
    return t;
  }
  function lo(l, t) {
    if (al) {
      var a = yl.formState;
      if (a !== null) {
        l: {
          var e = K;
          if (al) {
            if (vl) {
              t: {
                for (var u = vl, n = zt; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (((u = Tt(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((n = u.data), (u = n === "F!" || n === "F" ? u : null));
              }
              if (u) {
                ((vl = Tt(u.nextSibling)), (e = u.data === "F!"));
                break l;
              }
            }
            ua(e);
          }
          e = !1;
        }
        e && (t = a[0]);
      }
    }
    return (
      (a = Jl()),
      (a.memoizedState = a.baseState = t),
      (e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ps,
        lastRenderedState: t,
      }),
      (a.queue = e),
      (a = Eo.bind(null, K, e)),
      (e.dispatch = a),
      (e = li(!1)),
      (n = ii.bind(null, K, !1, e.queue)),
      (e = Jl()),
      (u = { state: t, dispatch: null, action: l, pending: null }),
      (e.queue = u),
      (a = ah.bind(null, K, u, n, a)),
      (u.dispatch = a),
      (e.memoizedState = l),
      [t, a, !1]
    );
  }
  function to(l) {
    var t = Nl();
    return ao(t, rl, l);
  }
  function ao(l, t, a) {
    if (
      ((t = Ic(l, t, Ps)[0]),
      (l = un(Lt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var e = Ie(t);
      } catch (c) {
        throw c === se ? Wu : c;
      }
    else e = t;
    t = Nl();
    var u = t.queue,
      n = u.dispatch;
    return (
      a !== t.memoizedState &&
        ((K.flags |= 2048),
        he(9, { destroy: void 0 }, eh.bind(null, u, a), null)),
      [e, n, l]
    );
  }
  function eh(l, t) {
    l.action = t;
  }
  function eo(l) {
    var t = Nl(),
      a = rl;
    if (a !== null) return ao(t, a, l);
    (Nl(), (t = t.memoizedState), (a = Nl()));
    var e = a.queue.dispatch;
    return ((a.memoizedState = l), [t, e, !1]);
  }
  function he(l, t, a, e) {
    return (
      (l = { tag: l, create: a, deps: e, inst: t, next: null }),
      (t = K.updateQueue),
      t === null && ((t = an()), (K.updateQueue = t)),
      (a = t.lastEffect),
      a === null
        ? (t.lastEffect = l.next = l)
        : ((e = a.next), (a.next = l), (l.next = e), (t.lastEffect = l)),
      l
    );
  }
  function uo() {
    return Nl().memoizedState;
  }
  function nn(l, t, a, e) {
    var u = Jl();
    ((K.flags |= l),
      (u.memoizedState = he(
        1 | t,
        { destroy: void 0 },
        a,
        e === void 0 ? null : e,
      )));
  }
  function cn(l, t, a, e) {
    var u = Nl();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    rl !== null && e !== null && Jc(e, rl.memoizedState.deps)
      ? (u.memoizedState = he(t, n, a, e))
      : ((K.flags |= l), (u.memoizedState = he(1 | t, n, a, e)));
  }
  function no(l, t) {
    nn(8390656, 8, l, t);
  }
  function ai(l, t) {
    cn(2048, 8, l, t);
  }
  function uh(l) {
    K.flags |= 4;
    var t = K.updateQueue;
    if (t === null) ((t = an()), (K.updateQueue = t), (t.events = [l]));
    else {
      var a = t.events;
      a === null ? (t.events = [l]) : a.push(l);
    }
  }
  function co(l) {
    var t = Nl().memoizedState;
    return (
      uh({ ref: t, nextImpl: l }),
      function () {
        if ((cl & 2) !== 0) throw Error(d(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function io(l, t) {
    return cn(4, 2, l, t);
  }
  function fo(l, t) {
    return cn(4, 4, l, t);
  }
  function so(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function () {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function oo(l, t, a) {
    ((a = a != null ? a.concat([l]) : null), cn(4, 4, so.bind(null, t, l), a));
  }
  function ei() {}
  function ro(l, t) {
    var a = Nl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    return t !== null && Jc(t, e[1]) ? e[0] : ((a.memoizedState = [l, t]), l);
  }
  function mo(l, t) {
    var a = Nl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    if (t !== null && Jc(t, e[1])) return e[0];
    if (((e = l()), Ga)) {
      Pt(!0);
      try {
        l();
      } finally {
        Pt(!1);
      }
    }
    return ((a.memoizedState = [e, t]), e);
  }
  function ui(l, t, a) {
    return a === void 0 || ((Qt & 1073741824) !== 0 && (I & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = a), (l = hd()), (K.lanes |= l), (ma |= l), a);
  }
  function ho(l, t, a, e) {
    return ft(a, t)
      ? a
      : de.current !== null
        ? ((l = ui(l, a, e)), ft(l, t) || (Rl = !0), l)
        : (Qt & 42) === 0 || ((Qt & 1073741824) !== 0 && (I & 261930) === 0)
          ? ((Rl = !0), (l.memoizedState = a))
          : ((l = hd()), (K.lanes |= l), (ma |= l), t);
  }
  function yo(l, t, a, e, u) {
    var n = R.p;
    R.p = n !== 0 && 8 > n ? n : 8;
    var c = A.T,
      i = {};
    ((A.T = i), ii(l, !1, t, a));
    try {
      var f = u(),
        y = A.S;
      if (
        (y !== null && y(i, f),
        f !== null && typeof f == "object" && typeof f.then == "function")
      ) {
        var E = Pm(f, e);
        Pe(l, t, E, ht(l));
      } else Pe(l, t, e, ht(l));
    } catch (p) {
      Pe(l, t, { then: function () {}, status: "rejected", reason: p }, ht());
    } finally {
      ((R.p = n),
        c !== null && i.types !== null && (c.types = i.types),
        (A.T = c));
    }
  }
  function nh() {}
  function ni(l, t, a, e) {
    if (l.tag !== 5) throw Error(d(476));
    var u = vo(l).queue;
    yo(
      l,
      u,
      t,
      Y,
      a === null
        ? nh
        : function () {
            return (go(l), a(e));
          },
    );
  }
  function vo(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Y,
      baseState: Y,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: Y,
      },
      next: null,
    };
    var a = {};
    return (
      (t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Lt,
          lastRenderedState: a,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function go(l) {
    var t = vo(l);
    (t.next === null && (t = l.alternate.memoizedState),
      Pe(l, t.next.queue, {}, ht()));
  }
  function ci() {
    return Xl(vu);
  }
  function So() {
    return Nl().memoizedState;
  }
  function bo() {
    return Nl().memoizedState;
  }
  function ch(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = ht();
          l = ia(a);
          var e = fa(t, l, a);
          (e !== null && (at(e, t, a), We(e, t, a)),
            (t = { cache: Hc() }),
            (l.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function ih(l, t, a) {
    var e = ht();
    ((a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      fn(l)
        ? Ao(t, a)
        : ((a = Tc(l, t, a, e)), a !== null && (at(a, l, e), zo(a, t, e))));
  }
  function Eo(l, t, a) {
    var e = ht();
    Pe(l, t, a, e);
  }
  function Pe(l, t, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (fn(l)) Ao(t, u);
    else {
      var n = l.alternate;
      if (
        l.lanes === 0 &&
        (n === null || n.lanes === 0) &&
        ((n = t.lastRenderedReducer), n !== null)
      )
        try {
          var c = t.lastRenderedState,
            i = n(c, a);
          if (((u.hasEagerState = !0), (u.eagerState = i), ft(i, c)))
            return (Xu(l, t, u, 0), yl === null && Zu(), !1);
        } catch {
        } finally {
        }
      if (((a = Tc(l, t, u, e)), a !== null))
        return (at(a, l, e), zo(a, t, e), !0);
    }
    return !1;
  }
  function ii(l, t, a, e) {
    if (
      ((e = {
        lane: 2,
        revertLane: Gi(),
        gesture: null,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      fn(l))
    ) {
      if (t) throw Error(d(479));
    } else ((t = Tc(l, a, e, 2)), t !== null && at(t, l, 2));
  }
  function fn(l) {
    var t = l.alternate;
    return l === K || (t !== null && t === K);
  }
  function Ao(l, t) {
    re = ln = !0;
    var a = l.pending;
    (a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
      (l.pending = t));
  }
  function zo(l, t, a) {
    if ((a & 4194048) !== 0) {
      var e = t.lanes;
      ((e &= l.pendingLanes), (a |= e), (t.lanes = a), Nf(l, a));
    }
  }
  var lu = {
    readContext: Xl,
    use: en,
    useCallback: zl,
    useContext: zl,
    useEffect: zl,
    useImperativeHandle: zl,
    useLayoutEffect: zl,
    useInsertionEffect: zl,
    useMemo: zl,
    useReducer: zl,
    useRef: zl,
    useState: zl,
    useDebugValue: zl,
    useDeferredValue: zl,
    useTransition: zl,
    useSyncExternalStore: zl,
    useId: zl,
    useHostTransitionStatus: zl,
    useFormState: zl,
    useActionState: zl,
    useOptimistic: zl,
    useMemoCache: zl,
    useCacheRefresh: zl,
  };
  lu.useEffectEvent = zl;
  var po = {
      readContext: Xl,
      use: en,
      useCallback: function (l, t) {
        return ((Jl().memoizedState = [l, t === void 0 ? null : t]), l);
      },
      useContext: Xl,
      useEffect: no,
      useImperativeHandle: function (l, t, a) {
        ((a = a != null ? a.concat([l]) : null),
          nn(4194308, 4, so.bind(null, t, l), a));
      },
      useLayoutEffect: function (l, t) {
        return nn(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        nn(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var a = Jl();
        t = t === void 0 ? null : t;
        var e = l();
        if (Ga) {
          Pt(!0);
          try {
            l();
          } finally {
            Pt(!1);
          }
        }
        return ((a.memoizedState = [e, t]), e);
      },
      useReducer: function (l, t, a) {
        var e = Jl();
        if (a !== void 0) {
          var u = a(t);
          if (Ga) {
            Pt(!0);
            try {
              a(t);
            } finally {
              Pt(!1);
            }
          }
        } else u = t;
        return (
          (e.memoizedState = e.baseState = u),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: u,
          }),
          (e.queue = l),
          (l = l.dispatch = ih.bind(null, K, l)),
          [e.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = Jl();
        return ((l = { current: l }), (t.memoizedState = l));
      },
      useState: function (l) {
        l = li(l);
        var t = l.queue,
          a = Eo.bind(null, K, t);
        return ((t.dispatch = a), [l.memoizedState, a]);
      },
      useDebugValue: ei,
      useDeferredValue: function (l, t) {
        var a = Jl();
        return ui(a, l, t);
      },
      useTransition: function () {
        var l = li(!1);
        return (
          (l = yo.bind(null, K, l.queue, !0, !1)),
          (Jl().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, a) {
        var e = K,
          u = Jl();
        if (al) {
          if (a === void 0) throw Error(d(407));
          a = a();
        } else {
          if (((a = t()), yl === null)) throw Error(d(349));
          (I & 127) !== 0 || Ls(e, t, a);
        }
        u.memoizedState = a;
        var n = { value: a, getSnapshot: t };
        return (
          (u.queue = n),
          no(Ks.bind(null, e, n, l), [l]),
          (e.flags |= 2048),
          he(9, { destroy: void 0 }, Vs.bind(null, e, n, a, t), null),
          a
        );
      },
      useId: function () {
        var l = Jl(),
          t = yl.identifierPrefix;
        if (al) {
          var a = jt,
            e = Mt;
          ((a = (e & ~(1 << (32 - it(e) - 1))).toString(32) + a),
            (t = "_" + t + "R_" + a),
            (a = tn++),
            0 < a && (t += "H" + a.toString(32)),
            (t += "_"));
        } else ((a = lh++), (t = "_" + t + "r_" + a.toString(32) + "_"));
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: ci,
      useFormState: lo,
      useActionState: lo,
      useOptimistic: function (l) {
        var t = Jl();
        t.memoizedState = t.baseState = l;
        var a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = a),
          (t = ii.bind(null, K, !0, a)),
          (a.dispatch = t),
          [l, t]
        );
      },
      useMemoCache: kc,
      useCacheRefresh: function () {
        return (Jl().memoizedState = ch.bind(null, K));
      },
      useEffectEvent: function (l) {
        var t = Jl(),
          a = { impl: l };
        return (
          (t.memoizedState = a),
          function () {
            if ((cl & 2) !== 0) throw Error(d(440));
            return a.impl.apply(void 0, arguments);
          }
        );
      },
    },
    fi = {
      readContext: Xl,
      use: en,
      useCallback: ro,
      useContext: Xl,
      useEffect: ai,
      useImperativeHandle: oo,
      useInsertionEffect: io,
      useLayoutEffect: fo,
      useMemo: mo,
      useReducer: un,
      useRef: uo,
      useState: function () {
        return un(Lt);
      },
      useDebugValue: ei,
      useDeferredValue: function (l, t) {
        var a = Nl();
        return ho(a, rl.memoizedState, l, t);
      },
      useTransition: function () {
        var l = un(Lt)[0],
          t = Nl().memoizedState;
        return [typeof l == "boolean" ? l : Ie(l), t];
      },
      useSyncExternalStore: Qs,
      useId: So,
      useHostTransitionStatus: ci,
      useFormState: to,
      useActionState: to,
      useOptimistic: function (l, t) {
        var a = Nl();
        return Ws(a, rl, l, t);
      },
      useMemoCache: kc,
      useCacheRefresh: bo,
    };
  fi.useEffectEvent = co;
  var To = {
    readContext: Xl,
    use: en,
    useCallback: ro,
    useContext: Xl,
    useEffect: ai,
    useImperativeHandle: oo,
    useInsertionEffect: io,
    useLayoutEffect: fo,
    useMemo: mo,
    useReducer: Pc,
    useRef: uo,
    useState: function () {
      return Pc(Lt);
    },
    useDebugValue: ei,
    useDeferredValue: function (l, t) {
      var a = Nl();
      return rl === null ? ui(a, l, t) : ho(a, rl.memoizedState, l, t);
    },
    useTransition: function () {
      var l = Pc(Lt)[0],
        t = Nl().memoizedState;
      return [typeof l == "boolean" ? l : Ie(l), t];
    },
    useSyncExternalStore: Qs,
    useId: So,
    useHostTransitionStatus: ci,
    useFormState: eo,
    useActionState: eo,
    useOptimistic: function (l, t) {
      var a = Nl();
      return rl !== null
        ? Ws(a, rl, l, t)
        : ((a.baseState = l), [l, a.queue.dispatch]);
    },
    useMemoCache: kc,
    useCacheRefresh: bo,
  };
  To.useEffectEvent = co;
  function si(l, t, a, e) {
    ((t = l.memoizedState),
      (a = a(e, t)),
      (a = a == null ? t : H({}, t, a)),
      (l.memoizedState = a),
      l.lanes === 0 && (l.updateQueue.baseState = a));
  }
  var oi = {
    enqueueSetState: function (l, t, a) {
      l = l._reactInternals;
      var e = ht(),
        u = ia(e);
      ((u.payload = t),
        a != null && (u.callback = a),
        (t = fa(l, u, e)),
        t !== null && (at(t, l, e), We(t, l, e)));
    },
    enqueueReplaceState: function (l, t, a) {
      l = l._reactInternals;
      var e = ht(),
        u = ia(e);
      ((u.tag = 1),
        (u.payload = t),
        a != null && (u.callback = a),
        (t = fa(l, u, e)),
        t !== null && (at(t, l, e), We(t, l, e)));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var a = ht(),
        e = ia(a);
      ((e.tag = 2),
        t != null && (e.callback = t),
        (t = fa(l, e, a)),
        t !== null && (at(t, l, a), We(t, l, a)));
    },
  };
  function Oo(l, t, a, e, u, n, c) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(e, n, c)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ze(a, e) || !Ze(u, n)
          : !0
    );
  }
  function No(l, t, a, e) {
    ((l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(a, e),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(a, e),
      t.state !== l && oi.enqueueReplaceState(t, t.state, null));
  }
  function Za(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var e in t) e !== "ref" && (a[e] = t[e]);
    }
    if ((l = l.defaultProps)) {
      a === t && (a = H({}, a));
      for (var u in l) a[u] === void 0 && (a[u] = l[u]);
    }
    return a;
  }
  function _o(l) {
    Gu(l);
  }
  function Do(l) {
    console.error(l);
  }
  function Ro(l) {
    Gu(l);
  }
  function sn(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  function Mo(l, t, a) {
    try {
      var e = l.onCaughtError;
      e(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function di(l, t, a) {
    return (
      (a = ia(a)),
      (a.tag = 3),
      (a.payload = { element: null }),
      (a.callback = function () {
        sn(l, t);
      }),
      a
    );
  }
  function jo(l) {
    return ((l = ia(l)), (l.tag = 3), l);
  }
  function xo(l, t, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      ((l.payload = function () {
        return u(n);
      }),
        (l.callback = function () {
          Mo(t, a, e);
        }));
    }
    var c = a.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (l.callback = function () {
        (Mo(t, a, e),
          typeof u != "function" &&
            (ha === null ? (ha = new Set([this])) : ha.add(this)));
        var i = e.stack;
        this.componentDidCatch(e.value, {
          componentStack: i !== null ? i : "",
        });
      });
  }
  function fh(l, t, a, e, u) {
    if (
      ((a.flags |= 32768),
      e !== null && typeof e == "object" && typeof e.then == "function")
    ) {
      if (
        ((t = a.alternate),
        t !== null && ce(t, a, u, !0),
        (a = ot.current),
        a !== null)
      ) {
        switch (a.tag) {
          case 31:
          case 13:
            return (
              pt === null ? An() : a.alternate === null && pl === 0 && (pl = 3),
              (a.flags &= -257),
              (a.flags |= 65536),
              (a.lanes = u),
              e === $u
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null ? (a.updateQueue = new Set([e])) : t.add(e),
                  Bi(l, e, u)),
              !1
            );
          case 22:
            return (
              (a.flags |= 65536),
              e === $u
                ? (a.flags |= 16384)
                : ((t = a.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([e]),
                      }),
                      (a.updateQueue = t))
                    : ((a = t.retryQueue),
                      a === null ? (t.retryQueue = new Set([e])) : a.add(e)),
                  Bi(l, e, u)),
              !1
            );
        }
        throw Error(d(435, a.tag));
      }
      return (Bi(l, e, u), An(), !1);
    }
    if (al)
      return (
        (t = ot.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            e !== Mc && ((l = Error(d(422), { cause: e })), Le(bt(l, a))))
          : (e !== Mc && ((t = Error(d(423), { cause: e })), Le(bt(t, a))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (u &= -u),
            (l.lanes |= u),
            (e = bt(e, a)),
            (u = di(l.stateNode, e, u)),
            Xc(l, u),
            pl !== 4 && (pl = 2)),
        !1
      );
    var n = Error(d(520), { cause: e });
    if (
      ((n = bt(n, a)),
      fu === null ? (fu = [n]) : fu.push(n),
      pl !== 4 && (pl = 2),
      t === null)
    )
      return !0;
    ((e = bt(e, a)), (a = t));
    do {
      switch (a.tag) {
        case 3:
          return (
            (a.flags |= 65536),
            (l = u & -u),
            (a.lanes |= l),
            (l = di(a.stateNode, e, l)),
            Xc(a, l),
            !1
          );
        case 1:
          if (
            ((t = a.type),
            (n = a.stateNode),
            (a.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (n !== null &&
                  typeof n.componentDidCatch == "function" &&
                  (ha === null || !ha.has(n)))))
          )
            return (
              (a.flags |= 65536),
              (u &= -u),
              (a.lanes |= u),
              (u = jo(u)),
              xo(u, l, a, e),
              Xc(a, u),
              !1
            );
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var ri = Error(d(461)),
    Rl = !1;
  function Ql(l, t, a, e) {
    t.child = l === null ? Hs(t, null, a, e) : Ya(t, l.child, a, e);
  }
  function Co(l, t, a, e, u) {
    a = a.render;
    var n = t.ref;
    if ("ref" in e) {
      var c = {};
      for (var i in e) i !== "ref" && (c[i] = e[i]);
    } else c = e;
    return (
      Ua(t),
      (e = wc(l, t, a, c, n, u)),
      (i = Wc()),
      l !== null && !Rl
        ? ($c(l, t, u), Vt(l, t, u))
        : (al && i && Dc(t), (t.flags |= 1), Ql(l, t, e, u), t.child)
    );
  }
  function Uo(l, t, a, e, u) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" &&
        !Oc(n) &&
        n.defaultProps === void 0 &&
        a.compare === null
        ? ((t.tag = 15), (t.type = n), Ho(l, t, n, e, u))
        : ((l = Lu(a.type, null, e, t, t.mode, u)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((n = l.child), !Ei(l, u))) {
      var c = n.memoizedProps;
      if (
        ((a = a.compare), (a = a !== null ? a : Ze), a(c, e) && l.ref === t.ref)
      )
        return Vt(l, t, u);
    }
    return (
      (t.flags |= 1),
      (l = Yt(n, e)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function Ho(l, t, a, e, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Ze(n, e) && l.ref === t.ref)
        if (((Rl = !1), (t.pendingProps = e = n), Ei(l, u)))
          (l.flags & 131072) !== 0 && (Rl = !0);
        else return ((t.lanes = l.lanes), Vt(l, t, u));
    }
    return mi(l, t, a, e, u);
  }
  function Bo(l, t, a, e) {
    var u = e.children,
      n = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((n = n !== null ? n.baseLanes | a : a), l !== null)) {
          for (e = t.child = l.child, u = 0; e !== null; )
            ((u = u | e.lanes | e.childLanes), (e = e.sibling));
          e = u & ~n;
        } else ((e = 0), (t.child = null));
        return qo(l, t, n, a, e);
      }
      if ((a & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && wu(t, n !== null ? n.cachePool : null),
          n !== null ? Ys(t, n) : Lc(),
          Gs(t));
      else
        return (
          (e = t.lanes = 536870912),
          qo(l, t, n !== null ? n.baseLanes | a : a, a, e)
        );
    } else
      n !== null
        ? (wu(t, n.cachePool), Ys(t, n), oa(), (t.memoizedState = null))
        : (l !== null && wu(t, null), Lc(), oa());
    return (Ql(l, t, u, a), t.child);
  }
  function tu(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function qo(l, t, a, e, u) {
    var n = qc();
    return (
      (n = n === null ? null : { parent: _l._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: a, cachePool: n }),
      l !== null && wu(t, null),
      Lc(),
      Gs(t),
      l !== null && ce(l, t, e, !0),
      (t.childLanes = u),
      null
    );
  }
  function on(l, t) {
    return (
      (t = rn({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function Yo(l, t, a) {
    return (
      Ya(t, l.child, null, a),
      (l = on(t, t.pendingProps)),
      (l.flags |= 2),
      dt(t),
      (t.memoizedState = null),
      l
    );
  }
  function sh(l, t, a) {
    var e = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (al) {
        if (e.mode === "hidden")
          return ((l = on(t, e)), (t.lanes = 536870912), tu(null, l));
        if (
          (Kc(t),
          (l = vl)
            ? ((l = Fd(l, zt)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: aa !== null ? { id: Mt, overflow: jt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Es(l)),
                (a.return = t),
                (t.child = a),
                (Zl = t),
                (vl = null)))
            : (l = null),
          l === null)
        )
          throw ua(t);
        return ((t.lanes = 536870912), null);
      }
      return on(t, e);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var c = n.dehydrated;
      if ((Kc(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = Yo(l, t, a)));
        else if (t.memoizedState !== null)
          ((t.child = l.child), (t.flags |= 128), (t = null));
        else throw Error(d(558));
      else if (
        (Rl || ce(l, t, a, !1), (u = (a & l.childLanes) !== 0), Rl || u)
      ) {
        if (
          ((e = yl),
          e !== null && ((c = _f(e, a)), c !== 0 && c !== n.retryLane))
        )
          throw ((n.retryLane = c), Ma(l, c), at(e, l, c), ri);
        (An(), (t = Yo(l, t, a)));
      } else
        ((l = n.treeContext),
          (vl = Tt(c.nextSibling)),
          (Zl = t),
          (al = !0),
          (ea = null),
          (zt = !1),
          l !== null && ps(t, l),
          (t = on(t, e)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (l = Yt(l.child, { mode: e.mode, children: e.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function dn(l, t) {
    var a = t.ref;
    if (a === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object") throw Error(d(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function mi(l, t, a, e, u) {
    return (
      Ua(t),
      (a = wc(l, t, a, e, void 0, u)),
      (e = Wc()),
      l !== null && !Rl
        ? ($c(l, t, u), Vt(l, t, u))
        : (al && e && Dc(t), (t.flags |= 1), Ql(l, t, a, u), t.child)
    );
  }
  function Go(l, t, a, e, u, n) {
    return (
      Ua(t),
      (t.updateQueue = null),
      (a = Xs(t, e, a, u)),
      Zs(l),
      (e = Wc()),
      l !== null && !Rl
        ? ($c(l, t, n), Vt(l, t, n))
        : (al && e && Dc(t), (t.flags |= 1), Ql(l, t, a, n), t.child)
    );
  }
  function Zo(l, t, a, e, u) {
    if ((Ua(t), t.stateNode === null)) {
      var n = ae,
        c = a.contextType;
      (typeof c == "object" && c !== null && (n = Xl(c)),
        (n = new a(e, n)),
        (t.memoizedState =
          n.state !== null && n.state !== void 0 ? n.state : null),
        (n.updater = oi),
        (t.stateNode = n),
        (n._reactInternals = t),
        (n = t.stateNode),
        (n.props = e),
        (n.state = t.memoizedState),
        (n.refs = {}),
        Gc(t),
        (c = a.contextType),
        (n.context = typeof c == "object" && c !== null ? Xl(c) : ae),
        (n.state = t.memoizedState),
        (c = a.getDerivedStateFromProps),
        typeof c == "function" && (si(t, a, c, e), (n.state = t.memoizedState)),
        typeof a.getDerivedStateFromProps == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function" ||
          (typeof n.UNSAFE_componentWillMount != "function" &&
            typeof n.componentWillMount != "function") ||
          ((c = n.state),
          typeof n.componentWillMount == "function" && n.componentWillMount(),
          typeof n.UNSAFE_componentWillMount == "function" &&
            n.UNSAFE_componentWillMount(),
          c !== n.state && oi.enqueueReplaceState(n, n.state, null),
          Fe(t, e, n, u),
          $e(),
          (n.state = t.memoizedState)),
        typeof n.componentDidMount == "function" && (t.flags |= 4194308),
        (e = !0));
    } else if (l === null) {
      n = t.stateNode;
      var i = t.memoizedProps,
        f = Za(a, i);
      n.props = f;
      var y = n.context,
        E = a.contextType;
      ((c = ae), typeof E == "object" && E !== null && (c = Xl(E)));
      var p = a.getDerivedStateFromProps;
      ((E =
        typeof p == "function" ||
        typeof n.getSnapshotBeforeUpdate == "function"),
        (i = t.pendingProps !== i),
        E ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((i || y !== c) && No(t, n, e, c)),
        (ca = !1));
      var v = t.memoizedState;
      ((n.state = v),
        Fe(t, e, n, u),
        $e(),
        (y = t.memoizedState),
        i || v !== y || ca
          ? (typeof p == "function" && (si(t, a, p, e), (y = t.memoizedState)),
            (f = ca || Oo(t, a, f, e, v, y, c))
              ? (E ||
                  (typeof n.UNSAFE_componentWillMount != "function" &&
                    typeof n.componentWillMount != "function") ||
                  (typeof n.componentWillMount == "function" &&
                    n.componentWillMount(),
                  typeof n.UNSAFE_componentWillMount == "function" &&
                    n.UNSAFE_componentWillMount()),
                typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof n.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = e),
                (t.memoizedState = y)),
            (n.props = e),
            (n.state = y),
            (n.context = c),
            (e = f))
          : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
            (e = !1)));
    } else {
      ((n = t.stateNode),
        Zc(l, t),
        (c = t.memoizedProps),
        (E = Za(a, c)),
        (n.props = E),
        (p = t.pendingProps),
        (v = n.context),
        (y = a.contextType),
        (f = ae),
        typeof y == "object" && y !== null && (f = Xl(y)),
        (i = a.getDerivedStateFromProps),
        (y =
          typeof i == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function") ||
          (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
            typeof n.componentWillReceiveProps != "function") ||
          ((c !== p || v !== f) && No(t, n, e, f)),
        (ca = !1),
        (v = t.memoizedState),
        (n.state = v),
        Fe(t, e, n, u),
        $e());
      var S = t.memoizedState;
      c !== p ||
      v !== S ||
      ca ||
      (l !== null && l.dependencies !== null && Ku(l.dependencies))
        ? (typeof i == "function" && (si(t, a, i, e), (S = t.memoizedState)),
          (E =
            ca ||
            Oo(t, a, E, e, v, S, f) ||
            (l !== null && l.dependencies !== null && Ku(l.dependencies)))
            ? (y ||
                (typeof n.UNSAFE_componentWillUpdate != "function" &&
                  typeof n.componentWillUpdate != "function") ||
                (typeof n.componentWillUpdate == "function" &&
                  n.componentWillUpdate(e, S, f),
                typeof n.UNSAFE_componentWillUpdate == "function" &&
                  n.UNSAFE_componentWillUpdate(e, S, f)),
              typeof n.componentDidUpdate == "function" && (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof n.componentDidUpdate != "function" ||
                (c === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 4),
              typeof n.getSnapshotBeforeUpdate != "function" ||
                (c === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = e),
              (t.memoizedState = S)),
          (n.props = e),
          (n.state = S),
          (n.context = f),
          (e = E))
        : (typeof n.componentDidUpdate != "function" ||
            (c === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 4),
          typeof n.getSnapshotBeforeUpdate != "function" ||
            (c === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 1024),
          (e = !1));
    }
    return (
      (n = e),
      dn(l, t),
      (e = (t.flags & 128) !== 0),
      n || e
        ? ((n = t.stateNode),
          (a =
            e && typeof a.getDerivedStateFromError != "function"
              ? null
              : n.render()),
          (t.flags |= 1),
          l !== null && e
            ? ((t.child = Ya(t, l.child, null, u)),
              (t.child = Ya(t, null, a, u)))
            : Ql(l, t, a, u),
          (t.memoizedState = n.state),
          (l = t.child))
        : (l = Vt(l, t, u)),
      l
    );
  }
  function Xo(l, t, a, e) {
    return (xa(), (t.flags |= 256), Ql(l, t, a, e), t.child);
  }
  var hi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function yi(l) {
    return { baseLanes: l, cachePool: Rs() };
  }
  function vi(l, t, a) {
    return ((l = l !== null ? l.childLanes & ~a : 0), t && (l |= mt), l);
  }
  function Qo(l, t, a) {
    var e = t.pendingProps,
      u = !1,
      n = (t.flags & 128) !== 0,
      c;
    if (
      ((c = n) ||
        (c =
          l !== null && l.memoizedState === null ? !1 : (Ol.current & 2) !== 0),
      c && ((u = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (al) {
        if (
          (u ? sa(t) : oa(),
          (l = vl)
            ? ((l = Fd(l, zt)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: aa !== null ? { id: Mt, overflow: jt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (a = Es(l)),
                (a.return = t),
                (t.child = a),
                (Zl = t),
                (vl = null)))
            : (l = null),
          l === null)
        )
          throw ua(t);
        return (Ii(l) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var i = e.children;
      return (
        (e = e.fallback),
        u
          ? (oa(),
            (u = t.mode),
            (i = rn({ mode: "hidden", children: i }, u)),
            (e = ja(e, u, a, null)),
            (i.return = t),
            (e.return = t),
            (i.sibling = e),
            (t.child = i),
            (e = t.child),
            (e.memoizedState = yi(a)),
            (e.childLanes = vi(l, c, a)),
            (t.memoizedState = hi),
            tu(null, e))
          : (sa(t), gi(t, i))
      );
    }
    var f = l.memoizedState;
    if (f !== null && ((i = f.dehydrated), i !== null)) {
      if (n)
        t.flags & 256
          ? (sa(t), (t.flags &= -257), (t = Si(l, t, a)))
          : t.memoizedState !== null
            ? (oa(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (oa(),
              (i = e.fallback),
              (u = t.mode),
              (e = rn({ mode: "visible", children: e.children }, u)),
              (i = ja(i, u, a, null)),
              (i.flags |= 2),
              (e.return = t),
              (i.return = t),
              (e.sibling = i),
              (t.child = e),
              Ya(t, l.child, null, a),
              (e = t.child),
              (e.memoizedState = yi(a)),
              (e.childLanes = vi(l, c, a)),
              (t.memoizedState = hi),
              (t = tu(null, e)));
      else if ((sa(t), Ii(i))) {
        if (((c = i.nextSibling && i.nextSibling.dataset), c)) var y = c.dgst;
        ((c = y),
          (e = Error(d(419))),
          (e.stack = ""),
          (e.digest = c),
          Le({ value: e, source: null, stack: null }),
          (t = Si(l, t, a)));
      } else if (
        (Rl || ce(l, t, a, !1), (c = (a & l.childLanes) !== 0), Rl || c)
      ) {
        if (
          ((c = yl),
          c !== null && ((e = _f(c, a)), e !== 0 && e !== f.retryLane))
        )
          throw ((f.retryLane = e), Ma(l, e), at(c, l, e), ri);
        (ki(i) || An(), (t = Si(l, t, a)));
      } else
        ki(i)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = f.treeContext),
            (vl = Tt(i.nextSibling)),
            (Zl = t),
            (al = !0),
            (ea = null),
            (zt = !1),
            l !== null && ps(t, l),
            (t = gi(t, e.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (oa(),
        (i = e.fallback),
        (u = t.mode),
        (f = l.child),
        (y = f.sibling),
        (e = Yt(f, { mode: "hidden", children: e.children })),
        (e.subtreeFlags = f.subtreeFlags & 65011712),
        y !== null ? (i = Yt(y, i)) : ((i = ja(i, u, a, null)), (i.flags |= 2)),
        (i.return = t),
        (e.return = t),
        (e.sibling = i),
        (t.child = e),
        tu(null, e),
        (e = t.child),
        (i = l.child.memoizedState),
        i === null
          ? (i = yi(a))
          : ((u = i.cachePool),
            u !== null
              ? ((f = _l._currentValue),
                (u = u.parent !== f ? { parent: f, pool: f } : u))
              : (u = Rs()),
            (i = { baseLanes: i.baseLanes | a, cachePool: u })),
        (e.memoizedState = i),
        (e.childLanes = vi(l, c, a)),
        (t.memoizedState = hi),
        tu(l.child, e))
      : (sa(t),
        (a = l.child),
        (l = a.sibling),
        (a = Yt(a, { mode: "visible", children: e.children })),
        (a.return = t),
        (a.sibling = null),
        l !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [l]), (t.flags |= 16)) : c.push(l)),
        (t.child = a),
        (t.memoizedState = null),
        a);
  }
  function gi(l, t) {
    return (
      (t = rn({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function rn(l, t) {
    return ((l = st(22, l, null, t)), (l.lanes = 0), l);
  }
  function Si(l, t, a) {
    return (
      Ya(t, l.child, null, a),
      (l = gi(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function Lo(l, t, a) {
    l.lanes |= t;
    var e = l.alternate;
    (e !== null && (e.lanes |= t), Cc(l.return, t, a));
  }
  function bi(l, t, a, e, u, n) {
    var c = l.memoizedState;
    c === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: e,
          tail: a,
          tailMode: u,
          treeForkCount: n,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = e),
        (c.tail = a),
        (c.tailMode = u),
        (c.treeForkCount = n));
  }
  function Vo(l, t, a) {
    var e = t.pendingProps,
      u = e.revealOrder,
      n = e.tail;
    e = e.children;
    var c = Ol.current,
      i = (c & 2) !== 0;
    if (
      (i ? ((c = (c & 1) | 2), (t.flags |= 128)) : (c &= 1),
      M(Ol, c),
      Ql(l, t, e, a),
      (e = al ? Qe : 0),
      !i && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Lo(l, a, t);
        else if (l.tag === 19) Lo(l, a, t);
        else if (l.child !== null) {
          ((l.child.return = l), (l = l.child));
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    switch (u) {
      case "forwards":
        for (a = t.child, u = null; a !== null; )
          ((l = a.alternate),
            l !== null && Pu(l) === null && (u = a),
            (a = a.sibling));
        ((a = u),
          a === null
            ? ((u = t.child), (t.child = null))
            : ((u = a.sibling), (a.sibling = null)),
          bi(t, !1, u, a, n, e));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (((l = u.alternate), l !== null && Pu(l) === null)) {
            t.child = u;
            break;
          }
          ((l = u.sibling), (u.sibling = a), (a = u), (u = l));
        }
        bi(t, !0, a, null, n, e);
        break;
      case "together":
        bi(t, !1, null, null, void 0, e);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Vt(l, t, a) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (ma |= t.lanes),
      (a & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((ce(l, t, a, !1), (a & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(d(153));
    if (t.child !== null) {
      for (
        l = t.child, a = Yt(l, l.pendingProps), t.child = a, a.return = t;
        l.sibling !== null;
      )
        ((l = l.sibling),
          (a = a.sibling = Yt(l, l.pendingProps)),
          (a.return = t));
      a.sibling = null;
    }
    return t.child;
  }
  function Ei(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && Ku(l)));
  }
  function oh(l, t, a) {
    switch (t.tag) {
      case 3:
        (Sl(t, t.stateNode.containerInfo),
          na(t, _l, l.memoizedState.cache),
          xa());
        break;
      case 27:
      case 5:
        _e(t);
        break;
      case 4:
        Sl(t, t.stateNode.containerInfo);
        break;
      case 10:
        na(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Kc(t), null);
        break;
      case 13:
        var e = t.memoizedState;
        if (e !== null)
          return e.dehydrated !== null
            ? (sa(t), (t.flags |= 128), null)
            : (a & t.child.childLanes) !== 0
              ? Qo(l, t, a)
              : (sa(t), (l = Vt(l, t, a)), l !== null ? l.sibling : null);
        sa(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (
          ((e = (a & t.childLanes) !== 0),
          e || (ce(l, t, a, !1), (e = (a & t.childLanes) !== 0)),
          u)
        ) {
          if (e) return Vo(l, t, a);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          M(Ol, Ol.current),
          e)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Bo(l, t, a, t.pendingProps));
      case 24:
        na(t, _l, l.memoizedState.cache);
    }
    return Vt(l, t, a);
  }
  function Ko(l, t, a) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) Rl = !0;
      else {
        if (!Ei(l, a) && (t.flags & 128) === 0) return ((Rl = !1), oh(l, t, a));
        Rl = (l.flags & 131072) !== 0;
      }
    else ((Rl = !1), al && (t.flags & 1048576) !== 0 && zs(t, Qe, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var e = t.pendingProps;
          if (((l = Ba(t.elementType)), (t.type = l), typeof l == "function"))
            Oc(l)
              ? ((e = Za(l, e)), (t.tag = 1), (t = Zo(null, t, l, e, a)))
              : ((t.tag = 0), (t = mi(null, t, l, e, a)));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === Wl) {
                ((t.tag = 11), (t = Co(null, t, l, e, a)));
                break l;
              } else if (u === $) {
                ((t.tag = 14), (t = Uo(null, t, l, e, a)));
                break l;
              }
            }
            throw ((t = Nt(l) || l), Error(d(306, t, "")));
          }
        }
        return t;
      case 0:
        return mi(l, t, t.type, t.pendingProps, a);
      case 1:
        return ((e = t.type), (u = Za(e, t.pendingProps)), Zo(l, t, e, u, a));
      case 3:
        l: {
          if ((Sl(t, t.stateNode.containerInfo), l === null))
            throw Error(d(387));
          e = t.pendingProps;
          var n = t.memoizedState;
          ((u = n.element), Zc(l, t), Fe(t, e, null, a));
          var c = t.memoizedState;
          if (
            ((e = c.cache),
            na(t, _l, e),
            e !== n.cache && Uc(t, [_l], a, !0),
            $e(),
            (e = c.element),
            n.isDehydrated)
          )
            if (
              ((n = { element: e, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = n),
              (t.memoizedState = n),
              t.flags & 256)
            ) {
              t = Xo(l, t, e, a);
              break l;
            } else if (e !== u) {
              ((u = bt(Error(d(424)), t)), Le(u), (t = Xo(l, t, e, a)));
              break l;
            } else {
              switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (
                vl = Tt(l.firstChild),
                  Zl = t,
                  al = !0,
                  ea = null,
                  zt = !0,
                  a = Hs(t, null, e, a),
                  t.child = a;
                a;
              )
                ((a.flags = (a.flags & -3) | 4096), (a = a.sibling));
            }
          else {
            if ((xa(), e === u)) {
              t = Vt(l, t, a);
              break l;
            }
            Ql(l, t, e, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          dn(l, t),
          l === null
            ? (a = ar(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = a)
              : al ||
                ((a = t.type),
                (l = t.pendingProps),
                (e = Dn(_.current).createElement(a)),
                (e[Gl] = t),
                (e[Fl] = l),
                Ll(e, a, l),
                Ul(e),
                (t.stateNode = e))
            : (t.memoizedState = ar(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState,
              )),
          null
        );
      case 27:
        return (
          _e(t),
          l === null &&
            al &&
            ((e = t.stateNode = Pd(t.type, t.pendingProps, _.current)),
            (Zl = t),
            (zt = !0),
            (u = vl),
            Sa(t.type) ? ((Pi = u), (vl = Tt(e.firstChild))) : (vl = u)),
          Ql(l, t, t.pendingProps.children, a),
          dn(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            al &&
            ((u = e = vl) &&
              ((e = Zh(e, t.type, t.pendingProps, zt)),
              e !== null
                ? ((t.stateNode = e),
                  (Zl = t),
                  (vl = Tt(e.firstChild)),
                  (zt = !1),
                  (u = !0))
                : (u = !1)),
            u || ua(t)),
          _e(t),
          (u = t.type),
          (n = t.pendingProps),
          (c = l !== null ? l.memoizedProps : null),
          (e = n.children),
          Wi(u, n) ? (e = null) : c !== null && Wi(u, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = wc(l, t, th, null, null, a)), (vu._currentValue = u)),
          dn(l, t),
          Ql(l, t, e, a),
          t.child
        );
      case 6:
        return (
          l === null &&
            al &&
            ((l = a = vl) &&
              ((a = Xh(a, t.pendingProps, zt)),
              a !== null
                ? ((t.stateNode = a), (Zl = t), (vl = null), (l = !0))
                : (l = !1)),
            l || ua(t)),
          null
        );
      case 13:
        return Qo(l, t, a);
      case 4:
        return (
          Sl(t, t.stateNode.containerInfo),
          (e = t.pendingProps),
          l === null ? (t.child = Ya(t, null, e, a)) : Ql(l, t, e, a),
          t.child
        );
      case 11:
        return Co(l, t, t.type, t.pendingProps, a);
      case 7:
        return (Ql(l, t, t.pendingProps, a), t.child);
      case 8:
        return (Ql(l, t, t.pendingProps.children, a), t.child);
      case 12:
        return (Ql(l, t, t.pendingProps.children, a), t.child);
      case 10:
        return (
          (e = t.pendingProps),
          na(t, t.type, e.value),
          Ql(l, t, e.children, a),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (e = t.pendingProps.children),
          Ua(t),
          (u = Xl(u)),
          (e = e(u)),
          (t.flags |= 1),
          Ql(l, t, e, a),
          t.child
        );
      case 14:
        return Uo(l, t, t.type, t.pendingProps, a);
      case 15:
        return Ho(l, t, t.type, t.pendingProps, a);
      case 19:
        return Vo(l, t, a);
      case 31:
        return sh(l, t, a);
      case 22:
        return Bo(l, t, a, t.pendingProps);
      case 24:
        return (
          Ua(t),
          (e = Xl(_l)),
          l === null
            ? ((u = qc()),
              u === null &&
                ((u = yl),
                (n = Hc()),
                (u.pooledCache = n),
                n.refCount++,
                n !== null && (u.pooledCacheLanes |= a),
                (u = n)),
              (t.memoizedState = { parent: e, cache: u }),
              Gc(t),
              na(t, _l, u))
            : ((l.lanes & a) !== 0 && (Zc(l, t), Fe(t, null, null, a), $e()),
              (u = l.memoizedState),
              (n = t.memoizedState),
              u.parent !== e
                ? ((u = { parent: e, cache: e }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  na(t, _l, e))
                : ((e = n.cache),
                  na(t, _l, e),
                  e !== u.cache && Uc(t, [_l], a, !0))),
          Ql(l, t, t.pendingProps.children, a),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(d(156, t.tag));
  }
  function Kt(l) {
    l.flags |= 4;
  }
  function Ai(l, t, a, e, u) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (u & 335544128) === u))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (Sd()) l.flags |= 8192;
        else throw ((qa = $u), Yc);
    } else l.flags &= -16777217;
  }
  function Jo(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !ir(t)))
      if (Sd()) l.flags |= 8192;
      else throw ((qa = $u), Yc);
  }
  function mn(l, t) {
    (t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? Tf() : 536870912), (l.lanes |= t), (Se |= t)));
  }
  function au(l, t) {
    if (!al)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var a = null; t !== null; )
            (t.alternate !== null && (a = t), (t = t.sibling));
          a === null ? (l.tail = null) : (a.sibling = null);
          break;
        case "collapsed":
          a = l.tail;
          for (var e = null; a !== null; )
            (a.alternate !== null && (e = a), (a = a.sibling));
          e === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (e.sibling = null);
      }
  }
  function gl(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      a = 0,
      e = 0;
    if (t)
      for (var u = l.child; u !== null; )
        ((a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags & 65011712),
          (e |= u.flags & 65011712),
          (u.return = l),
          (u = u.sibling));
    else
      for (u = l.child; u !== null; )
        ((a |= u.lanes | u.childLanes),
          (e |= u.subtreeFlags),
          (e |= u.flags),
          (u.return = l),
          (u = u.sibling));
    return ((l.subtreeFlags |= e), (l.childLanes = a), t);
  }
  function dh(l, t, a) {
    var e = t.pendingProps;
    switch ((Rc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (gl(t), null);
      case 1:
        return (gl(t), null);
      case 3:
        return (
          (a = t.stateNode),
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Xt(_l),
          Tl(),
          a.pendingContext &&
            ((a.context = a.pendingContext), (a.pendingContext = null)),
          (l === null || l.child === null) &&
            (ne(t)
              ? Kt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), jc())),
          gl(t),
          null
        );
      case 26:
        var u = t.type,
          n = t.memoizedState;
        return (
          l === null
            ? (Kt(t),
              n !== null ? (gl(t), Jo(t, n)) : (gl(t), Ai(t, u, null, e, a)))
            : n
              ? n !== l.memoizedState
                ? (Kt(t), gl(t), Jo(t, n))
                : (gl(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps),
                l !== e && Kt(t),
                gl(t),
                Ai(t, u, l, e, a)),
          null
        );
      case 27:
        if (
          (pu(t),
          (a = _.current),
          (u = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== e && Kt(t);
        else {
          if (!e) {
            if (t.stateNode === null) throw Error(d(166));
            return (gl(t), null);
          }
          ((l = x.current),
            ne(t) ? Ts(t) : ((l = Pd(u, e, a)), (t.stateNode = l), Kt(t)));
        }
        return (gl(t), null);
      case 5:
        if ((pu(t), (u = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== e && Kt(t);
        else {
          if (!e) {
            if (t.stateNode === null) throw Error(d(166));
            return (gl(t), null);
          }
          if (((n = x.current), ne(t))) Ts(t);
          else {
            var c = Dn(_.current);
            switch (n) {
              case 1:
                n = c.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                n = c.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    n = c.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    n = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u,
                    );
                    break;
                  case "script":
                    ((n = c.createElement("div")),
                      (n.innerHTML = "<script><\/script>"),
                      (n = n.removeChild(n.firstChild)));
                    break;
                  case "select":
                    ((n =
                      typeof e.is == "string"
                        ? c.createElement("select", { is: e.is })
                        : c.createElement("select")),
                      e.multiple
                        ? (n.multiple = !0)
                        : e.size && (n.size = e.size));
                    break;
                  default:
                    n =
                      typeof e.is == "string"
                        ? c.createElement(u, { is: e.is })
                        : c.createElement(u);
                }
            }
            ((n[Gl] = t), (n[Fl] = e));
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) n.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                ((c.child.return = c), (c = c.child));
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t) break l;
                c = c.return;
              }
              ((c.sibling.return = c.return), (c = c.sibling));
            }
            t.stateNode = n;
            l: switch ((Ll(n, u, e), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break l;
              case "img":
                e = !0;
                break l;
              default:
                e = !1;
            }
            e && Kt(t);
          }
        }
        return (
          gl(t),
          Ai(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, a),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== e && Kt(t);
        else {
          if (typeof e != "string" && t.stateNode === null) throw Error(d(166));
          if (((l = _.current), ne(t))) {
            if (
              ((l = t.stateNode),
              (a = t.memoizedProps),
              (e = null),
              (u = Zl),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            ((l[Gl] = t),
              (l = !!(
                l.nodeValue === a ||
                (e !== null && e.suppressHydrationWarning === !0) ||
                Qd(l.nodeValue, a)
              )),
              l || ua(t, !0));
          } else
            ((l = Dn(l).createTextNode(e)), (l[Gl] = t), (t.stateNode = l));
        }
        return (gl(t), null);
      case 31:
        if (((a = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((e = ne(t)), a !== null)) {
            if (l === null) {
              if (!e) throw Error(d(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(d(557));
              l[Gl] = t;
            } else
              (xa(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (gl(t), (l = !1));
          } else
            ((a = jc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = a),
              (l = !0));
          if (!l) return t.flags & 256 ? (dt(t), t) : (dt(t), null);
          if ((t.flags & 128) !== 0) throw Error(d(558));
        }
        return (gl(t), null);
      case 13:
        if (
          ((e = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((u = ne(t)), e !== null && e.dehydrated !== null)) {
            if (l === null) {
              if (!u) throw Error(d(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(d(317));
              u[Gl] = t;
            } else
              (xa(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (gl(t), (u = !1));
          } else
            ((u = jc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return t.flags & 256 ? (dt(t), t) : (dt(t), null);
        }
        return (
          dt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = a), t)
            : ((a = e !== null),
              (l = l !== null && l.memoizedState !== null),
              a &&
                ((e = t.child),
                (u = null),
                e.alternate !== null &&
                  e.alternate.memoizedState !== null &&
                  e.alternate.memoizedState.cachePool !== null &&
                  (u = e.alternate.memoizedState.cachePool.pool),
                (n = null),
                e.memoizedState !== null &&
                  e.memoizedState.cachePool !== null &&
                  (n = e.memoizedState.cachePool.pool),
                n !== u && (e.flags |= 2048)),
              a !== l && a && (t.child.flags |= 8192),
              mn(t, t.updateQueue),
              gl(t),
              null)
        );
      case 4:
        return (Tl(), l === null && Li(t.stateNode.containerInfo), gl(t), null);
      case 10:
        return (Xt(t.type), gl(t), null);
      case 19:
        if ((T(Ol), (e = t.memoizedState), e === null)) return (gl(t), null);
        if (((u = (t.flags & 128) !== 0), (n = e.rendering), n === null))
          if (u) au(e, !1);
          else {
            if (pl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((n = Pu(l)), n !== null)) {
                  for (
                    t.flags |= 128,
                      au(e, !1),
                      l = n.updateQueue,
                      t.updateQueue = l,
                      mn(t, l),
                      t.subtreeFlags = 0,
                      l = a,
                      a = t.child;
                    a !== null;
                  )
                    (bs(a, l), (a = a.sibling));
                  return (
                    M(Ol, (Ol.current & 1) | 2),
                    al && Gt(t, e.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            e.tail !== null &&
              nt() > Sn &&
              ((t.flags |= 128), (u = !0), au(e, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((l = Pu(n)), l !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                mn(t, l),
                au(e, !0),
                e.tail === null &&
                  e.tailMode === "hidden" &&
                  !n.alternate &&
                  !al)
              )
                return (gl(t), null);
            } else
              2 * nt() - e.renderingStartTime > Sn &&
                a !== 536870912 &&
                ((t.flags |= 128), (u = !0), au(e, !1), (t.lanes = 4194304));
          e.isBackwards
            ? ((n.sibling = t.child), (t.child = n))
            : ((l = e.last),
              l !== null ? (l.sibling = n) : (t.child = n),
              (e.last = n));
        }
        return e.tail !== null
          ? ((l = e.tail),
            (e.rendering = l),
            (e.tail = l.sibling),
            (e.renderingStartTime = nt()),
            (l.sibling = null),
            (a = Ol.current),
            M(Ol, u ? (a & 1) | 2 : a & 1),
            al && Gt(t, e.treeForkCount),
            l)
          : (gl(t), null);
      case 22:
      case 23:
        return (
          dt(t),
          Vc(),
          (e = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== e && (t.flags |= 8192)
            : e && (t.flags |= 8192),
          e
            ? (a & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (gl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : gl(t),
          (a = t.updateQueue),
          a !== null && mn(t, a.retryQueue),
          (a = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (a = l.memoizedState.cachePool.pool),
          (e = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (e = t.memoizedState.cachePool.pool),
          e !== a && (t.flags |= 2048),
          l !== null && T(Ha),
          null
        );
      case 24:
        return (
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Xt(_l),
          gl(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(d(156, t.tag));
  }
  function rh(l, t) {
    switch ((Rc(t), t.tag)) {
      case 1:
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          Xt(_l),
          Tl(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (pu(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((dt(t), t.alternate === null)) throw Error(d(340));
          xa();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (dt(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(d(340));
          xa();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return (T(Ol), null);
      case 4:
        return (Tl(), null);
      case 10:
        return (Xt(t.type), null);
      case 22:
      case 23:
        return (
          dt(t),
          Vc(),
          l !== null && T(Ha),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return (Xt(_l), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function wo(l, t) {
    switch ((Rc(t), t.tag)) {
      case 3:
        (Xt(_l), Tl());
        break;
      case 26:
      case 27:
      case 5:
        pu(t);
        break;
      case 4:
        Tl();
        break;
      case 31:
        t.memoizedState !== null && dt(t);
        break;
      case 13:
        dt(t);
        break;
      case 19:
        T(Ol);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        (dt(t), Vc(), l !== null && T(Ha));
        break;
      case 24:
        Xt(_l);
    }
  }
  function eu(l, t) {
    try {
      var a = t.updateQueue,
        e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            e = void 0;
            var n = a.create,
              c = a.inst;
            ((e = n()), (c.destroy = e));
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (i) {
      sl(t, t.return, i);
    }
  }
  function da(l, t, a) {
    try {
      var e = t.updateQueue,
        u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            var c = e.inst,
              i = c.destroy;
            if (i !== void 0) {
              ((c.destroy = void 0), (u = t));
              var f = a,
                y = i;
              try {
                y();
              } catch (E) {
                sl(u, f, E);
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (E) {
      sl(t, t.return, E);
    }
  }
  function Wo(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        qs(t, a);
      } catch (e) {
        sl(l, l.return, e);
      }
    }
  }
  function $o(l, t, a) {
    ((a.props = Za(l.type, l.memoizedProps)), (a.state = l.memoizedState));
    try {
      a.componentWillUnmount();
    } catch (e) {
      sl(l, t, e);
    }
  }
  function uu(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var e = l.stateNode;
            break;
          case 30:
            e = l.stateNode;
            break;
          default:
            e = l.stateNode;
        }
        typeof a == "function" ? (l.refCleanup = a(e)) : (a.current = e);
      }
    } catch (u) {
      sl(l, t, u);
    }
  }
  function xt(l, t) {
    var a = l.ref,
      e = l.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          sl(l, t, u);
        } finally {
          ((l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null));
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          sl(l, t, u);
        }
      else a.current = null;
  }
  function Fo(l) {
    var t = l.type,
      a = l.memoizedProps,
      e = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break l;
        case "img":
          a.src ? (e.src = a.src) : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      sl(l, l.return, u);
    }
  }
  function zi(l, t, a) {
    try {
      var e = l.stateNode;
      (Uh(e, l.type, a, t), (e[Fl] = t));
    } catch (u) {
      sl(l, l.return, u);
    }
  }
  function ko(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && Sa(l.type)) ||
      l.tag === 4
    );
  }
  function pi(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || ko(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;
      ) {
        if (
          (l.tag === 27 && Sa(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        ((l.child.return = l), (l = l.child));
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ti(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      ((l = l.stateNode),
        t
          ? (a.nodeType === 9
              ? a.body
              : a.nodeName === "HTML"
                ? a.ownerDocument.body
                : a
            ).insertBefore(l, t)
          : ((t =
              a.nodeType === 9
                ? a.body
                : a.nodeName === "HTML"
                  ? a.ownerDocument.body
                  : a),
            t.appendChild(l),
            (a = a._reactRootContainer),
            a != null || t.onclick !== null || (t.onclick = Bt)));
    else if (
      e !== 4 &&
      (e === 27 && Sa(l.type) && ((a = l.stateNode), (t = null)),
      (l = l.child),
      l !== null)
    )
      for (Ti(l, t, a), l = l.sibling; l !== null; )
        (Ti(l, t, a), (l = l.sibling));
  }
  function hn(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      ((l = l.stateNode), t ? a.insertBefore(l, t) : a.appendChild(l));
    else if (
      e !== 4 &&
      (e === 27 && Sa(l.type) && (a = l.stateNode), (l = l.child), l !== null)
    )
      for (hn(l, t, a), l = l.sibling; l !== null; )
        (hn(l, t, a), (l = l.sibling));
  }
  function Io(l) {
    var t = l.stateNode,
      a = l.memoizedProps;
    try {
      for (var e = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      (Ll(t, e, a), (t[Gl] = l), (t[Fl] = a));
    } catch (n) {
      sl(l, l.return, n);
    }
  }
  var Jt = !1,
    Ml = !1,
    Oi = !1,
    Po = typeof WeakSet == "function" ? WeakSet : Set,
    Hl = null;
  function mh(l, t) {
    if (((l = l.containerInfo), (Ji = Hn), (l = os(l)), Sc(l))) {
      if ("selectionStart" in l)
        var a = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          a = ((a = l.ownerDocument) && a.defaultView) || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var u = e.anchorOffset,
              n = e.focusNode;
            e = e.focusOffset;
            try {
              (a.nodeType, n.nodeType);
            } catch {
              a = null;
              break l;
            }
            var c = 0,
              i = -1,
              f = -1,
              y = 0,
              E = 0,
              p = l,
              v = null;
            t: for (;;) {
              for (
                var S;
                p !== a || (u !== 0 && p.nodeType !== 3) || (i = c + u),
                  p !== n || (e !== 0 && p.nodeType !== 3) || (f = c + e),
                  p.nodeType === 3 && (c += p.nodeValue.length),
                  (S = p.firstChild) !== null;
              )
                ((v = p), (p = S));
              for (;;) {
                if (p === l) break t;
                if (
                  (v === a && ++y === u && (i = c),
                  v === n && ++E === e && (f = c),
                  (S = p.nextSibling) !== null)
                )
                  break;
                ((p = v), (v = p.parentNode));
              }
              p = S;
            }
            a = i === -1 || f === -1 ? null : { start: i, end: f };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      wi = { focusedElem: l, selectionRange: a }, Hn = !1, Hl = t;
      Hl !== null;
    )
      if (
        ((t = Hl), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
      )
        ((l.return = t), (Hl = l));
      else
        for (; Hl !== null; ) {
          switch (((t = Hl), (n = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if (
                (l & 4) !== 0 &&
                ((l = t.updateQueue),
                (l = l !== null ? l.events : null),
                l !== null)
              )
                for (a = 0; a < l.length; a++)
                  ((u = l[a]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                ((l = void 0),
                  (a = t),
                  (u = n.memoizedProps),
                  (n = n.memoizedState),
                  (e = a.stateNode));
                try {
                  var j = Za(a.type, u);
                  ((l = e.getSnapshotBeforeUpdate(j, n)),
                    (e.__reactInternalSnapshotBeforeUpdate = l));
                } catch (G) {
                  sl(a, a.return, G);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (
                  ((l = t.stateNode.containerInfo), (a = l.nodeType), a === 9)
                )
                  Fi(l);
                else if (a === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Fi(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(d(163));
          }
          if (((l = t.sibling), l !== null)) {
            ((l.return = t.return), (Hl = l));
            break;
          }
          Hl = t.return;
        }
  }
  function ld(l, t, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        (Wt(l, a), e & 4 && eu(5, a));
        break;
      case 1:
        if ((Wt(l, a), e & 4))
          if (((l = a.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (c) {
              sl(a, a.return, c);
            }
          else {
            var u = Za(a.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(u, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              sl(a, a.return, c);
            }
          }
        (e & 64 && Wo(a), e & 512 && uu(a, a.return));
        break;
      case 3:
        if ((Wt(l, a), e & 64 && ((l = a.updateQueue), l !== null))) {
          if (((t = null), a.child !== null))
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            qs(l, t);
          } catch (c) {
            sl(a, a.return, c);
          }
        }
        break;
      case 27:
        t === null && e & 4 && Io(a);
      case 26:
      case 5:
        (Wt(l, a), t === null && e & 4 && Fo(a), e & 512 && uu(a, a.return));
        break;
      case 12:
        Wt(l, a);
        break;
      case 31:
        (Wt(l, a), e & 4 && ed(l, a));
        break;
      case 13:
        (Wt(l, a),
          e & 4 && ud(l, a),
          e & 64 &&
            ((l = a.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((a = zh.bind(null, a)), Qh(l, a)))));
        break;
      case 22:
        if (((e = a.memoizedState !== null || Jt), !e)) {
          ((t = (t !== null && t.memoizedState !== null) || Ml), (u = Jt));
          var n = Ml;
          ((Jt = e),
            (Ml = t) && !n ? $t(l, a, (a.subtreeFlags & 8772) !== 0) : Wt(l, a),
            (Jt = u),
            (Ml = n));
        }
        break;
      case 30:
        break;
      default:
        Wt(l, a);
    }
  }
  function td(l) {
    var t = l.alternate;
    (t !== null && ((l.alternate = null), td(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && tc(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null));
  }
  var bl = null,
    Il = !1;
  function wt(l, t, a) {
    for (a = a.child; a !== null; ) (ad(l, t, a), (a = a.sibling));
  }
  function ad(l, t, a) {
    if (ct && typeof ct.onCommitFiberUnmount == "function")
      try {
        ct.onCommitFiberUnmount(De, a);
      } catch {}
    switch (a.tag) {
      case 26:
        (Ml || xt(a, t),
          wt(l, t, a),
          a.memoizedState
            ? a.memoizedState.count--
            : a.stateNode && ((a = a.stateNode), a.parentNode.removeChild(a)));
        break;
      case 27:
        Ml || xt(a, t);
        var e = bl,
          u = Il;
        (Sa(a.type) && ((bl = a.stateNode), (Il = !1)),
          wt(l, t, a),
          mu(a.stateNode),
          (bl = e),
          (Il = u));
        break;
      case 5:
        Ml || xt(a, t);
      case 6:
        if (
          ((e = bl),
          (u = Il),
          (bl = null),
          wt(l, t, a),
          (bl = e),
          (Il = u),
          bl !== null)
        )
          if (Il)
            try {
              (bl.nodeType === 9
                ? bl.body
                : bl.nodeName === "HTML"
                  ? bl.ownerDocument.body
                  : bl
              ).removeChild(a.stateNode);
            } catch (n) {
              sl(a, t, n);
            }
          else
            try {
              bl.removeChild(a.stateNode);
            } catch (n) {
              sl(a, t, n);
            }
        break;
      case 18:
        bl !== null &&
          (Il
            ? ((l = bl),
              Wd(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                    ? l.ownerDocument.body
                    : l,
                a.stateNode,
              ),
              Ne(l))
            : Wd(bl, a.stateNode));
        break;
      case 4:
        ((e = bl),
          (u = Il),
          (bl = a.stateNode.containerInfo),
          (Il = !0),
          wt(l, t, a),
          (bl = e),
          (Il = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (da(2, a, t), Ml || da(4, a, t), wt(l, t, a));
        break;
      case 1:
        (Ml ||
          (xt(a, t),
          (e = a.stateNode),
          typeof e.componentWillUnmount == "function" && $o(a, t, e)),
          wt(l, t, a));
        break;
      case 21:
        wt(l, t, a);
        break;
      case 22:
        ((Ml = (e = Ml) || a.memoizedState !== null), wt(l, t, a), (Ml = e));
        break;
      default:
        wt(l, t, a);
    }
  }
  function ed(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        Ne(l);
      } catch (a) {
        sl(t, t.return, a);
      }
    }
  }
  function ud(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        Ne(l);
      } catch (a) {
        sl(t, t.return, a);
      }
  }
  function hh(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return (t === null && (t = l.stateNode = new Po()), t);
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new Po()),
          t
        );
      default:
        throw Error(d(435, l.tag));
    }
  }
  function yn(l, t) {
    var a = hh(l);
    t.forEach(function (e) {
      if (!a.has(e)) {
        a.add(e);
        var u = ph.bind(null, l, e);
        e.then(u, u);
      }
    });
  }
  function Pl(l, t) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e],
          n = l,
          c = t,
          i = c;
        l: for (; i !== null; ) {
          switch (i.tag) {
            case 27:
              if (Sa(i.type)) {
                ((bl = i.stateNode), (Il = !1));
                break l;
              }
              break;
            case 5:
              ((bl = i.stateNode), (Il = !1));
              break l;
            case 3:
            case 4:
              ((bl = i.stateNode.containerInfo), (Il = !0));
              break l;
          }
          i = i.return;
        }
        if (bl === null) throw Error(d(160));
        (ad(n, c, u),
          (bl = null),
          (Il = !1),
          (n = u.alternate),
          n !== null && (n.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (nd(t, l), (t = t.sibling));
  }
  var Dt = null;
  function nd(l, t) {
    var a = l.alternate,
      e = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Pl(t, l),
          lt(l),
          e & 4 && (da(3, l, l.return), eu(3, l), da(5, l, l.return)));
        break;
      case 1:
        (Pl(t, l),
          lt(l),
          e & 512 && (Ml || a === null || xt(a, a.return)),
          e & 64 &&
            Jt &&
            ((l = l.updateQueue),
            l !== null &&
              ((e = l.callbacks),
              e !== null &&
                ((a = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = a === null ? e : a.concat(e))))));
        break;
      case 26:
        var u = Dt;
        if (
          (Pl(t, l),
          lt(l),
          e & 512 && (Ml || a === null || xt(a, a.return)),
          e & 4)
        ) {
          var n = a !== null ? a.memoizedState : null;
          if (((e = l.memoizedState), a === null))
            if (e === null)
              if (l.stateNode === null) {
                l: {
                  ((e = l.type),
                    (a = l.memoizedProps),
                    (u = u.ownerDocument || u));
                  t: switch (e) {
                    case "title":
                      ((n = u.getElementsByTagName("title")[0]),
                        (!n ||
                          n[je] ||
                          n[Gl] ||
                          n.namespaceURI === "http://www.w3.org/2000/svg" ||
                          n.hasAttribute("itemprop")) &&
                          ((n = u.createElement(e)),
                          u.head.insertBefore(
                            n,
                            u.querySelector("head > title"),
                          )),
                        Ll(n, e, a),
                        (n[Gl] = l),
                        Ul(n),
                        (e = n));
                      break l;
                    case "link":
                      var c = nr("link", "href", u).get(e + (a.href || ""));
                      if (c) {
                        for (var i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("href") ===
                              (a.href == null || a.href === ""
                                ? null
                                : a.href) &&
                              n.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) &&
                              n.getAttribute("title") ===
                                (a.title == null ? null : a.title) &&
                              n.getAttribute("crossorigin") ===
                                (a.crossOrigin == null ? null : a.crossOrigin))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(e)),
                        Ll(n, e, a),
                        u.head.appendChild(n));
                      break;
                    case "meta":
                      if (
                        (c = nr("meta", "content", u).get(
                          e + (a.content || ""),
                        ))
                      ) {
                        for (i = 0; i < c.length; i++)
                          if (
                            ((n = c[i]),
                            n.getAttribute("content") ===
                              (a.content == null ? null : "" + a.content) &&
                              n.getAttribute("name") ===
                                (a.name == null ? null : a.name) &&
                              n.getAttribute("property") ===
                                (a.property == null ? null : a.property) &&
                              n.getAttribute("http-equiv") ===
                                (a.httpEquiv == null ? null : a.httpEquiv) &&
                              n.getAttribute("charset") ===
                                (a.charSet == null ? null : a.charSet))
                          ) {
                            c.splice(i, 1);
                            break t;
                          }
                      }
                      ((n = u.createElement(e)),
                        Ll(n, e, a),
                        u.head.appendChild(n));
                      break;
                    default:
                      throw Error(d(468, e));
                  }
                  ((n[Gl] = l), Ul(n), (e = n));
                }
                l.stateNode = e;
              } else cr(u, l.type, l.stateNode);
            else l.stateNode = ur(u, e, l.memoizedProps);
          else
            n !== e
              ? (n === null
                  ? a.stateNode !== null &&
                    ((a = a.stateNode), a.parentNode.removeChild(a))
                  : n.count--,
                e === null
                  ? cr(u, l.type, l.stateNode)
                  : ur(u, e, l.memoizedProps))
              : e === null &&
                l.stateNode !== null &&
                zi(l, l.memoizedProps, a.memoizedProps);
        }
        break;
      case 27:
        (Pl(t, l),
          lt(l),
          e & 512 && (Ml || a === null || xt(a, a.return)),
          a !== null && e & 4 && zi(l, l.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if (
          (Pl(t, l),
          lt(l),
          e & 512 && (Ml || a === null || xt(a, a.return)),
          l.flags & 32)
        ) {
          u = l.stateNode;
          try {
            $a(u, "");
          } catch (j) {
            sl(l, l.return, j);
          }
        }
        (e & 4 &&
          l.stateNode != null &&
          ((u = l.memoizedProps), zi(l, u, a !== null ? a.memoizedProps : u)),
          e & 1024 && (Oi = !0));
        break;
      case 6:
        if ((Pl(t, l), lt(l), e & 4)) {
          if (l.stateNode === null) throw Error(d(162));
          ((e = l.memoizedProps), (a = l.stateNode));
          try {
            a.nodeValue = e;
          } catch (j) {
            sl(l, l.return, j);
          }
        }
        break;
      case 3:
        if (
          ((jn = null),
          (u = Dt),
          (Dt = Rn(t.containerInfo)),
          Pl(t, l),
          (Dt = u),
          lt(l),
          e & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            Ne(t.containerInfo);
          } catch (j) {
            sl(l, l.return, j);
          }
        Oi && ((Oi = !1), cd(l));
        break;
      case 4:
        ((e = Dt),
          (Dt = Rn(l.stateNode.containerInfo)),
          Pl(t, l),
          lt(l),
          (Dt = e));
        break;
      case 12:
        (Pl(t, l), lt(l));
        break;
      case 31:
        (Pl(t, l),
          lt(l),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), yn(l, e))));
        break;
      case 13:
        (Pl(t, l),
          lt(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (gn = nt()),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), yn(l, e))));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = a !== null && a.memoizedState !== null,
          y = Jt,
          E = Ml;
        if (
          ((Jt = y || u),
          (Ml = E || f),
          Pl(t, l),
          (Ml = E),
          (Jt = y),
          lt(l),
          e & 8192)
        )
          l: for (
            t = l.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (a === null || f || Jt || Ml || Xa(l)),
              a = null,
              t = l;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                f = a = t;
                try {
                  if (((n = f.stateNode), u))
                    ((c = n.style),
                      typeof c.setProperty == "function"
                        ? c.setProperty("display", "none", "important")
                        : (c.display = "none"));
                  else {
                    i = f.stateNode;
                    var p = f.memoizedProps.style,
                      v =
                        p != null && p.hasOwnProperty("display")
                          ? p.display
                          : null;
                    i.style.display =
                      v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                  }
                } catch (j) {
                  sl(f, f.return, j);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (j) {
                  sl(f, f.return, j);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                f = t;
                try {
                  var S = f.stateNode;
                  u ? $d(S, !0) : $d(f.stateNode, !1);
                } catch (j) {
                  sl(f, f.return, j);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === l) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              (a === t && (a = null), (t = t.return));
            }
            (a === t && (a = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        e & 4 &&
          ((e = l.updateQueue),
          e !== null &&
            ((a = e.retryQueue),
            a !== null && ((e.retryQueue = null), yn(l, a))));
        break;
      case 19:
        (Pl(t, l),
          lt(l),
          e & 4 &&
            ((e = l.updateQueue),
            e !== null && ((l.updateQueue = null), yn(l, e))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Pl(t, l), lt(l));
    }
  }
  function lt(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, e = l.return; e !== null; ) {
          if (ko(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        if (a == null) throw Error(d(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode,
              n = pi(l);
            hn(l, n, u);
            break;
          case 5:
            var c = a.stateNode;
            a.flags & 32 && ($a(c, ""), (a.flags &= -33));
            var i = pi(l);
            hn(l, i, c);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo,
              y = pi(l);
            Ti(l, y, f);
            break;
          default:
            throw Error(d(161));
        }
      } catch (E) {
        sl(l, l.return, E);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function cd(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        (cd(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (l = l.sibling));
      }
  }
  function Wt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (ld(l, t.alternate, t), (t = t.sibling));
  }
  function Xa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (da(4, t, t.return), Xa(t));
          break;
        case 1:
          xt(t, t.return);
          var a = t.stateNode;
          (typeof a.componentWillUnmount == "function" && $o(t, t.return, a),
            Xa(t));
          break;
        case 27:
          mu(t.stateNode);
        case 26:
        case 5:
          (xt(t, t.return), Xa(t));
          break;
        case 22:
          t.memoizedState === null && Xa(t);
          break;
        case 30:
          Xa(t);
          break;
        default:
          Xa(t);
      }
      l = l.sibling;
    }
  }
  function $t(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var e = t.alternate,
        u = l,
        n = t,
        c = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ($t(u, n, a), eu(4, n));
          break;
        case 1:
          if (
            ($t(u, n, a),
            (e = n),
            (u = e.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (y) {
              sl(e, e.return, y);
            }
          if (((e = n), (u = e.updateQueue), u !== null)) {
            var i = e.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Bs(f[u], i);
            } catch (y) {
              sl(e, e.return, y);
            }
          }
          (a && c & 64 && Wo(n), uu(n, n.return));
          break;
        case 27:
          Io(n);
        case 26:
        case 5:
          ($t(u, n, a), a && e === null && c & 4 && Fo(n), uu(n, n.return));
          break;
        case 12:
          $t(u, n, a);
          break;
        case 31:
          ($t(u, n, a), a && c & 4 && ed(u, n));
          break;
        case 13:
          ($t(u, n, a), a && c & 4 && ud(u, n));
          break;
        case 22:
          (n.memoizedState === null && $t(u, n, a), uu(n, n.return));
          break;
        case 30:
          break;
        default:
          $t(u, n, a);
      }
      t = t.sibling;
    }
  }
  function Ni(l, t) {
    var a = null;
    (l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (a = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== a && (l != null && l.refCount++, a != null && Ve(a)));
  }
  function _i(l, t) {
    ((l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Ve(l)));
  }
  function Rt(l, t, a, e) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (id(l, t, a, e), (t = t.sibling));
  }
  function id(l, t, a, e) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Rt(l, t, a, e), u & 2048 && eu(9, t));
        break;
      case 1:
        Rt(l, t, a, e);
        break;
      case 3:
        (Rt(l, t, a, e),
          u & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && Ve(l))));
        break;
      case 12:
        if (u & 2048) {
          (Rt(l, t, a, e), (l = t.stateNode));
          try {
            var n = t.memoizedProps,
              c = n.id,
              i = n.onPostCommit;
            typeof i == "function" &&
              i(
                c,
                t.alternate === null ? "mount" : "update",
                l.passiveEffectDuration,
                -0,
              );
          } catch (f) {
            sl(t, t.return, f);
          }
        } else Rt(l, t, a, e);
        break;
      case 31:
        Rt(l, t, a, e);
        break;
      case 13:
        Rt(l, t, a, e);
        break;
      case 23:
        break;
      case 22:
        ((n = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? n._visibility & 2
              ? Rt(l, t, a, e)
              : nu(l, t)
            : n._visibility & 2
              ? Rt(l, t, a, e)
              : ((n._visibility |= 2),
                ye(l, t, a, e, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Ni(c, t));
        break;
      case 24:
        (Rt(l, t, a, e), u & 2048 && _i(t.alternate, t));
        break;
      default:
        Rt(l, t, a, e);
    }
  }
  function ye(l, t, a, e, u) {
    for (
      u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var n = l,
        c = t,
        i = a,
        f = e,
        y = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (ye(n, c, i, f, u), eu(8, c));
          break;
        case 23:
          break;
        case 22:
          var E = c.stateNode;
          (c.memoizedState !== null
            ? E._visibility & 2
              ? ye(n, c, i, f, u)
              : nu(n, c)
            : ((E._visibility |= 2), ye(n, c, i, f, u)),
            u && y & 2048 && Ni(c.alternate, c));
          break;
        case 24:
          (ye(n, c, i, f, u), u && y & 2048 && _i(c.alternate, c));
          break;
        default:
          ye(n, c, i, f, u);
      }
      t = t.sibling;
    }
  }
  function nu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var a = l,
          e = t,
          u = e.flags;
        switch (e.tag) {
          case 22:
            (nu(a, e), u & 2048 && Ni(e.alternate, e));
            break;
          case 24:
            (nu(a, e), u & 2048 && _i(e.alternate, e));
            break;
          default:
            nu(a, e);
        }
        t = t.sibling;
      }
  }
  var cu = 8192;
  function ve(l, t, a) {
    if (l.subtreeFlags & cu)
      for (l = l.child; l !== null; ) (fd(l, t, a), (l = l.sibling));
  }
  function fd(l, t, a) {
    switch (l.tag) {
      case 26:
        (ve(l, t, a),
          l.flags & cu &&
            l.memoizedState !== null &&
            ly(a, Dt, l.memoizedState, l.memoizedProps));
        break;
      case 5:
        ve(l, t, a);
        break;
      case 3:
      case 4:
        var e = Dt;
        ((Dt = Rn(l.stateNode.containerInfo)), ve(l, t, a), (Dt = e));
        break;
      case 22:
        l.memoizedState === null &&
          ((e = l.alternate),
          e !== null && e.memoizedState !== null
            ? ((e = cu), (cu = 16777216), ve(l, t, a), (cu = e))
            : ve(l, t, a));
        break;
      default:
        ve(l, t, a);
    }
  }
  function sd(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do ((t = l.sibling), (l.sibling = null), (l = t));
      while (l !== null);
    }
  }
  function iu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          ((Hl = e), dd(e, l));
        }
      sd(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) (od(l), (l = l.sibling));
  }
  function od(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (iu(l), l.flags & 2048 && da(9, l, l.return));
        break;
      case 3:
        iu(l);
        break;
      case 12:
        iu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), vn(l))
          : iu(l);
        break;
      default:
        iu(l);
    }
  }
  function vn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          ((Hl = e), dd(e, l));
        }
      sd(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          (da(8, t, t.return), vn(t));
          break;
        case 22:
          ((a = t.stateNode),
            a._visibility & 2 && ((a._visibility &= -3), vn(t)));
          break;
        default:
          vn(t);
      }
      l = l.sibling;
    }
  }
  function dd(l, t) {
    for (; Hl !== null; ) {
      var a = Hl;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          da(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          Ve(a.memoizedState.cache);
      }
      if (((e = a.child), e !== null)) ((e.return = a), (Hl = e));
      else
        l: for (a = l; Hl !== null; ) {
          e = Hl;
          var u = e.sibling,
            n = e.return;
          if ((td(e), e === a)) {
            Hl = null;
            break l;
          }
          if (u !== null) {
            ((u.return = n), (Hl = u));
            break l;
          }
          Hl = n;
        }
    }
  }
  var yh = {
      getCacheForType: function (l) {
        var t = Xl(_l),
          a = t.data.get(l);
        return (a === void 0 && ((a = l()), t.data.set(l, a)), a);
      },
      cacheSignal: function () {
        return Xl(_l).controller.signal;
      },
    },
    vh = typeof WeakMap == "function" ? WeakMap : Map,
    cl = 0,
    yl = null,
    F = null,
    I = 0,
    fl = 0,
    rt = null,
    ra = !1,
    ge = !1,
    Di = !1,
    Ft = 0,
    pl = 0,
    ma = 0,
    Qa = 0,
    Ri = 0,
    mt = 0,
    Se = 0,
    fu = null,
    tt = null,
    Mi = !1,
    gn = 0,
    rd = 0,
    Sn = 1 / 0,
    bn = null,
    ha = null,
    Cl = 0,
    ya = null,
    be = null,
    kt = 0,
    ji = 0,
    xi = null,
    md = null,
    su = 0,
    Ci = null;
  function ht() {
    return (cl & 2) !== 0 && I !== 0 ? I & -I : A.T !== null ? Gi() : Df();
  }
  function hd() {
    if (mt === 0)
      if ((I & 536870912) === 0 || al) {
        var l = Nu;
        ((Nu <<= 1), (Nu & 3932160) === 0 && (Nu = 262144), (mt = l));
      } else mt = 536870912;
    return ((l = ot.current), l !== null && (l.flags |= 32), mt);
  }
  function at(l, t, a) {
    (((l === yl && (fl === 2 || fl === 9)) || l.cancelPendingCommit !== null) &&
      (Ee(l, 0), va(l, I, mt, !1)),
      Me(l, a),
      ((cl & 2) === 0 || l !== yl) &&
        (l === yl &&
          ((cl & 2) === 0 && (Qa |= a), pl === 4 && va(l, I, mt, !1)),
        Ct(l)));
  }
  function yd(l, t, a) {
    if ((cl & 6) !== 0) throw Error(d(327));
    var e = (!a && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Re(l, t),
      u = e ? bh(l, t) : Hi(l, t, !0),
      n = e;
    do {
      if (u === 0) {
        ge && !e && va(l, t, 0, !1);
        break;
      } else {
        if (((a = l.current.alternate), n && !gh(a))) {
          ((u = Hi(l, t, !1)), (n = !1));
          continue;
        }
        if (u === 2) {
          if (((n = t), l.errorRecoveryDisabledLanes & n)) var c = 0;
          else
            ((c = l.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0));
          if (c !== 0) {
            t = c;
            l: {
              var i = l;
              u = fu;
              var f = i.current.memoizedState.isDehydrated;
              if ((f && (Ee(i, c).flags |= 256), (c = Hi(i, c, !1)), c !== 2)) {
                if (Di && !f) {
                  ((i.errorRecoveryDisabledLanes |= n), (Qa |= n), (u = 4));
                  break l;
                }
                ((n = tt),
                  (tt = u),
                  n !== null &&
                    (tt === null ? (tt = n) : tt.push.apply(tt, n)));
              }
              u = c;
            }
            if (((n = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Ee(l, 0), va(l, t, 0, !0));
          break;
        }
        l: {
          switch (((e = l), (n = u), n)) {
            case 0:
            case 1:
              throw Error(d(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              va(e, t, mt, !ra);
              break l;
            case 2:
              tt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(d(329));
          }
          if ((t & 62914560) === t && ((u = gn + 300 - nt()), 10 < u)) {
            if ((va(e, t, mt, !ra), Du(e, 0, !0) !== 0)) break l;
            ((kt = t),
              (e.timeoutHandle = Jd(
                vd.bind(
                  null,
                  e,
                  a,
                  tt,
                  bn,
                  Mi,
                  t,
                  mt,
                  Qa,
                  Se,
                  ra,
                  n,
                  "Throttled",
                  -0,
                  0,
                ),
                u,
              )));
            break l;
          }
          vd(e, a, tt, bn, Mi, t, mt, Qa, Se, ra, n, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ct(l);
  }
  function vd(l, t, a, e, u, n, c, i, f, y, E, p, v, S) {
    if (
      ((l.timeoutHandle = -1),
      (p = t.subtreeFlags),
      p & 8192 || (p & 16785408) === 16785408)
    ) {
      ((p = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Bt,
      }),
        fd(t, n, p));
      var j =
        (n & 62914560) === n ? gn - nt() : (n & 4194048) === n ? rd - nt() : 0;
      if (((j = ty(p, j)), j !== null)) {
        ((kt = n),
          (l.cancelPendingCommit = j(
            Td.bind(null, l, t, n, a, e, u, c, i, f, E, p, null, v, S),
          )),
          va(l, n, c, !y));
        return;
      }
    }
    Td(l, t, n, a, e, u, c, i, f);
  }
  function gh(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if (
        (a === 0 || a === 11 || a === 15) &&
        t.flags & 16384 &&
        ((a = t.updateQueue), a !== null && ((a = a.stores), a !== null))
      )
        for (var e = 0; e < a.length; e++) {
          var u = a[e],
            n = u.getSnapshot;
          u = u.value;
          try {
            if (!ft(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((a = t.child), t.subtreeFlags & 16384 && a !== null))
        ((a.return = t), (t = a));
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function va(l, t, a, e) {
    ((t &= ~Ri),
      (t &= ~Qa),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      e && (l.warmLanes |= t),
      (e = l.expirationTimes));
    for (var u = t; 0 < u; ) {
      var n = 31 - it(u),
        c = 1 << n;
      ((e[n] = -1), (u &= ~c));
    }
    a !== 0 && Of(l, a, t);
  }
  function En() {
    return (cl & 6) === 0 ? (ou(0), !1) : !0;
  }
  function Ui() {
    if (F !== null) {
      if (fl === 0) var l = F.return;
      else ((l = F), (Zt = Ca = null), Fc(l), (oe = null), (Je = 0), (l = F));
      for (; l !== null; ) (wo(l.alternate, l), (l = l.return));
      F = null;
    }
  }
  function Ee(l, t) {
    var a = l.timeoutHandle;
    (a !== -1 && ((l.timeoutHandle = -1), qh(a)),
      (a = l.cancelPendingCommit),
      a !== null && ((l.cancelPendingCommit = null), a()),
      (kt = 0),
      Ui(),
      (yl = l),
      (F = a = Yt(l.current, null)),
      (I = t),
      (fl = 0),
      (rt = null),
      (ra = !1),
      (ge = Re(l, t)),
      (Di = !1),
      (Se = mt = Ri = Qa = ma = pl = 0),
      (tt = fu = null),
      (Mi = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var u = 31 - it(e),
          n = 1 << u;
        ((t |= l[u]), (e &= ~n));
      }
    return ((Ft = t), Zu(), a);
  }
  function gd(l, t) {
    ((K = null),
      (A.H = lu),
      t === se || t === Wu
        ? ((t = xs()), (fl = 3))
        : t === Yc
          ? ((t = xs()), (fl = 4))
          : (fl =
              t === ri
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (rt = t),
      F === null && ((pl = 1), sn(l, bt(t, l.current))));
  }
  function Sd() {
    var l = ot.current;
    return l === null
      ? !0
      : (I & 4194048) === I
        ? pt === null
        : (I & 62914560) === I || (I & 536870912) !== 0
          ? l === pt
          : !1;
  }
  function bd() {
    var l = A.H;
    return ((A.H = lu), l === null ? lu : l);
  }
  function Ed() {
    var l = A.A;
    return ((A.A = yh), l);
  }
  function An() {
    ((pl = 4),
      ra || ((I & 4194048) !== I && ot.current !== null) || (ge = !0),
      ((ma & 134217727) === 0 && (Qa & 134217727) === 0) ||
        yl === null ||
        va(yl, I, mt, !1));
  }
  function Hi(l, t, a) {
    var e = cl;
    cl |= 2;
    var u = bd(),
      n = Ed();
    ((yl !== l || I !== t) && ((bn = null), Ee(l, t)), (t = !1));
    var c = pl;
    l: do
      try {
        if (fl !== 0 && F !== null) {
          var i = F,
            f = rt;
          switch (fl) {
            case 8:
              (Ui(), (c = 6));
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              ot.current === null && (t = !0);
              var y = fl;
              if (((fl = 0), (rt = null), Ae(l, i, f, y), a && ge)) {
                c = 0;
                break l;
              }
              break;
            default:
              ((y = fl), (fl = 0), (rt = null), Ae(l, i, f, y));
          }
        }
        (Sh(), (c = pl));
        break;
      } catch (E) {
        gd(l, E);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Zt = Ca = null),
      (cl = e),
      (A.H = u),
      (A.A = n),
      F === null && ((yl = null), (I = 0), Zu()),
      c
    );
  }
  function Sh() {
    for (; F !== null; ) Ad(F);
  }
  function bh(l, t) {
    var a = cl;
    cl |= 2;
    var e = bd(),
      u = Ed();
    yl !== l || I !== t
      ? ((bn = null), (Sn = nt() + 500), Ee(l, t))
      : (ge = Re(l, t));
    l: do
      try {
        if (fl !== 0 && F !== null) {
          t = F;
          var n = rt;
          t: switch (fl) {
            case 1:
              ((fl = 0), (rt = null), Ae(l, t, n, 1));
              break;
            case 2:
            case 9:
              if (Ms(n)) {
                ((fl = 0), (rt = null), zd(t));
                break;
              }
              ((t = function () {
                ((fl !== 2 && fl !== 9) || yl !== l || (fl = 7), Ct(l));
              }),
                n.then(t, t));
              break l;
            case 3:
              fl = 7;
              break l;
            case 4:
              fl = 5;
              break l;
            case 7:
              Ms(n)
                ? ((fl = 0), (rt = null), zd(t))
                : ((fl = 0), (rt = null), Ae(l, t, n, 7));
              break;
            case 5:
              var c = null;
              switch (F.tag) {
                case 26:
                  c = F.memoizedState;
                case 5:
                case 27:
                  var i = F;
                  if (c ? ir(c) : i.stateNode.complete) {
                    ((fl = 0), (rt = null));
                    var f = i.sibling;
                    if (f !== null) F = f;
                    else {
                      var y = i.return;
                      y !== null ? ((F = y), zn(y)) : (F = null);
                    }
                    break t;
                  }
              }
              ((fl = 0), (rt = null), Ae(l, t, n, 5));
              break;
            case 6:
              ((fl = 0), (rt = null), Ae(l, t, n, 6));
              break;
            case 8:
              (Ui(), (pl = 6));
              break l;
            default:
              throw Error(d(462));
          }
        }
        Eh();
        break;
      } catch (E) {
        gd(l, E);
      }
    while (!0);
    return (
      (Zt = Ca = null),
      (A.H = e),
      (A.A = u),
      (cl = a),
      F !== null ? 0 : ((yl = null), (I = 0), Zu(), pl)
    );
  }
  function Eh() {
    for (; F !== null && !Lr(); ) Ad(F);
  }
  function Ad(l) {
    var t = Ko(l.alternate, l, Ft);
    ((l.memoizedProps = l.pendingProps), t === null ? zn(l) : (F = t));
  }
  function zd(l) {
    var t = l,
      a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Go(a, t, t.pendingProps, t.type, void 0, I);
        break;
      case 11:
        t = Go(a, t, t.pendingProps, t.type.render, t.ref, I);
        break;
      case 5:
        Fc(t);
      default:
        (wo(a, t), (t = F = bs(t, Ft)), (t = Ko(a, t, Ft)));
    }
    ((l.memoizedProps = l.pendingProps), t === null ? zn(l) : (F = t));
  }
  function Ae(l, t, a, e) {
    ((Zt = Ca = null), Fc(t), (oe = null), (Je = 0));
    var u = t.return;
    try {
      if (fh(l, u, t, a, I)) {
        ((pl = 1), sn(l, bt(a, l.current)), (F = null));
        return;
      }
    } catch (n) {
      if (u !== null) throw ((F = u), n);
      ((pl = 1), sn(l, bt(a, l.current)), (F = null));
      return;
    }
    t.flags & 32768
      ? (al || e === 1
          ? (l = !0)
          : ge || (I & 536870912) !== 0
            ? (l = !1)
            : ((ra = l = !0),
              (e === 2 || e === 9 || e === 3 || e === 6) &&
                ((e = ot.current),
                e !== null && e.tag === 13 && (e.flags |= 16384))),
        pd(t, l))
      : zn(t);
  }
  function zn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        pd(t, ra);
        return;
      }
      l = t.return;
      var a = dh(t.alternate, t, Ft);
      if (a !== null) {
        F = a;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        F = t;
        return;
      }
      F = t = l;
    } while (t !== null);
    pl === 0 && (pl = 5);
  }
  function pd(l, t) {
    do {
      var a = rh(l.alternate, l);
      if (a !== null) {
        ((a.flags &= 32767), (F = a));
        return;
      }
      if (
        ((a = l.return),
        a !== null &&
          ((a.flags |= 32768), (a.subtreeFlags = 0), (a.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        F = l;
        return;
      }
      F = l = a;
    } while (l !== null);
    ((pl = 6), (F = null));
  }
  function Td(l, t, a, e, u, n, c, i, f) {
    l.cancelPendingCommit = null;
    do pn();
    while (Cl !== 0);
    if ((cl & 6) !== 0) throw Error(d(327));
    if (t !== null) {
      if (t === l.current) throw Error(d(177));
      if (
        ((n = t.lanes | t.childLanes),
        (n |= pc),
        Pr(l, a, n, c, i, f),
        l === yl && ((F = yl = null), (I = 0)),
        (be = t),
        (ya = l),
        (kt = a),
        (ji = n),
        (xi = u),
        (md = e),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            Th(Tu, function () {
              return (Rd(), null);
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (e = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || e)
      ) {
        ((e = A.T), (A.T = null), (u = R.p), (R.p = 2), (c = cl), (cl |= 4));
        try {
          mh(l, t, a);
        } finally {
          ((cl = c), (R.p = u), (A.T = e));
        }
      }
      ((Cl = 1), Od(), Nd(), _d());
    }
  }
  function Od() {
    if (Cl === 1) {
      Cl = 0;
      var l = ya,
        t = be,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = A.T), (A.T = null));
        var e = R.p;
        R.p = 2;
        var u = cl;
        cl |= 4;
        try {
          nd(t, l);
          var n = wi,
            c = os(l.containerInfo),
            i = n.focusedElem,
            f = n.selectionRange;
          if (
            c !== i &&
            i &&
            i.ownerDocument &&
            ss(i.ownerDocument.documentElement, i)
          ) {
            if (f !== null && Sc(i)) {
              var y = f.start,
                E = f.end;
              if ((E === void 0 && (E = y), "selectionStart" in i))
                ((i.selectionStart = y),
                  (i.selectionEnd = Math.min(E, i.value.length)));
              else {
                var p = i.ownerDocument || document,
                  v = (p && p.defaultView) || window;
                if (v.getSelection) {
                  var S = v.getSelection(),
                    j = i.textContent.length,
                    G = Math.min(f.start, j),
                    hl = f.end === void 0 ? G : Math.min(f.end, j);
                  !S.extend && G > hl && ((c = hl), (hl = G), (G = c));
                  var m = fs(i, G),
                    s = fs(i, hl);
                  if (
                    m &&
                    s &&
                    (S.rangeCount !== 1 ||
                      S.anchorNode !== m.node ||
                      S.anchorOffset !== m.offset ||
                      S.focusNode !== s.node ||
                      S.focusOffset !== s.offset)
                  ) {
                    var h = p.createRange();
                    (h.setStart(m.node, m.offset),
                      S.removeAllRanges(),
                      G > hl
                        ? (S.addRange(h), S.extend(s.node, s.offset))
                        : (h.setEnd(s.node, s.offset), S.addRange(h)));
                  }
                }
              }
            }
            for (p = [], S = i; (S = S.parentNode); )
              S.nodeType === 1 &&
                p.push({ element: S, left: S.scrollLeft, top: S.scrollTop });
            for (
              typeof i.focus == "function" && i.focus(), i = 0;
              i < p.length;
              i++
            ) {
              var z = p[i];
              ((z.element.scrollLeft = z.left), (z.element.scrollTop = z.top));
            }
          }
          ((Hn = !!Ji), (wi = Ji = null));
        } finally {
          ((cl = u), (R.p = e), (A.T = a));
        }
      }
      ((l.current = t), (Cl = 2));
    }
  }
  function Nd() {
    if (Cl === 2) {
      Cl = 0;
      var l = ya,
        t = be,
        a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        ((a = A.T), (A.T = null));
        var e = R.p;
        R.p = 2;
        var u = cl;
        cl |= 4;
        try {
          ld(l, t.alternate, t);
        } finally {
          ((cl = u), (R.p = e), (A.T = a));
        }
      }
      Cl = 3;
    }
  }
  function _d() {
    if (Cl === 4 || Cl === 3) {
      ((Cl = 0), Vr());
      var l = ya,
        t = be,
        a = kt,
        e = md;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Cl = 5)
        : ((Cl = 0), (be = ya = null), Dd(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (
        (u === 0 && (ha = null),
        Pn(a),
        (t = t.stateNode),
        ct && typeof ct.onCommitFiberRoot == "function")
      )
        try {
          ct.onCommitFiberRoot(De, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (e !== null) {
        ((t = A.T), (u = R.p), (R.p = 2), (A.T = null));
        try {
          for (var n = l.onRecoverableError, c = 0; c < e.length; c++) {
            var i = e[c];
            n(i.value, { componentStack: i.stack });
          }
        } finally {
          ((A.T = t), (R.p = u));
        }
      }
      ((kt & 3) !== 0 && pn(),
        Ct(l),
        (u = l.pendingLanes),
        (a & 261930) !== 0 && (u & 42) !== 0
          ? l === Ci
            ? su++
            : ((su = 0), (Ci = l))
          : (su = 0),
        ou(0));
    }
  }
  function Dd(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Ve(t)));
  }
  function pn() {
    return (Od(), Nd(), _d(), Rd());
  }
  function Rd() {
    if (Cl !== 5) return !1;
    var l = ya,
      t = ji;
    ji = 0;
    var a = Pn(kt),
      e = A.T,
      u = R.p;
    try {
      ((R.p = 32 > a ? 32 : a), (A.T = null), (a = xi), (xi = null));
      var n = ya,
        c = kt;
      if (((Cl = 0), (be = ya = null), (kt = 0), (cl & 6) !== 0))
        throw Error(d(331));
      var i = cl;
      if (
        ((cl |= 4),
        od(n.current),
        id(n, n.current, c, a),
        (cl = i),
        ou(0, !1),
        ct && typeof ct.onPostCommitFiberRoot == "function")
      )
        try {
          ct.onPostCommitFiberRoot(De, n);
        } catch {}
      return !0;
    } finally {
      ((R.p = u), (A.T = e), Dd(l, t));
    }
  }
  function Md(l, t, a) {
    ((t = bt(a, t)),
      (t = di(l.stateNode, t, 2)),
      (l = fa(l, t, 2)),
      l !== null && (Me(l, 2), Ct(l)));
  }
  function sl(l, t, a) {
    if (l.tag === 3) Md(l, l, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Md(t, l, a);
          break;
        } else if (t.tag === 1) {
          var e = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof e.componentDidCatch == "function" &&
              (ha === null || !ha.has(e)))
          ) {
            ((l = bt(a, l)),
              (a = jo(2)),
              (e = fa(t, a, 2)),
              e !== null && (xo(a, e, t, l), Me(e, 2), Ct(e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Bi(l, t, a) {
    var e = l.pingCache;
    if (e === null) {
      e = l.pingCache = new vh();
      var u = new Set();
      e.set(t, u);
    } else ((u = e.get(t)), u === void 0 && ((u = new Set()), e.set(t, u)));
    u.has(a) ||
      ((Di = !0), u.add(a), (l = Ah.bind(null, l, t, a)), t.then(l, l));
  }
  function Ah(l, t, a) {
    var e = l.pingCache;
    (e !== null && e.delete(t),
      (l.pingedLanes |= l.suspendedLanes & a),
      (l.warmLanes &= ~a),
      yl === l &&
        (I & a) === a &&
        (pl === 4 || (pl === 3 && (I & 62914560) === I && 300 > nt() - gn)
          ? (cl & 2) === 0 && Ee(l, 0)
          : (Ri |= a),
        Se === I && (Se = 0)),
      Ct(l));
  }
  function jd(l, t) {
    (t === 0 && (t = Tf()), (l = Ma(l, t)), l !== null && (Me(l, t), Ct(l)));
  }
  function zh(l) {
    var t = l.memoizedState,
      a = 0;
    (t !== null && (a = t.retryLane), jd(l, a));
  }
  function ph(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var e = l.stateNode,
          u = l.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = l.stateNode;
        break;
      case 22:
        e = l.stateNode._retryCache;
        break;
      default:
        throw Error(d(314));
    }
    (e !== null && e.delete(t), jd(l, a));
  }
  function Th(l, t) {
    return $n(l, t);
  }
  var Tn = null,
    ze = null,
    qi = !1,
    On = !1,
    Yi = !1,
    ga = 0;
  function Ct(l) {
    (l !== ze &&
      l.next === null &&
      (ze === null ? (Tn = ze = l) : (ze = ze.next = l)),
      (On = !0),
      qi || ((qi = !0), Nh()));
  }
  function ou(l, t) {
    if (!Yi && On) {
      Yi = !0;
      do
        for (var a = !1, e = Tn; e !== null; ) {
          if (l !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var c = e.suspendedLanes,
                i = e.pingedLanes;
              ((n = (1 << (31 - it(42 | l) + 1)) - 1),
                (n &= u & ~(c & ~i)),
                (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0));
            }
            n !== 0 && ((a = !0), Hd(e, n));
          } else
            ((n = I),
              (n = Du(
                e,
                e === yl ? n : 0,
                e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
              )),
              (n & 3) === 0 || Re(e, n) || ((a = !0), Hd(e, n)));
          e = e.next;
        }
      while (a);
      Yi = !1;
    }
  }
  function Oh() {
    xd();
  }
  function xd() {
    On = qi = !1;
    var l = 0;
    ga !== 0 && Bh() && (l = ga);
    for (var t = nt(), a = null, e = Tn; e !== null; ) {
      var u = e.next,
        n = Cd(e, t);
      (n === 0
        ? ((e.next = null),
          a === null ? (Tn = u) : (a.next = u),
          u === null && (ze = a))
        : ((a = e), (l !== 0 || (n & 3) !== 0) && (On = !0)),
        (e = u));
    }
    ((Cl !== 0 && Cl !== 5) || ou(l), ga !== 0 && (ga = 0));
  }
  function Cd(l, t) {
    for (
      var a = l.suspendedLanes,
        e = l.pingedLanes,
        u = l.expirationTimes,
        n = l.pendingLanes & -62914561;
      0 < n;
    ) {
      var c = 31 - it(n),
        i = 1 << c,
        f = u[c];
      (f === -1
        ? ((i & a) === 0 || (i & e) !== 0) && (u[c] = Ir(i, t))
        : f <= t && (l.expiredLanes |= i),
        (n &= ~i));
    }
    if (
      ((t = yl),
      (a = I),
      (a = Du(
        l,
        l === t ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      (e = l.callbackNode),
      a === 0 ||
        (l === t && (fl === 2 || fl === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        e !== null && e !== null && Fn(e),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((a & 3) === 0 || Re(l, a)) {
      if (((t = a & -a), t === l.callbackPriority)) return t;
      switch ((e !== null && Fn(e), Pn(a))) {
        case 2:
        case 8:
          a = zf;
          break;
        case 32:
          a = Tu;
          break;
        case 268435456:
          a = pf;
          break;
        default:
          a = Tu;
      }
      return (
        (e = Ud.bind(null, l)),
        (a = $n(a, e)),
        (l.callbackPriority = t),
        (l.callbackNode = a),
        t
      );
    }
    return (
      e !== null && e !== null && Fn(e),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function Ud(l, t) {
    if (Cl !== 0 && Cl !== 5)
      return ((l.callbackNode = null), (l.callbackPriority = 0), null);
    var a = l.callbackNode;
    if (pn() && l.callbackNode !== a) return null;
    var e = I;
    return (
      (e = Du(
        l,
        l === yl ? e : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      e === 0
        ? null
        : (yd(l, e, t),
          Cd(l, nt()),
          l.callbackNode != null && l.callbackNode === a
            ? Ud.bind(null, l)
            : null)
    );
  }
  function Hd(l, t) {
    if (pn()) return null;
    yd(l, t, !0);
  }
  function Nh() {
    Yh(function () {
      (cl & 6) !== 0 ? $n(Af, Oh) : xd();
    });
  }
  function Gi() {
    if (ga === 0) {
      var l = ie;
      (l === 0 && ((l = Ou), (Ou <<= 1), (Ou & 261888) === 0 && (Ou = 256)),
        (ga = l));
    }
    return ga;
  }
  function Bd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
        ? l
        : xu("" + l);
  }
  function qd(l, t) {
    var a = t.ownerDocument.createElement("input");
    return (
      (a.name = t.name),
      (a.value = t.value),
      l.id && a.setAttribute("form", l.id),
      t.parentNode.insertBefore(a, t),
      (l = new FormData(l)),
      a.parentNode.removeChild(a),
      l
    );
  }
  function _h(l, t, a, e, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var n = Bd((u[Fl] || null).action),
        c = e.submitter;
      c &&
        ((t = (t = c[Fl] || null)
          ? Bd(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((n = t), (c = null)));
      var i = new Bu("action", "action", null, e, u);
      l.push({
        event: i,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (e.defaultPrevented) {
                if (ga !== 0) {
                  var f = c ? qd(u, c) : new FormData(u);
                  ni(
                    a,
                    { pending: !0, data: f, method: u.method, action: n },
                    null,
                    f,
                  );
                }
              } else
                typeof n == "function" &&
                  (i.preventDefault(),
                  (f = c ? qd(u, c) : new FormData(u)),
                  ni(
                    a,
                    { pending: !0, data: f, method: u.method, action: n },
                    n,
                    f,
                  ));
            },
            currentTarget: u,
          },
        ],
      });
    }
  }
  for (var Zi = 0; Zi < zc.length; Zi++) {
    var Xi = zc[Zi],
      Dh = Xi.toLowerCase(),
      Rh = Xi[0].toUpperCase() + Xi.slice(1);
    _t(Dh, "on" + Rh);
  }
  (_t(ms, "onAnimationEnd"),
    _t(hs, "onAnimationIteration"),
    _t(ys, "onAnimationStart"),
    _t("dblclick", "onDoubleClick"),
    _t("focusin", "onFocus"),
    _t("focusout", "onBlur"),
    _t(Km, "onTransitionRun"),
    _t(Jm, "onTransitionStart"),
    _t(wm, "onTransitionCancel"),
    _t(vs, "onTransitionEnd"),
    wa("onMouseEnter", ["mouseout", "mouseover"]),
    wa("onMouseLeave", ["mouseout", "mouseover"]),
    wa("onPointerEnter", ["pointerout", "pointerover"]),
    wa("onPointerLeave", ["pointerout", "pointerover"]),
    Na(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Na(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Na("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Na(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Na(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Na(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var du =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Mh = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(du),
    );
  function Yd(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var e = l[a],
        u = e.event;
      e = e.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var c = e.length - 1; 0 <= c; c--) {
            var i = e[c],
              f = i.instance,
              y = i.currentTarget;
            if (((i = i.listener), f !== n && u.isPropagationStopped()))
              break l;
            ((n = i), (u.currentTarget = y));
            try {
              n(u);
            } catch (E) {
              Gu(E);
            }
            ((u.currentTarget = null), (n = f));
          }
        else
          for (c = 0; c < e.length; c++) {
            if (
              ((i = e[c]),
              (f = i.instance),
              (y = i.currentTarget),
              (i = i.listener),
              f !== n && u.isPropagationStopped())
            )
              break l;
            ((n = i), (u.currentTarget = y));
            try {
              n(u);
            } catch (E) {
              Gu(E);
            }
            ((u.currentTarget = null), (n = f));
          }
      }
    }
  }
  function k(l, t) {
    var a = t[lc];
    a === void 0 && (a = t[lc] = new Set());
    var e = l + "__bubble";
    a.has(e) || (Gd(t, l, 2, !1), a.add(e));
  }
  function Qi(l, t, a) {
    var e = 0;
    (t && (e |= 4), Gd(a, l, e, t));
  }
  var Nn = "_reactListening" + Math.random().toString(36).slice(2);
  function Li(l) {
    if (!l[Nn]) {
      ((l[Nn] = !0),
        jf.forEach(function (a) {
          a !== "selectionchange" && (Mh.has(a) || Qi(a, !1, l), Qi(a, !0, l));
        }));
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Nn] || ((t[Nn] = !0), Qi("selectionchange", !1, t));
    }
  }
  function Gd(l, t, a, e) {
    switch (hr(t)) {
      case 2:
        var u = uy;
        break;
      case 8:
        u = ny;
        break;
      default:
        u = uf;
    }
    ((a = u.bind(null, t, a, l)),
      (u = void 0),
      !sc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      e
        ? u !== void 0
          ? l.addEventListener(t, a, { capture: !0, passive: u })
          : l.addEventListener(t, a, !0)
        : u !== void 0
          ? l.addEventListener(t, a, { passive: u })
          : l.addEventListener(t, a, !1));
  }
  function Vi(l, t, a, e, u) {
    var n = e;
    if ((t & 1) === 0 && (t & 2) === 0 && e !== null)
      l: for (;;) {
        if (e === null) return;
        var c = e.tag;
        if (c === 3 || c === 4) {
          var i = e.stateNode.containerInfo;
          if (i === u) break;
          if (c === 4)
            for (c = e.return; c !== null; ) {
              var f = c.tag;
              if ((f === 3 || f === 4) && c.stateNode.containerInfo === u)
                return;
              c = c.return;
            }
          for (; i !== null; ) {
            if (((c = Va(i)), c === null)) return;
            if (((f = c.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
              e = n = c;
              continue l;
            }
            i = i.parentNode;
          }
        }
        e = e.return;
      }
    Lf(function () {
      var y = n,
        E = ic(a),
        p = [];
      l: {
        var v = gs.get(l);
        if (v !== void 0) {
          var S = Bu,
            j = l;
          switch (l) {
            case "keypress":
              if (Uu(a) === 0) break l;
            case "keydown":
            case "keyup":
              S = pm;
              break;
            case "focusin":
              ((j = "focus"), (S = mc));
              break;
            case "focusout":
              ((j = "blur"), (S = mc));
              break;
            case "beforeblur":
            case "afterblur":
              S = mc;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              S = Jf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              S = dm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              S = Nm;
              break;
            case ms:
            case hs:
            case ys:
              S = hm;
              break;
            case vs:
              S = Dm;
              break;
            case "scroll":
            case "scrollend":
              S = sm;
              break;
            case "wheel":
              S = Mm;
              break;
            case "copy":
            case "cut":
            case "paste":
              S = vm;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              S = Wf;
              break;
            case "toggle":
            case "beforetoggle":
              S = xm;
          }
          var G = (t & 4) !== 0,
            hl = !G && (l === "scroll" || l === "scrollend"),
            m = G ? (v !== null ? v + "Capture" : null) : v;
          G = [];
          for (var s = y, h; s !== null; ) {
            var z = s;
            if (
              ((h = z.stateNode),
              (z = z.tag),
              (z !== 5 && z !== 26 && z !== 27) ||
                h === null ||
                m === null ||
                ((z = Ce(s, m)), z != null && G.push(ru(s, z, h))),
              hl)
            )
              break;
            s = s.return;
          }
          0 < G.length &&
            ((v = new S(v, j, null, a, E)), p.push({ event: v, listeners: G }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((v = l === "mouseover" || l === "pointerover"),
            (S = l === "mouseout" || l === "pointerout"),
            v &&
              a !== cc &&
              (j = a.relatedTarget || a.fromElement) &&
              (Va(j) || j[La]))
          )
            break l;
          if (
            (S || v) &&
            ((v =
              E.window === E
                ? E
                : (v = E.ownerDocument)
                  ? v.defaultView || v.parentWindow
                  : window),
            S
              ? ((j = a.relatedTarget || a.toElement),
                (S = y),
                (j = j ? Va(j) : null),
                j !== null &&
                  ((hl = X(j)),
                  (G = j.tag),
                  j !== hl || (G !== 5 && G !== 27 && G !== 6)) &&
                  (j = null))
              : ((S = null), (j = y)),
            S !== j)
          ) {
            if (
              ((G = Jf),
              (z = "onMouseLeave"),
              (m = "onMouseEnter"),
              (s = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((G = Wf),
                (z = "onPointerLeave"),
                (m = "onPointerEnter"),
                (s = "pointer")),
              (hl = S == null ? v : xe(S)),
              (h = j == null ? v : xe(j)),
              (v = new G(z, s + "leave", S, a, E)),
              (v.target = hl),
              (v.relatedTarget = h),
              (z = null),
              Va(E) === y &&
                ((G = new G(m, s + "enter", j, a, E)),
                (G.target = h),
                (G.relatedTarget = hl),
                (z = G)),
              (hl = z),
              S && j)
            )
              t: {
                for (G = jh, m = S, s = j, h = 0, z = m; z; z = G(z)) h++;
                z = 0;
                for (var B = s; B; B = G(B)) z++;
                for (; 0 < h - z; ) ((m = G(m)), h--);
                for (; 0 < z - h; ) ((s = G(s)), z--);
                for (; h--; ) {
                  if (m === s || (s !== null && m === s.alternate)) {
                    G = m;
                    break t;
                  }
                  ((m = G(m)), (s = G(s)));
                }
                G = null;
              }
            else G = null;
            (S !== null && Zd(p, v, S, G, !1),
              j !== null && hl !== null && Zd(p, hl, j, G, !0));
          }
        }
        l: {
          if (
            ((v = y ? xe(y) : window),
            (S = v.nodeName && v.nodeName.toLowerCase()),
            S === "select" || (S === "input" && v.type === "file"))
          )
            var el = as;
          else if (ls(v))
            if (es) el = Qm;
            else {
              el = Zm;
              var U = Gm;
            }
          else
            ((S = v.nodeName),
              !S ||
              S.toLowerCase() !== "input" ||
              (v.type !== "checkbox" && v.type !== "radio")
                ? y && nc(y.elementType) && (el = as)
                : (el = Xm));
          if (el && (el = el(l, y))) {
            ts(p, el, a, E);
            break l;
          }
          (U && U(l, v, y),
            l === "focusout" &&
              y &&
              v.type === "number" &&
              y.memoizedProps.value != null &&
              uc(v, "number", v.value));
        }
        switch (((U = y ? xe(y) : window), l)) {
          case "focusin":
            (ls(U) || U.contentEditable === "true") &&
              ((Pa = U), (bc = y), (Xe = null));
            break;
          case "focusout":
            Xe = bc = Pa = null;
            break;
          case "mousedown":
            Ec = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ec = !1), ds(p, a, E));
            break;
          case "selectionchange":
            if (Vm) break;
          case "keydown":
          case "keyup":
            ds(p, a, E);
        }
        var w;
        if (yc)
          l: {
            switch (l) {
              case "compositionstart":
                var P = "onCompositionStart";
                break l;
              case "compositionend":
                P = "onCompositionEnd";
                break l;
              case "compositionupdate":
                P = "onCompositionUpdate";
                break l;
            }
            P = void 0;
          }
        else
          Ia
            ? If(l, a) && (P = "onCompositionEnd")
            : l === "keydown" &&
              a.keyCode === 229 &&
              (P = "onCompositionStart");
        (P &&
          ($f &&
            a.locale !== "ko" &&
            (Ia || P !== "onCompositionStart"
              ? P === "onCompositionEnd" && Ia && (w = Vf())
              : ((ta = E),
                (oc = "value" in ta ? ta.value : ta.textContent),
                (Ia = !0))),
          (U = _n(y, P)),
          0 < U.length &&
            ((P = new wf(P, l, null, a, E)),
            p.push({ event: P, listeners: U }),
            w ? (P.data = w) : ((w = Pf(a)), w !== null && (P.data = w)))),
          (w = Um ? Hm(l, a) : Bm(l, a)) &&
            ((P = _n(y, "onBeforeInput")),
            0 < P.length &&
              ((U = new wf("onBeforeInput", "beforeinput", null, a, E)),
              p.push({ event: U, listeners: P }),
              (U.data = w))),
          _h(p, l, y, a, E));
      }
      Yd(p, t);
    });
  }
  function ru(l, t, a) {
    return { instance: l, listener: t, currentTarget: a };
  }
  function _n(l, t) {
    for (var a = t + "Capture", e = []; l !== null; ) {
      var u = l,
        n = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          n === null ||
          ((u = Ce(l, a)),
          u != null && e.unshift(ru(l, u, n)),
          (u = Ce(l, t)),
          u != null && e.push(ru(l, u, n))),
        l.tag === 3)
      )
        return e;
      l = l.return;
    }
    return [];
  }
  function jh(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Zd(l, t, a, e, u) {
    for (var n = t._reactName, c = []; a !== null && a !== e; ) {
      var i = a,
        f = i.alternate,
        y = i.stateNode;
      if (((i = i.tag), f !== null && f === e)) break;
      ((i !== 5 && i !== 26 && i !== 27) ||
        y === null ||
        ((f = y),
        u
          ? ((y = Ce(a, n)), y != null && c.unshift(ru(a, y, f)))
          : u || ((y = Ce(a, n)), y != null && c.push(ru(a, y, f)))),
        (a = a.return));
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var xh = /\r\n?/g,
    Ch = /\u0000|\uFFFD/g;
  function Xd(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        xh,
        `
`,
      )
      .replace(Ch, "");
  }
  function Qd(l, t) {
    return ((t = Xd(t)), Xd(l) === t);
  }
  function ml(l, t, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string"
          ? t === "body" || (t === "textarea" && e === "") || $a(l, e)
          : (typeof e == "number" || typeof e == "bigint") &&
            t !== "body" &&
            $a(l, "" + e);
        break;
      case "className":
        Mu(l, "class", e);
        break;
      case "tabIndex":
        Mu(l, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Mu(l, a, e);
        break;
      case "style":
        Xf(l, e, n);
        break;
      case "data":
        if (t !== "object") {
          Mu(l, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (
          e == null ||
          typeof e == "function" ||
          typeof e == "symbol" ||
          typeof e == "boolean"
        ) {
          l.removeAttribute(a);
          break;
        }
        ((e = xu("" + e)), l.setAttribute(a, e));
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          l.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof n == "function" &&
            (a === "formAction"
              ? (t !== "input" && ml(l, t, "name", u.name, u, null),
                ml(l, t, "formEncType", u.formEncType, u, null),
                ml(l, t, "formMethod", u.formMethod, u, null),
                ml(l, t, "formTarget", u.formTarget, u, null))
              : (ml(l, t, "encType", u.encType, u, null),
                ml(l, t, "method", u.method, u, null),
                ml(l, t, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        ((e = xu("" + e)), l.setAttribute(a, e));
        break;
      case "onClick":
        e != null && (l.onclick = Bt);
        break;
      case "onScroll":
        e != null && k("scroll", l);
        break;
      case "onScrollEnd":
        e != null && k("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(d(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(d(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        l.muted = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          e == null ||
          typeof e == "function" ||
          typeof e == "boolean" ||
          typeof e == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        ((a = xu("" + e)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        e != null && typeof e != "function" && typeof e != "symbol"
          ? l.setAttribute(a, "" + e)
          : l.removeAttribute(a);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        e && typeof e != "function" && typeof e != "symbol"
          ? l.setAttribute(a, "")
          : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0
          ? l.setAttribute(a, "")
          : e !== !1 &&
              e != null &&
              typeof e != "function" &&
              typeof e != "symbol"
            ? l.setAttribute(a, e)
            : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null &&
        typeof e != "function" &&
        typeof e != "symbol" &&
        !isNaN(e) &&
        1 <= e
          ? l.setAttribute(a, e)
          : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e)
          ? l.removeAttribute(a)
          : l.setAttribute(a, e);
        break;
      case "popover":
        (k("beforetoggle", l), k("toggle", l), Ru(l, "popover", e));
        break;
      case "xlinkActuate":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:actuate", e);
        break;
      case "xlinkArcrole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", e);
        break;
      case "xlinkRole":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:role", e);
        break;
      case "xlinkShow":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:show", e);
        break;
      case "xlinkTitle":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:title", e);
        break;
      case "xlinkType":
        Ht(l, "http://www.w3.org/1999/xlink", "xlink:type", e);
        break;
      case "xmlBase":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:base", e);
        break;
      case "xmlLang":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", e);
        break;
      case "xmlSpace":
        Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:space", e);
        break;
      case "is":
        Ru(l, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) ||
          (a[0] !== "o" && a[0] !== "O") ||
          (a[1] !== "n" && a[1] !== "N")) &&
          ((a = im.get(a) || a), Ru(l, a, e));
    }
  }
  function Ki(l, t, a, e, u, n) {
    switch (a) {
      case "style":
        Xf(l, e, n);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e)) throw Error(d(61));
          if (((a = e.__html), a != null)) {
            if (u.children != null) throw Error(d(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof e == "string"
          ? $a(l, e)
          : (typeof e == "number" || typeof e == "bigint") && $a(l, "" + e);
        break;
      case "onScroll":
        e != null && k("scroll", l);
        break;
      case "onScrollEnd":
        e != null && k("scrollend", l);
        break;
      case "onClick":
        e != null && (l.onclick = Bt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!xf.hasOwnProperty(a))
          l: {
            if (
              a[0] === "o" &&
              a[1] === "n" &&
              ((u = a.endsWith("Capture")),
              (t = a.slice(2, u ? a.length - 7 : void 0)),
              (n = l[Fl] || null),
              (n = n != null ? n[a] : null),
              typeof n == "function" && l.removeEventListener(t, n, u),
              typeof e == "function")
            ) {
              (typeof n != "function" &&
                n !== null &&
                (a in l
                  ? (l[a] = null)
                  : l.hasAttribute(a) && l.removeAttribute(a)),
                l.addEventListener(t, e, u));
              break l;
            }
            a in l
              ? (l[a] = e)
              : e === !0
                ? l.setAttribute(a, "")
                : Ru(l, a, e);
          }
    }
  }
  function Ll(l, t, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (k("error", l), k("load", l));
        var e = !1,
          u = !1,
          n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var c = a[n];
            if (c != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(d(137, t));
                default:
                  ml(l, t, n, c, a, null);
              }
          }
        (u && ml(l, t, "srcSet", a.srcSet, a, null),
          e && ml(l, t, "src", a.src, a, null));
        return;
      case "input":
        k("invalid", l);
        var i = (n = c = u = null),
          f = null,
          y = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var E = a[e];
            if (E != null)
              switch (e) {
                case "name":
                  u = E;
                  break;
                case "type":
                  c = E;
                  break;
                case "checked":
                  f = E;
                  break;
                case "defaultChecked":
                  y = E;
                  break;
                case "value":
                  n = E;
                  break;
                case "defaultValue":
                  i = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null) throw Error(d(137, t));
                  break;
                default:
                  ml(l, t, e, E, a, null);
              }
          }
        qf(l, n, i, f, y, c, u, !1);
        return;
      case "select":
        (k("invalid", l), (e = c = n = null));
        for (u in a)
          if (a.hasOwnProperty(u) && ((i = a[u]), i != null))
            switch (u) {
              case "value":
                n = i;
                break;
              case "defaultValue":
                c = i;
                break;
              case "multiple":
                e = i;
              default:
                ml(l, t, u, i, a, null);
            }
        ((t = n),
          (a = c),
          (l.multiple = !!e),
          t != null ? Wa(l, !!e, t, !1) : a != null && Wa(l, !!e, a, !0));
        return;
      case "textarea":
        (k("invalid", l), (n = u = e = null));
        for (c in a)
          if (a.hasOwnProperty(c) && ((i = a[c]), i != null))
            switch (c) {
              case "value":
                e = i;
                break;
              case "defaultValue":
                u = i;
                break;
              case "children":
                n = i;
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(d(91));
                break;
              default:
                ml(l, t, c, i, a, null);
            }
        Gf(l, e, u, n);
        return;
      case "option":
        for (f in a)
          if (a.hasOwnProperty(f) && ((e = a[f]), e != null))
            switch (f) {
              case "selected":
                l.selected =
                  e && typeof e != "function" && typeof e != "symbol";
                break;
              default:
                ml(l, t, f, e, a, null);
            }
        return;
      case "dialog":
        (k("beforetoggle", l), k("toggle", l), k("cancel", l), k("close", l));
        break;
      case "iframe":
      case "object":
        k("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < du.length; e++) k(du[e], l);
        break;
      case "image":
        (k("error", l), k("load", l));
        break;
      case "details":
        k("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        (k("error", l), k("load", l));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (y in a)
          if (a.hasOwnProperty(y) && ((e = a[y]), e != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(d(137, t));
              default:
                ml(l, t, y, e, a, null);
            }
        return;
      default:
        if (nc(t)) {
          for (E in a)
            a.hasOwnProperty(E) &&
              ((e = a[E]), e !== void 0 && Ki(l, t, E, e, a, void 0));
          return;
        }
    }
    for (i in a)
      a.hasOwnProperty(i) && ((e = a[i]), e != null && ml(l, t, i, e, a, null));
  }
  function Uh(l, t, a, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          n = null,
          c = null,
          i = null,
          f = null,
          y = null,
          E = null;
        for (S in a) {
          var p = a[S];
          if (a.hasOwnProperty(S) && p != null)
            switch (S) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = p;
              default:
                e.hasOwnProperty(S) || ml(l, t, S, null, e, p);
            }
        }
        for (var v in e) {
          var S = e[v];
          if (((p = a[v]), e.hasOwnProperty(v) && (S != null || p != null)))
            switch (v) {
              case "type":
                n = S;
                break;
              case "name":
                u = S;
                break;
              case "checked":
                y = S;
                break;
              case "defaultChecked":
                E = S;
                break;
              case "value":
                c = S;
                break;
              case "defaultValue":
                i = S;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null) throw Error(d(137, t));
                break;
              default:
                S !== p && ml(l, t, v, S, e, p);
            }
        }
        ec(l, c, i, f, y, E, n, u);
        return;
      case "select":
        S = c = i = v = null;
        for (n in a)
          if (((f = a[n]), a.hasOwnProperty(n) && f != null))
            switch (n) {
              case "value":
                break;
              case "multiple":
                S = f;
              default:
                e.hasOwnProperty(n) || ml(l, t, n, null, e, f);
            }
        for (u in e)
          if (
            ((n = e[u]),
            (f = a[u]),
            e.hasOwnProperty(u) && (n != null || f != null))
          )
            switch (u) {
              case "value":
                v = n;
                break;
              case "defaultValue":
                i = n;
                break;
              case "multiple":
                c = n;
              default:
                n !== f && ml(l, t, u, n, e, f);
            }
        ((t = i),
          (a = c),
          (e = S),
          v != null
            ? Wa(l, !!a, v, !1)
            : !!e != !!a &&
              (t != null ? Wa(l, !!a, t, !0) : Wa(l, !!a, a ? [] : "", !1)));
        return;
      case "textarea":
        S = v = null;
        for (i in a)
          if (
            ((u = a[i]),
            a.hasOwnProperty(i) && u != null && !e.hasOwnProperty(i))
          )
            switch (i) {
              case "value":
                break;
              case "children":
                break;
              default:
                ml(l, t, i, null, e, u);
            }
        for (c in e)
          if (
            ((u = e[c]),
            (n = a[c]),
            e.hasOwnProperty(c) && (u != null || n != null))
          )
            switch (c) {
              case "value":
                v = u;
                break;
              case "defaultValue":
                S = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(d(91));
                break;
              default:
                u !== n && ml(l, t, c, u, e, n);
            }
        Yf(l, v, S);
        return;
      case "option":
        for (var j in a)
          if (
            ((v = a[j]),
            a.hasOwnProperty(j) && v != null && !e.hasOwnProperty(j))
          )
            switch (j) {
              case "selected":
                l.selected = !1;
                break;
              default:
                ml(l, t, j, null, e, v);
            }
        for (f in e)
          if (
            ((v = e[f]),
            (S = a[f]),
            e.hasOwnProperty(f) && v !== S && (v != null || S != null))
          )
            switch (f) {
              case "selected":
                l.selected =
                  v && typeof v != "function" && typeof v != "symbol";
                break;
              default:
                ml(l, t, f, v, e, S);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var G in a)
          ((v = a[G]),
            a.hasOwnProperty(G) &&
              v != null &&
              !e.hasOwnProperty(G) &&
              ml(l, t, G, null, e, v));
        for (y in e)
          if (
            ((v = e[y]),
            (S = a[y]),
            e.hasOwnProperty(y) && v !== S && (v != null || S != null))
          )
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(d(137, t));
                break;
              default:
                ml(l, t, y, v, e, S);
            }
        return;
      default:
        if (nc(t)) {
          for (var hl in a)
            ((v = a[hl]),
              a.hasOwnProperty(hl) &&
                v !== void 0 &&
                !e.hasOwnProperty(hl) &&
                Ki(l, t, hl, void 0, e, v));
          for (E in e)
            ((v = e[E]),
              (S = a[E]),
              !e.hasOwnProperty(E) ||
                v === S ||
                (v === void 0 && S === void 0) ||
                Ki(l, t, E, v, e, S));
          return;
        }
    }
    for (var m in a)
      ((v = a[m]),
        a.hasOwnProperty(m) &&
          v != null &&
          !e.hasOwnProperty(m) &&
          ml(l, t, m, null, e, v));
    for (p in e)
      ((v = e[p]),
        (S = a[p]),
        !e.hasOwnProperty(p) ||
          v === S ||
          (v == null && S == null) ||
          ml(l, t, p, v, e, S));
  }
  function Ld(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Hh() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, a = performance.getEntriesByType("resource"), e = 0;
        e < a.length;
        e++
      ) {
        var u = a[e],
          n = u.transferSize,
          c = u.initiatorType,
          i = u.duration;
        if (n && i && Ld(c)) {
          for (c = 0, i = u.responseEnd, e += 1; e < a.length; e++) {
            var f = a[e],
              y = f.startTime;
            if (y > i) break;
            var E = f.transferSize,
              p = f.initiatorType;
            E &&
              Ld(p) &&
              ((f = f.responseEnd), (c += E * (f < i ? 1 : (i - y) / (f - y))));
          }
          if ((--e, (t += (8 * (n + c)) / (u.duration / 1e3)), l++, 10 < l))
            break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection &&
      ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var Ji = null,
    wi = null;
  function Dn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Vd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Kd(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Wi(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var $i = null;
  function Bh() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === $i
        ? !1
        : (($i = l), !0)
      : (($i = null), !1);
  }
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0,
    qh = typeof clearTimeout == "function" ? clearTimeout : void 0,
    wd = typeof Promise == "function" ? Promise : void 0,
    Yh =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof wd < "u"
          ? function (l) {
              return wd.resolve(null).then(l).catch(Gh);
            }
          : Jd;
  function Gh(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function Sa(l) {
    return l === "head";
  }
  function Wd(l, t) {
    var a = t,
      e = 0;
    do {
      var u = a.nextSibling;
      if ((l.removeChild(a), u && u.nodeType === 8))
        if (((a = u.data), a === "/$" || a === "/&")) {
          if (e === 0) {
            (l.removeChild(u), Ne(t));
            return;
          }
          e--;
        } else if (
          a === "$" ||
          a === "$?" ||
          a === "$~" ||
          a === "$!" ||
          a === "&"
        )
          e++;
        else if (a === "html") mu(l.ownerDocument.documentElement);
        else if (a === "head") {
          ((a = l.ownerDocument.head), mu(a));
          for (var n = a.firstChild; n; ) {
            var c = n.nextSibling,
              i = n.nodeName;
            (n[je] ||
              i === "SCRIPT" ||
              i === "STYLE" ||
              (i === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
              a.removeChild(n),
              (n = c));
          }
        } else a === "body" && mu(l.ownerDocument.body);
      a = u;
    } while (a);
    Ne(t);
  }
  function $d(l, t) {
    var a = l;
    l = 0;
    do {
      var e = a.nextSibling;
      if (
        (a.nodeType === 1
          ? t
            ? ((a._stashedDisplay = a.style.display),
              (a.style.display = "none"))
            : ((a.style.display = a._stashedDisplay || ""),
              a.getAttribute("style") === "" && a.removeAttribute("style"))
          : a.nodeType === 3 &&
            (t
              ? ((a._stashedText = a.nodeValue), (a.nodeValue = ""))
              : (a.nodeValue = a._stashedText || "")),
        e && e.nodeType === 8)
      )
        if (((a = e.data), a === "/$")) {
          if (l === 0) break;
          l--;
        } else (a !== "$" && a !== "$?" && a !== "$~" && a !== "$!") || l++;
      a = e;
    } while (a);
  }
  function Fi(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (((t = t.nextSibling), a.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Fi(a), tc(a));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function Zh(l, t, a, e) {
    for (; l.nodeType === 1; ) {
      var u = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!e && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (e) {
        if (!l[je])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((n = l.getAttribute("rel")),
                n === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                n !== u.rel ||
                l.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                l.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                l.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((n = l.getAttribute("src")),
                (n !== (u.src == null ? null : u.src) ||
                  l.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  l.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  n &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n) return l;
      } else return l;
      if (((l = Tt(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function Xh(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !a) ||
        ((l = Tt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Fd(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = Tt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function ki(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function Ii(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState !== "loading")
    );
  }
  function Qh(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading") t();
    else {
      var e = function () {
        (t(), a.removeEventListener("DOMContentLoaded", e));
      };
      (a.addEventListener("DOMContentLoaded", e), (l._reactRetry = e));
    }
  }
  function Tt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Pi = null;
  function kd(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0) return Tt(l.nextSibling);
          t--;
        } else
          (a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&") ||
            t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Id(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else (a !== "/$" && a !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Pd(l, t, a) {
    switch (((t = Dn(a)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(d(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(d(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(d(454));
        return l;
      default:
        throw Error(d(451));
    }
  }
  function mu(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    tc(l);
  }
  var Ot = new Map(),
    lr = new Set();
  function Rn(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
        ? l
        : l.ownerDocument;
  }
  var It = R.d;
  R.d = { f: Lh, r: Vh, D: Kh, C: Jh, L: wh, m: Wh, X: Fh, S: $h, M: kh };
  function Lh() {
    var l = It.f(),
      t = En();
    return l || t;
  }
  function Vh(l) {
    var t = Ka(l);
    t !== null && t.tag === 5 && t.type === "form" ? go(t) : It.r(l);
  }
  var pe = typeof document > "u" ? null : document;
  function tr(l, t, a) {
    var e = pe;
    if (e && typeof t == "string" && t) {
      var u = gt(t);
      ((u = 'link[rel="' + l + '"][href="' + u + '"]'),
        typeof a == "string" && (u += '[crossorigin="' + a + '"]'),
        lr.has(u) ||
          (lr.add(u),
          (l = { rel: l, crossOrigin: a, href: t }),
          e.querySelector(u) === null &&
            ((t = e.createElement("link")),
            Ll(t, "link", l),
            Ul(t),
            e.head.appendChild(t))));
    }
  }
  function Kh(l) {
    (It.D(l), tr("dns-prefetch", l, null));
  }
  function Jh(l, t) {
    (It.C(l, t), tr("preconnect", l, t));
  }
  function wh(l, t, a) {
    It.L(l, t, a);
    var e = pe;
    if (e && l && t) {
      var u = 'link[rel="preload"][as="' + gt(t) + '"]';
      t === "image" && a && a.imageSrcSet
        ? ((u += '[imagesrcset="' + gt(a.imageSrcSet) + '"]'),
          typeof a.imageSizes == "string" &&
            (u += '[imagesizes="' + gt(a.imageSizes) + '"]'))
        : (u += '[href="' + gt(l) + '"]');
      var n = u;
      switch (t) {
        case "style":
          n = Te(l);
          break;
        case "script":
          n = Oe(l);
      }
      Ot.has(n) ||
        ((l = H(
          {
            rel: "preload",
            href: t === "image" && a && a.imageSrcSet ? void 0 : l,
            as: t,
          },
          a,
        )),
        Ot.set(n, l),
        e.querySelector(u) !== null ||
          (t === "style" && e.querySelector(hu(n))) ||
          (t === "script" && e.querySelector(yu(n))) ||
          ((t = e.createElement("link")),
          Ll(t, "link", l),
          Ul(t),
          e.head.appendChild(t)));
    }
  }
  function Wh(l, t) {
    It.m(l, t);
    var a = pe;
    if (a && l) {
      var e = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + gt(e) + '"][href="' + gt(l) + '"]',
        n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Oe(l);
      }
      if (
        !Ot.has(n) &&
        ((l = H({ rel: "modulepreload", href: l }, t)),
        Ot.set(n, l),
        a.querySelector(u) === null)
      ) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(yu(n))) return;
        }
        ((e = a.createElement("link")),
          Ll(e, "link", l),
          Ul(e),
          a.head.appendChild(e));
      }
    }
  }
  function $h(l, t, a) {
    It.S(l, t, a);
    var e = pe;
    if (e && l) {
      var u = Ja(e).hoistableStyles,
        n = Te(l);
      t = t || "default";
      var c = u.get(n);
      if (!c) {
        var i = { loading: 0, preload: null };
        if ((c = e.querySelector(hu(n)))) i.loading = 5;
        else {
          ((l = H({ rel: "stylesheet", href: l, "data-precedence": t }, a)),
            (a = Ot.get(n)) && lf(l, a));
          var f = (c = e.createElement("link"));
          (Ul(f),
            Ll(f, "link", l),
            (f._p = new Promise(function (y, E) {
              ((f.onload = y), (f.onerror = E));
            })),
            f.addEventListener("load", function () {
              i.loading |= 1;
            }),
            f.addEventListener("error", function () {
              i.loading |= 2;
            }),
            (i.loading |= 4),
            Mn(c, t, e));
        }
        ((c = { type: "stylesheet", instance: c, count: 1, state: i }),
          u.set(n, c));
      }
    }
  }
  function Fh(l, t) {
    It.X(l, t);
    var a = pe;
    if (a && l) {
      var e = Ja(a).hoistableScripts,
        u = Oe(l),
        n = e.get(u);
      n ||
        ((n = a.querySelector(yu(u))),
        n ||
          ((l = H({ src: l, async: !0 }, t)),
          (t = Ot.get(u)) && tf(l, t),
          (n = a.createElement("script")),
          Ul(n),
          Ll(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function kh(l, t) {
    It.M(l, t);
    var a = pe;
    if (a && l) {
      var e = Ja(a).hoistableScripts,
        u = Oe(l),
        n = e.get(u);
      n ||
        ((n = a.querySelector(yu(u))),
        n ||
          ((l = H({ src: l, async: !0, type: "module" }, t)),
          (t = Ot.get(u)) && tf(l, t),
          (n = a.createElement("script")),
          Ul(n),
          Ll(n, "link", l),
          a.head.appendChild(n)),
        (n = { type: "script", instance: n, count: 1, state: null }),
        e.set(u, n));
    }
  }
  function ar(l, t, a, e) {
    var u = (u = _.current) ? Rn(u) : null;
    if (!u) throw Error(d(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string"
          ? ((t = Te(a.href)),
            (a = Ja(u).hoistableStyles),
            (e = a.get(t)),
            e ||
              ((e = { type: "style", instance: null, count: 0, state: null }),
              a.set(t, e)),
            e)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          a.rel === "stylesheet" &&
          typeof a.href == "string" &&
          typeof a.precedence == "string"
        ) {
          l = Te(a.href);
          var n = Ja(u).hoistableStyles,
            c = n.get(l);
          if (
            (c ||
              ((u = u.ownerDocument || u),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              n.set(l, c),
              (n = u.querySelector(hu(l))) &&
                !n._p &&
                ((c.instance = n), (c.state.loading = 5)),
              Ot.has(l) ||
                ((a = {
                  rel: "preload",
                  as: "style",
                  href: a.href,
                  crossOrigin: a.crossOrigin,
                  integrity: a.integrity,
                  media: a.media,
                  hrefLang: a.hrefLang,
                  referrerPolicy: a.referrerPolicy,
                }),
                Ot.set(l, a),
                n || Ih(u, l, a, c.state))),
            t && e === null)
          )
            throw Error(d(528, ""));
          return c;
        }
        if (t && e !== null) throw Error(d(529, ""));
        return null;
      case "script":
        return (
          (t = a.async),
          (a = a.src),
          typeof a == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Oe(a)),
              (a = Ja(u).hoistableScripts),
              (e = a.get(t)),
              e ||
                ((e = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                a.set(t, e)),
              e)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(d(444, l));
    }
  }
  function Te(l) {
    return 'href="' + gt(l) + '"';
  }
  function hu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function er(l) {
    return H({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Ih(l, t, a, e) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (e.loading = 1)
      : ((t = l.createElement("link")),
        (e.preload = t),
        t.addEventListener("load", function () {
          return (e.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (e.loading |= 2);
        }),
        Ll(t, "link", a),
        Ul(t),
        l.head.appendChild(t));
  }
  function Oe(l) {
    return '[src="' + gt(l) + '"]';
  }
  function yu(l) {
    return "script[async]" + l;
  }
  function ur(l, t, a) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var e = l.querySelector('style[data-href~="' + gt(a.href) + '"]');
          if (e) return ((t.instance = e), Ul(e), e);
          var u = H({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null,
          });
          return (
            (e = (l.ownerDocument || l).createElement("style")),
            Ul(e),
            Ll(e, "style", u),
            Mn(e, a.precedence, l),
            (t.instance = e)
          );
        case "stylesheet":
          u = Te(a.href);
          var n = l.querySelector(hu(u));
          if (n) return ((t.state.loading |= 4), (t.instance = n), Ul(n), n);
          ((e = er(a)),
            (u = Ot.get(u)) && lf(e, u),
            (n = (l.ownerDocument || l).createElement("link")),
            Ul(n));
          var c = n;
          return (
            (c._p = new Promise(function (i, f) {
              ((c.onload = i), (c.onerror = f));
            })),
            Ll(n, "link", e),
            (t.state.loading |= 4),
            Mn(n, a.precedence, l),
            (t.instance = n)
          );
        case "script":
          return (
            (n = Oe(a.src)),
            (u = l.querySelector(yu(n)))
              ? ((t.instance = u), Ul(u), u)
              : ((e = a),
                (u = Ot.get(n)) && ((e = H({}, a)), tf(e, u)),
                (l = l.ownerDocument || l),
                (u = l.createElement("script")),
                Ul(u),
                Ll(u, "link", e),
                l.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(d(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((e = t.instance), (t.state.loading |= 4), Mn(e, a.precedence, l));
    return t.instance;
  }
  function Mn(l, t, a) {
    for (
      var e = a.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        u = e.length ? e[e.length - 1] : null,
        n = u,
        c = 0;
      c < e.length;
      c++
    ) {
      var i = e[c];
      if (i.dataset.precedence === t) n = i;
      else if (n !== u) break;
    }
    n
      ? n.parentNode.insertBefore(l, n.nextSibling)
      : ((t = a.nodeType === 9 ? a.head : a), t.insertBefore(l, t.firstChild));
  }
  function lf(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title));
  }
  function tf(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity));
  }
  var jn = null;
  function nr(l, t, a) {
    if (jn === null) {
      var e = new Map(),
        u = (jn = new Map());
      u.set(a, e);
    } else ((u = jn), (e = u.get(a)), e || ((e = new Map()), u.set(a, e)));
    if (e.has(l)) return e;
    for (
      e.set(l, null), a = a.getElementsByTagName(l), u = 0;
      u < a.length;
      u++
    ) {
      var n = a[u];
      if (
        !(
          n[je] ||
          n[Gl] ||
          (l === "link" && n.getAttribute("rel") === "stylesheet")
        ) &&
        n.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = n.getAttribute(t) || "";
        c = l + c;
        var i = e.get(c);
        i ? i.push(n) : e.set(c, [n]);
      }
    }
    return e;
  }
  function cr(l, t, a) {
    ((l = l.ownerDocument || l),
      l.head.insertBefore(
        a,
        t === "title" ? l.querySelector("head > title") : null,
      ));
  }
  function Ph(l, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        switch (t.rel) {
          case "stylesheet":
            return (
              (l = t.disabled),
              typeof t.precedence == "string" && l == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ir(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ly(l, t, a, e) {
    if (
      a.type === "stylesheet" &&
      (typeof e.media != "string" || matchMedia(e.media).matches !== !1) &&
      (a.state.loading & 4) === 0
    ) {
      if (a.instance === null) {
        var u = Te(e.href),
          n = t.querySelector(hu(u));
        if (n) {
          ((t = n._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = xn.bind(l)), t.then(l, l)),
            (a.state.loading |= 4),
            (a.instance = n),
            Ul(n));
          return;
        }
        ((n = t.ownerDocument || t),
          (e = er(e)),
          (u = Ot.get(u)) && lf(e, u),
          (n = n.createElement("link")),
          Ul(n));
        var c = n;
        ((c._p = new Promise(function (i, f) {
          ((c.onload = i), (c.onerror = f));
        })),
          Ll(n, "link", e),
          (a.instance = n));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(a, t),
        (t = a.state.preload) &&
          (a.state.loading & 3) === 0 &&
          (l.count++,
          (a = xn.bind(l)),
          t.addEventListener("load", a),
          t.addEventListener("error", a)));
    }
  }
  var af = 0;
  function ty(l, t) {
    return (
      l.stylesheets && l.count === 0 && Un(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (a) {
            var e = setTimeout(function () {
              if ((l.stylesheets && Un(l, l.stylesheets), l.unsuspend)) {
                var n = l.unsuspend;
                ((l.unsuspend = null), n());
              }
            }, 6e4 + t);
            0 < l.imgBytes && af === 0 && (af = 62500 * Hh());
            var u = setTimeout(
              function () {
                if (
                  ((l.waitingForImages = !1),
                  l.count === 0 &&
                    (l.stylesheets && Un(l, l.stylesheets), l.unsuspend))
                ) {
                  var n = l.unsuspend;
                  ((l.unsuspend = null), n());
                }
              },
              (l.imgBytes > af ? 50 : 800) + t,
            );
            return (
              (l.unsuspend = a),
              function () {
                ((l.unsuspend = null), clearTimeout(e), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function xn() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Un(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        ((this.unsuspend = null), l());
      }
    }
  }
  var Cn = null;
  function Un(l, t) {
    ((l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (Cn = new Map()),
        t.forEach(ay, l),
        (Cn = null),
        xn.call(l)));
  }
  function ay(l, t) {
    if (!(t.state.loading & 4)) {
      var a = Cn.get(l);
      if (a) var e = a.get(null);
      else {
        ((a = new Map()), Cn.set(l, a));
        for (
          var u = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            n = 0;
          n < u.length;
          n++
        ) {
          var c = u[n];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (a.set(c.dataset.precedence, c), (e = c));
        }
        e && a.set(null, e);
      }
      ((u = t.instance),
        (c = u.getAttribute("data-precedence")),
        (n = a.get(c) || e),
        n === e && a.set(null, u),
        a.set(c, u),
        this.count++,
        (e = xn.bind(this)),
        u.addEventListener("load", e),
        u.addEventListener("error", e),
        n
          ? n.parentNode.insertBefore(u, n.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(u, l.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var vu = {
    $$typeof: Al,
    Provider: null,
    Consumer: null,
    _currentValue: Y,
    _currentValue2: Y,
    _threadCount: 0,
  };
  function ey(l, t, a, e, u, n, c, i, f) {
    ((this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = kn(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = kn(0)),
      (this.hiddenUpdates = kn(null)),
      (this.identifierPrefix = e),
      (this.onUncaughtError = u),
      (this.onCaughtError = n),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map()));
  }
  function fr(l, t, a, e, u, n, c, i, f, y, E, p) {
    return (
      (l = new ey(l, t, a, c, f, y, E, p, i)),
      (t = 1),
      n === !0 && (t |= 24),
      (n = st(3, null, null, t)),
      (l.current = n),
      (n.stateNode = l),
      (t = Hc()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (n.memoizedState = { element: e, isDehydrated: a, cache: t }),
      Gc(n),
      l
    );
  }
  function sr(l) {
    return l ? ((l = ae), l) : ae;
  }
  function or(l, t, a, e, u, n) {
    ((u = sr(u)),
      e.context === null ? (e.context = u) : (e.pendingContext = u),
      (e = ia(t)),
      (e.payload = { element: a }),
      (n = n === void 0 ? null : n),
      n !== null && (e.callback = n),
      (a = fa(l, e, t)),
      a !== null && (at(a, l, t), We(a, l, t)));
  }
  function dr(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function ef(l, t) {
    (dr(l, t), (l = l.alternate) && dr(l, t));
  }
  function rr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ma(l, 67108864);
      (t !== null && at(t, l, 67108864), ef(l, 67108864));
    }
  }
  function mr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ht();
      t = In(t);
      var a = Ma(l, t);
      (a !== null && at(a, l, t), ef(l, t));
    }
  }
  var Hn = !0;
  function uy(l, t, a, e) {
    var u = A.T;
    A.T = null;
    var n = R.p;
    try {
      ((R.p = 2), uf(l, t, a, e));
    } finally {
      ((R.p = n), (A.T = u));
    }
  }
  function ny(l, t, a, e) {
    var u = A.T;
    A.T = null;
    var n = R.p;
    try {
      ((R.p = 8), uf(l, t, a, e));
    } finally {
      ((R.p = n), (A.T = u));
    }
  }
  function uf(l, t, a, e) {
    if (Hn) {
      var u = nf(e);
      if (u === null) (Vi(l, t, e, Bn, a), yr(l, e));
      else if (iy(u, l, t, a, e)) e.stopPropagation();
      else if ((yr(l, e), t & 4 && -1 < cy.indexOf(l))) {
        for (; u !== null; ) {
          var n = Ka(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (((n = n.stateNode), n.current.memoizedState.isDehydrated)) {
                  var c = Oa(n.pendingLanes);
                  if (c !== 0) {
                    var i = n;
                    for (i.pendingLanes |= 2, i.entangledLanes |= 2; c; ) {
                      var f = 1 << (31 - it(c));
                      ((i.entanglements[1] |= f), (c &= ~f));
                    }
                    (Ct(n), (cl & 6) === 0 && ((Sn = nt() + 500), ou(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((i = Ma(n, 2)), i !== null && at(i, n, 2), En(), ef(n, 2));
            }
          if (((n = nf(e)), n === null && Vi(l, t, e, Bn, a), n === u)) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else Vi(l, t, e, null, a);
    }
  }
  function nf(l) {
    return ((l = ic(l)), cf(l));
  }
  var Bn = null;
  function cf(l) {
    if (((Bn = null), (l = Va(l)), l !== null)) {
      var t = X(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (((l = L(t)), l !== null)) return l;
          l = null;
        } else if (a === 31) {
          if (((l = ll(t)), l !== null)) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ((Bn = l), null);
  }
  function hr(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Kr()) {
          case Af:
            return 2;
          case zf:
            return 8;
          case Tu:
          case Jr:
            return 32;
          case pf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ff = !1,
    ba = null,
    Ea = null,
    Aa = null,
    gu = new Map(),
    Su = new Map(),
    za = [],
    cy =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function yr(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        ba = null;
        break;
      case "dragenter":
      case "dragleave":
        Ea = null;
        break;
      case "mouseover":
      case "mouseout":
        Aa = null;
        break;
      case "pointerover":
      case "pointerout":
        gu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Su.delete(t.pointerId);
    }
  }
  function bu(l, t, a, e, u, n) {
    return l === null || l.nativeEvent !== n
      ? ((l = {
          blockedOn: t,
          domEventName: a,
          eventSystemFlags: e,
          nativeEvent: n,
          targetContainers: [u],
        }),
        t !== null && ((t = Ka(t)), t !== null && rr(t)),
        l)
      : ((l.eventSystemFlags |= e),
        (t = l.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        l);
  }
  function iy(l, t, a, e, u) {
    switch (t) {
      case "focusin":
        return ((ba = bu(ba, l, t, a, e, u)), !0);
      case "dragenter":
        return ((Ea = bu(Ea, l, t, a, e, u)), !0);
      case "mouseover":
        return ((Aa = bu(Aa, l, t, a, e, u)), !0);
      case "pointerover":
        var n = u.pointerId;
        return (gu.set(n, bu(gu.get(n) || null, l, t, a, e, u)), !0);
      case "gotpointercapture":
        return (
          (n = u.pointerId),
          Su.set(n, bu(Su.get(n) || null, l, t, a, e, u)),
          !0
        );
    }
    return !1;
  }
  function vr(l) {
    var t = Va(l.target);
    if (t !== null) {
      var a = X(t);
      if (a !== null) {
        if (((t = a.tag), t === 13)) {
          if (((t = L(a)), t !== null)) {
            ((l.blockedOn = t),
              Rf(l.priority, function () {
                mr(a);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = ll(a)), t !== null)) {
            ((l.blockedOn = t),
              Rf(l.priority, function () {
                mr(a);
              }));
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function qn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = nf(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var e = new a.constructor(a.type, a);
        ((cc = e), a.target.dispatchEvent(e), (cc = null));
      } else return ((t = Ka(a)), t !== null && rr(t), (l.blockedOn = a), !1);
      t.shift();
    }
    return !0;
  }
  function gr(l, t, a) {
    qn(l) && a.delete(t);
  }
  function fy() {
    ((ff = !1),
      ba !== null && qn(ba) && (ba = null),
      Ea !== null && qn(Ea) && (Ea = null),
      Aa !== null && qn(Aa) && (Aa = null),
      gu.forEach(gr),
      Su.forEach(gr));
  }
  function Yn(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      ff ||
        ((ff = !0),
        g.unstable_scheduleCallback(g.unstable_NormalPriority, fy)));
  }
  var Gn = null;
  function Sr(l) {
    Gn !== l &&
      ((Gn = l),
      g.unstable_scheduleCallback(g.unstable_NormalPriority, function () {
        Gn === l && (Gn = null);
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t],
            e = l[t + 1],
            u = l[t + 2];
          if (typeof e != "function") {
            if (cf(e || a) === null) continue;
            break;
          }
          var n = Ka(a);
          n !== null &&
            (l.splice(t, 3),
            (t -= 3),
            ni(n, { pending: !0, data: u, method: a.method, action: e }, e, u));
        }
      }));
  }
  function Ne(l) {
    function t(f) {
      return Yn(f, l);
    }
    (ba !== null && Yn(ba, l),
      Ea !== null && Yn(Ea, l),
      Aa !== null && Yn(Aa, l),
      gu.forEach(t),
      Su.forEach(t));
    for (var a = 0; a < za.length; a++) {
      var e = za[a];
      e.blockedOn === l && (e.blockedOn = null);
    }
    for (; 0 < za.length && ((a = za[0]), a.blockedOn === null); )
      (vr(a), a.blockedOn === null && za.shift());
    if (((a = (l.ownerDocument || l).$$reactFormReplay), a != null))
      for (e = 0; e < a.length; e += 3) {
        var u = a[e],
          n = a[e + 1],
          c = u[Fl] || null;
        if (typeof n == "function") c || Sr(a);
        else if (c) {
          var i = null;
          if (n && n.hasAttribute("formAction")) {
            if (((u = n), (c = n[Fl] || null))) i = c.formAction;
            else if (cf(u) !== null) continue;
          } else i = c.action;
          (typeof i == "function" ? (a[e + 1] = i) : (a.splice(e, 3), (e -= 3)),
            Sr(a));
        }
      }
  }
  function br() {
    function l(n) {
      n.canIntercept &&
        n.info === "react-transition" &&
        n.intercept({
          handler: function () {
            return new Promise(function (c) {
              return (u = c);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (u !== null && (u(), (u = null)), e || setTimeout(a, 20));
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n &&
          n.url != null &&
          navigation.navigate(n.url, {
            state: n.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var e = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(a, 100),
        function () {
          ((e = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function sf(l) {
    this._internalRoot = l;
  }
  ((Zn.prototype.render = sf.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(d(409));
      var a = t.current,
        e = ht();
      or(a, e, l, t, null, null);
    }),
    (Zn.prototype.unmount = sf.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          (or(l.current, 2, null, l, null, null), En(), (t[La] = null));
        }
      }));
  function Zn(l) {
    this._internalRoot = l;
  }
  Zn.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = Df();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < za.length && t !== 0 && t < za[a].priority; a++);
      (za.splice(a, 0, l), a === 0 && vr(l));
    }
  };
  var Er = O.version;
  if (Er !== "19.2.0") throw Error(d(527, Er, "19.2.0"));
  R.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(d(188))
        : ((l = Object.keys(l).join(",")), Error(d(268, l)));
    return (
      (l = b(t)),
      (l = l !== null ? J(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var sy = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: A,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        ((De = Xn.inject(sy)), (ct = Xn));
      } catch {}
  }
  return (
    (Au.createRoot = function (l, t) {
      if (!C(l)) throw Error(d(299));
      var a = !1,
        e = "",
        u = _o,
        n = Do,
        c = Ro;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (a = !0),
          t.identifierPrefix !== void 0 && (e = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (n = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        (t = fr(l, 1, !1, null, null, a, e, null, u, n, c, br)),
        (l[La] = t.current),
        Li(l),
        new sf(t)
      );
    }),
    (Au.hydrateRoot = function (l, t, a) {
      if (!C(l)) throw Error(d(299));
      var e = !1,
        u = "",
        n = _o,
        c = Do,
        i = Ro,
        f = null;
      return (
        a != null &&
          (a.unstable_strictMode === !0 && (e = !0),
          a.identifierPrefix !== void 0 && (u = a.identifierPrefix),
          a.onUncaughtError !== void 0 && (n = a.onUncaughtError),
          a.onCaughtError !== void 0 && (c = a.onCaughtError),
          a.onRecoverableError !== void 0 && (i = a.onRecoverableError),
          a.formState !== void 0 && (f = a.formState)),
        (t = fr(l, 1, !0, t, a ?? null, e, u, f, n, c, i, br)),
        (t.context = sr(null)),
        (a = t.current),
        (e = ht()),
        (e = In(e)),
        (u = ia(e)),
        (u.callback = null),
        fa(a, u, e),
        (a = e),
        (t.current.lanes = a),
        Me(t, a),
        Ct(t),
        (l[La] = t.current),
        Li(l),
        new Zn(t)
      );
    }),
    (Au.version = "19.2.0"),
    Au
  );
}
var Mr;
function by() {
  if (Mr) return rf.exports;
  Mr = 1;
  function g() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(g);
      } catch (O) {
        console.error(O);
      }
  }
  return (g(), (rf.exports = Sy()), rf.exports);
}
var Ey = by();
const Br = "wazir_game_";
function Ln(g, O) {
  return `${Br}room_${g}_${O}`;
}
function Vn(g) {
  return `${Br}player_${g}`;
}
function Ay(g) {
  try {
    localStorage.setItem(Vn("identity"), JSON.stringify(g));
  } catch (O) {
    console.error("Failed to save player data:", O);
  }
}
function zy() {
  try {
    const g = localStorage.getItem(Vn("identity"));
    return g ? JSON.parse(g) : null;
  } catch (g) {
    return (console.error("Failed to load player data:", g), null);
  }
}
function qr(g, O) {
  try {
    localStorage.setItem(Ln(g, "scoreboard"), JSON.stringify(O));
  } catch (N) {
    console.error("Failed to save scoreboard:", N);
  }
}
function Yr(g) {
  try {
    const O = localStorage.getItem(Ln(g, "scoreboard"));
    return O ? JSON.parse(O) : {};
  } catch (O) {
    return (console.error("Failed to load scoreboard:", O), {});
  }
}
function Sf(g, O) {
  try {
    localStorage.setItem(Ln(g, "state"), JSON.stringify(O));
  } catch (N) {
    console.error("Failed to save room state:", N);
  }
}
function Gr(g) {
  try {
    const O = localStorage.getItem(Ln(g, "state"));
    return O ? JSON.parse(O) : null;
  } catch (O) {
    return (console.error("Failed to load room state:", O), null);
  }
}
function Zr(g) {
  try {
    localStorage.setItem(Vn("scoring_config"), JSON.stringify(g));
  } catch (O) {
    console.error("Failed to save scoring config:", O);
  }
}
function py() {
  try {
    const g = localStorage.getItem(Vn("scoring_config"));
    return g ? JSON.parse(g) : null;
  } catch (g) {
    return (console.error("Failed to load scoring config:", g), null);
  }
}
function Ty(g) {
  const O = Yr(g),
    N = Gr(g);
  return JSON.stringify(
    {
      roomCode: g,
      scoreboard: O,
      state: N,
      exportedAt: new Date().toISOString(),
    },
    null,
    2,
  );
}
function Oy(g) {
  try {
    const O = JSON.parse(g);
    if (!O.roomCode)
      throw new Error("Invalid scoreboard data: missing roomCode");
    return (
      O.scoreboard && qr(O.roomCode, O.scoreboard),
      O.state && Sf(O.roomCode, O.state),
      { success: !0, roomCode: O.roomCode }
    );
  } catch (O) {
    return (
      console.error("Failed to import scoreboard:", O),
      { success: !1, error: O.message }
    );
  }
}
function Ny({ onJoinRoom: g, onBack: O }) {
  const N = zy(),
    [d, C] = ol.useState(N?.roomCode || ""),
    [X, L] = ol.useState(""),
    [ll, D] = ol.useState("4"),
    [b, J] = ol.useState(N?.displayName || ""),
    [H, W] = ol.useState(""),
    El = () => {
      if ((W(""), !d.trim())) {
        W("Please enter a room code.");
        return;
      }
      const tl = parseInt(X),
        q = parseInt(ll);
      if (isNaN(tl) || tl < 1) {
        W("Please enter a valid player number (1 or higher).");
        return;
      }
      if (isNaN(q) || q < 4) {
        W("At least 4 players are required.");
        return;
      }
      if (tl > q) {
        W(`Player number cannot exceed total players (${q}).`);
        return;
      }
      Ay({
        roomCode: d.trim(),
        playerNumber: tl,
        displayName: b.trim(),
        numPlayers: q,
      });
      let dl = Gr(d.trim());
      (dl || ((dl = { roundNumber: 1, numPlayers: q }), Sf(d.trim(), dl)),
        g({
          roomCode: d.trim(),
          playerNumber: tl,
          numPlayers: dl.numPlayers || q,
          displayName: b.trim(),
          roundNumber: dl.roundNumber || 1,
        }));
    };
  return r.jsxs("div", {
    className: "lobby",
    children: [
      r.jsx("div", { className: "lobby-bg" }),
      r.jsxs("div", {
        className: "lobby-glass",
        children: [
          O &&
            r.jsx("button", {
              className: "lobby-back-btn",
              onClick: O,
              children: "← Back",
            }),
          r.jsx("h1", { className: "lobby-title", children: "JOIN ROOM" }),
          r.jsx("p", {
            className: "lobby-subtitle",
            children: "Enter the shared room code and your secret identity",
          }),
          r.jsxs("div", {
            className: "lobby-warning",
            children: [
              r.jsxs("svg", {
                viewBox: "0 0 24 24",
                width: "20",
                height: "20",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: [
                  r.jsx("rect", {
                    x: "3",
                    y: "11",
                    width: "18",
                    height: "11",
                    rx: "2",
                    ry: "2",
                  }),
                  r.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }),
                ],
              }),
              r.jsx("span", {
                children:
                  "Secret Identity Warning: Keep your player number private. Anyone who enters it can see your role.",
              }),
            ],
          }),
          r.jsxs("div", {
            className: "lobby-form",
            children: [
              r.jsxs("div", {
                className: "lobby-field",
                children: [
                  r.jsxs("label", {
                    htmlFor: "roomCode",
                    children: [
                      "Room Code ",
                      r.jsx("span", {
                        className: "lobby-shared-badge",
                        children: "Shared",
                      }),
                    ],
                  }),
                  r.jsx("input", {
                    id: "roomCode",
                    type: "text",
                    value: d,
                    onChange: (tl) => C(tl.target.value.toUpperCase()),
                    placeholder: "e.g., GAME123",
                    maxLength: 20,
                    autoComplete: "off",
                  }),
                ],
              }),
              r.jsxs("div", {
                className: "lobby-field",
                children: [
                  r.jsx("label", {
                    htmlFor: "numPlayers",
                    children: "Number of Players",
                  }),
                  r.jsx("input", {
                    id: "numPlayers",
                    type: "number",
                    value: ll,
                    onChange: (tl) => D(tl.target.value),
                    min: "4",
                    max: "20",
                  }),
                ],
              }),
              r.jsxs("div", {
                className: "lobby-field",
                children: [
                  r.jsxs("label", {
                    htmlFor: "playerNumber",
                    children: [
                      "Your Player Number ",
                      r.jsx("span", {
                        className: "lobby-private-badge",
                        children: "Private",
                      }),
                    ],
                  }),
                  r.jsx("input", {
                    id: "playerNumber",
                    type: "number",
                    value: X,
                    onChange: (tl) => L(tl.target.value),
                    min: "1",
                    max: ll,
                    placeholder: "Your assigned number",
                  }),
                ],
              }),
              r.jsxs("div", {
                className: "lobby-field",
                children: [
                  r.jsxs("label", {
                    htmlFor: "displayName",
                    children: [
                      "Display Name ",
                      r.jsx("span", {
                        className: "lobby-optional-badge",
                        children: "Optional",
                      }),
                    ],
                  }),
                  r.jsx("input", {
                    id: "displayName",
                    type: "text",
                    value: b,
                    onChange: (tl) => J(tl.target.value),
                    placeholder: "Your name",
                    maxLength: 30,
                    autoComplete: "off",
                  }),
                ],
              }),
            ],
          }),
          H && r.jsx("div", { className: "lobby-error", children: H }),
          r.jsx("button", {
            className: "arcade-btn arcade-btn-gold lobby-join-btn",
            onClick: El,
            children: "JOIN ROOM",
          }),
          r.jsxs("div", {
            className: "lobby-info",
            children: [
              r.jsx("strong", {
                children: "How to assign player numbers privately:",
              }),
              r.jsxs("ul", {
                children: [
                  r.jsx("li", {
                    children:
                      "Use folded paper slips with numbers written inside",
                  }),
                  r.jsx("li", {
                    children: "Have players draw numbers from a hat",
                  }),
                  r.jsx("li", {
                    children: "Use a separate app to assign numbers secretly",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function _y(g) {
  let O = 0;
  for (let N = 0; N < g.length; N++) {
    const d = g.charCodeAt(N);
    ((O = (O << 5) - O + d), (O = O & O));
  }
  return Math.abs(O);
}
function Dy(g) {
  return function () {
    let O = (g += 1831565813);
    return (
      (O = Math.imul(O ^ (O >>> 15), O | 1)),
      (O ^= O + Math.imul(O ^ (O >>> 7), O | 61)),
      ((O ^ (O >>> 14)) >>> 0) / 4294967296
    );
  };
}
function Ry(g, O) {
  const N = [...g];
  for (let d = N.length - 1; d > 0; d--) {
    const C = Math.floor(O() * (d + 1));
    [N[d], N[C]] = [N[C], N[d]];
  }
  return N;
}
function Qn(g, O, N) {
  if (N < 4) throw new Error("Minimum 4 players required");
  const d = ["BADSHA", "WAZIR", "CHOR"];
  for (let ll = 3; ll < N; ll++) d.push("SIPAHI");
  const C = `${g}|${O}|BADSHA-WAZIR-CHOR-SIPAHI`,
    X = _y(C),
    L = Dy(X);
  return Ry(d, L);
}
function My(g, O, N, d) {
  if (d < 1 || d > N) throw new Error("Invalid player number");
  return Qn(g, O, N)[d - 1];
}
function jy(g) {
  return (
    {
      BADSHA: "Decide the WAZIR and ask the question aloud.",
      WAZIR: "Detect and identify the CHOR.",
      CHOR: "Blend in with SIPAHI.",
      SIPAHI: "Observe and help identify the CHOR.",
    }[g] || ""
  );
}
const vf = {
  wazirCorrect: { BADSHA: 3, WAZIR: 5, CHOR: 0, SIPAHI: 1 },
  wazirWrong: { BADSHA: 0, WAZIR: -1, CHOR: 6, SIPAHI: 0 },
};
function Xr() {
  return py() || vf;
}
function xy(g) {
  Zr(g);
}
function Cy() {
  return (Zr(vf), vf);
}
function jr(g, O, N, d) {
  const C = Qn(g, O, N),
    X = Xr(),
    L = {},
    ll = X[d];
  if (!ll) throw new Error(`Invalid outcome: ${d}`);
  for (let D = 0; D < N; D++) {
    const b = D + 1,
      J = C[D];
    L[b] = ll[J] || 0;
  }
  return L;
}
function Uy(g, O) {
  const N = { ...g };
  for (const [d, C] of Object.entries(O)) {
    const X = N[d] || 0;
    N[d] = X + C;
  }
  return N;
}
function xr(g, O) {
  return Object.entries(g)
    .map(([N, d]) => ({
      playerNumber: parseInt(N),
      role: O[parseInt(N) - 1],
      delta: d,
    }))
    .sort((N, d) => N.playerNumber - d.playerNumber);
}
const zu = "/Wazir/",
  Cr = {
    BADSHA: `${zu}media/role-badshah.mp4`,
    BADSHAH: `${zu}media/role-badshah.mp4`,
    WAZIR: `${zu}media/role-wazir.mp4`,
    CHOR: `${zu}media/role-chor.mp4`,
    SIPAHI: `${zu}media/role-sipahi.mp4`,
  },
  Ur = {
    BADSHA: "gold",
    BADSHAH: "gold",
    WAZIR: "teal",
    CHOR: "crimson",
    SIPAHI: "cyan",
  },
  Hr = {
    BADSHA: "Decide the WAZIR and ask the question aloud.",
    BADSHAH: "Decide the WAZIR and ask the question aloud.",
    WAZIR: "Detect and identify the CHOR.",
    CHOR: "Blend in with SIPAHI. Don't get caught.",
    SIPAHI: "Observe and help identify the CHOR.",
  };
function Hy({ role: g, onReady: O }) {
  const [N, d] = ol.useState("privacy"),
    [C, X] = ol.useState(!1),
    [L, ll] = ol.useState(!1),
    D = ol.useRef(null),
    b = ol.useRef(null);
  ol.useEffect(
    () => () => {
      b.current && clearTimeout(b.current);
    },
    [],
  );
  const J = () => {
      d("video");
    },
    H = () => {
      X(!0);
    },
    W = () => {
      d("card");
    },
    El = () => {
      (ll(!0), d("card"));
    },
    tl = () => {
      (ll(!0), d("card"));
    },
    q = () => {
      O();
    },
    dl = g === "BADSHA" ? "BADSHAH" : g,
    jl = Cr[dl] || Cr[g],
    xl = Ur[dl] || Ur[g] || "cyan",
    Al = Hr[dl] || Hr[g] || "";
  return r.jsxs("div", {
    className: `rolereveal rolereveal-${xl}`,
    children: [
      N === "privacy" &&
        r.jsxs("div", {
          className: "rolereveal-privacy",
          children: [
            r.jsx("div", {
              className: "rolereveal-privacy-icon",
              children: r.jsxs("svg", {
                viewBox: "0 0 24 24",
                width: "48",
                height: "48",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: [
                  r.jsx("rect", {
                    x: "3",
                    y: "11",
                    width: "18",
                    height: "11",
                    rx: "2",
                    ry: "2",
                  }),
                  r.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" }),
                ],
              }),
            }),
            r.jsx("h2", {
              className: "rolereveal-privacy-title",
              children: "Secret Identity",
            }),
            r.jsxs("p", {
              className: "rolereveal-privacy-text",
              children: [
                "Hide your screen from others.",
                r.jsx("br", {}),
                "Your role is about to reveal.",
              ],
            }),
            r.jsx("button", {
              className: "arcade-btn arcade-btn-gold",
              onClick: J,
              children: "REVEAL MY ROLE",
            }),
          ],
        }),
      N === "video" &&
        !L &&
        r.jsxs("div", {
          className: "rolereveal-video-container",
          children: [
            r.jsx("video", {
              ref: D,
              className: "rolereveal-video",
              src: jl,
              muted: !0,
              playsInline: !0,
              autoPlay: !0,
              preload: "metadata",
              onEnded: W,
              onError: El,
              onCanPlay: H,
            }),
            r.jsx("button", {
              className: "rolereveal-skip-btn",
              onClick: tl,
              children: "Skip Video",
            }),
            C &&
              r.jsx("div", {
                className: "rolereveal-video-hint",
                children: "Playing role reveal...",
              }),
            !C &&
              !L &&
              r.jsx("div", {
                className: "rolereveal-video-hint",
                children: "Loading...",
              }),
          ],
        }),
      N === "card" &&
        r.jsxs("div", {
          className: "rolereveal-card",
          children: [
            r.jsx("div", {
              className: `rolereveal-card-badge rolereveal-badge-${xl}`,
              children: g,
            }),
            r.jsx("p", { className: "rolereveal-card-tip", children: Al }),
            r.jsx("button", {
              className: "arcade-btn arcade-btn-gold",
              onClick: q,
              children: "I'M READY",
            }),
          ],
        }),
    ],
  });
}
const wl = {
    SECRET_REVEAL: "secretReveal",
    BLUFF: "bluff",
    WAZIR_GUESS: "wazirGuess",
    POST_ROUND: "postRound",
    SCORE_REVEAL: "scoreReveal",
  },
  By = { BADSHA: "gold", WAZIR: "teal", CHOR: "crimson", SIPAHI: "cyan" };
function qy({
  roomCode: g,
  playerNumber: O,
  numPlayers: N,
  roundNumber: d,
  displayName: C,
  onLeave: X,
}) {
  const [L, ll] = ol.useState(d),
    [D, b] = ol.useState(wl.SECRET_REVEAL),
    [J, H] = ol.useState(!1),
    [W, El] = ol.useState(null),
    [tl, q] = ol.useState(!1),
    [dl, jl] = ol.useState(() => Yr(g)),
    [xl, Al] = ol.useState(""),
    [Wl, $l] = ol.useState(!1),
    [Bl, $] = ol.useState(null),
    [ql, et] = ol.useState(null),
    Yl = My(g, L, N, O),
    yt = jy(Yl),
    Vl = By[Yl] || "cyan";
  ol.useEffect(() => {
    Sf(g, { roundNumber: L, numPlayers: N });
  }, [g, L, N]);
  const Ut = () => {
      (H(!0), b(wl.BLUFF));
    },
    Nt = () => {
      b(Yl === "WAZIR" ? wl.WAZIR_GUESS : wl.POST_ROUND);
    },
    ut = (_) => {
      Al(_);
    },
    A = () => {
      $l(!0);
    },
    R = () => {
      ($l(!1), b(wl.POST_ROUND));
    },
    Y = () => {
      $l(!1);
    },
    nl = (_) => {
      (El(_), q(!0));
    },
    il = () => {
      const _ = jr(g, L, N, W),
        Z = Uy(dl, _);
      (jl(Z),
        qr(g, Z),
        $(xr(_, Qn(g, L, N))),
        et(W),
        q(!1),
        El(null),
        H(!1),
        Al(""),
        b(wl.SCORE_REVEAL));
    },
    o = () => {
      (q(!1), El(null));
    },
    T = () => {
      ($(null), et(null), ll((_) => _ + 1), b(wl.SECRET_REVEAL));
    },
    M = () => {
      (H(!1), Al(""), ll((_) => _ + 1), b(wl.SECRET_REVEAL));
    },
    x = () => {
      if (!W) return [];
      const _ = Qn(g, L, N),
        Z = jr(g, L, N, W);
      return xr(Z, _);
    },
    Q = Object.entries(dl).sort(([, _], [, Z]) => Z - _);
  return r.jsxs("div", {
    className: "game",
    children: [
      r.jsx("div", { className: "game-bg" }),
      r.jsxs("header", {
        className: "game-header",
        children: [
          r.jsxs("div", {
            className: "game-info",
            children: [
              r.jsxs("span", {
                className: "game-room",
                children: ["Room: ", r.jsx("strong", { children: g })],
              }),
              r.jsxs("span", {
                className: "game-round",
                children: ["Round ", L],
              }),
              r.jsxs("span", {
                className: "game-players",
                children: [N, " Players"],
              }),
            ],
          }),
          r.jsx("button", {
            className: "game-leave-btn",
            onClick: X,
            children: "Leave",
          }),
        ],
      }),
      C &&
        r.jsxs("div", {
          className: "game-player-name",
          children: ["Playing as: ", r.jsx("strong", { children: C })],
        }),
      D === wl.SECRET_REVEAL && !J && r.jsx(Hy, { role: Yl, onReady: Ut }),
      D === wl.BLUFF &&
        r.jsxs("div", {
          className: "game-phase",
          children: [
            r.jsxs("div", {
              className: `game-role-indicator game-role-${Vl}`,
              children: ["You are the ", r.jsx("strong", { children: Yl })],
            }),
            r.jsx("p", { className: "game-role-tip", children: yt }),
            r.jsxs("div", {
              className: "bluff-screen",
              children: [
                r.jsx("h2", {
                  className: "bluff-title",
                  children: "Accuse. Defend. Lie.",
                }),
                r.jsxs("p", {
                  className: "bluff-subtitle",
                  children: [
                    Yl === "BADSHA" && "Ask the WAZEER a question aloud.",
                    Yl === "WAZIR" && "Listen carefully. Who is the CHOR?",
                    Yl === "CHOR" && "Blend in. Act like a SIPAHI.",
                    Yl === "SIPAHI" && "Watch and observe. Help the WAZEER.",
                  ],
                }),
                r.jsx("button", {
                  className: "arcade-btn arcade-btn-gold",
                  onClick: Nt,
                  children: Yl === "WAZIR" ? "MAKE YOUR GUESS" : "END ROUND",
                }),
              ],
            }),
            r.jsx("div", {
              className: "game-round-controls",
              children: r.jsx("button", {
                className: "arcade-btn arcade-btn-ghost",
                onClick: M,
                children: "SKIP ROUND (ABORTED)",
              }),
            }),
          ],
        }),
      D === wl.WAZIR_GUESS &&
        r.jsxs("div", {
          className: "game-phase",
          children: [
            r.jsx("h2", {
              className: "guess-title",
              children: "WAZEER, WHO IS THE CHOR?",
            }),
            r.jsx("div", {
              className: "guess-cards",
              children: Array.from({ length: N }, (_, Z) => Z + 1)
                .filter((_) => _ !== O)
                .map((_) =>
                  r.jsxs(
                    "button",
                    {
                      className: `guess-card ${xl === _ ? "guess-card-selected" : ""}`,
                      onClick: () => ut(_),
                      children: [
                        r.jsx("span", {
                          className: "guess-card-number",
                          children: _,
                        }),
                        r.jsxs("span", {
                          className: "guess-card-label",
                          children: ["Player ", _],
                        }),
                      ],
                    },
                    _,
                  ),
                ),
            }),
            r.jsxs("button", {
              className: "arcade-btn arcade-btn-teal",
              onClick: A,
              disabled: !xl,
              children: ["ACCUSE PLAYER ", xl || "?"],
            }),
            r.jsx("div", {
              className: "guess-disclaimer",
              children: "Local only — recorded for your reference",
            }),
            Wl &&
              r.jsx("div", {
                className: "modal-overlay",
                onClick: Y,
                children: r.jsxs("div", {
                  className: "modal",
                  onClick: (_) => _.stopPropagation(),
                  children: [
                    r.jsx("h2", { children: "Confirm Your Accusation" }),
                    r.jsxs("p", {
                      children: ["You believe Player ", xl, " is the CHOR."],
                    }),
                    r.jsx("p", {
                      children:
                        "This is recorded locally for your reference during the group reveal.",
                    }),
                    r.jsxs("div", {
                      className: "modal-buttons",
                      children: [
                        r.jsx("button", {
                          className: "arcade-btn arcade-btn-teal",
                          onClick: R,
                          children: "CONFIRM",
                        }),
                        r.jsx("button", {
                          className: "arcade-btn arcade-btn-ghost",
                          onClick: Y,
                          children: "CANCEL",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        }),
      D === wl.POST_ROUND &&
        !tl &&
        r.jsxs("div", {
          className: "game-phase",
          children: [
            r.jsx("h2", {
              className: "outcome-title",
              children: "Who won this round?",
            }),
            r.jsx("p", {
              className: "outcome-subtitle",
              children:
                "The group performs the physical reveal and decides the result.",
            }),
            r.jsxs("div", {
              className: "outcome-buttons",
              children: [
                r.jsx("button", {
                  className: "arcade-btn arcade-btn-teal outcome-btn",
                  onClick: () => nl("wazirCorrect"),
                  children: "WAZEER CAUGHT THE CHOR",
                }),
                r.jsx("button", {
                  className: "arcade-btn arcade-btn-crimson outcome-btn",
                  onClick: () => nl("wazirWrong"),
                  children: "CHOR ESCAPED!",
                }),
              ],
            }),
            r.jsx("button", {
              className: "arcade-btn arcade-btn-ghost",
              onClick: M,
              children: "SKIP ROUND (ABORTED)",
            }),
          ],
        }),
      tl &&
        r.jsx("div", {
          className: "modal-overlay",
          onClick: o,
          children: r.jsxs("div", {
            className: "modal",
            onClick: (_) => _.stopPropagation(),
            children: [
              r.jsx("h2", { children: "Confirm Points" }),
              r.jsx("p", {
                className: "outcome-result",
                children:
                  W === "wazirCorrect"
                    ? "WAZEER correctly identified the CHOR!"
                    : "CHOR escaped detection!",
              }),
              r.jsxs("div", {
                className: "deltas-summary",
                children: [
                  r.jsx("h3", { children: "Points to be applied:" }),
                  x().map(({ playerNumber: _, role: Z, delta: Sl }) =>
                    r.jsxs(
                      "div",
                      {
                        className: `delta-item ${_ === O ? "delta-item-you" : ""}`,
                        children: [
                          r.jsxs("span", {
                            children: [
                              "Player ",
                              _,
                              " (",
                              Z,
                              ")",
                              _ === O ? " — You" : "",
                            ],
                          }),
                          r.jsxs("span", {
                            className: `delta-value ${Sl > 0 ? "delta-positive" : Sl < 0 ? "delta-negative" : ""}`,
                            children: [Sl > 0 ? "+" : "", Sl],
                          }),
                        ],
                      },
                      _,
                    ),
                  ),
                ],
              }),
              r.jsxs("div", {
                className: "modal-buttons",
                children: [
                  r.jsx("button", {
                    className: "arcade-btn arcade-btn-gold",
                    onClick: il,
                    children: "APPLY POINTS",
                  }),
                  r.jsx("button", {
                    className: "arcade-btn arcade-btn-ghost",
                    onClick: o,
                    children: "CANCEL",
                  }),
                ],
              }),
              r.jsx("p", {
                className: "sync-warning",
                children:
                  "Points applied locally on this phone. Others must also apply to keep scores consistent.",
              }),
            ],
          }),
        }),
      D === wl.SCORE_REVEAL &&
        r.jsx("div", {
          className: "game-phase",
          children: r.jsxs("div", {
            className: "score-reveal",
            children: [
              r.jsx("div", {
                className: `score-headline ${ql === "wazirCorrect" ? "headline-wazir" : "headline-chor"}`,
                children:
                  ql === "wazirCorrect"
                    ? "WAZEER CAUGHT THE CHOR!"
                    : "CHOR ESCAPED!",
              }),
              Bl &&
                r.jsx("div", {
                  className: "score-deltas",
                  children: Bl.map(({ playerNumber: _, delta: Z }) =>
                    r.jsxs(
                      "div",
                      {
                        className: `score-delta ${_ === O ? "score-delta-you" : ""} ${Z > 0 ? "score-delta-pos" : Z < 0 ? "score-delta-neg" : "score-delta-zero"}`,
                        children: [
                          r.jsxs("span", {
                            children: ["Player ", _, _ === O ? " (You)" : ""],
                          }),
                          r.jsxs("span", {
                            className: "score-delta-value",
                            children: [Z > 0 ? "+" : "", Z],
                          }),
                        ],
                      },
                      _,
                    ),
                  ),
                }),
              r.jsxs("div", {
                className: "scoreboard",
                children: [
                  r.jsx("h3", {
                    className: "scoreboard-title",
                    children: "Scoreboard",
                  }),
                  Q.length === 0
                    ? r.jsx("p", {
                        className: "scoreboard-empty",
                        children: "No scores yet",
                      })
                    : r.jsx("div", {
                        className: "scoreboard-list",
                        children: Q.map(([_, Z], Sl) =>
                          r.jsxs(
                            "div",
                            {
                              className: `scoreboard-item ${parseInt(_) === O ? "scoreboard-item-you" : ""} ${Sl === 0 ? "scoreboard-item-leader" : ""}`,
                              children: [
                                r.jsxs("div", {
                                  className: "scoreboard-rank",
                                  children: [
                                    Sl === 0 &&
                                      r.jsx("span", {
                                        className: "scoreboard-crown",
                                        children: "👑",
                                      }),
                                    r.jsxs("span", { children: ["#", Sl + 1] }),
                                  ],
                                }),
                                r.jsxs("div", {
                                  className: "scoreboard-name",
                                  children: [
                                    "Player ",
                                    _,
                                    parseInt(_) === O &&
                                      r.jsx("span", {
                                        className: "scoreboard-you-tag",
                                        children: "YOU",
                                      }),
                                  ],
                                }),
                                r.jsx("div", {
                                  className: "scoreboard-score",
                                  children: Z,
                                }),
                              ],
                            },
                            _,
                          ),
                        ),
                      }),
                ],
              }),
              r.jsx("button", {
                className: "arcade-btn arcade-btn-gold",
                onClick: T,
                children: "NEXT ROUND",
              }),
            ],
          }),
        }),
      D !== wl.SCORE_REVEAL &&
        D !== wl.SECRET_REVEAL &&
        r.jsxs("div", {
          className: "game-scoreboard-mini",
          children: [
            r.jsx("h3", { children: "Scores" }),
            r.jsx("div", {
              className: "game-scores-list",
              children:
                Q.length === 0
                  ? r.jsx("p", {
                      className: "game-no-scores",
                      children: "No scores yet",
                    })
                  : Q.map(([_, Z]) =>
                      r.jsxs(
                        "div",
                        {
                          className: `game-score-row ${parseInt(_) === O ? "game-score-you" : ""}`,
                          children: [
                            r.jsxs("span", {
                              children: [
                                "Player ",
                                _,
                                parseInt(_) === O ? " (You)" : "",
                              ],
                            }),
                            r.jsx("span", {
                              className: "game-score-val",
                              children: Z,
                            }),
                          ],
                        },
                        _,
                      ),
                    ),
            }),
          ],
        }),
    ],
  });
}
function Yy({ roomCode: g, onBack: O }) {
  const [N, d] = ol.useState(() => Xr()),
    [C, X] = ol.useState(""),
    [L, ll] = ol.useState(""),
    [D, b] = ol.useState({ type: "", text: "" }),
    J = (q, dl, jl) => {
      const xl = { ...N, [q]: { ...N[q], [dl]: parseInt(jl) || 0 } };
      (d(xl),
        xy(xl),
        b({ type: "success", text: "Scoring configuration saved." }),
        setTimeout(() => b({ type: "", text: "" }), 2e3));
    },
    H = () => {
      const q = Cy();
      (d(q),
        b({
          type: "success",
          text: "Scoring configuration reset to defaults.",
        }),
        setTimeout(() => b({ type: "", text: "" }), 2e3));
    },
    W = () => {
      if (!g) {
        b({
          type: "error",
          text: "No room code specified. Join a room first.",
        });
        return;
      }
      const q = Ty(g);
      (ll(q),
        b({
          type: "success",
          text: "Scoreboard exported. Copy the text below.",
        }));
    },
    El = () => {
      navigator.clipboard
        .writeText(L)
        .then(() => {
          (b({ type: "success", text: "Copied to clipboard!" }),
            setTimeout(() => b({ type: "", text: "" }), 2e3));
        })
        .catch(() => {
          b({
            type: "error",
            text: "Failed to copy. Please select and copy manually.",
          });
        });
    },
    tl = () => {
      if (!C.trim()) {
        b({ type: "error", text: "Please paste scoreboard JSON to import." });
        return;
      }
      const q = Oy(C);
      q.success
        ? (b({
            type: "success",
            text: `Scoreboard imported for room: ${q.roomCode}`,
          }),
          X(""))
        : b({ type: "error", text: `Import failed: ${q.error}` });
    };
  return r.jsxs("div", {
    className: "settings",
    children: [
      r.jsxs("header", {
        className: "settings-header",
        children: [
          r.jsx("button", {
            className: "back-button",
            onClick: O,
            children: "← Back",
          }),
          r.jsx("h1", { children: "Settings" }),
        ],
      }),
      D.text &&
        r.jsx("div", { className: `message ${D.type}`, children: D.text }),
      r.jsxs("section", {
        className: "settings-section",
        children: [
          r.jsx("h2", { children: "Scoring Configuration" }),
          r.jsxs("div", {
            className: "scoring-table",
            children: [
              r.jsx("h3", {
                children: "When WAZIR correctly identifies CHOR:",
              }),
              r.jsx("div", {
                className: "scoring-grid",
                children: ["BADSHA", "WAZIR", "CHOR", "SIPAHI"].map((q) =>
                  r.jsxs(
                    "div",
                    {
                      className: "scoring-item",
                      children: [
                        r.jsx("label", { children: q }),
                        r.jsx("input", {
                          type: "number",
                          value: N.wazirCorrect[q],
                          onChange: (dl) =>
                            J("wazirCorrect", q, dl.target.value),
                        }),
                      ],
                    },
                    q,
                  ),
                ),
              }),
            ],
          }),
          r.jsxs("div", {
            className: "scoring-table",
            children: [
              r.jsx("h3", { children: "When WAZIR fails (CHOR escapes):" }),
              r.jsx("div", {
                className: "scoring-grid",
                children: ["BADSHA", "WAZIR", "CHOR", "SIPAHI"].map((q) =>
                  r.jsxs(
                    "div",
                    {
                      className: "scoring-item",
                      children: [
                        r.jsx("label", { children: q }),
                        r.jsx("input", {
                          type: "number",
                          value: N.wazirWrong[q],
                          onChange: (dl) => J("wazirWrong", q, dl.target.value),
                        }),
                      ],
                    },
                    q,
                  ),
                ),
              }),
            ],
          }),
          r.jsx("button", {
            className: "reset-button",
            onClick: H,
            children: "Reset to Defaults",
          }),
        ],
      }),
      r.jsxs("section", {
        className: "settings-section",
        children: [
          r.jsx("h2", { children: "Export/Import Scoreboard" }),
          r.jsxs("div", {
            className: "export-section",
            children: [
              r.jsx("h3", { children: "Export" }),
              r.jsx("p", {
                children:
                  "Export current room scoreboard to save or share with others for reconciliation.",
              }),
              g &&
                r.jsxs("p", {
                  className: "current-room",
                  children: [
                    "Current room: ",
                    r.jsx("strong", { children: g }),
                  ],
                }),
              r.jsx("button", {
                className: "export-button",
                onClick: W,
                children: "Export Scoreboard",
              }),
              L &&
                r.jsxs("div", {
                  className: "export-result",
                  children: [
                    r.jsx("textarea", { readOnly: !0, value: L, rows: 6 }),
                    r.jsx("button", {
                      className: "copy-button",
                      onClick: El,
                      children: "Copy to Clipboard",
                    }),
                  ],
                }),
            ],
          }),
          r.jsxs("div", {
            className: "import-section",
            children: [
              r.jsx("h3", { children: "Import" }),
              r.jsx("p", {
                children:
                  "Paste previously exported scoreboard JSON to restore scores.",
              }),
              r.jsx("textarea", {
                placeholder: "Paste scoreboard JSON here...",
                value: C,
                onChange: (q) => X(q.target.value),
                rows: 6,
              }),
              r.jsx("button", {
                className: "import-button",
                onClick: tl,
                children: "Import Scoreboard",
              }),
            ],
          }),
        ],
      }),
      r.jsxs("section", {
        className: "settings-section privacy-section",
        children: [
          r.jsx("h2", { children: "Privacy Notice" }),
          r.jsx("p", {
            children:
              "This app is front-end only. All data is stored locally on your device. No information is sent to any server.",
          }),
          r.jsxs("p", {
            children: [
              r.jsx("strong", {
                children: "Secrets rely on keeping your playerNumber private.",
              }),
              " Anyone who enters another player's private number can reveal their role on their device.",
            ],
          }),
          r.jsx("p", {
            children:
              "Recommend physical private assignment of playerNumbers or single-use printed number slips.",
          }),
        ],
      }),
    ],
  });
}
function Gy() {
  const [g, O] = ol.useState("lobby"),
    [N, d] = ol.useState(null),
    C = (D) => {
      (d(D), O("game"));
    },
    X = () => {
      (O("lobby"), d(null));
    },
    L = () => {
      O("settings");
    },
    ll = () => {
      O(N ? "game" : "lobby");
    };
  return r.jsxs("div", {
    className: "app",
    children: [
      g !== "settings" &&
        r.jsx("button", {
          className: "settings-toggle",
          onClick: L,
          children: "⚙️ Settings",
        }),
      g === "lobby" && r.jsx(Ny, { onJoinRoom: C }),
      g === "game" &&
        N &&
        r.jsx(qy, {
          roomCode: N.roomCode,
          playerNumber: N.playerNumber,
          numPlayers: N.numPlayers,
          roundNumber: N.roundNumber,
          displayName: N.displayName,
          onLeave: X,
        }),
      g === "settings" && r.jsx(Yy, { roomCode: N?.roomCode, onBack: ll }),
    ],
  });
}
Ey.createRoot(document.getElementById("root")).render(
  r.jsx(ol.StrictMode, { children: r.jsx(Gy, {}) }),
);

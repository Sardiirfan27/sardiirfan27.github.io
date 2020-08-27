/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
!(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (I) {
  return (
    (function () {
      I.ui = I.ui || {};
      var n,
        H,
        x = Math.max,
        T = Math.abs,
        L = Math.round,
        o = /left|center|right/,
        l = /top|center|bottom/,
        f = /[\+\-]\d+(\.[\d]+)?%?/,
        s = /^\w+/,
        h = /%$/,
        i = I.fn.position;
      function P(t, i, e) {
        return [
          parseFloat(t[0]) * (h.test(t[0]) ? i / 100 : 1),
          parseFloat(t[1]) * (h.test(t[1]) ? e / 100 : 1),
        ];
      }
      function D(t, i) {
        return parseInt(I.css(t, i), 10) || 0;
      }
      (I.position = {
        scrollbarWidth: function () {
          if (void 0 !== n) return n;
          var t,
            i,
            e = I(
              "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
            ),
            o = e.children()[0];
          return (
            I("body").append(e),
            (t = o.offsetWidth),
            e.css("overflow", "scroll"),
            t === (i = o.offsetWidth) && (i = e[0].clientWidth),
            e.remove(),
            (n = t - i)
          );
        },
        getScrollInfo: function (t) {
          var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
            e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
            o =
              "scroll" === i ||
              ("auto" === i && t.width < t.element[0].scrollWidth);
          return {
            width:
              "scroll" === e ||
              ("auto" === e && t.height < t.element[0].scrollHeight)
                ? I.position.scrollbarWidth()
                : 0,
            height: o ? I.position.scrollbarWidth() : 0,
          };
        },
        getWithinInfo: function (t) {
          var i = I(t || window),
            e = I.isWindow(i[0]),
            o = !!i[0] && 9 === i[0].nodeType;
          return {
            element: i,
            isWindow: e,
            isDocument: o,
            offset: i.offset() || { left: 0, top: 0 },
            scrollLeft: i.scrollLeft(),
            scrollTop: i.scrollTop(),
            width: e || o ? i.width() : i.outerWidth(),
            height: e || o ? i.height() : i.outerHeight(),
          };
        },
      }),
        (I.fn.position = function (c) {
          if (!c || !c.of) return i.apply(this, arguments);
          c = I.extend({}, c);
          var d,
            a,
            g,
            u,
            m,
            t,
            w = I(c.of),
            W = I.position.getWithinInfo(c.within),
            v = I.position.getScrollInfo(W),
            y = (c.collision || "flip").split(" "),
            b = {};
          return (
            (t = (function (t) {
              var i = t[0];
              return 9 === i.nodeType
                ? {
                    width: t.width(),
                    height: t.height(),
                    offset: { top: 0, left: 0 },
                  }
                : I.isWindow(i)
                ? {
                    width: t.width(),
                    height: t.height(),
                    offset: { top: t.scrollTop(), left: t.scrollLeft() },
                  }
                : i.preventDefault
                ? {
                    width: 0,
                    height: 0,
                    offset: { top: i.pageY, left: i.pageX },
                  }
                : {
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    offset: t.offset(),
                  };
            })(w)),
            w[0].preventDefault && (c.at = "left top"),
            (a = t.width),
            (g = t.height),
            (u = t.offset),
            (m = I.extend({}, u)),
            I.each(["my", "at"], function () {
              var t,
                i,
                e = (c[this] || "").split(" ");
              1 === e.length &&
                (e = o.test(e[0])
                  ? e.concat(["center"])
                  : l.test(e[0])
                  ? ["center"].concat(e)
                  : ["center", "center"]),
                (e[0] = o.test(e[0]) ? e[0] : "center"),
                (e[1] = l.test(e[1]) ? e[1] : "center"),
                (t = f.exec(e[0])),
                (i = f.exec(e[1])),
                (b[this] = [t ? t[0] : 0, i ? i[0] : 0]),
                (c[this] = [s.exec(e[0])[0], s.exec(e[1])[0]]);
            }),
            1 === y.length && (y[1] = y[0]),
            "right" === c.at[0]
              ? (m.left += a)
              : "center" === c.at[0] && (m.left += a / 2),
            "bottom" === c.at[1]
              ? (m.top += g)
              : "center" === c.at[1] && (m.top += g / 2),
            (d = P(b.at, a, g)),
            (m.left += d[0]),
            (m.top += d[1]),
            this.each(function () {
              var e,
                t,
                f = I(this),
                s = f.outerWidth(),
                h = f.outerHeight(),
                i = D(this, "marginLeft"),
                o = D(this, "marginTop"),
                n = s + i + D(this, "marginRight") + v.width,
                l = h + o + D(this, "marginBottom") + v.height,
                r = I.extend({}, m),
                p = P(b.my, f.outerWidth(), f.outerHeight());
              "right" === c.my[0]
                ? (r.left -= s)
                : "center" === c.my[0] && (r.left -= s / 2),
                "bottom" === c.my[1]
                  ? (r.top -= h)
                  : "center" === c.my[1] && (r.top -= h / 2),
                (r.left += p[0]),
                (r.top += p[1]),
                H || ((r.left = L(r.left)), (r.top = L(r.top))),
                (e = { marginLeft: i, marginTop: o }),
                I.each(["left", "top"], function (t, i) {
                  I.ui.position[y[t]] &&
                    I.ui.position[y[t]][i](r, {
                      targetWidth: a,
                      targetHeight: g,
                      elemWidth: s,
                      elemHeight: h,
                      collisionPosition: e,
                      collisionWidth: n,
                      collisionHeight: l,
                      offset: [d[0] + p[0], d[1] + p[1]],
                      my: c.my,
                      at: c.at,
                      within: W,
                      elem: f,
                    });
                }),
                c.using &&
                  (t = function (t) {
                    var i = u.left - r.left,
                      e = i + a - s,
                      o = u.top - r.top,
                      n = o + g - h,
                      l = {
                        target: {
                          element: w,
                          left: u.left,
                          top: u.top,
                          width: a,
                          height: g,
                        },
                        element: {
                          element: f,
                          left: r.left,
                          top: r.top,
                          width: s,
                          height: h,
                        },
                        horizontal: e < 0 ? "left" : 0 < i ? "right" : "center",
                        vertical: n < 0 ? "top" : 0 < o ? "bottom" : "middle",
                      };
                    a < s && T(i + e) < a && (l.horizontal = "center"),
                      g < h && T(o + n) < g && (l.vertical = "middle"),
                      x(T(i), T(e)) > x(T(o), T(n))
                        ? (l.important = "horizontal")
                        : (l.important = "vertical"),
                      c.using.call(this, t, l);
                  }),
                f.offset(I.extend(r, { using: t }));
            })
          );
        }),
        (I.ui.position = {
          fit: {
            left: function (t, i) {
              var e,
                o = i.within,
                n = o.isWindow ? o.scrollLeft : o.offset.left,
                l = o.width,
                f = t.left - i.collisionPosition.marginLeft,
                s = n - f,
                h = f + i.collisionWidth - l - n;
              i.collisionWidth > l
                ? 0 < s && h <= 0
                  ? ((e = t.left + s + i.collisionWidth - l - n),
                    (t.left += s - e))
                  : (t.left =
                      0 < h && s <= 0
                        ? n
                        : h < s
                        ? n + l - i.collisionWidth
                        : n)
                : 0 < s
                ? (t.left += s)
                : 0 < h
                ? (t.left -= h)
                : (t.left = x(t.left - f, t.left));
            },
            top: function (t, i) {
              var e,
                o = i.within,
                n = o.isWindow ? o.scrollTop : o.offset.top,
                l = i.within.height,
                f = t.top - i.collisionPosition.marginTop,
                s = n - f,
                h = f + i.collisionHeight - l - n;
              i.collisionHeight > l
                ? 0 < s && h <= 0
                  ? ((e = t.top + s + i.collisionHeight - l - n),
                    (t.top += s - e))
                  : (t.top =
                      0 < h && s <= 0
                        ? n
                        : h < s
                        ? n + l - i.collisionHeight
                        : n)
                : 0 < s
                ? (t.top += s)
                : 0 < h
                ? (t.top -= h)
                : (t.top = x(t.top - f, t.top));
            },
          },
          flip: {
            left: function (t, i) {
              var e,
                o,
                n = i.within,
                l = n.offset.left + n.scrollLeft,
                f = n.width,
                s = n.isWindow ? n.scrollLeft : n.offset.left,
                h = t.left - i.collisionPosition.marginLeft,
                r = h - s,
                p = h + i.collisionWidth - f - s,
                c =
                  "left" === i.my[0]
                    ? -i.elemWidth
                    : "right" === i.my[0]
                    ? i.elemWidth
                    : 0,
                d =
                  "left" === i.at[0]
                    ? i.targetWidth
                    : "right" === i.at[0]
                    ? -i.targetWidth
                    : 0,
                a = -2 * i.offset[0];
              r < 0
                ? ((e = t.left + c + d + a + i.collisionWidth - f - l) < 0 ||
                    e < T(r)) &&
                  (t.left += c + d + a)
                : 0 < p &&
                  (0 <
                    (o =
                      t.left -
                      i.collisionPosition.marginLeft +
                      c +
                      d +
                      a -
                      s) ||
                    T(o) < p) &&
                  (t.left += c + d + a);
            },
            top: function (t, i) {
              var e,
                o,
                n = i.within,
                l = n.offset.top + n.scrollTop,
                f = n.height,
                s = n.isWindow ? n.scrollTop : n.offset.top,
                h = t.top - i.collisionPosition.marginTop,
                r = h - s,
                p = h + i.collisionHeight - f - s,
                c =
                  "top" === i.my[1]
                    ? -i.elemHeight
                    : "bottom" === i.my[1]
                    ? i.elemHeight
                    : 0,
                d =
                  "top" === i.at[1]
                    ? i.targetHeight
                    : "bottom" === i.at[1]
                    ? -i.targetHeight
                    : 0,
                a = -2 * i.offset[1];
              r < 0
                ? ((o = t.top + c + d + a + i.collisionHeight - f - l) < 0 ||
                    o < T(r)) &&
                  (t.top += c + d + a)
                : 0 < p &&
                  (0 <
                    (e =
                      t.top - i.collisionPosition.marginTop + c + d + a - s) ||
                    T(e) < p) &&
                  (t.top += c + d + a);
            },
          },
          flipfit: {
            left: function () {
              I.ui.position.flip.left.apply(this, arguments),
                I.ui.position.fit.left.apply(this, arguments);
            },
            top: function () {
              I.ui.position.flip.top.apply(this, arguments),
                I.ui.position.fit.top.apply(this, arguments);
            },
          },
        }),
        (function () {
          var t,
            i,
            e,
            o,
            n,
            l = document.getElementsByTagName("body")[0],
            f = document.createElement("div");
          for (n in ((t = document.createElement(l ? "div" : "body")),
          (e = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none",
          }),
          l &&
            I.extend(e, {
              position: "absolute",
              left: "-1000px",
              top: "-1000px",
            }),
          e))
            t.style[n] = e[n];
          t.appendChild(f),
            (i = l || document.documentElement).insertBefore(t, i.firstChild),
            (f.style.cssText = "position: absolute; left: 10.7432222px;"),
            (o = I(f).offset().left),
            (H = 10 < o && o < 11),
            (t.innerHTML = ""),
            i.removeChild(t);
        })();
    })(),
    I.ui.position
  );
});

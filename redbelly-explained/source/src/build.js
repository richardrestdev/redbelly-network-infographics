/*
  Redbelly Explained: page builder.

  RX.build(topic, format) writes one infographic into #canvas. The words come
  from topics.js, the drawings from icons.js and the look from series.css.
  After fonts and layout settle, connector lines are measured and drawn, then
  window.RX_READY is set so the renderer knows the frame is final.
*/
(function () {
  "use strict";
  var RX = window.RX;

  /* ---------- small helpers ---------- */

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function ico(name, cls) {
    return '<svg class="ico' + (cls ? " " + cls : "") + '" viewBox="0 0 48 48" aria-hidden="true">' + (RX.icons[name] || "") + "</svg>";
  }
  function tile(name, cls) { return '<span class="tile' + (cls ? " " + cls : "") + '">' + ico(name) + "</span>"; }
  function arrow(cls) {
    return '<span class="arrow' + (cls ? " " + cls : "") + '" aria-hidden="true"><svg viewBox="0 0 40 24"><path d="M2 12h32"/><path d="M25 4l9 8-9 8"/></svg></span>';
  }
  function note(text, icon) {
    return '<p class="note">' + ico(icon || "proof") + "<span>" + esc(text) + "</span></p>";
  }
  function chip(c) {
    return '<li class="chip">' + tile(c.icon, "sm") + '<p class="txt"><b>' + esc(c.title) + ".</b> " + esc(c.text) + "</p></li>";
  }
  function head3(title, text) {
    return "<h3>" + esc(title) + "</h3>" + (text ? "<p>" + esc(text) + "</p>" : "");
  }

  /* ---------- frame: background, header, intro, footer ---------- */

  var SIZE = { landscape: [1280, 720], portrait: [1080, 1350], square: [1080, 1080] };

  /* Two soft tonal glows and a quiet dot grid, drawn in SVG so the same
     background survives the PNG render and the SVG export. */
  function background(fmt) {
    var w = SIZE[fmt][0], h = SIZE[fmt][1];
    return '<svg class="bg" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" aria-hidden="true"><defs>' +
      '<radialGradient id="glow-a" cx="0.88" cy="0" r="1" gradientTransform="matrix(0.7 0 0 0.55 0.264 0)">' +
        '<stop offset="0" stop-color="#1d3140" stop-opacity="0.62"/><stop offset="0.7" stop-color="#1d3140" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="glow-b" cx="0" cy="1" r="1" gradientTransform="matrix(0.45 0 0 0.4 0 0.6)">' +
        '<stop offset="0" stop-color="#17222a" stop-opacity="0.8"/><stop offset="0.7" stop-color="#17222a" stop-opacity="0"/></radialGradient>' +
      '<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="1.45" fill="#8fa1ad" fill-opacity="0.075"/></pattern>' +
      '</defs><rect width="' + w + '" height="' + h + '" fill="#0c1317"/>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#glow-a)"/><rect width="' + w + '" height="' + h + '" fill="url(#glow-b)"/>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#dots)"/></svg>';
  }

  function header(t) {
    var segs = RX.topics.map(function (x) { return "<i" + (x.n === t.n ? ' class="on"' : "") + "></i>"; }).join("");
    return '<header class="hd">' +
      '<div class="rail" aria-hidden="true">' + segs + "</div>" +
      '<div class="hd-row"><span class="series">Redbelly explained <span class="count"><b>' + pad2(t.n) + "</b>/" + pad2(RX.topics.length) + "</span></span>" +
      '<span class="ver"><span class="k">Verified</span> <span class="mono">' + esc(RX.verified) + "</span></span></div>" +
      "</header>";
  }

  function intro(t) {
    var kicker = t.kicker ? '<p class="kicker">' + esc(t.kicker) + "</p>" : "";
    return '<div class="intro"><div class="head"><h1 class="title">' + esc(t.title) + "</h1>" + kicker + '</div><p class="lead">' + esc(t.lead) + "</p></div>";
  }

  function footer(t) {
    return '<footer class="ft"><p class="ft-src"><span class="k">Sources</span> ' + t.foot.map(esc).join(' <span class="sep">/</span> ') + "</p>" +
      '<img class="logo" src="brand/dao-logo-on-dark-600.png" alt="Redbelly DAO"></footer>';
  }

  /* ---------- visuals, one per diagram type ---------- */

  function hexPath(w, h, inset) {
    var i = inset || 0, cx = w / 2, cy = h / 2, r = h / 2 - i, k = Math.sqrt(3) / 2;
    var pts = [[cx, cy - r], [cx + r * k, cy - r / 2], [cx + r * k, cy + r / 2], [cx, cy + r], [cx - r * k, cy + r / 2], [cx - r * k, cy - r / 2]];
    return "M" + pts.map(function (p) { return p[0].toFixed(1) + " " + p[1].toFixed(1); }).join("L") + "Z";
  }

  var V = {};

  V.hub = function (v) {
    var items = v.items.map(function (it) {
      return '<li class="hub-item">' + tile(it.icon) + '<div class="txt">' + head3(it.title, it.text) + "</div></li>";
    }).join("");
    return '<div class="hub">' +
      '<div class="hub-core"><svg class="hexsvg" viewBox="0 0 220 254" aria-hidden="true">' +
        '<path class="hex-o" d="' + hexPath(220, 254, 3) + '"/><path class="hex-i" d="' + hexPath(220, 254, 17) + '"/></svg>' +
        '<div class="core-txt">' + (v.core.kicker ? '<span class="core-k">' + esc(v.core.kicker) + "</span>" : "") + "<strong>" + esc(v.core.name) + "</strong>" +
        (v.core.sub ? '<span class="core-s">' + esc(v.core.sub) + "</span>" : "") + "</div></div>" +
      '<ul class="hub-list">' + items + "</ul>" +
      '<svg class="wires" aria-hidden="true"></svg></div>' + note(v.note, "bank");
  };

  V.compare = function (v) {
    var cells = '<div class="cmp-bg" aria-hidden="true"></div>' +
      '<div class="cmp-h c1">' + esc(v.left) + '</div><div class="cmp-h c3">' + esc(v.right) + "</div>" +
      (v.needs ? '<div class="cmp-h c4">' + esc(v.needs) + "</div>" : "");
    v.rows.forEach(function (r, i) {
      var row = "grid-row:" + (i + 2);
      cells += '<div class="cmp-b" style="' + row + '"><span class="cmp-lbl">' + ico(r.icon) + esc(r.label) + "</span><span>" + esc(r.before) + "</span></div>" +
        '<div class="cmp-x" style="' + row + '">' + arrow() + "</div>" +
        '<div class="cmp-a" style="' + row + '"><span>' + esc(r.after) + "</span></div>" +
        (r.needs ? '<div class="cmp-n" style="' + row + '"><span>' + esc(r.needs) + "</span></div>" : "");
    });
    return '<div class="cmp' + (v.needs ? " has-needs" : "") + '" style="grid-template-rows:auto repeat(' + v.rows.length + ',auto)">' + cells + "</div>";
  };

  /* The two consensus drawings are built from simple shapes in a 400 x 230 box. */
  function dbftArt(kind) {
    var s = '<svg class="dbft-art" viewBox="0 0 400 230" aria-hidden="true">';
    var xs = [62, 154, 246, 338];
    // existing chain on the top row
    s += '<g class="chain">';
    [24, 92].forEach(function (x) { s += '<rect x="' + x + '" y="18" width="52" height="40" rx="7"/>'; });
    s += '<path d="M76 38h16M144 38h16"/></g>';
    if (kind === "old") {
      s += '<rect class="slot" x="160" y="18" width="52" height="40" rx="7"/>';
      xs.forEach(function (x, i) {
        var win = i === 1;
        s += '<g class="' + (win ? "win" : "lose") + '">' +
          '<rect x="' + (x - 26) + '" y="104" width="52" height="40" rx="7"/>' +
          '<circle cx="' + x + '" cy="196" r="15"/><path d="M' + x + ' 181v-37"/>';
        if (win) s += '<path class="up" d="M' + x + ' 104C' + x + ' 84 186 84 186 62"/><path class="up" d="M178 70l8-9 8 9"/>';
        else s += '<path class="x" d="M' + (x - 10) + ' 114l20 20M' + (x + 10) + ' 114l-20 20"/>';
        s += "</g>";
      });
    } else {
      s += '<g class="super"><rect x="160" y="14" width="216" height="48" rx="8"/>' +
        '<path d="M214 14v48M268 14v48M322 14v48"/></g>';
      xs.forEach(function (x, i) {
        var tx = 187 + i * 54;
        s += '<g class="coop"><rect x="' + (x - 22) + '" y="108" width="44" height="32" rx="6"/>' +
          '<circle cx="' + x + '" cy="196" r="15"/><path d="M' + x + ' 181v-41"/>' +
          '<path class="up" d="M' + x + ' 108C' + x + ' 86 ' + tx + ' 90 ' + tx + ' 66"/></g>';
      });
      s += '<g class="tick"><circle cx="376" cy="14" r="15"/><path d="M369 14l5 5 9-10"/></g>';
    }
    s += '<path class="ground" d="M20 222h360"/></svg>';
    return s;
  }

  V.dbft = function (v) {
    function panel(p, kind) {
      return '<figure class="panel panel-' + kind + '"><span class="panel-k">' + esc(p.label) + "</span>" + dbftArt(kind) +
        "<figcaption>" + head3(p.title, p.text) + "</figcaption></figure>";
    }
    var chips = v.chips.map(chip).join("");
    return '<div class="dbft"><div class="panels">' + panel(v.old, "old") + panel(v.dbft, "new") + "</div>" +
      '<ul class="chips">' + chips + "</ul></div>";
  };

  V.jobs = function (v) {
    var parts = [];
    v.items.forEach(function (it, i) {
      if (i) parts.push(arrow("step-arrow"));
      parts.push('<div class="job"><div class="job-top">' + tile(it.icon) + '<span class="num">' + pad2(i + 1) + "</span></div>" +
        '<div class="txt">' + head3(it.title, it.text) + "</div></div>");
    });
    return '<div class="jobs"><div class="job-row">' + parts.join("") + "</div></div>" + note(v.note, "idbadge");
  };

  V.triangle = function (v) {
    function node(key) {
      var r = v.roles[key];
      return '<div class="tri-node tri-' + key + '"><span class="disc">' + ico(r.icon) + "</span>" +
        '<div class="txt">' + head3(r.name, r.text) + "</div></div>";
    }
    function lbl(key, n, text, cls) {
      return '<span class="edge-lbl' + (cls ? " " + cls : "") + '" data-edge="' + key + '"><i>' + n + "</i>" + esc(text) + "</span>";
    }
    return '<div class="tri">' + node("issuer") + node("holder") + node("verifier") +
      '<svg class="wires" aria-hidden="true"></svg>' +
      lbl("issue", 1, v.edges.issue) + lbl("share", 2, v.edges.share) + lbl("trust", 3, v.edges.trust, "dashed") +
      "</div>" + note(v.note, "ledger");
  };

  /* six dots standing in for a hidden value */
  var MASK = '<svg class="mask" viewBox="0 0 96 12" preserveAspectRatio="xMinYMid meet" aria-hidden="true">' +
    [6, 22, 38, 54, 70, 86].map(function (x) { return '<circle cx="' + x + '" cy="6" r="4"/>'; }).join("") + "</svg>";

  V.zk = function (v) {
    var arts = [
      '<div class="zk-art art-ask"><span class="bubble">' + esc(v.ask) + '<svg class="tail" viewBox="0 0 26 15" aria-hidden="true"><path d="M1 0L8 14L22 0"/></svg></span></div>',
      '<div class="zk-art art-prove"><div class="vc"><span class="vc-h">' + esc(v.card.title) + "</span>" +
        v.card.rows.map(function (r) { return '<span class="vc-row"><em>' + esc(r) + "</em>" + MASK + ico("lock") + "</span>"; }).join("") +
        "</div></div>",
      '<div class="zk-art art-check">' + ico("contract", "big") + '<span class="result"><b>' + esc(v.result) + "</b></span></div>"
    ];
    var parts = [];
    v.steps.forEach(function (st, i) {
      if (i) parts.push(arrow("step-arrow"));
      parts.push('<div class="zk-step">' + arts[i] + '<div class="txt"><span class="num">' + pad2(i + 1) + "</span>" + head3(st.title, st.text) + "</div></div>");
    });
    var cmp = v.compare.map(function (c, i) {
      return '<div class="zk-c' + (i ? " hot" : "") + '"><span class="mono">' + esc(c.title) + "</span><p>" + esc(c.text) + "</p></div>";
    }).join("");
    return '<div class="zk"><div class="zk-row">' + parts.join("") + '</div><div class="zk-cmp">' + cmp + "</div></div>";
  };

  V.stack = function (v) {
    var layers = v.layers.map(function (l) {
      return '<div class="layer' + (l.hot ? " hot" : "") + '">' + tile(l.icon, "sm") + '<div class="layer-tag"><span class="mono">' + esc(l.tag) + "</span><b>" + esc(l.name) + "</b></div>" +
        "<p>" + esc(l.text) + "</p></div>";
    }).join("");
    return '<div class="stack">' + layers + "</div>" + note(v.note, "checklist");
  };

  V.gate = function (v) {
    var rules = v.token.rules.map(function (r, i) { return '<li><span class="rn">' + (i + 1) + "</span>" + esc(r) + "</li>"; }).join("");
    var chips = v.chips.map(chip).join("");
    return '<div class="gatev"><div class="gv">' +
      '<div class="gv-token"><div class="gv-th">' + ico("token") + "<b>" + esc(v.token.name) + "</b></div>" +
      '<span class="gv-k">' + esc(v.token.caption) + '</span><ul class="gv-rules">' + rules + "</ul></div>" +
      '<div class="gv-out">' +
        '<div class="gv-res ok"><span class="badge">' + ico("check") + '</span><div class="txt">' + head3(v.pass.title, v.pass.text) + "</div></div>" +
        '<div class="gv-res no"><span class="badge">' + ico("cross") + '</span><div class="txt">' + head3(v.fail.title, v.fail.text) + "</div></div>" +
      "</div>" +
      '<svg class="wires" aria-hidden="true"></svg></div>' +
      '<ul class="chips">' + chips + "</ul></div>";
  };

  V.lanes = function (v) {
    var lanes = v.lanes.map(function (lane, li) {
      var rows = lane.steps.map(function (st) {
        return '<li class="ls">' + tile(st.icon, "sm") + '<p class="txt"><b>' + esc(st.title) + ".</b> " + esc(st.text) + "</p></li>";
      }).join("");
      return '<div class="lane lane-' + (li ? "nodes" : "people") + '"><span class="lane-k">' + esc(lane.label) + "</span>" +
        '<ol class="lane-steps">' + rows + "</ol></div>";
    }).join("");
    return '<div class="lanes">' + lanes + "</div>" + (v.note ? note(v.note, "eyeoff") : "");
  };

  V.governance = function (v) {
    var parts = [];
    v.steps.forEach(function (st, i) {
      if (i) parts.push(arrow("step-arrow"));
      parts.push('<div class="gs"><div class="gs-top">' + tile(st.icon, "sm") + '<span class="num">' + pad2(i + 1) + "</span></div>" +
        '<div class="txt">' + head3(st.title, st.text) + "</div></div>");
    });
    var status = v.status.map(function (s) {
      return '<li><span class="st-k"><i class="dot ' + s.dot + '"></i>' + esc(s.label) + "</span><b>" + esc(s.text) + "</b></li>";
    }).join("");
    return '<div class="gov"><div class="gov-steps">' + parts.join("") + "</div>" +
      '<ul class="gov-status">' + status + "</ul></div>" + note(v.note, "ballot");
  };

  V.acacia = function (v) {
    var stats = v.stats.map(function (s) {
      return '<div class="stat"><div class="fig">' + (s.pre ? '<span class="pre">' + esc(s.pre) + "</span>" : "") +
        '<b class="big">' + esc(s.big) + "</b></div><p>" + esc(s.text) + "</p></div>";
    }).join("");
    var time = v.timeline.map(function (e) {
      return '<li><i class="tl-dot" aria-hidden="true"></i><span class="mono">' + esc(e.when) + "</span><span>" + esc(e.what) + "</span></li>";
    }).join("");
    return '<div class="aca-stats">' + stats + '</div><ol class="aca-time"><i class="tl-line" aria-hidden="true"></i>' + time + "</ol>";
  };

  /* ---------- connectors, drawn after layout ---------- */

  function box(el, origin) {
    var r = el.getBoundingClientRect();
    return { l: r.left - origin.left, t: r.top - origin.top, r: r.right - origin.left, b: r.bottom - origin.top,
      cx: (r.left + r.right) / 2 - origin.left, cy: (r.top + r.bottom) / 2 - origin.top, w: r.width, h: r.height };
  }
  function prepWires(svg) {
    var host = svg.parentNode, o = host.getBoundingClientRect();
    svg.setAttribute("viewBox", "0 0 " + o.width.toFixed(1) + " " + o.height.toFixed(1));
    svg.setAttribute("width", o.width.toFixed(1));
    svg.setAttribute("height", o.height.toFixed(1));
    svg.innerHTML = "";
    return o;
  }
  function add(svg, tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    svg.appendChild(el);
    return el;
  }
  function arrowHead(svg, x, y, ang, size, cls) {
    var a1 = ang + Math.PI * 0.82, a2 = ang - Math.PI * 0.82;
    var d = "M" + (x + Math.cos(a1) * size).toFixed(1) + " " + (y + Math.sin(a1) * size).toFixed(1) +
      "L" + x.toFixed(1) + " " + y.toFixed(1) +
      "L" + (x + Math.cos(a2) * size).toFixed(1) + " " + (y + Math.sin(a2) * size).toFixed(1);
    add(svg, "path", { d: d, class: "head " + (cls || "") });
  }
  /* point on the circle edge of `b` facing (x, y) */
  function edgePoint(b, x, y, pad) {
    var ang = Math.atan2(y - b.cy, x - b.cx), r = Math.min(b.w, b.h) / 2 + (pad || 0);
    return { x: b.cx + Math.cos(ang) * r, y: b.cy + Math.sin(ang) * r };
  }

  var WIRES = {
    hub: function (root) {
      var svg = root.querySelector(".hub .wires"); if (!svg) return;
      var o = prepWires(svg);
      var core = box(root.querySelector(".hub-core .hexsvg"), o);
      var ends = {};
      root.querySelectorAll(".hub-item").forEach(function (item) {
        var b = box(item, o), left = b.cx < core.cx;
        // leave the hexagon from the side that faces the item
        var sx = left ? core.l + core.w * 0.075 : core.r - core.w * 0.075, sy = core.cy;
        var tx = left ? b.r : b.l, ty = b.cy, dx = (tx - sx) * 0.55;
        add(svg, "path", { class: "wire", d: "M" + sx.toFixed(1) + " " + sy.toFixed(1) + "C" + (sx + dx).toFixed(1) + " " + sy.toFixed(1) +
          " " + (tx - dx).toFixed(1) + " " + ty.toFixed(1) + " " + tx.toFixed(1) + " " + ty.toFixed(1) });
        add(svg, "circle", { cx: tx.toFixed(1), cy: ty.toFixed(1), r: 4.5, class: "pin" });
        ends[sx.toFixed(1)] = sx;
      });
      Object.keys(ends).forEach(function (k) { add(svg, "circle", { cx: k, cy: core.cy.toFixed(1), r: 6.5, class: "pin" }); });
    },

    triangle: function (root) {
      var svg = root.querySelector(".tri .wires"); if (!svg) return;
      var o = prepWires(svg);
      var disc = {};
      ["issuer", "holder", "verifier"].forEach(function (k) { disc[k] = box(root.querySelector(".tri-" + k + " .disc"), o); });
      var gap = 10;
      // on 16:9 the three roles stand in a row, so the check back to the issuer arcs over the holder
      var row = Math.abs(disc.issuer.cy - disc.holder.cy) < 4;
      [["issue", "issuer", "holder", ""], ["share", "holder", "verifier", ""], ["trust", "verifier", "issuer", "dash"]].forEach(function (e) {
        var A = disc[e[1]], B = disc[e[2]], lbl = root.querySelector('.edge-lbl[data-edge="' + e[0] + '"]'), mx, my;
        if (row && e[0] === "trust") {
          var p0 = { x: A.cx, y: A.t - gap }, p2 = { x: B.cx, y: B.t - gap };
          var c = { x: (p0.x + p2.x) / 2, y: Math.min(p0.y, p2.y) - 2 * (lbl.offsetHeight / 2 + 28) };
          add(svg, "path", { d: "M" + p0.x.toFixed(1) + " " + p0.y.toFixed(1) + "Q" + c.x.toFixed(1) + " " + c.y.toFixed(1) + " " + p2.x.toFixed(1) + " " + p2.y.toFixed(1), class: "wire " + e[3] });
          arrowHead(svg, p2.x, p2.y, Math.atan2(p2.y - c.y, p2.x - c.x), 13, e[3]);
          mx = 0.25 * p0.x + 0.5 * c.x + 0.25 * p2.x; my = 0.25 * p0.y + 0.5 * c.y + 0.25 * p2.y;
        } else {
          var p = edgePoint(A, B.cx, B.cy, gap), q = edgePoint(B, A.cx, A.cy, gap);
          add(svg, "path", { d: "M" + p.x.toFixed(1) + " " + p.y.toFixed(1) + "L" + q.x.toFixed(1) + " " + q.y.toFixed(1), class: "wire " + e[3] });
          arrowHead(svg, q.x, q.y, Math.atan2(q.y - p.y, q.x - p.x), 13, e[3]);
          mx = (p.x + q.x) / 2; my = (p.y + q.y) / 2;
        }
        lbl.style.left = (mx - lbl.offsetWidth / 2).toFixed(1) + "px";
        lbl.style.top = (my - lbl.offsetHeight / 2).toFixed(1) + "px";
      });
    },

    gate: function (root) {
      var svg = root.querySelector(".gv .wires"); if (!svg) return;
      var o = prepWires(svg);
      var tok = box(root.querySelector(".gv-token"), o);
      var vertical = root.querySelector(".gv").classList.contains("gv-col");
      root.querySelectorAll(".gv-res .badge").forEach(function (bd) {
        var b = box(bd, o), d, sx, sy, tx, ty, ang;
        if (vertical) {
          sx = tok.cx; sy = tok.b; tx = b.cx; ty = b.t - 8;
          var my = (sy + ty) / 2;
          d = "M" + sx + " " + sy + "C" + sx + " " + my + " " + tx + " " + my + " " + tx + " " + ty;
          ang = Math.PI / 2;
        } else {
          sx = tok.r; sy = tok.cy; tx = b.l - 8; ty = b.cy;
          var mx = (sx + tx) / 2;
          d = "M" + sx + " " + sy + "C" + mx + " " + sy + " " + mx + " " + ty + " " + tx + " " + ty;
          ang = 0;
        }
        var cls = bd.parentNode.classList.contains("ok") ? "okw" : "now";
        add(svg, "path", { d: d, class: "wire " + cls });
        arrowHead(svg, tx, ty, ang, 12, cls);
      });
      add(svg, "circle", vertical ? { cx: tok.cx, cy: tok.b, r: 6, class: "pin" } : { cx: tok.r, cy: tok.cy, r: 6, class: "pin" });
    }
  };

  /* ---------- assemble ---------- */

  RX.layoutOf = function (t, fmt) {
    var L = { hub: "band", compare: "band", dbft: "band", jobs: "split", triangle: "band", zk: "band",
      stack: "split", gate: "band", lanes: "split", governance: "split", acacia: "split" };
    return fmt === "landscape" ? L[t.visual.type] : "stack";
  };

  RX.build = function (t, fmt) {
    window.RX_READY = false;
    var c = document.getElementById("canvas");
    c.className = "canvas f-" + fmt + " v-" + t.visual.type + " t-" + t.slug;
    c.setAttribute("data-layout", RX.layoutOf(t, fmt));
    c.innerHTML = background(fmt) + header(t) + '<section class="main">' + intro(t) + '<div class="visual">' + V[t.visual.type](t.visual, fmt) + "</div></section>" + footer(t);
    var imgs = Array.prototype.slice.call(c.querySelectorAll("img"));
    return Promise.all([document.fonts.ready].concat(imgs.map(function (im) {
      return im.complete ? Promise.resolve() : new Promise(function (res) { im.onload = im.onerror = res; });
    }))).then(function () {
      return new Promise(function (res) { requestAnimationFrame(function () { requestAnimationFrame(res); }); });
    }).then(function () {
      var w = WIRES[t.visual.type];
      if (w) w(c);
      window.RX_READY = true;
    });
  };

  RX.find = function (key) {
    key = String(key || "1");
    return RX.topics.filter(function (t) { return String(t.n) === key || pad2(t.n) === key || t.slug === key; })[0] || RX.topics[0];
  };
})();

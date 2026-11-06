/* Second Wind Athletic Club: the mark, drawn once, used everywhere.
   Units: cap height = 100. Letters are upright bars (light weight). The symbol leans.
   window.SW.svg(variant, colour, opts) -> svg markup string with its own viewBox. */
(function () {
  var H = 100;
  function R(x, y, w, h) { return 'M' + x + ' ' + y + 'h' + w + 'v' + h + 'h' + (-w) + 'Z'; }
  function P(a) { return 'M' + a.map(function (p) { return p[0] + ' ' + p[1]; }).join('L') + 'Z'; }

  /* letterforms: contrast glyphs, tv = stem, th = bar, w = width */
  function glyph(ch, tv, th, w) {
    var mid = (H - th) / 2, d = '', adv = w, c = w * 0.28, ci = c * 0.5, Ww, u, dt;
    if (ch === 'S') d = R(0, 0, w, th) + R(0, 0, tv, mid + th) + R(0, mid, w, th) + R(w - tv, mid, tv, H - mid) + R(0, H - th, w, th);
    else if (ch === 'E') d = R(0, 0, tv, H) + R(0, 0, w, th) + R(0, mid, w * 0.86, th) + R(0, H - th, w, th);
    else if (ch === 'C') d = R(0, 0, tv, H) + R(0, 0, w, th) + R(0, H - th, w, th);
    else if (ch === 'O') d = R(0, 0, w, H) + 'M' + tv + ' ' + th + 'v' + (H - 2 * th) + 'h' + (w - 2 * tv) + 'v' + (-(H - 2 * th)) + 'Z';
    else if (ch === 'N') { dt = tv * 1.05; d = R(0, 0, tv, H) + R(w - tv, 0, tv, H) + P([[0, 0], [dt, 0], [w, H], [w - dt, H]]); }
    else if (ch === 'D') d = 'M0 0H' + (w - c) + 'L' + w + ' ' + c + 'V' + (H - c) + 'L' + (w - c) + ' ' + H + 'H0Z' + 'M' + tv + ' ' + th + 'V' + (H - th) + 'H' + (w - tv - ci) + 'L' + (w - tv) + ' ' + (H - th - ci) + 'V' + (th + ci) + 'L' + (w - tv - ci) + ' ' + th + 'Z';
    else if (ch === 'I') { d = R(0, 0, tv, H); adv = tv; }
    else if (ch === 'W') { Ww = w * 1.5; dt = tv * 0.95; u = (Ww - dt) / 4; adv = Ww;
      d = P([[0, 0], [dt, 0], [u + dt, H], [u, H]]) + P([[2 * u, 0], [2 * u + dt, 0], [u + dt, H], [u, H]]) + P([[2 * u, 0], [2 * u + dt, 0], [3 * u + dt, H], [3 * u, H]]) + P([[4 * u, 0], [4 * u + dt, 0], [3 * u + dt, H], [3 * u, H]]); }
    return { d: d, adv: adv };
  }
  function word(str, tv, th, w, g) {
    var x = 0, s = '', i, o;
    for (i = 0; i < str.length; i++) {
      var ch = str.charAt(i);
      if (ch === ' ') { x += g * 3; continue; }
      o = glyph(ch, tv, th, w);
      s += '<path transform="translate(' + x + ' 0)" d="' + o.d + '"/>';
      x += o.adv + g;
    }
    return { s: s, w: x - g };
  }

  /* the symbol: two strokes. first short, a gap, second longer. both lean 30 degrees. */
  var SYM = { lean: 16, t: 26, gap: 14, a: 80, b: 156, off: 40 };
  function symbolPath() {
    var s = SYM, y1 = 0, y2 = s.t + s.gap;
    return P([[s.lean, y1], [s.a + s.lean, y1], [s.a, y1 + s.t], [0, y1 + s.t]]).replace(/^M/, 'M') +
           P([[s.off + s.lean, y2], [s.off + s.b + s.lean, y2], [s.off + s.b, y2 + s.t], [s.off, y2 + s.t]]);
  }
  var SYM_W = SYM.off + SYM.b + SYM.lean, SYM_H = SYM.t * 2 + SYM.gap;

  /* wordmark */
  var TV = 9, TH = 9, WID = 56, GAP = 10;
  var WORD = word('SECOND WIND', TV, TH, WID, GAP);
  /* weights of the same grid: light is the identity; bold is for the gym floor and merch. lean echoes the symbol. */
  var WEIGHTS = { light: [TV, TH, WID, GAP], medium: [14, 13, 58, 9], bold: [20, 18, 62, 8] };
  var LEAN = 12;
  function wordFor(o) {
    var k = (o && o.weight) || 'light', p = WEIGHTS[k] || WEIGHTS.light, w = word('SECOND WIND', p[0], p[1], p[2], p[3]);
    if (o && o.lean) { var t = Math.tan((o.lean === true ? LEAN : o.lean) * Math.PI / 180) * H; w = { s: '<g transform="translate(' + t.toFixed(2) + ' 0) skewX(' + (-(o.lean === true ? LEAN : o.lean)) + ')">' + w.s + '</g>', w: w.w + t }; }
    return w;
  }
  var TAG = 'ATHLETIC CLUB';
  function tagText(x, y, w, size, fill) {
    return '<text class="tag" x="' + x + '" y="' + y + '" font-size="' + size + '" textLength="' + w + '" lengthAdjust="spacing" fill="' + fill + '" font-family="Barlow Semi Condensed, Arial Narrow, sans-serif" font-weight="600">' + TAG + '</text>';
  }

  function wrap(vb, inner, colour, opts) {
    opts = opts || {};
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" preserveAspectRatio="' + (opts.fit || 'xMidYMid meet') + '"' + (opts.attrs || '') + '><g fill="' + colour + '">' + inner + '</g></svg>';
  }

  var V = {
    /* primary: symbol left, wordmark right, tag under the wordmark */
    primary: function (c, o) {
      var sx = 0, sy = (H - SYM_H) / 2 + 2, gap = 40, wx = SYM_W + gap;
      var inner = '<path transform="translate(' + sx + ' ' + sy + ')" d="' + symbolPath() + '"/>' +
        '<g transform="translate(' + wx + ' 0)">' + WORD.s + '</g>' +
        tagText(wx, 132, WORD.w, 22, c);
      var W = wx + WORD.w;
      return wrap((-10) + ' -10 ' + (W + 20) + ' 156', inner, c, o);
    },
    /* lockup: symbol + name, no tag line. For signage, where the tag would be too small to read. */
    lockup: function (c, o) {
      var sy = (H - SYM_H) / 2 + 2, gap = 40, wx = SYM_W + gap;
      var inner = '<path transform="translate(0 ' + sy + ')" d="' + symbolPath() + '"/>' +
        '<g transform="translate(' + wx + ' 0)">' + WORD.s + '</g>';
      return wrap('-2 -2 ' + (wx + WORD.w + 4) + ' ' + (H + 4), inner, c, o);
    },
    /* stacked: symbol centred above wordmark */
    stacked: function (c, o) {
      var scale = 1.25, sw = SYM_W * scale, sx = (WORD.w - sw) / 2, top = 0, wy = SYM_H * scale + 56;
      var inner = '<path transform="translate(' + sx + ' ' + top + ') scale(' + scale + ')" d="' + symbolPath() + '"/>' +
        '<g transform="translate(0 ' + wy + ')">' + WORD.s + '</g>' +
        tagText(0, wy + 132, WORD.w, 22, c);
      return wrap('-10 -10 ' + (WORD.w + 20) + ' ' + (wy + 156), inner, c, o);
    },
    /* wordmark alone */
    wordmark: function (c, o) {
      var inner = WORD.s + tagText(0, 132, WORD.w, 22, c);
      return wrap('-10 -10 ' + (WORD.w + 20) + ' 156', inner, c, o);
    },
    /* wordmark without tag */
    name: function (c, o) {
      return wrap('-10 -10 ' + (WORD.w + 20) + ' 120', WORD.s, c, o);
    },
    /* symbol alone */
    symbol: function (c, o) {
      return wrap('-8 -8 ' + (SYM_W + 16) + ' ' + (SYM_H + 16), '<path d="' + symbolPath() + '"/>', c, o);
    },
    /* symbol in a square, centred, for icons */
    icon: function (c, o) {
      var s = 200, scale = 150 / SYM_W, w = SYM_W * scale, h = SYM_H * scale;
      return wrap('0 0 ' + s + ' ' + s, '<path transform="translate(' + ((s - w) / 2) + ' ' + ((s - h) / 2) + ') scale(' + scale + ')" d="' + symbolPath() + '"/>', c, o);
    },
    /* vertical for the glass: wordmark rotated, symbol at the top */
    vertical: function (c, o) {
      var inner = '<path transform="translate(0 0)" d="' + symbolPath() + '"/>' +
        '<g transform="translate(' + (SYM_H + 30 + H) + ' ' + (SYM_H + 40) + ') rotate(90)">' + WORD.s + '</g>';
      /* rotate(90) maps x->y, so height = WORD.w */
      return wrap('-10 -10 ' + (SYM_W + 20) + ' ' + (SYM_H + 40 + WORD.w + 20), inner, c, o);
    }
  };

  window.SW = {
    svg: function (variant, colour, opts) {
      if (opts && (opts.weight || opts.lean)) { var keep = WORD; WORD = wordFor(opts); try { return (V[variant] || V.primary)(colour || '#1e1c1a', opts); } finally { WORD = keep; } }
      return (V[variant] || V.primary)(colour || '#1e1c1a', opts);
    },
    WEIGHTS: WEIGHTS, wordFor: wordFor,
    glyph: glyph, word: word, symbolPath: symbolPath, SYM: SYM, SYM_W: SYM_W, SYM_H: SYM_H, WORD: WORD, H: H, TV: TV, TH: TH, WID: WID, GAP: GAP,
    fill: function (root) {
      root = root || document;
      Array.prototype.forEach.call(root.querySelectorAll('[data-sw]'), function (el) {
        var v = el.getAttribute('data-sw'), c = el.getAttribute('data-c') || '#1e1c1a', fit = el.getAttribute('data-fit') || 'xMidYMid meet';
        var colours = { ink: '#1e1c1a', bone: '#f3efe7', green: '#5f4535', copper: '#a2723f', stone: '#a39b8c', white: '#ffffff', tonal: 'rgba(0,0,0,.08)', tonalb: 'rgba(255,255,255,.1)' };
        var o = { fit: fit, attrs: ' style="width:100%;height:100%;display:block;overflow:visible"' };
        if (el.getAttribute('data-w')) o.weight = el.getAttribute('data-w'); if (el.hasAttribute('data-lean')) o.lean = true;
        el.innerHTML = window.SW.svg(v, colours[c] || c, o);
      });
    }
  };
})();

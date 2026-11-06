/* Second Wind: the logo family at four weights.
   Every candidate redrawn from the same bar letters as the chosen mark, so each one can be light, medium, bold or bold-leaning.
   window.SWF.svg(id, weight, colour) -> svg string. weights: light | medium | bold | lean (bold, leaning). ids: SWF.ids */
(function () {
  var H = 100;
  var W8 = { light: [9, 9, 56, 10], medium: [14, 13, 58, 9], bold: [20, 18, 62, 8], lean: [20, 18, 62, 8] };
  var TAGF = 'font-family="SWTag, Barlow Semi Condensed, Arial Narrow, sans-serif" font-weight="600"';
  var SERF = 'font-family="SWSerif, Cormorant Garamond, Georgia, serif" font-weight="400"';
  var SCRF = 'font-family="SWScript, Playball, cursive" font-weight="400"';
  function R(x, y, w, h) { return 'M' + x + ' ' + y + 'h' + w + 'v' + h + 'h' + (-w) + 'Z'; }
  function P(a) { return 'M' + a.map(function (p) { return p[0] + ' ' + p[1]; }).join('L') + 'Z'; }
  function tag(str, x, y, w, size) { return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" textLength="' + w + '" lengthAdjust="spacing" ' + TAGF + ' fill="currentColor">' + str + '</text>'; }
  function tagC(str, x, y, size, ls) { return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" letter-spacing="' + ls + '" text-anchor="middle" ' + TAGF + ' fill="currentColor">' + str + '</text>'; }
  function wd(str, p, g) { var w = SW.word(str, p[0], p[1], p[2], g === undefined ? p[3] : g); return w; }
  function sym(scale) { return '<path fill="currentColor" transform="scale(' + (scale || 1) + ')" d="' + SW.symbolPath() + '"/>'; }
  function lean(inner, deg) { var t = Math.tan(deg * Math.PI / 180) * H; return '<g transform="translate(' + t.toFixed(1) + ' 0) skewX(-' + deg + ')">' + inner + '</g>'; }
  function svg(vb, inner, c) { return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" color="' + c + '"><defs><style>' + (window.ALT && window.ALT.__fonts || '') + '</style></defs><g fill="' + c + '">' + inner.replace(/currentColor/g, c) + '</g></svg>'; }

  /* each drawer gets p = [stem, bar, width, gap] and k = weight name; returns {vb, inner} */
  var D = {
    /* the chosen mark */
    B5: function (p, k) {
      var w = wd('SECOND WIND', p), sy = (H - SW.SYM_H) / 2 + 2, wx = SW.SYM_W + 40;
      var word = '<g transform="translate(' + wx + ' 0)">' + w.s + '</g>';
      if (k === 'lean') word = lean(word, 12);
      return { vb: '-10 -10 ' + (wx + w.w + 20 + (k === 'lean' ? 22 : 0)) + ' 156', inner: '<g transform="translate(0 ' + sy + ')">' + sym() + '</g>' + word + tag('ATHLETIC CLUB', wx, 132, w.w, 22) };
    },
    /* the wing: SECOND light-ish, WIND heavier, a three-feather wing off the D. weight moves both words together */
    W1: function (p, k) {
      var ps = [Math.max(7, p[0] - 2), p[1], p[2], p[3]], pw = [p[0] + 8, p[1] + 6, p[2] + 6, p[3] - 2];
      var a = wd('SECOND', ps), b = wd('WIND', pw), bx = a.w + 6;
      var dx = b.w - (pw[2]);
      var wing = '<path fill="currentColor" d="' + P([[30, 2], [100, -24], [250, -70], [200, -12], [120, 14], [72, 26]]) + P([[62, 36], [130, 22], [222, -6], [178, 22], [118, 42], [78, 54]]) + P([[70, 60], [124, 48], [190, 24], [150, 48], [108, 64], [80, 72]]) + '"/>';
      var inner = a.s + '<g transform="translate(' + bx + ' 0)">' + b.s + '<g transform="translate(' + dx + ' 0)">' + wing + '</g></g>';
      inner = lean(inner, k === 'lean' ? 16 : 10);
      var total = bx + b.w + 190;
      return { vb: '-14 -80 ' + (total + 40 + (k === 'lean' ? 20 : 4)) + ' 250', inner: inner + '<text x="' + (a.w * 0.2) + '" y="152" font-size="52" ' + SCRF + ' fill="currentColor">Athletic Club</text>' };
    },
    /* heritage arch: arched name, SW monogram, rule, club line */
    B1: function (p, k) {
      var m = wd('SW', [p[0] + 3, p[1] + 3, 44 + (p[0] - 9), 8]); var ms = '<g transform="translate(' + (250 - m.w * 0.7) + ' 150) scale(1.4)">' + m.s + '</g>';
      if (k === 'lean') ms = lean(ms, 12);
      var fw = k === 'light' ? 500 : 700;
      return { vb: '30 -50 440 470', inner: '<defs><path id="fa1" d="M50 210 a200 200 0 0 1 400 0"/></defs><text font-size="40" letter-spacing="7" ' + TAGF.replace('600', fw) + ' fill="currentColor" text-anchor="middle"><textPath href="#fa1" startOffset="50%">SECOND WIND</textPath></text>' + ms + '<rect x="90" y="300" width="320" height="' + (k === 'light' ? 2 : 4) + '" fill="currentColor"/>' + tag('ATHLETIC CLUB', 140, 344, 220, 20) + tagC('PERTH · EST. 2026', 250, 392, 15, 4) };
    },
    /* crest */
    B4: function (p, k) {
      var m = wd('SW', [p[0] + 6, p[1] + 6, 52 + (p[0] - 9) * 1.5, 8]); var ms = '<g transform="translate(' + (150 - m.w * 0.5) + ' 90)">' + m.s + '</g>';
      if (k === 'lean') ms = lean(ms, 12);
      var sw = k === 'light' ? 5 : k === 'medium' ? 8 : 11;
      return { vb: '-30 0 360 410', inner: '<path d="M20 10 H280 V190 Q280 290 150 330 Q20 290 20 190 Z" fill="none" stroke="currentColor" stroke-width="' + sw + '"/><path d="M44 34 H256 V186 Q256 262 150 300 Q44 262 44 186 Z" fill="none" stroke="currentColor" stroke-width="2"/>' + ms + '<rect x="80" y="222" width="140" height="2" fill="currentColor"/>' + tagC('EST. 2026', 150, 256, 18, 5) + tag('ATHLETIC CLUB', -20, 392, 340, 24) };
    },
    /* interlocking SW */
    F2: function (p, k) {
      var cw = 110 + (p[0] - 9) * 2; var s = SW.glyph('S', p[0] + 15, p[1] + 15, cw), w = SW.glyph('W', p[0] + 14, p[1] + 14, cw);
      var inner = '<defs><mask id="flock" maskUnits="userSpaceOnUse" x="-500" y="-500" width="1500" height="1500"><rect x="-500" y="-500" width="1500" height="1500" fill="#fff"/><path transform="translate(-78 0)" d="' + s.d + '" fill="#000" stroke="#000" stroke-width="9"/></mask></defs><g transform="scale(2)"><g transform="translate(78 0)" mask="url(#flock)"><path fill="currentColor" d="' + w.d + '"/></g><path fill="currentColor" d="' + s.d + '"/></g>';
      if (k === 'lean') inner = lean(inner, 12);
      return { vb: '-24 -20 ' + (580 + (k === 'lean' ? 40 : 0)) + ' 240', inner: inner };
    },
    /* light and heavy: SECOND light, WIND heavy, a cut through the middle */
    K1: function (p, k) {
      var a = wd('SECOND', [Math.max(6, p[0] - 3), Math.max(6, p[1] - 3), p[2], p[3]]), b = wd('WIND', [p[0] + 10, p[1] + 8, p[2] + 4, p[3] - 2]), bx = a.w + 24;
      var inner = a.s + '<g transform="translate(' + bx + ' 0)">' + b.s + '</g>';
      inner = '<defs><mask id="fk1" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1400" height="400"><rect x="-100" y="-100" width="1400" height="400" fill="#fff"/><rect x="-6" y="58" width="' + (bx + b.w + 12) + '" height="6" fill="#000"/></mask></defs><g mask="url(#fk1)">' + inner + '</g>';
      if (k === 'lean') inner = lean(inner, 12);
      return { vb: '-16 -16 ' + (bx + b.w + 32 + (k === 'lean' ? 22 : 0)) + ' 176', inner: inner + tag('ATHLETIC CLUB', 0, 140, bx + b.w, 22) };
    },
    /* varsity 2 */
    B6: function (p, k) {
      var t = k === 'light' ? 18 : k === 'medium' ? 24 : 30;
      var two = '<path fill="currentColor" d="' + R(0, 0, 120, t) + R(120 - t, 0, t, (H - t) / 2 + t) + R(0, (H - t) / 2, 120, t) + R(0, (H - t) / 2, t, H - (H - t) / 2) + R(0, H - t, 120, t) + '"/>';
      var b = wd('WIND', [p[0] + 6, p[1] + 6, 66 + (p[0] - 9), 8]);
      var inner = '<g transform="scale(1.9)">' + two + '</g><g transform="translate(250 0)">' + b.s + '<rect x="0" y="118" width="' + b.w + '" height="5" fill="currentColor"/>' + tag('SECOND WIND ATHLETIC CLUB', 0, 156, b.w, 17) + '</g>';
      if (k === 'lean') inner = lean(inner, 12);
      return { vb: '-24 -14 ' + (250 + b.w + 48 + (k === 'lean' ? 40 : 0)) + ' 210', inner: inner };
    },
    /* three stripes */
    F6: function (p, k) {
      var t = k === 'light' ? 22 : k === 'medium' ? 28 : 34;
      var st = ''; for (var i = 0; i < 3; i++) st += P([[i * 60 + 30, 0], [i * 60 + 30 + t, 0], [i * 60 + t, H], [i * 60, H]]);
      var w = wd('SECOND WIND', p); var inner = '<path fill="currentColor" d="' + st + '"/><g transform="translate(210 0)">' + w.s + '</g>';
      if (k === 'lean') inner = lean(inner, 12);
      return { vb: '-14 -14 ' + (210 + w.w + 28 + (k === 'lean' ? 22 : 0)) + ' 170', inner: inner + tag('ATHLETIC CLUB', 210, 140, w.w, 22) };
    },
    /* condensed stack */
    B2: function (p, k) {
      var cs = Math.min(p[0] + 2, 15), cw = 40 + (p[0] - 9) * 1.2; var a = wd('SECOND', [cs, Math.min(p[1] + 1, 13), cw, 6]), b = wd('WIND', [cs, Math.min(p[1] + 1, 13), cw, 6]), s = a.w / b.w;
      var inner = '<g transform="scale(1 1.5)">' + a.s + '</g><g transform="translate(0 165) scale(' + s + ' ' + (1.5 * s) + ')">' + b.s + '</g>';
      if (k === 'lean') inner = lean(inner, 10);
      return { vb: '' + (k === 'lean' ? -58 : -14) + ' -14 ' + (a.w + 28 + (k === 'lean' ? 60 : 0)) + ' ' + (165 + 150 * s + 72), inner: inner + tag('ATHLETIC CLUB', 0, 165 + 150 * s + 40, a.w, 16) };
    },
    /* lowercase: the one that isn't bar-built, so weight is the font weight */
    B3: function (p, k) {
      var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : '';
      return { vb: '-10 -24 610 184', inner: '<text x="0" y="100" font-family="Barlow Semi Condensed" font-weight="' + fw + '"' + it + ' font-size="118" letter-spacing="-3" fill="currentColor">secondwind</text><text x="4" y="140" font-family="Barlow Semi Condensed" font-weight="500" font-size="22" letter-spacing="6" fill="currentColor">athletic club · perth</text>' };
    },
    /* luxury tracking */
    B7: function (p, k) {
      var w = wd('SECOND WIND', [Math.max(5, p[0] - 4), Math.max(5, p[1] - 4), 58, 24]);
      var inner = w.s; if (k === 'lean') inner = lean(inner, 10);
      var fr = k === 'light' ? 1.5 : 3;
      return { vb: '-70 -70 ' + (w.w + 140 + (k === 'lean' ? 20 : 0)) + ' 270', inner: '<rect x="-50" y="-50" width="' + (w.w + 100 + (k === 'lean' ? 20 : 0)) + '" height="230" fill="none" stroke="currentColor" stroke-width="' + fr + '"/>' + inner + tag('ATHLETIC CLUB', w.w * 0.3, 150, w.w * 0.4, 16) };
    },
    /* extended */
    G1: function (p, k) {
      var w = wd('SECOND WIND', [p[0], p[1], 100, 14]);
      var inner = w.s; if (k === 'lean') inner = lean(inner, 10);
      return { vb: '-14 -14 ' + (w.w + 28 + (k === 'lean' ? 22 : 0)) + ' 176', inner: inner + tag('ATHLETIC CLUB', 0, 144, w.w, 20) };
    },
    /* chamfered: the bar letters with their corners cut, always leaning */
    G2: function (p, k) {
      var w = wd('SECOND WIND', [p[0] + 6, p[1] + 6, 60, 8]);
      var inner = lean(w.s, k === 'lean' ? 18 : 12);
      return { vb: '-20 -20 ' + (w.w + 60) + ' 180', inner: inner + tag('ATHLETIC CLUB', 0, 148, w.w, 20) };
    },
    /* fashion serif: weight is the font weight */
    F7: function (p, k) {
      var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : '';
      return { vb: '-140 0 880 170', inner: '<text x="300" y="86" text-anchor="middle" ' + SERF.replace('400', fw) + it + ' font-size="92" letter-spacing="10" fill="currentColor">SECOND WIND</text><text x="300" y="134" text-anchor="middle" ' + SERF + ' font-size="26" letter-spacing="14" fill="currentColor">ATHLETIC CLUB</text>' };
    }
  };
  var NAMES = { B5: 'Two strokes', W1: 'The wing', B1: 'Heritage arch', B4: 'Crest', F2: 'Interlocking SW', K1: 'Light and heavy', B6: 'Varsity 2', F6: 'Three stripes', B2: 'Condensed stack', B3: 'Lowercase', B7: 'Luxury tracking', G1: 'Extended', G2: 'Chamfered', F7: 'Fashion serif' };
  var SYMBOL = { // the compact mark each one becomes at icon size
    B5: function (p, k) { return { vb: '-8 -8 ' + (SW.SYM_W + 16) + ' ' + (SW.SYM_H + 16), inner: sym() }; },
    W1: function (p, k) { var d = SW.glyph('D', p[0] + 8, p[1] + 6, p[2] + 6); var wing = D.W1(p, k).inner.match(/<path fill="currentColor" d="M30 2[^"]+"\/>/)[0]; return { vb: '0 -74 ' + (300 + (k === 'lean' ? 20 : 0)) + ' 178', inner: lean('<path fill="currentColor" d="' + d.d + '"/>' + wing, k === 'lean' ? 16 : 10) }; },
    B1: function (p, k) { var r = D.B1(p, k); return { vb: '183 143 134 124', inner: r.inner }; },
    B4: function (p, k) { var r = D.B4(p, k); return { vb: '12 2 276 336', inner: r.inner }; },
    F2: function (p, k) { return D.F2(p, k); },
    K1: function (p, k) { var r = D.K1(p, k); return { vb: r.vb.split(' ').slice(0, 2).join(' ') + ' ' + (parseFloat(r.vb.split(' ')[2])) + ' 132', inner: r.inner.replace(/<text[\s\S]*<\/text>/, '') }; },
    B6: function (p, k) { var r = D.B6(p, k); return { vb: (k === 'lean' ? '-22' : '-6') + ' -6 ' + (k === 'lean' ? 256 : 240) + ' 202', inner: r.inner }; },
    F7: function (p, k) { var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : ''; return { vb: '0 0 228 200', inner: '<text x="110" y="138" text-anchor="middle" ' + SERF.replace('400', fw) + it + ' font-size="128" letter-spacing="-10" fill="currentColor">SW</text><path d="M68 160h84" stroke="currentColor" stroke-width="2"/><path d="M68 38h84" stroke="currentColor" stroke-width="2"/>' }; },
    F6: function (p, k) { var r = D.F6(p, k); return { vb: '-6 -6 ' + (k === 'lean' ? 220 : 192) + ' 112', inner: r.inner.replace(/<g transform="translate\(210 0\)">[\s\S]*$/, '') + (k === 'lean' ? '</g>' : '') }; }
  };
  window.SWF = {
    ids: Object.keys(D), names: NAMES, weights: ['light', 'medium', 'bold', 'lean'],
    svg: function (id, weight, colour) { var r = D[id](W8[weight] || W8.light, weight || 'light'); return svg(r.vb, r.inner, colour || '#1e1c1a'); },
    symbol: function (id, weight, colour) { var f = SYMBOL[id] || D[id]; var r = f(W8[weight] || W8.light, weight || 'light'); return svg(r.vb, r.inner, colour || '#1e1c1a'); },
    hasSymbol: function (id) { return !!SYMBOL[id]; }
  };
})();

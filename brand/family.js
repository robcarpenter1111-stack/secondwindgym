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

  /* round three icons: drawn as strokes so the weight moves with the letters. each returns {inner, w} in a 100-high box */
  function st(d, t, extra) { return '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="' + t + '" stroke-linecap="square" stroke-linejoin="miter"' + (extra || '') + '/>'; }
  function thick(p) { return Math.round(p[0] * 0.62 + 6.5); }
  var icons = {
    wind: function (p, k) { var t = thick(p); return st('M6 28H62a15 15 0 1 0 -15 -15', t) + st('M6 52H98a16 16 0 1 1 -16 16', t) + st('M6 76H44a14 14 0 1 0 -14 -14', t); },
    ring: function (p, k) { var t = thick(p); return st('M78 24A38 38 0 1 0 90 50', t) + '<circle cx="86" cy="22" r="' + (t * .55) + '" fill="currentColor"/>'; },
    loop: function (p, k) { var t = thick(p); return st('M40 16H88a34 34 0 0 1 0 68H40a34 34 0 0 1 0 -68Z', t) + '<rect x="' + (64 - t * .45) + '" y="' + (84 - t * .5 - 14) + '" width="' + (t * .9) + '" height="' + (t + 14) + '" fill="currentColor"/>'; },
    dial: function (p, k) { var t = thick(p); return st('M8 80A44 44 0 0 1 96 80', t) + '<path d="M52 80L88 36" stroke="currentColor" stroke-width="' + (t * .7) + '" fill="none" stroke-linecap="square"/><circle cx="52" cy="80" r="' + (t * .7) + '" fill="currentColor"/>'; },
    chev: function (p, k) { var t = thick(p); return st('M8 14L44 50L8 86', t) + st('M54 14L90 50L54 86', t); },
    turn: function (p, k) { var t = thick(p); return st('M18 14V58a30 30 0 0 0 60 0V26', t) + st('M60 42L78 22L96 42', t); }
  };
  function named(icon, iw, p, k) {
    var w = wd('SECOND WIND', p), wx = iw + 40;
    var word = '<g transform="translate(' + wx + ' 0)">' + w.s + '</g>'; if (k === 'lean') word = lean(word, 12);
    return { vb: '-10 -10 ' + (wx + w.w + 20 + (k === 'lean' ? 22 : 0)) + ' 156', inner: icon + word + tag('ATHLETIC CLUB', wx, 132, w.w, 22) };
  }

  /* round four: the symbol's cut carried into the letters. free bar ends on S, C and E are cut at the strokes' angle */
  var CUT = SW.SYM.lean / SW.SYM.t;   // the strokes' slope, about 31 degrees off vertical
  function cutGlyph(ch, tv, th, w) {
    var mid = (H - th) / 2, dx = th * CUT, d;
    var rcut = function (x, y, len) { return P([[x, y], [x + len, y], [x + len - dx, y + th], [x, y + th]]); };
    var lcut = function (x, y, len) { return P([[x + dx, y], [x + len, y], [x + len, y + th], [x, y + th]]); };
    if (ch === 'S') d = rcut(0, 0, w) + R(0, 0, tv, mid + th) + R(0, mid, w, th) + R(w - tv, mid, tv, H - mid) + lcut(0, H - th, w);
    else if (ch === 'C') d = R(0, 0, tv, H) + rcut(0, 0, w) + rcut(0, H - th, w);
    else if (ch === 'E') d = R(0, 0, tv, H) + rcut(0, 0, w) + rcut(0, mid, w * 0.86) + rcut(0, H - th, w);
    else return SW.glyph(ch, tv, th, w);
    return { d: d, adv: w };
  }
  function cutGlyph2(ch, tv, th, w) {   // as cutGlyph, and the I's top cut at the strokes' angle
    if (ch === 'I') { var dy = tv / CUT; return { d: P([[0, dy], [tv, 0], [tv, H], [0, H]]), adv: tv }; }
    return cutGlyph(ch, tv, th, w);
  }
  function cword2(str, p) {
    var x = 0, out = '', o, i, ch;
    for (i = 0; i < str.length; i++) { ch = str.charAt(i); if (ch === ' ') { x += p[3] * 3; continue; } o = cutGlyph2(ch, p[0], p[1], p[2]); out += '<path transform="translate(' + x + ' 0)" d="' + o.d + '"/>'; x += o.adv + p[3]; }
    return { s: out, w: x - p[3] };
  }
  function cword(str, p) {
    var x = 0, out = '', o, i, ch;
    for (i = 0; i < str.length; i++) { ch = str.charAt(i); if (ch === ' ') { x += p[3] * 3; continue; } o = cutGlyph(ch, p[0], p[1], p[2]); out += '<path transform="translate(' + x + ' 0)" d="' + o.d + '"/>'; x += o.adv + p[3]; }
    return { s: out, w: x - p[3] };
  }
  function stroke1(sc) { var q = SW.SYM; return '<path fill="currentColor" transform="scale(' + (sc || 1) + ')" d="' + P([[q.lean, 0], [q.a + q.lean, 0], [q.a, q.t], [0, q.t]]) + '"/>'; }
  function lockR4(w, k, gap, tagSize, forceLean) {
    var sy = (H - SW.SYM_H) / 2 + 2, wx = SW.SYM_W + gap, L = (k === 'lean' || forceLean) ? (k === 'lean' ? 14 : 10) : 0;
    var word = '<g transform="translate(' + wx + ' 0)">' + w.s + '</g>', icon = '<g transform="translate(0 ' + sy + ')">' + sym() + '</g>';
    var inner = icon + word, tl = tag('ATHLETIC CLUB', wx, 134, w.w, tagSize);
    if (L) inner = lean(inner, L);
    return { vb: '-10 -10 ' + (wx + w.w + 30 + (L ? 24 : 0)) + ' 160', inner: inner + tl };
  }
  function cafeR4(name, p, k) {
    var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : '';
    var tw = 640, cx = tw / 2, sc = 1.05, s1w = (SW.SYM.a + SW.SYM.lean) * sc;
    return { vb: '-10 -10 ' + (tw + 20) + ' 290', inner: '<g transform="translate(' + (cx - s1w / 2) + ' 0)">' + stroke1(sc) + '</g>' +
      '<text x="' + cx + '" y="150" text-anchor="middle" ' + SERF.replace('400', fw) + it + ' font-size="88" textLength="' + tw + '" lengthAdjust="spacing" fill="currentColor">' + name + '</text>' +
      '<text x="' + cx + '" y="210" text-anchor="middle" ' + SERF + ' font-size="34" letter-spacing="26" fill="currentColor">CAFÉ</text>' +
      '<rect x="' + (cx - 60) + '" y="236" width="120" height="2" fill="currentColor"/>' +
      '<text x="' + cx + '" y="268" text-anchor="middle" ' + SERF + ' font-size="18" letter-spacing="9" fill="currentColor">AT SECOND WIND ATHLETIC CLUB</text>' };
  }

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
    /* --- round two: drawn from the two favourites, the two strokes and the serif --- */
    /* serif strokes: our symbol, the name in the fine serif beside it */
    N1: function (p, k) {
      var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : '';
      var sy = (H - SW.SYM_H) / 2 + 2, wx = SW.SYM_W + 48, tw = 700;
      return { vb: '-10 -14 ' + (wx + tw + 30) + ' 168', inner: '<g transform="translate(0 ' + sy + ')">' + sym() + '</g>' +
        '<text x="' + wx + '" y="86" ' + SERF.replace('400', fw) + it + ' font-size="92" textLength="' + tw + '" lengthAdjust="spacing" fill="currentColor">SECOND WIND</text>' +
        '<text x="' + (wx + 2) + '" y="132" ' + SERF + ' font-size="24" letter-spacing="13" fill="currentColor">ATHLETIC CLUB</text>' };
    },
    /* serif stacked: strokes centred above a two-line serif stack */
    N2: function (p, k) {
      var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : '';
      var tw = 700, sc = 1.15, sw = SW.SYM_W * sc, sx = (tw - sw) / 2, ty = SW.SYM_H * sc + 118;
      return { vb: '-10 -10 ' + (tw + 20) + ' ' + (ty + 70), inner: '<g transform="translate(' + sx + ' 0) scale(' + sc + ')">' + sym() + '</g>' +
        '<text x="' + (tw / 2) + '" y="' + ty + '" text-anchor="middle" ' + SERF.replace('400', fw) + it + ' font-size="92" textLength="' + tw + '" lengthAdjust="spacing" fill="currentColor">SECOND WIND</text>' +
        '<text x="' + (tw / 2) + '" y="' + (ty + 46) + '" text-anchor="middle" ' + SERF + ' font-size="24" letter-spacing="13" fill="currentColor">ATHLETIC CLUB</text>' };
    },
    /* framed strokes: the bar letters tracked wide inside a hairline frame, the strokes leading */
    N3: function (p, k) {
      var w = wd('SECOND WIND', [Math.max(5, p[0] - 4), Math.max(5, p[1] - 4), 58, 24]);
      var sc = .8, sy = (H - SW.SYM_H * sc) / 2 + 2, wx = SW.SYM_W * sc + 44, L = k === 'lean' ? 20 : 0;
      var inner = '<g transform="translate(0 ' + sy + ') scale(' + sc + ')">' + sym() + '</g><g transform="translate(' + wx + ' 0)">' + (k === 'lean' ? lean(w.s, 10) : w.s) + '</g>';
      var fr = k === 'light' ? 1.5 : 3, tw = wx + w.w + L;
      return { vb: '-70 -70 ' + (tw + 140) + ' 270', inner: '<rect x="-50" y="-50" width="' + (tw + 100) + '" height="230" fill="none" stroke="currentColor" stroke-width="' + fr + '"/>' + inner + tag('ATHLETIC CLUB', wx + w.w * 0.3, 150, w.w * 0.4, 16) };
    },
    /* wide strokes: the two strokes mark with the letters tracked wide, no frame */
    N4: function (p, k) {
      var w = wd('SECOND WIND', [p[0], p[1], p[2], 22]), sy = (H - SW.SYM_H) / 2 + 2, wx = SW.SYM_W + 48;
      var word = '<g transform="translate(' + wx + ' 0)">' + w.s + '</g>'; if (k === 'lean') word = lean(word, 12);
      return { vb: '-10 -10 ' + (wx + w.w + 20 + (k === 'lean' ? 22 : 0)) + ' 156', inner: '<g transform="translate(0 ' + sy + ')">' + sym() + '</g>' + word + '<text x="' + (wx + 2) + '" y="134" ' + TAGF + ' font-size="22" letter-spacing="11" fill="currentColor">ATHLETIC CLUB</text>' };
    },
    /* monogram strokes: SW in the serif with the two strokes beneath, the name small under */
    N5: function (p, k) {
      var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : '';
      var cx = 230, sc = .62, sw = SW.SYM_W * sc;
      return { vb: '0 0 460 330', inner: '<text x="' + cx + '" y="150" text-anchor="middle" ' + SERF.replace('400', fw) + it + ' font-size="150" letter-spacing="-10" fill="currentColor">SW</text>' +
        '<g transform="translate(' + (cx - sw / 2) + ' 172) scale(' + sc + ')">' + sym() + '</g>' +
        '<text x="' + cx + '" y="268" text-anchor="middle" ' + SERF + ' font-size="38" letter-spacing="12" fill="currentColor">SECOND WIND</text>' +
        '<text x="' + cx + '" y="302" text-anchor="middle" ' + SERF + ' font-size="18" letter-spacing="10" fill="currentColor">ATHLETIC CLUB</text>' };
    },
    /* italic club line: the two strokes mark with Athletic Club in the serif italic */
    N6: function (p, k) {
      var w = wd('SECOND WIND', p), sy = (H - SW.SYM_H) / 2 + 2, wx = SW.SYM_W + 40;
      var word = '<g transform="translate(' + wx + ' 0)">' + w.s + '</g>'; if (k === 'lean') word = lean(word, 12);
      return { vb: '-10 -10 ' + (wx + w.w + 20 + (k === 'lean' ? 22 : 0)) + ' 170', inner: '<g transform="translate(0 ' + sy + ')">' + sym() + '</g>' + word + '<text x="' + (wx + 2) + '" y="146" ' + SERF + ' font-style="italic" font-size="42" letter-spacing="2" fill="currentColor">Athletic Club</text>' };
    },
    /* --- round four: Sergio's feedback, 8 Nov. the two strokes stay; the letters go wider, lean, and carry the cut --- */
    R1: function (p, k) { return lockR4(cword('SECOND WIND', [p[0], p[1], 92, 14]), k, 44, 22); },
    R2: function (p, k) { return lockR4(cword('SECOND WIND', [p[0] + 3, p[1] + 3, 60, 9]), k, 40, 22, true); },
    R3: function (p, k) {
      var pp = [p[0] + 2, p[1] + 2, 92, 14], a = cword('SECOND', pp), b = cword('WIND', pp), sw = SW.SYM_W;
      var ix = b.w + 36, iy = 132 + (H - SW.SYM_H) / 2;
      var inner = a.s + '<g transform="translate(0 132)">' + b.s + '</g><g transform="translate(' + ix + ' ' + iy + ')">' + sym() + '</g>';
      var W = Math.max(a.w, ix + sw);
      inner = lean(inner, k === 'lean' ? 14 : 10);
      return { vb: '-44 -14 ' + (W + 90) + ' 300', inner: inner + tag('ATHLETIC CLUB', -38, 268, W, 22) };
    },
    R4: function (p, k) { return lockR4(cword('SECOND WIND', [p[0], p[1], p[2], 22]), k, 48, 22); },
    R5: function (p, k) { return cafeR4('FIRST WIND', p, k); },
    R6: function (p, k) {
      var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : '';
      var sy = (H - SW.SYM_H) / 2 + 2, wx = SW.SYM_W + 48, tw = 700;
      return { vb: '-10 -14 ' + (wx + tw + 30) + ' 172', inner: '<g transform="translate(0 ' + sy + ')">' + sym() + '</g>' +
        '<text x="' + wx + '" y="86" ' + SERF.replace('400', fw) + it + ' font-size="92" textLength="' + tw + '" lengthAdjust="spacing" fill="currentColor">SECOND WIND</text>' +
        '<text x="' + wx + '" y="134" ' + SERF + ' font-size="26" textLength="' + tw + '" lengthAdjust="spacing" fill="currentColor">ATHLETIC CLUB</text>' };
    },
    R7: function (p, k) { return cafeR4('SECOND WIND', p, k); },
    /* a little extended: Sergio's voice note, 8 Nov. the two strokes' spacing, letters about a fifth wider, cuts on S E C (an I cut was tried: at this angle a narrow stem becomes a spike) */
    R8: function (p, k) { return lockR4(cword('SECOND WIND', [p[0], p[1], Math.round(p[2] * 1.22), p[3]]), k, 40, 22); },
    /* --- round three: new icons, same build. an icon on the left, the bar letters, the club line --- */
    X1: function (p, k) { return named(icons.wind(p, k), 112, p, k); },
    X2: function (p, k) { return named(icons.ring(p, k), 100, p, k); },
    X3: function (p, k) { return named(icons.loop(p, k), 128, p, k); },
    X4: function (p, k) { return named(icons.dial(p, k), 110, p, k); },
    X5: function (p, k) { return named(icons.chev(p, k), 104, p, k); },
    X6: function (p, k) { return named(icons.turn(p, k), 104, p, k); },
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
  var NAMES = { B5: 'Two strokes', W1: 'The wing', B1: 'Heritage arch', B4: 'Crest', F2: 'Interlocking SW', K1: 'Light and heavy', B6: 'Varsity 2', F6: 'Three stripes', B2: 'Condensed stack', B3: 'Lowercase', B7: 'Luxury tracking', G1: 'Extended', G2: 'Chamfered', F7: 'Fashion serif', N1: 'Serif strokes', N2: 'Serif stacked', N3: 'Framed strokes', N4: 'Wide strokes', N5: 'Monogram strokes', N6: 'Italic club line', X1: 'The wind', X2: 'The breath', X3: 'The loop', X4: 'The second half', X5: 'Fast forward', X6: 'The turn', R1: 'Extended strokes', R2: 'Leaning strokes', R3: 'Two-line extended', R4: 'Wide strokes, cut', R5: 'First Wind Café', R6: 'Serif strokes, full width', R7: 'Second Wind Café', R8: 'Two strokes, a little extended' };
  var SYMBOL = { // the compact mark each one becomes at icon size
    B5: function (p, k) { return { vb: '-8 -8 ' + (SW.SYM_W + 16) + ' ' + (SW.SYM_H + 16), inner: sym() }; },
    W1: function (p, k) { var d = SW.glyph('D', p[0] + 8, p[1] + 6, p[2] + 6); var wing = D.W1(p, k).inner.match(/<path fill="currentColor" d="M30 2[^"]+"\/>/)[0]; return { vb: '0 -74 ' + (300 + (k === 'lean' ? 20 : 0)) + ' 178', inner: lean('<path fill="currentColor" d="' + d.d + '"/>' + wing, k === 'lean' ? 16 : 10) }; },
    B1: function (p, k) { var r = D.B1(p, k); return { vb: '183 143 134 124', inner: r.inner }; },
    B4: function (p, k) { var r = D.B4(p, k); return { vb: '12 2 276 336', inner: r.inner }; },
    F2: function (p, k) { return D.F2(p, k); },
    K1: function (p, k) { var r = D.K1(p, k); return { vb: r.vb.split(' ').slice(0, 2).join(' ') + ' ' + (parseFloat(r.vb.split(' ')[2])) + ' 132', inner: r.inner.replace(/<text[\s\S]*<\/text>/, '') }; },
    B6: function (p, k) { var r = D.B6(p, k); return { vb: (k === 'lean' ? '-22' : '-6') + ' -6 ' + (k === 'lean' ? 256 : 240) + ' 202', inner: r.inner }; },
    R1: function (p, k) { return SYMBOL.B5(p, k); }, R2: function (p, k) { return SYMBOL.B5(p, k); }, R3: function (p, k) { return SYMBOL.B5(p, k); }, R4: function (p, k) { return SYMBOL.B5(p, k); }, R8: function (p, k) { return SYMBOL.B5(p, k); }, R6: function (p, k) { return SYMBOL.B5(p, k); },
    R5: function (p, k) { var q = SW.SYM; return { vb: '-8 -8 ' + (q.a + q.lean + 16) + ' ' + (q.t + 16), inner: stroke1(1) }; }, R7: function (p, k) { var q = SW.SYM; return { vb: '-8 -8 ' + (q.a + q.lean + 16) + ' ' + (q.t + 16), inner: stroke1(1) }; },
    X1: function (p, k) { return { vb: '-6 -6 124 112', inner: icons.wind(p, k) }; }, X2: function (p, k) { return { vb: '-6 -6 112 112', inner: icons.ring(p, k) }; }, X3: function (p, k) { return { vb: '-6 -6 140 112', inner: icons.loop(p, k) }; },
    X4: function (p, k) { return { vb: '-6 -6 122 112', inner: icons.dial(p, k) }; }, X5: function (p, k) { return { vb: '-6 -6 116 112', inner: icons.chev(p, k) }; }, X6: function (p, k) { return { vb: '-6 -6 116 112', inner: icons.turn(p, k) }; },
    N1: function (p, k) { return SYMBOL.B5(p, k); }, N2: function (p, k) { return SYMBOL.B5(p, k); }, N3: function (p, k) { return SYMBOL.B5(p, k); }, N4: function (p, k) { return SYMBOL.B5(p, k); }, N6: function (p, k) { return SYMBOL.B5(p, k); },
    N5: function (p, k) { var fw = k === 'light' ? 400 : k === 'medium' ? 500 : 700, it = k === 'lean' ? ' font-style="italic"' : ''; var sc = .62, sw = SW.SYM_W * sc; return { vb: '20 10 260 230', inner: '<text x="150" y="150" text-anchor="middle" ' + SERF.replace('400', fw) + it + ' font-size="150" letter-spacing="-10" fill="currentColor">SW</text><g transform="translate(' + (150 - sw / 2) + ' 172) scale(' + sc + ')">' + sym() + '</g>' }; },
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

// A stylised "Ahmed Nassar" signature drawn on a 0 0 560 170 canvas, as
// three quick pen strokes that animate on in order: the "Ahmed" run
// (capital A + flowing body), the "Nassar" run (capital N + trailing
// sweep), and an underline flourish beneath.
//
// This is a placeholder mark. For a signature that's actually *yours*,
// replace the strings below (in stroke order) with the `d` attributes of a
// real vector signature — either:
//   • trace your handwritten signature: sign on white paper, photograph it,
//     Inkscape → Path → Trace Bitmap (or vectorizer.ai), copy each <path d>;
//   • or generate one: type your name at a signature-maker site, pick a
//     style, download as SVG, copy the path data.
export const AHMED_NASSAR_SIGNATURE = [
  // "Ahmed" — up into a cursive capital A, then a flowing body that trails
  // off to the right.
  'M 22 120 C 40 74 66 34 92 18 C 100 13 110 16 110 28 C 110 60 104 96 106 118 C 108 130 122 130 138 114 C 168 84 180 44 202 44 C 214 44 210 96 224 104 C 238 112 252 86 268 92',
  // "Nassar" — cursive capital N, then a quick decaying wave to the edge.
  'M 286 124 C 292 88 304 40 316 22 C 322 14 332 17 334 32 C 336 70 332 102 332 124 C 352 88 386 44 412 28 C 422 22 432 28 430 44 C 426 82 416 106 414 122 C 426 108 440 96 456 98 C 470 100 474 116 490 110 C 506 104 512 92 528 96',
  // Underline flourish — one sweep right-to-left, curling up at the end.
  'M 520 138 C 420 160 250 160 140 146 C 96 141 64 150 74 130',
];

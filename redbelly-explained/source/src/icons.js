/*
  Redbelly Explained: icon set.

  Every icon is an original drawing on a 48 x 48 grid, made for this series.
  Strokes use currentColor; parts with class "a" take the red accent, "af" is a
  red fill and "sf" a solid fill in the current colour. Styling lives in
  series.css (.ico), so the same markup works in the PNG renders and the SVG
  exports.
*/
window.RX = window.RX || {};

RX.icons = {
  /* Assets and records */
  bond:
    '<path d="M12 4.5h16.5L37 13v26.5a2.5 2.5 0 0 1-2.5 2.5H12a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 12 4.5z"/>' +
    '<path d="M28.5 4.5V13H37"/><path d="M15.5 18.5h11M15.5 24.5h7"/>' +
    '<circle class="a" cx="28.5" cy="31.5" r="5"/><path class="a" d="M26 36l-1 5 3.5-1.8L32 41l-1-5"/>',

  ledger:
    '<ellipse cx="24" cy="11" rx="15" ry="5.5"/>' +
    '<path d="M9 11v26c0 3 6.7 5.5 15 5.5S39 40 39 37V11"/>' +
    '<path d="M9 20c0 3 6.7 5.5 15 5.5S39 23 39 20"/>' +
    '<path class="a" d="M9 28.5c0 3 6.7 5.5 15 5.5s15-2.5 15-5.5"/>',

  token:
    '<circle cx="24" cy="24" r="18.5"/>' +
    '<path class="a" d="M24 14.5l8.2 4.75v9.5L24 33.5l-8.2-4.75v-9.5z"/>',

  pie:
    '<circle cx="24" cy="24" r="18.5"/><path d="M24 5.5V24h18.5"/>' +
    '<path class="af" d="M27.5 20.5V9.9a14.6 14.6 0 0 1 10.6 10.6z"/>',

  /* Identity */
  idbadge:
    '<rect x="4.5" y="9.5" width="39" height="29" rx="3.5"/>' +
    '<circle cx="16" cy="20.5" r="4.5"/>' +
    '<path d="M9.5 32.5c1.3-3.6 3.6-5.5 6.5-5.5s5.2 1.9 6.5 5.5"/>' +
    '<path d="M28 18.5h9"/><path class="a" d="M28 28l3.5 3.5 6-6.5"/>',

  person:
    '<circle cx="24" cy="15" r="7"/><path d="M10 41c1.8-8 7.4-12 14-12s12.2 4 14 12"/>',

  wallet:
    '<path d="M36 12.5V9.6a2.4 2.4 0 0 0-3-2.3L9.5 12.5"/>' +
    '<rect x="6.5" y="12.5" width="35" height="27" rx="3.5"/>' +
    '<path d="M41.5 21.5h-8a4.5 4.5 0 0 0 0 9h8"/><circle class="af" cx="33.5" cy="26" r="2"/>',

  stamp:
    '<circle cx="24" cy="10" r="5"/>' +
    '<path d="M21 15v6.5h-8a3 3 0 0 0-3 3V31h28v-6.5a3 3 0 0 0-3-3h-8V15"/>' +
    '<path d="M10 35.5h28"/><path class="a" d="M13 41.5h22"/>',

  verify:
    '<circle cx="21" cy="21" r="14.5"/><path d="M31.5 31.5L42 42"/>' +
    '<path class="a" d="M14.5 21l4.5 4.5 8-8.5"/>',

  gate:
    '<path d="M21 5.5h16.5A2.5 2.5 0 0 1 40 8v32a2.5 2.5 0 0 1-2.5 2.5H21"/>' +
    '<path class="a" d="M5 24h22M20 16.5l7.5 7.5-7.5 7.5"/>',

  proof:
    '<path d="M24 4.5l15.5 6v11.5c0 10.2-6.6 17.6-15.5 21.5C15.1 39.6 8.5 32.2 8.5 22V10.5z"/>' +
    '<path class="a" d="M16.5 23.5l5 5 10-10.5"/>',

  fingerprint:
    '<path d="M12.5 33a28 28 0 0 1-2-10.5 13.5 13.5 0 0 1 23.6-9"/>' +
    '<path d="M37 17.6a13.4 13.4 0 0 1 .5 4.9c0 3.2-.3 6-.9 8.5"/>' +
    '<path d="M17.4 39.5a33 33 0 0 1-2.9-13.5v-3.5a9.5 9.5 0 0 1 19 0V26"/>' +
    '<path class="a" d="M24 22.5v4c0 5.6 1.2 10.4 3.4 15"/>' +
    '<path d="M33.2 31c-.4 2.9-1.1 5.5-2.2 8"/><path d="M19.6 27.5c.3 4.6 1.2 8.6 2.8 12.5"/>',

  lock:
    '<rect x="10" y="21" width="28" height="21" rx="3.5"/>' +
    '<path d="M16 21v-5.5a8 8 0 0 1 16 0V21"/><path class="a" d="M24 28.5v6"/>',

  eyeoff:
    '<path d="M4.5 24S11.5 12 24 12s19.5 12 19.5 12S36.5 36 24 36 4.5 24 4.5 24z"/>' +
    '<circle cx="24" cy="24" r="5.5"/><path class="a" d="M9 39L39 9"/>',

  link:
    '<path d="M20.5 27.5l7-7"/>' +
    '<path d="M22 13.5l3.5-3.5a7.8 7.8 0 0 1 11 11L33 24.5"/>' +
    '<path class="a" d="M26 34.5L22.5 38a7.8 7.8 0 0 1-11-11l3.5-3.5"/>',

  /* Consensus */
  lockblock:
    '<rect x="3.5" y="21" width="11" height="11" rx="2"/><rect x="18.5" y="21" width="11" height="11" rx="2"/>' +
    '<path d="M14.5 26.5h4M29.5 26.5h4"/>' +
    '<rect class="a" x="33.5" y="21" width="11" height="11" rx="2"/><path class="a" d="M36 21v-3.5a3 3 0 0 1 6 0V21"/>',

  ring:
    '<path class="a" d="M24 8l15.2 11.1-5.8 17.8H14.6L8.8 19.1z"/>' +
    '<circle class="sf" cx="24" cy="8" r="3.6"/><circle class="sf" cx="39.2" cy="19.1" r="3.6"/>' +
    '<circle class="sf" cx="33.4" cy="36.9" r="3.6"/><circle class="sf" cx="14.6" cy="36.9" r="3.6"/>' +
    '<circle class="sf" cx="8.8" cy="19.1" r="3.6"/>',

  nodes:
    '<circle cx="24" cy="8.5" r="4"/><circle cx="8.5" cy="24" r="4"/><circle cx="39.5" cy="24" r="4"/><circle cx="24" cy="39.5" r="4"/>' +
    '<path d="M21.2 11.3l-9.9 9.9M26.8 11.3l9.9 9.9M11.3 26.8l9.9 9.9M36.7 26.8l-9.9 9.9"/>' +
    '<circle class="af" cx="24" cy="24" r="4"/>',

  code:
    '<path d="M15 13L5 24l10 11M33 13l10 11-10 11"/><path class="a" d="M27.5 9l-7 30"/>',

  /* Time, rules, checks */
  clock:
    '<circle cx="24" cy="24" r="18.5"/><path class="a" d="M24 12.5V24l7.5 5"/>',

  stopwatch:
    '<circle cx="24" cy="27" r="16"/><path d="M19 4.5h10M24 4.5V11M36.5 13.5L39 11"/>' +
    '<path class="a" d="M24 27v-9"/>',

  checklist:
    '<rect x="8.5" y="5.5" width="31" height="37" rx="3.5"/>' +
    '<path class="a" d="M14.5 16.5l3 3 5-5.5M14.5 29l3 3 5-5.5"/><path d="M27 17h7M27 29.5h7"/>',

  log:
    '<rect x="9.5" y="8.5" width="29" height="35" rx="3.5"/>' +
    '<path d="M18 5h12a1.5 1.5 0 0 1 1.5 1.5V11a1.5 1.5 0 0 1-1.5 1.5H18a1.5 1.5 0 0 1-1.5-1.5V6.5A1.5 1.5 0 0 1 18 5z"/>' +
    '<path d="M16 21h16M16 28h16"/><path class="a" d="M16 35h9"/>',

  warning:
    '<path d="M21.4 7.6a3 3 0 0 1 5.2 0l15.8 28a3 3 0 0 1-2.6 4.4H8.2a3 3 0 0 1-2.6-4.4z"/>' +
    '<path class="a" d="M24 17v10"/><circle class="af" cx="24" cy="33" r="1.9"/>',

  evidence:
    '<path d="M12 4.5h16.5L37 13v26.5a2.5 2.5 0 0 1-2.5 2.5H12a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 12 4.5z"/>' +
    '<path d="M28.5 4.5V13H37"/>' +
    '<path class="a" d="M23 19.5v9"/><circle class="af" cx="23" cy="34" r="1.9"/>',

  exit:
    '<path d="M29 8.6A16.5 16.5 0 1 0 29 39.4"/>' +
    '<path class="a" d="M21 24h21M35.5 17.5L42 24l-6.5 6.5"/>',

  question:
    '<path d="M9 7.5h30a3.5 3.5 0 0 1 3.5 3.5v19a3.5 3.5 0 0 1-3.5 3.5H23l-9 7.5v-7.5H9A3.5 3.5 0 0 1 5.5 30V11A3.5 3.5 0 0 1 9 7.5z"/>' +
    '<path class="a" d="M19.5 16.5a4.5 4.5 0 1 1 6.6 4c-1.4.8-2.1 1.7-2.1 3.3"/><circle class="af" cx="24" cy="28.5" r="1.8"/>',

  contract:
    '<path d="M12 4.5h16.5L37 13v26.5a2.5 2.5 0 0 1-2.5 2.5H12a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 12 4.5z"/>' +
    '<path d="M28.5 4.5V13H37"/><path class="a" d="M19.5 22l-4.5 5 4.5 5M27 22l4.5 5-4.5 5"/>',

  /* Governance */
  ballot:
    '<path d="M12 4.5h16.5L37 13v26.5a2.5 2.5 0 0 1-2.5 2.5H12a2.5 2.5 0 0 1-2.5-2.5V7A2.5 2.5 0 0 1 12 4.5z"/>' +
    '<path d="M28.5 4.5V13H37"/><path class="a" d="M23 21.5v12M17 27.5h12"/>',

  pen:
    '<path d="M29.5 8.5l10 10L19 39H9V29z"/><path d="M25 13l10 10"/><path class="a" d="M25 42.5h16"/>',

  tally:
    '<path d="M5.5 41.5h37"/><rect x="9.5" y="25" width="7" height="16.5" rx="1.5"/>' +
    '<rect class="a" x="20.5" y="9" width="7" height="32.5" rx="1.5"/><rect x="31.5" y="18" width="7" height="23.5" rx="1.5"/>',

  receipt:
    '<path d="M10.5 4.5h27v38l-4.5-3-4.5 3-4.5-3-4.5 3-4.5-3-4.5 3z"/>' +
    '<path d="M16.5 13.5h15M16.5 20h10"/><path class="a" d="M17 29l4 4 9-9.5"/>',

  bank:
    '<path d="M4.5 17.5L24 6l19.5 11.5z"/><path d="M9.5 21.5v14M18 21.5v14M30 21.5v14M38.5 21.5v14M5 40.5h38"/>' +
    '<circle class="af" cx="24" cy="13" r="2"/>',

  /* Status glyphs */
  check: '<path d="M10 25l9 9 19-20"/>',
  cross: '<path d="M14 14l20 20M34 14L14 34"/>'
};

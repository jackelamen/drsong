# 연세와이즈정신건강의학과 website

Static one-page site for 연세와이즈정신건강의학과 (송정은 원장), 선릉역 9번 출구 리치타워 5층.
No build step: plain HTML, CSS and JS. Works on GitHub Pages, Netlify, Vercel or any static host.

## Structure

```
index.html              all page content (Korean)
assets/css/style.css    styles; colour tokens at the top (:root)
assets/js/main.js       mobile menu, "today" hours status (Asia/Seoul), address copy
assets/img/logo.svg     full logo (Yonsei seal + 연세와이즈 정신건강의학과), colour
assets/img/logo-white.svg / logo-mono.svg   variants for dark backgrounds / currentColor
assets/img/emblem.svg, favicon.svg          seal only
assets/img/dr-song.jpg  profile photo
assets/img/clinic/      interior photos
```

## Design notes

- Colours come from the clinic brochures (sky blue `#daebff`, indigo `#3e56aa`) plus warm oak/cream
  tones from the interior photos. The seal uses the official Yonsei navy `#003777`.
- Logo text was traced from the 연세제목체 (YonseiB, "연세와이즈") and 연세본문체 (YonseiL, "정신건강의학과")
  fonts to match the signage at the reception desk, so the SVGs need no font files.
- Headings (h1, h2, doctor name) use 연세제목체 (YonseiB), subset to the characters on the page:
  `assets/fonts/YonseiB-subset.woff2` (about 16 KB). Body text uses Pretendard (jsDelivr CDN).
- The source YonseiB TTF has a corrupt final glyph offset that browsers reject. `tools/build-fonts.py`
  repairs it and rebuilds the subset. **Re-run it after changing any text**, or new characters in
  headings will fall back to Pretendard:

  ```
  pip install fonttools brotli
  python3 tools/build-fonts.py path/to/YonseiB.TTF
  ```
- The hero photo (`reception-light.jpg`) was perspective-corrected: the original had about a 1.5° slope
  along the desk and floor.

## Common edits

- **Hours**: update the table in `#hours` in `index.html` *and* the `SCHEDULE` object in `assets/js/main.js`
  (minutes from midnight), plus the quick-info box and footer text.
- **Add gallery photos**: resize to about 1600px on the long side, save to `assets/img/clinic/`, and copy a
  `<figure class="g-item">` inside `.gallery`. Add `g-wide` (2x2) or `g-tall` (1x2) for bigger tiles.

## To do

- Phone number / reservation link (not yet provided)
- Confirm the services and test list in `#care`
- Confirm the map pin (see Location below)

## Location

The map is a Google Maps embed searching for `서울특별시 강남구 테헤란로 403 리치타워`.
If the pin lands on the wrong building, right-click the building in Google Maps, copy the
coordinates, and replace the `q=` value in the iframe `src` with `37.xxxx,127.xxxx`.

# 연세와이즈정신건강의학과 website

Static one-page site for 연세와이즈정신건강의학과 (송정은 원장), 선릉역 9번 출구 리치타워 5층.
No build step: plain HTML, CSS and JS. Works on GitHub Pages, Netlify, Vercel or any static host.

## Structure

```
index.html              all page content (Korean)
assets/css/style.css    styles; colour tokens at the top (:root)
assets/js/main.js       mobile menu, "today" hours status (Asia/Seoul), scroll reveal
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
- Body font: Pretendard (jsDelivr CDN).

## Common edits

- **Hours**: update the table in `#hours` in `index.html` *and* the `SCHEDULE` object in `assets/js/main.js`
  (minutes from midnight), plus the quick-info box and footer text.
- **Add gallery photos**: resize to about 1600px on the long side, save to `assets/img/clinic/`, and copy a
  `<figure class="g-item">` inside `.gallery`. Add `g-wide` (2x2) or `g-tall` (1x2) for bigger tiles.

## To do

- Phone number / reservation link (not yet provided)
- Confirm the services and test list in `#care`
- Remaining interior photos (waiting area with painting, consultation room, plant)

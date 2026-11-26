# 연세와이즈정신건강의학과 website

Static one-page site for 연세와이즈정신건강의학과 (송정은 원장), 선릉역 9번 출구 리치타워 5층.
No build step: plain HTML, CSS and JS. Works on GitHub Pages, Netlify, Vercel or any static host.

## Structure

```
index.html              all page content (Korean)
assets/css/style.css    styles; colour tokens at the top (:root)
assets/js/main.js       mobile menu, "today" hours status (Asia/Seoul), address copy
assets/img/logo.svg     full logo (Yonsei seal + 연세와이즈정신건강의학과), brochure gray
assets/img/logo-white.svg / logo-mono.svg   variants for dark backgrounds / currentColor
assets/img/emblem.svg, favicon.svg          seal only
assets/img/dr-song.jpg  profile photo
assets/img/clinic/      interior photos
```

## Design notes

- Colours come from the clinic brochures (sky blue `#daebff`, indigo `#3e56aa`) plus warm oak/cream
  tones from the interior photos. The seal uses the official Yonsei navy `#003777`.
- Logo: Yonsei seal (official vector) plus "연세와이즈정신건강의학과" in Pretendard SemiBold,
  letter-spacing -0.04em, gray `#939499`, sized and spaced to match the brochure footer logo.
  The text is converted to outlines, so the SVGs need no font files.
- All page text uses Pretendard (jsDelivr CDN).
- Hero image `hero-family.webp` is an AI-generated photo supplied by the clinic, background removed
  locally (rembg, BiRefNet portrait model). It must not be presented as real patients.
- The gallery reception photo (`reception-light.jpg`) was perspective-corrected: the original had about a 1.5° slope
  along the desk and floor.

## Common edits

- **Hours**: update the table in `#hours` in `index.html` *and* the `SCHEDULE` object in `assets/js/main.js`
  (minutes from midnight), plus the quick-info box and footer text.
- **Add gallery photos**: resize to about 1600px on the long side, save to `assets/img/clinic/`, and copy a
  `<figure class="g-item">` inside `.gallery`. Add `g-wide` (2x2) or `g-tall` (1x2) for bigger tiles.

## Content policy

Page text is limited to what the clinic supplied: name, address, hours, the doctor's titles, career,
society roles and publications. Do not add claims about treatments, results or specialties without
the doctor's approval (의료법 제56조, medical advertising rules).

## To do

- Phone number / reservation link (not yet provided)
- Confirm the map pin (see Location below)

## Location

The map is a Google Maps embed searching for `서울특별시 강남구 테헤란로 403 리치타워`.
If the pin lands on the wrong building, right-click the building in Google Maps, copy the
coordinates, and replace the `q=` value in the iframe `src` with `37.xxxx,127.xxxx`.

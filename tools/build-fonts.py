"""Build the YonseiB (연세제목체) web font subset used for headings.

The source TTF ships with a broken final 'loca' entry, which strict parsers
(fontTools, browser font sanitizers) reject. This script repairs it, then
subsets the font to the characters that appear in index.html and writes WOFF2.

Usage:  python3 tools/build-fonts.py path/to/YonseiB.ttf
Re-run it after editing headings so new characters are included.
"""
import sys, re, html, pathlib
from fontTools.ttLib import TTFont
from fontTools import subset

root = pathlib.Path(__file__).resolve().parent.parent
src = sys.argv[1]

font = TTFont(src, lazy=True)
glyf_len = len(font.reader['glyf'])
loca = font['loca']
offsets = list(loca)
fixed = 0
for i in range(len(offsets) - 1, 0, -1):
    if offsets[i] < offsets[i - 1] or (i == len(offsets) - 1 and offsets[i] == 0):
        offsets[i] = glyf_len
        fixed += 1
    else:
        break
loca.locations = offsets
font = TTFont(src)  # reload eagerly with patched loca below
font['loca'].locations = offsets
font['glyf']  # force decompile with the repaired offsets
print(f'repaired {fixed} loca entries')

text = html.unescape(re.sub(r'<[^>]+>', ' ', (root / 'index.html').read_text(encoding='utf-8')))
chars = set(text) | set('0123456789~·,.()')
opts = subset.Options()
opts.flavor = 'woff2'
opts.layout_features = ['*']
opts.name_IDs = ['*']
sub = subset.Subsetter(opts)
sub.populate(text=''.join(sorted(chars)))
sub.subset(font)
out = root / 'assets' / 'fonts' / 'YonseiB-subset.woff2'
out.parent.mkdir(parents=True, exist_ok=True)
font.flavor = 'woff2'
font.save(out)
print(f'wrote {out.relative_to(root)} ({out.stat().st_size // 1024} KB, {len(chars)} chars)')

import os, sys
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib import instancer

BASE = os.path.dirname(os.path.abspath(__file__)) + '/fonts'
OUT  = BASE + '/built'
os.makedirs(OUT, exist_ok=True)

def r(spec):
    out = set()
    for part in spec.replace('U+', '').split(','):
        part = part.strip()
        if '-' in part:
            a, b = part.split('-'); out |= set(range(int(a, 16), int(b, 16) + 1))
        else:
            out.add(int(part, 16))
    return out

LATIN = r('0000-00FF,0131,0152-0153,02BB-02BC,02C6,02DA,02DC,0304,0308,0329,'
          '2000-206F,20AC,2122,2191,2193,2212,2215,FEFF,FFFD') | {0x2192}
LATIN_EXT = r('0100-02BA,02BD-02C5,02C7-02CC,02CE-02D7,02DD-02FF,0304,0308,0329,'
              '1D00-1DBF,1E00-1E9F,1EF2-1EFF,2020,20A0-20AB,20AD-20C0,2113,'
              '2C60-2C7F,A720-A7FF')

JOBS = [
    ('SourceSerif4-full.ttf', 'SourceSerif4', (400, 600), 24),
    ('Inter-full.ttf',        'Inter',        (400, 500), 14),
]

KEEP_OPSZ_VARIABLE = os.environ.get('KEEP_OPSZ') == '1'

total = 0
for src, name, (lo, hi), opsz_default in JOBS:
    for label, codepoints in (('latin', LATIN), ('latin-ext', LATIN_EXT)):
        ft = TTFont(os.path.join(BASE, src))
        cmap = ft.getBestCmap()
        wanted = sorted(c for c in codepoints if c in cmap)

        opts = subset.Options()
        opts.name_IDs = ['*']
        opts.name_legacy = True
        opts.notdef_outline = False
        opts.recalc_bounds = True
        opts.drop_tables += ['DSIG']
        s = subset.Subsetter(options=opts)
        s.populate(unicodes=wanted)
        s.subset(ft)

        limits = {'wght': (lo, 400, hi)}
        if not KEEP_OPSZ_VARIABLE:
            limits['opsz'] = opsz_default
        instancer.instantiateVariableFont(ft, limits, inplace=True, updateFontNames=False)

        ft.flavor = 'woff2'
        path = os.path.join(OUT, f'{name}-{label}.woff2')
        ft.save(path)
        sz = os.path.getsize(path)
        total += sz
        print(f'{name}-{label}.woff2'.ljust(32), f'{sz:7,} B', f'glyphs={ft["maxp"].numGlyphs}',
              'axes=' + str([(a.axisTag, a.minValue, a.maxValue) for a in ft['fvar'].axes]))
print(f'\nTOTAL {total:,} B  ({total/1024:.1f} KiB)   [KEEP_OPSZ={KEEP_OPSZ_VARIABLE}]')

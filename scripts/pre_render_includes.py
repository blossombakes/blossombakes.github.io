#!/usr/bin/env python3
"""
Simple pre-render script: inlines `assets/includes/header.html` and `assets/includes/footer.html`
into top-level HTML files and writes the result to `dist/`.

Usage: python3 scripts/pre_render_includes.py
"""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INCLUDES_DIR = ROOT / 'assets' / 'includes'
DIST = ROOT / 'dist'

def load_include(name):
    p = INCLUDES_DIR / f"{name}.html"
    if not p.exists():
        return ''
    return p.read_text(encoding='utf-8')

def process_file(path, header_html, footer_html):
    content = path.read_text(encoding='utf-8')
    content = content.replace('<div data-include="header"></div>', header_html)
    content = content.replace('<div data-include="footer"></div>', footer_html)
    return content

def main():
    header_html = load_include('header')
    footer_html = load_include('footer')

    DIST.mkdir(parents=True, exist_ok=True)

    for f in ROOT.iterdir():
        if f.is_file() and f.suffix.lower() == '.html':
            out = process_file(f, header_html, footer_html)
            target = DIST / f.name
            target.write_text(out, encoding='utf-8')
            print(f'Wrote {target}')

if __name__ == '__main__':
    main()

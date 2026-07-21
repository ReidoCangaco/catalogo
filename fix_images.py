from pathlib import Path
import re

script_path = Path('script.js')
text = script_path.read_text(encoding='utf-8')
out_dir = Path('public/img')
out_dir.mkdir(parents=True, exist_ok=True)

pattern = re.compile(r'image:\s*"(https?://[^\"]+)"')
urls = pattern.findall(text)

for i, url in enumerate(urls, 1):
    name = f'produto{i}.svg'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="960" height="960" viewBox="0 0 960 960">
  <rect width="960" height="960" fill="#0f172a"/>
  <rect x="56" y="56" width="848" height="848" rx="44" fill="#111827" stroke="#38bdf8" stroke-width="12"/>
  <circle cx="730" cy="240" r="96" fill="#22c55e" opacity="0.95"/>
  <path d="M270 740c54-152 170-242 332-242 76 0 142 20 188 54" stroke="#f8fafc" stroke-width="24" fill="none" stroke-linecap="round"/>
  <text x="480" y="470" text-anchor="middle" font-family="Arial, sans-serif" font-size="56" font-weight="700" fill="#f8fafc">Produto {i}</text>
  <text x="480" y="540" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="#cbd5e1">Imagem local para Vercel</text>
</svg>'''
    (out_dir / name).write_text(svg, encoding='utf-8')

for i, url in enumerate(urls, 1):
    replacement = f'/img/produto{i}.svg'
    if url in text:
        text = text.replace(url, replacement, 1)

script_path.write_text(text, encoding='utf-8')
print(f'Created {len(urls)} local image files and updated references.')

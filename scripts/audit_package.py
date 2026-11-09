#!/usr/bin/env python3
"""Validate portability, local references and archived example hashes."""
from pathlib import Path
import hashlib,json,re,sys
root=Path(__file__).resolve().parents[1]; errors=[];count=0
for p in root.rglob('*'):
 if not p.is_file() or any(x in {'.git','.hyperframes','node_modules','__pycache__'} for x in p.parts):continue
 if p.is_symlink():errors.append(f'Symlink: {p.relative_to(root)}')
 if p.stat().st_size>=100*1024*1024:errors.append(f'Over GitHub file limit: {p.relative_to(root)}')
 if p.name.startswith('.env') and p.name!='.env.example':errors.append(f'Environment file: {p.relative_to(root)}')
 if p.suffix in {'.md','.json','.html','.js','.mjs','.py','.yaml'}:
  s=p.read_text()
  if re.search('/'+'Users'+r'/[^/]+/',s):errors.append(f'Absolute personal path: {p.relative_to(root)}')
  if re.search(r'gh[pousr]_[A-Za-z0-9]{20,}',s):errors.append(f'Credential-shaped token: {p.relative_to(root)}')
  if p.suffix=='.md':
   for href in re.findall(r'\]\(([^)]+)\)',s):
    if '://' in href or href.startswith('#'):continue
    target=href.split('#')[0]
    if target and not (p.parent/target).exists():errors.append(f'Broken link in {p.relative_to(root)}: {target}')
  count+=1
for p in (root/'examples').glob('*/manifest.json'):
 obj=json.loads(p.read_text());actual=hashlib.sha256((p.parent/'preview.mp4').read_bytes()).hexdigest()
 if actual!=obj['sha256']:errors.append(f'Changed approved video: {p.parent.name}')
print(json.dumps({'text_files_checked':count,'errors':errors},indent=2));sys.exit(bool(errors))

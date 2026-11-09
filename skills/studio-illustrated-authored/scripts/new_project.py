#!/usr/bin/env python3
"""Copy the approved example into a new working directory without modifying it."""
from pathlib import Path
import argparse,shutil,json,uuid
p=argparse.ArgumentParser();p.add_argument('destination');a=p.parse_args()
source=Path(__file__).resolve().parents[1]/'assets/template';dest=Path(a.destination).expanduser().resolve()
if dest.exists():p.error('Destination already exists; choose an empty new path.')
shutil.copytree(source,dest)
(dest/'meta.json').write_text(json.dumps({'id':str(uuid.uuid4()),'name':dest.name},indent=2)+'\n')
print(dest)
print('Copied approved example. Adapt its story and assets to the new brief before presenting it as a new film.')

# -*- coding: utf-8 -*-
"""
build_pseint_course.py
Compila los 40 temas del curso de Lógica de Programación y Algoritmos en PSeInt
generando pseint/js/topics-data.js y los archivos fuente en pseint/raw_examples/*.psc.
"""
import os
import json
import sys

# Ensure repository root is in python path
repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if repo_root not in sys.path:
    sys.path.insert(0, repo_root)

from scripts.pseint_data_part1 import PSEINT_TOPICS_PART1
from scripts.pseint_data_part2 import PSEINT_TOPICS_PART2
from scripts.pseint_data_part3 import PSEINT_TOPICS_PART3
from scripts.pseint_data_part4 import PSEINT_TOPICS_PART4

def build_course():
    all_topics = (
        PSEINT_TOPICS_PART1 +
        PSEINT_TOPICS_PART2 +
        PSEINT_TOPICS_PART3 +
        PSEINT_TOPICS_PART4
    )
    
    print(f"Total de temas a compilar: {len(all_topics)}")
    
    # Validar unicidad de ids y slugs
    ids = set()
    slugs = set()
    for t in all_topics:
        if t["id"] in ids:
            raise ValueError(f"ID duplicado detectado: {t['id']}")
        if t["slug"] in slugs:
            raise ValueError(f"Slug duplicado detectado: {t['slug']}")
        ids.add(t["id"])
        slugs.add(t["slug"])
    
    pseint_dir = os.path.join(repo_root, "pseint")
    js_dir = os.path.join(pseint_dir, "js")
    raw_dir = os.path.join(pseint_dir, "raw_examples")
    
    os.makedirs(js_dir, exist_ok=True)
    os.makedirs(raw_dir, exist_ok=True)
    
    # 1. Escribir pseint/js/topics-data.js
    topics_json = json.dumps(all_topics, ensure_ascii=False, indent=2)
    js_content = f"// Base de datos de temas de Lógica de Programación en PSeInt\n// Total de temas: {len(all_topics)}\nwindow.TOPICS_DATA = {topics_json};\n"
    
    topics_data_path = os.path.join(js_dir, "topics-data.js")
    with open(topics_data_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Generado exitosamente: {topics_data_path} ({os.path.getsize(topics_data_path)} bytes)")
    
    # 2. Escribir los 40 archivos .psc en pseint/raw_examples/
    for t in all_topics:
        psc_filename = f"{t['slug']}.psc"
        psc_path = os.path.join(raw_dir, psc_filename)
        with open(psc_path, "w", encoding="utf-8") as f:
            f.write(t["code"] + "\n")
            
    print(f"Generados exitosamente {len(all_topics)} archivos .psc en {raw_dir}")

if __name__ == "__main__":
    build_course()

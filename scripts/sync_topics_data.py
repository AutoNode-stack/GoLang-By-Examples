# -*- coding: utf-8 -*-
import json
import os

def sync():
    with open("js/topics-data.js", "r", encoding="utf-8") as f:
        text = f.read()

    # Find boundaries of GO_TOPICS
    start_tag = "const GO_TOPICS = ["
    start_idx = text.find(start_tag)
    if start_idx == -1:
        raise ValueError("const GO_TOPICS = [ not found!")

    start_arr = text.find("[", start_idx)
    end_arr = text.rfind("];", start_arr)
    if end_arr == -1:
        raise ValueError("Closing ]; for GO_TOPICS not found!")

    prefix = text[:start_arr]
    trailer = text[end_arr+1:]

    topics_json_str = text[start_arr:end_arr+1]
    topics = json.loads(topics_json_str)
    print(f"Loaded {len(topics)} topics from topics-data.js")

    updated_count = 0
    for item in topics:
        slug = item["slug"]
        go_path = f"raw_examples/{slug}.go"
        sh_path = f"raw_examples/{slug}.sh"

        if os.path.exists(go_path):
            with open(go_path, "r", encoding="utf-8") as f:
                item["code"] = f.read()
                updated_count += 1
        
        if os.path.exists(sh_path):
            with open(sh_path, "r", encoding="utf-8") as f:
                item["output"] = f.read()

    print(f"Updated code and output for {updated_count} topics")

    new_topics_json = json.dumps(topics, ensure_ascii=False, indent=2)
    new_text = prefix + new_topics_json + trailer

    with open("js/topics-data.js", "w", encoding="utf-8") as f:
        f.write(new_text)

    print("js/topics-data.js successfully written!")
    print(f"New file size: {os.path.getsize('js/topics-data.js') / 1024:.2f} KB")

if __name__ == "__main__":
    sync()

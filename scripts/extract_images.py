import fitz
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
pdf = fitz.open(str(ROOT / "assets" / "doc_export.pdf"))
out_dir = ROOT / "assets" / "doc_images"
out_dir.mkdir(exist_ok=True)

count = 0
for page_index in range(len(pdf)):
    page = pdf[page_index]
    images = page.get_images(full=True)
    for img_index, img in enumerate(images):
        xref = img[0]
        base = pdf.extract_image(xref)
        ext = base["ext"]
        w, h = base.get("width", 0), base.get("height", 0)
        if w < 200 or h < 200:
            continue  # skip tiny icons/logos if any
        count += 1
        out_path = out_dir / f"img_{count:02d}_p{page_index+1}.{ext}"
        out_path.write_bytes(base["image"])
        print(f"saved {out_path.name}  {w}x{h}")

print(f"Total extracted: {count}")

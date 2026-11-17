from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent.parent
SRC = ROOT / "assets" / "doc_images"
OUT = ROOT / "public" / "images" / "ai-bubble"
OUT.mkdir(parents=True, exist_ok=True)

# (filename, crop_box or None for full image, output_name)
CROPS = [
    ("img_01_p2.png", (0, 420, 1712, 1300), "quote_gartner.png"),
    ("img_02_p3.png", (0, 0, 2026, 950), "quote_bcg.png"),
    ("img_03_p3.png", None, "quote_alphabet.png"),
    ("img_04_p4.png", None, "quote_ledger.png"),
    ("img_05_p4.png", (0, 0, 1530, 780), "quote_burry.png"),
    ("img_06_p5.png", None, "quote_goldman.png"),
    ("img_07_p5.png", (690, 220, 2048, 950), "quote_metabond.png"),
]

for src_name, box, out_name in CROPS:
    img = Image.open(SRC / src_name)
    if box:
        img = img.crop(box)
    img.save(OUT / out_name)
    print(f"{src_name} -> {out_name}  {img.size}")

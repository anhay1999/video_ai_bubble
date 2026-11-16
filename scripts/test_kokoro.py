from pathlib import Path
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
kokoro = Kokoro(str(ROOT / "models" / "kokoro-v1.0.onnx"), str(ROOT / "models" / "voices-v1.0.bin"))

text = "Last quarter, Nvidia reported a number human financial history has never seen before."

for voice in ["am_michael", "am_adam", "bm_george", "am_onyx", "am_echo"]:
    try:
        samples, sr = kokoro.create(text, voice=voice, speed=1.0, lang="en-us")
        out = ROOT / "out" / f"voice_test_{voice}.wav"
        sf.write(str(out), samples, sr)
        print(f"OK {voice} -> {out} ({len(samples)/sr:.2f}s)")
    except Exception as e:
        print(f"FAIL {voice}: {e}")

#!/usr/bin/env python3
import os
import sys
import json
import subprocess

# ---------- OUTPUT CHANNEL (Watson) ----------
def speak_watson(text: str, out_file: str = "say.mp3") -> None:
    apikey = os.environ.get("IBM_TTS_APIKEY")
    url = os.environ.get("IBM_TTS_URL")

    if not apikey or not url:
        raise SystemExit(
            "Missing environment variables.\n"
            'Run:\nexport IBM_TTS_APIKEY="..."\nexport IBM_TTS_URL="..."'
        )

    endpoint = url.rstrip("/") + "/v1/synthesize"
    payload = {"text": text}

    cmd = [
        "curl",
        "-X", "POST",
        "-u", f"apikey:{apikey}",
        "--header", "Content-Type: application/json",
        "--header", "Accept: audio/mp3",
        "--data", json.dumps(payload),
        "--output", out_file,
        endpoint,
    ]

    subprocess.run(cmd, check=True)
    subprocess.run(["afplay", out_file], check=True)

# ---------- INPUT HELPER ----------
def ask_until_valid(prompt: str, valid: set[str]) -> str:
    """Ask user in terminal until they type one of the valid choices."""
    while True:
        answer = input(prompt).strip()
        if answer in valid:
            return answer
        speak_watson(f"I heard {answer}. That is not an option. Please try again.")
        print(f"(Valid options: {', '.join(sorted(valid))})")

# ---------- INTERACTION ----------
def main():
    # Stage 0: require user to start with "hello"
    if len(sys.argv) < 2:
        print('Usage: ./bankbot.py hello')
        raise SystemExit(1)

    start = sys.argv[1].strip().lower()
    if start != "hello":
        speak_watson("To begin, please say hello.")
        print('Try: ./bankbot.py hello')
        raise SystemExit(1)

    # Stage 1
    speak_watson(
        "Hello to you too. I am an interactive voice response machine. "
        "How are you today? For good press 1. For bad press 2."
    )
    mood = ask_until_valid("Press 1 for good, 2 for bad: ", {"1", "2"})

    # Stage 2 (based on mood)
    if mood == "1":
        speak_watson(
            "I'm glad to hear that. I am good too, thanks for asking. "
            "Please confirm you are not a robot by pressing 1, "
            "or admit you are a robot by pressing 2."
        )
    else:
        speak_watson(
            "I'm sorry to hear that. I will now place you on a brief emotional hold. "
            "Please confirm you are not a robot by pressing 1, "
            "or admit you are a robot by pressing 2."
        )

    captcha = ask_until_valid("Press 1 for human, 2 for robot: ", {"1", "2"})

    # Stage 3: end for now (placeholder)
    if captcha == "1":
        speak_watson("Thank you. Your humanity has been recorded. Goodbye.")
    else:
        speak_watson("Thank you. Your honesty has been recorded. Goodbye.")

if __name__ == "__main__":
    main()

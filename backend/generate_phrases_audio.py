from gtts import gTTS
import os

# List of phrases
phrases = [
    "Hello",
    "Goodbye",
    "I love you",
    "Thank you",
    "Yes",
    "No",
    "Please",
    "Sorry"
]

# Output directory
output_folder = "phrases_audio"
os.makedirs(output_folder, exist_ok=True)

# Generate audio files
for phrase in phrases:
    tts = gTTS(text=phrase, lang='en')
    # Replace spaces with underscores for file naming
    filename = f"{phrase.replace(' ', '_')}.mp3"
    tts.save(os.path.join(output_folder, filename))
    print(f"Saved: {filename}")

print("✅ All phrase audio files generated successfully!")

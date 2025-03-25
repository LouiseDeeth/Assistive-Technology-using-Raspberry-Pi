from gtts import gTTS
import os

# Create a folder to store the audio files
output_folder = "alphabet_audio"
os.makedirs(output_folder, exist_ok=True)

# English alphabet letters
alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

for letter in alphabet:
    text = letter  # The letter to speak
    tts = gTTS(text=text, lang='en')
    filename = f"{output_folder}/{letter}.mp3"
    tts.save(filename)
    print(f"✅ Saved {filename}")

print("\n✅ All alphabet audio files generated successfully!")

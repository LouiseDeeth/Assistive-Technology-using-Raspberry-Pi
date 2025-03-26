from gtts import gTTS
import os

# Folder to save the audio files
output_folder = "numbers_audio"
os.makedirs(output_folder, exist_ok=True)

# Generate audio for numbers 0 to 9
for number in range(10):
    text = str(number)
    tts = gTTS(text=text, lang='en')
    file_path = os.path.join(output_folder, f"{number}.mp3")
    tts.save(file_path)
    print(f"Generated {file_path}")

print("✅ Number audio files generated successfully!")

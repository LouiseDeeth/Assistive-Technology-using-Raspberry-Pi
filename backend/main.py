from camera import Camera
from translator import Translator

def main():
    """Main function for sign language translation."""
    print("Sign Language Translation")
    print("========================")
    
    # Initialize the camera
    print("\n1. Initializing camera...")
    camera = Camera()
    if not camera.initialize():
        print("Failed to initialize camera. Exiting.")
        return
    
    # Warm up the camera
    camera.warm_up()
    
    # Initialize the translator
    print("\n2. Initializing translator...")
    translator = Translator()
    
    try:
        while True:
            # Capture an image
            print("\n3. Capture a sign language gesture")
            result = camera.capture_image(countdown=3)
            
            if result is None:
                print("Failed to capture image.")
                continue
            
            frame, filename = result
            
            # Process the image
            processed_frame = camera.process_image(frame)
            
            # Translate the sign language
            print("\n4. Translating sign language...")
            translation_result = translator.translate(processed_frame)
            
            # Display the result
            print("\n=== TRANSLATION RESULT ===")
            print(f"Sign Language Detected: {translation_result['text']}")
            print(f"Confidence: {translation_result['confidence']:.2f}")
            print("===========================")
            
            # Ask if the user wants to continue
            choice = input("\nTranslate another gesture? (y/n): ").strip().lower()
            if choice != 'y':
                break
    
    except KeyboardInterrupt:
        print("\nOperation cancelled by user.")
    finally:
        # Clean up resources
        print("\nCleaning up resources...")
        camera.release()
    
    print("\nSign language translation complete.")

if __name__ == "__main__":
    main()

# import opencv, base64, numpy
import cv2
import base64

def get_frames():
    while True: # loop while true and read feed from camera
        success, frame = camera.read()
        if not success:
            break
        else:
            _, buffer = cv2.imencode(".jpg", frame)
            frame_bytes = buffer.tobytes()
            yield(b"--frame\r\n"
                  b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")




# image show camera feed

# press key to exit

# release and destroy windows

# resize image 

# convert to base64 for api usage
 
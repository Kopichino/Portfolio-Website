# Volume-Hand-Control

Control your system volume using hand gestures—with no mouse or keyboard required!

---

##  Overview

**Volume-Hand-Control** is a computer-vision Python application that lets you adjust your PC’s volume using simple hand gestures. It uses OpenCV for video processing, MediaPipe for hand landmark detection, and a custom `HandTrackingModule` to manage landmark detection in a clean, modular fashion.

### How It Works
1. Your webcam captures video.
2. The `HandTrackingModule` detects your hand and its landmarks.
3. The distance between the tip of your thumb and index finger is measured.
4. That distance is mapped to a volume level.
5. Volume is updated smoothly based on your gesture in real time.

---

##  Features

- **Real-time hand detection** using MediaPipe.
- **Volume control** based on thumb–index finger distance.
- **Modular design** with `HandTrackingModule.py` for easy reuse.
- Works with minimal setup—just your webcam and a few Python libraries.

---

##  Demo

*(Optional: Insert a GIF or screenshot of your application in action here)*

---

##  Getting Started

### Prerequisites
Make sure you have Python 3.7+ installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kopichino/Volume-Hand-Control.git
   cd Volume-Hand-Control

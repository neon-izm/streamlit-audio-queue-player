# Streamlit Audio Queue Player

This is a custom Streamlit component that plays audio files sequentially. It maintains an internal queue on the frontend so that when you send audio (as a base64 string) from Streamlit, they are played one after another.

## Features

- **Internal Queue:** New audio items are added to a queue and played sequentially.
- **Persistent State:** The component uses a fixed key so that its internal state is preserved across Streamlit reruns.
- **Easy Integration:** Simply call `audio_player(audio, format="audio/wav", key="...")` from your Streamlit app.
- **Automatic Refresh Example:** An included sample app automatically refreshes every 1 second.

## Installation

After publishing, you can install it via pip:

```bash
pip install streamlit-audio-player

## dummy.wav

https://www3.jvckenwood.com/pro/soft_dl/pa-d_message/aisatu.html 
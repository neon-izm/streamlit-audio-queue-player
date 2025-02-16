import streamlit as st
import base64
import time
from streamlit_audio_queue_player import audio_player

st.title("Demo: Alternate Dummy Audio Files")

if "toggle" not in st.session_state:
    st.session_state["toggle"] = True
if "new_audio" not in st.session_state:
    st.session_state["new_audio"] = None
if "clear_key" not in st.session_state:
    st.session_state["clear_key"] = 0

if st.button("Add Dummy Audio"):
    try:
        # toggle の状態に応じて、dummy1.wav または dummy2.wav を読み込む
        filename = "dummy1.wav" if st.session_state["toggle"] else "dummy2.wav"
        with open(filename, "rb") as f:
            audio_bytes = f.read()
        st.session_state["new_audio"] = base64.b64encode(audio_bytes).decode()
        # toggle の値を反転
        st.session_state["toggle"] = not st.session_state["toggle"]
    except Exception as e:
        st.error(f"Error loading dummy audio: {e}")

if st.button("Clear Audio Queue"):
    st.session_state["clear_key"] += 1

# 1つのコンポーネント呼び出しで、最新の new_audio と clear_key を反映
audio_player(
    st.session_state["new_audio"],
    format="audio/wav",
    clear_key=st.session_state["clear_key"],
    key="audio_player"
)
# 一度渡した新規音声はリセット
st.session_state["new_audio"] = None

st.write("Audio queued items will play sequentially.")

time.sleep(1)
st.rerun()

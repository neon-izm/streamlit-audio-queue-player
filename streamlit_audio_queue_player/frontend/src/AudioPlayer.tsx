import React, {useState, useEffect, useRef} from "react";
import {withStreamlitConnection} from "streamlit-component-lib";

interface AudioPlayerArgs {
    audio?: string | null;
    format?: string;
    clearKey?: number;
}

const AudioPlayer = (props: { args: AudioPlayerArgs }) => {
    // Streamlit から渡されるプロパティは props.args にまとめられる
    const {audio, format = "audio/wav", clearKey} = props.args;

    // 内部キュー：音声の data URL 文字列リスト
    const [queue, setQueue] = useState<string[]>([]);
    // 再生中の状態
    const [isPlaying, setIsPlaying] = useState(false);
    // <audio> 要素への参照
    const audioRef = useRef<HTMLAudioElement>(null);
    // 重複追加防止用：前回の audio 値を記憶
    const lastAudioRef = useRef<string | null>(null);

    // 新しい音声が渡された場合、前回と異なればキューに追加
    useEffect(() => {
        if (audio && audio !== lastAudioRef.current) {
            lastAudioRef.current = audio;
            const src = `data:${format};base64,${audio}`;
            setQueue((prev) => [...prev, src]);
        }
    }, [audio, format]);

    // キューに項目があり、再生中でなければ次を再生
    useEffect(() => {
        if (!isPlaying && queue.length > 0) {
            playNext();
        }
    }, [queue, isPlaying]);

    // clearKey が更新されたら、再生中の音声を停止してキューをクリア
    const prevClearKeyRef = useRef<number | undefined>(undefined);
    useEffect(() => {
        if (clearKey !== undefined && clearKey !== prevClearKeyRef.current) {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setQueue([]);
            setIsPlaying(false);
            lastAudioRef.current = null;
        }
        prevClearKeyRef.current = clearKey;
    }, [clearKey]);

    const playNext = () => {
        if (queue.length === 0) {
            setIsPlaying(false);
            return;
        }
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.src = queue[0];
            audioRef.current
                .play()
                .catch((err) => console.error("Audio playback error:", err));
        }
    };

    // 再生終了時の処理：先頭の要素を削除して次を再生
    const handleEnded = () => {
        setQueue((prev) => {
            const newQueue = prev.slice(1);
            // キューが空になったら lastAudioRef をリセット
            if (newQueue.length === 0) {
                lastAudioRef.current = null;
            }
            return newQueue;
        });
        setIsPlaying(false);
    };


    return <audio ref={audioRef} onEnded={handleEnded}/>;
};

export default withStreamlitConnection(AudioPlayer);

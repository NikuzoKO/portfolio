import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
    const [playing, setPlaying] = useState(false);
    const [hasAudio] = useState(false); // Set to true when BGM is added
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggle = () => {
        if (!hasAudio) return;
        if (playing) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setPlaying(!playing);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 right-4 z-50"
        >
            <button
                onClick={toggle}
                className={`border border-purple-mid px-3 py-2 rounded text-xs font-mono transition-all ${
                    hasAudio
                        ? "text-purple-light hover:bg-purple-mid hover:text-white cursor-pointer"
                        : "text-purple-mid opacity-40 cursor-not-allowed"
                }`}
                title={hasAudio ? "Toggle BGM" : "BGM coming soon..."}
            >
                {playing ? "♪ BGM ON" : "♪ BGM OFF"}
            </button>
            {hasAudio && (
                <audio ref={audioRef} loop src="/audio/bgm.mp3" />
            )}
        </motion.div>
    );
}

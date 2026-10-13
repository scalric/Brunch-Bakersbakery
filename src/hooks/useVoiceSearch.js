import { useState } from "react";

// Voice search only exists in browsers that ship the Web Speech API.
const Recognition = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

// `onResult(text)` receives the recognised phrase. `supported` is false where the API is missing, so callers can hide the button.
export default function useVoiceSearch(onResult) {
  const [listening, setListening] = useState(false);

  const listen = () => {
    if (!Recognition || listening) return;
    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onresult = (e) => onResult(e.results[0][0].transcript);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    setListening(true);
    try {
      recognition.start();
    } catch {
      setListening(false);
    }
  };

  return { supported: Boolean(Recognition), listening, listen };
}

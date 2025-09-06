"use client";

import { useState, useRef, useEffect } from "react";
import { MicIcon, MicOffIcon, SquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  
  start: () => void;
  stop: () => void;
  
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
 onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor | undefined;
    webkitSpeechRecognition: SpeechRecognitionConstructor | undefined;
  }
}

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  onListeningChange?: (isListening: boolean) => void;
}

export function VoiceInput({ onTranscript, onListeningChange }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      
      if (transcript) {
        onTranscript(transcript);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      if (onListeningChange) onListeningChange(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (onListeningChange) onListeningChange(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onListeningChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (onListeningChange) onListeningChange(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      if (onListeningChange) onListeningChange(true);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <TooltipIconButton
      tooltip={isListening ? "Stop listening" : "Start voice input"}
      side="top"
      onClick={toggleListening}
      variant={isListening ? "default" : "ghost"}
      size="icon"
      className="aui-voice-input-button size-[34px] rounded-full"
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
    >
      {isListening ? (
        <SquareIcon className="aui-voice-input-icon size-4" />
      ) : (
        <MicIcon className="aui-voice-input-icon size-4" />
      )}
    </TooltipIconButton>
  );
}
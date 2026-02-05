import { useState } from 'react';

export function useTTS() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = async (text: string) => {
    setIsLoading(true);
    setError(null);
    let objectUrl: string | null = null;
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const blob = await response.blob();
      objectUrl = URL.createObjectURL(blob);
      const audio = new Audio(objectUrl);
      const cleanup = () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = null;
      };
      audio.addEventListener('ended', cleanup, { once: true });
      audio.addEventListener('error', cleanup, { once: true });
      await audio.play();
    } catch (err: unknown) {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return { speak, isLoading, error };
}

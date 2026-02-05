import { useMutation } from '@tanstack/react-query';
import type { GenerateHistoricalNameRequest, GenerateHistoricalNameResponse } from '@/types/api';

export function useGenerateHistoricalName() {
  return useMutation<GenerateHistoricalNameResponse, Error, GenerateHistoricalNameRequest>({
    mutationFn: async (params) => {
      const response = await fetch('/api/generate/historical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate historical name');
      }
      
      return response.json();
    },
  });
}

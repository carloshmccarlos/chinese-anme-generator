import { useMutation } from '@tanstack/react-query';
import type { GenerateModernNameRequest, GenerateModernNameResponse } from '@/types/api';

export function useGenerateModernName() {
  return useMutation<GenerateModernNameResponse, Error, GenerateModernNameRequest>({
    mutationFn: async (params) => {
      const response = await fetch('/api/generate/modern', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate name');
      }
      
      return response.json();
    },
  });
}

'use client';

import { useEffect } from 'react';
import Button from '../components/atoms/Button';

export default function ErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
      <p className="mb-6 text-red-500">{error.message}</p>
      <Button onClick={reset}>再試行</Button>
    </div>
  );
} 
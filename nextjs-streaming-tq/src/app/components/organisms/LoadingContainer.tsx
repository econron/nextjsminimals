'use client';

import LoadingSpinner from '../atoms/LoadingSpinner';
import SkeletonList from '../molecules/SkeletonList';

export default function LoadingContainer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Loading posts...</h1>
      
      {/* スピナー */}
      <LoadingSpinner />

      {/* スケルトンローディング */}
      <div className="mt-8 w-full max-w-md">
        <SkeletonList count={5} />
      </div>
    </div>
  );
} 
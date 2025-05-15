'use client';

import SkeletonItem from '../atoms/SkeletonItem';

type SkeletonListProps = {
  count?: number;
};

export default function SkeletonList({ count = 5 }: SkeletonListProps) {
  return (
    <ul className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </ul>
  );
} 
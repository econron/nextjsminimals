'use client';

type SkeletonItemProps = {
  width?: string;
};

export default function SkeletonItem({ width = 'w-3/4' }: SkeletonItemProps) {
  return (
    <li className={`h-4 bg-gray-200 rounded ${width} animate-pulse`}></li>
  );
} 
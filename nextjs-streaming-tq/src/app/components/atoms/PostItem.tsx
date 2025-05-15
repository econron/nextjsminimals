'use client';

type PostItemProps = {
  id: number;
  title: string;
};

export default function PostItem({ id, title }: PostItemProps) {
  return (
    <li className="py-2 border-b border-gray-200 last:border-0">
      {title}
    </li>
  );
}

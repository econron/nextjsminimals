'use client';

import { ReactNode } from 'react';

type PostsPageTemplateProps = {
  title: string;
  children: ReactNode;
};

export default function PostsPageTemplate({ title, children }: PostsPageTemplateProps) {
  return (
    <main className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <div className="mt-4">
        {children}
      </div>
    </main>
  );
} 
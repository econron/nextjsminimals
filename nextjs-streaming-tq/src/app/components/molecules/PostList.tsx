'use client';

import PostItem from '../atoms/PostItem';

export type Post = {
  id: number;
  title: string;
};

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="space-y-2">
      {posts.map(post => (
        <PostItem key={post.id} id={post.id} title={post.title} />
      ))}
    </ul>
  );
}

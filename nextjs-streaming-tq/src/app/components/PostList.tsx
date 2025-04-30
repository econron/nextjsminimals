'use client';

type Post = {
    id: number;
    title: string;
}

type PostListProps = {
    posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}

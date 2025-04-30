'use client';
import { useQuery } from '@tanstack/react-query';

async function fetchPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

export default function ClientPostList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <ul>
            {data.map((p: { id: number; title: string }) => {
                return <li key={p.id}>{p.title}</li>
            })}
        </ul>
    )
}


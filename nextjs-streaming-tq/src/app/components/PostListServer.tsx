import PostList from './PostList';

async function fetchPosts() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }
    return res.json();
}

export default async function PostListServer() {
    const posts = await fetchPosts();
    return <PostList posts={posts} />;
} 
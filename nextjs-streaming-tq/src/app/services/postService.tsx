import { Post } from '../components/molecules/PostList';

export async function fetchPosts(): Promise<Post[]> {
  // 開発時に確認しやすいよう、遅延を追加
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { 
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return res.json();
}

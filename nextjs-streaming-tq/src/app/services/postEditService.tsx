'use client';

import { Post } from '../components/molecules/PostList';

// メモリ上でデータを管理するためのストア
let postsStore: Post[] = [];

// 初期データをロードする関数
export async function loadPostsToStore(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  const posts = await res.json();
  postsStore = posts;
  return posts;
}

// 全投稿を取得
export function getAllPosts(): Post[] {
  return [...postsStore];
}

// 特定の投稿を取得
export function getPostById(id: number): Post | undefined {
  return postsStore.find(post => post.id === id);
}

// 投稿を更新
export function updatePost(id: number, title: string): Post | null {
  const index = postsStore.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  const updatedPost = { ...postsStore[index], title };
  postsStore[index] = updatedPost;
  return updatedPost;
}

// 投稿を追加
export function addPost(title: string): Post {
  const newId = Math.max(0, ...postsStore.map(p => p.id)) + 1;
  const newPost = { id: newId, title };
  postsStore.push(newPost);
  return newPost;
}

// 投稿を削除
export function deletePost(id: number): boolean {
  const index = postsStore.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  postsStore.splice(index, 1);
  return true;
} 
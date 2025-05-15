'use client';

import { useState, useEffect } from 'react';
import { Post } from '../molecules/PostList';
import PostList from '../molecules/PostList';
import PostEditForm from '../molecules/PostEditForm';
import Button from '../atoms/Button';
import { loadPostsToStore, getAllPosts, updatePost, addPost, deletePost } from '../../services/postEditService';

export default function PostEditContainer() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // 初期データの読み込み
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await loadPostsToStore();
        setPosts(getAllPosts());
      } catch (err) {
        setError('データの読み込みに失敗しました');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // 投稿を更新する処理
  const handleUpdatePost = (title: string) => {
    if (!editingPost) return;
    
    const updated = updatePost(editingPost.id, title);
    if (updated) {
      setPosts(getAllPosts());
      setEditingPost(null);
    } else {
      setError('更新に失敗しました');
    }
  };
  
  // 新しい投稿を追加する処理
  const handleAddPost = (title: string) => {
    const newPost = addPost(title);
    setPosts(getAllPosts());
    setIsAdding(false);
  };
  
  // 投稿を削除する処理
  const handleDeletePost = (id: number) => {
    if (confirm('この投稿を削除してもよろしいですか？')) {
      const success = deletePost(id);
      if (success) {
        setPosts(getAllPosts());
        if (editingPost?.id === id) {
          setEditingPost(null);
        }
      } else {
        setError('削除に失敗しました');
      }
    }
  };
  
  // 編集や新規追加をキャンセルする処理
  const handleCancel = () => {
    setEditingPost(null);
    setIsAdding(false);
  };
  
  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }
  
  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">投稿一覧</h2>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          新規投稿
        </Button>
      </div>
      
      {isAdding && (
        <div className="p-4 border rounded-md mb-6">
          <h3 className="text-lg font-medium mb-4">新規投稿の作成</h3>
          <PostEditForm 
            onSubmit={handleAddPost} 
            onCancel={handleCancel}
          />
        </div>
      )}
      
      {editingPost && (
        <div className="p-4 border rounded-md mb-6">
          <h3 className="text-lg font-medium mb-4">投稿の編集</h3>
          <PostEditForm 
            post={editingPost} 
            onSubmit={handleUpdatePost} 
            onCancel={handleCancel}
          />
        </div>
      )}
      
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center py-8 text-gray-500">投稿がありません</p>
        ) : (
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <span>{post.title}</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => setEditingPost(post)}
                      disabled={!!editingPost || isAdding}
                    >
                      編集
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDeletePost(post.id)}
                      disabled={!!editingPost || isAdding}
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 
'use client';

import { useState, FormEvent } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { Post } from './PostList';

type PostEditFormProps = {
  post?: Post;
  onSubmit: (title: string) => void;
  onCancel?: () => void;
  isLoading?: boolean;
};

export default function PostEditForm({
  post,
  onSubmit,
  onCancel,
  isLoading = false
}: PostEditFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // 入力検証
    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    }
    
    setError('');
    onSubmit(title);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="投稿タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={error}
        placeholder="タイトルを入力"
        disabled={isLoading}
      />
      
      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {post ? '更新' : '作成'}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            キャンセル
          </Button>
        )}
      </div>
    </form>
  );
} 
'use client';

import PostsPageTemplate from '../components/templates/PostsPageTemplate';
import PostEditContainer from '../components/organisms/PostEditContainer';

export default function UpdateExample1() {
  return (
    <PostsPageTemplate title="投稿の編集 (クライアントサイド)">
      <PostEditContainer />
    </PostsPageTemplate>
  );
} 
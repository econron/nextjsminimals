import { Suspense } from 'react';
import PostsPageTemplate from '../components/templates/PostsPageTemplate';
import PostsContainer from '../components/organisms/PostsContainer';
import LoadingContainer from '../components/organisms/LoadingContainer';

export default function Example2() {
  return (
    <PostsPageTemplate title="Posts (SSR + Streaming)">
      <Suspense fallback={<LoadingContainer />}>
        <PostsContainer />
      </Suspense>
    </PostsPageTemplate>
  );
}
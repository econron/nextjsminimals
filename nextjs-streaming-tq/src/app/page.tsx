import { Suspense } from 'react';
import PostsPageTemplate from './components/templates/PostsPageTemplate';
import PostsContainer from './components/organisms/PostsContainer';
import LoadingContainer from './components/organisms/LoadingContainer';

export default function Page() {
  return (
    <PostsPageTemplate title="Post List">
      <Suspense fallback={<LoadingContainer />}>
        <PostsContainer />
      </Suspense>
    </PostsPageTemplate>
  );
}
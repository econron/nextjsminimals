import { Suspense } from 'react';
import PostListServer from './components/PostListServer';

export default function Page() {
  return (
    <main style={{ padding: '20px' }}>
      <h1>Post List</h1>
      <Suspense fallback={<p>Loading!!!...</p>}>
        <PostListServer />
      </Suspense>
    </main>
  );
}
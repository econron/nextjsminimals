import PostsPageTemplate from '../components/templates/PostsPageTemplate';
import LoadingContainer from '../components/organisms/LoadingContainer';

export default function Loading() {
  return (
    <PostsPageTemplate title="投稿の編集 (クライアントサイド)">
      <LoadingContainer />
    </PostsPageTemplate>
  );
} 
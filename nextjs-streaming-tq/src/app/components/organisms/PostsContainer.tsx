import PostList from '../molecules/PostList';
import { fetchPosts } from '../../services/postService';

export default async function PostsContainer() {
  const posts = await fetchPosts();
  
  return <PostList posts={posts} />;
} 
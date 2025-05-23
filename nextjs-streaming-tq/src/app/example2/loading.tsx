import PostsPageTemplate from '../components/templates/PostsPageTemplate';
import LoadingContainer from '../components/organisms/LoadingContainer';

export default function Loading() {
    return (
        <PostsPageTemplate title="Posts (SSR + Streaming)">
            <LoadingContainer />
        </PostsPageTemplate>
    );
}
import ClientPostList from './ClientPostList';

export default async function Example2Page() {
    //　擬似的に2秒遅らせる
    await new Promise(resolve => setTimeout(resolve, 2000));
    return (
        <main style={{ padding: '20px' }}>
            <h1>Example2</h1>
            <p>This is a server-side rendered page.</p>
            <ClientPostList />
        </main>
    );
}
export default async function Example2() {
    // 3秒間の遅延を追加
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const posts: { id: number; title: string }[] = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        { next: { revalidate: 3600 } }
    ).then(res => res.json());
    
    return (
        <main>
            <h1>Posts (SSR + Streaming)</h1>
            <ul>
                {posts.map(p => <li key={p.id}>{p.title}</li>)}
            </ul>
        </main>
    );
}
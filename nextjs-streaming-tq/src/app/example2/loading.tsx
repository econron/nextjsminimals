import styles from './loading.module.css';

export default function Loading() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-8">Loading posts...</h1>
            
            {/* スピナー */}
            <div className={styles.spinner}></div>

            {/* スケルトンローディング */}
            <div className="mt-8 w-full max-w-md">
                <div className="animate-pulse">
                    <ul className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <li key={i} className="h-4 bg-gray-200 rounded w-3/4"></li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}
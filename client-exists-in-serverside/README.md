# csrとssrは同居できる？ -> YES

# 使うか？ -> 複雑だから基本はNO

# どんなケースなら使う？

## 初回ロードでごっそり重いデータを取ってきたいとき
大量の一覧データを一気に SSR して、その間に “ページ全体が真っ白” ではなく、先にフェールバック UI（スケルトンやローディングメッセージ）を見せたい。
→ UX がよくなる。SEO／Crawling の恩恵も得られる。

## 大きめのチャンクを段階的に流し込みたいとき
例えば「まず記事のサマリーだけ」「続いてコメント一覧」「最後に関連アイテム」…みたいに、サーバー側でいくつかの await fetch() を分けて書いて、段階的に部分レンダーする場合。

## SEO 重視の情報提供ページ
完全クライアントレンダリングだと検索エンジンへの反映が心配、かつ初回UXもガチっとコントロールしたい場合。

→ とchatGPTから言われたが、より良いパターンを聞いたら下記が出てきた。

# 初回ロードでごっそり重いデータを取ってきたいときの現実的なパターン

```ts
// page.tsx（サーバーコンポーネント）
export default async function Page() {
  const data = await fetch('…', { next: { suspense: true } }).then(r => r.json());
  return <BigList data={data} />;
}
```

## 静的生成＋ISR（Incremental Static Regeneration）
- getStaticProps（App Router なら export const revalidate = 10）でビルド時に一度だけ取得。
- キャッシュが古くなったら（例：10秒ごと）自動で再生成。
- 初回ユーザーも高パフォーマンス、かつ実運用ならデータ更新頻度が低めなら最適。

## 段階的クライアントフェッチ＋プレースホルダー
- ページ本体は速攻 SSR（最小限のメタ情報だけ）。
- 実データは React Query ＋ Suspense（クライアント）で取得し、Skeleton UI で埋める。
- 初回ロードとインタラクション後の UX が一貫。

## 仮想化（Windowing）ライブラリ併用
- react-window／react-virtual 等で大量リストを画面外非描画に。
- SSR ストリーミングより、「そもそも DOM ノード数を減らす」ことで高速化。

# 大きめのチャンクを段階的に流し込みたいとき

## 従来ストリーミング SSR（複数 await）

```ts
export default async function Page() {
  const posts    = await fetch(…,{ suspense:true }).then(r=>r.json());
  const comments = await fetch(…,{ suspense:true }).then(r=>r.json());
  return <><PostsList posts={posts}/><CommentsList comments={comments}/></>;
}
```

## React <Suspense> 境界＋分割コンポーネント

```ts
// page.tsx
export default function Page() {
  return (
    <>
      <Suspense fallback={<PostSkeleton />}>
        <PostsSection />
      </Suspense>
      <Suspense fallback={<CommentSkeleton />}>
        <CommentsSection />
      </Suspense>
    </>
  )
}
// PostsSection.tsx / CommentsSection.tsx はそれぞれ async Server Component
```

チャンクごとに独立したフェールバックを用意できる

## Route Handlers + Client Fetch

- /app/api/posts/route.ts で API Route を定義
- ページ本体は軽量 SSR → 各セクションはクライアントコンポーネントで並列に useQuery
- 必要な時に必要な分だけフェッチし、ステータス管理も React Query 任せに

## Edge Functions 併用

- データ取得が重い部分を Vercel Edge Functions（高速レスポンス）にオフロード
- ストリーミング要件がある場合は streaming-enabled な Edge Runtime で

# SEO 重視の情報提供ページ

## 従来ストリーミング SSR

```ts
export default async function SEOPage() {
  const data = await fetch(…,{ suspense:true }).then(r=>r.json());
  return <Article data={data}/>;
}
export const dynamic = 'auto';
```

## 完全静的ジェネレーション（SSG）＋型安全な CMS 連携

- Headless CMS（Sanity／Contentful）からビルド時に一括取得
- export const revalidate = … で運用上の更新頻度を担保
- HTML／メタタグ／構造化データを完全にビルドに含めるので SEO 最強

## generateMetadata API で動的 head 制御

- App Router の export async function generateMetadata({ params }) { … }
- ページ固有のタイトルや OpenGraph を SSR 時に動的に埋め込む

## On-Demand Revalidation

- CMS webhook から Next.js の API を叩き、特定ページのみキャッシュを即時再生成
- 更新タイミングが明確なニュース／ブログ系に有効

# 実装選択のチェックリスト

| 要件・観点                         | SSG＋ISR        | SSR＋Streaming | クライアント＋React Query |
|------------------------------------|----------------|---------------|---------------------------|
| データ更新頻度が低い               | ◎（ビルドキャッシュ） | ◯             | △（フル CSR）             |
| 初回ロードの真っ白を避けたい       | △（遅延ビルド）       | ◎             | ◯（Skeleton）            |
| インタラクティブ性（頻繁な再取得） | △               | ◯             | ◎                         |
| SEO（構造化データ／メタタグ制御）  | ◎               | ◎             | △                         |
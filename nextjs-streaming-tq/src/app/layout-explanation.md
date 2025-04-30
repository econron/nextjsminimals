## tanstack queryの使い方

```ts
npm i @tanstack/react-query 
npm i @tanstack/react-query-devtools
```

<QueryClientProvider>で包む

引数のclientには

```ts
import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
```

で初期化したTanstackQueryのClientを渡す。

```ts
 <ReactQueryDevtools initialIsOpen={false} />
```

をProvider内部に配置すると、クエリの一覧表示、クエリのステータスの確認などをしてくれる。


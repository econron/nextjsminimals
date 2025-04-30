import ReactQueryProvider from "./ReactQueryProvider";
import { ReactNode } from "react";

export default function Example2Layout({ children }: { children: ReactNode }) {
    return (
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
    )
}
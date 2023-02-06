import '@/styles/globals.css'
import {AppProps} from "next/app";
import Layout from "@/components/Layout/Layout";

export default function _app({ Component, pageProps }: AppProps) {
    return <Layout>
        <Component {...pageProps} />
    </Layout>
}
import '@/styles/globals.css'
import {AppProps} from "next/app";
import Layout from "@/components/Layout/Layout";
import {wrapper} from "@/store";
import {Provider} from "react-redux";
import {ReactElement} from "react";

export default function app({ Component, ...rest }: AppProps): ReactElement {
    const { store, props } = wrapper.useWrappedStore(rest);

    return <Provider store={store}>
        <Layout>
            <Component {...props} />
        </Layout>
    </Provider>
};
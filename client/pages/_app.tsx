import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "@styles/global.css";
import { Provider } from "react-redux";
import store from "@redux/store";
import { NotificationProvider } from "@components/notification";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </Provider>
    );
}

export default MyApp;

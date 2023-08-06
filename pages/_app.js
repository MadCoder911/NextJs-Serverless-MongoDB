import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";
import Notification from "../components/notification/notification";
import {
  NotificatinProvider,
  useNotificatinContext,
} from "../context/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificatinProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Component {...pageProps} />

        <Notification />
      </Layout>
    </NotificatinProvider>
  );
}

export default MyApp;

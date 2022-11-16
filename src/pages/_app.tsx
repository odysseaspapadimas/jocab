import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { Container, createEmotionCache, MantineProvider } from "@mantine/core";
import Header from "../components/Header";

const myCache = createEmotionCache({ key: 'mantine' });


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={myCache}
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          primaryColor: 'violet',

          colors: {
            dark: [
              "#fff",
              "#A6A7AB",
              "#909296",
              "#5C5F66",
              "#373A40",
              "#2C2E33",
              "#25262B",
              "#1A1B1E",
              "#141517",
              "#101113",
            ],
          },
        }}
      >
        <Header />
        <Container>
          <Component {...pageProps} />
        </Container>
      </MantineProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

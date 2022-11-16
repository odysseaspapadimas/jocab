import { type NextPage } from "next";
import Head from "next/head";
import SearchLayout from "../components/Layouts/SearchLayout";


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Jocab</title>
        <meta name="description" content="Japanese dictionary, manga reader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchLayout>
          <></>
        </SearchLayout>
      </main>
    </>
  );
};

export default Home;

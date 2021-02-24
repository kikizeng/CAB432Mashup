import Head from "next/head";


import SearchBar from "../components/SearchBar";

export default function Home() {
 

  return (
    <>
      <Head>
        <title>Recipe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content">
        <h1 className="heading">Find Recipe</h1>
        <SearchBar />
      </div>
    </>
  );
}

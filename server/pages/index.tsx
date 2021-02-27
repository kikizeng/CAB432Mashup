import Head from "next/head";

import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="title" content="Recipe Finder" />
        <meta
          name="description"
          content="Recipe Finder provides the user with a variety of recipes and nutritional fact, to balance your diet. "
        />
        <meta name="keywords" content="Recipe Finder, Recipe, Finder" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />

        <title>Recipe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div className="content">
          <Logo />
          <h1 className="heading">Find Recipes</h1>
          <SearchBar />
        </div>
      </body>
    </>
  );
}

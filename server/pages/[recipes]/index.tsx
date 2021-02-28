import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Logo from "../../components/Logo";
import SearchBar from "../../components/SearchBar";
import Card from "../../components/Card";

const app_id = "1ee8a3fb";
const app_key = "fc7f239a9af0ec37b8508bc7ce8a8f8a";

const getRecipes = async (query: string | string[]) => {
  const { data } = await axios.get(
    `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}&from=0&to=10`
  );

  return data;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-expect-error
  const food = context.params.recipes.replace("-", " ");
  const data = await getRecipes(food);
  return {
    props: {
      category: food,
      data
    }
  };
};

const getRecipeId = (url: string): string => {
  return url.split("#")[1];
};

export default function Recipe({ data, category }) {
  return (
    <>
      <Head>
        <meta name="title" content={`Recipe Finder - ${category}`} />
        <meta
          name="description"
          content="Recipe Finder provides the user with a variety of recipes and nutritional fact, to balance your diet. "
        />
        <meta name="keywords" content="Recipe Finder, Recipe, Finder" />
     
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />

        <title>{category}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content content-sub">
        <Logo />
        <SearchBar />

        <div className="items-container">
          {data.count === 0 ? (
            <h1 className="no-recipe-found">No Recipe Found!!</h1>
          ) : (
            <>
              <h5>Found: {data.count}</h5>

              <div className="cards-container">
                {data.hits.map((h, idx) => (
                  <Card
                    key={idx}
                    href={`/${category}/${getRecipeId(h.recipe.uri)}`}
                    name={h.recipe.label}
                    image={h.recipe.image}
                    subText={h.recipe.calories.toPrecision(3)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

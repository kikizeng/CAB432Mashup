import { GetServerSideProps } from "next";
import Head from "next/head";
import axios from "axios";
import dynamic from "next/dynamic";
import SearchBar from "../../components/SearchBar";
import Logo from "../../components/Logo";

const FacebookShare = dynamic(() => import("../../components/Facebook"), {
  ssr: false
});

const app_id = "1ee8a3fb";
const app_key = "fc7f239a9af0ec37b8508bc7ce8a8f8a";

const getFoodDetails = async (id: string | string[]) => {
  const { data } = await axios.get(
    `https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${id}&app_id=${app_id}&app_key=${app_key}`
  );

  return data[0];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id;

  const data = await getFoodDetails(id);

  return {
    props: {
      data
    }
  };
};

interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub?: Digest[];
}
interface Ingredient {
  text: string;
  weight: number;
  image: string;
}
interface Food {
  label: string;
  image: string;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  digest: Digest[];
}

export default function FoodPage({ data }: { data: Food }) {
  // get rid of duplicates
  let uniqueIngredients = Array.from(new Set(data.ingredientLines));

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

        <title>{data.label}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>
       
        <div className="content content-sub">
          <Logo />
          <SearchBar />
          <div className="food-page-container">
            <div className="food-heading-container">
              <div className="food-image-container">
                <img className="food-image" src={data.image} />
              </div>

              <div className="food-heading">
                <h2>{data.label}</h2>
                <div className="food-sub">
                  <sub>Yield: {data.yield} </sub>
                  <sub>≈{data.totalTime} min</sub>
                  <sub> {data.calories.toPrecision(3)} cal</sub>
                </div>

                <div>
                  <h5>Tags:</h5>
                  <sub className="tags">
                    {[...data.healthLabels, ...data.dietLabels].join(", ")}
                  </sub>
                </div>

                {data.cautions.length !== 0 ? (
                  <div>
                    <h5>Cautions:</h5>
                    <sub className="cautions">{data.cautions.join(", ")}</sub>
                  </div>
                ) : (
                  <></>
                )}

                <div className="ingredients">
                  <h5>Ingredients:</h5>
                  <ul>
                    {uniqueIngredients.map((ingredient, idx) => (
                      <li className="ingredient" key={idx}>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="nutritions-table-container">
              <h2>Nutritions Facts</h2>
              <table className="nutritions-table">
                <thead className="nutritions-table-header">
                  <tr key={`table-header`}>
                    <th key="table-header-name">Name</th>
                    <th key="table-header-total">Total</th>
                    <th key="table-header-rdi">RDI</th>
                  </tr>
                </thead>

                <tbody>
                  {data.digest.map((d, i) =>
                    d.sub ? (
                      d.sub.map((sub, idx) => (
                        <tr key={`${sub.label}`}>
                          <td
                            className="nutrition-label"
                            key={`sub-${idx}-label`}
                          >
                            {sub.label} [{d.label}]
                          </td>
                          <td
                            key={`sub-${idx}-total`}
                            style={{
                              color:
                                sub.hasRDI && sub.total > sub.daily
                                  ? "red"
                                  : "black"
                            }}
                          >
                            {sub.total.toPrecision(3)} {sub.unit}
                          </td>
                          <td key={`sub-${idx}-rdi`}>
                            {sub.hasRDI
                              ? `${sub.daily.toPrecision(3)} ${sub.unit}`
                              : "-"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={`${d.label}`}>
                        <td className="nutrition-label" key={`${i}-label`}>
                          {d.label}
                        </td>
                        <td
                          key={`${i}-total`}
                          style={{
                            color:
                              d.hasRDI && d.total > d.daily ? "red" : "black"
                          }}
                        >
                          {d.total.toPrecision(3)} {d.unit}
                        </td>
                        <td key={`${i}-rdi`}>
                          {d.hasRDI
                            ? `${d.daily.toPrecision(3)} ${d.unit}`
                            : "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="share-button">
            <FacebookShare />
          </div>
        </div>
      </body>
    </>
  );
}

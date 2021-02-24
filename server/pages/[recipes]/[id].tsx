import { GetServerSideProps } from "next";
import axios from "axios";
import SearchBar from "../../components/SearchBar";

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
  console.log(data);

  return {
    props: {
      data
    }
  };
};

export default function FoodPage({ data }) {
  return (
    <>
      <div className="content content-sub">
        <SearchBar />
        <pre></pre>
      </div>
    </>
  );
}

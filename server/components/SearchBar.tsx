import Link from "next/link";
import { useState } from "react";

const SearchBar = () => {
  const [food, setFood] = useState("");
  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        aria-label="search"
        placeholder="Search Recipe..."
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />

      <Link href={`/${food.replace(" ", "-")}`}>
        <button className="search__submit" aria-label="submit search">
          <i className="fas fa-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z" />
            </svg>
          </i>
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;

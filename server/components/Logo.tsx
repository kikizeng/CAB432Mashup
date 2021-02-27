import Link from "next/link";

const Logo = () => {
  return (
    <div className="logo-container">
      <Link href="/">
          <h1 className="logo">Recipes</h1>
      </Link>
    </div>
  );
};

export default Logo;

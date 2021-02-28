import Link from "next/link";

interface CardProps {
  name: string;
  image: string;
  subText: string;
  href: string;
}

const Card: React.FC<CardProps> = ({ name, image, subText, href }) => {
  return (
    <Link href={href}>
      <div className="card">
        <img
          className="card-image"
          src={image}
          alt={`${name}.jpg`}
          width="fit-content"
        />
        <div className="card-text-container">
          <h4 className="card-name">
            <b>{name}</b>
          </h4>
          <p>{subText} cal</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

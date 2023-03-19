import React, { useEffect, useState } from "react";
import "./landing.scss";
import { Add, Search } from "../../inline-svgs";
import Link from "../../components/Link";
import { Recipe } from "../../models/models";

interface IconButtonProps {
  image: React.ReactElement;
  path?: string;
}
export const IconButton = ({image, path}: IconButtonProps): React.ReactElement => {
  return (
    <a className="icon-button" href={path}>
      {image}
    </a>
  )
}

const Header = ({}): React.ReactElement => {
  return (
    <header className="header-container">
      <div id="logo">Gracie's Eats</div>
      <section className="header-buttons">
        <IconButton image={<Search/>} />
        <IconButton image={<Add/>} path="/new"/>
      </section>
    </header>
  )
}

interface RecipeCardProps {
  id?: number;
  src: string;
  title: string;
  time: string;
}
const RecipeCard = ({
  id,
  src,
  title,
  time,
}: RecipeCardProps): React.ReactElement => {
  return (
    // <Link href={`recipe/${id.toString()}/edit/${Math.floor(Math.random()*100).toString()}`}>
    <Link href={`recipe/${id.toString()}`}>
      <article className="recipe-card">
        <header className="card-header-bar">
          <h3 className="title">{title}</h3>
          <h4 className="time">{time}</h4>
        </header>
        <main className="card-body">
          <img src={src} />
        </main>
      </article>
    </Link>
  );
};


export const Landing: React.FC = (): React.ReactElement => {
  const data: RecipeCardProps[] = [
    {
      id: 0,
      src: "drunken_noodles.jpg",
      title: "Drunken Noodles",
      time: "1hr",
    },
    {
      id: 1,
      src: "avocado_toast.jpeg",
      title: "Avocado Toast",
      time: "10 min",
    },
    {
      id: 2,
      src: "kale_salad.jpg",
      title: "Kale Salad",
      time: "25 min",
    },
    {
      id: 3,
      src: "kale_salad.jpg",
      title: "Kale Salad",
      time: "25 min",
    },
  ];

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      // const recipes = await fetch()
    }
  })

  return (
    <div className="landing-container">
      <Header />
      <div className="recipe-list">
        {data.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            src={recipe.src}
            title={recipe.title}
            time={recipe.time}
          />
        ))}
      </div>
    </div>
  );
};

import React from "react";
import "./landing.scss";
import { Add, Search } from "../../inline-svgs";

export const Landing: React.FC = (): React.ReactElement => {

  interface IconButtonProps {
    image: React.ReactElement;
    path?: string;
  }
  const IconButton = ({image, path}: IconButtonProps): React.ReactElement => {
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
    src,
    title,
    time,
  }: RecipeCardProps): React.ReactElement => {
    return (
      <article className="recipe-card">
        <header className="card-header-bar">
          <h3 className="title">{title}</h3>
          <h4 className="time">{time}</h4>
        </header>
        <main className="card-body">
          <img src={src} />
        </main>
      </article>
    );
  };

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
      id: 3,
      src: "kale_salad.jpg",
      title: "Kale Salad",
      time: "25 min",
    },
    {
      id: 4,
      src: "kale_salad.jpg",
      title: "Kale Salad",
      time: "25 min",
    },
  ];

  return (
    <div className="landing-container">
      <Header />
      <div className="recipe-list">
        {/* <RecipeCard src="drunken_noodles.jpg" title="Drunken Noodles" time="1hr"/>
        <RecipeCard src="avocado_toast.jpeg" title="Avocado Toast" time="10 min"/>
        <RecipeCard src="kale_salad.jpg" title="Kale Salad" time="25 min"/> */}
        {data.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            src={recipe.src}
            title={recipe.title}
            time={recipe.time}
          />
        ))}
      </div>
    </div>
  );
};

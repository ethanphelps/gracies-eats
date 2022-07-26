import React, { ChangeEvent, FormEvent } from "react";
import "./landing.scss";

export const Landing: React.FC = (): React.ReactElement => {

  /**
   * calls setTimeout with a delay and also clears the previous timeout to avoid
   * duplicate callback calls for one set of changes. Every time a character is
   * entered or deleted, the timer until callback gets called is reset. Once no
   * characters have been typed for delay ms, then callback is called
   */
  const TextInputDelayedReaction = ({
    delay,
    callback,
  }: {
    delay: number;
    callback: (e: string) => void;
  }): React.ReactElement => {

    let timeoutId = 0;
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(e.target.value);
      }, delay);
    };

    return (
      <div className="input-container">
        <input
          onInput={handleInput}
          type="text"
          id="delayed-text"
          name="delayed-text"
        />
      </div>
    );
  };

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
      <TextInputDelayedReaction delay={500} callback={console.log} />
    </div>
  );
};

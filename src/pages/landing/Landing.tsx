import React from "react";
import './landing.scss'

export const Landing: React.FC = (): React.ReactElement => {
  return (
    <div className="landing-container">
      <article className="recipe-card">
        <header className="header-bar">
          <h3 className="title">Drunken Noodles</h3>
          <h4 className="time">1hr</h4>
        </header>
        <main className="card-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium
            lectus quam id leo in. Turpis egestas maecenas pharetra convallis
            posuere morbi leo. Mauris vitae ultricies leo integer malesuada nunc.
            Quis varius quam quisque id diam vel quam elementum.
          </p>
        </main>
      </article>
    </div>
  );
};

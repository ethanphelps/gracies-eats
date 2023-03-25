import React, { useEffect, useState, Suspense } from 'react';
import './landing.scss';
import { Add, Search } from '../../inline-svgs';
import Link from '../../components/Link';
import { Recipe } from '../../models/models';
import { getConfig } from '../../config';
import { suspenseWrapper } from '../../utils/suspenseWrapper';
import { PacmanLoaderComponent } from '../../components/PacmanLoader';

const config = getConfig();
const username = 'graciecate@me.com';

interface IconButtonProps {
    image: React.ReactElement;
    path?: string;
}
export const IconButton = ({
    image,
    path,
}: IconButtonProps): React.ReactElement => {
    return (
        <a className="icon-button" href={path}>
            {image}
        </a>
    );
};


const Header = ({ }): React.ReactElement => {
    return (
        <header className="header-container">
            <div id="logo">Gracie's Eats</div>
            <section className="header-buttons">
                <IconButton image={<Search />} />
                <IconButton image={<Add />} path="/new" />
            </section>
        </header>
    );
};


interface RecipeCardProps {
    id?: string;
    src: string;
    name: string;
    time: string;
}
const RecipeCard = ({
    id,
    src,
    name,
    time,
}: RecipeCardProps): React.ReactElement => {
    return (
        // <Link href={`recipe/${id.toString()}/edit/${Math.floor(Math.random()*100).toString()}`}>
        <Link href={`recipe/${id.toString()}`}>
            <article className="recipe-card">
                <header className="card-header-bar">
                    <h3 className="title">{name}</h3>
                    <h4 className="time">{time}</h4>
                </header>
                <main className="card-body">
                    <img src={src} />
                </main>
            </article>
        </Link>
    );
};


const RecipeList = ({ recipes }: { recipes: Recipe[] }): React.ReactElement => {
    return (
        <div className="recipe-list">
            {recipes.map((recipe, index) => (
                <RecipeCard
                    key={index}
                    id={recipe.id}
                    // src={recipe.src}
                    src=""
                    name={recipe.name}
                    time={recipe.prepTime}
                />
            ))}
        </div>
    );
};


export const Landing: React.FC = (): React.ReactElement => {
    // const data: RecipeCardProps[] = [
    //   {
    //     id: '0',
    //     src: "drunken_noodles.jpg",
    //     name: "Drunken Noodles",
    //     time: "1hr",
    //   },
    //   {
    //     id: '1',
    //     src: "avocado_toast.jpeg",
    //     name: "Avocado Toast",
    //     time: "10 min",
    //   },
    //   {
    //     id: '2',
    //     src: "kale_salad.jpg",
    //     name: "Kale Salad",
    //     time: "25 min",
    //   },
    //   {
    //     id: '3',
    //     src: "kale_salad.jpg",
    //     name: "Kale Salad",
    //     time: "25 min",
    //   },
    // ];

    const [recipes, setRecipes] = useState<Recipe[] | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch(
                `${config.API_URL}/users/${username}/recipes`
            );
            const data = await response.json();
            setRecipes(data);
        };
        fetchRecipes();
    }, []);

    console.log('recipes retrieved:', recipes);
    return (
        <div className="landing-container">
            <Header />
            {recipes ? (
                <RecipeList recipes={recipes} />
            ) : (
                <PacmanLoaderComponent />
            )}
        </div>
    );
};

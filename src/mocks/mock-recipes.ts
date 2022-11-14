import { Recipe } from "../models/models";

export const recipes: Recipe[] = [
    {
        id: '0',
        title: 'Drunken Noodles',
        prepTime: '15 min',
        cookTime: '30 min',
        description: 'Yummy drunken noodles that get cooked in our big wok pan! Its filled with love and heat.',
        serves: 2,
        ingredients: [
            { id: 0, name: 'garlic cloves', quantity: 3},
            { id: 1, name: 'green onions', quantity: 5},
            { id: 2, name: 'bell pepper', quantity: 1},
            { id: 3, name: 'pack of noodles', quantity: 1},
        ],
        instructions: [
            { id: 0, description: 'preheat oven', prePrep: true },
            { id: 1, description: 'stir veggies in the wok until lightly brown', prePrep: false },
        ]
    },
    {
        id: '1',
        title: 'Brussel Sprout Nourish Bowls',
        prepTime: '10 min',
        cookTime: '30 min',
        description: 'Delicious bowls full of brussel sprouts, cauliflower, hot honey and other yummy ingredients.',
        serves: 2,
        ingredients: [
            { id: 0, name: 'brussel sprouts', quantity: 3},
            { id: 1, name: 'cauliflower', quantity: 5},
            { id: 2, name: 'rice', quantity: 1},
            { id: 3, name: 'turmeric', quantity: 1},
        ],
        instructions: [
            { id: 0, description: 'preheat oven', prePrep: true },
            { id: 1, description: 'start rice cooker', prePrep: true },
            { id: 2, description: 'cut brussel sprouts', prePrep: false },
            { id: 3, description: 'cook brussel sprouts in air fryer', prePrep: false },
            { id: 4, description: 'bake cauliflower in the oven', prePrep: false },
            { id: 5, description: 'plate it up', prePrep: false },
        ]
    }
]
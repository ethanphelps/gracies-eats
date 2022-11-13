interface Ingredient {
    id: number;
    name: string;
    quantity: number;
}
interface InstructionStep {
    id: number;
    description: string;
    prePrep: boolean;
  }
interface Recipe {
    id: string;
    title: string;
    prepTime: string;
    cookTime: string;
    description: string;
    serves: number;
    ingredients: Ingredient[];
    instructions: InstructionStep[];
}

const recipes: Recipe[] = [
    {
        id: 'abcxyz',
        title: 'Drunken Noodles',
        prepTime: '15 min',
        cookTime: '30 min',
        description: 'Yummy drunken noodles that get cooked in our big wok pan! Its filled with love and heat.',
        serves: 2,
        ingredients: [
            { id: 0, name: 'garlic cloves', quantity: 3},
            { id: 1, name: 'green onions', quantity: 5},
            { id: 2, name: 'bell pepper', quantity: 1},
        ],
        instructions: [
            { id: 0, description: 'preheat oven', prePrep: true },
            { id: 1, description: 'stir veggies in the wok', prePrep: false },
        ]
    }
]
import React from "react";

export interface Ingredient {
    id: number;
    name: string;
    quantity: number;
}
export interface InstructionStep {
    id: number;
    description: string;
    prePrep: boolean;
}
export interface Recipe {
    id: string;
    name: string;
    prepTime: string;
    cookTime: string;
    description: string;
    serves: number;
    ingredients: Ingredient[];
    instructions: InstructionStep[];
    src?: string;
}

export interface NetworkError {
    status: number;
    message: string;
}

export interface CreateRecipeResponse {
    message: string;
    recipeId: string;
    presignedUrlData: PresignedUrlData
}

export interface PresignedUrlData {
    url: string;
    fields: PresignedUrlFields
}

interface PresignedUrlFields {
    [key: string]: string
}
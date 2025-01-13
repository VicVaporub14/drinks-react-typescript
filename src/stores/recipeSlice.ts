import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeServices"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoriteSliceType } from "./favoritesSlice"

export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    modal: boolean,
    selectedRecipe: Recipe,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilters : SearchFilter) => Promise<void>,
    selectRecipe: (id : Drink['idDrink']) => Promise<void>,
    closeModal : () => void
}

export const createRecipesSlice : StateCreator<RecipesSliceType & FavoriteSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks:[]
    },
    modal: false,
    selectedRecipe: {} as Recipe,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters: SearchFilter) => {
        const drinks = await getRecipes(filters);
        set({
            drinks 
        })
    },
    selectRecipe: async (id : Drink['idDrink']) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})
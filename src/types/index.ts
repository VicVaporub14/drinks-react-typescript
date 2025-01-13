import { z } from 'zod'
import { CategoriesAPIResponseSchema, DrinkAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema, SearchRecipeSchema } from '../schemas/recipe-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>

export type SearchFilter = z.infer<typeof SearchRecipeSchema>

export type Drink = z.infer<typeof DrinkAPIResponseSchema>
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>

export type Recipe = z.infer<typeof RecipeAPIResponseSchema>
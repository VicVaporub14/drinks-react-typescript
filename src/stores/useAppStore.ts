import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { createFavoritesSlice, FavoriteSliceType } from "./favoritesSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export const useAppStore = create<
    RecipesSliceType & 
    FavoriteSliceType & 
    NotificationSliceType
    >()(devtools((...a) => ({
        ...createRecipesSlice(...a),
        ...createFavoritesSlice(...a),
        ...createNotificationSlice(...a)
})))
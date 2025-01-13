
import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";


export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)

  const hasFavorites = useMemo(() => favorites.length ,[favorites])

  return (
    <div>
        <h2 className="text-4xl text-center font-extrabold">Favoritos</h2>

        {hasFavorites ? (
          <div className="grid grid-cols-1 px-10 md:grid-cols-2 md:px-10 2xl:grid-cols-3 gap-7 my-10">
          {favorites.map( drink => (
            <DrinkCard 
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
        ) : (
          <p className=" mt-10 text-center text-xl">Aún no hay favoritos, agrege algunas bebidas</p>
        )}
    </div>
  )
}

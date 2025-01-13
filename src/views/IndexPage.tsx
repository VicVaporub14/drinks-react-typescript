
import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";

export default function IndexPage() {

  const drinks = useAppStore( (state) => state.drinks)

  const hasDrinks = useMemo(() => drinks.drinks.length ,[drinks])
  return (
    <>
      <h1 className="text-5xl font-bold text-center">Recetas</h1>
      {hasDrinks ? (
        <div className="grid grid-cols-1 px-10 md:grid-cols-2 md:px-10 2xl:grid-cols-3 gap-7 my-10">
          {drinks.drinks.map( drink => (
            <DrinkCard 
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className="text-center my-5">No hay resultados aún, realice una busqueda para ver recetas</p>
      )}
    </>
  )
}

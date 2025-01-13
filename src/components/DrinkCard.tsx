import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({drink}: DrinkCardProps) {

    const selectRecipe = useAppStore((state) => state.selectRecipe)

    return (
        <div className="bg-white border shadow-lg ">
            <div className="overflow-hidden">
                <img 
                    src={drink.strDrinkThumb} 
                    alt={`Imagen de ${drink.strDrink}`}
                    className="hover:scale-110 transition-transform"
                />
            </div>
            <div className="p-5">
                <h2 className="font-bold truncate text-2xl">{drink.strDrink}</h2>
                <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-600 mt-5 p-3 text-2xl text-white font-bold w-full rounded-lg"
                    onClick={() => selectRecipe(drink.idDrink)}
                >
                    Ver Receta
                </button>
            </div>
        </div>
    )
}

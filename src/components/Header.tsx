import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

  const [ searchFilters, setSearchFilters ] = useState({
    ingredient: '',
    category: ''
  })

  const { pathname } = useLocation()
  const isHome = useMemo( () => pathname === '/' ,[pathname])

  const fetchCategories = useAppStore( (state) => state.fetchCategories)
  const categories = useAppStore( (state) => state.categories)
  const searchRecipes = useAppStore( (state) => state.searchRecipes)

  const showNotification = useAppStore((state) => state.showNotification)

  useEffect( () => {
    fetchCategories()
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (Object.values(searchFilters).includes('')) {
      showNotification({
        text:'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    searchRecipes(searchFilters)
  }

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover' : "bg-slate-800"}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logotipo" />
                </div>
                
                <nav className="flex gap-4">
                  <NavLink 
                    to="/"
                    className={({isActive}) => 
                      isActive ? 'text-orange-400 font-bold uppercase' : 'text-white font-bold uppercase'}
                  >Inicio</NavLink>
                  <NavLink 
                    to="/favoritos"
                    className={({isActive}) => 
                      isActive ? 'text-orange-400 font-bold uppercase' : 'text-white font-bold uppercase'}
                  >Favoritos</NavLink>
                </nav>
            </div>
            { isHome && (
                <form
                  className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-12 p-10 rounded-lg shadow-sm space-y-6"
                  onSubmit={handleSubmit}
                >
                    <div className="space-y-4">
                        <label 
                          htmlFor="ingredient"
                          className="block text-white font-bold text-md"
                        >Nombre o Ingrediente</label>
                        <input
                          id="ingredient" 
                          name="ingredient"
                          type="text" 
                          className="p-2 w-full rounded-lg focus:outline-none"
                          placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                          value={searchFilters.ingredient}
                          onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-4">
                        <label 
                          htmlFor="category"
                          className="block text-white font-bold text-md"
                        >Categoria</label>
                        <select 
                          id="category"
                          name="category"
                          className="p-2 w-full rounded-lg focus:outline-none"
                          value={searchFilters.category}
                          onChange={handleChange}
                        >
                          <option value="">-- Seleccione una categoria</option>
                          {categories.drinks.map( category => (
                            <option 
                              key={category.strCategory}
                              value={category.strCategory}
                            >{category.strCategory}</option>
                          ))}
                        </select>
                    </div>

                    <input 
                      type="submit" 
                      value='Buscar Receta'
                      className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white p-3 w-full rounded-lg font-bold"
                    />
                </form>
            )}
        </div>
    </header>
  )
}

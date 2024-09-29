import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ListPokemon from './pages/ListPokemon';
import DetailPokemon from './pages/DetailPokemon'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { PokemonProvider } from './Context/pokemonCtx';
import { FiltersProvider } from './Context/filtersCtx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListPokemon/>
  },
  {
    path: "/detail/:idPokemon",
    element: <DetailPokemon/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonProvider>
      <FiltersProvider>
        <RouterProvider router={router}/>
      </FiltersProvider>
    </PokemonProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import PokemonRow from "./PokemonRow";
import PokemonContext from "./PokemonContext";
import { useContext } from "react";

const PokemonTable = () => {
  const { 
    state: { pokemon, filter },
    dispatch,
  } = useContext(PokemonContext);
  return(
    <table width="100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {pokemon
          .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
          .slice(0,20).map((pokemon) => (
          <PokemonRow 
            pokemon={pokemon} 
            key={pokemon.id} 
            onSelect={(pokemon) => dispatch({
              type: 'SET_SELECTED_POKEMON',
              payload: pokemon,
            })} 
          />
        ))}
      </tbody>
    </table>
  )
}

export default PokemonTable;
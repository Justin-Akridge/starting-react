import Button from '@mui/material/Button';
import { PropTypes } from '@mui/material';

//react component to display json data
const PokemonRow = ({ pokemon, onSelect }) => {
  return (
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button variant="contained" onClick={() => onSelect(pokemon)}>More Info
        </Button>
      </td>
    </tr>
  )
}

export default PokemonRow;
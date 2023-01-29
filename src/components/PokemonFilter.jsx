import styled from "@emotion/styled";
import { useContext } from "react";
import PokemonContext from "./PokemonContext";

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

const PokemonFilter = () => {
  const { filter, filterSet } = useContext(PokemonContext)
  return (
    <Input 
      value={filter}
      onChange={(evt) => filterSet(evt.target.value)}
    />
  )
}

export default PokemonFilter;
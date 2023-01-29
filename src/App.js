import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";


import "./App.css";

import PokemonType from "./PokemonType";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from './components/PokemonContext';

//emotion layout
const Title = styled.h1`
  text-align: center;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1rem;
`;
const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;

function App() {
  const [filter, filterSet] = useState("")
  const [selectedItem, selectedItemSet] = useState(null)
  const [pokemon, pokemonSet] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/Justin-Akridge/starting-react/pokemon.json")
    .then(resp => resp.json())
    .then(data => pokemonSet(data))
  }, [])
  return (
    <PokemonContext.Provider
      value={{
        filter,
        filterSet,
        selectedItem,
        selectedItemSet,
        pokemon,
        pokemonSet,
      }}
    >
      <Container>
        <Title> Pokemon Search </Title>
        <Column>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </Column>
      </Container>
    </PokemonContext.Provider>
  )
}

export default App

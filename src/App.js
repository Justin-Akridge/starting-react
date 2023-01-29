import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Button from '@mui/material/Button';

import "./App.css";


//react component to display json data
const PokemonRow = ({ pokemon, onSelect }) => {
  return (
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button variant="contained" onClick={() => onSelect(pokemon)}>Select
        </Button>
      </td>
    </tr>
  )
}

//this just checks the properties of the types that 
//are passed in
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  onSelect: PropTypes.func.isRequired,
}

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))
      }
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    "HP": PropTypes.number.isRequired,
    "Attack": PropTypes.number.isRequired,
    "Defense": PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    "Speed": PropTypes.number.isRequired,
  })
}

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
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;
function App() {
  const [filter, filterSet] = React.useState("")
  const [selectedItem, selectedItemSet] = React.useState(null)
  const [pokemon, pokemonSet] = React.useState([])

  React.useEffect(() => {
    fetch("http://localhost:3000/Justin-Akridge/starting-react/pokemon.json")
    .then(resp => resp.json())
    .then(data => pokemonSet(data))
  }, [])
  return (
    <Container>
      <Title> Pokemon Search </Title>
      <Column>
        <div>
          <Input 
            value={filter}
            onChange={(evt) => filterSet(evt.target.value)}
          />
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
                    onSelect={(pokemon) => selectedItemSet(pokemon)} 
                  />
              ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {... selectedItem} />}
      </Column>
    </Container>
  )
}

export default App

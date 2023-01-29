import React, { useState, useEffect, useReducer } from 'react';
import styled from "@emotion/styled";
import  createStore  from 'redux';

import { Provider , useSelector, useDispatch} from 'react-redux';
import "./App.css";

import PokemonType from "./PokemonType";
import PokemonInfo from "./components/PokemonInfo";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";
import PokemonContext from './components/PokemonContext';

const pokemonReducer = (state = {
  pokemon: [],
  filter: "",
  selectedItem: null,
}, action) => {
  switch(action.type) {
    case "SET_FILTER":
      return {
        ... state,
        filter: action.payload,
      }
      case "SET_POKEMON":
      return {
        ... state,
        pokemon: action.payload,
      }
      case "SET_SELECTED_POKEMON":
      return {
        ... state,
        selectedItem: action.payload,
      }
      default:
        throw new Error("No action");
  }
}

const store = createStore(pokemonReducer) 

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
  const [state, dispatch] = useReducer(pokemonReducer, {
    pokemon: [],
    filter: "",
    selectedItem: null,
  })
  useEffect(() => {
    fetch("http://localhost:3000/Justin-Akridge/starting-react/pokemon.json")
    .then((resp) => resp.json())
    .then((data) => dispatch({
      type: "SET_POKEMON",
      payload: data,
    }))
  }, [])

  if(!state.pokemon) {
    return <div>Loading data</div>
  }
  return (
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
  )
}

export default () => <Provider store={store}><App /></Provider>

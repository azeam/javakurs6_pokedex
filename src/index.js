import React from 'react';
import ReactDOM from 'react-dom';
import Title from './title';
import Pokemons from './pokemons';
import './style.css';

ReactDOM.render(
  <React.StrictMode>
    <Title />
    <Pokemons />
  </React.StrictMode>,
  document.getElementById('root')
);
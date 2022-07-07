import "./App.css";
import { useState, useEffect } from "react";
import { useTypesAndWeaknesses } from "./utils/pokemon";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchWeakness, setSearchWeakness] = useState("");
  const { types, weaknesses } = useTypesAndWeaknesses(pokemonList);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json "
    )
      .then((res) => res.json())
      .then((resBody) => setPokemonList(resBody.pokemon))
      .catch((e) => console.error(e))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let displayList = pokemonList.filter(
    ({ name, type, weaknesses }) =>
      name.toLowerCase().includes(searchName.toLowerCase()) &&
      // eslint-disable-next-line eqeqeq
      (type.includes(searchType) || searchType == "") &&
      // eslint-disable-next-line eqeqeq
      (weaknesses.includes(searchWeakness) || searchWeakness == "")
  );

  console.log("types", types);
  console.log("weaknesses", weaknesses);

  if (isLoading) return <h2>Loading ...</h2>;

  return (
    <div>
      <h1>Pokedex {displayList.length}</h1>
      <label htmlFor="searchName">Search by Name: </label>
      <input
        type="text"
        id="searchName"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />

      <label htmlFor="searchType">Search by Type: </label>
      <select
        name="searchType"
        id="searchType"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        {types.map((t, idx) => {
          return (
            <option key={idx} value={t}>
              {t}
            </option>
          );
        })}
      </select>

      <label htmlFor="searchWeakness">Search by Weakness: </label>
      <select
        name="searchWeakness"
        id="searchWeakness"
        value={searchWeakness}
        onChange={(e) => setSearchWeakness(e.target.value)}
      >
        {weaknesses.map((w, idx) => {
          return (
            <option key={idx} value={w}>
              {w}
            </option>
          );
        })}
      </select>
      <div>
        {displayList.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <h3>{pokemon.name}</h3>
              <small>{pokemon.num}</small>
              <p>Type:</p>
              <ul>
                {pokemon.type.map((t, idx) => (
                  <li key={pokemon.id + t + idx}>{t}</li>
                ))}
              </ul>
              <p>Weaknesses:</p>
              <ul>
                {pokemon.weaknesses.map((w, idx) => (
                  <li key={pokemon.id + w + idx}>{w}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default App;

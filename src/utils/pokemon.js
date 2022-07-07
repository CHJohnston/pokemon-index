import { useState, useEffect } from "react";

export const useTypesAndWeaknesses = (list) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    let result = list.reduce(
      (acc, pokemon) => {
        acc.types = acc.types.concat(pokemon.type);
        acc.weaknesses = acc.weaknesses.concat(pokemon.weaknesses);
        return acc;
      },
      { types: [], weaknesses: [] }
    );

    setValues({
      types: ["", ...new Set(result.types)],
      weaknesses: ["", ...new Set(result.weaknesses)],
    });
  }, [list]);

  return values;
};


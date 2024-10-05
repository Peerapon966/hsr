"use server";

import { useEffect, useState } from "react";

type Pokemon = {
  is_hidden: boolean;
  pokemon: { name: string; url: string };
  slot: number;
};

/**
 *
 * NextJs differentiates client-only and non-client-only function apart from each other
 * When declare 'use server' directive at the top most of the component, NextJs assume that there's no client-only function in the component. If found any, throw an error
 *
 * Then it creates a completed static HTML file that ready to be serve to the clients, with no further JS bundle needed to be sent to the client side
 *
 *
 * When declare 'use client' directive at the top most of the component, NextJs execute every functions that executable on the server once (i.e., non-client-only function)
 * and skip all non-client only functions in order to create an initial HTML file
 *
 * Then bundles the whole component into JS bundle to be sent to the client and executed again on the client side
 *
 */
export default async function Pokemon() {
  // const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);

  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/ability/battle-armor")
  //     .then((res) => res.json())
  //     .then((data) => setPokemons(data.pokemon));
  // }, []);

  const res = await fetch("https://pokeapi.co/api/v2/ability/battle-armor");
  const data = await res.json();
  const pokemons = data.pokemon;
  console.log("client or server");

  return (
    <div>
      <h1>pokemon</h1>
      {pokemons &&
        pokemons.map((pokemon: Pokemon) => (
          <div key={pokemon.pokemon.name}>{pokemon.pokemon.name}</div>
        ))}
    </div>
  );
}

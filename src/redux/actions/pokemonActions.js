import { createAction } from 'redux-actions';
import pokemonApi from '@/utils/api/pokemonApi';

export const fetchPokemonRequest = createAction('FETCH_POKEMON_REQUEST');
export const fetchPokemonSuccess = createAction('FETCH_POKEMON_SUCCESS');
export const fetchPokemonError = createAction('FETCH_POKEMON_ERROR');

export const fetchPokemon = count => async (dispatch) => {
  try {
    dispatch(fetchPokemonRequest());
    const { data: { results } } = await pokemonApi.getPokemons(count);

 


    dispatch(fetchPokemonSuccess(results));
  } catch (e) {
    dispatch(fetchPokemonError());
  }
};

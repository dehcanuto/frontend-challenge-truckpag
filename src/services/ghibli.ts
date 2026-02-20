import axios from 'axios';
import { Film } from '../types/films';

const API_BASE_URL = process.env.REACT_APP_GHIBLI_API;

export const getFilms = async (): Promise<Film[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/films`);
  return data;
}

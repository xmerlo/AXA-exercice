import axios from 'axios';
import { baseURL } from './baseUrl';

const apiDevis = axios.create({
  baseURL: baseURL+'/devis',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiDevis;
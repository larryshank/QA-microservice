import http from 'k6/http';
import {sleep, check} from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

export const options = {
  vus: 100,
  duration: '15s',
}

const baseUrl = 'http://localhost:3000/qa/questions';

const generateRandomProductID = () => Math.floor(Math.random() * 1000);

export default function() {
  const url = `${baseUrl}/${generateRandomProductID()}/answers`;
  const res = http.get(url);
  // sleep(0.5);
}
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://www.alphavantage.co/',
    headers: { 'Content-Type': 'application/json' }
});

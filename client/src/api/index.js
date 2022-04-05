import axios from "axios";
import { baseURL } from "../constants/constants";

const API = axios.create({ baseURL: baseURL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    //req.headers.set("Content-Type", "application/json");
    return req;
});

export const getFigure = (pin) => API.get(`/figures/${pin}`);
export const getPin = () => API.get(`/pin`);

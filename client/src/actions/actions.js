import * as api from "../api/index.js";

export const getFigure = async (pin) => {
    try {
        const { data } = await api.getFigure(pin);
        return data;
    } catch (error) {
        console.log(error.message);
        return undefined;
    }
};

export const getPin = async () => {
    try {
        const { data } = await api.getPin();
        return data;
    } catch (error) {
        console.log(error.response);
        return error.response.data.message;
    }
};

import FigureModel from "../models/FigureModel.js";

export const deleteAll = async (req, res) => {
    try {
        await FigureModel.deleteMany({});
        return res.status(200).json({ message: "delete all" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "發生錯誤" });
    }
};

export const getAll = async (req, res) => {
    try {
        const allFigs = await FigureModel.find({});
        return res.status(200).json(allFigs);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "發生錯誤" });
    }
};

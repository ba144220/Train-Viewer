import FigureModel from "../models/FigureModel.js";

export const getFigure = async (req, res) => {
    try {
        const { pin } = req.params;

        const foundFigure = await FigureModel.findOne({ pin: pin });

        return res.status(200).json({ data: foundFigure });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "發生錯誤" });
    }
};

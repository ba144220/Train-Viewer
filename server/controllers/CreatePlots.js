import FigureModel from "../models/FigureModel.js";
import { PlotModel } from "../models/PlotModel.js";
import { removeDuplicate } from "./utils.js";

export const createPlots = async (req, res) => {
    const { pin } = req.params;
    const { plot_titles } = req.body;

    try {
        // get the existing fig
        let existingFigure = await FigureModel.findOne({ pin: pin });
        if (!existingFigure) {
            // invalid pin
            console.log("Invalid pin. Visit ...url to get a pin!");
            return res.status(404).json({ message: "Invalid pin. Visit ...url to get a pin!" });
        }

        // create a plot for each plot title
        const createPlot = (title) => {
            // create a new plot
            let newPlot = new PlotModel({
                title: title,
            });
            existingFigure.plots.push(newPlot);
        };

        // find dup. in plot titles
        let plotTitles = existingFigure.plots.map((e) => e.title);
        plot_titles.forEach((title) => {
            if (!plotTitles.includes(title)) {
                createPlot(title);
            }
        });

        await existingFigure.save();

        return res.status(200).json(existingFigure);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "發生錯誤" });
    }
};

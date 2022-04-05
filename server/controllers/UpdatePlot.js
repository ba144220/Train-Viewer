import FigureModel from "../models/FigureModel.js";
import { PlotModel } from "../models/PlotModel.js";
import { NumericalDataModel } from "../models/NumericalDataModel.js";

export const updatePlot = async (req, res) => {
    const { pin, plotTitle } = req.query;
    const { title, x, y } = req.body;
    try {
        // get the existing fig
        let existingFigure = await FigureModel.findOne({ pin: pin });
        if (!existingFigure) {
            // invalid pin
            console.log("no fig found");
            return res.status(404).json({ message: "no fig found" });
        }

        // create a num data
        if (title === undefined || x === undefined || y === undefined) {
            return res.status(300).json({ message: "A data must contain (title,x,y)" });
        }

        // put the data into the plot
        const plotIndex = existingFigure.plots.findIndex((e) => e.title === plotTitle);

        if (plotIndex === -1) {
            return res.status(404).json({ message: "plot not found" });
        }
        const dataIndex = existingFigure.plots[plotIndex].data.findIndex((e) => e.title === title);
        if (dataIndex === -1) {
            const dataPoint = new NumericalDataModel({ title: title, x: x, y: y });
            existingFigure.plots[plotIndex].data.push(dataPoint);
        } else {
            existingFigure.plots[plotIndex].data[dataIndex].x.push(x);
            existingFigure.plots[plotIndex].data[dataIndex].y.push(y);
        }
        existingFigure.lastUpdate = Date.now();
        await existingFigure.save();

        const io = await req.app.get("socket");
        io.emit(pin, existingFigure);

        return res.status(200).json(existingFigure);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "發生錯誤" });
    }
};

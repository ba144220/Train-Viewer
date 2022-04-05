import mongoose from "mongoose";
import { PlotSchema } from "./PlotModel.js";

const FigureSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
    },
    pin: { type: String, required: true },
    plots: [PlotSchema],
});

var FigureModel = mongoose.model("figure", FigureSchema);
export default FigureModel;

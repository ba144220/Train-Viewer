import mongoose from "mongoose";
import { NumericalDataSchema } from "./NumericalDataModel.js";

export const PlotSchema = mongoose.Schema({
    title: String,
    data: [NumericalDataSchema],
});

export const PlotModel = mongoose.model("plot", PlotSchema);

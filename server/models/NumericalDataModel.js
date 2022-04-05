import mongoose from "mongoose";

export const NumericalDataSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    title: { type: String, required: true },
    x: [Number],
    y: [Number],
});
export const NumericalDataModel = mongoose.model("numerical-data", NumericalDataSchema);

import FigureModel from "../models/FigureModel.js";
import { pinGenerator } from "./utils.js";

export const getPin = async (req, res) => {
    try {
        let pin = pinGenerator();
        for (let tryCount = 0; tryCount < 15; tryCount++) {
            console.log("New pin created: " + pin);
            // check repeat
            const existingFigure = await FigureModel.findOne({ pin: pin });
            if (existingFigure) {
                console.log("Find duplicate fig!!! pin=" + pin);
                // if the existing fig has been created 48 hrs before, remove it.
                let twoDaysBefore = new Date(new Date() - 48 * 60 * 60 * 1000);
                let oneHourBefore = new Date(new Date() - 20 * 60 * 1000);
                if (
                    existingFigure.createdAt < twoDaysBefore ||
                    (existingFigure.plots.length == 0 && existingFigure.createdAt < oneHourBefore)
                ) {
                    // remove the existing figure
                    let toBeDeletedId = existingFigure._id;
                    await FigureModel.findByIdAndDelete(toBeDeletedId);
                    console.log("Remove figure with pin: " + pin);
                    break;
                } else {
                    // pick a new pin
                    pin = pinGenerator();
                }
            } else {
                break;
            }
            if (tryCount == 10) {
                console.log("no pin available");
                return res.status(404).json({ message: "No pin available" });
            }
        }

        // create a figure
        const newFigure = await FigureModel.create({
            pin: pin,
        });
        console.log("Create new fig succeeded!");
        console.log(newFigure);
        return res.status(200).json({ data: pin });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "發生錯誤" });
    }
};

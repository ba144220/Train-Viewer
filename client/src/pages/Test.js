import { AppBar, Box, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
        {
            label: "Rainfall",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
            data: [65, 59, 80, 81, 56],
        },
    ],
};

const Test = () => {
    return (
        <>
            <AppBar position="static">
                <Typography>a</Typography>
            </AppBar>
            <Box sx={{ padding: 3 }}>
                <Grid container>
                    {[1, 2].map((e) => (
                        <Grid item key={e}>
                            <Paper>
                                <Line
                                    data={state}
                                    options={{
                                        title: {
                                            display: true,
                                            text: "Average Rainfall per month",
                                            fontSize: 20,
                                        },
                                        legend: {
                                            display: true,
                                            position: "right",
                                        },
                                    }}
                                />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};
export default Test;

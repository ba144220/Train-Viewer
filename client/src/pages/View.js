import React, { useEffect, useState } from "react";
import {
    AppBar,
    Chip,
    Box,
    Grid,
    Paper,
    Typography,
    Toolbar,
    Alert,
    Switch,
    FormGroup,
    FormControlLabel,
} from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { getFigure, getPin } from "../actions/actions";
import webSocket from "socket.io-client";
import moment from "moment";

import { Line, Scatter } from "react-chartjs-2";
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
import { baseURL } from "../constants/constants";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const View = () => {
    const [ws, setWs] = useState(null);

    const [pin, setPin] = useState();
    const [figure, setFigure] = useState();
    const [scatter, setScatter] = useState(false);
    useEffect(() => {
        if (ws) {
            //連線成功在 console 中打印訊息
            console.log("success connect!");
            //設定監聽
            initWebSocket();
        }
    }, [ws]);
    const initWebSocket = () => {
        //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
        ws.on(pin, (message) => {
            console.log(message);
            setFigure(message);
        });
    };

    const dataGenerator = (plotData) => {
        const COLORS = [
            "#e60049",
            "#0bb4ff",
            "#50e991",
            "#e6d800",
            "#9b19f5",
            "#ffa300",
            "#dc0ab4",
            "#b3d4ff",
            "#00bfa0",
        ];

        let datasets = [];

        if (scatter) {
            plotData.forEach((ele, idx) => {
                let temp = {
                    label: ele.title,
                    data: ele.x.map((_, i) => ({ x: ele.x[i], y: ele.y[i] })),
                    backgroundColor: COLORS[idx % COLORS.length],
                    borderColor: "rgba(0,0,0,0)",
                };
                datasets.push(temp);
            });
            return { datasets: datasets };
        } else {
            plotData.forEach((ele, idx) => {
                let temp = {
                    label: ele.title,
                    data: ele.x.map((_, i) => ele.y[i]),
                    backgroundColor: COLORS[idx % COLORS.length],
                    borderColor: "rgba(0,0,0,0)",
                };
                datasets.push(temp);
            });
            let res = undefined;
            try {
                res = { labels: [...Array(plotData[0]?.x.length).keys()], datasets: datasets };
            } catch {}

            return res;
        }
    };

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const pinn = await localStorage.getItem("pin");
            setPin(pinn);
            console.log(pin);
            let res = await getFigure(localStorage.getItem("pin"));
            let fig = res.data;

            setFigure(fig);
            setWs(webSocket(baseURL));
        }
        fetchData();
    }, []);

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{ padding: 2, pl: 3, flexDirection: "row" }}
                color="inherit"
            >
                {" "}
                <Typography variant="h5">PIN</Typography>
                <Typography variant="h5" sx={{ ml: 2, mr: 2 }}>
                    {pin}
                </Typography>
                <Chip
                    label={figure?.plots.length > 0 ? "success" : "not connected"}
                    color={figure?.plots.length > 0 ? "success" : "warning"}
                    variant="outlined"
                    icon={figure?.plots.length > 0 ? <DoneRoundedIcon /> : <></>}
                    //onClick={() => setConnected(true)}
                />
                <Box flexGrow={1} />
            </AppBar>
            <Toolbar></Toolbar>
            <Box
                sx={{
                    pt: 2,
                    pl: 2,
                    pr: 2,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {figure?.plots ? (
                    <Typography variant="subtitle1" sx={{ color: "rgb(150,150,150)" }}>
                        {"Last Update: " + moment(figure?.lastUpdate).fromNow()}
                    </Typography>
                ) : (
                    <></>
                )}
                <Box flexGrow={1}></Box>
                <FormGroup>
                    <FormControlLabel
                        control={<Switch onClick={() => setScatter(!scatter)} />}
                        label="Scatter"
                    />
                </FormGroup>
            </Box>
            <Box
                sx={{
                    padding: 2,
                }}
            >
                <Grid container spacing={2}>
                    {figure?.plots ? (
                        figure?.plots?.length > 0 ? (
                            figure.plots.map((plot) => (
                                <Grid item xs={12} md={6} key={plot.title}>
                                    <Paper elevation={3} sx={{ padding: 2 }}>
                                        <Typography textAlign={"center"}>{plot.title}</Typography>
                                        {scatter ? (
                                            <Scatter data={dataGenerator(plot.data)} options={{}} />
                                        ) : (
                                            <Line
                                                data={dataGenerator(plot.data)}
                                                options={{}}
                                            ></Line>
                                        )}
                                    </Paper>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Alert severity="warning">
                                    Start your python code to enable the plots!
                                </Alert>
                            </Grid>
                        )
                    ) : (
                        <Grid item xs={12}>
                            <Alert severity="error">This pin is not valid!</Alert>
                        </Grid>
                    )}
                    {/* {figure?.plots ? figure.plots.map((e) => <Grid item>a</Grid>) : <></>} */}
                </Grid>
            </Box>
        </div>
    );
};

export default View;

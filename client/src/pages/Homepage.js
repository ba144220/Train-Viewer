import React, { useState } from "react";
import { Button, Container, Grid, Grow, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFigure, getPin } from "../actions/actions";
const Homepage = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [handling, setHandling] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleEnterPin = async () => {
        // let figure = await getFigure(value);
        // console.log(figure);
        // setFigure(figure);
        // setPin(value);
        await localStorage.setItem("pin", value);
        navigate("view");
    };
    const handleGetPin = async () => {
        setHandling(true);
        let pin = await getPin();
        if (pin.data) {
            setValue(pin.data);
        } else {
            console.log(pin);
            alert(pin);
            setHandling(false);
        }

        //navigate("view");
    };

    return (
        <Grow in timeout={400}>
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Paper
                    sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{ marginBottom: 1, width: "100%" }}
                        onClick={handleGetPin}
                        disabled={handling}
                    >
                        Get Pin!
                    </Button>

                    <Typography sx={{ margin: 0.5 }}>or</Typography>
                    <TextField
                        value={value}
                        onChange={handleChange}
                        sx={{ margin: 1, width: "100%" }}
                        placeholder="enter pin"
                        color="secondary"
                        variant="outlined"
                    ></TextField>

                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ marginBottom: 1, width: "100%" }}
                        onClick={handleEnterPin}
                    >
                        Enter Pin!
                    </Button>
                </Paper>
            </Container>
        </Grow>
    );
};

export default Homepage;

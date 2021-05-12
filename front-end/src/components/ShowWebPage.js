import JsoupService from '../Service/JsoupService'
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Grid, Tooltip, IconButton, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import ProgressIndicator from '../Utils/ProgressIndicator';
import CropImage from './CropImage';
import CropImageV2 from './CropImageV2';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchIcon from '@material-ui/icons/Search';
import HttpIcon from '@material-ui/icons/Http';
import Logo from "../images/imgTemp.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: "75%",
        // marginLeft: theme.spacing(5),
        // marginRight: theme.spacing(5),
        // padding: theme.spacing(5),
        margin: 'auto',
        variant: 'outlined'
        //talla papel

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100ch',
    },
}));

export default function ShowWebPage(props) {
    const classes = useStyles();
    const [screenShot, setscreenShot] = useState(null)
    const [url, setUrl] = useState("")
    const [isLoading, setisLoading] = useState(true)
    const [progress, setProgress] = React.useState(0);

    const takeScreenShot = (_url) => {
        setisLoading(!isLoading)
        console.log("isloading")
        console.log(isLoading)
        axios.get("http://localhost:4000/screenshot?url=" + url, { responseType: "blob" })
            .then(function (response) {
                var reader = new window.FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = function () {
                    var imageDataUrl = reader.result;
                    setscreenShot(imageDataUrl)
                }
            });
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        takeScreenShot(url);
        evt.target.reset()
    }

    const restartUrl = () => {
        setUrl("")
        setscreenShot(null)
    }

    return (
        <div className="container">
            <Paper className={classes.paper}>
                <Grid container justify="center" >
                    <Grid item xs={12}>
                        <Typography>
                            1. Insérez l'url que vous souhaitez surveiller
                        </Typography>
                    </Grid>

                    <form onSubmit={handleSubmit} className="p-3">
                        <TextField
                            required={true}
                            value={url}
                            variant="outlined"
                            className={classes.textField}
                            error={url === ""}
                            placeholder="https://myurl.com"
                            onChange={e => setUrl(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpIcon />
                                    </InputAdornment>
                                ),
                            }}
                        >
                        </TextField>

                        {!screenShot ?
                            <Button
                                disabled={url === "" || url === " "}
                                style={{ textTransform: 'none' }}
                                className='align-middle m-2'
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={takeScreenShot}>
                                Commencer
                        </Button>
                            :
                            <Button
                                style={{ textTransform: 'none' }}
                                className='align-middle m-2'
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={restartUrl}>
                                Reprendre
                            </Button>
                        }
                    </form>


                    {!screenShot &&
                        <div className="p-2">
                            <img src={Logo} alt="image temporaire" style={{ height: 'auto', width: '100%' }} />
                        </div>
                    }

                    <LinearProgress variant="determinate" value={progress} />

                    {screenShot &&
                        <>
                            <Grid item xs={12}>
                                <Typography>
                                    2. Sélectionner la zone
                            </Typography>
                            </Grid>
                            <Grid item xs={12} />
                            <CropImageV2 src={screenShot} url={url} />
                            <Grid />
                        </>
                    }
                </Grid>
            </Paper>
        </div>
    )
}

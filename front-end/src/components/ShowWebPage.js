import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Grid, InputAdornment } from '@material-ui/core';
import axios from 'axios';
import CropImage from './CropImage';
import CropImageV2 from './CropImageV2';
import Paper from '@material-ui/core/Paper';
import HttpIcon from '@material-ui/icons/Http';
import Logo from "../images/imgTemp.jpg"
import { TouchBallLoading } from 'react-loadingg';
import CropImageService from "../Service/CropImageService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: "75%",
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
    const [isLoading, setisLoading] = useState(false)

    const takeScreenShot = (_url) => {
        setisLoading(true)
        CropImageService.getScreenShot(url).then(function (response) {
            var reader = new window.FileReader();
            reader.readAsDataURL(response.data);
            reader.onload = function () {
                setisLoading(false)
                var imageDataUrl = reader.result;
                setscreenShot(imageDataUrl)
            }
        });

       // axios.get("http://localhost:4001/screenshot?url=" + url, { responseType: "blob" })

    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        takeScreenShot(url);
        evt.target.reset()
    }

    const restart = () => {
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
                                onClick={restart}>
                                Reprendre
                            </Button>
                        }
                    </form>

                    {!screenShot && isLoading &&
                        <div className="p-2">
                            <TouchBallLoading size="large" color="#207DE0 " />
                        </div>
                    }


                    {!screenShot &&
                        <div className="p-2">
                            <img src={Logo} alt="image temporaire" style={{ height: 'auto', width: '100%' }} />
                        </div>
                    }

                    {screenShot &&
                        <>
                            <Grid item xs={12}>
                                <Typography>
                                    2. Sélectionner la zone
                            </Typography>
                            </Grid>
                            <Grid item xs={12} />
                            <CropImageV2 src={screenShot}
                                url={url}
                                restart={restart}
                            />
                            <Grid />
                        </>
                    }
                </Grid>
            </Paper>
        </div>
    )
}

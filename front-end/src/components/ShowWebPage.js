import JsoupService from '../Service/JsoupService'
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Grid} from '@material-ui/core';
import axios from 'axios';
import ProgressIndicator from '../Utils/ProgressIndicator';
import CropImage from './CropImage';
import CropImageV2 from './CropImageV2';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        padding: theme.spacing(5),
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
    const [url, setUrl] = useState(null)
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
    }

    return (
        <div className="container">
            <Paper className={classes.paper}>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center">


                    <Grid item xs={12}>
                        <Typography >
                            1. Insérez l'url que vous souhaitez surveiller
                        </Typography>
                    </Grid>

                    <Grid item xs={12} spacing={3}>
                        <form noValidate autoComplete="off" onSubmit={handleSubmit} >
                            <TextField id="outlined-size-normal"
                                className={classes.textField}
                                label="Url"
                                variant="outlined"
                                onChange={e => setUrl(e.target.value)} />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={takeScreenShot}>
                                Commencer
                            </Button>
                        </form>
                    </Grid>



                    <LinearProgress variant="determinate" value={progress} />



                    {screenShot &&
                        <>
                            <Grid item xs={12}>
                                <Typography >
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


        </div >
    )
}

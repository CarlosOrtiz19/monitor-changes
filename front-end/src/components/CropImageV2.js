import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import { TextField, Button, Typography, Grid, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import useSetTime from "../Utils/useSetTime"
import swal from 'sweetalert';
import Progress from '../Utils/Progress';
import CropImageService from '../Service/CropImageService';

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
        width: '90ch',
    },
}));


export default function CropImageV2(props) {
    const classes = useStyles();
    const [upImg] = props.src;
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 });
    const [completedCrop, setCompletedCrop] = useState(null);
    const [timeToCheck, settimeToCheck] = useState("0 /1 * * *")
    const [isLoading, setisLoading] = useState(false)
    const { times } = useSetTime()

    const [email, setEmail] = useState(" ")

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    const saveInformation = async () => {

        await CropImageService.saveInfoCrop(crop, props.url, email).then(res => {
            if (res) {
                setisLoading(false)
                swal({
                    title: "Done!",
                    text: "Nous vous tiendrons informé",
                    icon: "success",
                    timer: 3000,
                    button: false
                })
            }
            props.restart();
            reset();
        })
            .catch(err => console.log(err.response))
    }

    const handleChange = (event) => {
        settimeToCheck(event.target.value);
    };

    const handleSubmit = (event) => {
        setisLoading(true)
        saveInformation()
        event.preventDefault();
    }

    const reset = () => {
        setCrop(null)
        setCompletedCrop(null);
    }

    return (
        <div className="container">

            <ReactCrop
                src={props.src}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
            />
            <form onSubmit={handleSubmit} className="p-3">
                <div className="row justify-content-between" >
                    <div className="col-8">
                        <Typography>
                            1. Insérez l'url que vous souhaitez surveiller
                        </Typography>
                    </div>
                    <div className="col-2">
                        <Typography>
                            vérifier chaque
                        </Typography>
                    </div>

                </div>
                <div className="row justify-content-between" >
                    <div className="col-10">
                        <TextField
                            type="email"
                            required={true}
                            value={email}
                            variant="outlined"
                            className={classes.textField}
                            error={email === ""}
                            placeholder="exemple@email.com"
                            onChange={e => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                        >
                        </TextField>

                    </div>
                    <div className="col-2">
                        <TextField
                            select
                            value={timeToCheck}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            {times.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>
                </div>

                {isLoading &&
                    <div className="p-2">
                        <Progress />
                    </div>
                }

                <div className="row">
                    <Button
                        style={{ textTransform: 'none' }}
                        className='align-middle m-2'
                        type="submit"
                        disabled={email === "" || email === " "}
                        variant="contained"
                        color="primary"
                        disabled={!completedCrop?.width || !completedCrop?.height}
                    >
                        save crop
                    </Button>
                </div>
            </form>
        </div>
    );
}


import { CardActionArea, CardContent, Divider, IconButton, Paper, Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import React, { useState } from "react";
import swal from 'sweetalert';
import CropImageService from '../Service/CropImageService';
import DeleteCrop from '../Utils/DeleteCrop';
import ShowDetails from "../Utils/ShowDetails";
import ShowImage from "../Utils/ShowImage";





const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: theme.spacing(2),
        marginBottom: theme.spacing(1),
        backgroundColor: '#FAF9F8',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper: {
        // margin: theme.spacing(1),

    },
    title: {
        fontSize: 10,
        alignSelf: "end",
        textAlign: "center",
        display: "flex",
        justifyContent: "space-between"
    },
    icons: {
        margin: theme.spacing(1),
    },

    margin: {
        margin: theme.spacing(1),
    },
    avatar: {
        backgroundColor: '#F77F07',
    },
}));


export default function ImageCard(props) {
    const classes = useStyles();
    const [showImage, setshowImage] = useState(false)
    const [showDetails, setshowDetails] = useState(false)

    const deleteCard = () => {

        swal({
            title: "Are you sure?",
            text: "You want to delete this user?",
            icon: "warning",
            buttons: ["Non", "Oui"],
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                CropImageService.deleteCropByCropId(props.monitor.id).then(res => {
                    swal({
                        title: "Done!",
                        text: "user is deleted",
                        icon: "success",
                        timer: 2000,
                        button: false
                    })
                    if(res){
                        props.deleteMonitor()
                    }
                })
            }
            
        })
    }
    const modifyCard = (e) => {
        console.log(e)

    }

    const showImageFuction = (e) => {
        console.log(showImage)
        setshowImage(true)
    }

    const showDetailsFunction = (e) => {
        console.log(showDetails)
        setshowDetails(true)
    }

    const handleClose = () => {
        setshowDetails(false)
        setshowImage(false)
    };
    return (
        <>
            <Card className={classes.root} variant="outlined">
                <CardActionArea>
                    <Paper className={classes.paper}>
                        <CardMedia
                            className={classes.media}
                            image={`data:image/jpeg;base64,${props.monitor.imageCrop.data}`}
                            onClick={showImageFuction}
                        />
                    </Paper >
                </CardActionArea>

                <CardContent className="p-2 mb-0">
                    <Typography variant="body2" color="textSecondary" component="p" align="left">
                        Titre: {props.monitor.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="left">
                        Date creation: {props.monitor.createDate}
                    </Typography>

                </CardContent>
                <CardActions className="p-1 mb-0">
                    <div className="container" >
                        <div className="row justify-content-start">

                            <div className="col-2 p-0">
                                <Tooltip title="Modifier" onClick={() => modifyCard(props.monitor.id)}>
                                    <IconButton aria-label="add to favorites">
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className="col-2  p-0">
                                <Tooltip title="Effacer">
                                    <IconButton aria-label="share" onClick={() => deleteCard(props.monitor.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className="col-md-2 offset-md-3">

                                <IconButton aria-label="share" onClick={showDetailsFunction}>
                                    <ExpandLessIcon />
                                    <Typography color="textSecondary" component="p" align="left">
                                        Détails
                                    </Typography>

                                </IconButton>
                            </div>
                        </div>
                    </div>

                    {showImage &&
                        <ShowImage src={`data:image/jpeg;base64,${props.monitor.imageCrop.data}`} handleClose={handleClose} />
                    }

                    {showDetails &&
                        <ShowDetails crop={props.monitor} handleClose={handleClose} />
                    }
                </CardActions>
            </Card>
            <Divider />
        </>
    );
}

const DeleteCurrentCardById = (id) => {
    return <DeleteCrop id={id} />;
}

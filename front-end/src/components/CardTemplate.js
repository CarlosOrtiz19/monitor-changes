import { Button, CardActionArea, Divider, Paper, CardHeader, Avatar, IconButton, Tooltip } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { CardContent, Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from "react";
import ShowDetails from "../Utils/ShowDetails";
import ShowImage from "../Utils/ShowImage";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import randomColor from "randomcolor";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import DeleteCrop from '../Utils/DeleteCrop';
import JsoupService from '../Service/JsoupService';
import swal from 'sweetalert';





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
    const [image, setimage] = useState(null)
    const [showImage, setshowImage] = useState(false)
    const [showDetails, setshowDetails] = useState(false)
    const [deleteCrop, setdeleteCrop] = useState(false)
    const [color, setcolor] = useState(null)
    const [avatarLetter, setavatarLetter] = useState("")

    const deleteCard = () => {

        swal({
            title: "Are you sure?",
            text: "You want to delete this user?",
            icon: "warning",
            buttons: ["Non", "Oui"],
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
               
                JsoupService.deleteCropByCropId(props.monitor.id).then(res => {
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
       
        //setdeleteCrop(true)
    }
    const confirmDelete = async () => {
        console.log("confirmed")


    }

    const modifyCard = (e) => {
        console.log(e)

    }

    const generateColor = () => {
        let color = randomColor();
        setcolor(color)
    }

    const sliceAvatarLetter = () => {
        const text = props.monitor.imageCrop.name;
        if (text) {
            setavatarLetter(text.slice(0, 1))
        }
    }
    useEffect(() => {
        sliceAvatarLetter()
        generateColor()
        return () => {
            setcolor(null);
            setavatarLetter("")
        }
    }, [props.monitor])
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
        setdeleteCrop(false)
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

                    {/* {deleteCrop &&
                        <DeleteCrop handleClose={handleClose} confirmDelete={confirmDelete} />
                    } */}

                </CardActions>

                {/* <CardActions>

                    <div className="container" >
                        <div className="row justify-content-end">
                            <div className="col-6 p-0 m-0 align-self-end">
                                <Button
                                    style={{ textTransform: 'none' }}
                                    color="primary"
                                    onClick={showDetailsFunction}>Plus de détails
                        </Button>
                            </div>
                        </div>
                    </div>

                   
                </CardActions> */}
            </Card>
            {/* <div className="container" >
                <div className="row justify-content-start">

                    <div className="col-2 ">
                        <EditIcon />
                    </div>
                    <div className="col-2 ">
                        <DeleteIcon color='primary' />
                    </div>
                </div>
            </div> */}

            <Divider />

        </>

        // <Card className={classes.root}>
        //     <CardHeader
        //         avatar={
        //             <Avatar aria-label="recipe" className={classes.avatar}>
        //                 R
        //             </Avatar>
        //         }
        //         action={
        //             <IconButton aria-label="settings">
        //                 <MoreVertIcon/>
        //             </IconButton>
        //         }
        //         title={props.monitor.imageCrop.name}
        //         subheader={props.monitor.createDate}

        //     />
        //     <Divider/>
        //     <CardMedia
        //         className={classes.media}
        //         image={`data:image/jpeg;base64,${props.monitor.imageCrop.data}`}
        //         title="image"
        //     />
        //     <Divider/>


        //     <CardContent>
        //         <Typography variant="body2" color="textSecondary" component="p">
        //             image to monitoring
        //         </Typography>
        //     </CardContent>
        // </Card>
    );
}

const DeleteCurrentCardById = (id) => {
    return <DeleteCrop id={id} />;
}

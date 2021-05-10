import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import { IconButton, Divider, CardActionArea, Button, Paper, Link, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { blue, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShowImage from "../Utils/ShowImage";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        margin: theme.spacing(2),
        backgroundColor: '#FAF9F8',
    },
    media: {
        //padding: theme.spacing(2),
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

    margin: {
        margin: theme.spacing(1),
    },
}));
export default function ImageCard(props) {
    const classes = useStyles();
    const [image, setimage] = useState(null)
    const [showImage, setshowImage] = useState(false)


    const bufferToSrc = () => {

    }

    const showImageFuction = (e) => {
        console.log(showImage)
        setshowImage(true)
    }

    console.log(props.monitor.email)

    const handleClose = () => {

        setshowImage(false)
    };
    return (
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

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" align="left">
                    Titre: {props.monitor.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="left">
                    Date creation: {props.monitor.createDate}
                </Typography>

            </CardContent>

            <CardActions>


                {showImage &&
                    <ShowImage src={`data:image/jpeg;base64,${props.monitor.imageCrop.data}`} handleClose={handleClose} />
                }

                <Button 
                href="#text-buttons" 
                style={{ textTransform: 'none' }}
                color="primary" 
                onClick={() => {
                    console.info("I'm a button.");
                }}>Plus de détails
                </Button>



               

            </CardActions>
        </Card>

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
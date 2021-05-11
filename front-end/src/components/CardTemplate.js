import { Button, CardActionArea, Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from "react";
import ShowDetails from "../Utils/ShowDetails";
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
    const [showDetails, setshowDetails] = useState(false)


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
                onClick={showDetailsFunction}>Plus de détails
                </Button>

                {showDetails &&
                    <ShowDetails crop={props.monitor} handleClose={handleClose} />
                }



               

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
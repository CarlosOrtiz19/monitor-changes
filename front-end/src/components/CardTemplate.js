import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import {IconButton, Divider} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {blue, red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
    },
    media: {
        height: 0,
        margin: theme.spacing(2),
        paddingTop: '56.25%', // 16:9
    },

    avatar: {
        backgroundColor: blue[500],
    },
}));

export default function ImageCard(props) {
    const classes = useStyles();
    const [image, setimage] = useState(null)


    const bufferToSrc = () => {

    }

    useEffect(() => {
        bufferToSrc();
        if (image) {
            console.log("il ya image")
        }
        return () => {
        }
    }, [])

    return (

        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title={props.monitor.imageCrop.name}
                subheader={props.monitor.createDate}

            />
            <Divider/>
            <CardMedia
                className={classes.media}
                image={`data:image/jpeg;base64,${props.monitor.imageCrop.data}`}
                title="image"
            />
            <Divider/>


            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    image to monitoring
                </Typography>
            </CardContent>
        </Card>
    );
}
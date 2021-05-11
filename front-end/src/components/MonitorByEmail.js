import React, {useEffect, useState} from "react";
import {TextField, makeStyles, Paper, Button, Typography, Grid} from '@material-ui/core';
import CardTemplate from './CardTemplate'
import JsoupService from "../Service/JsoupService";

const useStyles = makeStyles((theme) => ({
    root: {},
    paper: {
        marginTop: '0px',
        width: "75%",
        //marginLeft: theme.spacing(10),
        //marginRight: theme.spacing(5),
        padding: theme.spacing(2),
        margin: 'auto',
        variant: 'outlined'
        //talla papel
    },
    textField: {
        padding: theme.spacing(5),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100ch',
    },
}));

export default function MonitorByEmail() {
    const classes = useStyles();
    const [email, setemail] = useState("")
    const [monitors, setmonitors] = useState([])

    const deleteMonitor =() =>{
        findMonitorsBYemail();
    }


    const findMonitorsBYemail = async () => {
        const response = await JsoupService.getAllMonitorsByEmail("carlos@test");
        if(response){
            setmonitors(response.data)
        }
    }


    useEffect(() => {
        findMonitorsBYemail()
        return () => {
            setmonitors([])
        }
    }, [])
    return (
        <Grid justify="center">
            <Paper className={classes.paper}>
                <TextField id="outlined-size-normal"
                           className={classes.textField}
                           label="Email"
                           placeholder="insert the email to notify"
                           variant="outlined"
                    // onChange={e => setEmail(e.target.value)}
                />

                <Grid container>

                    {monitors.length && monitors.map(data =>
                        <Grid item key={data.id}>
                            <CardTemplate monitor={data} deleteMonitor={deleteMonitor}/>
                        </Grid>
                    )}

                </Grid>
                <div className="container">
                    <div className="row">


                    </div>
                </div>
            </Paper>
        </Grid>
    )
}
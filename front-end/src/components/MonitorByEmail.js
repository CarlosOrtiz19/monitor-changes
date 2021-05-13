import { Grid, IconButton, makeStyles, Paper, TextField, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from "react";
import JsoupService from "../Service/JsoupService";
import CardTemplate from './CardTemplate';

const useStyles = makeStyles((theme) => ({
    root: {},
    paper: {
        marginTop: '0px',
        width: "75%",
        padding: theme.spacing(2),
        margin: 'auto',
        variant: 'outlined'
    },
    textField: {
        padding: theme.spacing(3),
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100ch',
    },
}));

export default function MonitorByEmail() {
    const classes = useStyles();
    const [email, setemail] = useState(" ")
    const [monitors, setmonitors] = useState([])
    const [validationError, setvalidationError] = useState("initialState")

    const deleteMonitor = () => {
        console.log("deletemonitor")
        findMonitorsBYemail();
    }

    const findMonitorsBYemail = async () => {
        const response = await JsoupService.getAllMonitorsByEmail(email);
        console.log(response)
        if (response) {
            setmonitors(response.data)
        }
    }

    //  useEffect(() => {

    //      findMonitorsBYemail()
    //      return () => {
    //          setmonitors([])
    //      }
    //  }, [])

    const handleSubmit = (event) => {
        findMonitorsBYemail(email)
        console.log(email)
        event.preventDefault();
    }

    const handleEmailChange = (event) => {
        setemail(event.target.value)
    }
    return (
        <Grid container>

            <div>
                busyuemos por email
             </div>


            <Grid container justify="center" >
                <Paper className={classes.paper}>

                    <form onSubmit={handleSubmit} >
                        <TextField
                            variant="filled"
                            className={classes.textField}
                            error={email === ""}
                            value={email}
                            placeholder="exemple@mail.com"
                            onChange={handleEmailChange}
                            InputProps={{
                                startAdornment: (
                                    <Tooltip title="Chercher">
                                        <IconButton type="submit" value="Submit">
                                            <SearchIcon />
                                        </IconButton>
                                    </Tooltip>
                                ),
                            }}
                        >
                        </TextField>
                    </form>

                    <Grid container>
                        {monitors && monitors.map(data =>
                            <Grid item key={data.id}>
                                <CardTemplate monitor={data} deleteMonitor={deleteMonitor} />
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
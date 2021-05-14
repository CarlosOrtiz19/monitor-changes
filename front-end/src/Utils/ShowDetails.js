import { Button, Dialog, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import CropImageService from "../Service/CropImageService"

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3',
        width: '100%',
        fontWeight: 'bold',
        margin: 'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'center',
    },
    heading: {
        margin: 'auto',
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
    },
    textTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 15,
        margin: 'auto',
    },
    row: {
        textAlign: 'center',
    }
}));

export default function ShowDetails(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [fullWidth, setFullWidth] = React.useState(true);
    const [details, setdetails] = useState([])

    const getDetailsByCropId = async () => {
    
        const response = await CropImageService.getAllDetailsByCropId(props.crop.id)
        console.log(response.data)
        if (response) {
            setdetails(response.data)
        }
    }


    useEffect(() => {
        getDetailsByCropId();
        return () => {
        setdetails([])
        }
    }, [props.crop])


    const handleClose = () => {
        props.handleClose();
        setOpen(false);
    };
    return (
        <div>

            <Dialog
                fullWidth={fullWidth}
                open={open}
                onClose={handleClose}
                maxWidth={maxWidth}
            >
                <div className="container">
                    <TableContainer className={classes.root}>
                        <Table className="table">
                            <TableHead className={classes.heading}>
                                <TableRow>
                                    <TableCell className={classes.textTitle}>Dernière vérification </TableCell>
                                    <TableCell className={classes.textTitle}>Changements </TableCell>
                                    <TableCell className={classes.textTitle}>Notifié</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {details && details.map(
                                        detail =>
                                            <TableRow key={detail.id} hover className={classes.row}>
                                                <TableCell className='align-middle'>{detail.lastMonitoring}</TableCell>
                                                <TableCell className='align-middle'>{detail.stateLastMonitoring ? "Non" : "Oui"}</TableCell>
                                                <TableCell className='align-middle'> a faire</TableCell>
                                            </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <Button onClick={handleClose} color="primary">
                    Fermer
          </Button>
            </Dialog>
        </div>

    );
}



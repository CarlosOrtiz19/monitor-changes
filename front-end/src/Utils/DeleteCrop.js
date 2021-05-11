import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import JsoupService from '../Service/JsoupService';

export default function DeleteCrop(props) {
  const [open, setOpen] = React.useState(true);
 

  const handleClose = () => {
    props.handleClose();
    setOpen(false);
  };

  const deleteCrop = () => {
    props.confirmDelete()
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteCrop} color="primary">
            Oui
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



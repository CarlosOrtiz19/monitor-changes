import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ShowImage(props) {
  const [open, setOpen] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [fullWidth, setFullWidth] = React.useState(true);

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
        {props.src && (
          <img src={props.src} alt={props.title} />
        )}
          <Button onClick={handleClose} color="primary">
            Fermer
          </Button>
      </Dialog>
    </div>
  );
}


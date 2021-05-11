import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';

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


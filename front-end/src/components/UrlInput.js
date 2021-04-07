import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ShowWebPage from './ShowWebPage';
import CropImage from './CropImage';
import TakeScreenShotPuppeter from './TakeScreenShotPuppeter';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function UrlInput() {
    const classes = useStyles();
    return (
        <div>
            <TextField id="filled-basic" label="Url" variant="outlined"  />
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />


<div>
  <TakeScreenShotPuppeter/> 
</div>
<div>
  <CropImage/>    
</div>
            
        </div>
    )
}

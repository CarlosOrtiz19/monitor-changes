import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import JsoupService from '../Service/JsoupService';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function JsoupPage() {
  const [url, seturl] = useState("")
  const [session, setsession] = useState("")
  const [cookie, setcookie] = useState("")
  const [start, setstart] = useState(false)
  const [stop, setstop] = useState(false)
  const classes = useStyles();

  const stopApp = () =>{
    setstop(true);
  }

  const startApp = () =>{
    setstart(true);

    console.log("submit")

    console.log(start)

    while(start){
      setTimeout(()=>{  
        var response = JsoupService.setState(url, session, cookie)
        ;}, 3000);
        console.log("run")

      if(stop){
        console.log("stop")
        break;
      }
    }
  }

  const handleSubmit = async (evt) => {
    //evt.preventDefault();

   

  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField id="url" label="Url" variant="outlined" onChange={e => seturl(e.target.value)} />
        <TextField id="filled-basic" label="Session" variant="outlined" onChange={e => setsession(e.target.value)} />
        <TextField id="outlined-basic" label="Cookie" variant="outlined" onChange={e => setcookie(e.target.value)} />

      {start &&
          <Button type="submit" variant="contained" color="secondary"  disableElevation onClick={stopApp}>
          stop
         </Button>
      }
    
     
     {!start &&
       <Button type="submit" variant="contained" color="primary" disableElevation onClick={startApp}>
       run
      </Button>
     }
     
       
        
      </form>

      <div className="container">
        <div className="row">
          <div className="col">

          </div>
           <div className="col">
           <iframe
             id="capture"
                width="730"
                height="570"
                align="middle"
                src={url}
            />

          </div>

        </div>
      </div>
    </div>
  )
}

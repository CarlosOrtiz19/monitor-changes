import React, {useState, useCallback, useRef, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const minute = [10, 20, 30, 40, 50];
const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];


export default function TimeSelector() {
    const classes = useStyles();
    const [minutes] = useState(minute)
    const [timeTest, settimeTest] = useState(0)
    const [hours, sethour] = useState(0)
    const [day, setday] = useState(0)

    const handleChange = (event) => {
        settimeTest(event.target.value);
        console.log(timeTest)
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">minutes</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeTest}
                    onChange={handleChange}
                >
                    {minutes.map(min =>
                        <MenuItem key={min.toString()}> {min}</MenuItem>
                    )

                    }

                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Hours</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeTest}
                    placeholder="0"
                    onChange={handleChange}
                >
                    {minutes.map(min =>
                        <MenuItem key={min.toString()}> {min}</MenuItem>
                    )

                    }

                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Days</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeTest}
                    onChange={handleChange}
                >
                    {minutes.map(min =>
                        <MenuItem key={min.toString()}> {min}</MenuItem>
                    )

                    }

                </Select>
            </FormControl>

        </div>
    )
}

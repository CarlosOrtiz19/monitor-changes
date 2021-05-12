import React, {useState } from "react";

const predefindedTime = [
    {
        value: "0 /1 * * *",
        label: "1 min"
    },
    {
        value: "0 0/5 * * *",
        label: "5 min"
    },
    {
        value: "0 0/15 * * *",
        label: "15 min"
    },
    {
        value: "0 0/30 * * *",
        label: "30 min"
    },
    {
        value: "0 0 0/2 * *",
        label: "2 h"
    },
    {
        value: "0 0 0/5 * *",
        label: "5 h"
    },
    {
        value: "0 0 0 0/1 *",
        label: "1 j"
    },
    {
        value: "0 0 0 0/7 *",
        label: "1 sem"
    }]

export default function useSetTime() {
    const [times, ] = useState(predefindedTime);
    return {
        times
    }
}

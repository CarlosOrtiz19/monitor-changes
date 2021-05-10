const puppeteer = require('puppeteer');
const express = require('express');
const sharp = require('sharp');
const bufferImage = require("buffer-image");
const dbMysql = require("./Node/MysqlConnection")
const schedule = require('node-schedule');
const app = express();


const port = process.env.PORT || 4000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});

app.get('/screenshot', async (req, res) => {
    console.log("received methode 1")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: 900, height: 500});
    await page.goto(req.query.url); // URL is given by the "user" (your client-side application)


    console.log(req.query.url)
    const screenshotBuffer = await page.screenshot({fullPage: true});

    // Respond with the image
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshotBuffer.length
    });
    res.end(screenshotBuffer);

    await browser.close();
})

app.get('/cropImageSize', async (req, res) => {
    console.log("received methode 2")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: 900, height: 500});
    await page.goto(req.query.url); // URL is given by the "user" (your client-side application)
    const screenshotBuffer = await page.screenshot({fullPage: true});

    const _top = Number.parseInt(req.query.top);
    const _bottom = Number.parseInt(req.query.left);
    const _width = Number.parseInt(req.query.width);
    const _height = Number.parseInt(req.query.height);
    console.log(req.query.email)

    // console.log("top= " + _top + " _bottom= " + _bottom + " width = " + _width + "_height= " + _height)


    dbMysql.insertCrop(req.query.url, req.query.width, req.query.height, req.query.left, req.query.top, req.query.email);


    /* if (screenshotBuffer != null) {
          await sharp(screenshotBuffer).extract({ width: _width, height: _height, left: _bottom, top: _top })
             .toBuffer({ resolveWithObject: true })
             .then(info => {

                 // Respond with the image

                 console.log(info)
                 res.status(200).send(JSON.stringify(info.info));

             }).catch(err => console.log(err.response))
     }*/

    await browser.close();
})


app.listen(port, () => {
    console.log("server Started")
});
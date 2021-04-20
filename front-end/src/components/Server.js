const puppeteer = require('puppeteer');
const express = require('express');
const sharp = require('sharp');

const app = express();

const port = process.env.PORT || 4000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});

app.get('/screenshot', async (req, res) => {
    console.log("received")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 900, height: 500 });
    await page.goto(req.query.url); // URL is given by the "user" (your client-side application)


    console.log(req.query.url)
    const screenshotBuffer = await page.screenshot({ fullPage: true });

    // Respond with the image
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshotBuffer.length
    });
    res.end(screenshotBuffer);

    await browser.close();
    next()
})

app.get('/cropImageSize', async (req, res) => {
    console.log("received")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 900, height: 500 });
    await page.goto(req.query.url); // URL is given by the "user" (your client-side application)

    const _top = Number(req.query.top);
    const _left = Number(req.query.left);
    const _width = Number(req.query.width);
    const _height = Number(req.query.height);
    console.log(req.query.url)

    console.log("top= " + _top + "left= " + _left + "width = " + _width + "_height" + _height)

    const screenshotBuffer = await page.screenshot({ fullPage: true });

    var size = 0;


    if (screenshotBuffer != null) {
         await sharp(screenshotBuffer).extract({ width: _width, height: _height, left: _left, top: _top })
            .toBuffer({ resolveWithObject: true })
            .then(info => {

                // Respond with the image
               
                console.log(info)
                res.status(200).send(JSON.stringify(info.info));
              
            }).catch(err => console.log(err))
    }

    await browser.close();
})


app.listen(port, () => { console.log("server Started") });
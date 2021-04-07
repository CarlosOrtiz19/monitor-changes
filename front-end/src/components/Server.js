const puppeteer = require('puppeteer');
const express = require('express');

const app = express();

const port = process.env.PORT || 4000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
  });

app.get('/screenshot', async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 900, height: 500 });
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

app.listen(port,()=> {console.log("server Started")});
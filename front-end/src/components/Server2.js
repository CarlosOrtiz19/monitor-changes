const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

const port = process.env.PORT || 4001;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});

//-------------------------METHODS------------------------------------------------

app.get('/screenshot', async (req, res) => {
    console.log("received methode 1")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: 900, height: 500});
    await page.goto(req.query.url); 


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

// ----------------------- Eureka Config --------------------------------------------

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'node-server',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:4001',
    instanceId: 'node1',
    port: {
      '$': 4001,
      '@enabled': 'true',
    },
    vipAddress: 'localhost',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});
eureka.logger.level('debug');
eureka.start(function(error){
  console.log(error || 'complete');
});

app.listen(port, () => {
    console.log(`server Started on ${port}`)
});
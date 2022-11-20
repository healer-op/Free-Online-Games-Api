const cheerio = require("cheerio");
const axios = require("axios");
const express = require('express')

const app = express()


const port = process.env.PORT || 3000;
const domain = 'https://game3rb.com/'
const shorter = 'https://thenewscasts.com/view/'

// Get info of Online Games available

app.get('/api/online/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}category/games-online/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.main-posts').find('article').each((i,element) =>{
            data.push({
                link: $(element).find('h3').find('a').attr('href').split(`${domain}`)[1].replace('/',''),
                title: $(element).find('h3').text().replaceAll('\n', ''),
                img: $(element).find('img').attr('src'),
                sum: $(element).find('div.summaryy').text()
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})  


// Get previous And Next Page Link


app.get('/api/p/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    if(li==1){
        data.push({link: "category/games-online/page/1/"})
    }
    axios.get(`${domain}category/games-online/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1],
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

// Get Download Links

app.get('/api/d/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    axios.get(`${domain}${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('h3#download + div > div').each((i,element) =>{
            data.push({
                link: $(element).find('a#download-link').attr('href'),
                text: $(element).find('strong').text().replace('Check “How To Download” ','')
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})


// Get Direct Download Links

app.get('/api/d1/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    axios.get(`${shorter}${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('ol > li').each((i,element) =>{
            data.push({
                link: $(element).find('a').attr('href')
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log('MADE BY HEALER')
  })
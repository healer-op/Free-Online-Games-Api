const cheerio = require("cheerio");
const axios = require("axios");
const express = require('express')
const fetch = require("node-fetch");

const app = express()


const port = process.env.PORT || 3000;
const domain = 'https://game3rb.com/'
const shorter = 'https://thenewscasts.com/view/'

let urdomain = `http://localhost:3000`;

app.set('view engine', 'ejs')
app.use(express.static('public'))

// Get info of Online Games available
app.get("/", async function(req, res) {
    const res1 = await fetch(`${urdomain}/api/online/1`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/p/1`);
    const datas = await res2.json();
    res.render("index", {datar,datas});
});

app.get("/page/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/online/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/p/${li}`);
    const datas = await res2.json();
    res.render("index", {datar,datas});
});

app.get("/action", async function(req, res) {
    const res1 = await fetch(`${urdomain}/api/action/1`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/ap/1`);
    const datas = await res2.json();
    res.render("action", {datar,datas});
});

app.get("/ap/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/action/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/ap/${li}`);
    const datas = await res2.json();
    res.render("action", {datar,datas});
});

app.get("/adventure", async function(req, res) {
    const res1 = await fetch(`${urdomain}/api/adventure/1`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/adp/1`);
    const datas = await res2.json();
    res.render("adventure", {datar,datas});
});

app.get("/adp/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/adventure/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/adp/${li}`);
    const datas = await res2.json();
    res.render("adventure", {datar,datas});
});

app.get("/simulation", async function(req, res) {
    const res1 = await fetch(`${urdomain}/api/simulation/1`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/sip/1`);
    const datas = await res2.json();
    res.render("simulation", {datar,datas});
});

app.get("/sip/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/simulation/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/sip/${li}`);
    const datas = await res2.json();
    res.render("simulation", {datar,datas});
});

app.get("/racing", async function(req, res) {
    const res1 = await fetch(`${urdomain}/api/racing/1`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/rp/1`);
    const datas = await res2.json();
    res.render("racing", {datar,datas});
});

app.get("/rp/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/racing/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/rp/${li}`);
    const datas = await res2.json();
    res.render("racing", {datar,datas});
});

app.get("/sports", async function(req, res) {
    const res1 = await fetch(`${urdomain}/api/sport/1`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/sop/1`);
    const datas = await res2.json();
    res.render("sport", {datar,datas});
});

app.get("/sop/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/sport/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/sop/${li}`);
    const datas = await res2.json();
    res.render("sport", {datar,datas});
});

app.get("/horror", async function(req, res) {
    const res1 = await fetch(`${urdomain}/api/horror/1`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/hop/1`);
    const datas = await res2.json();
    res.render("horror", {datar,datas});
});

app.get("/hop/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/horror/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/hop/${li}`);
    const datas = await res2.json();
    res.render("horror", {datar,datas});
});


app.get("/search", async function(req, res) {
    var tli = req.query.s;
    const res1 = await fetch(`${urdomain}/api/search/${tli}`);
    const datar = await res1.json();
    res.render("search", {datar});
});


app.get("/d/:li", async function(req, res) {
    var li = req.params.li;
    const res1 = await fetch(`${urdomain}/api/d/${li}`);
    const datar = await res1.json();
    const res2 = await fetch(`${urdomain}/api/d2/${li}`);
    const datas = await res2.json();
    const res3 = await fetch(`${urdomain}/api/d3/${li}`);
    const datat = await res3.json();
    const res4 = await fetch(`${urdomain}/api/d4/${li}`);
    const datau = await res4.json();
    const res5 = await fetch(`${urdomain}/api/d5/${li}`);
    const datav = await res5.json();
    res.render("detail", {datar,datas,datat,datau,datav});
});

// Api ///////////////////////////////////////////////////////////////////////////////////////////////////////


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

app.get('/api/search/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}?s=${li}`).then(urlResponse =>{
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
    if(li==1 || li==2){
        data.push({link: "1"})
    }
    axios.get(`${domain}category/games-online/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1].replace("category/games-online/page/","").replace("/",""),
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/action/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}category/pc-games/action/page/${li}/`).then(urlResponse =>{
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


app.get('/api/ap/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    if(li==1 || li==2){
        data.push({link: "1"})
    }
    axios.get(`${domain}category/pc-games/action/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1].replace("category/pc-games/action/page/","").replace("/",""),
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/adventure/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}category/pc-games/adventure/page/${li}/`).then(urlResponse =>{
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


app.get('/api/adp/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    if(li==1 || li==2){
        data.push({link: "1"})
    }
    axios.get(`${domain}category/pc-games/adventure/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1].replace("category/pc-games/adventure/page/","").replace("/",""),
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})
app.get('/api/simulation/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}category/pc-games/simulation/page/${li}/`).then(urlResponse =>{
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


app.get('/api/sip/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    if(li==1 || li==2){
        data.push({link: "1"})
    }
    axios.get(`${domain}category/pc-games/simulation/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1].replace("category/pc-games/simulation/page/","").replace("/",""),
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/racing/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}category/pc-games/racing/page/${li}/`).then(urlResponse =>{
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


app.get('/api/rp/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    if(li==1 || li==2){
        data.push({link: "1"})
    }
    axios.get(`${domain}category/pc-games/racing/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1].replace("category/pc-games/racing/page/","").replace("/",""),
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/sport/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}category/pc-games/sports/page/${li}/`).then(urlResponse =>{
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


app.get('/api/sop/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    if(li==1 || li==2){
        data.push({link: "1"})
    }
    axios.get(`${domain}category/pc-games/sports/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1].replace("category/pc-games/sports/page/","").replace("/",""),
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/horror/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
   
    
    axios.get(`${domain}category/pc-games/horror/page/${li}/`).then(urlResponse =>{
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


app.get('/api/hop/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    if(li==1 || li==2){
        data.push({link: "1"})
    }
    axios.get(`${domain}category/pc-games/horror/page/${li}/`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.wp-pagenavi').find('a').each((i,element) =>{
            data.push({
                link: $(element).attr('href').split(`${domain}`)[1].replace("category/pc-games/horror/page/","").replace("/",""),
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

app.get('/api/d2/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    axios.get(`${domain}${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div.post-body.entry-content').find('p').each((i,element) =>{
            data.push({
                img: $(element).find('img').attr('src'),
                text:$(element).text()
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/d3/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    axios.get(`${domain}${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('div#post-content > div.post-body.entry-content > h3:nth-child(4) + p + p').each((i,element) =>{
            data.push({
                text:$(element).text().split(">")[1]
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/d4/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    axios.get(`${domain}${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('h1.post-title.entry-title').each((i,element) =>{
            data.push({
                text:$(element).text()
            });
        });
    })
    .then(() => {
        res.send(data);
    })

})

app.get('/api/d5/:li', (req, res) => {
    var li = req.params.li;
    var data=[];
    axios.get(`${domain}${li}`).then(urlResponse =>{
        const $ = cheerio.load(urlResponse.data);
        $('video').each((i,element) =>{
            data.push({
                text:$(element).find('source').attr('src')
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
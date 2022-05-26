//birtday of each batsman
const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard"

console.log("before");
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractHTML(html);
    }
}

//unique nhi milane par wrap karna padega
//find()-kissi particular area mein search karne ke liye
//data segregate-html ko file mein dalkar koi class attribute serach kar sakte hai

function extractHTML(html) {
    let $ = cheerio.load(html);
    let inning = $('.card.content-block.match-scorecard-table>.Collapsible');
    for (let i = 0; i < inning.length; i++) {

        let teamnameelmt = $(inning[i]).find('.header-title.label');
        let teamname = teamnameelmt.text();

        teamname = teamname.split('INNINGS')[0];
        teamname = teamname.trim();


        let batsman = $(inning[i]).find(".table.batsman");
        let allbatsman = $(batsman).find("tr");
        for (let j = 0; j < allbatsman.length; j++) {
            let allcolsofplayer = $(allbatsman[j]).find("td");
            let isbatsmancol= $(allcolsofplayer[0]).hasClass('batsman-cell');
            if(isbatsmancol==true){
                let href = $(allcolsofplayer[0]).find("a").attr("href");  
                let name = $(allcolsofplayer[0]).text();  
                let link="https://www.espncricinfo.com" + href;
                // console.log(href)
                // console.log(`team : ${teamname} playername : ${name}`);
                getbirthdaypage(link,name,teamname);
            }
            
        }
    }

}

function getbirthdaypage(url,name,teamname){
    request(url,cb);
    function cb(err,response,html){
        if(err){
            console.log(err);
        }else{
           extractbirthday(html,name,teamname);
        }
    }
}

function extractbirthday(html,name,teamname){
    let $ = cheerio.load(html);
    let details=$(".player-card-description");
    let birthday=$(details[1]).text();
    // console.log(birthday);
    console.log(`${name} plays for ${teamname} born on ${birthday}`);
}

console.log("after");
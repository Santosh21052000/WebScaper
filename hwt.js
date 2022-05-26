//winning team highest wicket taker name 
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

let wteamname;
function extractHTML(html) {
    let $ = cheerio.load(html);
    let teamarr = $('.match-info.match-info-MATCH.match-info-MATCH-half-width  .team');
    for (let i = 0; i < teamarr.length; i++) {
        let hasclasss = $(teamarr[i]).hasClass('team-gray');
        if (hasclasss == false) {
            let teamname = $(teamarr[i]).find('.name')
            wteamname = teamname.text().trim();

        }
    }


    let inning = $('.card.content-block.match-scorecard-table>.Collapsible');
    let htmlstr = "";
    let hwt = 0;
    let hwtname = "";
    for (let i = 0; i < inning.length; i++) {
        //    let chtml= $(inning[i]).html();
        //    htmlstr+=chtml;
        let teamnameelmt = $(inning[i]).find('.header-title.label');
        let teamname = teamnameelmt.text();
        // console.log(teamname);
        teamname = teamname.split('INNINGS')[0];
        teamname = teamname.trim();
        // console.log(teamname);
        
        if (wteamname != teamname) {
            // console.log(teamname);
            let bolwling = $(inning[i]).find(".table.bowler");
            let allbowler = $(bolwling).find("tr");
            for (let j = 0; j < allbowler.length; j++) {
                let bowlerstatus = $(allbowler[j]).find("td");
                let name = $(bowlerstatus[0]).text();
                let wicket = $(bowlerstatus[4]).text();
                // console.log("Bowler Name : ",name);
                // console.log("Histest wicket : ",wicket); 
                if (wicket > hwt) {
                    hwt = wicket;
                    hwtname = name;
                }
            }
        }
        
    }
    console.log("WINNING TEAM : ",wteamname);
    console.log("Name of Highest Wicket Taker : ",hwtname," and his wickets are : ",hwt);

    // console.log(htmlstr);
}

console.log("after");
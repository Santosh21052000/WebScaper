const request=require("request");
const cheerio =require("cheerio");

const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";

console.log("before");
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        extractHTML(html);
    }
}

function extractHTML(html){
   let $= cheerio.load(html);
   let elmarr= $(".match-comment-padder .match-comment-wrapper .match-comment-long-text");
   let txt= $(elmarr[0]).text();
   let data=$(elmarr[0]).html();
   console.log("text data:= ",txt);
   console.log("html data:= ",data);
}

console.log("after");
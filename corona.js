const request = require("request");
const cheerio=require("cheerio");
const chalk=require('chalk');
console.log("before");
request('https://www.worldometers.info/coronavirus', cb);

console.log("after");
function cb(error, response, html) {
    if(error){
        console.error('error:', error);
    }else{
        handleHtml(html);
    }
   
}
function handleHtml(html){
    let selTool= cheerio.load(html);
    let carr=selTool("#maincounter-wrap span");
    // for(let i=0;i<carr.length;i++){
    //      let data= selTool(carr[i]).text();
    //      console.log(data);
    // }
    // let h1s=  selTool("h1");
    // console.log(h1s.length);
   let tcase= selTool(carr[0]).text();
   let dcase=  selTool(carr[1]).text();
   let rcase= selTool(carr[2]).text();
   console.log(chalk.gray('Total Case :'+tcase));
   console.log(chalk.red('Death Case :'+dcase));
   console.log(chalk.blue('Recovered Case :'+rcase));
}

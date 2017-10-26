const http    = require('http');
const https   = require('https');
const cheerio = require('cheerio');
const request = require('request');

const fn_index = async(ctx,next) =>{
    var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391";
    startRequest(url);
    ctx.render('spider.html',{});
};

const startRequest = function(url){

    https.get(url,function(res){
        console.log(res);
        var i = 0;
        var html = '';
        var title = [];
        res.on('data',function(chunk){
            html += chunk;
        });
        res.on('end',function(res){
            console.log(html);
            if(false){
                parseHtml(html,i);
            }else{
                console.log(html);
                parseHtmlJd(html,i);
            }
        })
    }).on('error',function(err){
        console.log(err);
    })
};

const parseHtml = function(html,i){
    var $ = cheerio.load(html); //采用cheerio模块解析html
    var time = $('.article-info a:first-child').next().text().trim();
    var news_item = {
        //获取文章的标题
        title: $('div.article-title a').text().trim(),
        //获取文章发布的时间
        Time: time,
        //获取当前文章的url
        link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
        //获取供稿单位
        author: $('[title=供稿]').text().trim(),
        //i是用来判断获取了多少篇文章
        i: i = i + 1,
    };
    console.log(news_item);     //打印新闻信息
};

const parseHtmlJd = function(html,i){
    console.log(html);
};

const fn_book = async(ctx, next) => {
    var isbn = ['9787505735835','9787503942112'],
        url = 'https://search.jd.com/Search?keyword=';
    startRequest(url+isbn[0]);
    // for(var i=0;i<isbn.length;i++){
    //     startRequest(url+isbn[i]);
    // }
    await next();
};


module.exports={
    'GET /home/spider':fn_index,
    'GET /home/jdbook':fn_book
};
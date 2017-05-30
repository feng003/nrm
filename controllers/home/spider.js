
const http    = require('http');
const cheerio = require('cheerio');
const request = require('request');

const fn_index = async(ctx,next) =>{
    var url = "http://www.ss.pku.edu.cn/index.php/newscenter/news/2391"; 

    startRequest(url);
    ctx.render('spider.html',{});
}

const startRequest = function(url){
    http.get(url,function(res){
        var i = 0;
        var html = '';
        var title = [];
        res.on('data',function(chunk){
            html += chunk;
        })
        res.on('end',function(res){
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
        })

    }).on('error',function(err){
        console.log(err);
    })
}

module.exports={
    'GET /home/spider':fn_index    
}
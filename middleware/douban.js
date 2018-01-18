/**
 * Created by User on 2017/11/16.
 */
const fs = require('fs');
const path = require('path');
const request = require('request');
const model = require(process.cwd() + '/lib/model');
const Book = model.book;

class douban {

    constructor(){
        // console.log(Book);
    }

    getBook(isbn){
        let url = "https://api.douban.com/v2/book/isbn/"+isbn;
        return new Promise(function (resolve, reject) {
            request({url: url, json: true, method: 'GET',}, function (error, response, body) {
                if (error) return reject(error);
                resolve(body);
            })
        });
    }

    proxyGetBook(isbn){
        let targetUrl = "https://api.douban.com/v2/book/isbn/"+isbn;
        // 代理服务器
        const proxyHost = "http-dyn.abuyun.com";
        const proxyPort = 9020;
        // 代理隧道验证信息
        const proxyUser = "H2PZ63ER63M6ZG6D";
        const proxyPass = "F3DC5AA716CFE467";
        const proxyUrl = "http://" + proxyUser + ":" + proxyPass + "@" + proxyHost + ":" + proxyPort;
        const proxiedRequest = request.defaults({"proxy": proxyUrl});
        const options = {
            url     : targetUrl,
            headers : {
                "Proxy-Switch-Ip" : "yes"
            }
        };

        var p = new Promise(function(resolve,reject){
            proxiedRequest.get(options, function (err, response, body) {
                if(err) return reject(err);
                resolve(body);
            })
        });
        return p;
    }

    async findMaxIsbn(){
        const rs = await Book.findOne({order:['isbn13','desc']});
        return rs ;
    }

    saveBookToFile(isbn,data){
        fs.writeFile(path.join('./logs',isbn+'.txt'), JSON.stringify(data),function (err) {
            if(err) throw  err;
        });
    }

    async saveBookToSql(data){
        // console.log(data);
        // fs.writeFile(path.join('./logs/1.txt'), JSON.stringify(data),function (err) {
        //     if(err) throw err;
        // });
        await Book.create(data);
    }

    sleep(time){
        new Promise((resolve)=>{
            setTimeout(resolve,time);
        })
    }
}

module.exports = douban;
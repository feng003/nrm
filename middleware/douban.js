/**
 * Created by User on 2017/11/16.
 */
const fs = require('fs');
const path = require('path');
const request = require('request');

class douban{
    constructor(){

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

    saveBook(isbn,data){
        fs.writeFile(path.join('./logs',isbn+'.txt'), JSON.stringify(data),function (err) {
            if(err) throw  err;
        });
    }

    sleep(time){
        new Promise((resolve)=>{
            setTimeout(resolve,time);
        })
    }
}

module.exports = douban;
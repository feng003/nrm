const request = require('request');
const model = require(process.cwd() + '/lib/model');
const Book  = model.book;

const fn_index = async function(ctx,next){
        // 要访问的目标页面
        let  i = 1;
        let  isbn = "9787510802713";
        isbn = parseInt(isbn) + i*10;
        const targetUrl = "https://api.douban.com/v2/book/isbn/"+isbn;
        console.log(isbn + "##" + targetUrl);
        // 代理服务器
        const proxyHost = "http-dyn.abuyun.com";
        const proxyPort = 9020;
        // 代理隧道验证信息
        const proxyUser = "H2PZ63ER63M6ZG6D";
        const proxyPass = "F3DC5AA716CFE467";
        const proxyUrl = "http://" + proxyUser + ":" + proxyPass + "@" + proxyHost + ":" + proxyPort;
        const proxiedRequest = request.defaults({"proxy": proxyUrl});
        const options = {
            url     : url,
            headers : {
                "Proxy-Switch-Ip" : "yes"
            }
        };

        proxiedRequest.get(options, function (err, ctx, body) {
            if(body !== undefined){
                let obj = JSON.parse(body);
                if(obj.isbn13){
                    //TODO await 一个 Promise 对象或者任何要等待的值
                  // await Book.createBook(obj);
                }else{
                  console.log("error" + isbn);
                }
            }else{
                console.log("error");
            }
        }).on("error", function (err) {
            console.log(err);
        });
};

module.exports={
    'GET /home/douban':fn_index
};
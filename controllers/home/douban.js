const douban = require('../../middleware/douban');

const fn_index = async function(ctx,next){

    let dou = new douban();
    let isbn = "9787510804623";
    for (let i=1;i<=10;i++){
        try{
            isbns = parseInt(isbn) + i*10;
            book = await dou.proxyGetBook(isbns);
            await dou.saveBookToFile(isbns,book);
        }catch (err){
            console.log(err);
        }
    }

};

const fn_book = async function (ctx,next) {
    let dou = new douban();
    let isbn = '9787000000001';
    let success = [];
    let error = [];
    for(let i=0;i<10;i++){
        isbn = parseInt(isbn) + i*10;
        try{
            const book = await dou.getBook(isbn);
            if(book['isbn13']){
                let obj = {'title':book.title,'isbn13':book.isbn13};
                success.push(obj);
            }else{
                error.push(book);
            }
        }catch (err){
            console.log(err);
        }
    }
    dou.saveBookToSql(success);
};

module.exports={
    'GET /home/douban':fn_index,
    'GET /home/book':fn_book
};
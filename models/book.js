const db = require('../config/db');

const book = db.defineModel('book',{
    title:db.STRING,
    sub_title:db.STRING,
    author:db.STRING,
    api_type:db.INTEGER,
    translator:db.STRING,
    price:db.DECIMAL(10,2),
    pub_date:db.STRING,
    pub_place:db.STRING,
    publisher:db.STRING,
    print_date:db.STRING,
    binding:db.STRING,
    pages:db.STRING,
    author_intro:db.TEXT,
    summary:db.TEXT,
    catalog:db.TEXT,
    tags:db.TEXT,
    image:db.STRING,
    isbn10: db.STRING,
    isbn13:{
        type: db.STRING(100),
        unique: true
    },
    levelNum :db.STRING
});

const createBook = async function (data) {
    await book.create({
        title: data.title,
        author: data.author,
        isbn13:data.isbn13
    });
    return true
};

module.exports = {
    book:book,
    createBook:createBook
};

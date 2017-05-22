/**
 * Created by zhang on 2016/12/13.
 */
"use strict";
const fs = require('fs'),
    fileList = [];

function addMapping(router,mapping)
{
    for(var url in mapping){
        if(url.startsWith('GET ')){
            var path = url.substring(4);
            router.get(path,mapping[url]);
            //console.log(`register URL mapping: GET ${path}`)
        }else if(url.startsWith('POST ')){
            var path = url.substring(5);
            router.post(path,mapping[url]);
            //console.log(`register URL mapping: POST ${path}`);
        }else if(url.startsWith('DELETE ')){
            var path = url.substring(7);
            router.del(path, mapping[url]);
            //console.log(`register URL mapping: DELETE ${path}`);
        }else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router)
{
    // var files = fs.readdirSync(__dirname+'/controllers');
    var files = walk(__dirname+'/controllers');
    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    });

    for(var f of js_files){
        // console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' +f );
        addMapping(router,mapping);
    }
}
/**
 * 遍历文件夹
 * @param path 文件路径
 * @param dir  二级目录名称
 * @returns {Array}
 */
function walk(path,dir=""){
    let dirList = fs.readdirSync(path);
    dirList.forEach(function(item){
        let newDir = dir ? dir+"/"+item : item;
        let pathItem = path + '/' + item;
        if(fs.statSync(pathItem).isFile()){
            fileList.push(newDir);
        }else if(fs.statSync(pathItem).isDirectory()){
            walk(pathItem,item);
        }
    });

    return fileList;
}

//一个模块可以通过module.exports或exports将函数、变量等导出，以使其它JavaScript脚本通过require()函数引入并使用。
module.exports = function(dir){

    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router,controllers_dir);
    return router.routes();
};
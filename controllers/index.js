/**
 * Created by zhang on 2016/12/13.
 */

var readline = require('readline');
var fs = require('fs');
var stream   = require('stream');

var fn_index = async(ctx,next)=>{
    ctx.render('index.html',{
        title:'welcome'
    });
};

var fn_flexbox = async(ctx,next)=>{
    ctx.render('flexbox.html',{
        title:'welcome'
    });
};

var fn_files = async(ctx,next)=>{
    var logName = __dirname + './../public/shunhehui.log';
    var logNew  = __dirname + './../public/shunhehuiNew.log';
    var logNew2 = __dirname + './../public/shunhehuiNew2.log';

    var streamFile = function(filename){
        var instream  = fs.createReadStream(filename);
        var outstream = new stream;
        return readline.createInterface(instream, outstream);
    };

    var rl = streamFile(logName);

    var i = 0;
    var startTime,stopTime;
    var errCount = 0;

    var colectorNum = '';
    var Datetemp1 = new Date();

    startTime = Datetemp1.getFullYear() + "-" + (Datetemp1.getMonth() + 1) + "-" + Datetemp1.getDate() + " " + Datetemp1.getHours() + ":" + Datetemp1.getMinutes() + ":" + Datetemp1.getSeconds() + ":" + Datetemp1.getMilliseconds();

    rl.on('line', function(line) {
        if(i <= 6000000 ) {
            var data = line.toString();
            var err = new RegExp('指令超时');
            if(err.test(data)) {
                errCount ++;
                colectorNum = data.substr(data.length - 15 , 9);
                console.log(colectorNum);
                // console.log(line.toString());
                // fs.appendFileSync('超时记录.txt', data + '\r\n', options = { encoding: 'utf8'});
            }
            if(data.indexOf('UPDATE `user` SET `tjstr`') > -1 ){
                fs.appendFileSync(logNew, data + '\r\n', options = { encoding: 'utf8'});
                console.log(i + '、' +line.toString());
            }
            if(data.indexOf('INSERT INTO `user` ') > -1 ){
                fs.appendFileSync(logNew2, data + '\r\n', options = { encoding: 'utf8'});
                console.log(i + '、' +line.toString());
            }
        } else {
            console.log('\n总共输出了' + (i-1) + '行');
            rl.close();
        }
        i++;
        // var req = someProcessingJob(line);
        // someStatisticJob(req);
        //类似forEach，处理每行日志的数据，一般先读，再执行统计代码
    });

    rl.on('close',function(){
        var Datetemp2 = new Date();
        stopTime = Datetemp2.getFullYear() + "-" + (Datetemp2.getMonth() + 1) + "-" + Datetemp2.getDate() + " " + Datetemp2.getHours() + ":" + Datetemp2.getMinutes() + ":" + Datetemp2.getSeconds() + ":" + Datetemp2.getMilliseconds();
        console.log('\n输出结束！');
        console.log('开始时间：' + startTime);
        console.log('结束时间：' + stopTime);
        console.log('指令超时的数量为：' + errCount + '个');
        //文件结束，整理一下统计数据并输出
        process.exit(0);   //加上这一行可以强行结束程序，否则还会继续输出接下来的3,4,5,6直到最后一行。
    });
};

var fn_signin = async(ctx,next)=>{
    var name = ctx.request.body.name || "",
        pwd = ctx.request.body.pwd || "";
    console.log("name:"+name+", pwd:"+pwd);
    if(name =='koa' && pwd === '123456')
    {
        ctx.response.body = `<h2>welcome ${name} !</h2>`
    }else{
        ctx.response.body = ` <h2>Login failed</h2>
            <p><a href="/"> Try again</a></p>`;
    }
};

module.exports = {
    'GET /':fn_index,
    'GET /flexbox':fn_flexbox,
    'GET /files':fn_files,
    'POST /signin':fn_signin
};

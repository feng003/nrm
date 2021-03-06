/**
 * Created by zhang on 2017/1/2.
 */

var path = require('path');
var baseLogPath = path.resolve(__dirname,'../logs');

//错误日志输出完整路径
var errorPath     = '/error';
var errorFileName = "error";
var errorLogPath  = baseLogPath + errorPath + "/" + errorFileName;

//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

// module.exports = {
//     "appenders":
//         [
//             //错误日志
//             {
//                 "category":"errorLogger",             //logger名称
//                 "type": "dateFile",                   //日志类型
//                 "filename": errorLogPath,             //日志输出位置
//                 "alwaysIncludePattern":true,          //是否总是有后缀名
//                 "pattern": "-yyyy-MM-dd-hh.log",       //后缀，每小时创建一个新的日志文件
//                 "path": errorPath                     //自定义属性，错误日志的根目录
//             },
//             //响应日志
//             {
//                 "category":"resLogger",
//                 "type": "dateFile",
//                 "filename": responseLogPath,
//                 "alwaysIncludePattern":true,
//                 "pattern": "-yyyy-MM-dd-hh.log",
//                 "path": responsePath
//             }
//         ],
//     "levels":                                     //设置logger名称对应的的日志等级
//     {
//         "errorLogger":"ERROR",
//         "resLogger":"ALL"
//     },
//     "baseLogPath": baseLogPath                  //logs根目录
// };

module.exports = {
    appenders: {
        "errorLogger": {
            "type": 'dateFile',
            "filename": errorLogPath,
            "alwaysIncludePattern":true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log",       //后缀，每小时创建一个新的日志文件
            "path": errorPath
        },
        "resLogger":{
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": responsePath
        }
    },
    categories: {
        default: {
            appenders: ['errorLogger','resLogger'],
            level: 'error'
        }
    }
};
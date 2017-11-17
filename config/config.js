/**
 * Created by zhang on 2016/12/14.
 */
const fs = require('fs');
const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

var config = null;
if(process.env.NODE_ENV === 'test'){
    // console.log(`Load ${testConfig}...`);
    config = require(testConfig);
}else{
    // console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    //TODO default and product
    try{
        if (fs.statSync(overrideConfig).isFile()) {
            // console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config, require(overrideConfig));
        }
    }catch(err){
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;

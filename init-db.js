/**
 * Created by zhang on 2016/12/14.
 */

require('babel-core/register')({
    presets: ['stage-3']
});

const model = require(process.cwd() + '/lib/model');
model.sync();

console.log('init db ok.');
// process.exit(0);

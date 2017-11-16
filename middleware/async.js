/**
 * Created by User on 2017/10/31.
 */

for(let i=0;i<5;i++){
    setTimeout(function(){
        console.log(i)
    });
};

for(let i=0;i<5;i++){
    (function(j){
        setTimeout(function(){
            console.log(j)
        });
    })(i)
};

const sleep = (time)=>new Promise((resolve)=>{
    setTimeout(resolve,time);
})

(async ()=>{
    for(var i=0;i<5;i++){
    await sleep(1000);
    console.log(i);
}
await sleep(1000);
console.log(i);
})()
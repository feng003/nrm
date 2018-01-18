/**
 * Created by User on 2018/1/17.
 */

const puppeteer = require('puppeteer');
// async function run() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://baidu.com');
//     await page.screenshot({path: 'github.png'});
//     browser.close();
// }
// run();

// let scrape = async () => {
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();
//
//     await page.goto('http://books.toscrape.com/');
//     await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
//     await page.waitFor(1000);
//
//     const result = await page.evaluate(() => {
//         let title = document.querySelector('h1').innerText;
//         let price = document.querySelector('.price_color').innerText;
//
//         return {
//             title,
//             price
//         }
//
//     });
//
//     browser.close();
//     return result;
// };

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    let arr = [];
    for(let i=1; i<=5; i++) {
        let url = "http://book.jd.com/booktop/0-0-1.html?category=1713-0-0-1-10001-"+i+"#comfort";
        await page.goto(url);

        const result = await page.evaluate(() => {
            let data = []; // 初始化空数组来存储数据
            let elements = document.querySelectorAll('.mc > ul > li'); // 获取所有书籍元素
            for (var element of elements){

                let title = element.childNodes[5].children[0].innerText; // 获取标题
                let auther = element.childNodes[5].children[1].innerText;
                let publisher =element.childNodes[5].children[2].innerText;
                let price = element.childNodes[5].children[3].innerText;// 获取价格

                data.push({title, price, auther, publisher}); // 存入数组
            }
            return data;
        });
        arr.push(result);
    }
    return arr;
    browser.close();
};

scrape().then((value) => {
    console.log(value); // Success!
    console.log('data total number'+value.length);
});
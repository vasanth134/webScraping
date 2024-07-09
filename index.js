const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://www.linkedin.com/login');

    // Log in
    await page.type('#username',process.env.LINKEDIN_USERNAME ,{delay : 100});
    await page.type('#password',process.env.LINKEDIN_PASSWORD,{delay : 100});
    await page.click('[type="submit"]');
    await page.waitForNavigation();

    // Navigate to profile
    await page.goto('https://www.linkedin.com/in/web-scraping-1bb834317/');
    // await page.waitForXPath('//*[@id="ember420"]/h1');
    await page.waitForSelector('.text-heading-xlarge');
    // Scrape data
    const nameElement = await page.$('.text-heading-xlarge.inline.t-24.v-align-middle.break-words');
    const headlineElement = await page.$('.text-body-medium.break-words');
    const locationElement = await page.$('.text-body-small.inline.t-black--light.break-words');

    const name = nameElement ? await page.evaluate(el => el.innerText, nameElement) : 'Name not found';
    const headline = headlineElement ? await page.evaluate(el => el.innerText, headlineElement) : 'Headline not found';
    const location = locationElement ? await page.evaluate(el => el.innerText, locationElement) : 'Location not found';    
    const profileData = { name, headline, location };

    console.log(profileData);
await browser.close();
})();










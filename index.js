import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // launch browser (chromium browser) with headless: false means the browser will be visible
  // const splitsea_page = await browser.newPage(); // create a new page
  // await splitsea_page.goto('https://splitsea.ai/'); // go to the url
  // const splitsea_title = await splitsea_page.title();
  // const splitsea_url = await splitsea_page.url();
  // console.log('title: ', splitsea_title);
  // console.log('url: ', splitsea_url);
  // await splitsea_page.screenshot({ path: 'splitsea_screenshot.png' }); // take a screenshot of the page/url

  // const grabOneHowTo = await splitsea_page.evaluate(() => {
  //   const singleHowTo = document.querySelector(
  //     '.text-gray-600.leading-relaxed.text-sm.sm\\:text-base.group-hover\\:text-gray-800.transition-colors.duration-300'
  //   );
  //   return singleHowTo.innerText;
  // });

  // console.log('This is a single how-to: ', grabOneHowTo);

  // const grabAllHowTos = await splitsea_page.evaluate(() => {
  //   // evaluate the page
  //   const techTags = document.querySelectorAll(
  //     // select the technologies
  //     '.text-gray-600.leading-relaxed.text-sm.sm\\:text-base.group-hover\\:text-gray-800.transition-colors.duration-300'
  //   );
  //   let technologies = []; // create an array to store the technologies
  //   techTags.forEach((tag) => {
  //     technologies.push(tag.innerText); // push the technologies to the array
  //   });
  //   return technologies.length > 0 ? technologies : null; // return the technologies if the array is not empty else return null
  // });

  // console.log('These are all the how-tos:', grabAllHowTos); // log the technologies

  // quotes.toscrape.com
  const quotes_page = await browser.newPage();
  await quotes_page.goto('https://quotes.toscrape.com/');
  const quotes_title = await quotes_page.title();
  const quotes_url = await quotes_page.url();
  console.log('title: ', quotes_title);
  console.log('url: ', quotes_url);
  await quotes_page.screenshot({ path: 'quotes_screenshot.png' });

  // const grabOneQuote = await quotes_page.evaluate(() => {
  //   const singleQuote = document.querySelector('.quote');
  //   return singleQuote.innerText;
  // });
  // console.log('This is a single quote:', grabOneQuote);

  const grabAllQuotes = await quotes_page.evaluate(() => {
    const quotes = document.querySelectorAll('.quote');
    let quotesArray = [];
    quotes.forEach((quote) => {
      const actualQuote = quote.querySelector('.text');
      const actualAuthor = quote.querySelector('.author');
      quotesArray.push({
        quote: actualQuote.innerText,
        author: actualAuthor.innerText,
      });
    });

    return quotesArray.length > 0 ? quotesArray : null;
  });

  console.log('These are all the quotes:', grabAllQuotes);

  await quotes_page.click('a[href="/login"]');

  await quotes_page.type('#username', 'admin');
  await quotes_page.type('#password', 'Password123');

  await quotes_page.click('input[value="Login"]');

  // await browser.close(); // close the browser
})();

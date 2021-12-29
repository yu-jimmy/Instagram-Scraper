const puppeteer = require('puppeteer');

const scrape = async (url, username, password) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/accounts/login');

    await page.waitFor(5000);

    await page.type('[name=username]', username);
    await page.type('[name=password]', password);
    await page.click('[type=submit]');

    await page.waitFor(5000);

    await page.goto(url);

    await page.waitForSelector('img ', {
        visible: true
    });

    const [pfp] = await page.$x('//*[@id="react-root"]/section/main/div/header/div/div/span/img');
    const pfpSrc = await pfp.getProperty('src');
    const pfpSrcTxt = await pfpSrc.jsonValue();

    const [pageName] = await page.$x('//*[@id="react-root"]/section/main/div/header/section/div[1]/h2');
    const pageNameContent = await pageName.getProperty('textContent');
    const pageNameTxt = await pageNameContent.jsonValue();

    const [numPosts] = await page.$x('//*[@id="react-root"]/section/main/div/header/section/ul/li[1]/span/span');
    const numPostsContent = await numPosts.getProperty('textContent');
    const numPostsTxt = await numPostsContent.jsonValue();

    const [followers] = await page.$x('//*[@id="react-root"]/section/main/div/header/section/ul/li[2]/a/span');
    const followersContent = await followers.getProperty('textContent');
    const followersTxt = await followersContent.jsonValue();

    const [following] = await page.$x('//*[@id="react-root"]/section/main/div/header/section/ul/li[3]/a/span');
    const followingContent = await following.getProperty('textContent');
    const followingTxt = await followingContent.jsonValue();

    const [aboutHeader] = await page.$x('//*[@id="react-root"]/section/main/div/header/section/div[2]/h1');
    const aboutHeaderContent = await aboutHeader.getProperty('textContent');
    const aboutHeaderTxt = await aboutHeaderContent.jsonValue();
    
    const [aboutBody] = await page.$x('//*[@id="react-root"]/section/main/div/header/section/div[2]/span');
    const aboutBodyContent = await aboutBody.getProperty('textContent');
    const aboutBodyTxt = await aboutBodyContent.jsonValue();

    let IGData = new Object();
    IGData.page = pageNameTxt;
    IGData.followers = followersTxt;
    IGData.following = followingTxt;
    IGData.posts = numPostsTxt;
    IGData.aboutHeader = aboutHeaderTxt;
    IGData.aboutBody = aboutBodyTxt; 
    IGData.profile = pfpSrcTxt;

    console.log(IGData);

    browser.close();
}

scrape("https://www.instagram.com/tonton.friends/", 'IGusername', 'IGpassword');

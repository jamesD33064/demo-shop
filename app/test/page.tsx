"use client"

import { useEffect } from 'react';
import puppeteer from 'puppeteer';

export default function Crawler() {
  // useEffect(() => {
  //   async function fetchData() {
  //     const browser = await puppeteer.launch();
  //     const page = await browser.newPage();
  //     await page.goto('https://www.instagram.com/seseragi.tart/');

  //     await page.waitForSelector('article');

  //     // 獲取貼文內容
  //     const posts = await page.$$eval('article img', (imgs) =>
  //       imgs.map((img) => img.getAttribute('src'))
  //     );

  //     console.log(posts);

  //     await browser.close();
  //   }

  //   fetchData();
  // }, []);

  return <div>IG Crawler</div>;
}

import axios from 'axios';
import puppeteer from 'puppeteer';
import { Response } from 'express';

export async function pingSelf(url: string) {
  try {
    const { data } = await axios.get(url);
    console.log(`Server pinged successfully: ${data.message}`);
    return true;
  } catch (e: any) {
    console.error(`Error pinging server: ${e.message}`);
    return false;
  }
}

export async function fillFormMultipleTimes(url: string, repetitions: number) {
  const browser = await puppeteer.launch({ headless: true });

  for (let i = 0; i < repetitions; i++) {
    const page = await browser.newPage();
    await page.goto(url);

    // Generate random email and password
    const email = `testuser${i}@example.com`;
    const password = `password${i}`;

    // Fill the email field
    await page.type('#email', email);

    // Fill the password field
    await page.type('#password', password);

    // Submit the form
    await page.click('input[type="submit"]');
    await page.close();
  }

  await browser.close();
}

export async function basicWebsiteCheck(
  res: Response,
  url = 'http://localhost:5500/frontend'
) {
  try {
    // Launch Puppeteer browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to a webpage
    await page.goto(url);

    // Perform web automation tasks (e.g., scrape content)
    const pageTitle = await page.title();

    // Close the browser
    await browser.close();

    // Respond with automation result
    res.json({ title: pageTitle });
  } catch (error) {
    console.error('Automation Error:', error);
    res.status(500).send('Error occurred while automating');
  }
}

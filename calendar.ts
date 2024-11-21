import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: true }); // Set headless for headless mode
  const page = await browser.newPage();

  await page.goto(
    "https://showdownspace-rpa-challenge.vercel.app/challenge-mui-168af805/",
  ); // Replace with your target URL
  await page.getByText("Start challenge").click();

  const dates = await page
    .locator("span.chakra-badge")
    .filter({ hasNotText: "offline" })
    .all();
  for (const date of dates) {
    const dateValue = await date.textContent();
  }

  await page.pause(); // Pause the script to see the browser

  await browser.close();
})();

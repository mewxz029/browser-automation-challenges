import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false }); // Set headless: true for headless mode
  const page = await browser.newPage();

  await page.goto(
    "https://showdownspace-rpa-challenge.vercel.app/challenge-hunting-fed83d58/?submitTo=https://challenges.showdown.space/api/submissions/submit&token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NzNkZDA2NmZjNjk5ODAzZmIzOTM1MWIiLCJ0ZWFtTmFtZSI6IuC4oeC4seC5iOC4p-C4muC5ieC4suC4meC4h-C4suC4mSBwcmFjdGl0aW9uZXIiLCJjaGFsbGVuZ2VJZCI6NCwiY2hhbGxlbmdlQ29kZW5hbWUiOiIxX2h1bnRpbmciLCJleHAiOjE3MzIxNDgwMTUsImlzcyI6Imh0dHBzOi8vc2hvd2Rvd24uc3BhY2UvZXZlbnRzL2Jyb3dzZXItYXV0b21hdGlvbi1jaGFsbGVuZ2VzLyIsImF1ZCI6InN1Ym1pdHRlciJ9.IW0T8yuYpVhq42ZhmMeI_psFu0T8pTrBNVOhe0yZXx8&reportTo=wss://challenges-progress-reporter.showdown.space",
  ); // Replace with your target URL
  await page.getByText("Start challenge").click();

  // Locate the element
  const numbers = await page.locator("span").all();
  const actualNumbers: string[] = await Promise.all(
    numbers.map(async (number) => {
      const text = await number.innerText();
      return text;
    }),
  );
  actualNumbers.shift();
  actualNumbers.pop();

  const divs = await page.locator('div[style*="display: grid"] > div').all();

  for (const div of divs) {
    await div.hover();

    const lastDiv = await page
      .locator('div[style*="position: fixed"]')
      .last()
      .textContent();

    console.log(lastDiv);
    if (actualNumbers.includes(lastDiv as string)) {
      await div.click();
    }

    // Optionally, add a delay to see the hover effect
  }

  await page.pause(); // Pause the script to see the browser

  await browser.close();
})();

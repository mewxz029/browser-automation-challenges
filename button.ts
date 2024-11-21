import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false }); // Set headless for headless mode
  const page = await browser.newPage();

  await page.goto(
    "https://showdownspace-rpa-challenge.vercel.app/challenge-buttons-a9808c5e/",
  ); // Replace with your target URL
  await page.getByText("Start challenge").click();

  const mappingButton: any = {};

  for (let i = 0; i < 10; i++) {
    mappingButton[`${i}`] = page.getByRole("button").getByText(i.toString());
  }

  for (let i = 0; i < 100; i++) {
    const text = await page.locator(".chakra-text").first().textContent();

    const m: any = text?.replaceAll(",", "").split(" ");

    const firstNum = Number(m[0]);
    const lastNum = Number(m[2]);
    const operator = m[1];

    const mapping: any = {
      "+": firstNum + lastNum,
      "-": firstNum - lastNum,
      "×": firstNum * lastNum,
      "÷": firstNum / lastNum,
    };

    const result = mapping[operator];

    const arrNumber = result.toString();
    console.log(arrNumber);

    for (const i of arrNumber) {
      const button = mappingButton[i];

      await button.click();
    }

    await page.getByText("Submit").click();
  }

  await page.pause(); // Pause the script to see the browser

  await browser.close();
})();

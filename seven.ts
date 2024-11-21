import { chromium } from "playwright";

(async () => {
  const numberPatterns: Record<string, string[]> = {
    "1": ["right-top", "right-Bottom"],
    "2": ["horizontal", "right-top", "middle", "left-bottom", "bottom"],
    "3": ["horizontal", "right-top", "middle", "right-bottom", "bottom"],
    "4": ["left-top", "right-top", "middle", "right-bottom"],
    "5": ["horizontal", "left-top", "middle", "right-bottom", "bottom"],
    "6": [
      "horizontal",
      "left-top",
      "middle",
      "left-bottom",
      "right-bottom",
      "bottom",
    ],
    "7": ["horizontal", "right-top", "right-bottom"],
    "8": [
      "horizontal",
      "left-top",
      "right-top",
      "middle",
      "left-bottom",
      "right-bottom",
      "bottom",
    ],
    "9": [
      "horizontal",
      "left-top",
      "right-top",
      "middle",
      "right-bottom",
      "bottom",
    ],
    "0": [
      "horizontal",
      "left-top",
      "right-top",
      "left-bottom",
      "right-bottom",
      "bottom",
    ],
  };

  const browser = await chromium.launch({ headless: false }); // Set headless for headless mode
  const page = await browser.newPage();

  await page.goto("https://lemon-meadow-0c732f100.5.azurestaticapps.net/ssg"); // Replace with your target URL

  const targetNumber = await page.locator(".number").first().textContent();
  console.log(targetNumber);
  const targetNumberArray = targetNumber?.split("");
  const numberDivs = await page.locator(".seven-segment").all();
  console.log(numberDivs);

  for (let i = 0; i < numberDivs.length; i++) {
    const numberDiv = numberDivs[i];
    const number = targetNumberArray?.[i] as string;
    console.log(number);
    const numberPattern = numberPatterns[number];
    // console.log(numberPattern.map((e) => `.${e}`).join(" "));

    const numberSegments = await numberDiv.locator(".segment").all();

    // for (const segment of numberSegments) {
    // console.log(segment);
    // }
  }

  await page.pause(); // Pause the script to see the browser

  await browser.close();
})();

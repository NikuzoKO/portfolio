import { chromium } from "playwright";

const sourceUrl = process.env.CV_SOURCE_URL ?? "https://nikuzoko.github.io/curriculum/";
const outputPath = process.env.CV_OUTPUT_PATH ?? "public/cv.pdf";

const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: ["--no-sandbox"],
});

try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(sourceUrl, { waitUntil: "networkidle" });
    await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
    });
    console.log(`CV rendered from ${sourceUrl} -> ${outputPath}`);
} finally {
    await browser.close();
}

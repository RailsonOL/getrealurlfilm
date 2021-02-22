import puppeteer from 'puppeteer'
import chrome from 'chrome-aws-lambda'
import { responseErrorJson, encodeDecode } from '../../../utils/utils'

const get = async (req, res) => {
    try {
        async function getOptions() {
            const isDev = !process.env.AWS_REGION
            let options;

            const chromeExecPaths = {
                win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', //X86 use: C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe
                linux: '/usr/bin/google-chrome',
                darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
            }

            const exePath = chromeExecPaths[process.platform]

            if (isDev) {
                options = {
                    args: [],
                    executablePath: exePath,
                    headless: true
                }
            } else {
                options = {
                    args: chrome.args,
                    executablePath: await chrome.executablePath,
                    headless: chrome.headless
                }
            }

            return options
        }

        let videourl = encodeDecode(req.query.videourl, 'decode', 'base64')

        const options = await getOptions()
        const browser = await puppeteer.launch(options)
        
        const page = await browser.newPage()
        await page.goto(videourl)
        const url = await page.url()

        await browser.close()

        res.setHeader('Cache-Control', 's-maxage=72000000, stale-while-revalidate') // 20 hours cache in versel, not work in Localhost
        return res.redirect(301, url)

    } catch (error) {
        return responseErrorJson(res, 'getVideoUrl::get', error);
    }
}

export default get
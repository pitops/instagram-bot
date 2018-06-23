const puppeteer = require('puppeteer');
const credentials = require('./credentials');

async function autoFollow () {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--window-size=1920,1080'
    ]
  })
  const page = await browser.newPage()
  page.setViewport({height: 1080, width: 1920})
  await page.goto('https://instagram.com/accounts/login')

  await page.waitFor(() => document.querySelectorAll('input').length)

  await page.type('[name=username]', credentials.username)
  await page.type('[name=password]', credentials.password)

  await page.evaluate(() => {
    document.querySelector('._5f5mN').click()
  })

  await page.waitFor(() => document.querySelector('[placeholder=Search]'))

  await page.evaluate(() => document.querySelector('[href="/accounts/activity/"]').click())

  await page.waitFor(() => document.querySelectorAll('[role=button] ._5f5mN').length)

  await page.evaluate(() => {
    const elements = document.querySelectorAll('[role=button] ._5f5mN')

    elements.forEach(element => {
      if (element.innerText === 'Follow') {
        element.click()
      }
    })
  })

  await page.waitFor(4000)

  await browser.close()

  autoFollow()
}

autoFollow()
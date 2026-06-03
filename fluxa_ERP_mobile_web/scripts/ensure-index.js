const fs = require('fs');
const path = require('path');
const www = path.join(__dirname, '..', 'www');
const idx = path.join(www, 'index.html');
const browserIdx = path.join(www, 'browser', 'index.html');

if (!fs.existsSync(idx)) {
  const content = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=browser/index.html">
    <title>Redirecting...</title>
    <base href="./">
  </head>
  <body>
    <p>Redirecting to app...</p>
    <a href="browser/index.html">Open app</a>
  </body>
</html>`;
  fs.writeFileSync(idx, content, 'utf8');
  console.log('Created www/index.html redirect to browser/index.html');
} else {
  console.log('www/index.html exists');
}

// Ensure browser/index.html has a relative base href when present
if (fs.existsSync(browserIdx)) {
  let bcontent = fs.readFileSync(browserIdx, 'utf8');
  const re = /<base href=\"([^\"]*)\">/i;
  const m = bcontent.match(re);
  if (m && m[1] !== './') {
    bcontent = bcontent.replace(re, '<base href="./">');
    fs.writeFileSync(browserIdx, bcontent, 'utf8');
    console.log('Fixed base href in www/browser/index.html to ./');
  } else {
    console.log('www/browser/index.html base href OK');
  }
} else {
  console.log('www/browser/index.html not found');
}

const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'src', 'environments', 'environment.ts'),
  path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts')
];

files.forEach((file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  const re = /export const appVersion\s*=\s*'([0-9]+(?:\.[0-9]+)*)'\s*;/;
  const match = content.match(re);
  if (match) {
    const ver = match[1];
    const parts = ver.split('.').map(n => parseInt(n, 10));
    // increment last part
    parts[parts.length - 1] = (parts[parts.length - 1] || 0) + 1;
    const newVer = parts.join('.');
    content = content.replace(re, `export const appVersion = '${newVer}';`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Bumped ${path.basename(file)} => ${newVer}`);
  } else {
    // append if not present
    content = content + '\nexport const appVersion = "1.0";\n';
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Added appVersion to ${path.basename(file)}`);
  }
});

// Also update the template html if exists
const loginHtml = path.join(__dirname, '..', 'src', 'app', 'pages', 'login', 'login.page.html');
if (fs.existsSync(loginHtml)) {
  let html = fs.readFileSync(loginHtml, 'utf8');
  // if there's a hardcoded vX.Y, leave it; component uses environment. Nothing to change here.
}

const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'public', 'assets', 'work');
if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }
const files = ['branding-01.svg', 'poster-01.svg', 'packaging-01.svg', 'social-01.svg', 'editorial-01.svg'];
const colors = ['#E6E6FA', '#FFB6C1', '#ADD8E6', '#98FB98', '#FFDAB9'];
files.forEach((file, i) => {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="130" viewBox="0 0 200 130"><rect width="200" height="130" fill="${colors[i]}"/></svg>`;
  fs.writeFileSync(path.join(dir, file), content);
});
console.log('Done SVG generation');

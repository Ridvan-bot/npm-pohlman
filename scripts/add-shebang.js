const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../dist/bin/pohlman.js');
const fileContent = fs.readFileSync(filePath, 'utf8');
const shebang = '#!/usr/bin/env node\n';

if (!fileContent.startsWith(shebang)) {
    fs.writeFileSync(filePath, shebang + fileContent);
}
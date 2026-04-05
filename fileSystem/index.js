const fs = require('fs');
const path = require('path');


const loc = path.join(__dirname, 'temp.txt');


console.log('File path:', loc);

fs.writeFileSync(loc , 'Hello, this is Varun Gupta i am a gla student' , (err) => {
    if (err);
    console.log('File written successfully');
})

fs.readFile(loc ,'utf-8',(err , data)  => {
    if (err) console.log('Error reading file:', err);
    console.log('File content:', data);
})
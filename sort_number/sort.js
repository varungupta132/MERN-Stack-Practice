const fs = require('fs');

fs.readFile('input2.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }

    const numbers = data
        .split(" ")
        .map(Number);

    numbers.sort((a, b) => a - b);

    console.log(numbers);

    fs.writeFile('input1.txt', numbers.join(' '), (err) => {
        if (err) {
            console.log('Error writing file:', err);
            return;
        }
        console.log('Sorted data written to input1.txt');
    });
});
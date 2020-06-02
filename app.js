const input = require('./lib/input');

//get simple argv without unnecessary packages 
const args = process.argv.slice(2)
const filePath = args[0];
if(!filePath) {
    console.error('Please provide a path to the input file.');
    process.exit(0);
}

await input.readFileByLine(filePath, line => {
    console.log(line)
});

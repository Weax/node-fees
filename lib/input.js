const { once } = require('events');
const { createReadStream } = require('fs');
const { createInterface } = require('readline');

module.exports = {
    readFileByLine: async (filePath, callback) => {
        try {
          const rl = createInterface({
            input: createReadStream(filePath),
            crlfDelay: Infinity
          });
      
          rl.on('line', (line) => {
            // Process the line.
            callback(line);
          });
      
          await once(rl, 'close');
        } catch (err) {
          console.error(err);
        }
    }
}
const fs = require('fs');
const path = require('path');

const getDirectoryTreeEntries = dir => {
    return fs.readdirSync(dir).reduce((results, e) => {
        const entry = path.join(dir, e);
        results.push(entry);

        if (fs.statSync(entry).isDirectory()) {
            results = results.concat(getDirectoryTreeEntries(entry))
        }

        return results;
    }, [])
};

const dir = getDirectoryTreeEntries('/home/martin/Development/minesweeper-js/src/');
console.log(dir);

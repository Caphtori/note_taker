const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content), (err)=>
        err ? console.error(err) : console.info(`Successfully writter to ${destination}`)
        );

const readAndAppend = (content, file)=>{
    fs.readFile(file, 'utf8', (err, data)=>{
        if (err){
            console.err(err);
        } else{
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        };
    });
};

const readAndDelete = (deleteId, file) =>{
    fs.readFile(file, 'utf8', (err, data)=>{
        if(err){
            console.error(err);
        } else{
            const parsedData = JSON.parse(data);
            const filteredData = parsedData.filter(({id})=>id!==deleteId);
            writeToFile(file, filteredData);
        };
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete }
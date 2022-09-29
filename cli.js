#!/usr/bin/env node
const { mdLinks } = require("./index.js");
const chalk = require('chalk')

const cli = () =>{
    let dirPath = process.argv[2];
    const option = process.argv[3];
    let options = {
        stats: false,
        validate: false, 
    }; 

    if (option==='--stats'){
        options.stats = true;
        console.log(chalk.bgMagenta('Links stats:'))
        return mdLinks(dirPath,options);

    }else if (option==='--validate'){
        options.validate = true;
        console.log(chalk.bgMagenta('Links status:'))
        return mdLinks(dirPath,options);

    }else if(option){
        return console.log(
        `${chalk.red('wrong command')} 
try again with: 
${chalk.grey('md-links <path-to-file>')} 
${chalk.grey('md-links <path-to-file> --stats')}   
${chalk.grey('md-links <path-to-file> --validate')}`);
    }else{
        if(dirPath!=undefined){
            console.log(chalk.bgMagenta('Links in files.md:'))
        }
        return mdLinks(dirPath,options);
    }
}

//cli()
//console.log(cli())
cli().then(console.log).catch(error=>{console.log(chalk.red(error.message))})



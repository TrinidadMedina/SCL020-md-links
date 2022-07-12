const { mdLinks } = require("./index.js");

const dirPath = process.argv[2];
const option = process.argv[3];
const options2 = process.argv[4];

const cli = () =>{
    let options = {
        stats: false,
        validate: false, 
    }; 
    if (option==='--stats'){
        options.stats = true;
    }else if (option==='--validate'){
        options.validate = true;
    }else if(option==='--stats'&&options2==='--validate'){
        options.stats = true;
        options.validate = true;
    }else{
        console.log('this comand is wrong, try again')
    }
    const result = mdLinks(dirPath,options);
    return result;
}

cli().then(console.log);

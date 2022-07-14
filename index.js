const chalk = require("chalk");
const path = require('path');
const {
  getAll,
  validate,
  stats
} = require("./md-links.js");

const mdLinks = (dirPath, option) =>{
  getAll(dirPath).then(data=>{
    dirPath = path.isAbsolute(dirPath)?dirPath:path.resolve(dirPath);
      if (option.validate === true){
        return validate(data).then(console.log).catch(console.log)
      }else if(option.stats === true){
        return stats(data).then(console.log).catch(console.log)
      }else{
        return console.log(data)
      } 
    }).catch(error=>{console.log(chalk.red(error.message))})
}

module.exports = {
  mdLinks
};



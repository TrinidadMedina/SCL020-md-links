const chalk = require("chalk");
const path = require('path');
const {
  getAll,
  validate,
  stats
} = require("./md-links.js");

const mdLinks = async (dirPath, option) =>{
   return getAll(dirPath).then(data=>{
    dirPath = path.isAbsolute(dirPath)?dirPath:path.resolve(dirPath);
      if (option.validate === true){
        return validate(data).then(response=>{
          return response})
      }else if(option.stats === true){
        return stats(data).then(response=>{
          return response})
      }else if(option.invalid === true){
        return `try again with: 
        ${chalk.grey('md-links <path-to-file>')} 
        ${chalk.grey('md-links <path-to-file> --stats')}   
        ${chalk.grey('md-links <path-to-file> --validate')}`
      }
      else{
        return data
      } 
    })
}

module.exports = {
  mdLinks
};



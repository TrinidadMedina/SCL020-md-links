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
      }else{
        return data
      } 
    })
}

module.exports = {
  mdLinks
};



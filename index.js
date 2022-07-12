const {
  getAllFiles,
  validate,
  stats
} = require("./md-links.js");

const mdLinks = (path, option) =>{
  const files = getAllFiles(path);
  if (option.validate === true){
    return validate(files)
  }else if(option.stats===true){
    return stats(files)
  }else{
    return new Promise (resolve=>{
      resolve(files)
    })
  }
}
module.exports = {
  mdLinks
};



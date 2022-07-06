const fs = require("fs")
const path = require("path");
const fetch = require("node-fetch");
//let expression = /\bhttp?s?:\/\/\S+/gi;

var expression = /(https?:\/\/(?:www\.?|(?!www))[a-zA-Z0-9]+\.?[^\s]{2,}|www\.?[\W]?[a-zA-Z0-9]+\.?[^\s]{2,})/g;
var regex = new RegExp(expression);

let dirPath = process.argv[2];
let arrayOfFiles = [];
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)
  files.forEach((file)=> {
    if (path.extname(file)==='') {
      getAllFiles(dirPath + "/" + file, arrayOfFiles); 
    } else {
      if (path.extname(file)=='.md'){
        arrayOfFiles.push(dirPath + "/" + file)
      }
    }
  })
  return arrayOfFiles;
}
const filesPaths = getAllFiles(dirPath, arrayOfFiles);
let arrLinks = [];
filesPaths.forEach((file)=>{
  const bufStr = fs.readFileSync(file).toString();
  const lines = bufStr.split('\n');
  lines.forEach((linee, i)=>{
    if (linee.match(regex)){
      if(bufStr.match(regex)){
        arrLinks.push({
         path: file,
         links: bufStr.match(regex),
         line: i+1
        }
       );
       }
       else{
         console.log(`${file}: doesn't contain links`)
       }
    }
  })
})
/* console.table(
  {Link:
    {Code: 'code' ,
    URL: arrLinks[0].path, 
    Status: 'status'},
  link2:{
    Code: 'code' ,
    URL: arrLinks[1].path, 
    Status: 'status'
  }}) */
console.log(arrLinks)







/* module.exports = () => {
}; */

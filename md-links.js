const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const regex = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g;
const regText = /\[.*?\]/g;

const getLinks = (arrayOfFiles) =>{
  let arrLinks = [];
  arrayOfFiles.forEach((file)=>{
    const bufStr = fs.readFileSync(file).toString();
    const lines = bufStr.split('\n');
    lines.forEach((line, i)=>{
      if (line.match(regex)){
        arrLinks.push({
          href: line.match(regex).toString(),
          text: line.match(regText)?line.match(regText).toString().substring(1, line.match(regText).toString().length - 1):'ERROR: unsupported text format',
          line: i+1,
          file: file
        }); 
      }
    })
  })
  return arrLinks
}

const getAll = (dirPath)=> {
  return new Promise ((resolve) => {
    if (fs.statSync(dirPath).isDirectory()){
      const getAllFiles = (dirPath, arrayOfFiles)=>{
          files = fs.readdirSync(dirPath);
          arrayOfFiles = arrayOfFiles || [];
          files.forEach((file)=> {
            if (path.extname(file)===''&&!file.startsWith('.')) {
              getAllFiles(dirPath + "/" + file, arrayOfFiles);
            } else {
              if (path.extname(file)==='.md'){
                arrayOfFiles.push(dirPath + "/" + file)
              }
            }
          })
          const links = getLinks(arrayOfFiles);
          return links
      }
      resolve(getAllFiles(dirPath))
    }else{
      const links = getLinks([dirPath]);
      resolve(links)
    }
  })
}


//validate true
const validate = (arrLinks)=>{
  const result = [];
  arrLinks.forEach((objectLink)=>{
    const links =
    fetch(objectLink.href)
    .then((data) => {
      const linkObj ={
        href: data.url,
        text: objectLink.text,
        line: objectLink.line,
        file: objectLink.file,
        status:data.status,
        statusText:data.statusText
      }
      return linkObj
    })
    .catch((error)=>{
      const linkObj = {
        error: error.message,
        href: objectLink.href,
        text: objectLink.text,
        line: objectLink.line,
        file: objectLink.file,
      }
      return linkObj
    })
    result.push(links)
  })
  return Promise.all(result)
}


const stats =(arrLinks)=>{
  let uniqueArr = [];
  const result = validate(arrLinks).then(data=>{
    let result = {
      Total: arrLinks.length,
      Unique: 0,
      Broken: {},
      Unsupported:{}
    }
    data.forEach((objectLink)=>{
      if(!uniqueArr.includes(objectLink.href)){
        uniqueArr.push(objectLink.href)
        result.Unique += 1
      }  
      if(objectLink.statusText!='OK' && !objectLink.error){
        result.Broken[objectLink.statusText] = (result.Broken[objectLink.statusText] || 0) + 1;
      }
      if(objectLink.error){
        result.Unsupported[objectLink.error] = (result.Unsupported[objectLink.error] || 0) + 1;
      }
    })
    return result
  })
  return result
}

module.exports = {
  getAll,
  validate,
  stats
};


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
/* module.exports = () => {
}; */

//'C:/Users/trini/OneDrive/Escritorio/Proyectos-laboratoria/SCL020-md-links/file.md'

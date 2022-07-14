# MD-LINKS by Trinidad Medina

Librería para encontrar links dentro de archivos con extensión .md, y validar su estado en línea (si funcionan, están rotos o no existen). Está implementada en JavaScript para ser ejecutada con Node.js.

### Tener instalado

```sh
node.js
Npm
```

### Instalación
```sh
`$ npm i @trinidadmedina/md-links`
```

### Uso

Escribe en la terminal alguna opción:

```sh
1. `md-links 'ruta-directorio o archivo.md'`
2. `md-links 'ruta-directorio o archivo.md' --stats`   
3. `md-links 'ruta-directorio o archivo.md' --validate`
```
La ruta puede ser absoluta ('C:\Users\Juana\OneDrive\Escritorio\folder\file.md) o relativa ('file.md')

### Valores de retorno
1. `md-links 'ruta-directorio o archivo.md'`  
retorna información básica de los links encontrados:

  - href: URL encontrada
  - text: texto que aparece dentro del link \<a>
  - line: línea del archivo en la que se encuentra el link
  - file: ruta del archivo que contiene el link

2. `md-links 'ruta-directorio o archivo.md' --stats`   
retorna estadísticas sobre todos los links encontrados:

  - Total: cantidad de links encontrados en el archivo o directorio
  - Unique: cantidad de links únicos (no repetidos)
  - Broken: cantidad de links 'Not OK' y el motivo (Not Found, Gone...)
  - Unsupported: cantidad de links que no pudieron ser consultados (HTTP request) y el motivo

3. `md-links 'ruta-directorio o archivo.md' --validate`   
retorna información de los links encontrados incluyendo su estado en línea: 

  - href: URL encontrada
  - text: texto que aparece dentro del link \<a>
  - line: línea del archivo en la que se encuentra el link
  - file: ruta del archivo que contiene el link
  - status: código de respuesta HTTP
  - statusText: mensaje con información sobre el estado (OK, Not Found, Gone...)

### Ejemplos de uso

```
PS C:\Users\Juana\OneDrive\Escritorio> md-links 'file.md' --stats  

Links stats:
{
  Total: 69,
  Unique: 65,
  Broken: { 'Not Found': 1, 'Service Temporarily Unavailable': 2 },
  Unsupported: { 'request to http://community.la/modulos-librerias-paquetes-frameworks/175 
  failed, reason: getaddrinfo ENOTFOUND community.laboratoria.la': 1
  }
```
```
PS C:\Users\Juana\OneDrive\Escritorio> md-links 'folder' --validate

Links status:
[
  {
    href: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model',
    text: 'The box model - MDN',
    line: 5,
    file: 'C:\Users\Juana\OneDrive\Escritorio\folder\file.md,
    status: 200,
    statusText: 'OK'
  },
    {
    href: 'https://openclassrooms.com/en/courses/diferencia-entre-expresion-y-sentencia',
    text: 'expresión vs sentencia',
    line: 490,
    file: 'C:\Users\Juana\OneDrive\Escritorio\folder\md-links.md',
    status: 410,
    statusText: 'Gone'
  }
]
```




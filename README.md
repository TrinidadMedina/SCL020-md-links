# MD-LINKS by Trinidad Medina

Librería para encontrar links dentro de archivos con extensión .md, y validar su estado en línea (funcionan, están rotos o no existen). Está implementada en JavaScript para ser ejecutada con Node.js.

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
`md-links 'ruta-directorio o archivo.md'`
`md-links 'ruta-directorio o archivo.md' --stats`   
`md-links 'ruta-directorio o archivo.md' --validate`
```

### Opciones

`md-links 'ruta-directorio o archivo.md'`:  
ejemplos: 

\-> ruta absoluta archivo:  
 `md-links 'C:\Users\Juana\Proyectos-laboratoria\file.md'`  
\-> ruta relativa archivo:  
 `md-links 'file.md'`
import path from 'path';
import { readFileSync } from 'fs';
    //obtener el path completo del archivo
    //leer los archivos dependiendo su path completo
    //convertir el contenido de los archivos a un objeto

export default function gendiff(filepath1, filepath2) {
  // Obtener la ruta absoluta de los archivos
  const fullPath1 = path.resolve(filepath1);
  const fullPath2 = path.resolve(filepath2);

  // Leer los archivos como Buffer (sin especificar 'utf-8')
  const fileBuffer1 = readFileSync(fullPath1);
  const fileBuffer2 = readFileSync(fullPath2);

  // Convertir los buffers a string manualmente
  const fileContent1 = fileBuffer1.toString();
  const fileContent2 = fileBuffer2.toString();

  // Parsear el contenido a objetos
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);

  // Imprimir para verificar
  console.log('Archivo 1:', obj1);
  console.log('Archivo 2:', obj2);


}


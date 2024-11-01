import { fileURLToPath } from "url";
import path from "path";

// Obtiene la ruta completa del archivo actual
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

// Obtiene solo el directorio del archivo actual
const __dirname = path.dirname(__filename);
console.log(__dirname);

// ¿Cómo funciona?
/**
 * import.meta.url esto localiza el archivo y genera una URL tipo web y con fileURLToPath la convierto a un path,
 *  que puede ser interpretado por mi pc y se asigna a la variable __filename, 
 *  ya con este uso el modulo path para obtener el directorio al que pertenece el archivo que estoy ejecutando
 */

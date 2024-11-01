const { readFile } = require("node:fs/promises"); //node con promesas

(async () => {
  console.log("-----------Promises-----------");

  console.log("Leyendo el primer archivo...");
  const text = await readFile("./archivo.txt", "utf-8");
  console.log(text);

  console.log("Hacer cosas mientras se lee el primer archivo");

  console.log("Leyendo el segundo archivo...");
  const secondText = await readFile("./archivo2.txt", "utf-8");
  console.log(secondText);
})();

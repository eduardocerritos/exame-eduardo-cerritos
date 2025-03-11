import Router, { IRouterParamContext } from "koa-router";
import fs from "fs"

interface proveedor {
  id: number,
  nombre: string,
  rfc: string
}
//init
const proveedoresRouter = new Router();

const readData = () => {
  try {
    const data = fs.readFileSync("./src/db.json")
    return JSON.parse(data.toString());
  } catch (error) {
    console.log(error);
  }
}
const writeData = (data) => {
  try {
    fs.writeFileSync("./src/db.json", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

const validarduplicidad = (nombre) => {
  const data = readData();
  const index = data.proveedores.findIndex((proveedor) => proveedor.nombre === nombre);
  return index > -1;
}

proveedoresRouter.get("/", (ctx) => {
  const data = readData();
  const id = 1
  const proveedor = data.proveedores.filter((proveedor) => proveedor.id === id)
  ctx.body = data
});

proveedoresRouter.get("/:id", async (ctx) => {
  const data = readData();
  console.log(data.proveedores)
  const id = parseInt(ctx.params.id)
  const proveedor = data.proveedores.filter((proveedor) => proveedor.id === id)
  ctx.body = proveedor

});

proveedoresRouter.post("/", async (ctx) => {
  const data = readData();
  const newProveedor = ctx.request.body as proveedor;

  if (validarduplicidad(newProveedor.nombre)) { 
    ctx.status = 422;
    ctx.body = "Nombre duplicado"
    return;
  }
  const maxId = data.proveedores.reduce(
    (max, proveedor) => (proveedor.id > max ? proveedor.id : max),
    data.proveedores[0].id
  );

  console.log(newProveedor)
  newProveedor['id'] = maxId + 1;
  data.proveedores.push(newProveedor);
  writeData(data);
  ctx.status = 201;
  ctx.body = newProveedor;
});

proveedoresRouter.put("/:id", async (ctx) => {
  const data = readData();
  const id = parseInt(ctx.params.id)
  let updatedProveedor = ctx.request.body as proveedor;
  if (validarduplicidad(updatedProveedor.nombre)) { 
    ctx.status = 422;
    ctx.body = "Nombre duplicado"
    return;
  }
  const index = data.proveedores.findIndex((proveedor) => proveedor.id === id);

  console.log(index)
  if (index === -1) {
    ctx.status = 404;
    ctx.body = "Proveedor no encontrado"
    return;
  }

  updatedProveedor["id"] = id
  data.proveedores[index] = updatedProveedor;

  console.log(data.proveedores[index]);

  writeData(data);
  ctx.body = data.proveedores[index];
});


proveedoresRouter.delete("/:id", async (ctx) => {
  const data = readData();
  const id = parseInt(ctx.params.id)
  const index = data.proveedores.findIndex((proveedor) => proveedor.id === id);
  if (index === -1) {
    ctx.status = 404;
    return;
  }
  data.proveedores.splice(index, 1);
  writeData(data);
  ctx.status = 204;
});


export default proveedoresRouter;
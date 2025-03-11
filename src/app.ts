import koa  from 'koa';
import bodyparser from 'koa-bodyparser'
import loggerKoa from "koa-logger";
import cors from "koa2-cors";
import mount from "koa-mount";
import proveedores from "./proovedores";
import proveedoresRouter from './proovedores';

const app= new koa();
const PORT = process.env.PORT || 3007

app.use(cors());
app.use(loggerKoa());
app.use(bodyparser());

app.use(proveedoresRouter.routes());

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
});
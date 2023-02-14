import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

import todoRoutes from "./routes/todos.ts";

const app = new Application();

app.use( async (ctx, next) => {
    console.log('Middleware!');
    await next();
})

//https://deno.land/x/oak@v11.1.0/mod.ts?s=Router#method_routes_0
app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port: 3000 });
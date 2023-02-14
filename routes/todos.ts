import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const router = new Router();

interface Todo {
    id: string;
    content: string;
}

let todos: Todo[] = [];

router.get('/todos', ctx => {
    ctx.response.body ={ todos: todos };
});

router.post('/todo', async (ctx) => {
    const todoContent = await ctx.request.body().value;
    const newTodo = {
        id: new Date().toISOString(),
        content: todoContent.content
    };
    todos.push(newTodo);
    ctx.response.body ={ 
        message: "todo added!",
        todos: todos 
    };
});

router.put('/todos/:todoId', async (ctx) => {
    const tId = ctx.params.todoId;
    const todoContent = await ctx.request.body().value;
    const todoIndex = todos.findIndex( item => {
        return item.id === tId;
    });
    todos[todoIndex] = { id: tId, content :todoContent.content};
    ctx.response.body ={ 
        message: "todo updated!",
        todos: todos 
    };
});

router.delete('/todos/:todoId', (ctx) => {
    const tId = ctx.params.todoId;
    todos = todos.filter( item =>{
        return item.id !== tId
    });
    
    ctx.response.body ={
        message: 'todo deleted!',
        todos: todos
    }
});

export default router;
import { userRouter } from './routes/userRouter.ts';

console.log('Deno Server running');

Deno.serve(userRouter);

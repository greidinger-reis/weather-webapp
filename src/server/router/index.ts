// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { weatherRouter } from "./weather";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("weather.", weatherRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

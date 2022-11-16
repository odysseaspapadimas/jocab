import { router } from "../trpc";
import { authRouter } from "./auth";
import { jishoRouter } from "./jisho";
import { vocabularyRouter } from "./vocabulary";

export const appRouter = router({
  auth: authRouter,
  jisho: jishoRouter,
  vocabulary: vocabularyRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

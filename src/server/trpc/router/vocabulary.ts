import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const vocabularyRouter = router({
  add: protectedProcedure
    .input(
      z.object({
        vocabulary: z.object({
          word: z.string(),
          reading: z.string().optional(),
          frequency: z.number().optional(),
          meanings: z.string().array(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const vocabulary = await ctx.prisma.vocabulary.create({
        data: {
          ...input.vocabulary,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return vocabulary;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        word: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const vocabulary = await ctx.prisma.vocabulary.delete({
        where: {
          word_userId: {
            word: input.word,
            userId: ctx.session.user.id,
          },
        },
      });
      return vocabulary;
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const vocabulary = await ctx.prisma.vocabulary.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return vocabulary;
  }),
});

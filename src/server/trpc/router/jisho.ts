import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import JishoAPI from "unofficial-jisho-api";
import fs from "fs";
import { parse } from "fast-csv";

const jisho = new JishoAPI();

export const jishoRouter = router({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const { data } = await jisho.searchForPhrase(input.text);
      return [...data];
    }),
  frequency: publicProcedure
    .input(z.object({ word: z.string() }))
    .query(async ({ input }) => {
      const processFile = async () => {
        const records = [];
        const path =
          process.env.NODE_ENV === "production"
            ? `https://${process.env.VERCEL_URL}/freq.csv`
            : "./public/freq.csv";
        const parser = fs.createReadStream(path).pipe(parse());
        let i = 1;
        for await (const record of parser) {
          if (record[0] === input.word) {
            return i;
          }
          records.push(record);
          i++;
        }
        return 0;
      };

      const frequency = await processFile();

      return frequency;
    }),
});

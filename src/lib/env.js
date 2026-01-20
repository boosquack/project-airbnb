import * as z from 'zod';

const envSchema = z.object({
  BASE_URL: z.string().url(),
  COURSE_URL: z.string().url(),
  COSDEN_SOLUTIONS_URL: z.string().url(),
  DB_KEY: z.string(),
  DISCORD_URL: z.string().url(),
  USE_AUTH: z.string().transform((value) => value === 'true'),
});

export const env = envSchema.parse({
  BASE_URL: import.meta.env.VITE_BASE_URL,
  COURSE_URL: import.meta.env.VITE_COURSE_URL,
  COSDEN_SOLUTIONS_URL: import.meta.env.VITE_COSDEN_SOLUTIONS_URL,
  DB_KEY: import.meta.env.VITE_DB_KEY,
  DISCORD_URL: import.meta.env.VITE_DISCORD_URL,
  USE_AUTH: import.meta.env.VITE_USE_AUTH,
});

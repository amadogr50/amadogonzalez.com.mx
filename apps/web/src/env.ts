import { z } from "zod";

export const env = z
  .object({
    NODE_ENV: z.string(),
    DATABASE_URL: z.string(),
    PAYLOAD_SECRET: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),
  })
  .parse(process.env);

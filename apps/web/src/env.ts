import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),
    NODE_ENV: z.string(),
    PAYLOAD_SECRET: z.string(),
  })
  .parse(process.env);

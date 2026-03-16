import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),
    NEXT_PUBLIC_SITE_URL: z.string(),
    NEXT_PUBLIC_UMAMI_URL: z.string().optional(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().optional(),
    NODE_ENV: z.string(),
    PAYLOAD_SECRET: z.string(),
  })
  .parse(process.env);

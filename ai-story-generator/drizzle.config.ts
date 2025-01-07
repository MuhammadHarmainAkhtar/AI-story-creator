import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:9uDp8oriPbkV@ep-purple-king-a10yv05g.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
  verbose: true,
  strict: true,
});

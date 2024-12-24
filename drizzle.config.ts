import { Resource } from "sst";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_DEFAULT_ACCOUNT_ID || "",
    token: process.env.CLOUDFLARE_API_TOKEN || "",
    databaseId: Resource.DBData.id
  },
});
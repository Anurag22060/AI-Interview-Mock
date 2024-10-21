import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://ai-interview-mock_owner:JW7TYG3kUIyE@ep-shy-frost-a5sj6bzy.us-east-2.aws.neon.tech/ai-interview-mock?sslmode=require",
  }
});
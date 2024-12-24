import { hono } from "./api";
import { db } from "./db";
import { bucket } from "./storage";

const apiUrl = hono.url.apply((url) => url || '');

export const frontend = new sst.aws.TanstackStart("Frontend", {
  path: "packages/frontend/",
  environment: {
    VITE_API_URL: apiUrl,
    VITE_BUCKET: bucket.name,
  },
});

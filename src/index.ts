import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { crypto } from "./crypto";

const app = new Hono();

app.route("/", crypto);

const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
const app = new Hono();


app.use("/*", cors());
app.get("/", async (c) => {
  return c.json({
    message: "Hello, World!",
  })
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter)




export default app;



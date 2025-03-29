import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@surajkumargupta/medium-common";
import { Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

type Variables = {
  userId: string;
};

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

export const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

blogRouter.use("/*", async (c, next) => {
  // get the header
  // verify the header
  // if the header is correct, we need can proceed
  // if not, we return the user a 403 status code
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user) {
      //@ts-ignore
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (error) {
    c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
  
    if(!success){
      c.status(411);
      return c.json({message: "Input not correct"});
    }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
  
    if(!success){
      c.status(411);
      return c.json({message: "Input not correct"});
    }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    blog: blog.id,
  });
});


// Todo: add Pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
      const blogs = await prisma.blog.findMany({
        select: {
          content: true,
          title: true,
          id: true,
          author:{
            select:{
              name:true
            }
          }
        }
      });
  
      return c.json({
        blogs,
      });
    } catch (error) {
      console.log(error);
      c.status(404);
      return c.json({ message: "Error while fetching blog" });
    }
  });


blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.findFirst({
      where: { id },

      select: {
        content: true,
        title: true,
        id: true,
        author:{
          select:{
            name:true
          }
        }
      }
    });

    return c.json({
      blog,
    });
  } catch (error) {
    console.log(error);
    c.status(404);
    return c.json({ message: "Error while fetching blog" });
  }
});


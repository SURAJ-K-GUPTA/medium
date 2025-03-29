import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signInInput, signupInput } from "@surajkumargupta/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      };
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);

  if(!success){
    c.status(411);
    return c.json({message: "Input not correct"});
  }

  try {
  
    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  
    return c.json({
      jwt: token,
    });
  } catch (error) {
    console.log(error);
    c.status(411);
    return c.text("Invalid")
      
    }
  
})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
      //@ts-ignore
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const {success} = signInInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({message: "Input not correct"});
    }
  try {
      const user = await prisma.user.findUnique({
        where:{
          email: body.username,
          password: body.password
        }
      })
    
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found"})
      }
    
      const jwt = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({jwt})
  } catch (error) {
    console.log(error)
    c.status(411)
    return c.text("Invalid")
  }
  });
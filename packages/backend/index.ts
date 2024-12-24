import { drizzle } from "drizzle-orm/d1";
import { eq, and } from "drizzle-orm";
import * as schema from "../../db/schema";
import { Hono, Context } from "hono";
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { jwt } from 'hono/jwt';
import { Jwt } from 'hono/utils/jwt';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import * as bcrypt from 'bcryptjs';
import { Resource } from "sst";

const db = () => drizzle(Resource.WorkWise)

const app = new Hono()

const JWT_SECRET = 'CTedcIWLBN2lCnugnZPMqjQBcJncS3kr'

const handleErrors = (fn: (c: Context) => Promise<Response>) => async (c: Context) => {
  try {
    return await fn(c);
  } catch (err: any) {
    console.error(err);
    return c.json({ error: err.message }, 500);
  }
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string(),
  last_name: z.string(),
  profile_picture: z.string().optional()
})

const inviteSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string(),
  last_name: z.string(),
  profile_picture: z.string().optional(),
  role: z.string().default('member'),
})

const loginSchema = z.object({
  email: z.string(),
  password: z.string()
})

const projectSchema = z.object({
  name: z.string(),
  description: z.string()
})

const taskSchema = z.object({
  title: z.string(),
  userId: z.string(),
  description: z.string().optional(),
  projectId: z.string()
})

const resetPasswordSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  newPassword: z.string().min(8)
})

const generateToken = async (userId: number) => {
  return await Jwt.sign(
    { 
      sub: userId, 
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration 
    }, 
    JWT_SECRET
  )
}

app.get("/", (c) => {
  // console.log
  return c.json({ msg: "Hello world" })
})

app.use(prettyJSON())
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

app.use(cors())

// Auth Endpoints

app.post('/register', zValidator('json', registerSchema), handleErrors(async (c) => {
  // @ts-expect-error
  const { email, password, first_name, last_name, profile_picture } = c.req.valid('json');

  // check for existing user
  const existingUser = await db().select().from(schema.users).where(eq(schema.users.email, email)).get();
  if (existingUser) return c.json({ error: 'User already exists' }, 400)

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db().insert(schema.users).values({
    firstName: first_name,
    lastName: last_name,
    email,
    passwordHash: hashedPassword,
    profilePicture: profile_picture
  }).returning().get()

  const token = await generateToken(user.id)

  return c.json({
    message: 'User registered successfully',
    token,
    user: { 
      id: user.id,
      email, 
      first_name: user.firstName, 
      last_name: user.lastName, 
      profile_picture: user.profilePicture 
    }
  }, 201)
}))

app.post('/login', zValidator('json', loginSchema), handleErrors(async (c) => {
  // @ts-expect-error
  const { email, password } = c.req.valid('json');

  const user = await db().select().from(schema.users).where(eq(schema.users.email, email)).get()

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
  if (!isPasswordValid) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  // Generate JWT token
  const token = await generateToken(user.id)

  return c.json({ 
    message: 'Login successful', 
    token,
    user: { 
      id: user.id, 
      email: user.email, 
      first_name: user.firstName, 
      last_name: user.lastName, 
      profile_picture: user.profilePicture 
    } 
  })
}))

const authMiddleware = async (c: Context, next: Function) => {
  const token = c.req.header('Authorization')?.split(' ')[1]
  
  if (!token) {
    return c.json({ error: 'No token provided' }, 401)
  }

  try {
    const payload = await Jwt.verify(token, JWT_SECRET)
    c.set('userId', payload.sub)
    await next()
  } catch {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

app.use(authMiddleware);
// Users Endpoints
app.get('/users', handleErrors(async (c) => {
  const result = await db().select().from(schema.users).all();
  return c.json(result);
}));

app.get('/users/:id', handleErrors(async (c) => {
  const id = c.req.param('id');
  const result = await db().select().from(schema.users).where(eq(schema.users.id, parseInt(id))).all();
  return c.json(result.length ? result[0] : { error: 'User not found' }, result.length ? 200 : 404);
}));

app.post('/users', handleErrors(async (c) => {
  const data = await c.req.json();
  const result = await db().insert(schema.users).values(data).returning();
  return c.json(result[0], 201);
}));

app.put('/users/:id', handleErrors(async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  const result = await db().update(schema.users).set(data).where(eq(schema.users.id, parseInt(id))).returning();
  return c.json(result[0], result.length ? 200 : 404);
}));

// Organizations Endpoints
app.get('/organizations', handleErrors(async (c) => {
  const userId = c.get('userId');
  console.log({ userId });
  const result = await db()
    .select({
      organizationId: schema.organizationMembers.organizationId,
      organizationName: schema.organizations.name,
      organizationDescription: schema.organizations.description,
      organizationLogoUrl: schema.organizations.logoUrl,
      organizationDomain: schema.organizations.domain,
    })
    .from(schema.organizationMembers)
    .innerJoin(
      schema.organizations,
      eq(schema.organizations.id, schema.organizationMembers.organizationId)
    )
    .where(eq(schema.organizationMembers.userId, userId))
    .all();
  return c.json(result);
}));

app.get('/organizations/:id', handleErrors(async (c) => {
  const id = c.req.param('id');
  const result = await db().select().from(schema.organizations).where(eq(schema.organizations.id, parseInt(id))).all();
  return c.json(result.length ? result[0] : { error: 'Project not found' }, result.length ? 200 : 404);
}));

app.get('/organizations/:id/members', handleErrors(async (c) => {
  const id = c.req.param('id');
  const result = await db()
    .select({
      organizationId: schema.organizationMembers.organizationId,
      userId: schema.organizationMembers.userId,
      firstName: schema.users.firstName,
      lastName: schema.users.lastName,
      email: schema.users.email,
      role: schema.organizationMembers.role,
    })
    .from(schema.organizationMembers)
    .innerJoin(
      schema.users,
      eq(schema.users.id, schema.organizationMembers.userId)
    )
    .where(eq(schema.organizationMembers.organizationId, parseInt(id)))
    .all();
    return c.json(result);
}));

app.post('/organizations/:id/members', zValidator('json', inviteSchema), handleErrors(async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();

  let user = await db()
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, data.email))
    .get();
  
  if (!user) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    user = await db()
      .insert(schema.users)
      .values({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        passwordHash: hashedPassword,
        profilePicture: data.profile_picture,
      })
      .returning()
      .get()
  }

  const result = await db()
    .insert(schema.organizationMembers)
    .values({
      userId: user.id,
      organizationId: parseInt(id),
      role: data.role
    })
    .returning();
  return c.json(result[0], 201);
}));


app.post('/organizations', handleErrors(async (c) => {
  const data = await c.req.json();
  const userId = await c.get('userId')
  const result = await db()
    .insert(schema.organizations)
    .values(data)
    .returning()
    .get();
  const creatorMember = await db()
    .insert(schema.organizationMembers)
    .values({
      userId,
      organizationId: result.id
    })
    .returning()
    .get()
  return c.json(result, 201);
}));

app.get('/organizations/:id/projects', handleErrors(async (c) => {
  const id = c.req.param('id');
  const result = await db()
    .select({
      id: schema.projects.id,
      name: schema.projects.name,
      description: schema.projects.description,
      status: schema.projects.status,
      startDate: schema.projects.startDate,
      endDate: schema.projects.endDate
    })
    .from(schema.projects)
    .where(eq(schema.projects.organizationId, parseInt(id)))
    .all();
  return c.json(result);
}));

app.post('/organizations/:id/projects', zValidator('json', projectSchema), handleErrors(async (c) => {
  const id = c.req.param('id');
  const data = await c.req.json();
  const userId = c.get('userId');

  const result = await db()
    .insert(schema.projects)
    .values({
      name: data.name,
      description: data.description,
      organizationId: parseInt(id),
      createdById: userId
    })
    .returning()
    .get();
  return c.json(result, 201);
}));

// Projects Endpoints
app.get('/projects', handleErrors(async (c) => {
  const result = await db().select().from(schema.projects).all();
  return c.json(result);
}));

app.get('/projects/:id', handleErrors(async (c) => {
  const id = c.req.param('id');
  const result = await db().select().from(schema.projects).where(eq(schema.projects.id, parseInt(id))).all();
  return c.json(result.length ? result[0] : { error: 'Project not found' }, result.length ? 200 : 404);
}));

app.post('/projects', handleErrors(async (c) => {
  const data = await c.req.json();
  const result = await db().insert(schema.projects).values(data).returning();
  return c.json(result[0], 201);
}));

// Tasks Endpoints
app.get('/tasks', handleErrors(async (c) => {
  const userId = c.get('userId');
  const result = await db()
    .select({
      id: schema.tasks.id,
      title: schema.tasks.title,
      assignedTo: schema.tasks.assignedToId,
      status: schema.tasks.status
    })
    .from(schema.tasks)
    .where(eq(schema.tasks.assignedToId, userId))
    .all();
  return c.json(result);
}));

app.post('/tasks', zValidator('json', taskSchema), handleErrors(async (c) => {
  const data = await c.req.json();
  const userId = c.get('userId');

  const result = await db()
    .insert(schema.tasks)
    .values({
      title: data.title,
      description: data.description,
      projectId: data.projectId,
      createdById: userId,
      assignedToId: data.userId
    })
    .returning()
    .get();
  return c.json(result, 201);
}));

app.put('/tasks', handleErrors(async (c) => {
  const data = await c.req.json();
  const userId = c.get('userId');

  const result = await db()
    .update(schema.tasks)
    .set({
      status: data.status
    })
    .where(eq(schema.tasks.assignedToId, userId))
    .returning()
    .get();
  return c.json(result, 200);
}));

// Invitations Endpoints
app.get('/invitations', handleErrors(async (c) => {
  const result = await db().select().from(schema.invitations).all();
  return c.json(result);
}));

app.post('/invitations', handleErrors(async (c) => {
  const data = await c.req.json();
  const result = await db().insert(schema.invitations).values(data).returning();
  return c.json(result[0], 201);
}));

export default app;
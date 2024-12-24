import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import * as schema from "../../../../db/schema";
import { Resource } from "sst";

export type DB = DrizzleD1Database<typeof schema>;

const db: DB = drizzle(Resource.WorkWise)

export module Users {
  export async function all() {
    return await db.select().from(schema.users).all();
  }
}
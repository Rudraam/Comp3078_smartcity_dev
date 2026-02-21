import { type User, type InsertUser, type UpdateProfile, users } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<UpdateProfile>): Promise<User | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<UpdateProfile>): Promise<User | undefined> {
    const updateData: Record<string, any> = {};
    if (data.username !== undefined) updateData.username = data.username;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.bio !== undefined) updateData.bio = data.bio;
    if (data.preferredCity !== undefined) updateData.preferredCity = data.preferredCity;
    if (data.notificationsEnabled !== undefined) updateData.notificationsEnabled = data.notificationsEnabled;
    if (data.darkMode !== undefined) updateData.darkMode = data.darkMode;
    if (Object.keys(updateData).length === 0) return this.getUser(id);
    const [user] = await db.update(users).set(updateData).where(eq(users.id, id)).returning();
    return user;
  }
}

export const storage = new DatabaseStorage();

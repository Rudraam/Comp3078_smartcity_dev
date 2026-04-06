import { type User, type InsertUser, type UpdateProfile, type Submission, type InsertSubmission, type Review, users, submissions, reviews } from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser & { role?: string }): Promise<User>;
  updateUser(id: string, data: Partial<UpdateProfile>): Promise<User | undefined>;
  updateUserRole(id: string, role: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getAdminCount(): Promise<number>;
  createSubmission(userId: string, data: InsertSubmission): Promise<Submission>;
  getSubmissionsByUser(userId: string): Promise<Submission[]>;
  getAllSubmissions(): Promise<Submission[]>;
  getApprovedSubmissions(type: string): Promise<Submission[]>;
  updateSubmission(id: string, status: string, adminNote: string, reviewedBy: string): Promise<Submission | undefined>;
  getStats(): Promise<{ totalUsers: number; regularCount: number; commercialCount: number; adminCount: number; pendingCount: number; approvedCount: number; rejectedCount: number }>;
  createReview(userId: string, username: string, data: { placeId: string; placeType: string; rating: number; comment: string }): Promise<Review>;
  getReviewsByPlace(placeId: string, placeType: string): Promise<Review[]>;
  getUserReviewForPlace(userId: string, placeId: string, placeType: string): Promise<Review | undefined>;
  deleteReview(id: string, userId: string): Promise<boolean>;
}

async function withRetry<T>(fn: () => Promise<T>, retries = 2): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isTransient =
        error?.code === 'ECONNRESET' ||
        error?.code === 'ECONNREFUSED' ||
        error?.code === 'ETIMEDOUT' ||
        error?.message?.includes('WebSocket') ||
        error?.message?.includes('connection') ||
        error?.message?.includes('terminated');
      if (!isTransient || attempt === retries) throw error;
      await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
    }
  }
  throw new Error("Retry exhausted");
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    return withRetry(async () => {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return withRetry(async () => {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    });
  }

  async createUser(insertUser: InsertUser & { role?: string }): Promise<User> {
    return withRetry(async () => {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    });
  }

  async updateUser(id: string, data: Partial<UpdateProfile>): Promise<User | undefined> {
    return withRetry(async () => {
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
    });
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    return withRetry(async () => {
      const [user] = await db.update(users).set({ role }).where(eq(users.id, id)).returning();
      return user;
    });
  }

  async getAllUsers(): Promise<User[]> {
    return withRetry(async () => {
      return db.select().from(users).orderBy(desc(users.username));
    });
  }

  async getAdminCount(): Promise<number> {
    return withRetry(async () => {
      const [row] = await db.select({ cnt: count() }).from(users).where(eq(users.role, "admin"));
      return Number(row?.cnt ?? 0);
    });
  }

  async createSubmission(userId: string, data: InsertSubmission): Promise<Submission> {
    return withRetry(async () => {
      const [sub] = await db.insert(submissions).values({
        userId,
        type: data.type,
        name: data.name,
        description: data.description ?? "",
        address: data.address ?? "",
        city: data.city,
        website: data.website ?? "",
        phone: data.phone ?? "",
        additionalInfo: data.additionalInfo ?? "",
        status: "pending",
        adminNote: "",
      }).returning();
      return sub;
    });
  }

  async getSubmissionsByUser(userId: string): Promise<Submission[]> {
    return withRetry(async () => {
      return db.select().from(submissions).where(eq(submissions.userId, userId)).orderBy(desc(submissions.createdAt));
    });
  }

  async getAllSubmissions(): Promise<Submission[]> {
    return withRetry(async () => {
      return db.select().from(submissions).orderBy(desc(submissions.createdAt));
    });
  }

  async getApprovedSubmissions(type: string): Promise<Submission[]> {
    return withRetry(async () => {
      return db.select().from(submissions)
        .where(and(eq(submissions.status, "approved"), eq(submissions.type, type)))
        .orderBy(desc(submissions.createdAt));
    });
  }

  async updateSubmission(id: string, status: string, adminNote: string, reviewedBy: string): Promise<Submission | undefined> {
    return withRetry(async () => {
      const [sub] = await db.update(submissions)
        .set({ status, adminNote, reviewedBy, reviewedAt: new Date() })
        .where(eq(submissions.id, id))
        .returning();
      return sub;
    });
  }

  async getStats() {
    return withRetry(async () => {
      const allUsers = await db.select().from(users);
      const allSubs = await db.select().from(submissions);
      return {
        totalUsers: allUsers.length,
        regularCount: allUsers.filter(u => u.role === "regular").length,
        commercialCount: allUsers.filter(u => u.role === "commercial").length,
        adminCount: allUsers.filter(u => u.role === "admin").length,
        pendingCount: allSubs.filter(s => s.status === "pending").length,
        approvedCount: allSubs.filter(s => s.status === "approved").length,
        rejectedCount: allSubs.filter(s => s.status === "rejected").length,
      };
    });
  }

  async createReview(userId: string, username: string, data: { placeId: string; placeName?: string; placeType: string; rating: number; comment: string }): Promise<Review> {
    return withRetry(async () => {
      const [review] = await db.insert(reviews).values({
        userId,
        username,
        placeId: data.placeId,
        placeName: data.placeName || "",
        placeType: data.placeType,
        rating: data.rating,
        comment: data.comment,
      }).returning();
      return review;
    });
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return withRetry(async () => {
      return db.select().from(reviews)
        .where(eq(reviews.userId, userId))
        .orderBy(desc(reviews.createdAt));
    });
  }

  async getReviewsByPlace(placeId: string, placeType: string): Promise<Review[]> {
    return withRetry(async () => {
      return db.select().from(reviews)
        .where(and(eq(reviews.placeId, placeId), eq(reviews.placeType, placeType)))
        .orderBy(desc(reviews.createdAt));
    });
  }

  async getUserReviewForPlace(userId: string, placeId: string, placeType: string): Promise<Review | undefined> {
    return withRetry(async () => {
      const [review] = await db.select().from(reviews)
        .where(and(eq(reviews.userId, userId), eq(reviews.placeId, placeId), eq(reviews.placeType, placeType)));
      return review;
    });
  }

  async deleteReview(id: string, userId: string): Promise<boolean> {
    return withRetry(async () => {
      const result = await db.delete(reviews)
        .where(and(eq(reviews.id, id), eq(reviews.userId, userId)));
      return (result.rowCount ?? 0) > 0;
    });
  }
}

export const storage = new DatabaseStorage();

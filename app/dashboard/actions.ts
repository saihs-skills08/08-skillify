"use server";

import { db } from "@/appwrite";
import { Query } from "appwrite";

export interface UserStats {
  user: User;
  completedTasks: number;
  totalTasks: number;
}

export async function getUsersWithTaskStats(): Promise<UserStats[]> {
  // Fetch all users
  // Note: For large datasets, consider implementing pagination
  const usersResponse = await db.listDocuments("db", "users");
  const users = usersResponse.documents as any as User[];

  // Fetch all assignments
  const assignmentsResponse = await db.listDocuments("db", "assignment");
  const assignments = assignmentsResponse.documents as any as Assignment[];

  // Calculate stats for each user
  const userStats: UserStats[] = users.map((user) => {
    const userAssignments = assignments.filter(
      (assignment) => assignment.owner.$id === user.$id
    );
    const completedTasks = userAssignments.filter(
      (assignment) => assignment.done
    ).length;
    const totalTasks = userAssignments.length;

    return {
      user,
      completedTasks,
      totalTasks,
    };
  });

  // Sort by total tasks (descending), then by completed tasks (descending)
  userStats.sort((a, b) => {
    if (b.totalTasks !== a.totalTasks) {
      return b.totalTasks - a.totalTasks;
    }
    return b.completedTasks - a.completedTasks;
  });

  return userStats;
}

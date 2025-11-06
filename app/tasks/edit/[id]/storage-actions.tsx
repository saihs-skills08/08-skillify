"use server";

import { storage, BUCKET_ID, getStorageFileUrl } from "@/appwrite";
import { ID } from "appwrite";

/**
 * Storage actions for uploading task result images to Appwrite Storage
 * 
 * Required Environment Variables:
 * - NEXT_PUBLIC_APPWRITE_BUCKET_ID: The Appwrite Storage bucket ID (defaults to "task-results")
 * - NEXT_PUBLIC_APPWRITE_ENDPOINT: The Appwrite API endpoint
 * - NEXT_PUBLIC_APPWRITE_PROJECT: The Appwrite project ID
 * 
 * Note: The storage bucket must be created in Appwrite with appropriate read/write permissions
 */

export async function uploadImage(file: File): Promise<string> {
  try {
    const response = await storage.createFile(BUCKET_ID, ID.unique(), file);

    return getStorageFileUrl(response.$id);
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteImage(fileId: string): Promise<void> {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}

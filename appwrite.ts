import { Client, Databases, Storage } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const db = new Databases(client);
export const storage = new Storage(client);

export const BUCKET_ID =
  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || "task-results";

/**
 * Generate the URL for viewing a file in Appwrite Storage
 */
export function getStorageFileUrl(fileId: string): string {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
}

/**
 * Extract file ID from a storage URL
 */
export function getFileIdFromUrl(url: string): string | null {
  const match = url.match(/\/files\/([^\/]+)\/view/);
  return match ? match[1] : null;
}

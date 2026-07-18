import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_READ_WRITE_TOKEN,
  useCdn: false,
});

export async function sanityFetch<T = unknown>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, string>;
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate },
  });
}

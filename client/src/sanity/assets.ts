import { projectId, dataset } from "./env";

export function sanityFileUrl(asset: unknown): string {
  if (!asset) return "#";
  const ref = (asset as { _ref?: string })._ref;
  if (!ref) return "#";
  const id = ref.replace(/^file-/, "").replace(/-[a-z0-9]+-\w+$/, "");
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}`;
}

export function sanityAssetUrl(asset: unknown): string {
  if (!asset) return "";
  const ref = (asset as { _ref?: string })._ref;
  if (!ref) return "";
  const id = ref.replace(/^image-/, "").replace(/-[a-z0-9]+-\w+$/, "");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}`;
}

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

const token =
  process.env.SANITY_API_TOKEN ??
  process.env.SANITY_READ_TOKEN ??
  process.env.SANITY_API_READ_TOKEN ??
  "";

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !token,
  token: token || undefined,
});

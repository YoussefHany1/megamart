import axios from "axios";
import { Product } from "@/types";
import categories from "@/stores/data.json";
import { unstable_cache } from "next/cache";

const REVALIDATE = 3600; // 1 hour

// Helper to cache axios requests using Next.js cache
const fetchUrlCached = unstable_cache(
  async (url: string) => {
    const res = await axios.get(url);
    return res.data;
  },
  ["axios-cache"],
  { revalidate: REVALIDATE }
);

/** Server-side: fetch all products for a single category */
export async function getCategoryProducts(category: string): Promise<any[]> {
  const url = (categories as any)[category];
  if (!url) return [];

  try {
    const data = await fetchUrlCached(url);
    return (data.products || data || []).filter(
      (p: Product) => p.name && p.pic,
    );
  } catch (error) {
    console.error(`Error fetching ${category}:`, error);
    return [];
  }
}

/** Server-side: fetch all products across every category */
export async function getAllProducts(): Promise<any[]> {
  const entries = Object.entries(categories) as [string, string][];

  const results = await Promise.all(
    entries.map(async ([catKey, url]) => {
      try {
        const data = await fetchUrlCached(url);
        const items: Product[] = data.products || data || [];
        return items.map((item) => ({ ...item, category: catKey }));
      } catch {
        return [];
      }
    }),
  );

  return results.flat();
}

export async function getProduct(category: string, id: string | number) {
  const url = (categories as any)[category];

  if (!url) {
    return null;
  }

  try {
    const data = await fetchUrlCached(url);
    const products = data.products || data || [];
    return products.find((p: Product) => p.id == id);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Define aquí tus colecciones. Si agregas 'ensayos' en el futuro, solo añádelo al array.
const COLLECTIONS = ['cuento', 'poema'] as const;

export const GET: APIRoute = async () => {
  const allEntries = await Promise.all(
    COLLECTIONS.map(async (collectionName) => {
      const items = await getCollection(collectionName);
      return items.map((item) => ({
        id: item.id,
        collection: collectionName,
        // Ajusta esta ruta si tus carpetas en src/pages/ son en plural (/cuentos/...) o singular (/cuento/...)
        url: `/${collectionName}/${item.id}`, 
        title: item.data.title || item.id.replace(/-/g, ' '),
        description: item.data.description || '',
        pubIn: item.data.pubIn || '',
        // item.body puede ser undefined en Content Layer API, usamos (item.body ?? '')
        content: (item.body ?? '')
          .replace(/[#*`>_~\[\]]/g, '')
          .slice(0, 1500),
      }));
    })
  );

  return new Response(JSON.stringify(allEntries.flat()), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
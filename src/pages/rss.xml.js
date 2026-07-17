import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const cuentos = await getCollection('cuento');
	const poemas = await getCollection('poema');
	const escritosCuentos = cuentos.map((post) => ({
		...post.data,
		link: `/cuento/${post.slug}/`,
	}));

	const escritosPoemas = poemas.map((post) => ({
		...post.data,
		link: `/poema/${post.slug}/`,
	}));

	const todosLosEscritos = [...escritosCuentos, ...escritosPoemas].sort(
		(a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
	);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: todosLosEscritos.map((escrito) => ({
			title: escrito.title,
			pubDate: escrito.pubDate,
			description: escrito.description,
			link: escrito.link, // Usa el link que armamos arriba dinámicamente
		})),
	});
}

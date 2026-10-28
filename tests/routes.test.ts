import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const output = resolve('dist');
const scan = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? scan(resolve(directory, entry.name)) : [resolve(directory, entry.name)]);
const pages = existsSync(output) ? scan(output).filter((file) => file.endsWith('.html')) : [];
const getPage = (pathname: string): string => resolve(output, pathname.replace(/^\//, ''), 'index.html');
const indexedPaths = ['/', '/nuestros-servicios/', '/sobre-nosotros/', '/testimonios/', '/blog-de-actualidad/', '/contactanos/', '/sample-page/', '/2024/12/12/hello-world/'];
const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as { redirects: { source: string; destination: string; permanent: boolean }[] };

test('conserva las ocho rutas del sitemap original', () => {
  for (const route of indexedPaths) assert.ok(existsSync(getPage(route)), route);
  const sitemap = readFileSync(resolve(output, 'sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<url>/g) ?? []).length, indexedPaths.length);
  for (const route of indexedPaths) assert.ok(sitemap.includes(`https://hv-santa-monica-sebaz.vercel.app${route}`));
});

test('cada vista tiene un único título principal y un único landmark main', () => {
  assert.ok(pages.length >= 9);
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, relative(output, page));
    assert.equal((html.match(/<main(?:\s|>)/g) ?? []).length, 1, relative(output, page));
    assert.match(html, /<html[^>]+lang="es"/);
    assert.match(html, /name="description"/);
  }
});

test('los enlaces, anclas e imágenes locales tienen un destino real', () => {
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="([^"\s]+)"/g)) {
      const raw = match[1].replaceAll('&amp;', '&');
      if (!raw.startsWith('/') && !raw.startsWith('#')) continue;
      if (raw.startsWith('//')) continue;
      const [pathAndQuery, fragment] = raw.split('#');
      const pathname = pathAndQuery.split('?')[0];
      const redirect = config.redirects.find((entry) => entry.source === pathname);
      if (redirect) {
        assert.ok(existsSync(getPage(redirect.destination)), `Redirección sin destino: ${raw}`);
        continue;
      }
      const local = pathname ? resolve(output, pathname.slice(1)) : page;
      const target = existsSync(local) && !pathname.endsWith('/') ? local : pathname ? getPage(pathname) : page;
      assert.ok(existsSync(target), `${relative(output, page)} → ${raw}`);
      if (fragment && target.endsWith('.html')) {
        const targetHtml = readFileSync(target, 'utf8');
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(fragment)}"`), `Ancla ausente: ${raw}`);
      }
    }
  }
});

test('la categoría conserva noindex y el autor redirige al inicio', () => {
  const category = readFileSync(getPage('/category/uncategorized/'), 'utf8');
  assert.match(category, /name="robots" content="noindex,\s*follow"/);
  assert.ok(config.redirects.some((redirect) => redirect.source === '/author/admin/' && redirect.destination === '/' && redirect.permanent));
});

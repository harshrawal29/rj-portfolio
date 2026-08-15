import { getProjectBySlug } from './src/lib/portfolio/getProjectBySlug.ts';
async function run() {
  const p = await getProjectBySlug('the-boba');
  console.log(JSON.stringify(p.contentBlocks.filter(b => b.type === 'gallery-3'), null, 2));
}
run();

import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function run() {
  const docs = await client.fetch(`*[slug.current == "halke-phulke-redesign"]`)
  console.log(JSON.stringify(docs, null, 2))
}
run()

import { getCliClient } from 'sanity/cli'
const client = getCliClient()
async function run() {
  const drafts = await client.fetch(`*[_id == "drafts.v20c80PYNil1HmQKBt0RaS"]`)
  if (drafts.length > 0) {
    const draft = drafts[0]
    const publishedId = draft._id.replace('drafts.', '')
    
    // Create published version
    const publishedDoc = { ...draft, _id: publishedId }
    await client.createOrReplace(publishedDoc)
    console.log("Published project successfully!")
    
    // Optionally delete draft
    await client.delete(draft._id)
    console.log("Deleted draft.")
  } else {
    console.log("Draft not found.")
  }
}
run().catch(console.error)

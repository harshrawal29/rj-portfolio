import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function fixTypes() {
  console.log('Fixing block types in projects...')
  
  const projects = await client.fetch(`*[_type == "project" && defined(contentBlocks)] {
    _id,
    contentBlocks
  }`)
  
  for (const proj of projects) {
    let changed = false
    const newBlocks = proj.contentBlocks.map((block: any) => {
      if (block._type === 'slider') {
        changed = true
        return { ...block, _type: 'sliderBlock' }
      }
      if (block._type === 'statement') {
        changed = true
        return { ...block, _type: 'statementBlock' }
      }
      if (block._type === 'video') {
        changed = true
        return { ...block, _type: 'videoBlock' }
      }
      if (block._type === 'timeline') {
        changed = true
        return { ...block, _type: 'timelineBlock' }
      }
      return block
    })
    
    if (changed) {
      console.log(`Patching project ${proj._id}...`)
      await client.patch(proj._id).set({ contentBlocks: newBlocks }).commit()
    }
  }
  
  console.log('Done fixing types!')
}

fixTypes().catch(err => {
  console.error(err)
  process.exit(1)
})

import { getCliClient } from 'sanity/cli'
import fs from 'fs'
import path from 'path'

const client = getCliClient()
const PUBLIC_DIR = path.join(process.cwd(), '../public/projects')

async function uploadImage(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`)
    return null
  }
  
  console.log(`Uploading ${filePath}...`)
  try {
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath)
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (err) {
    console.error(`Failed to upload ${filePath}:`, err)
    return null
  }
}

function randKey() {
  return Math.random().toString(36).substring(7)
}

async function migrateBlocks() {
  const manifestPath = path.join(PUBLIC_DIR, 'manifest.json')
  const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  
  console.log('Migrating Content Blocks...')
  
  for (const proj of manifestData.projects) {
    const existing = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug: proj.slug })
    if (!existing) {
       console.log(`Project ${proj.slug} does not exist in Sanity, skipping.`)
       continue
    }
    
    const projectDir = path.join(PUBLIC_DIR, proj.slug)
    const projectJsonPath = path.join(projectDir, 'project.json')
    if (!fs.existsSync(projectJsonPath)) {
       continue
    }
    
    const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'))
    
    if (projectData.contentBlocks && projectData.contentBlocks.length > 0) {
      console.log(`Processing blocks for ${proj.slug}...`)
      const sanityBlocks = []
      
      for (const block of projectData.contentBlocks) {
        let type = block.type
        if (type === 'full-image') type = 'fullImageBlock'
        if (type === 'image-text') type = 'imageTextBlock'
        if (type === 'comparison') type = 'comparisonBlock'
        if (type === 'gallery-2') type = 'gallery2Block'
        if (type === 'gallery-3') type = 'gallery3Block'
        if (type === 'horizontal-scroll') type = 'horizontalScrollBlock'
        if (!type.endsWith('Block') && type !== 'statement' && type !== 'video' && type !== 'slider' && type !== 'timeline') {
          type = type + 'Block'
        }

        const sanityBlock: any = {
          _key: randKey(),
          _type: type,
          backgroundColor: block.backgroundColor
        }

        if (block.type === 'full-image' || block.type === 'image-text') {
           if (block.src) {
             const uploaded = await uploadImage(path.join(projectDir, block.src))
             if (uploaded) sanityBlock.image = uploaded
           }
           sanityBlock.alt = block.alt
           sanityBlock.caption = block.caption
           sanityBlock.label = block.label
           sanityBlock.heading = block.heading
           sanityBlock.body = block.body
           sanityBlock.variant = block.variant
        }
        
        if (block.type === 'statement') {
          sanityBlock.text = block.text
        }
        
        if (block.type === 'comparison') {
          if (block.before) sanityBlock.beforeImage = await uploadImage(path.join(projectDir, block.before))
          if (block.after) sanityBlock.afterImage = await uploadImage(path.join(projectDir, block.after))
          sanityBlock.beforeLabel = block.beforeLabel
          sanityBlock.afterLabel = block.afterLabel
        }
        
        if (block.type === 'gallery-2' && block.images) {
          if (block.images[0]?.src) sanityBlock.image1 = await uploadImage(path.join(projectDir, block.images[0].src))
          if (block.images[1]?.src) sanityBlock.image2 = await uploadImage(path.join(projectDir, block.images[1].src))
          sanityBlock.alt1 = block.images[0]?.alt
          sanityBlock.alt2 = block.images[1]?.alt
        }
        
        if (block.type === 'gallery-3' || block.type === 'horizontal-scroll') {
          sanityBlock.images = []
          for (const img of (block.images || [])) {
             const uploaded = await uploadImage(path.join(projectDir, img.src))
             if (uploaded) {
               sanityBlock.images.push({
                 _key: randKey(),
                 image: uploaded,
                 alt: img.alt,
                 title: img.title,
                 description: img.description,
                 metadata: img.metadata,
                 caption: img.caption
               })
             }
          }
        }
        
        if (block.type === 'slider') {
          sanityBlock.slides = []
          for (const slide of (block.slides || [])) {
             const uploaded = await uploadImage(path.join(projectDir, slide.src))
             if (uploaded) {
               sanityBlock.slides.push({
                 _key: randKey(),
                 image: uploaded,
                 alt: slide.alt,
                 caption: slide.caption
               })
             }
          }
        }
        
        if (block.type === 'video') {
           sanityBlock.url = block.src // We just use the file name or URL. If it's a local file, Sanity 'url' field won't upload it, but we can just store the string.
           // Note: if it's a local video, we'd need a file asset, but schema is 'url'.
           if (block.poster) {
             sanityBlock.poster = await uploadImage(path.join(projectDir, block.poster))
           }
        }
        
        if (block.type === 'timeline') {
           sanityBlock.steps = (block.steps || []).map((step: any) => ({
             ...step,
             _key: randKey()
           }))
        }

        sanityBlocks.push(sanityBlock)
      }
      
      console.log(`Patching ${proj.slug}...`)
      await client.patch(existing._id).set({ contentBlocks: sanityBlocks }).commit()
    }
  }
  
  console.log('Block Migration Complete!')
}

migrateBlocks().catch(err => {
  console.error(err)
  process.exit(1)
})

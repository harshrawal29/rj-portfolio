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

async function migrate() {
  const manifestPath = path.join(PUBLIC_DIR, 'manifest.json')
  const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  
  console.log('Migrating Categories...')
  const categoryIdMap = new Map()
  
  for (const cat of manifestData.categories) {
    // Check if category exists
    const existing = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug: cat.slug })
    if (existing) {
      console.log(`Category ${cat.slug} already exists`)
      categoryIdMap.set(cat.slug, existing._id)
      continue
    }

    // Since original categories don't have cover images but the schema requires one, we might need a dummy image
    // or just let it be missing if Sanity allows it during import (it usually bypasses validation).
    const doc = {
      _type: 'category',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
      order: cat.order
    }
    
    console.log(`Creating category: ${cat.title}`)
    const created = await client.create(doc)
    categoryIdMap.set(cat.slug, created._id)
  }
  
  console.log('Migrating Projects...')
  for (const proj of manifestData.projects) {
    const existing = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug: proj.slug })
    if (existing) {
       console.log(`Project ${proj.slug} already exists, skipping.`)
       continue
    }
    
    const projectDir = path.join(PUBLIC_DIR, proj.slug)
    const projectJsonPath = path.join(projectDir, 'project.json')
    if (!fs.existsSync(projectJsonPath)) {
       console.log(`No project.json for ${proj.slug}, skipping.`)
       continue
    }
    
    const projectData = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'))
    
    const doc: any = {
      _type: 'project',
      title: projectData.title,
      slug: { _type: 'slug', current: projectData.slug },
      year: projectData.year,
      summary: projectData.summary,
      order: projectData.order || proj.order,
      category: {
        _type: 'reference',
        _ref: categoryIdMap.get(projectData.category)
      }
    }
    
    if (projectData.cover) {
      const coverPath = path.join(projectDir, projectData.cover)
      const imageAsset = await uploadImage(coverPath)
      if (imageAsset) {
         doc.coverImage = imageAsset
      }
    }
    
    if (projectData.sections && projectData.sections.length > 0) {
      doc.sections = []
      
      for (const section of projectData.sections) {
         const newSection: any = {
           _key: Math.random().toString(36).substring(7),
           type: section.type,
           title: section.title,
           assets: []
         }
         
         for (const asset of section.assets) {
            const assetPath = path.join(projectDir, section.type, asset.filename)
            const uploadedImage = await uploadImage(assetPath)
            
            if (uploadedImage) {
               newSection.assets.push({
                 _key: Math.random().toString(36).substring(7),
                 image: uploadedImage,
                 alt: asset.alt,
                 span: asset.span
               })
            }
         }
         
         doc.sections.push(newSection)
      }
    }
    
    console.log(`Creating project: ${projectData.title}`)
    await client.create(doc)
  }
  
  console.log('Migration Complete!')
}

migrate().catch(err => {
  console.error(err)
  process.exit(1)
})

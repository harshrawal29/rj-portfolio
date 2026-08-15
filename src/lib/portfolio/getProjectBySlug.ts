import type { Project } from '../../types/portfolio'
import { sanityClient } from '../sanity'

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "category": category->slug.current,
    year,
    "cover": cover.asset->url,
    summary,
    clientHeading,
    client,
    servicesHeading,
    services,
    eyebrow,
    order,
    editorialStory,
    challengeHeading,
    challenge,
    approachHeading,
    approach,
    outcomeHeading,
    outcome,

    contentBlocks[] {
      ...,
      _type == 'fullImageBlock' => {
        "image": image.asset->url
      },
      _type == 'imageTextBlock' => {
        "image": media.asset->url,
        "mediaRight": mediaRight.asset->url
      },
      _type == 'comparisonBlock' => {
        "beforeImage": beforeImage.asset->url,
        "afterImage": afterImage.asset->url
      },
      _type == 'gallery2Block' => {
        "image1": image1.asset->url,
        "image2": image2.asset->url
      },
      _type == 'gallery3Block' => {
        images[] {
          ...,
          "image": image.asset->url
        }
      },
      _type == 'sliderBlock' => {
        slides[] {
          ...,
          "image": image.asset->url
        }
      },
      _type == 'videoBlock' => {
        "poster": poster.asset->url
      },
      _type == 'horizontalScrollBlock' => {
        images[] {
          ...,
          "image": image.asset->url
        }
      }
    }
  }`
  
  try {
    const project = await sanityClient.fetch(query, { slug })
    
    if (project && project.contentBlocks) {
      // Map Sanity blocks to the format expected by the frontend
      project.contentBlocks = project.contentBlocks.map((block: any) => {
        // Remove Sanity internal fields
        const { _key, _type, ...rest } = block
        
        // Map _type to type to match the existing frontend types
        let type = _type.replace('Block', '')
        if (type === 'fullImage') type = 'full-image'
        if (type === 'imageText') type = 'image-text'
        if (type === 'comparison') type = 'comparison'
        if (type === 'gallery2') type = 'gallery-2'
        if (type === 'gallery3') type = 'gallery-3'
        if (type === 'horizontalScroll') type = 'horizontal-scroll'
        
        // Map image fields to src
        if (type === 'full-image') {
          return { type, src: rest.image, ...rest }
        }
        if (type === 'image-text') {
          return { type, src: rest.image, ...rest }
        }
        if (type === 'gallery-2') {
          return { type, images: [{src: rest.image1, alt: rest.alt1}, {src: rest.image2, alt: rest.alt2}], ...rest }
        }
        if (type === 'gallery-3') {
           const images = rest.images?.map((img: any) => ({ ...img, src: img.image })) || []
           return { type, images, ...rest }
        }
        if (type === 'comparison') {
           return { type, before: rest.beforeImage, after: rest.afterImage, ...rest }
        }
        if (type === 'slider') {
           const slides = rest.slides?.map((s: any) => ({ ...s, src: s.image })) || []
           return { type, slides, ...rest }
        }
        if (type === 'horizontal-scroll') {
           const images = rest.images?.map((img: any) => ({ ...img, src: img.image })) || []
           return { type, images, ...rest }
        }
        if (type === 'video') {
           return { type, src: rest.url, ...rest }
        }
        
        return { type, ...rest }
      })
    }
    
    return project || null
  } catch (error) {
    console.error("Error fetching project by slug from Sanity", error)
    return null
  }
}

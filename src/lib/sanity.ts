import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity config
export const sanityClient = createClient({
  projectId: 'sn0k73pc',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2024-01-01', // use current date (YYYY-MM-DD) to target the latest API version
})

// Image Builder
const builder = imageUrlBuilder(sanityClient)

// Helper to get image URL
export function urlFor(source: any) {
  return builder.image(source)
}

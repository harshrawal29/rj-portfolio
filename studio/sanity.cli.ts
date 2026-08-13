import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'sn0k73pc',
    dataset: 'production'
  },
  studioHost: 'rj-portfolio',
  deployment: {
    appId: 'ev7c2o0hp8eaqa85gprd2sqd',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})

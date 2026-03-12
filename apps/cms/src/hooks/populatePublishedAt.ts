import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedAt: CollectionBeforeChangeHook = ({
  data,
  operation,
  req,
}) => {
  if (operation === 'create' || operation === 'update') {
    if (req.data && !data.publishedAt && data._status === 'published') {
      return {
        ...data,
        publishedAt: new Date().toISOString(),
      }
    }
  }
  return data
}

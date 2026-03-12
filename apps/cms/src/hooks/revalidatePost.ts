import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidatePost: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating post: ${doc.slug}`)
  revalidateTag('posts')
  revalidateTag(`post-${doc.slug}`)
  return doc
}

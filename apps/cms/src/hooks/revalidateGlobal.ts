import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info('Revalidating header')
  revalidateTag('header')
  return doc
}

export const revalidateFooter: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  payload.logger.info('Revalidating footer')
  revalidateTag('footer')
  return doc
}

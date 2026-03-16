import { getPayload } from 'payload'
import config from '@/cms/payload.config'

export const getPayloadClient = () => getPayload({ config })

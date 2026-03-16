import config from '@/cms/payload.config'
import { getPayload } from 'payload'

export const getPayloadClient = () => getPayload({ config })

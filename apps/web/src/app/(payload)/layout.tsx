import '@payloadcms/next/css'
import React from 'react'

import { importMap } from './admin/importMap'
import config from '@payload-config'

import type { ServerFunctionClient } from 'payload'

import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'


type Args = {
children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
'use server'
return handleServerFunctions({
...args,
config,
importMap,
})
}

export default async function PayloadLayout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

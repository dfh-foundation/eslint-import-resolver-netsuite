import * as nodeResolve from 'resolve'
import path from 'path'
import debug from 'debug'

const log = debug('eslint-import-resolver-netsuite')

interface Config {
  extensions?: string[]
}

interface ResolveReturnValue {
  found: boolean
  path?: string | null
}

const suiteScriptModules = [
  'N/action',
  'N/auth',
  'N/cache',
  'N/certificateControl',
  'N/compress',
  'N/config',
  'N/crypto',
  'N/crypto/certificate',
  'N/currency',
  'N/currentRecord',
  'N/dataset',
  'N/datasetLink',
  'N/email',
  'N/encode',
  'N/error',
  'N/file',
  'N/format',
  'N/format/i18n',
  'N/http',
  'N/https',
  'N/keyControl',
  'N/log',
  'N/plugin',
  'N/portlet',
  'N/query',
  'N/piremoval',
  'N/record',
  'N/recordContext',
  'N/redirect',
  'N/render',
  'N/runtime',
  'N/search',
  'N/sftp',
  'N/sso',
  'N/task',
  'N/transaction',
  'N/translation',
  'N/url',
  'N/util',
  'N/workbook',
  'N/workflow',
  'N/xml',
  'N/commerce/recordView',
  'N/ui/dialog',
  'N/ui/message',
  'N/ui/serverWidget',
]

const opts = (file: string, config: Config) => ({
  extensions: ['.js', '.ts', '.d.ts'],
  ...config,
  basedir: path.dirname(path.resolve(file)),
})

const isRelativeDirectoryImport = (source: string, resolved: string): boolean =>
  source.startsWith('.') && !/index(?:\.[^/]+|)$/.test(source) && /index\.[^/]+$/.test(resolved)

export const interfaceVersion = 2

export const resolve = (source: string, file: string, config: Config): ResolveReturnValue => {
  log('Resolving:', source, 'from:', file)

  if (suiteScriptModules.includes(source)) {
    log('resolved to SuiteScript module')
    return { found: true, path: null }
  }

  let resolvedPath
  try {
    resolvedPath = nodeResolve.sync(source, opts(file, config))
    log('Resolved to:', resolvedPath)
  } catch (err) {
    log('resolve threw error:', err)
    return { found: false }
  }

  if (isRelativeDirectoryImport(source, resolvedPath)) {
    // throw error to prevent other resolves from masking
    throw new Error(
      `Found relative directory import: "${source}". SuiteScript requires explicit "index" imports.`
    )
  }
  return { found: true, path: resolvedPath }
}

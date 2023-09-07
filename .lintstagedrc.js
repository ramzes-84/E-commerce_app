import { relative } from 'path'
 
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(' --file ')}`
 
export default {
  '*.{js,ts,tsx}': [buildEslintCommand],
}
import sharp from 'sharp'
import { mkdirSync } from 'fs'

mkdirSync('public/icons', { recursive: true })

const sizes = [
  { size: 192, name: 'public/icons/icon-192.png' },
  { size: 512, name: 'public/icons/icon-512.png' },
  { size: 180, name: 'public/icons/apple-touch-icon.png' },
  { size: 32,  name: 'public/favicon-32.png' },
  { size: 16,  name: 'public/favicon-16.png' },
  { size: 120, name: 'public/icons/icon-120.png' },
]

for (const { size, name } of sizes) {
  await sharp('public/logo.png')
    .resize(size, size)
    .toFile(name)
  console.log(`✓ ${name}`)
}

console.log('Listo!')

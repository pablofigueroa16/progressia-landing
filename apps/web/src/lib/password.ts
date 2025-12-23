// Password hashing utilities
// Using a simpler approach compatible with Edge runtime
// In production, consider using argon2 with a Node.js runtime

const SALT_LENGTH = 16
const ITERATIONS = 100000
const KEY_LENGTH = 64
const DIGEST = 'SHA-256'

async function deriveKey(password: string, salt: Uint8Array): Promise<ArrayBuffer> {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )

  return crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: ITERATIONS,
      hash: DIGEST,
    },
    keyMaterial,
    KEY_LENGTH * 8
  )
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
  const hash = await deriveKey(password, salt)
  
  const saltBase64 = arrayBufferToBase64(salt.buffer)
  const hashBase64 = arrayBufferToBase64(hash)
  
  return `${saltBase64}:${hashBase64}`
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const [saltBase64, hashBase64] = storedHash.split(':')
    const salt = base64ToArrayBuffer(saltBase64)
    const expectedHash = base64ToArrayBuffer(hashBase64)
    
    const actualHash = await deriveKey(password, salt)
    const actualBytes = new Uint8Array(actualHash)
    
    // Constant-time comparison
    if (actualBytes.length !== expectedHash.length) return false
    
    let result = 0
    for (let i = 0; i < actualBytes.length; i++) {
      result |= actualBytes[i] ^ expectedHash[i]
    }
    
    return result === 0
  } catch {
    return false
  }
}

export function generateToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32))
  return arrayBufferToBase64(bytes.buffer).replace(/[+/=]/g, '')
}


export const EMAIL_DOMAIN = '@gmail.com'

export function cleanEmailUsername(value) {
  return value.split('@')[0].replace(/\s/g, '')
}

export function toGmail(username) {
  return `${cleanEmailUsername(username).toLowerCase()}${EMAIL_DOMAIN}`
}

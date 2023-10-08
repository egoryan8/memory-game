export const cleanPath = (path: string) =>
  path.charAt(0) === '/' ? path.slice(1) : path

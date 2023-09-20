export const setupFetchStub = (data: Response) => (url: string) =>
  new Promise(resolve => resolve(data))
declare const __SERVER_PORT__: number

export interface AuthResp {
  id: number,
  username: string,
  roles: string[],
  accessToken: string,
  tokenType: string
}
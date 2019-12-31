export interface AuthResponseData {
  access_token: string;
  token_type: string;
  expires_at: Date;
  id?: string;
  email?: string;
}

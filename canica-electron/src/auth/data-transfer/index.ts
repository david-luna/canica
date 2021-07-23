export interface EmailDataTransfer {
  address: string;
  domain: string;
}

export interface UserDataTransfer {
  name: string;
  birth: string;
  email: EmailDataTransfer;
}

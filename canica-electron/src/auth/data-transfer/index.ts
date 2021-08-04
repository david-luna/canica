export interface EmailDataTransfer {
  address: string;
}

export interface UserDataTransfer {
  name: string;
  email: EmailDataTransfer;
  picture: string;
}

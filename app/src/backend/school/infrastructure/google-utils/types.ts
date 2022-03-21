export interface GoogleToken {
  access_token: string;
}

export interface FileDetails {
  id: string;
  name: string;
}

export enum MimeType {
  Folder = "application/vnd.google-apps.folder",
  Spreadsheet = "application/vnd.google-apps.spreadsheet",
}

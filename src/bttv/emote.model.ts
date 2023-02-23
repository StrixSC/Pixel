export default interface Emote {
  id: string; // "5f1b0186cf6d2144653d2970",
  code: string; // "catJAM",
  imageType: ImageType; // "gif",
  animated: boolean; // true,
  createdAt: string; // "2020-07-24T15:43:02.448Z",
  updatedAt: string; // "2023-01-18T20:43:16.497Z",
  global: boolean; // false,
  live: boolean; // true,
  sharing: boolean; // true,
  approvalStatus: ApprovalStatus;
  url: string; // "APPROVED",
}

export enum ApprovalStatus {
  APPROVED = "APPROVED",
  AUTO_APPROVED = "AUTO_APPROVED",
}

export enum ImageType {
  GIF = "gif",
  PNG = "png",
  JPEG = "jpeg",
  JPG = "jpg",
}

export interface SearchEmote {
  id: string;
  code: string;
  imageType: string;
  animated: boolean;
  user: any;
  url: string;
}
import { Dayjs } from "dayjs";

export type BasicInfoData = {
  displayName?: string;
  email?: string;
  gender?: string;
  birthDate?: Dayjs | null | string;
  phoneNumber?: string;
}

export type AddressData = {
  addressCountry?: string;
  addressFullName?: string;
  addressMobile?: string;
  streetName?: string;
  buildingName?: string;
  city?: string;
  district?: string;
  governorate?: string;
  landmark?: string;
}

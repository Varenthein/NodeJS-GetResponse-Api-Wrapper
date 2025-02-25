export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";

export type ValueOf<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer PossibleValues
>
  ? PossibleValues
  : never

export type IsInUnion<T, K> = [K & T] extends [never]? false : true;

export type StringBooleanEnum = "true" | "false";

export type GetResponseCampaignSummary = {
  description: string
  campaignId: string
  name: string
  techName: string
  languageCode: string
  isDefault: StringBooleanEnum
  createdOn: string
  href: string
}

export type GetResponsePostal = {
  addPostalToMessages: StringBooleanEnum
  city: string
  companyName: string
  country: string
  design: string
  state: string
  street: string
  zipCode: string
}

export type GetResponseOptinTypes = {
  email: string
  api: string
  import: string
  webform: string
}

export type GetResponseSubscriptionNotifications = {
  status: "enabled" | "disabled"
  recipients: { fromFieldId: string }[]
}

export type GetResponseFromField = {
  fromFieldId: string,
  href: string
}

export type GetResponseProfile = {
  description: string
  industryTagId: string
  logo: string
  logoLinkUrl: string
  title: string
}

export type GetResponseConfirmation = {
  fromField: GetResponseFromField
  redirectType: string
  mimeType: string
  redirectUrl: string
  replyTo: {
    fromFieldId: string
    href: string
  },
  subscriptionConfirmationBodyId: string
  subscriptionConfirmationSubjectId: string
}

export type GetResponseCampaign = {
  campaignId: string
  name: string
  techName: string
  languageCode: string
  isDefault: StringBooleanEnum
  createdOn: string
  href: string
  postal: GetResponsePostal
  confirmation: GetResponseConfirmation
  optinTypes: GetResponseOptinTypes
  subscriptionNotifications: GetResponseSubscriptionNotifications
  profile: GetResponseProfile
}

export type GetResponseUpdateCampaignData = {
  name: string
  languageCode?: string
  isDefault?: StringBooleanEnum 
  postal?: GetResponsePostal
  confirmation?: GetResponseConfirmation
  optinTypes?: GetResponseOptinTypes
  subscriptionNotifications?: GetResponseSubscriptionNotifications
  profile?: GetResponseProfile
}

export type GetResponseCreateCampaignData = {
  name: string
  languageCode?: string
  isDefault?: StringBooleanEnum 
  postal?: GetResponsePostal
  confirmation?: GetResponseConfirmation
  optinTypes?: GetResponseOptinTypes
  subscriptionNotifications?: GetResponseSubscriptionNotifications
  profile?: GetResponseProfile
}

export type GetResponseQueryFlag = "add" | "delete" | "noResponse";

export type GetResponseBlocklistMask = 
  `@${string}.${string}` |
  `${string}@${string}.${string}` |
  `${string}@${string}.${string}.${string}`

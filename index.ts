import { GetResponseCampaign, GetResponseCampaignSummary, HTTPMethod } from "./types";
import { paramsObjToUrlFD, responseHeadersToObj } from "./utils";

export class GetResponse {

  constructor(private apiKey: string) {
    if (!this.apiKey) {
      throw new Error("You have to provide GetResponse API key!");
    }
  }

  #makeApiRequest = async (
    resourceUrl: string,
    method: HTTPMethod,
    params?: Record<string, any> | null | undefined,
    pagination?: {
      perPage?: number,
      page?: number
    }
  ) => {

    const options: RequestInit = {
      method: method,
      headers: {
        'X-Auth-Token': "api-key " + this.apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    if (params)
      options.body = paramsObjToUrlFD(params);

    try {

      // make the request and parse the response
      const url = pagination ? `${resourceUrl}?perPage=${pagination.perPage || 10}&page=${pagination.page || 1}` : resourceUrl;
      const response = await fetch("https://api.getresponse.com/v3" + url, options);
      const result = await response.json();

      // if status code claims it's success, just return the response
      if ([200, 201].includes(response.status))
        return result;

      // if there's server-side error, return it as an error
      if (response.status === 500) {
        throw new Error(result);
      }

      // if there 429 status code, it means user made too many requests in current time frame
      // API returns time to reset in the proper header, so -> read it and return it in the error message
      if (response.status === 429) {
        const headersObj = responseHeadersToObj(response.headers);
        throw new Error(`Too many requests... You have to wait for ${headersObj.timeToReset || "unknown"}`);
      }

      // if there is different status, just return error response
      // it should explain what's wrong just fine
      throw new Error(result);

    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Request failed for url "${resourceUrl}" \nMessage: ${err.message}`)
      } else {
        throw new Error(`Request failed for url "${resourceUrl}"`)
      }
    }
  }

  /**
   * Get all campaigns list.
   * @param perPage items per page (optional)
   * @param page page to display (optional)
   * @returns 
   */
  async getCampaigns(
    perPage?: number,
    page?: number
  ): Promise<GetResponseCampaignSummary[]> {
    return await this.#makeApiRequest("/campaigns", "GET", null, { perPage, page });
  }

  /**
   * Get campaign details.
   * @param campaignId The campaign ID
   * @param fields List of fields that should be returned. Id is always returned.
   * @returns 
   */
  async getCampaignById(
    campaignId: string,
  ): Promise<GetResponseCampaign>
  async getCampaignById<T extends ReadonlyArray<keyof GetResponseCampaign>>(
    campaignId: string,
    fields: T
  ): Promise<T extends ReadonlyArray<infer K> 
    ? K extends keyof GetResponseCampaign 
      ? Pick<GetResponseCampaign, K> & { campaignId: string }
      : never
    : never>
  async getCampaignById<T extends ReadonlyArray<keyof GetResponseCampaign> | undefined>(
    campaignId: string,
    fields?: T
  ): Promise<T extends ReadonlyArray<infer K> 
    ? K extends keyof GetResponseCampaign 
      ? Pick<GetResponseCampaign, K> & { campaignId: string }
      : never
    : GetResponseCampaign> {
    return await this.#makeApiRequest("/campaigns/" + campaignId, "GET", {
      fields
    });
  }
}

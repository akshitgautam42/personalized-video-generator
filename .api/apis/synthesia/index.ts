import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'synthesia/unknown (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * You can use Retrieve a video endpoint to pull for the video status.
   *
   * @summary Retrieve a video
   * @throws FetchError<400, types.RetrieveAVideoResponse400> 400
   * @throws FetchError<403, types.RetrieveAVideoResponse403> 403
   */
  retrieveAVideo(metadata: types.RetrieveAVideoMetadataParam): Promise<FetchResponse<200, types.RetrieveAVideoResponse200>> {
    return this.core.fetch('/videos/{video_id}', 'get', metadata);
  }

  /**
   * Create a video based on a template created in Synthesia.
   *
   * @summary Create a video from a template
   * @throws FetchError<400, types.CreateAVideoFromATemplateResponse400> 400
   */
  createAVideoFromATemplate(body?: types.CreateAVideoFromATemplateBodyParam): Promise<FetchResponse<200, types.CreateAVideoFromATemplateResponse200>> {
    return this.core.fetch('/videos/fromTemplate', 'post', body);
  }

  /**
   * Create a video within your Synthesia account
   *
   * @summary Create video
   */
  createVideo(body?: types.CreateVideoBodyParam): Promise<FetchResponse<200, types.CreateVideoResponse200>> {
    return this.core.fetch('/videos', 'post', body);
  }

  /**
   * You can use the List videos endpoint to get an overview of all videos created in your
   * Synthesia account.
   *
   * @summary List videos
   * @throws FetchError<403, types.ListVideosResponse403> 403
   */
  listVideos(metadata: types.ListVideosMetadataParam): Promise<FetchResponse<200, types.ListVideosResponse200>> {
    return this.core.fetch('/videos?limit={LIMIT}&offset={OFFSET}', 'get', metadata);
  }

  /**
   * You can use the Update a video endpoint to make the video public and accessible via the
   * share page or update its title and description.
   *
   * @summary Update a video
   * @throws FetchError<400, types.UpdateAVideoResponse400> 400
   */
  updateAVideo(body: types.UpdateAVideoBodyParam, metadata: types.UpdateAVideoMetadataParam): Promise<FetchResponse<200, types.UpdateAVideoResponse200>>;
  updateAVideo(metadata: types.UpdateAVideoMetadataParam): Promise<FetchResponse<200, types.UpdateAVideoResponse200>>;
  updateAVideo(body?: types.UpdateAVideoBodyParam | types.UpdateAVideoMetadataParam, metadata?: types.UpdateAVideoMetadataParam): Promise<FetchResponse<200, types.UpdateAVideoResponse200>> {
    return this.core.fetch('/videos/{VIDEO_ID}', 'patch', body, metadata);
  }

  /**
   * Use this endpoint to delete videos from Synthesia.
   *
   * @summary Delete a video
   * @throws FetchError<400, types.DeleteAVideoResponse400> 400
   */
  deleteAVideo(metadata: types.DeleteAVideoMetadataParam): Promise<FetchResponse<200, types.DeleteAVideoResponse200>> {
    return this.core.fetch('/videos/{VIDEO_ID}', 'delete', metadata);
  }

  /**
   * Use this endpoint to pull information on a given template. In particular, you may use it
   * to find out the variables available for customisation.
   *
   * @summary Retrieve a template
   * @throws FetchError<400, types.RetrieveATemplateResponse400> 400
   */
  retrieveATemplate(metadata: types.RetrieveATemplateMetadataParam): Promise<FetchResponse<200, types.RetrieveATemplateResponse200>> {
    return this.core.fetch('/templates/{TEMPLATE_ID}', 'get', metadata);
  }

  /**
   * Use this endpoint to get an overview of all templates in Synthesia, as well as the
   * variables that may be provided when using them.
   *
   * @summary List templates
   * @throws FetchError<400, types.ListTemplatesResponse400> 400
   */
  listTemplates(metadata: types.ListTemplatesMetadataParam): Promise<FetchResponse<200, types.ListTemplatesResponse200>> {
    return this.core.fetch('/templates?limit={LIMIT}&offset={OFFSET}', 'get', metadata);
  }

  /**
   * You can use the Create a webhook endpoint to create a new event subscription.
   *
   * @summary Create a webhook
   * @throws FetchError<400, types.CreateAWebhookResponse400> 400
   */
  createAWebhook(body?: types.CreateAWebhookBodyParam): Promise<FetchResponse<200, types.CreateAWebhookResponse200>> {
    return this.core.fetch('/webhooks', 'post', body);
  }

  /**
   * Retrieve a webhook endpoint to pull for the webhook status.
   *
   * @summary Retrieve a webhook
   * @throws FetchError<400, types.RetrieveAWebhookResponse400> 400
   */
  retrieveAWebhook(metadata: types.RetrieveAWebhookMetadataParam): Promise<FetchResponse<200, types.RetrieveAWebhookResponse200>> {
    return this.core.fetch('/webhooks/{WEBHOOK_ID}', 'get', metadata);
  }

  /**
   * Use the Delete webhooks endpoint to delete (deactivate) an active webhook from your
   * Synthesia account.
   *
   * @summary Delete a webhook
   * @throws FetchError<400, types.DeleteAWebhookResponse400> 400
   */
  deleteAWebhook(metadata: types.DeleteAWebhookMetadataParam): Promise<FetchResponse<204, types.DeleteAWebhookResponse204>> {
    return this.core.fetch('/webhooks/{WEBHOOK_ID}', 'delete', metadata);
  }

  /**
   * List all currently configured webhooks in your Synthesia account.
   *
   * @summary List webhooks
   * @throws FetchError<400, types.ListWebhooksResponse400> 400
   */
  listWebhooks(metadata: types.ListWebhooksMetadataParam): Promise<FetchResponse<200, types.ListWebhooksResponse200>> {
    return this.core.fetch('/webhooks?limit={LIMIT}&offset={OFFSET}&deleted={DELETED}"', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { CreateAVideoFromATemplateBodyParam, CreateAVideoFromATemplateResponse200, CreateAVideoFromATemplateResponse400, CreateAWebhookBodyParam, CreateAWebhookResponse200, CreateAWebhookResponse400, CreateVideoBodyParam, CreateVideoResponse200, DeleteAVideoMetadataParam, DeleteAVideoResponse200, DeleteAVideoResponse400, DeleteAWebhookMetadataParam, DeleteAWebhookResponse204, DeleteAWebhookResponse400, ListTemplatesMetadataParam, ListTemplatesResponse200, ListTemplatesResponse400, ListVideosMetadataParam, ListVideosResponse200, ListVideosResponse403, ListWebhooksMetadataParam, ListWebhooksResponse200, ListWebhooksResponse400, RetrieveATemplateMetadataParam, RetrieveATemplateResponse200, RetrieveATemplateResponse400, RetrieveAVideoMetadataParam, RetrieveAVideoResponse200, RetrieveAVideoResponse400, RetrieveAVideoResponse403, RetrieveAWebhookMetadataParam, RetrieveAWebhookResponse200, RetrieveAWebhookResponse400, UpdateAVideoBodyParam, UpdateAVideoMetadataParam, UpdateAVideoResponse200, UpdateAVideoResponse400 } from './types';

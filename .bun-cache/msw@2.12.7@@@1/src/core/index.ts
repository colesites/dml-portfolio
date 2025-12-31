import { checkGlobals } from "./utils/internal/checkGlobals";

export { getResponse } from "./getResponse";
export { graphql } from "./graphql";
export { GraphQLHandler } from "./handlers/GraphQLHandler";
export { HttpHandler, HttpMethods } from "./handlers/HttpHandler";
/* HTTP handlers */
export { RequestHandler } from "./handlers/RequestHandler";
export {
  WebSocketHandler,
  type WebSocketHandlerConnection,
  type WebSocketHandlerEventMap,
} from "./handlers/WebSocketHandler";
export { http } from "./http";
export { SetupApi } from "./SetupApi";

/* Server-Sent Events */
export {
  type ServerSentEventMessage,
  type ServerSentEventRequestHandler,
  type ServerSentEventResolver,
  type ServerSentEventResolverExtras,
  sse,
} from "./sse";
export * from "./utils/handleRequest";
/* Utils */
export { matchRequestUrl } from "./utils/matching/matchRequestUrl";
export {
  onUnhandledRequest,
  type UnhandledRequestCallback,
  type UnhandledRequestStrategy,
} from "./utils/request/onUnhandledRequest";
export { cleanUrl } from "./utils/url/cleanUrl";
/* WebSocket handler */
export { type WebSocketLink, ws } from "./ws";

/**
 * Type definitions.
 */

export { bypass } from "./bypass";
export * from "./delay";
export type {
  GraphQLLinkHandlers,
  GraphQLOperationHandler,
  GraphQLRequestHandler,
  GraphQLResponseResolver,
} from "./graphql";
export * from "./HttpResponse";

export type {
  GraphQLCustomPredicate,
  GraphQLJsonRequestBody,
  GraphQLOperationType,
  GraphQLQuery,
  GraphQLRequestBody,
  GraphQLResponseBody,
  GraphQLVariables,
} from "./handlers/GraphQLHandler";
export type {
  HttpCustomPredicate,
  HttpHandlerInfo,
  HttpHandlerMethod,
  HttpRequestParsedResult,
  HttpRequestResolverExtras,
  RequestQuery,
} from "./handlers/HttpHandler";
export type {
  AsyncResponseResolverReturnType,
  DefaultBodyType,
  DefaultRequestMultipartBody,
  JsonBodyType,
  RequestHandlerOptions,
  ResponseResolver,
  ResponseResolverInfo,
  ResponseResolverReturnType,
} from "./handlers/RequestHandler";
export type { HttpRequestHandler, HttpResponseResolver } from "./http";
export { isCommonAssetRequest } from "./isCommonAssetRequest";
export { passthrough } from "./passthrough";
export type { LifeCycleEventsMap, SharedOptions } from "./sharedOptions";
export type { ResponseResolutionContext } from "./utils/executeHandlers";
export type { ParsedGraphQLRequest } from "./utils/internal/parseGraphQLRequest";
export type { Match, Path, PathParams } from "./utils/matching/matchRequestUrl";
export type { WebSocketData, WebSocketEventListener } from "./ws";

// Validate environmental globals before executing any code.
// This ensures that the library gives user-friendly errors
// when ran in the environments that require additional polyfills
// from the end user.
checkGlobals();

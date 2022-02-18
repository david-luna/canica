export interface UseCase<RequestType, ResponseType> {
  execute(request: RequestType): ResponseType | Promise<ResponseType>;
}

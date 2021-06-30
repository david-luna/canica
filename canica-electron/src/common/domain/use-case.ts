
export abstract class UseCase<RequestType, ResponseType> {
  abstract execute(request: RequestType): ResponseType | Promise<ResponseType>;
}

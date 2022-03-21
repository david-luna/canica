export function WithGoogleToken(
  _target: unknown,
  _propertyKey: string,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(this as any).googleToken) {
      throw new Error(
        "Forbidden access to query data. You need to get a token 1st"
      );
    }
    return originalMethod.apply(this, args);
  };
}

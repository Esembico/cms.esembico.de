export interface RequiredHandler {
  (name: string, property: string): void;
}

export interface ValidationErrorHandler {
  required: RequiredHandler;
  requireNumber: RequiredHandler;
  requireUrl: RequiredHandler;
}

export interface ResponseMock<T = unknown> {
  data: T[];
  meta: {
    total: number;
  };
}

export interface NextError extends Error {
  digest?: string;
}

export type EmptyParams = Record<string, never>;

export interface PageProps<TParams = EmptyParams, TSearchParams = EmptyParams> {
  params: Promise<TParams>;
  searchParams: Promise<TSearchParams>;
}

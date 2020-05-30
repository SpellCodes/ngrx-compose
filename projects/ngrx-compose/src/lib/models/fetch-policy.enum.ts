/**
 * fetchPolicy determines where the client may return a result from. The options are:
 * - cache-first (default): return result from cache.
 * Only fetch from network if cached result is not available.
 *
 * - cache-and-network: return result from cache first (if it exists),
 * then return network result once it's available.
 *
 * - cache-only: return result from cache if available, fail otherwise.
 */
export declare enum FetchPolicy {
  CacheFirst = 'cache-first',
  CacheAndNetwork = 'cache-and-network',
  CacheOnly = 'cache-only',
}

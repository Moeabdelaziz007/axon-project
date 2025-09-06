interface CacheEntry {
  value: any;
  expiry: number;
}

/**
 * A simple in-memory cache for tool results.
 * It stores key-value pairs with an optional time-to-live (TTL).
 */
export class ToolCache {
  private cache: Map<string, CacheEntry>;

  constructor() {
    this.cache = new Map<string, CacheEntry>();
  }

  /**
   * Retrieves a value from the cache.
   * @param {string} key - The key of the item to retrieve.
   * @returns {any | undefined} The cached value if found and not expired, otherwise undefined.
   */
  get(key: string): any | undefined {
    const entry = this.cache.get(key);
    if (entry && entry.expiry > Date.now()) {
      return entry.value;
    }
    // If expired or not found, remove it
    if (entry) {
      this.cache.delete(key);
    }
    return undefined;
  }

  /**
   * Stores a value in the cache.
   * @param {string} key - The key of the item to store.
   * @param {any} value - The value to store.
   * @param {number} ttl - Time-to-live in milliseconds. Defaults to 1 hour.
   */
  set(key: string, value: any, ttl: number = 3600000): void {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl,
    });
  }

  /**
   * Clears all entries from the cache.
   */
  clear(): void {
    this.cache.clear();
  }
}

// Export a singleton instance of the cache
export const toolCache = new ToolCache();

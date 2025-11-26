export type AppEnvironment = {
  apiBase: string;
  backendUrl: string;
  frontendUrl: string;
  wsUrl: string;
  nodeEnv: string;
  telemetryDisabled: boolean;
  enableSourceMaps: boolean;
  port: number;
  trustProxy: boolean;
  logLevel: string;
  healthcheckPath: string;
  featureFlags: Record<string, boolean>;
  experimentsEnabled: boolean;
};

/**
 * Default environment used unless replaced by a build configuration.
 * Values are read from NG_APP_* environment variables at build time if defined (Angular CLI replaces process.env at build).
 * Sensible defaults are provided.
 */
export const environment: AppEnvironment = {
  apiBase: (typeof process !== 'undefined' && (process as any).env?.NG_APP_API_BASE) || '',
  backendUrl: (typeof process !== 'undefined' && (process as any).env?.NG_APP_BACKEND_URL) || '',
  frontendUrl: (typeof process !== 'undefined' && (process as any).env?.NG_APP_FRONTEND_URL) || '',
  wsUrl: (typeof process !== 'undefined' && (process as any).env?.NG_APP_WS_URL) || '',
  nodeEnv: (typeof process !== 'undefined' && (process as any).env?.NG_APP_NODE_ENV) || '',
  telemetryDisabled: ((typeof process !== 'undefined' && (process as any).env?.NG_APP_NEXT_TELEMETRY_DISABLED) ?? 'false') === 'true',
  enableSourceMaps: ((typeof process !== 'undefined' && (process as any).env?.NG_APP_ENABLE_SOURCE_MAPS) ?? 'false') === 'true',
  port: Number((typeof process !== 'undefined' && (process as any).env?.NG_APP_PORT) ?? 3000),
  trustProxy: ((typeof process !== 'undefined' && (process as any).env?.NG_APP_TRUST_PROXY) ?? 'false') === 'true',
  logLevel: (typeof process !== 'undefined' && (process as any).env?.NG_APP_LOG_LEVEL) || 'info',
  healthcheckPath: (typeof process !== 'undefined' && (process as any).env?.NG_APP_HEALTHCHECK_PATH) || '/healthz',
  featureFlags: (() => {
    const raw = (typeof process !== 'undefined' && (process as any).env?.NG_APP_FEATURE_FLAGS) || '';
    try {
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
      return {};
    } catch {
      return {};
    }
  })(),
  experimentsEnabled: ((typeof process !== 'undefined' && (process as any).env?.NG_APP_EXPERIMENTS_ENABLED) ?? 'false') === 'true',
};

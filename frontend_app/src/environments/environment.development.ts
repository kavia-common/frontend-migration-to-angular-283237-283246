import type { AppEnvironment } from './environment';

export const environment: AppEnvironment = {
  apiBase: (typeof process !== 'undefined' && (process as any).env?.NG_APP_API_BASE) || 'http://localhost:3001/api',
  backendUrl: (typeof process !== 'undefined' && (process as any).env?.NG_APP_BACKEND_URL) || 'http://localhost:3001',
  frontendUrl: (typeof process !== 'undefined' && (process as any).env?.NG_APP_FRONTEND_URL) || 'http://localhost:3000',
  wsUrl: (typeof process !== 'undefined' && (process as any).env?.NG_APP_WS_URL) || 'ws://localhost:3001',
  nodeEnv: (typeof process !== 'undefined' && (process as any).env?.NG_APP_NODE_ENV) || 'development',
  telemetryDisabled: ((typeof process !== 'undefined' && (process as any).env?.NG_APP_NEXT_TELEMETRY_DISABLED) ?? 'true') === 'true',
  enableSourceMaps: ((typeof process !== 'undefined' && (process as any).env?.NG_APP_ENABLE_SOURCE_MAPS) ?? 'true') === 'true',
  port: Number((typeof process !== 'undefined' && (process as any).env?.NG_APP_PORT) ?? 3000),
  trustProxy: ((typeof process !== 'undefined' && (process as any).env?.NG_APP_TRUST_PROXY) ?? 'false') === 'true',
  logLevel: (typeof process !== 'undefined' && (process as any).env?.NG_APP_LOG_LEVEL) || 'debug',
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

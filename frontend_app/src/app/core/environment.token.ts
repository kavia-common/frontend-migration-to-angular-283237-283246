import { InjectionToken, Provider } from '@angular/core';
import { environment as builtEnv } from '../../environments/environment';

export type EnvShape = typeof builtEnv;

/**
 * PUBLIC_INTERFACE
 * Injection token that provides application environment configuration.
 * On the server (SSR), it reads from process.env.NG_APP_*; on the browser, it uses
 * the built environment files (environment.ts/environment.development.ts).
 */
export const ENVIRONMENT = new InjectionToken<EnvShape>('ENVIRONMENT');

/**
 * PUBLIC_INTERFACE
 * Factory function that resolves environment values. It detects SSR (Node) via
 * the presence of process and process.versions.node and prefers process.env values when available.
 * In the browser, it returns the values compiled from the Angular environment files.
 */
export function environmentFactory(): EnvShape {
  const isNode =
    typeof process !== 'undefined' &&
    !!(process as any).versions &&
    !!(process as any).versions.node;

  if (!isNode) {
    // Browser: rely on built environment values
    return builtEnv;
  }

  // SSR/Node: read from process.env (fallback to built values when not provided)
  const env = (process as any).env ?? {};

  // Helper to coerce boolean and number safely
  const asBool = (v: any, fallback: boolean) => {
    if (v === undefined || v === null || v === '') return fallback;
    return String(v) === 'true';
  };
  const asNum = (v: any, fallback: number) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };
  const parseJsonRecord = (raw: any): Record<string, boolean> => {
    try {
      if (!raw) return {};
      const parsed = JSON.parse(String(raw));
      if (parsed && typeof parsed === 'object') return parsed as Record<string, boolean>;
      return {};
    } catch {
      return {};
    }
  };

  const resolved: EnvShape = {
    apiBase: env.NG_APP_API_BASE ?? builtEnv.apiBase,
    backendUrl: env.NG_APP_BACKEND_URL ?? builtEnv.backendUrl,
    frontendUrl: env.NG_APP_FRONTEND_URL ?? builtEnv.frontendUrl,
    wsUrl: env.NG_APP_WS_URL ?? builtEnv.wsUrl,
    nodeEnv: env.NG_APP_NODE_ENV ?? builtEnv.nodeEnv,
    telemetryDisabled: asBool(env.NG_APP_NEXT_TELEMETRY_DISABLED, builtEnv.telemetryDisabled),
    enableSourceMaps: asBool(env.NG_APP_ENABLE_SOURCE_MAPS, builtEnv.enableSourceMaps),
    port: asNum(env.NG_APP_PORT, builtEnv.port),
    trustProxy: asBool(env.NG_APP_TRUST_PROXY, builtEnv.trustProxy),
    logLevel: env.NG_APP_LOG_LEVEL ?? builtEnv.logLevel,
    healthcheckPath: env.NG_APP_HEALTHCHECK_PATH ?? builtEnv.healthcheckPath,
    featureFlags: parseJsonRecord(env.NG_APP_FEATURE_FLAGS ?? '') || builtEnv.featureFlags,
    experimentsEnabled: asBool(env.NG_APP_EXPERIMENTS_ENABLED, builtEnv.experimentsEnabled),
  };

  return resolved;
}

/**
 * PUBLIC_INTERFACE
 * Provider for the ENVIRONMENT token.
 */
export const provideEnvironment = (): Provider => ({
  provide: ENVIRONMENT,
  useFactory: environmentFactory,
});

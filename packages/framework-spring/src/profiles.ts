import { createDiagnostic, type Diagnostic } from '@modelforge/core';

export type SpringBootFamily = '3.5' | '4.1';
export interface FrameworkProfile {
  framework: 'spring-boot';
  family: SpringBootFamily;
  verifiedVersion: string;
  lastVerifiedOn: string;
  compatibility: {
    javaMin: number;
    javaMax: number;
    springFramework: string;
    servletContainer: string;
  };
  capabilities: {
    jakartaPersistence: true;
    springDataJpa: true;
    records: true;
  };
}
export interface CompatibilityResult {
  status: 'compatible' | 'warning' | 'incompatible';
  diagnostics: Diagnostic[];
}

const sharedCapabilities = {
  jakartaPersistence: true,
  springDataJpa: true,
  records: true,
} as const;
export const SPRING_BOOT_PROFILES: Readonly<
  Record<SpringBootFamily, FrameworkProfile>
> = {
  '3.5': {
    framework: 'spring-boot',
    family: '3.5',
    verifiedVersion: '3.5.16',
    lastVerifiedOn: '2026-08-27',
    compatibility: {
      javaMin: 17,
      javaMax: 25,
      springFramework: '6.2.x',
      servletContainer: 'Tomcat 10.1.x',
    },
    capabilities: sharedCapabilities,
  },
  '4.1': {
    framework: 'spring-boot',
    family: '4.1',
    verifiedVersion: '4.1.1',
    lastVerifiedOn: '2026-08-27',
    compatibility: {
      javaMin: 17,
      javaMax: 26,
      springFramework: '7.0.x',
      servletContainer: 'Tomcat 11.0.x',
    },
    capabilities: sharedCapabilities,
  },
};

export function getSpringBootProfile(
  family: SpringBootFamily,
): FrameworkProfile {
  return SPRING_BOOT_PROFILES[family];
}
export function checkSpringCompatibility(
  family: SpringBootFamily,
  javaVersion: number,
): CompatibilityResult {
  const profile = getSpringBootProfile(family);
  if (
    !Number.isInteger(javaVersion) ||
    javaVersion < profile.compatibility.javaMin ||
    javaVersion > profile.compatibility.javaMax
  ) {
    return {
      status: 'incompatible',
      diagnostics: [
        createDiagnostic({
          severity: 'error',
          code: 'INCOMPATIBLE_JAVA_VERSION',
          message: `Spring Boot ${family}.x supports Java ${profile.compatibility.javaMin} through ${profile.compatibility.javaMax}; Java ${javaVersion} was selected.`,
        }),
      ],
    };
  }
  return { status: 'compatible', diagnostics: [] };
}

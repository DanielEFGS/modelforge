import type { Diagnostic, ForgeDocument } from '@modelforge/core';

export interface JsonInferenceOptions {
  rootName?: string;
  sourceSizeWarningBytes?: number;
  sourceSizeHardLimitBytes?: number;
  maxDepth?: number;
}

export interface InferenceEvidence {
  observedCount: number;
  missingCount: number;
  nullCount: number;
}

export interface InferenceDecision {
  id: string;
  code: string;
  path: string;
  summary: string;
  result: string;
  evidence: InferenceEvidence;
}

export interface JsonInferenceSuccess {
  ok: true;
  document: ForgeDocument;
  decisions: InferenceDecision[];
}

export interface JsonInferenceFailure {
  ok: false;
  diagnostics: Diagnostic[];
  decisions: InferenceDecision[];
}

export type JsonInferenceResult = JsonInferenceSuccess | JsonInferenceFailure;

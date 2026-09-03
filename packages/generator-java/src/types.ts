export type JavaTarget = 'pojo' | 'record' | 'lombok';
export type JavaDateStyle = 'string' | 'java-time';

export interface JavaGeneratorOptions {
  target?: JavaTarget;
  packageName?: string;
  dateStyle?: JavaDateStyle;
  noArgsConstructor?: boolean;
  allArgsConstructor?: boolean;
  getters?: boolean;
  setters?: boolean;
  equalsHashCode?: boolean;
  includeToString?: boolean;
  builder?: boolean;
}

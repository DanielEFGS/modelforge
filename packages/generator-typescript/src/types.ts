export type TypeScriptDeclarationStyle = 'interface' | 'type' | 'class';
export type TypeScriptOptionalStyle = 'question-mark' | 'undefined-union';
export type TypeScriptNullableStyle = 'null' | 'undefined';
export type TypeScriptDateStyle = 'string' | 'Date';
export type TypeScriptArrayStyle = 'brackets' | 'generic';

export interface TypeScriptGeneratorOptions {
  declarationStyle?: TypeScriptDeclarationStyle;
  readonly?: boolean;
  semicolons?: boolean;
  optionalStyle?: TypeScriptOptionalStyle;
  nullableStyle?: TypeScriptNullableStyle;
  dateStyle?: TypeScriptDateStyle;
  arrayStyle?: TypeScriptArrayStyle;
  includeConstructor?: boolean;
  fileName?: string;
}

export interface ResolvedTypeScriptGeneratorOptions {
  declarationStyle: TypeScriptDeclarationStyle;
  readonly: boolean;
  semicolons: boolean;
  optionalStyle: TypeScriptOptionalStyle;
  nullableStyle: TypeScriptNullableStyle;
  dateStyle: TypeScriptDateStyle;
  arrayStyle: TypeScriptArrayStyle;
  includeConstructor: boolean;
  fileName: string;
}

export type CSharpDeclarationStyle = 'class' | 'record';
export type CSharpDateStyle = 'string' | 'dotnet';

export interface CSharpGeneratorOptions {
  declarationStyle?: CSharpDeclarationStyle;
  namespaceName?: string;
  dateStyle?: CSharpDateStyle;
  fileScopedNamespace?: boolean;
}

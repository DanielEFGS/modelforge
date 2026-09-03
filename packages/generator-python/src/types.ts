export type PythonModelStyle = 'dataclass' | 'pydantic';
export type PythonDateStyle = 'string' | 'datetime';

export interface PythonGeneratorOptions {
  modelStyle?: PythonModelStyle;
  dateStyle?: PythonDateStyle;
  fileName?: string;
  pydanticStrict?: boolean;
}

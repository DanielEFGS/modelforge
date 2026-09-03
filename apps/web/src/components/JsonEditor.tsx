import { useEffect, useRef } from 'react';
import { findJsonPropertyRanges } from '../lib/json-references';
import type { WorkspaceReference } from './ReferenceOverlay';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  dark: boolean;
  references: WorkspaceReference[];
  activeReferenceId?: string;
  onReferenceHover: (id?: string) => void;
  onReferenceSelect: (id: string) => void;
}

export function JsonEditor({
  value,
  onChange,
  ariaLabel,
  dark,
  references,
  activeReferenceId,
  onReferenceHover,
  onReferenceSelect,
}: JsonEditorProps) {
  const host = useRef<HTMLDivElement>(null);
  const editorRef = useRef<import('@codemirror/view').EditorView | undefined>(
    undefined,
  );
  const onChangeRef = useRef(onChange);
  const referencesRef = useRef(references);
  const activeReferenceIdRef = useRef(activeReferenceId);
  const hoverRef = useRef(onReferenceHover);
  const selectRef = useRef(onReferenceSelect);
  const decorationCompartmentRef = useRef<
    import('@codemirror/state').Compartment | undefined
  >(undefined);
  const decorationFactoryRef = useRef<
    | ((
        references: WorkspaceReference[],
        activeReferenceId?: string,
      ) => import('@codemirror/state').Extension)
    | undefined
  >(undefined);
  onChangeRef.current = onChange;
  referencesRef.current = references;
  activeReferenceIdRef.current = activeReferenceId;
  hoverRef.current = onReferenceHover;
  selectRef.current = onReferenceSelect;

  useEffect(() => {
    let disposed = false;
    let destroy: (() => void) | undefined;
    void Promise.all([
      import('@codemirror/state'),
      import('@codemirror/view'),
      import('@codemirror/lang-json'),
      import('@codemirror/language'),
      import('@lezer/highlight'),
    ]).then(([state, view, language, highlighting, highlight]) => {
      if (disposed || !host.current) return;
      const decorationFactory = (
        currentReferences: WorkspaceReference[],
        activeId?: string,
      ) => {
        const paths = new Map(
          currentReferences.map((reference) => [reference.path, reference]),
        );
        const buildDecorations = (
          editor: import('@codemirror/state').EditorState,
        ) => {
          const marks = findJsonPropertyRanges(editor.doc.toString()).flatMap(
            (range) => {
              const reference = paths.get(range.path);
              if (!reference) return [];
              return [
                view.Decoration.mark({
                  class: `source-reference ${reference.id === activeId ? 'active' : ''}`,
                  attributes: {
                    'data-source-reference': reference.id,
                    title: `${reference.modelName}.${reference.targetName}`,
                  },
                }).range(range.from, range.to),
              ];
            },
          );
          return view.Decoration.set(marks, true);
        };
        const decorationField = state.StateField.define({
          create: buildDecorations,
          update(decorations, transaction) {
            return transaction.docChanged
              ? buildDecorations(transaction.state)
              : decorations;
          },
          provide: (field) => view.EditorView.decorations.from(field),
        });
        return decorationField;
      };
      const compartment = new state.Compartment();
      decorationCompartmentRef.current = compartment;
      decorationFactoryRef.current = decorationFactory;
      const editor = new view.EditorView({
        parent: host.current,
        state: state.EditorState.create({
          doc: value,
          extensions: [
            language.json(),
            highlighting.syntaxHighlighting(
              highlighting.HighlightStyle.define([
                {
                  tag: highlight.tags.propertyName,
                  color: 'var(--syntax-property)',
                  fontWeight: '650',
                },
                {
                  tag: highlight.tags.string,
                  color: 'var(--syntax-string)',
                },
                {
                  tag: highlight.tags.number,
                  color: 'var(--syntax-number)',
                },
                {
                  tag: [highlight.tags.bool, highlight.tags.null],
                  color: 'var(--syntax-literal)',
                  fontWeight: '650',
                },
                {
                  tag: highlight.tags.bracket,
                  color: 'var(--syntax-bracket)',
                  fontWeight: '700',
                },
                {
                  tag: highlight.tags.punctuation,
                  color: 'var(--syntax-punctuation)',
                },
              ]),
            ),
            view.EditorView.lineWrapping,
            view.EditorView.contentAttributes.of({
              'aria-label': ariaLabel,
            }),
            view.EditorView.domEventHandlers({
              mouseover(event) {
                const target = (
                  event.target as HTMLElement
                ).closest<HTMLElement>('[data-source-reference]');
                hoverRef.current(target?.dataset.sourceReference);
              },
              mouseout(event) {
                const current = (
                  event.target as HTMLElement
                ).closest<HTMLElement>('[data-source-reference]');
                const related = (
                  event.relatedTarget as HTMLElement | null
                )?.closest?.('[data-source-reference]');
                if (current !== related) hoverRef.current(undefined);
              },
              click(event) {
                const target = (
                  event.target as HTMLElement
                ).closest<HTMLElement>('[data-source-reference]');
                const id = target?.dataset.sourceReference;
                if (id) selectRef.current(id);
              },
            }),
            view.EditorView.updateListener.of((update) => {
              if (update.docChanged)
                onChangeRef.current(update.state.doc.toString());
            }),
            compartment.of(
              decorationFactory(
                referencesRef.current,
                activeReferenceIdRef.current,
              ),
            ),
          ],
        }),
      });
      editorRef.current = editor;
      destroy = () => editor.destroy();
    });
    return () => {
      disposed = true;
      editorRef.current = undefined;
      decorationCompartmentRef.current = undefined;
      decorationFactoryRef.current = undefined;
      destroy?.();
    };
  }, [ariaLabel, dark]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor && editor.state.doc.toString() !== value) {
      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: value },
      });
    }
  }, [value]);

  useEffect(() => {
    const editor = editorRef.current;
    const compartment = decorationCompartmentRef.current;
    const factory = decorationFactoryRef.current;
    if (editor && compartment && factory) {
      editor.dispatch({
        effects: compartment.reconfigure(
          factory(references, activeReferenceId),
        ),
      });
    }
  }, [references, activeReferenceId]);

  return <div className="code-editor" ref={host} />;
}

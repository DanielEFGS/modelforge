import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  clampToVerticalRail,
  type VerticalRail,
} from '../lib/reference-geometry';

export interface WorkspaceReference {
  id: string;
  path: string;
  sourceName: string;
  targetName: string;
  modelName: string;
}

interface RouteGeometry {
  id: string;
  source: { x: number; y: number };
  modelLeft: { x: number; y: number };
  modelRight: { x: number; y: number };
  output: { x: number; y: number };
}

interface ReferenceOverlayProps {
  container: HTMLElement | null;
  references: WorkspaceReference[];
  activeReferenceId?: string;
  showAll: boolean;
  revision: string;
}

function routePath(
  start: { x: number; y: number },
  end: { x: number; y: number },
): string {
  const bend = Math.max(16, Math.abs(end.x - start.x) * 0.46);
  return `M ${start.x} ${start.y} C ${start.x + bend} ${start.y}, ${end.x - bend} ${end.y}, ${end.x} ${end.y}`;
}

function visibleElement(elements: Element[]): HTMLElement | undefined {
  return elements.find((element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }) as HTMLElement | undefined;
}

function verticalRail(
  viewport: Element,
  containerBounds: DOMRect,
  inset = 8,
): VerticalRail {
  const bounds = viewport.getBoundingClientRect();
  const top = bounds.top - containerBounds.top + inset;
  const bottom = bounds.bottom - containerBounds.top - inset;
  return { top, bottom: Math.max(top, bottom) };
}

export function ReferenceOverlay({
  container,
  references,
  activeReferenceId,
  showAll,
  revision,
}: ReferenceOverlayProps) {
  const [geometry, setGeometry] = useState<RouteGeometry[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!container) return;
    let frame = 0;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = container.getBoundingClientRect();
        const sourcePanel = container.querySelector('.source-panel');
        const modelPanel = container.querySelector('.model-panel');
        const outputPanel = container.querySelector('.output-panel');
        if (!sourcePanel || !modelPanel || !outputPanel) return;
        const sourceBounds = sourcePanel.getBoundingClientRect();
        const outputBounds = outputPanel.getBoundingClientRect();
        const sourceViewport =
          sourcePanel.querySelector('.code-editor') ?? sourcePanel;
        const modelViewport =
          modelPanel.querySelector('.model-scroll') ?? modelPanel;
        const outputViewport =
          outputPanel.querySelector('.output-code') ?? outputPanel;
        const sourceRail = verticalRail(sourceViewport, bounds);
        const modelRail = verticalRail(modelViewport, bounds);
        const outputRail = verticalRail(outputViewport, bounds);
        const next = references.flatMap((reference): RouteGeometry[] => {
          const row = container.querySelector<HTMLElement>(
            `[data-reference-row="${reference.id}"]`,
          );
          if (!row || row.offsetParent === null) return [];
          const rowBounds = row.getBoundingClientRect();
          const sourceToken = visibleElement([
            ...container.querySelectorAll(
              `[data-source-reference="${reference.id}"]`,
            ),
          ]);
          const outputToken = visibleElement([
            ...container.querySelectorAll(
              `[data-output-reference="${reference.id}"]`,
            ),
          ]);
          const sourceTokenBounds = sourceToken?.getBoundingClientRect();
          const outputTokenBounds = outputToken?.getBoundingClientRect();
          const rowY = rowBounds.top - bounds.top + rowBounds.height / 2;
          const sourceY = sourceTokenBounds
            ? sourceTokenBounds.top - bounds.top + sourceTokenBounds.height / 2
            : rowY;
          const outputY = outputTokenBounds
            ? outputTokenBounds.top - bounds.top + outputTokenBounds.height / 2
            : rowY;
          const modelY = clampToVerticalRail(rowY, modelRail);
          return [
            {
              id: reference.id,
              source: {
                x: sourceBounds.right - bounds.left,
                y: clampToVerticalRail(sourceY, sourceRail),
              },
              modelLeft: {
                x: rowBounds.left - bounds.left,
                y: modelY,
              },
              modelRight: {
                x: rowBounds.right - bounds.left,
                y: modelY,
              },
              output: {
                x: outputBounds.left - bounds.left,
                y: clampToVerticalRail(outputY, outputRail),
              },
            },
          ];
        });
        setSize({ width: bounds.width, height: bounds.height });
        setGeometry(next);
        if (next.length === 0 && attempts < 20) {
          attempts += 1;
          retry = globalThis.setTimeout(measure, 50);
        }
      });
    };

    measure();
    const observer =
      typeof ResizeObserver === 'undefined'
        ? undefined
        : new ResizeObserver(measure);
    observer?.observe(container);
    container.addEventListener('scroll', measure, true);
    globalThis.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(frame);
      if (retry) globalThis.clearTimeout(retry);
      observer?.disconnect();
      container.removeEventListener('scroll', measure, true);
      globalThis.removeEventListener('resize', measure);
    };
  }, [container, references, revision]);

  useEffect(() => {
    const id = globalThis.setTimeout(() => {
      globalThis.dispatchEvent(new Event('resize'));
    }, 80);
    return () => globalThis.clearTimeout(id);
  }, [activeReferenceId, showAll]);

  if (!size.width || !size.height) return null;

  return (
    <svg
      className="reference-overlay"
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {geometry.map((route, index) => {
        const active = route.id === activeReferenceId;
        const visible = showAll || active;
        return (
          <g
            key={route.id}
            className={`reference-route ${visible ? 'is-visible' : 'is-hidden'} ${active ? 'active' : ''}`}
            style={
              {
                '--route-order': Math.min(index, 5),
              } as CSSProperties
            }
          >
            <path
              className="reference-route-source"
              pathLength="1"
              d={routePath(route.source, route.modelLeft)}
            />
            <path
              className="reference-route-output"
              pathLength="1"
              d={routePath(route.modelRight, route.output)}
            />
            <circle
              data-route-anchor="source"
              cx={route.source.x}
              cy={route.source.y}
              r="3"
            />
            <circle
              data-route-anchor="model-left"
              cx={route.modelLeft.x}
              cy={route.modelLeft.y}
              r="3"
            />
            <circle
              data-route-anchor="model-right"
              cx={route.modelRight.x}
              cy={route.modelRight.y}
              r="3"
            />
            <circle
              data-route-anchor="output"
              cx={route.output.x}
              cy={route.output.y}
              r="3"
            />
          </g>
        );
      })}
    </svg>
  );
}

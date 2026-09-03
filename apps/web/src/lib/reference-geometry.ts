export interface VerticalRail {
  top: number;
  bottom: number;
}

export function clampToVerticalRail(y: number, rail: VerticalRail): number {
  return Math.min(rail.bottom, Math.max(rail.top, y));
}

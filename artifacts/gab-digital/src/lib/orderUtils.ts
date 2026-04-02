/**
 * Reorder utilities — shift-based sequential ordering with no gaps.
 *
 * Algorithm:
 *  1. Sort items by current order
 *  2. Remove the changed item
 *  3. Clamp newOrder to [1, total count]
 *  4. Re-insert the item at the target position
 *  5. Reassign order values 1, 2, 3 … n
 */

export function reindexItems<T extends { id: number; order: number }>(
  items: T[],
  movedId: number,
  newOrder: number
): T[] {
  if (items.length === 0) return items;
  const clamped = Math.max(1, Math.min(newOrder, items.length));
  const sorted = [...items].sort((a, b) => a.order - b.order);
  const movedItem = sorted.find(i => i.id === movedId);
  if (!movedItem) return items;
  const without = sorted.filter(i => i.id !== movedId);
  const insertIdx = Math.min(clamped - 1, without.length);
  without.splice(insertIdx, 0, movedItem);
  return without.map((item, idx) => ({ ...item, order: idx + 1 }));
}

export function reindexAfterDelete<T extends { order: number }>(items: T[]): T[] {
  return [...items]
    .sort((a, b) => a.order - b.order)
    .map((item, idx) => ({ ...item, order: idx + 1 }));
}

export function getNextOrder<T extends { order: number }>(items: T[]): number {
  return items.length === 0 ? 1 : Math.max(...items.map(i => i.order)) + 1;
}

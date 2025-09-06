import { useMemo } from 'react';

export const useMemoizedValue = <T>(value: T, deps: any[] = []) => {
  return useMemo(() => value, deps);
};

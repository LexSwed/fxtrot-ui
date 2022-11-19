import { vars } from '../style.css';
import { scales } from '../theme';

export const gaps = createScale('gap');
export const rowGaps = createScale('rowGap');
export const columnGaps = createScale('columnGap');

type Scales = keyof typeof scales;

// intentionally do not use CssKeys
function createScale<T extends 'gap' | 'rowGap' | 'columnGap'>(property: T) {
  return Object.keys(scales).reduce((res, key) => {
    // @ts-expect-error
    res[key] = {
      // @ts-expect-error
      [property]: vars['scales'][key],
    };
    return res;
    // eslint-disable-next-line no-unused-vars
  }, {} as { [scale in Scales]: string }); // Exclude<Sprinkles[T], undefined>[scale]
}

export type TextStyle =
  | 'body-sm'
  | 'body-md'
  | 'body-lg'
  | 'label'
  | 'title-sm'
  | 'title-md'
  | 'title-lg'
  | 'headline'
  | 'overline'
  | 'mono';

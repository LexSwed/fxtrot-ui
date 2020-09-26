export const scales = {
  $0: '0px',
  $1: '4px',
  $2: '8px',
  $3: '12px',
  $4: '16px',
  $5: '20px',
  $6: '24px',
  $8: '32px',
  $10: '40px',
  $12: '48px',
  $16: '64px',
  $20: '80px',
  $24: '96px',
  $32: '128px',
  $40: '160px',
  $48: '192px',
  $56: '224px',
  $64: '256px',
};

export const namedMap = {
  'none': '$0',
  'xs': '$1',
  'sm': '$2',
  'md': '$6',
  'base': '$6',
  'lg': '$8',
  'xl': '$10',
  '2xl': '$16',
};

export const gaps = new Proxy(Object.assign({}, scales, namedMap), {
  get(target, key: Scale, receiver) {
    if (key in scales) {
      return {
        gap: key,
      };
    } else if (key in namedMap) {
      return {
        gap: namedMap[key as keyof typeof namedMap],
      };
    }

    return Reflect.get(target, key, receiver);
  },
});

export type Size = keyof typeof scales;
export type Scale = Size | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'none';

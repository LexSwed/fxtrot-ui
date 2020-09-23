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

export const gaps: { [T in Scale]: { gap: Size } } = {
  'none': {
    gap: '$0',
  },
  'xs': {
    gap: '$1',
  },
  'sm': {
    gap: '$2',
  },
  'md': {
    gap: '$6',
  },
  'base': {
    gap: '$6',
  },
  'lg': {
    gap: '$8',
  },
  'xl': {
    gap: '$10',
  },
  '2xl': {
    gap: '$16',
  },
};

export type Scale = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
export type Size = keyof typeof scales;

import { Playable, Position } from '../service/api';

// TODO: i18n

/** Position names */
export const PositionLabel = {
  [Position.AMF]: 'AMF',
  [Position.CB]: 'CB',
  [Position.CF]: 'CF',
  [Position.CMF]: 'CMF',
  [Position.DMF]: 'DMF',
  [Position.GK]: 'GK',
  [Position.LB]: 'LB',
  [Position.LMF]: 'LMF',
  [Position.LWF]: 'LWF',
  [Position.RB]: 'RB',
  [Position.RMF]: 'RMF',
  [Position.RWF]: 'RWF',
  [Position.SS]: 'SS'
};

/** Sorted position list, for use in comparison tables. */
export const POSITION_LIST: Array<Position> = [
  Position.CF,
  Position.SS,
  Position.RWF,
  Position.LWF,
  Position.AMF,
  Position.RMF,
  Position.LMF,
  Position.CMF,
  Position.DMF,
  Position.RB,
  Position.LB,
  Position.CB,
  Position.GK
];

export const PlayableLabel = {
  [Playable.A]: 'A',
  [Playable.B]: 'B',
  [Playable.C]: 'C'
};

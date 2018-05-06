import Divider from 'material-ui/Divider';
import { ListItemText, ListSubheader } from 'material-ui/List';
import * as React from 'react';
import { pure } from 'recompose';

import { POSITION_LIST, PositionLabel } from '../../shared/utils/position';
import { Column, Label, PlayerHeader } from './styles';

const SINGLE_STATS = [
  'Age',
  'Nationality',
  'Height',
  'Weight',
  'Foot',
  'Position',
  'Playing Style',
  'OVR',
  'Total stats',
  'Attacking Prowess',
  'Ball Control',
  'Dribbling',
  'Low Pass',
  'Lofted Pass',
  'Finishing',
  'Set Piece Taking',
  'Curve',
  'Header',
  'Defensive Prowess',
  'Ball Winning',
  'Kicking Power',
  'Speed',
  'Explosive Power',
  'Body Control',
  'Physical Contact',
  'Jump',
  'Goalkeeping',
  'Catching',
  'Clearing',
  'Reflexes',
  'Coverage',
  'Stamina',
  'NonDom Leg Usage',
  'NonDom Leg Prec.',
  'Condition',
  'Injury Resistance',
  'Positions'
];

export const ComparePlayersLabelColumn = pure(() => (
  <Column>
    <ListSubheader>&nbsp;</ListSubheader>
    <Divider />
    <PlayerHeader>
      <ListItemText primary={'Player'} />
    </PlayerHeader>
    {SINGLE_STATS.map(skill => (
      <div key={skill}>
        <Divider />
        <Label>
          <ListItemText primary={skill} />
        </Label>
      </div>
    ))}
    {POSITION_LIST.map(pos => (
      <div key={pos}>
        <Divider />
        <Label>
          <ListItemText primary={PositionLabel[pos]} />
        </Label>
      </div>
    ))}
  </Column>
));

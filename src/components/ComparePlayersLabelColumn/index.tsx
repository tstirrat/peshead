import { Divider, ListItemText, ListSubheader } from 'material-ui';
import List from 'material-ui/List';
import * as React from 'react';
import { pure } from 'recompose';

import { POSITION_LIST, PositionLabel } from '../../shared/utils/position';
import { Label } from './styles';

const SINGLE_STATS = [
  'Age',
  'Height',
  'Weight',
  'Position',
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
  <List className="ComparePlayersLabelColumn">
    <ListSubheader>Stats</ListSubheader>
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
  </List>
));

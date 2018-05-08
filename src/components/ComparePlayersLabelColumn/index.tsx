import Divider from 'material-ui/Divider';
import { ListItemText, ListSubheader } from 'material-ui/List';
import * as React from 'react';
import * as Sticky from 'react-stickynode';
import { pure } from 'recompose';

import { Column, Label, PlayerHeaderLabel } from '../../containers/ComparePlayers/styles';
import { POSITION_LIST, PositionLabel } from '../../shared/utils/position';

const SINGLE_STATS = [
  'Age',
  'Nationality',
  'Height',
  'Weight',
  'Foot',
  'Position',
  'Playing Style',
  'Level',
  'Arrow',
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
  'Form',
  'Injury Resistance',
  'Positions'
];

export const ComparePlayersLabelColumn = pure(() => (
  <Column>
    <ListSubheader>&nbsp;</ListSubheader>
    <Divider />

    <Sticky top={'.sticky-header'} innerZ="99">
      <PlayerHeaderLabel>
        <ListItemText primary={'Player'} />
      </PlayerHeaderLabel>
      <Divider />
    </Sticky>

    {SINGLE_STATS.map(skill => (
      <div key={skill}>
        <Label>
          <ListItemText primary={skill} />
        </Label>
        <Divider />
      </div>
    ))}
    {POSITION_LIST.map(pos => (
      <div key={pos}>
        <Label>
          <ListItemText primary={PositionLabel[pos]} />
        </Label>
        <Divider />
      </div>
    ))}
  </Column>
));

import './ComparePlayersLabelColumn.css';

import { Divider, ListItemText, ListSubheader } from 'material-ui';
import List, { ListItem } from 'material-ui/List';
import * as React from 'react';

export function ComparePlayersLabelColumn() {
  const skills = [
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
    'Injury Resistance'
  ].map(skill => (
    <div>
      <Divider />
      <ListItem>
        <ListItemText primary={skill} />
      </ListItem>
    </div>
  ));

  return (
    <List className="ComparePlayersLabelColumn">
      <ListSubheader>Stats</ListSubheader>
      {skills}
    </List>
  );
}

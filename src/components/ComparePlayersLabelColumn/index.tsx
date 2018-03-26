import { Divider, ListItemText, ListSubheader } from 'material-ui';
import List, { ListItem } from 'material-ui/List';
import * as React from 'react';
import styled from 'styled-components';

const Label = styled(ListItem)`
  > div {
    overflow: hidden;
    padding-right: 0;
  }

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 0;
  }
`;

export function ComparePlayersLabelColumn() {
  const skills = [
    'Age',
    'Height',
    'Weight',
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
    'Injury Resistance'
  ].map(skill => (
    <div key={skill}>
      <Divider />
      <Label>
        <ListItemText primary={skill} />
      </Label>
    </div>
  ));

  return (
    <List className="ComparePlayersLabelColumn">
      <ListSubheader>Stats</ListSubheader>
      {skills}
    </List>
  );
}

import * as React from 'react';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { CardContent } from 'material-ui/Card';
import { PlayerAbilities } from '../../components/PlayerAbilities';
import { PlayerBasics } from '../../components/PlayerBasics';
import { base } from '../../__test__/fixtures';

export class Player extends React.Component {
  render() {
    return (
      <Grid container={true} spacing={24}>
        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography type="title">Basics</Typography>
            </CardContent>
            <PlayerBasics player={base} />
          </Card>
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography type="title">Abilities</Typography>
            </CardContent>
            <PlayerAbilities player={base} />
          </Card>
        </Grid>
      </Grid>
    );
  }
}

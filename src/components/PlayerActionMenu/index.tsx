import MoreVertIcon from 'material-ui-icons/MoreVert';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import * as React from 'react';
import { Link } from 'redux-little-router';

import { Player } from '../../shared/service/api';

export interface Props {
  player: Player;
}

interface State {
  anchorEl?: HTMLElement;
}

export class PlayerActionMenu extends React.PureComponent<Props, State> {
  state: State = {};

  render() {
    const { player } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className="actions">
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'player-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="player-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onRequestClose={this.handleClose}
        >
          <MenuItem>
            <Link href={`/players/compare/${player.id}`}>Compare</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: undefined });
  };
}

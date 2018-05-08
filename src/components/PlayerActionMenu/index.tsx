import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import * as React from 'react';
import { Trans } from 'react-i18next';

export interface Props {
  onCompare: () => void;
}

interface State {
  anchorEl?: HTMLElement;
}

export class PlayerActionMenu extends React.PureComponent<Props, State> {
  state: State = {};

  render() {
    const { anchorEl } = this.state;
    return (
      <div className="actions">
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'player-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          id="player-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.props.onCompare}>
            <Trans>Compare</Trans>
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

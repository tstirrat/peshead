import Grid from 'material-ui/Grid';
import styled from 'styled-components';

export const PlayerHeader = styled(Grid).attrs({
  item: true,
  xs: 12
})`
  padding-bottom: 0 !important;
  margin-bottom: -12px !important; /* to overcome the fixed padding on grids */
`;

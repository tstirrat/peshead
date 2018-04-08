import styled from 'styled-components';

export const Wrapper = styled.div`
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  flex-direction: row;
  align-items: center;

  .image {
    max-height: 64px;
  }

  .details {
    display: flex;
    flex-direction: column;
  }
`;

import styled from 'styled-components';

const StyledIdentifier = styled.div`
  align-items: flex-center;
  display: flex;
  flex: ${(props) => props.size};
  justify-content: flex-end;
  margin: 0;
  padding: 0;
`;

export default StyledIdentifier;
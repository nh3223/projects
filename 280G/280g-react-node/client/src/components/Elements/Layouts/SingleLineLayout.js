import styled from 'styled-components';

const SingleLineLayout = styled.div`
  align-items: flex-start;
  display: flex;
  flex: ${(props) => props.size};
  justify-content: flex-start;
  margin: 0;
  padding: 0;
  width: ${(props) => props.width};
`;

export default SingleLineLayout;
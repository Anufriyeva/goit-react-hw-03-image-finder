import styled from 'styled-components';

export const LoadMoreButton = styled.button`
  display: ${(props) => (props.ishidden ? 'none' : 'block')};
`;
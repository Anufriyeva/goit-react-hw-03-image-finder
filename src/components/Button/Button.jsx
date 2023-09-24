import React from 'react';
import { LoadMoreButton } from './Button.styled';

const Button = ({ onClick, ishidden }) => (
  <LoadMoreButton type="button" onClick={onClick} ishidden={ishidden}>
    Load more
  </LoadMoreButton>
);

export default Button;
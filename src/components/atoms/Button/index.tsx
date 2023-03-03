import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Wrapper = styled.button`
  display: flex;
  background: none;
  color: inherit;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <Wrapper onClick={onClick}>{children}</Wrapper>
);

export default Button;

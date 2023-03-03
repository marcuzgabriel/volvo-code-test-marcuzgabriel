import React from 'react';
import styled from 'styled-components';

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Wrapper = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

const Link: React.FC<LinkProps> = ({ href, children }) => <Wrapper href={href}>{children}</Wrapper>;

export default Link;

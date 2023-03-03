import React from 'react';
import { Dimensions } from 'react-native';
import { Block } from 'vcc-ui';
import styled, { useTheme } from 'styled-components';

const WINDOW_WIDTH = Dimensions.get('window').width;
const PADDING = 32;

interface PageProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: fixed;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Page: React.FC<PageProps> = ({ children }) => {
  const { breakpoint } = useTheme();

  return (
    <Wrapper>
      <Block
        extend={{
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          padding: PADDING,
          maxWidth: breakpoint.size['large'],
          untilM: {
            width: WINDOW_WIDTH - PADDING * 2,
          },
          fromM: {
            width: '100%',
          },
        }}
      >
        {children}
      </Block>
    </Wrapper>
  );
};

export default Page;

import React from 'react';
import { Flex, Block, Spacer } from 'vcc-ui';
import { Button } from '@volvo/ui/components/atoms';
import ChevronCircled from '@volvo/ui/assets/chevron-circled.svg';

const ROTATION = 180;
const ICON_DIMENSIONS = 35;

interface SliderActionsProps {
  handleOnPress: (isNext?: boolean) => void;
}

const SliderActions: React.FC<SliderActionsProps> = ({ handleOnPress }) => {
  return (
    <Flex
      extend={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex
        extend={{
          width: '100%',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Flex extend={{ flex: 1 }} />
        <Block extend={{ display: 'flex', transform: `rotate(${ROTATION}deg)` }}>
          <Button onClick={() => handleOnPress()}>
            <ChevronCircled height={ICON_DIMENSIONS} width={ICON_DIMENSIONS} />
          </Button>
        </Block>
        <Spacer size={0.85} />
        <Button onClick={() => handleOnPress(true)}>
          <ChevronCircled height={ICON_DIMENSIONS} width={ICON_DIMENSIONS} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default SliderActions;

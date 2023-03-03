import React, { Fragment } from 'react';
import styled from 'styled-components';
import Animated, { useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { Flex, Spacer } from 'vcc-ui';
import { Button } from '@volvo/ui/components/atoms';
import cars from '@volvo/api/cars.json';

const HEIGHT = 15;
const WIDTH = 15;

interface SliderDotsProps {
  carsData: typeof cars;
  currentItemVisible: Animated.SharedValue<number>;
  handleOnPress: (isNext?: boolean, i?: number) => void;
}

const Dot = styled.div<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.primitive.black : theme.color.primitive.grey300};
  border-radius: 50%;
  width: ${HEIGHT}px;
  height: ${WIDTH}px;
`;

const SliderDots: React.FC<SliderDotsProps> = ({ handleOnPress, carsData, currentItemVisible }) => {
  const [currentSelectedDot, setCurrentSelectedDot] = React.useState(0);

  /* NOTE: Listen to pan changes in order to update the current selected dot */
  useAnimatedReaction(
    () => currentItemVisible,
    () => {
      runOnJS(setCurrentSelectedDot)(currentItemVisible.value);
    },
    [currentItemVisible],
  );

  return (
    <Flex
      extend={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
      }}
    >
      {carsData?.map(({ bodyType }, i) => (
        <Fragment key={`${bodyType}_${i}`}>
          <Button
            onClick={() => {
              handleOnPress(false, i);
              setCurrentSelectedDot(i);
            }}
          >
            <Dot isSelected={i === currentSelectedDot} />
          </Button>
          <Spacer size={1.5} />
        </Fragment>
      ))}
    </Flex>
  );
};

export default SliderDots;

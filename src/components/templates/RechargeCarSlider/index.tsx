import React, { useState, useCallback, Fragment, useEffect } from 'react';
import { Spacer, Block, Text, View } from 'vcc-ui';
import Animated, { useSharedValue } from 'react-native-reanimated';
import styled from 'styled-components';
import cars from '@volvo/api/cars.json';
import { Card, SliderActions, FilterBar, SliderDots } from '@volvo/ui/components/molecules';
import { CardGesture, Appearance } from '@volvo/ui/components/organisms';
import { Page } from '@volvo/ui/components/templates';

const CARD_SPACING = 32;
const MARGIN_TOP = 16;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  width: 100%;
  cursor: pointer;
  max-width: ${({ theme }) => theme.breakpoint.size['large']}px;
`;

const RechargeCarSlider: React.FC = () => {
  const [carsData, setCarsData] = useState<typeof cars | []>([]);
  const [filterValue, setFilterValue] = useState<string | undefined>();
  const translationX = useSharedValue(0);
  const currentItemVisible = useSharedValue(0);
  const updateCurrentVisibleItem = useSharedValue(0);
  const currentNumberOfTabs = useSharedValue(0);
  const cardWidth = useSharedValue(0);
  const numberOfLearnTabs = useSharedValue(0);
  const numberOfShopTabs = useSharedValue(0);

  /* NOTE: Accessibility - enable the possibility to 
  tab through the cars */
  const checkTabPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const isGoingBackwards = e.shiftKey && e.key === 'Tab';

        currentNumberOfTabs.value = isGoingBackwards
          ? currentNumberOfTabs.value - 1
          : currentNumberOfTabs.value + 1;
        const text = document.activeElement?.textContent;
        const isTextEqualLearn = text?.toLowerCase() === 'learn';
        const isTextEqualShop = text?.toLowerCase() === 'shop';

        if (isTextEqualLearn) {
          numberOfLearnTabs.value = isGoingBackwards
            ? numberOfLearnTabs.value - 1
            : numberOfLearnTabs.value + 1;
        }

        if (isTextEqualShop) {
          numberOfShopTabs.value = isGoingBackwards
            ? numberOfShopTabs.value - 1
            : numberOfShopTabs.value + 1;
        }

        if (numberOfLearnTabs.value > 1 && isTextEqualLearn && !isGoingBackwards) {
          updateCurrentVisibleItem.value = currentItemVisible.value + 1;
        } else if (isTextEqualShop && isGoingBackwards) {
          updateCurrentVisibleItem.value = currentItemVisible.value - 1;
        }
      }
    },
    [currentNumberOfTabs, numberOfLearnTabs],
  );

  useEffect(() => {
    document.addEventListener('keyup', checkTabPress);
    return () => {
      document.removeEventListener('keyup', checkTabPress);
    };
  });

  const handleOnPress = useCallback(
    (isNext?: boolean, index?: number) => {
      if (typeof index === 'number') {
        updateCurrentVisibleItem.value = index;
      } else {
        updateCurrentVisibleItem.value = isNext
          ? currentItemVisible.value + 1 !== carsData.length
            ? currentItemVisible.value + 1
            : currentItemVisible.value
          : currentItemVisible.value - 1 === 0
          ? 0
          : currentItemVisible.value - 1;
      }
    },
    [carsData.length, currentItemVisible.value, updateCurrentVisibleItem, currentNumberOfTabs],
  );

  const onChange = useCallback(
    (e: any) => {
      translationX.value = 0;
      currentItemVisible.value = 0;
      setFilterValue(e.target.value);
      setCarsData(
        cars.filter(({ bodyType }: any) =>
          bodyType.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    },
    [currentItemVisible, translationX],
  );

  /* NOTE: The product owner is telling you that you can generate the links to the
  learn and shop pages of each car by concatating the id of the car to the learn
  (/learn/) and shop (/shop/) urls. */
  useEffect(() => {
    if (carsData.length === 0) {
      setCarsData(
        cars.map(car => ({
          ...car,
          links: {
            learn: `/learn/${car.id}`,
            shop: `/shop/${car.id}`,
          },
        })),
      );
    }
  }, [carsData.length]);

  return (
    <Page>
      <FilterBar value={filterValue ?? ''} onChange={onChange} />
      {carsData?.length > 0 ? (
        <>
          <Container>
            <CardGesture
              cardWidth={cardWidth}
              translationX={translationX}
              currentItemVisible={currentItemVisible}
              updateCurrentVisibleItem={updateCurrentVisibleItem}
            >
              {carsData?.map((carProps, i) => (
                <Fragment key={`${carProps.bodyType}_${i}`}>
                  {i > 0 && <Spacer size={4} />}
                  <Animated.View
                    style={{ flex: 1 }}
                    onLayout={(e: any) => {
                      cardWidth.value = e.nativeEvent.layout.width + CARD_SPACING;
                    }}
                  >
                    <Appearance delay={i * 100}>
                      <Card {...carProps} />
                    </Appearance>
                  </Animated.View>
                </Fragment>
              ))}
            </CardGesture>
          </Container>
          <View extend={{ untilM: { display: 'block' }, fromM: { display: 'none' } }}>
            <SliderDots
              handleOnPress={handleOnPress}
              carsData={carsData}
              currentItemVisible={currentItemVisible}
            />
          </View>
          <View extend={{ untilM: { display: 'none' }, fromM: { display: 'block' } }}>
            <SliderActions handleOnPress={handleOnPress} />
          </View>
        </>
      ) : (
        <Block extend={{ textAlign: 'center' }}>
          <Text variant="hillary" subStyle="emphasis" extend={{ marginTop: MARGIN_TOP }}>
            To bad - no results for you!
          </Text>
        </Block>
      )}
    </Page>
  );
};

export default RechargeCarSlider;

import React from 'react';
import { useTheme } from 'styled-components';
import { Flex, Text, Spacer } from 'vcc-ui';
import { Link } from '@volvo/ui/components/atoms';
import ChevronSmallSvg from '@volvo/ui/assets/chevron-small.svg';

const ICON_DIMENSIONS = 12;

interface CardActionsProps {
  id: string;
  links?: {
    shop: string;
    learn: string;
  };
}

const CardActions: React.FC<CardActionsProps> = ({ id, links }) => {
  const { color } = useTheme();

  return (
    <>
      <Spacer size={4} />
      <Flex
        extend={{ flex: 1, flexDirection: 'row', justifyContent: 'center', textAlign: 'center' }}
      >
        <Flex extend={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text extend={{ color: color.brand.primary }}>
            <Link href={links?.learn ?? ''}>LEARN</Link>
          </Text>
          <Spacer size={1} />
          <ChevronSmallSvg height={ICON_DIMENSIONS} width={ICON_DIMENSIONS} />
        </Flex>
        <Spacer size={2} />
        <Flex extend={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text extend={{ color: color.brand.primary }}>
            <Link href={links?.shop ?? ''}>SHOP</Link>
          </Text>
          <Spacer size={1} />
          <ChevronSmallSvg height={ICON_DIMENSIONS} width={ICON_DIMENSIONS} />
        </Flex>
      </Flex>
      <Spacer size={4} />
    </>
  );
};

export default CardActions;

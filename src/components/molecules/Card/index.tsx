import React from 'react';
import Image from 'next/image';
import { useTheme } from 'styled-components';
import { Text, Block, Flex, Spacer } from 'vcc-ui';
import { CardActions } from '@volvo/ui/components/molecules';

const RATIO = 3;
const ORIGINAL_IMAGE_WIDTH = 800;
const ORIGINAL_IMAGE_HEIGHT = 600;
const MARGIN_LEFT = 4;
const CARD_AND_IMAGE_HEIGHT = ORIGINAL_IMAGE_HEIGHT / RATIO;
export const CARD_AND_IMAGE_WIDTH = ORIGINAL_IMAGE_WIDTH / RATIO;

interface CardProps {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
  links?: {
    shop: string;
    learn: string;
  };
}

const Card: React.FC<CardProps> = ({ id, bodyType, modelName, modelType, imageUrl, links }) => {
  const theme = useTheme();
  const { color } = theme;

  return (
    <Block>
      <Flex extend={{ flex: 1, flexDirection: 'column' }}>
        <Text variant="bates" subStyle="emphasis" extend={{ color: color.primitive.grey200 }}>
          {bodyType}
        </Text>
        <Flex
          extend={{
            flex: 1,
            untilM: { flexDirection: 'column' },
            fromM: { flexDirection: 'row' },
          }}
        >
          <Text subStyle="emphasis">{modelName}</Text>
          <Text
            subStyle="standard"
            extend={{
              color: color.primitive.grey200,
              untilM: { marginLeft: 0 },
              fromM: { marginLeft: MARGIN_LEFT },
            }}
          >
            {modelType}
          </Text>
        </Flex>
        <Spacer size={2} />
        <div
          style={{
            position: 'relative',
            width: CARD_AND_IMAGE_WIDTH,
            height: CARD_AND_IMAGE_HEIGHT,
          }}
        >
          <Image
            priority
            src={imageUrl}
            fill
            style={{
              pointerEvents: 'none',
              objectFit: 'contain',
            }}
            alt={modelType}
          />
        </div>
        <CardActions id={id} links={links} />
      </Flex>
    </Block>
  );
};

export default Card;

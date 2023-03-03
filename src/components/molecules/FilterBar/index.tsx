import React from 'react';
import { useTheme } from 'styled-components';
import { TextInput, Text, Flex } from 'vcc-ui';

const MARGIN_BOTTOM = 16;
const MARGIN_BOTTOM_BIG = 50;
const MARGIN_TOP = 6;

interface FilterBarProps {
  value: string;
  onChange: (e: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ value, onChange }) => {
  const { color } = useTheme();

  return (
    <Flex extend={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="yang" subStyle="emphasis" extend={{ textAlign: 'center' }}>
        Filter your dreamcar!
      </Text>
      <Text
        subStyle="standard"
        extend={{
          textAlign: 'center',
          marginTop: MARGIN_TOP,
          marginBottom: MARGIN_BOTTOM_BIG,
          color: color.primitive.grey200,
        }}
      >
        Best of two worlds! React and React native. Slide your car into view with your mouse.
      </Text>
      <Flex extend={{ flexDirection: 'row', marginBottom: MARGIN_BOTTOM }}>
        <TextInput
          value={value}
          label="Filter by body type"
          title="Search"
          aria-label="Search"
          onChange={onChange}
        />
      </Flex>
    </Flex>
  );
};

export default FilterBar;

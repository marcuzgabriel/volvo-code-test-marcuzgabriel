import React, { useState, useEffect } from 'react';
import { withRouter, useRouter } from 'next/router';
import { Text } from 'vcc-ui';
import { Page } from '@volvo/ui/components/templates';
import cars from '@volvo/api/cars.json';

const MARGIN_BOTTOM = 16;

const Learn: React.FC = () => {
  const [carData, setCarData] = useState<undefined | Record<string, any>>({});
  const { query } = useRouter();
  const { slug } = query;

  useEffect(() => {
    if (Object.keys(carData ?? {}).length === 0) {
      setCarData(cars.find(({ id }) => id === slug));
    }
  }, [carData, slug]);

  return (
    <Page>
      <Text
        variant="yang"
        subStyle="emphasis"
        extend={{ marginBottom: MARGIN_BOTTOM, textAlign: 'center' }}
      >
        {`You have selected: ${carData?.modelName}`}! <br />
        -- Time to Learn --
      </Text>
    </Page>
  );
};

export default withRouter(Learn);

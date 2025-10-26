import { Center } from '@chakra-ui/react';
import { useAnalytics } from '../../query';
import {LineGraph} from "./lineGraph";

export const AnalyticsView = () => {
  const {
    data,
  } = useAnalytics({
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-11-01T00:00:00.000Z',
  });


  return (
    <Center maxWidth="1000px" flexDirection="column" w="100%" py={4} height='800px' >
      {data && <LineGraph data={data}/>}
    </Center>
  );
};

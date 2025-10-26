import { ResponsiveLine } from '@nivo/line';
import { Box } from '@chakra-ui/react';
import { showDate } from '../../helpers';

interface IProps {
  data: any;
}

type Segment = {
  totalAmount?: number;
  index: number;
};

type CategoryAnalyticsInput = {
  categoryId: string;
  categoryName: string;
  segments: Segment[];
};

type AnalyticsOutput = Array<{
  id: string;
  data: Array<{ x: string; y: number }>;
}>;

const parseCategoryAnalytics = (input: {
  categoryAnalytics: CategoryAnalyticsInput[];
  segmentDates: string[];
}): AnalyticsOutput =>
  input.categoryAnalytics.map((cat) => ({
    id: cat.categoryName,
    data: input.segmentDates.map((dateStr, index) => {
      const segment = cat.segments.find((s) => s.index === index);
      return {
        x: showDate(dateStr),
        y: segment ? (segment.totalAmount ?? 0) : 0,
      };
    }),
  }));

export const LineGraph = ({ data }: IProps) => {
  return (
    <Box position="absolute" width="1200px" height="800px">
      <ResponsiveLine
        data={parseCategoryAnalytics(data)}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        axisBottom={{ legend: 'transportation', legendOffset: 36 }}
        axisLeft={{ legend: 'count', legendOffset: -80 }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 100,
            itemWidth: 80,
            itemHeight: 22,
            symbolShape: 'circle',
          },
        ]}
      />
    </Box>
  );
};

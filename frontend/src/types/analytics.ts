interface ISegment {
  totalAmount: number;
  index: number;
}

interface ICategory {
  categoryId: string;
  categoryName: string;
  segments: ISegment[];
}

export interface ICategoryAnalytics {
  categoryAnalytics: ICategory[];
  segmentDates: string[];
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from '../../schemas/expense.schema';
import { Category } from '../../schemas/category.schema';
import { AnalyticsInput } from './dto/analytics.input';
import {
  CategoryAnalytics,
  SumCategory,
} from './dto/category-analytics.output';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getCategoryTotals(input: AnalyticsInput): Promise<CategoryAnalytics> {
    const segmentCount = 8;
    const startTime = input.startDate.getTime();
    const endTime = input.endDate.getTime();
    const segmentMs = (endTime - startTime) / segmentCount;

    const segmentDates = Array.from(
      { length: segmentCount + 1 },
      (_, i) => new Date(startTime + i * segmentMs),
    );

    const result = await this.categoryModel.aggregate([
      {
        $lookup: {
          from: 'expenses',
          let: { categoryId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$category', '$$categoryId'] },
                    { $gte: ['$paymentDate', input.startDate] },
                    { $lte: ['$paymentDate', input.endDate] },
                  ],
                },
              },
            },
            {
              $addFields: {
                segmentIndex: {
                  $floor: {
                    $divide: [
                      { $subtract: [{ $ifNull: ['$paymentDate', input.startDate] }, input.startDate] },
                      segmentMs,
                    ],
                  },
                },
              },
            },
          ],
          as: 'expenses',
        },
      },
      {
        $addFields: {
          segments: {
            $map: {
              input: Array.from({ length: segmentCount }, (_, i) => i),
              as: 'i',
              in: {
                index: '$$i',
                totalAmount: {
                  $sum: {
                    $map: {
                      input: {
                        $filter: {
                          input: '$expenses',
                          as: 'e',
                          cond: { $eq: ['$$e.segmentIndex', '$$i'] },
                        },
                      },
                      as: 'e',
                      in: '$$e.amount',
                    },
                  },
                },
                segmentStart: { $arrayElemAt: [segmentDates, '$$i'] },
                segmentEnd: { $arrayElemAt: [segmentDates, { $add: ['$$i', 1] }] },
              },
            },
          },
        },
      },
      {
        $project: {
          categoryId: '$_id',
          categoryName: '$name',
          segments: 1,
        },
      },
    ]);

    return {
      categoryAnalytics: result as SumCategory[],
      segmentDates: segmentDates,
    } as CategoryAnalytics;
  }
}

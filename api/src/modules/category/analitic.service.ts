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

    const result = await this.expenseModel.aggregate([
      { $match: { createdAt: { $gte: input.startDate, $lte: input.endDate } } },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: '$category' },
      {
        $addFields: {
          segmentIndex: {
            $floor: {
              $divide: [
                { $subtract: ['$createdAt', input.startDate] },
                segmentMs,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: { category: '$category._id', segmentIndex: '$segmentIndex' },
          categoryName: { $first: '$category.name' },
          totalAmount: { $sum: '$amount' },
          index: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.category',
          categoryName: { $first: '$categoryName' },
          segments: {
            $push: {
              index: '$_id.segmentIndex',
              totalAmount: '$totalAmount',
              segmentStart: {
                $arrayElemAt: [segmentDates, '$_id.segmentIndex'],
              },
              segmentEnd: {
                $arrayElemAt: [
                  segmentDates,
                  { $add: ['$_id.segmentIndex', 1] },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          categoryId: '$_id',
          categoryName: 1,
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

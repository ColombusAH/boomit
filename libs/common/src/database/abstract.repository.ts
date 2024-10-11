import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    options: { lean: boolean } = { lean: true },
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(options.lean);
    if (!document) {
      this.logger.warn('Docment was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: { lean: boolean } = { lean: true },
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, { new: true })
      .lean(options.lean);
    if (!document) {
      this.logger.warn('Docment was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document as unknown as TDocument;
  }

  async find(
    filterQuery: FilterQuery<TDocument>,
    options: { lean: boolean } = { lean: true },
  ): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(options.lean);
  }

  async findOneandDelete(
    filterQuery: FilterQuery<TDocument>,
    options: { lean: boolean } = { lean: true },
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery)
      .lean(options.lean);
    return document as unknown as TDocument;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './payment.model';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<Payment>) {}

  async create(paymentData: Partial<Payment>): Promise<Payment> {
    const createdPayment = new this.paymentModel(paymentData);
    return createdPayment.save();
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().exec();
  }

  async findOne(id: string): Promise<Payment> {
    return this.paymentModel.findById(id).exec();
  }

  async update(id: string, paymentData: Partial<Payment>): Promise<Payment> {
    return this.paymentModel.findByIdAndUpdate(id, paymentData, { new: true }).exec();
  }

  async delete(id: string): Promise<Payment> {
    return this.paymentModel.findByIdAndDelete(id).exec();
  }
}
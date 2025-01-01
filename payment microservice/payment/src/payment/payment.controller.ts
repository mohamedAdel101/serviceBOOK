import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.model';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() paymentData: Partial<Payment>) {
    return this.paymentService.create(paymentData);
  }

  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() paymentData: Partial<Payment>) {
    return this.paymentService.update(id, paymentData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.paymentService.delete(id);
  }
}
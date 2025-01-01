import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment, PaymentSchema } from './payment.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
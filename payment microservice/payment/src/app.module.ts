import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mohamedtarek1112005:HpVlJvkOJIvoVoLk@cluster0.oyd8j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), 
    PaymentModule
  ],
})
export class AppModule {}
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';
@Injectable()
export class PaymentsService {
  private readonly stripeService = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2024-09-30.acacia',
    },
  );
  constructor(private readonly configService: ConfigService) {}

  async createCharge({ card, amount }: CreateChargeDto) {
    const cardMethodParams: Stripe.PaymentMethodCreateParams = {
      type: 'card',
      card: {
        ...card,
      },
    };
    // const paymentMethod =
    //   await this.stripeService.paymentMethods.create(cardMethodParams);

    //todo: change that to souce: tokenId (obrained in the fe)
    // look at 
    // https://medium.com/web-development-with-sumit/how-to-make-payment-with-stripe-using-nodejs-e4581d357dcd#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTA3ODExMDg3NDI3NzEwMjI5NjUiLCJlbWFpbCI6ImhhdHRhYmF2bmVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYmYiOjE3MjkxNDc3MjQsIm5hbWUiOiJhdm5lciBoYXR0YWIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSV8ydG8tRVFwWWNSLXpKX2F6dmY0NkF2TGZHTUlEdGtRR2d3b0ViaWMtRVQ1a1Z3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6ImF2bmVyIiwiZmFtaWx5X25hbWUiOiJoYXR0YWIiLCJpYXQiOjE3MjkxNDgwMjQsImV4cCI6MTcyOTE1MTYyNCwianRpIjoiZGQ4YTRlNDJlMjM2M2NmNzRhZWVhMjNkMDNlZjIzOTdlZTdiMzZlZSJ9.YPRiQz9IT3v-Mvz5wTiVkJdreY-v_tGnSyVJ4WyxJB3fqCxXCspVBevLXw1UzDllvheZF9ByNTADpHjQhCl_hhFKSE5boU4RWDTstOTCEsAwC7blvhnS0qBrKbJWYOB6VH_97tBh3oSWq6i1cwwo5cHiiVd9KLhSJ1IU49AYrxAdeL3kyPH_NYxQ441JYcPIeokUtxfR37IUY-N8Yi3uRG6MWWL5WHhZ1HXoUd6sAmDdhXmCa-qWq6zIz7Um8xMkbn8wMXhKDemWOn_p9NCXP-07o7rk91drbLn-i4yHqfGe9lxxVyUc6jFuwwiarDKbkpbSBj8p5CaLbmdC0Obm8g
    const paymentIntent = await this.stripeService.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
    return paymentIntent;
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private stripe: Stripe | null = null;

  constructor(private firestore: AngularFirestore) {
    this.loadStripe();
  }

  private async loadStripe(): Promise<void> {
    this.stripe = await loadStripe('pk_test_51P6Gu6SA7VPhctEU7aTO5iGWTPgWR3HJcxF1mPjmdwe8grBKp7fUhfgJfru9BhgS4VRKKvAi6OVTDlTySjCAjwmE00qe2OmsCW');
  }

  async bookPoi(poiId: string, hours: number, totalCost: number, cardElement: StripeCardElement): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }
  
    const bookingData: any = {
      poiId: poiId,
      hours: hours,
      totalCost: totalCost,
      status: 'pending'
    };
  
    const { token, error } = await this.stripe.createToken(cardElement);
  
    if (error) {
      throw new Error('Payment failed: ' + error.message);
    }
  
    const charge = await this.createStripeCharge(totalCost, token.id);
  
    if (charge.status === 'succeeded') {
      bookingData.status = 'confirmed';
      bookingData.chargeId = charge.id;
      return this.saveBookingToFirebase(bookingData);
    } else {
      throw new Error('Payment failed');
    }
  }

  private async createStripeCharge(amount: number, token: string): Promise<any> {
    const response = await fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer sk_test_51P6Gu6SA7VPhctEUt5XtVDtThjS9vQu19u4jXfXFvfqo6BSWemdceWRpvvImmtq4MNNSCiBRnHvBDGoKo1qRBEqN00ahyFBtVd'
      },
      body: new URLSearchParams({
        amount: (amount * 100).toString(),
        currency: 'usd',
        source: token,
        description: 'Booking charge'
      })
    });

    return response.json();
  }

  private saveBookingToFirebase(bookingData: any): Promise<any> {
    return this.firestore.collection('bookings').add(bookingData);
  }
}
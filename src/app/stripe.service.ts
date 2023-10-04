import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  charge(cantidad: number, tokenId: string) { 
    const requestBody = {
      stripeToken: tokenId,
      cantidad: cantidad
    };

    return this.http.post("http://localhost:8100/stripe_checkout", requestBody).toPromise();
  }
}

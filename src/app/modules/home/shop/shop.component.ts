import { AfterViewInit, Component,ElementRef, NgZone, ViewChild } from '@angular/core';
import { StripeService } from 'src/app/stripe.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements AfterViewInit {
  @ViewChild("cardInfo") cardInfo!: ElementRef;
  cardError!: string ;
  card: any

  constructor(
    private ngZone:NgZone,
    private stripeService: StripeService){}

  ngAfterViewInit(): void {
    this.card = elements.create("card");
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener("change", this.onChange.bind(this))

    }
    onChange({error}: { error: Error | { message: string } }){
      if (error) {
        this.ngZone.run(()=>this.cardError = error.message )
      }
      else{
        this.ngZone.run(()=>this.cardError = "null" )
      }
  }
  async onClick() {
    const {token,error} = await stripe.createToken(this.card);
    if (token){
        await this.stripeService.charge(100,token.id)
    }else{
      this.ngZone.run(()=>this.cardError = error.message )
    }
  }
}



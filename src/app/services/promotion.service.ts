import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';


@Injectable()
export class PromotionService {

  constructor() { }
  
  getPromotions(): Promise<Promotion[]>{
	  return new Promise(resolve => {
		//simulate server latency with 2 second delay
		setTimeout(() => resolve(PROMOTIONS), 2000)
	  });
		  
  }

  getPromotion(id: number): Promise<Promotion>{
	  return new Promise(resolve => {
		//simulate server latency with 2 second delay
		setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id==id))[0]), 2000)
	  
  });
	  
  }
  
  getFeaturedPromotion(): Promise<Promotion>{
	 return new Promise(resolve => {
		//simulate server latency with 2 second delay
		setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.featured))[0]), 2000)
	
  });
}




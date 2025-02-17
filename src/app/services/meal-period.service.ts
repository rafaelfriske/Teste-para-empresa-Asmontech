import { Injectable } from '@angular/core';

export type MealPeriod = 'breakfast' | 'lunch' | 'closed';

@Injectable({
  providedIn: 'root'
})
export class MealPeriodService {
  getCurrentPeriod(): MealPeriod {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 11) {
      return 'breakfast';
    } else if (hour >= 11 && hour < 15) {
      return 'lunch';
    }
    return 'closed';
  }

  getPeriodLabel(period: MealPeriod): string {
    const labels = {
      breakfast: 'Café da Manhã',
      lunch: 'Almoço',
      closed: 'Fechado'
    };
    return labels[period];
  }
}
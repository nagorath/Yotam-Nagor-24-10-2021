import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(msg: string, action: string, duration: number): void {
    this.snackBar.open(msg, action, {
      horizontalPosition: 'start',
      duration
    });
  }

  parseFtoC(tempNum): number {
    const parsedTemp = (tempNum - 32) * 0.5556;
    return parsedTemp;
  }

  parseCtoF(tempNum): number {
    const parsedTemp = (tempNum * 1.8) + 32;
    return parsedTemp;
  }
}

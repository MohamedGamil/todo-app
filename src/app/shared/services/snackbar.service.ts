import { Injectable } from '@angular/core';
import Snackbar from 'awesome-snackbar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor() { }

  show(message: string, duration: number = 3000) {
    new Snackbar(message, {
      timeout: duration,
      position: 'bottom-right',
      theme: 'dark',
      actionText: 'Close',
    });
  }
}

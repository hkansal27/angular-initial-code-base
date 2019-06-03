import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RootInfoModel } from '../models/root-info-model';

@Injectable({
  providedIn: 'root',
})
export class RootMessageService {

  constructor() { }

  private numberMessage = new BehaviorSubject<number>(-1);
  numberMessage$ = this.numberMessage.asObservable();

  private loaderMessage = new Subject<boolean>();
  loaderMessage$ = this.loaderMessage.asObservable();

  private infoMessage = new Subject<RootInfoModel>();
  infoMessage$ = this.infoMessage.asObservable();

  sendNumbermessage(message: number) {
    this.numberMessage.next(message);
  }

  sendLoadermessage(message: boolean) {
    this.loaderMessage.next(message);
  }

  sendInfoMessage(message: RootInfoModel) {
    this.infoMessage.next(message);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslatePipe } from './pipes/translate.pipe';
import { Title } from '@angular/platform-browser';
import { RootMessageService } from './services/root-message.service';
import { Subscription } from 'rxjs';
import { RootInfoModel } from './models/root-info-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WorkKey';
  showLoader = false;
  showInfo = false;
  infoData: RootInfoModel;
  loaderSubscription: Subscription;
  infoSubscription: Subscription;
  displayInfoTimeoutId: any = -1;

  /**
   * App Component constructor
   * @constructor
   * @param {RootMessageService}: rootMessageService - injected message service to comunicate at root level.
   * @param {TranslatePipe}: translatePipe - injected pipe to translate key to appropiate language.
   * @param {Title}: titleService - service to set document title.
   */
  constructor(
    private rootMessageService: RootMessageService, private translatePipe: TranslatePipe,
    private titleService: Title) {
  }

  ngOnDestroy() {
    if (this.infoSubscription != null) {
      this.infoSubscription.unsubscribe();
    }
  }

  ngOnInit() {

    this.titleService.setTitle(this.translatePipe.transform('TITLE'));

    this.loaderSubscription = this.rootMessageService.loaderMessage$.subscribe((val: boolean) => {
      setTimeout(() => {
        this.showLoader = val;
      }, 0);
    });

    this.infoSubscription = this.rootMessageService.infoMessage$.subscribe((info: RootInfoModel) => {
      if (info) {
        this.infoData = info;
        setTimeout(() => {
          this.showInfo = true;
        }, 0);
        if (this.displayInfoTimeoutId !== -1) {
          clearTimeout(this.displayInfoTimeoutId);
        }
        this.displayInfoTimeoutId = setTimeout(() => {
          this.hideDisplayInfoWindow();
        }, 10000);
      }
    });
  }

  /**
   * Hides the info message container displayed on top right corner.
   */
  hideDisplayInfoWindow(): void {
    if (this.displayInfoTimeoutId !== -1) {
      clearTimeout(this.displayInfoTimeoutId);
    }
    this.infoData = null;
    this.showInfo = false;
    this.displayInfoTimeoutId = -1;
  }

  /**
   * Return the message to be displayed on top right corner as info.
   * @returns {String} String message to be displayed.
   */
  getInfoMessage(): string {
    if (this.infoData) {
      return this.infoData.message;
    }
    return '';
  }

  getInfoWindowStyleClass(): string {
    if (this.infoData && this.infoData.type === 1) {
      return 'info-display-container-green';
    } else {
      return 'info-display-container-red';
    }
  }
}

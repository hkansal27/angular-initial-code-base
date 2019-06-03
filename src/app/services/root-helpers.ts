import { RootInfoModel } from 'src/app/models/root-info-model';
import { RootConstants } from '../models/root-constants';
import { RootMessageService } from './root-message.service';

export class RootHelpers {

    static isMobileDevice(): boolean {
        if (window.innerWidth <= RootConstants.MOBILE_MAX_WITH) {
            return true;
        }
        return false;
    }

    /**
     * function to handle the response code other than 200
     * @param {string} status
     */
    static processErrorCode(status: string, rootMessageService: RootMessageService) {
        const infoModel: RootInfoModel = new RootInfoModel();
        infoModel.type = 0;
        infoModel.message = status;
        if (rootMessageService) {
            rootMessageService.sendInfoMessage(infoModel);
        }
    }

    static processSuccessCode(status: string, rootMessageService: RootMessageService) {
        const infoModel: RootInfoModel = new RootInfoModel();
        infoModel.type = 1;
        infoModel.message = status;
        if (rootMessageService) {
            rootMessageService.sendInfoMessage(infoModel);
        }
    }
}
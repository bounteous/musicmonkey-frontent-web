import { Component, OnInit } from '@angular/core';
import { SharedComponent } from '../shared/shared.component';
import { ManageRawService } from '../services/raw';

@Component({
  selector: 'app-torrent-upload',
  templateUrl: './torrent-upload.component.html',
  styleUrls: ['./torrent-upload.component.css']
})
export class TorrentUploadComponent {
  
  formTitle: string;
  formArtist: string;

  constructor(
    private _manageRawService: ManageRawService,
    private _sharedComponent: SharedComponent
  ) { }

  fileChange(event) {
    let fileList = event.target.files;

    if (fileList.length > 0) {
      let file: File = fileList[0];
      let fileSize: number = fileList[0].size;
      if (fileSize < 314572) {

        let formData: FormData = new FormData();
        formData.append('formTorrent', file);
        formData.append('formTitle', this.formTitle);
        formData.append('formArtist', this.formArtist);

        this._manageRawService.upload(formData)
        .subscribe(
          (data)=> {
            this._sharedComponent.showSuccess(data.message);
          },
          (error)=> {
            this._sharedComponent.showError(error.message);
          }
        )

      } else {
        this._sharedComponent.showError('File too large');
      }
    }

  }

}
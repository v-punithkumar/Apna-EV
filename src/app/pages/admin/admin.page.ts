import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { AdminPanelComponent } from '../../admin/admin-panel.component';
import { LocationRequestService } from '../../services/location-request.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.html',
  styleUrls: ['./admin.page.css'],
})
export class AdminPage implements OnInit {

  constructor(public modalController: ModalController) { }

  get appVersion(): string {
    return environment.version;
  }

  get apiUrl(): string {
    return environment.apiBase;
  }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}

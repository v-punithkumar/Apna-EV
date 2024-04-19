import { Component, OnInit } from '@angular/core';
import { LocationRequestService } from '../services/location-request.service';

@Component({
  selector: 'app-admin-panel',
  template: `
    <div>
      <h2>Location Requests</h2>
      <ul>
        <li *ngFor="let request of locationRequests">
          <p>Location: {{ request.location | json }}</p>
          <button (click)="acceptRequest(request._id)">Accept</button>
          <button (click)="declineRequest(request._id)">Decline</button>
        </li>
      </ul>
    </div>
  `,
})
export class AdminPanelComponent implements OnInit {
  locationRequests: any[] = [];

  constructor(private locationRequestService: LocationRequestService) {}

  ngOnInit() {
    this.fetchLocationRequests();
  }

  async fetchLocationRequests() {
    try {
      this.locationRequests = await this.locationRequestService.getLocationRequests();
    } catch (error) {
      console.error('Error fetching location requests:', error);
    }
  }

  async acceptRequest(id: string) {
    try {
      await this.locationRequestService.acceptLocationRequest(id);
      this.fetchLocationRequests();
    } catch (error) {
      console.error('Error accepting location request:', error);
    }
  }

  async declineRequest(id: string) {
    try {
      await this.locationRequestService.declineLocationRequest(id);
      this.fetchLocationRequests();
    } catch (error) {
      console.error('Error declining location request:', error);
    }
  }
}
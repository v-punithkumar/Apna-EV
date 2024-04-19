import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class LocationRequestService {
  private apiUrl = 'http://localhost:3000/api/locations';

  async getLocationRequests() {
    const response = await axios.get(this.apiUrl);
    return response.data;
  }

  async acceptLocationRequest(id: string) {
    const response = await axios.put(`${this.apiUrl}/${id}`, { status: 'accepted' });
    return response.data;
  }

  async declineLocationRequest(id: string) {
    const response = await axios.put(`${this.apiUrl}/${id}`, { status: 'declined' });
    return response.data;
  }
}
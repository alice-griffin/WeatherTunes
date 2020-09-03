import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string;
  clientId: string = 'd0502d4fc5a9406b8afda0decad6a3d0';
  clientSecret: string = '6f9fdb44e4bf49bda20513dd4399bff6';

  constructor(private http: HttpClient) { }

  getToken() {
    return this.http.post(`https://accounts.spotify.com/api/token`, `grant_type=client_credentials`, {
      headers: {
        Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = '8cf1063d8e9f5aa64f2d98e7abdafa92';
  zipCode: string = '';

  constructor(private http: HttpClient) { }

  getWeather(zipCode: number): Observable<any> {
    return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${this.apiKey}`)
  }
}

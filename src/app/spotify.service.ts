import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token: string;
  clientId: string = 'd0502d4fc5a9406b8afda0decad6a3d0';
  clientSecret: string = '6f9fdb44e4bf49bda20513dd4399bff6';
  playlist: any[];
  artist: any;
  artistId: any;
  valence: any;

  constructor(private http: HttpClient) {}

  getToken() {
    return this.http.post(
      `https://accounts.spotify.com/api/token`,
      `grant_type=client_credentials`,
      {
        headers: {
          Authorization:
            'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }
  
  getPlaylist(weather: string, data: any): Observable<any> {
    let params;
    switch (weather) {
      case 'Mist':
        params = {
          target_energy: 0.3,
          target_acousticness: 1.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Thunderstorm':
        params = {
          target_energy: 0.6,
          target_mode: 0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Drizzle':
        params = {
          target_energy: 0.4,
          target_instrumentalness: 1.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Rain':
        params = {
          target_energy: 0.5,
          target_instrumentalness: 1.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Snow':
        params = {
          target_energy: 0.2,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Clear':
        params = {
          target_danceability: 1.0,
          target_popularity: 100,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Clouds':
        params = {
          target_energy: 0.5,
          target_acousticness: 0.5,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Rainy':
        params = {
          target_energy: 0.2,
          target_acousticness: 1.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Smoke':
        params = {
          target_energy: 0.8,
          target_danceability: 0.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Haze':
        params = {
          target_energy: 0.3,
          target_acousticness: 1.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Dust':
        params = {
          target_energy: 0.6,
          target_min_tempo: 150,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Fog':
        params = {
          target_energy: 0.3,
          target_danceability: 0.4,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Sand':
        params = {
          target_energy: 1.0,
          target_danceability: 1.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Ash':
        params = {
          target_energy: 0.8,
          target_danceability: 0.0,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Squall':
        params = {
          target_energy: 0.7,
          target_danceability: 0.7,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      case 'Tornado':
        params = {
          target_energy: 1.0,
          target_danceability: 0.4,
          limit: data.limit ? data.limit : 10,
          seed_artists: data.artist ? data.artist : '',
          seed_genres: data.genres ? data.genres : '',
          target_valence: data.valence ? data.valence : 0.5,
        };
        break;
      default:
        console.log('default hit');
    }
    return this.http.get('https://api.spotify.com/v1/recommendations', {
      params: params,
      headers: { Authorization: this.token },
    });
  }

  getArtist(data: any): Observable<any> {
    return this.http.get('https://api.spotify.com/v1/search', {
      params: {
        q: data.q ? data.q : '',
        type: 'artist',
        limit: data.limit ? data.limit : 1,
      },
      headers: { Authorization: this.token },
    });
  }

  getGenres() {
    return this.http.get(
      'https://api.spotify.com/v1/recommendations/available-genre-seeds',
      { headers: { Authorization: this.token } }
    );
  }
}

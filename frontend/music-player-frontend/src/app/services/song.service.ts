import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'; 
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root' 
})
export class SongService {

  private backendUrl = 'http://localhost:8080/songs'; 

  constructor(private http: HttpClient) { } 

  // get all songs
  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.backendUrl);
  }

  // get a song (with id)
  getSong(id: number): Observable<Song[]> {
    return this.http.get<Song[]>(this.backendUrl + '/' + id);
  }

  addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(this.backendUrl, song);
  }

  updateSong(id: number, song: Song): Observable<Song> {
    return this.http.put<Song>(this.backendUrl + '/' + id, song);
  }

  deleteSong(id: number): Observable<Song>{
    return this.http.delete<Song>(this.backendUrl + '/' + id);
  }

  // private variable for selected song
  private selectedSong = new BehaviorSubject<Song | null>(null);

  // accesible for every component
  public currentSong$ = this.selectedSong.asObservable();

  // song to play
  selectSong(song: Song){
    this.selectedSong.next(song);
  }
}

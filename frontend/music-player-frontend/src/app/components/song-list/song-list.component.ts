import { Component } from '@angular/core';
import { SongService } from '../../services/song.service';
import { Song } from '../../models/song.model'; // se hai creato un modello
import { error } from 'console';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-song-list',
  imports: [
    RouterLink ],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {

  constructor(private songService: SongService) { }

  songs: Song[] = [];
  currentSong?: Song;

  // when component is initialized
  ngOnInit(): void {

    // Calls service to get songs
    this.songService.getSongs().subscribe({
      next: (data) => this.songs = data, // if successfull put data in songs array
      error: (err) => console.error('Error loading songs', err) // error when not successfull
    });
  }

  // to select a song to play
  getSong(song: Song): void {
    this.currentSong = song;
  }

  // add new song to list
  addSong(newSong :Song) :void {
    this.songService.addSong(newSong).subscribe({
      next: (createdSong) => {  // if successfull add new song
        this.songs.push(createdSong);
      },
      error: (err) => {  // error when not successfull
        console.error('Error creating song', err)
      },
    })
  }

  // to delete a song
  deleteSong(id?: number): void {
    console.log(id);
    if (!id) return;
    this.songService.deleteSong(id).subscribe({
      next: () => { // when song is deleted update list
        this.songService.getSongs().subscribe({
          next: (data) => this.songs = data, // if successfull put data in songs array
          error: (err) => console.error('Error loading songs', err) // error when not successfull
        });
      },
      error: (err) => console.error('Error in deleting song', err)
    });
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { Song } from '../../models/song.model';
import { SongService } from '../../services/song.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-player',
  imports: [RouterLink, CommonModule],
  templateUrl: './song-player.component.html',
  styleUrl: './song-player.component.scss'
})
export class SongPlayerComponent {

  songs: Song[] = [];
  currentIndex: number = 0;
  currentSong: Song | null = null;




  constructor(private songService: SongService) { }

  ngOnInit(): void {

    // uploads all songs 
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
      console.log('Canzoni caricate nel player:', this.songs);
    });

    // takes selected song
    this.songService.currentSong$.subscribe(song => {
      if (song)
        console.log('Player riceve:', song); // debug
      this.currentSong = song;

      // find index 
      this.currentIndex = this.songs.findIndex(s => s.id === song?.id);

      // plays song
      if (this.currentSong && this.audio) {
        this.audio.nativeElement.src = this.currentSong.audioUrl;
        this.audio.nativeElement.play();
        this.isPlaying = true;
      }
    });
  }


  isExpanded = false;

  // to open or close player
  togglePlayer() {
    this.isExpanded = !this.isExpanded;
  }

  // play and pause buttons
  isPlaying = false;

  @ViewChild('audioRef') audio!: ElementRef<HTMLAudioElement>;

  playPause() {
    const audio = this.audio.nativeElement;

    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = false;
    } else {
      audio.play();
      this.isPlaying = true;
    }
  }

  // next button
  next() {
    if (this.songs.length === 0) {
      return;
    }

    this.currentIndex = (this.currentIndex + 1) % this.songs.length; // % is to loop

    const nextSong = this.songs[this.currentIndex];
    this.songService.selectSong(nextSong);
  }

  // previous button
  previous() {
    if (this.songs.length === 0) {
      return;
    }

    this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length; // % is to loop

    const previousSong = this.songs[this.currentIndex];
    this.songService.selectSong(previousSong);
  }

}

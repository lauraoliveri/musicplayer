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
  isExpanded = false; // mobile toggle
  isPlaying = false; // play and pause buttons
  progress = 0; // progressbar
   
  @ViewChild('audioRef') audio!: ElementRef<HTMLAudioElement>;

  constructor(private songService: SongService) { }

  // lifecycle: runs after constructor, for initial data loading
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

  // lifecycle: runs after view is fully initialized
  ngAfterViewInit(){
    const audio = this.audio.nativeElement;

    // progress bar
    audio.addEventListener('timeupdate', () => { 
      this.progress = (audio.currentTime / audio.duration) * 100;
    });

    // when songs ends next songs plays
    audio.addEventListener('ended', () => {
      this.next();
    });
  }
  

  // to open or close player
  togglePlayer() {
    this.isExpanded = !this.isExpanded;
  }

  // play pause button
  playPause() {

    if (this.isPlaying) {
      this.audio.nativeElement.pause();
      this.isPlaying = false;
    } else {
      this.audio.nativeElement.play();
      this.isPlaying = true;
    }
  }

  // next song button
  next() {
    if (this.songs.length === 0) {
      return;
    }

    this.currentIndex = (this.currentIndex + 1) % this.songs.length; // % is to loop
    const nextSong = this.songs[this.currentIndex];
    this.songService.selectSong(nextSong);
  }

  // previous song button
  previous() {
    if (this.songs.length === 0) {
      return;
    }

    this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length; // % is to loop
    const previousSong = this.songs[this.currentIndex];
    this.songService.selectSong(previousSong);
  }

}

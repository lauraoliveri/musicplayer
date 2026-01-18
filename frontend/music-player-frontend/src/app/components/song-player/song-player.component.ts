import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
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
  isExpanded = false; // controls if player is expanded or not (for mobile view)
  isPlaying = false; // play and pause buttons
  progress = 0; // progressbar

  private listenersAdded = false; // flag to add event listeners only once

  // ViewChild reference to HTML audio element - available AFTER ngAfterViewInit
  @ViewChild('audioRef') audio!: ElementRef<HTMLAudioElement>;

  constructor(
    private songService: SongService,
    private ngZone: NgZone // helps Angular detect changes made by browser events
  ) { }


  // viewChild elements are not available here yet
  ngOnInit(): void {
    // uploads all songs from backend
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
    });

    // takes selected song
    this.songService.currentSong$.subscribe(song => {
      if (song) {
        this.currentSong = song;
        // find index 
        this.currentIndex = this.songs.findIndex(s => s.id === song?.id);
        // plays song
        this.playSong();
      }
    });
  }

  // lifecycle runs after view is fully initialized
  ngAfterViewInit() {
    const audio = this.audio.nativeElement;
    audio.crossOrigin = 'anonymous';

    // if a song was already selected, play it
    if (this.currentSong) {
      this.playSong();
    }
  }

  // play current song and add event listeners
  playSong() {
    if (this.currentSong && this.audio?.nativeElement) {
      const audio = this.audio.nativeElement;

      // only change the audio if it's a different song
      if (audio.src !== this.currentSong.audioUrl) {
        audio.src = this.currentSong.audioUrl;
      }

      if (!this.listenersAdded) {
        // progress bar
        audio.addEventListener('timeupdate', () => {

          // ngZone.run tells angular that something changed and it needs to update the page
          this.ngZone.run(() => {
            if (audio.duration && !isNaN(audio.duration)) {
              this.progress = (audio.currentTime / audio.duration) * 100;
            }
          });
        });

        // when song ends, play next song
        audio.addEventListener('ended', () => {
          this.ngZone.run(() => {
            this.next();
          });
        });

        this.listenersAdded = true;
      }

      audio.play();
      this.isPlaying = true;
    }
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
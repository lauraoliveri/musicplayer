import { Component } from '@angular/core';
import { Song } from '../../models/song.model';
import { SongService } from '../../services/song.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-song-player',
  imports: [ RouterLink , CommonModule],
  templateUrl: './song-player.component.html',
  styleUrl: './song-player.component.scss'
})
export class SongPlayerComponent {

  currentSong: Song | null = null;


  constructor(private songService: SongService) {}

  ngOnInit(): void{
    this.songService.currentSong$.subscribe(song => {
      if(song) 
        console.log('Player riceve:', song); // debug
        this.currentSong = song;
    });
  }


  isExpanded = false; 

  // to open or close player
  togglePlayer() {
    this.isExpanded = !this.isExpanded;
  }
  


}

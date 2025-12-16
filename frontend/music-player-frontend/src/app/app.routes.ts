import { Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongFormComponent } from './components/song-form/song-form.component';
import { SongPlayerComponent } from './components/song-player/song-player.component';

export const routes: Routes = [
    { path: 'songs', component: SongListComponent },
    { path: '', redirectTo: 'songs', pathMatch: 'full' },
    { path: 'addsongs', component: SongFormComponent },
    { path: 'player/:title', component: SongPlayerComponent }
];

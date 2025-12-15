import { Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';

export const routes: Routes = [
    { path: 'songs', component: SongListComponent },
    { path: '', redirectTo: 'songs', pathMatch: 'full' }
];

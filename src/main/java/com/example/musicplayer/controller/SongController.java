package com.example.musicplayer.controller;

import com.example.musicplayer.model.Song;
import com.example.musicplayer.service.SongService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
public class SongController {

    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping
    public List<Song> getAllSongs(){
        return songService.getAllSongs();
    }

    // get song by id
    @GetMapping("/{id}")
    public ResponseEntity<Song> getSong(@PathVariable Long id){
        Song song = songService.getSongById(id);

        if (song != null){
            return ResponseEntity.ok(song);
        }

        // if song is not found return 404 error
        return ResponseEntity.notFound().build();
    }

    // create song
    @PostMapping
    public Song createSong(@RequestBody Song song){
        return songService.addSong(song);
    }

    // update song
    @PutMapping("/{id}")
    public ResponseEntity<Song> updateSong(
            @PathVariable Long id,
            @RequestBody Song song
    ){
       Song updatedSong = songService.updateSong(id, song);
       if (updatedSong != null){
           return ResponseEntity.ok(updatedSong);
       }

        // if song is not found return 404 error
        return ResponseEntity.badRequest().build();
    }

    // delete song
    @DeleteMapping("{id}")

    public ResponseEntity<Song> deleteSong( @PathVariable Long id){
        boolean deletedSong = songService.deleteSong(id);

        // if song has been deleted return 204 code
        if (deletedSong){
            return ResponseEntity.noContent().build();
        }

        // if song is not found return 404 error
        return ResponseEntity.notFound().build();

    }
}

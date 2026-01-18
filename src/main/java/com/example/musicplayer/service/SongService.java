package com.example.musicplayer.service;

import com.example.musicplayer.model.Song;
import com.example.musicplayer.repository.SongRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    private final SongRepository songRepository;

    public SongService(SongRepository songRepository) {
        this.songRepository = songRepository;
    }

    public List<Song> getAllSongs() {
        return songRepository.findAll();
    }

    public Song getSongById(Long id) {
        return songRepository.findById(id).orElse(null);
    }

    public Song addSong(Song song) {
        return songRepository.save(song);
    }

    public Song updateSong(Long id, Song newSong) {

        // find the existent song
        Song existingSong = songRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Song not found"));

        // update attributes
        existingSong.setTitle(newSong.getTitle());
        existingSong.setArtist(newSong.getArtist());
        existingSong.setAudioUrl(newSong.getAudioUrl());
        existingSong.setImgUrl(newSong.getImgUrl());

        // save
        return songRepository.save(existingSong);
    }

    public boolean deleteSong(Long id) {
        if (songRepository.existsById(id)){
            songRepository.deleteById(id);
            return true;
        }

        return false;
    }


}

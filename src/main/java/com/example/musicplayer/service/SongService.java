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

    public void deleteSong(Long id) {
        songRepository.deleteById(id);
    }


}

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, X, Music2 } from 'lucide-react'
import './MusicPlayer.css'

function MusicPlayer({ suggestion, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  // Focus music tracks (using license-free ambient sounds)
  const tracks = [
    {
      name: 'Peaceful Piano',
      genre: 'Classical',
      url: 'https://assets.mixkit.co/music/preview/mixkit-sleepy-cat-135.mp3'
    },
    {
      name: 'Ambient Dreams',
      genre: 'Ambient',
      url: 'https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3'
    },
    {
      name: 'Lofi Study',
      genre: 'Lo-fi',
      url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3'
    },
    {
      name: 'Nature Sounds',
      genre: 'Nature',
      url: 'https://assets.mixkit.co/music/preview/mixkit-forest-treasure-138.mp3'
    }
  ]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
    }
  }, [volume])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => {
          console.log('Audio playback failed:', err)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTrackChange = (index) => {
    setCurrentTrack(index)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.load()
    }
  }

  const handleVolumeToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div className="music-player slide-up">
      <div className="player-header">
        <div className="player-title">
          <Music2 size={20} />
          <span>Focus Music</span>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {suggestion && (
        <div className="music-suggestion">
          <span className="suggestion-label">Suggested:</span>
          <span className="suggestion-value">{suggestion.genre}</span>
        </div>
      )}

      <div className="player-content">
        <audio
          ref={audioRef}
          src={tracks[currentTrack].url}
          loop
          onEnded={() => setIsPlaying(false)}
        />

        <div className="now-playing">
          <div className="track-info">
            <p className="track-name">{tracks[currentTrack].name}</p>
            <p className="track-genre">{tracks[currentTrack].genre}</p>
          </div>

          <button className="play-btn" onClick={handlePlayPause}>
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} fill="currentColor" />
            )}
          </button>
        </div>

        <div className="volume-control">
          <button className="volume-btn" onClick={handleVolumeToggle}>
            {isMuted || volume === 0 ? (
              <VolumeX size={20} />
            ) : (
              <Volume2 size={20} />
            )}
          </button>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
          <span className="volume-value">{volume}%</span>
        </div>

        <div className="tracks-list">
          {tracks.map((track, index) => (
            <button
              key={index}
              className={`track-item ${currentTrack === index ? 'active' : ''}`}
              onClick={() => handleTrackChange(index)}
            >
              <div className="track-item-icon">
                {currentTrack === index && isPlaying ? (
                  <div className="playing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <Music2 size={16} />
                )}
              </div>
              <div className="track-item-info">
                <span className="track-item-name">{track.name}</span>
                <span className="track-item-genre">{track.genre}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="player-hint">
        Focus music helps you stay in the zone while working through your tasks
      </div>
    </div>
  )
}

export default MusicPlayer

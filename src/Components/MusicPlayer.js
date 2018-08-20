import React from 'react';

const MusicPlayer = (props) => {


    return(

        <div className="music-player">
        <h3>Now Playing:</h3>
        <p>Artist: {props.artistName}</p>
        <p>Track: {props.trackName}</p>
        <p>Album: {props.albumName}</p>
        <p>
          <button onClick={() => props.onPrevClick()}>Previous</button>
          <button onClick={() => props.onPlayClick()}>{props.playing ? "pause" : "►"}</button>
          <button onClick={() => props.onNextClick()}>Next</button>
        </p>
        </div>

    )
}

export default MusicPlayer;

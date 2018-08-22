import React from 'react';

const MusicPlayer = (props) => {


    return(

        <React.Fragment>
          {props.playlistLoaded
            ?
            <div className="music-player"><h3>Now Playing: {props.trackName}</h3>
              <h4> by {props.artistName} </h4>
              <img className="player-art" src={props.albumArt} alt=""></img>
              <p>
                <button className="player-button" onClick={() => props.onPrevClick()}><img alt="" className="player-button-image" src="./Skip-previous.svg"></img></button>
                <button className="player-button" onClick={() => props.onPlayClick()}>{props.playing ? <img className="player-button-image" alt="" src="./Pause.svg"></img> : <img className="player-button-image" alt="" src="./Play.svg"></img>}</button>
                <button className="player-button" onClick={() => props.onNextClick()}><img className="player-button-image" alt="" src="./Skip-next.svg"></img></button>
              </p>
            </div>
            :
            <div className="music-player">
              <p>
                Click Add Playlist to Spotify to listen to your Birthify Playlist
              </p>
              <p>
                Note: Audio player is only supported for Spotify Premium members.
              </p>
            </div>

        }

      </React.Fragment>

    )
}

export default MusicPlayer;

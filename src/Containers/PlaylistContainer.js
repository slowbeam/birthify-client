import React, { Component } from 'react';
import Playlist from '../Components/Playlist';
import CreatePlaylist from '../Components/CreatePlaylist';

class PlaylistContainer extends Component {

    render() {
        return (
            <div className="playlist-container">
              <CreatePlaylist />
              <div className="song-container">
                <Playlist songs={this.props.songs}/>
              </div>
            </div>

        );
    }
}

export default PlaylistContainer;

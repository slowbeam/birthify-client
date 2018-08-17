import React, { Component } from 'react';
import songs from '../Components/songs';
import Playlist from '../Components/Playlist';

class PlaylistContainer extends Component {

    state = {
        songs: songs
    }

    render() {
        return (
            <div>
                <Playlist songs={this.state.songs}/>
            </div>
        );
    }
}

export default PlaylistContainer;

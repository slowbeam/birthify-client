import React, { Component } from 'react';
import Playlist from '../Components/Playlist';

class PlaylistContainer extends Component {

    render() {
        return (
            <div className="song-container">
                <Playlist songs={this.props.songs}/>
            </div>
        );
    }
}

export default PlaylistContainer;

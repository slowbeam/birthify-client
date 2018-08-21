import React, { Component } from 'react';
import MusicPlayer from '../Components/MusicPlayer';

class SideBar extends Component {

    render() {
        return (
            <div className="sidebar">
                <MusicPlayer artistName={this.props.artistName} trackName={this.props.trackName} albumName={this.props.albumName} albumArt={this.props.albumArt} playing={this.props.playing} onPrevClick={this.props.onPrevClick} onPlayClick={this.props.onPlayClick} onNextClick={this.props.onNextClick} />
            </div>
        );
    }
}

export default SideBar;

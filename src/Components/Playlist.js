import React from 'react';
import SongCard from './SongCard';

const Playlist = ({ songs }) => {

    const renderSongs = () => {
        return songs.map( song => <SongCard song={song} key={song.id}/>)
    }

    return (
        <React.Fragment>
            {renderSongs()}
        </React.Fragment>
    );
}

export default Playlist;

import React from 'react';
import SongCard from './SongCard';

const Playlist = ({ songs }) => {

    const renderSongs = () => {
        return songs.map( song => <SongCard song={song} key={song.id}/>)
    }

    return (
        <div>
            {renderSongs()}
        </div>
    );
}

export default Playlist;

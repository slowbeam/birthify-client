import React from 'react';

const SongCard = (props) => {
    return (
        <React.Fragment>
            <div className='song-card'>
                <h3>{props.song.title}</h3>
                <h4>{props.song.artist}</h4>
                <p>{props.song.release_date}</p>
                <img className='album-cover' src={props.song.cover} alt=''/>
            </div>
            <br />
        </React.Fragment>
    );
}

export default SongCard;

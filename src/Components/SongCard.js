import React from 'react';

class SongCard extends React.Component {

  state = {
    facingFront: true
  }

  flipCard = () => {
    this.setState({
      facingFront: !this.state.facingFront
    })
  }

  render(){
    return (
        <div onMouseEnter={this.flipCard} onMouseLeave={this.flipCard}>
          {this.state.facingFront ? <div style={{
              backgroundImage: `url(${this.props.song.cover})`}} className='song-card'>
          </div> : <div className='song-card'> <h4>{this.props.song.title}</h4>
        <h4>{this.props.song.artist}</h4>
                <p>{this.props.song.release_date}</p>
          </div> }

            <br />
        </div>
    );
  }

}

export default SongCard;

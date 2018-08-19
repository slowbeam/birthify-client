import React, { Component } from 'react';
import ScriptTag from 'react-script-tag';

export default class Script extends Component {



  render(){
    return(
      <ScriptTag isHydrating={true} type="text/javascript" src={this.props.url} />
    )
  }
}

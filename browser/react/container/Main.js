'use strict';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Footer from '../component/Footer';
import SidebarContainer from './SidebarContainer';
import {AUDIO, playMusic, changeSong, forcePosition} from '../Utility';
import { toggle, toggleOne, switchSong } from '../action/albumActions'

class Main extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			progress: 0
		}
		this.scrubber = this.scrubber.bind(this);
		this.keypress = this.keypress.bind(this);

		AUDIO.addEventListener('ended', () => {
  		this.props.switchSong('next'); 
		});
		AUDIO.addEventListener('timeupdate', () => {
  		this.setState({
    		progress: 100 * AUDIO.currentTime / AUDIO.duration
  		});
		});
	}

	scrubber (e) {
		let width = e.nativeEvent.target.scrollWidth;
		let clickPosition = e.nativeEvent.offsetX;
		forcePosition(width, clickPosition);
	}

	keypress (e) {
		if(e.keyCode===39) this.props.switchSong('next');
		if(e.keyCode===37) this.props.switchSong('previous');
	}

	render () {
		return (
			<div id="main" className="container-fluid">
			<div className="col-xs-2">
				<SidebarContainer />
			</div>
			<div className="col-xs-10">
				{this.props.children}
			</div>
				<Footer
					playStatus={this.props.isPlaying}
					toggle={this.props.toggle}
					currentSong={this.props.currentSong}
					switchSong = {this.props.switchSong}
					progress={this.state.progress}
					scrubber={this.scrubber}
					keypress={this.keypress}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	let { currentAlbum, currentSong, isPlaying} = state
	return {
		currentAlbum,
		currentSong,
		isPlaying
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		toggle: () => dispatch(toggle()),
		toggleOne: (song, songList) => dispatch(toggleOne(song, songList)),
		switchSong: (type) => dispatch(switchSong(type))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

'use strict';
import React, {Component, PropTypes} from 'react';
import SongTable from '../component/SongTable';

const Playlist = ({currentPlaylist, currentSong, playSong, deleteSong, draggable, onDragStart, onDragEnter, onDragOver, onDrop, onDragLeave, onDragEnd, dropline}) => {
	
	if(draggable){
		currentPlaylist.songs.sort((songA,songB) => songA.order - songB.order)
	}

	return (
		<div>
			<h3>{currentPlaylist.name}</h3>
			<SongTable 
				songs={currentPlaylist.songs} 
				currentSong={currentSong} 
				playSong={playSong}
				deleteSong={deleteSong} 
				draggable={draggable}
				onDragStart={onDragStart}
				onDragEnter={onDragEnter}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onDragLeave={onDragLeave}
				onDragEnd={onDragEnd}
				dropline={dropline}
				/>
			{!currentPlaylist.songs.length && <small>No songs.</small>}
			<hr/>
		</div>
	)
}

Playlist.propTypes = {
	currentPlaylist: PropTypes.object.isRequired,
	currentSong: PropTypes.object.isRequired,
	playSong: PropTypes.func.isRequired,
	deleteSong: PropTypes.func.isRequired,
	draggable: PropTypes.bool.isRequired
}

export default Playlist
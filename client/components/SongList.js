import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import fetchSongsQuery from '../query/fetchSongsQuery';

import '../style/style.css';

class SongList extends Component {
    deleteHandler(id) {
        this.props.mutate({
            variables: {
                id: id
            }
        }).then(() => this.props.data.refetch());
    }

    detailHandler(id) {
        hashHistory.push(`/song/${id}`);
    }

    renderSongs() {
        return this.props.data.songs.map(song => <li key={song.id} className="collection-item"><span onClick={this.detailHandler.bind(this, song.id)}>{song.title}</span> <i className='material-icons right' onClick={this.deleteHandler.bind(this, song.id)}>delete</i></li>)
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <ul className='collection'>
                    {!this.props.data.loading && this.renderSongs()}
                </ul>
                <Link to="/song/new" className="btn-floating btn-large red right">
                    <i className='material-icons'>add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
            title
        }
    } 
`;

export default graphql(mutation)(graphql(fetchSongsQuery)(SongList));
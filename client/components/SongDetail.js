import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import LyricCreate from './LyricCreate';
import fetchSongDetailQuery from '../query/fetchSongDetailQuery';

class SongDetail extends Component {
    likesHandler(id, likes, content) {
        this.props.mutate({
            variables: {
                id: id
            },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    content: content,
                    likes: likes + 1
                }
            }
        });
    }

    renderSong() {
        console.log("Inside [SongDetail.js] Component...")
        return (
            <div>
                {this.props.data.song.lyrics.length === 0 && <h5>No Lyrics Added...</h5>}
                {this.props.data.song.lyrics.length !== 0 && <ul className='collection'>
                    {this.props.data.song.lyrics.map(item => <li className='collection-item' key={item.id}>{item.content} <i className="material-icons right" onClick={this.likesHandler.bind(this, item.id, item.likes, item.content)}>thumb_up</i><span className='right'>{item.likes}</span></li>)}
                </ul>}
            </div>
        );
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading Data...</div>
        }

        return (
            <div>
                <Link to="/">Back</Link>
                <h4>{this.props.data.song.title}</h4>
                {!this.props.data.loading && this.renderSong()}
                <LyricCreate songId={this.props.data.song.id} />
            </div>
        )
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
            content
        }
    }
`;

export default graphql(mutation)(graphql(fetchSongDetailQuery, {
    options: props => ({
        variables: {
            id: props.params.id
        }
    })
})(SongDetail));
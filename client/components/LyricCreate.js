import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import fetchSongDetailQuery from '../query/fetchSongDetailQuery';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }
    }

    changeHandler(event) {
        this.setState({
            content: event.target.value
        });
    }

    submitHandler(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            },
            // refetchQueries: [{ query: fetchSongDetailQuery, variables: { id: this.props.songId } }]
        });
    }

    render() {
        return (
            <form onSubmit={this.submitHandler.bind(this)}>
                <label>Add Lyric:</label>
                <input type="text" onChange={this.changeHandler.bind(this)} value={this.state.content} />
                <button type="submit">Create</button>
            </form>
        )
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);
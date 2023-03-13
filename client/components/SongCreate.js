import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import fetchSongsQuery from '../query/fetchSongsQuery';

class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    titleChangeHandler(event) {
        this.setState({
            title: event.target.value
        });
    }

    submitHandler(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query: fetchSongsQuery }]
        }).then(() => {
            hashHistory.push('/');
        })
    }

    render() {
        return (
            <div>
                <h4>Create a New Song</h4>
                <form onSubmit={this.submitHandler.bind(this)}>
                    <label>Song Title:</label>
                    <input type="text" onChange={this.titleChangeHandler.bind(this)} value={this.state.title} />

                    <button type="submit">Create Song</button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);
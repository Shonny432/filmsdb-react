import React, { Component } from 'react';

import { getById } from '../api/omdb';

export default class FilmInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      loading: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true });

    getById(nextProps.itemId).then((result) => this.setState({
      item: result,
      loading: false,
    }));
  }

  render() {
    const { item, loading } = this.state;
    if (loading) {
      return <div className="spinner"> ... Loading </div>
    }
    if (!item) {
      return <div> Please select any film </div>
    }

    return (
      <div>
        <img src={item.Poster}  />
        <div>
          <h1> {item.Title} </h1>
          <span> {item.Actors} </span>
          <span> {item.Genre} </span>
        </div>
      </div>
    );
  }
}
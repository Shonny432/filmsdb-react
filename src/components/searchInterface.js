import React, { Component } from 'react';

import { getById, search } from '../api/omdb';

import ListItem from './ListItem';
import SearchField from './SearchField';
import FilmInfo from './FilmInfo';

class SearchInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      items: [],
      pageNumber: 1,
      currentMovie: '',
    };
  }

  componentDidUpdate() {

    if(this.state.items.length === 0) {
      return;
    }
    if(this.wrapper.clientHeight > this.searchList.clientHeight) {
      this.getMovies(this.state.currentMovie, 2)
    }
  }

  onGetDetailsPressed = (itemId) => this.setState({ itemId })

  getMovies = (value, number) => {
    search(value, number).then((result) => this.setState({ items: [...this.state.items, ...result], currentMovie: value }));
  }
  onScroll = (element) => {
    this.wrapper = element;
    element.addEventListener('scroll', (event) => {
    })
  }

  render() {
    const { item, items, itemId } = this.state;
    return (
      <section className={this.props.className}>

        <SearchField onSearch={this.getMovies} />
        <div ref={this.onScroll} className='listHolder'>
          <div ref={element => {this.searchList = element}}>
            { items.map((file) =>
              <ListItem key={file.imdbID} item={file} onGetDetailsPressed={this.onGetDetailsPressed} />
            )}
          </div>
        </div>
        <FilmInfo itemId={itemId} />
      </section>
    );
  }
}

export default SearchInterface;

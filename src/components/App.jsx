/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import '../scss/base.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      query: '',
      focus: {
        images: {
          original: {
            url: '',
          },
          fixed_width: {
            url: '',
            width: 0,
            height: 0,
          },
        },
        description: '',
        username: '',
        rating: '',
      },
      modalStatus: 'hidden',
      limit: 30,
    };
    this.getGifs = this.getGifs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickGif = this.handleClickGif.bind(this);
    this.loadMoreHandler = this.loadMoreHandler.bind(this);
  }

  componentDidMount() {
    this.getGifs();
  }

  getGifs() {
    const { limit, query } = this.state;
    if (query.length === 0) {
      fetch(`/trending?limit=${limit}`,
        {
          method: 'get',
          headers: {
            'Access-Controll-Allow-Origin': '*',
          },
        })
        .then(result => result.json())
        .then((res) => {
          this.setState({
            results: res,
          });
        });
    } else {
      fetch(`/search/${query}?limit=${limit}}`,
        {
          method: 'get',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(result => result.json())
        .then((res) => {
          this.setState({
            results: res,
          });
        });
    }
  }

  loadMoreHandler() {
    const { limit, query } = this.state;
    if (query.length === 0) {
      fetch(`/trending?limit=${limit}`,
        {
          method: 'get',
          headers: {
            'Access-Controll-Allow-Origin': '*',
          },
        })
        .then(result => result.json())
        .then((res) => {
          this.setState({
            limit: limit + 30,
            results: res,
          });
        });
    } else {
      fetch(`/search/${query}?limit=${limit}`,
        {
          method: 'get',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(result => result.json())
        .then((res) => {
          this.setState({
            limit: limit + 30,
            results: res,
          });
        });
    }
  }

  handleChange(e) {
    this.setState({ query: e.target.value, limit: 0 }, () => {
      this.getGifs();
    });
  }

  handleClickGif(e) {
    this.setState({ focus: e.target });
  }

  render() {
    const {
      query, results, focus, modalStatus,
    } = this.state;
    const resultsArray = results.map(el => (
      <div
        className="gif"
        key={el.id}
        onClick={() => {
          this.setState({
            focus: el,
            modalStatus: 'open',
          });
        }}
        role="presentation"
      >
        <div className="gif-container">
          <img className="gif-img" src={el.images.fixed_width.url} alt={el.description} onClick={this.handleClickGif} role="presentation" onKeyDown={this.handleClickGif} />
        </div>
      </div>
    ));
    return (
      <div id="container">
        <div className="title"><h1>Giphy Search</h1></div>
        <div className="search-box">
          <input type="text" className="search-input" placeholder="Search GIFs" value={query} onChange={this.handleChange} />
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreHandler}
          hasMore={true || false}
          getScrollParent={() => document.querySelector('.results')}
          loader={(
            <div className="spinner">
              <div className="rect1" />
              <div className="rect2" />
              <div className="rect3" />
              <div className="rect4" />
              <div className="rect5" />
            </div>
          )}
        >
          <div className="results" ref={(ref) => { this.scrollParentRef = ref; }}>
            <div className={`modal ${modalStatus}`}>

              <div className="modal-content">
                <div className="inner-content">
                  <a
                    href="#"
                    className="close"
                    onClick={() => { this.setState({ modalStatus: 'hidden' }); }}
                    onKeyDown={() => { this.setState({ modalStatus: 'hidden' }); }}
                    role="button"
                  />
                  <img className="modal-img" src={focus.images.fixed_width.url} alt={focus.description} />
                  <div className="author">Username: {focus.username || 'Unknown'}</div>
                  <div className="rating">Rating: {focus.rating.toUpperCase()}</div>
                </div>
              </div>
            </div>
            {resultsArray}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;

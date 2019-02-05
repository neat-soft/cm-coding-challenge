import React from 'react';
import { connect } from 'react-redux';
import { Table, Input } from 'antd';
const Search = Input.Search;

const search = searchTerm => article =>
  article.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  article.year.toLowerCase().includes(searchTerm.toLowerCase())
const columns = [{
  title: 'Id',
  dataIndex: 'id',
  sorter: (a, b) => a.id.localeCompare(b.id),
  key: 'id',
}, {
  title: 'Title',
  dataIndex: 'title',
  sorter: (a, b) => a.title.localeCompare(b.title),
  key: 'title',
}, {
  title: 'Description',
  dataIndex: 'description',
  sorter: (a, b) => a.description.localeCompare(b.description),
  key: 'description',
}, {
  title: 'Year',
  dataIndex: 'year',
  sorter: (a, b) => a.year.localeCompare(b.year),
  key: 'year',
}];

const pagination = {
  showSizeChanger: true,
  pageSizeOptions: ['10', '25', '50']
};

const App = ({ articles, searchTerm, onSearch }) => {
  articles = articles.filter(search(searchTerm));
  articles = articles.map(a => (
    {
      ...a,
      key: a.id,
    }
  ));
  return (
    <div>
       <Search
        placeholder="input search text"
        onChange={e => onSearch(e.target.value)}
        style={{width: 300}}
        enterButton
      />
      <Table dataSource={articles} columns={columns} pagination={pagination} />
    </div>
  )
}

// connecting view layer to state layer with react-redux

const mapStateToProps = state => ({
  articles: state.articlesState.articles,
  searchTerm: state.searchState.searchTerm,
});

const mapDispatchToProps = dispatch => ({
  onSearch: searchTerm => dispatch({ type: 'SEARCH_SET', searchTerm }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

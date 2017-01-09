import {debounce} from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Relay, {
    createContainer,
    Route as RelayRoute,
    RootContainer
} from 'react-relay';
import 'whatwg-fetch';

import Quote from './quote';
import SearchForm from './search-form';

class QuotesLibrary extends Component{
    search(searchTerm){
        this.props.relay.setVariables({searchTerm});
    }
    
    constructor(props){
        super(props);
        this.search = debounce(this.search.bind(this), 300);
    }
    
    render(){
        const quotes = this.props.library.quotesConnection.edges.map(({node}) => 
        <Quote key={node.id} quote={node} />);
        return (
            <div className="quotes-library">
                <SearchForm searchAction={this.search} />
                <div className="quotes-list">
                    { quotes }
                </div>
            </div>
        );
    }
}

QuotesLibrary = createContainer(QuotesLibrary, {
    initialVariables: {
        searchTerm: ''
    },
    fragments: {
        library: () => Relay.QL `
            fragment AllQuotes on QuotesLibrary {
                quotesConnection(first: 100, searchTerm: $searchTerm){
                    edges {
                        node {
                            id
                            ${Quote.getFragment('quote')}
                        }
                    }
                }
            }
        `
    }
});

class AppRoute extends RelayRoute {
    static routeName = 'App';
    static queries = {
        library: (Component) => Relay.QL `
            query QuotesLibrary {
                quotesLibrary {
                    ${Component.getFragment('library')}
                }
            }
        `
    }
}

ReactDOM.render(
    <RootContainer
        Component={ QuotesLibrary }
        route={ new AppRoute() } />,
    document.getElementById('react')
);
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Relay, {
    createContainer,
    Route as RelayRoute,
    RootContainer
} from 'react-relay';
import 'whatwg-fetch';

import Quote from './quote';

class QuotesLibrary extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const quotes = this.props.library.quotesConnection.edges.map(({node}) => 
        <Quote key={node.id} quote={node} />);
        return (
            <div className="quotes-list">
                { quotes }
            </div>
        );
    }
}

QuotesLibrary = createContainer(QuotesLibrary, {
    fragments: {
        library: () => Relay.QL `
            fragment AllQuotes on QuotesLibrary {
                quotesConnection(first: 2){
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
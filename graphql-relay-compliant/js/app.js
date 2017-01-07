import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Relay, {
    createContainer,
    Route as RelayRoute,
    RootContainer
} from 'react-relay';
import 'whatwg-fetch';

import Quote from './quote';

console.log(
    Relay.QL `query AllQuotes {
        allQuotes{
            id
            text
            author
        }
    }`
);

class QuotesLibrary extends Component{
    state = { allQuotes: [] };
    constructor(props){
        super(props);
    }
    
    render(){
        const quotes = this.state.allQuotes.map(quote => 
        <Quote key={quote.id} quote={quote} />);
        return (
            <div className="quotes-list">
                { quotes }
            </div>
        );
    }
    
    componentDidMount(){
        fetch(`/graphql?query={
                            allQuotes {
                                id,
                                text,
                                author
                            }
                        }`)
            .then(response => response.json())
            .then(function(json){
                this.setState(json.data);
            }.bind(this))
            .catch(ex => console.error(ex));
    }
}

QuotesLibrary = createContainer(QuotesLibrary, {
    fragments: {}
});

class AppRoute extends RelayRoute {
    static routeName = 'App';
}

ReactDOM.render(
    <RootContainer
        Component={ QuotesLibrary }
        route={ new AppRoute() } />,
    document.getElementById('react')
);
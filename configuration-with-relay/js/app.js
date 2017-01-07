import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import 'whatwg-fetch';


import Quote from './quote';

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

ReactDOM.render(<QuotesLibrary />, document.getElementById('react'));
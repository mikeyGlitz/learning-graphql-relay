import React, {Component} from 'react';
import Relay, {createContainer} from 'react-relay';

function Likes(props){
    return (
        <div>
            {props.likes}
            <span className="glyphicon glyphicon-thumbs-up">
            </span>
        </div>
    );
}

class Quote extends Component {
    showLikes(){
        this.props.relay.setVariables({ showLikes: true });
    }
    
    constructor(props){
        super(props);
    }
    
    render(){
        const {relay, quote: {text, author} } = this.props;
        return(
            <blockquote onClick={ this.showLikes.bind(this) } >
                <p>{ text }</p>
                <footer>{ author }</footer>
                { relay.variables.showLikes && <Likes likes=quote.likesCount /> }
            </blockquote>
        );
    }
}

export default createContainer(Quote, {
    initialVariables: {
        showLikes: false
    },
    fragments: {
        quote: () => Relay.QL `
            fragment OneQuote on Quote {
                text
                author
                likesCount @include(if: $showLikes)
            }
        `
    }
});
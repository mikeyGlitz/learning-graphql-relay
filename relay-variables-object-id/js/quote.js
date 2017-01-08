import React, {Component} from 'react';
import Relay, {createContainer} from 'react-relay';

function Likes(props){
    return (
        <div>
            {props.likes}&nbsp;
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
        const {showLikes} = relay.variables;
        return(
            <blockquote onClick={ this.showLikes.bind(this) } role={ !showLikes && 'button'} >
                <p>{ text }</p>
                <footer>{ author }</footer>
                { showLikes && <Likes likes={ this.props.quote.likesCount } /> }
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
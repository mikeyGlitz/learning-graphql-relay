import React from 'react';
import Relay, {createContainer} from 'react-relay';

function Quote (props){
    const {quote: {text, author} } = props;
    return(
        <blockquote>
            <p>{text}</p>
            <footer>{author}</footer>
        </blockquote>
    );
}

export default createContainer(Quote, {
    fragments: {
        quote: () => Relay.QL `
            fragment OneQuote on Quote {
                text
                author
            }
        `
    }
});
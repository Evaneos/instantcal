import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId } from '../../config';

export default class Html extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        css: PropTypes.string,
        body: PropTypes.string.isRequired,
        roomStatus: PropTypes.boolean,
    };

    static defaultProps = {
        title: '',
        description: '',
    };

    trackingCode() {
        return ({__html:
        `(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=` +
        `function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;` +
        `e=o.createElement(i);r=o.getElementsByTagName(i)[0];` +
        `e.src='https://www.google-analytics.com/analytics.js';` +
        `r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));` +
        `ga('create','${googleAnalyticsId}','auto');ga('send','pageview');`,
        });
    }

    render() {
        return (
            <html className="no-js" lang="">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>{this.props.title}</title>
                <meta name="description" content={this.props.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <link rel="stylesheet" href="style.css" />
                <style id="css" dangerouslySetInnerHTML={{__html: this.props.css}} />
            </head>
            <body>
            <div id="app" dangerouslySetInnerHTML={{__html: this.props.body}} />
            <script src="/jspm_packages/system.js"></script>
            <script src="/config.js"></script>
            <script dangerouslySetInnerHTML={{__html: "window.roomStatus ="+ this.props.roomStatus}}></script>
            <script dangerouslySetInnerHTML={{__html: "window.webSocketPort ="+ this.props.webSocketPort}}></script>
            <div dangerouslySetInnerHTML={{__html: '<script src="//'+this.props.hostname+':'+this.props.webSocketPort+'/socket.io/socket.io.js"></script>'  }} />
            <script dangerouslySetInnerHTML={{__html: "System.import('js/main.js')"}}></script>
            <script dangerouslySetInnerHTML={this.trackingCode()} />
            </body>
            </html>
        );
    }

}

import React, { Component, PropTypes } from 'react';
import { googleAnalyticsId } from '../../config';
import { production } from '../server/argv';

export default class Html extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        css: PropTypes.string,
        body: PropTypes.string.isRequired,
        hostname: PropTypes.string.isRequired,
        webSocketPort: PropTypes.number.isRequired,
        rooms: PropTypes.array.isRequired,
        mainRoomName: PropTypes.string,
        otherRoomNames: PropTypes.array.isRequired,
        kiosk: PropTypes.bool,
        noninteractive: PropTypes.bool,
        hideCursor: PropTypes.bool,
    };

    static defaultProps = {
        title: '',
        description: '',
    };

    trackingCode() {
        return ({ __html:
            '(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=' +
            'function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;' +
            'e=o.createElement(i);r=o.getElementsByTagName(i)[0];' +
            'e.src=\'https://www.google-analytics.com/analytics.js\';' +
            'r.parentNode.insertBefore(e,r)}(window,document,\'script\',\'ga\'));' +
            `ga('create','${googleAnalyticsId}','auto');ga('send','pageview');`,
        });
    }

    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <title>{this.props.title}</title>
                    <meta name="description" content={this.props.description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                    <link href="https://fonts.googleapis.com/css?family=Arvo:400,700" rel="stylesheet" type="text/css" />
                    <link rel="stylesheet" href="style.css" />
                    <style id="css" dangerouslySetInnerHTML={{ __html: this.props.css }} />
                    {this.props.hideCursor ? <style dangerouslySetInnerHTML={{ __html: 'body{cursor: none' }} /> : null}
                </head>
                <body>
                    <div id="disconnected"><div>disconnected</div></div>
                    <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
                    <script dangerouslySetInnerHTML={{__html:
                        "window.rooms ="+ JSON.stringify(this.props.rooms.map(r => r._toJson())) + ";"
                        + "window.mainRoomName ="+ JSON.stringify(this.props.mainRoomName) + ";"
                        + "window.otherRoomNames ="+ JSON.stringify(this.props.otherRoomNames) + ";"
                        + "window.webSocketPort ="+ this.props.webSocketPort + ";"
                        + "window.KIOSK ="+ (this.props.kiosk ? 'true' : 'false') + ";"
                        + "window.NONINTERACTIVE ="+ (this.props.noninteractive ? 'true' : 'false') + ";"

                    }}></script>
                    <div dangerouslySetInnerHTML={{__html: '<script src="//'+this.props.hostname+':'+this.props.webSocketPort+'/socket.io/socket.io.js"></script>'  }} />
                    <div dangerouslySetInnerHTML={{__html: production ? '<script src="/main-sfx.js"></script>' :
                        `<script src="/jspm_packages/system.js"></script>
                        <script src="/config.js"></script>
                        <script src="/js/common.js"></script>
                        <script>System.import('js/main.js')</script>` }}></div>
                </body>
            </html>
        );
    }

}

import { version as packageVersion } from '../../package.json';
import render from 'fody';
import DefaultApp from 'fody-app';
import Html from '../components/Html';

export default function renderHtml({ View, data, htmlData }) {
    htmlData = Object.assign({
        title: '',
    }, htmlData);

    return render({
        context: {
            config: new Map([['version', packageVersion]]),
        },
        htmlData: htmlData,
        Html,
        View,
        data,
        App: DefaultApp,
    });
}

import React from 'react';
import Router from 'react-routing/src/Router';
import App from '../components/App/App';
import IndexPage from '../components/IndexPage/IndexPage';
import { isBusy } from '../googleCalendar';

const router = new Router(on => {
    //on('*', async (state, next) => {
    //    const component = await next();
    //    return component && <App context={state.context}>{component}</App>;
    //});

    on('/', async (state, next) => {
        let isBusy = await isBusy();
        return <App context={state.context}><IndexPage isBusy={isBusy}/></App>;
    });

    //
    //on('/contact', async () => <ContactPage />);
    //
    //on('/login', async () => <LoginPage />);
    //
    //on('/register', async () => <RegisterPage />);
    //
    //on('*', async (state) => {
    //  const content = await http.get(`/api/content?path=${state.path}`);
    //  return content && <ContentPage {...content} />;
    //});
    //
    //on('error', (state, error) => state.statusCode === 404 ?
    //  <App context={state.context} error={error}><NotFoundPage /></App> :
    //  <App context={state.context} error={error}><ErrorPage /></App>
    //);
});

export default router;

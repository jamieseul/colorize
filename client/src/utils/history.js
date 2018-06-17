import createHistory from 'history/createBrowserHistory'

const history = createHistory();
history.listen(location => {});

export default history;
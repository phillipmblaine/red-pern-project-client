let APIURL: string = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break
    case 'red-pern-project.herokuapp.com':
        APIURL = 'http://red-pern-project.herokuapp.com';
}
export default APIURL;
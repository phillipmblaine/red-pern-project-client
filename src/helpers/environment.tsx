let APIURL: string = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break
    case 'pmb-red-pern-project-client.herokuapp.com':
        APIURL = 'https://pmb-red-pern-project-client.herokuapp.com';
}
export default APIURL;
const dropboxConfig = require('../config/dropbox');
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox');

const dbx = new Dropbox.Dropbox({fetch, accessToken: dropboxConfig.key});

const saveFile = (file) => {
    return new Promise((resolve, reject) => {
        dbx.filesUpload({path: '/' + getRandomName(), contents: file})
            .then(async function (response) {
                let data = await dbx.sharingCreateSharedLinkWithSettings({path: "/" + response.name});
                resolve(getValidShareUrl(data.url));
            })
            .catch(function (error) {
                console.error(error);
            });
    })
};

//It is magic hack for display image by url.
const getValidShareUrl = (url) => {
    return url.replace("www", "dl").replace("?dl=0", "")
};

const getRandomName = () => {
    return '_' + Math.random().toString(36).substr(2, 16);
};

module.exports = {
    saveFile
};

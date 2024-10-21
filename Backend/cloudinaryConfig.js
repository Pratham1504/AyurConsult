const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dkzcankyc',
    api_key: '958937968294578',
    api_secret: 'p1mhKsVGRlnPpYrAcO-kx_KuegI',
});

module.exports = cloudinary;

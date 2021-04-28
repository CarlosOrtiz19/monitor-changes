import axios from 'axios';


const BASE_URL = "http://localhost:8080/watch";
const URL_NODE_SERVER = "http://localhost:4000";

class ImageService {

    async setState(url, session, cookie, start) {
        return axios.put(BASE_URL + "/screenshot/run?url=" + url + "&session=" + session + "&cookie=" + cookie + "&start=" + start);
    }
    async getScreenShot(url) {
        return axios.get(URL_NODE_SERVER + "/screenshot/?url=" + url, {
            responseType: 'arraybuffer'
        }).then(response => {
            const buffer = Buffer.from(response.data, 'base64');
        }).catch(ex => {
            console.error(ex);
        });

    }

    async saveInfoCrop(crop, url,email) {


        //let data = new FormData();
        ///data.append('file',crop)
        /*data.append('name',_image.name)
        data.append('top',crop.x)
        data.append('bottom',crop.y)
        data.append('width',crop.width)
        data.append('height', crop.height)

        console.log(crop.x)
        console.log(crop.y)
        console.log(crop.width)
        console.log(crop.height)*/


        return axios.get(URL_NODE_SERVER + "/cropImageSize/?url=" + url +
            "&top=" + crop.x +
            "&left=" + crop.y +
            "&width=" + crop.width +
            "&height=" + crop.height+
            "&email="+email)
            .then(res => console.log(res))
            .catch(err => console.log(err.response))
    }

}

export default new ImageService()
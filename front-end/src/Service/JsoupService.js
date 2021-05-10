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


    async getAllMonitorsByEmail(email) {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return axios.get(BASE_URL + "/search/" + email, config)

    }

    async saveInfoCrop(_crop, _url, _email) {
        let crop = {
            x: Number.parseFloat(_crop.x),
            y: Number.parseFloat(_crop.y),
            width: Number.parseFloat(_crop.width),
            height: Number.parseFloat(_crop.height),
            url: _url,
            email: _email
        }

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        return axios.post(BASE_URL + "/saveCropInfo/", crop, config)
            .then(res => console.log(res))
            .catch(err => console.log(err.response))
    }


}

export default new ImageService()
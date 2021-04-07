import axios from 'axios';


const BASE_URL = "http://localhost:8080/watch";

class ImageService{

    async setState(url,session,cookie,start){
        return axios.put(BASE_URL + "/run?url="+ url + "&session="+ session +  "&cookie=" + cookie +"&start=" +start);
    }
    async getScreenShot(url){
        return axios.get("http://localhost:4000/screenshot?url="+url, {
            responseType: 'arraybuffer'
          }).then(response => {
              const buffer = Buffer.from(response.data, 'base64');
          }).catch(ex => {
            console.error(ex);
          });
    
    }

    

}

export default new ImageService()
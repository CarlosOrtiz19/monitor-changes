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

    async saveInfoCrop(_image,crop){
        
       
        let data = new FormData();
        data.append('file',crop)
        /*data.append('name',_image.name)
        data.append('top',crop.x)
        data.append('bottom',crop.y)
        data.append('width',crop.width)
        data.append('height', crop.height)

        console.log(crop.x)
        console.log(crop.y)
        console.log(crop.width)
        console.log(crop.height)*/

        return axios.post(BASE_URL+"/saveCropInfo",data,{
            headers: {
                 'content-type': 'multipart/form-data'  
             }
        }).then(res => console.log(res))
        .catch(err=>console.log(err))
    }

}

export default new ImageService()
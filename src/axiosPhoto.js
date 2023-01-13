import axios from 'axios';
export default function axiosPhoto(name, namberPage, namberPer_page) {
  return axios.get(
    //`https://pixabay.com/api/?key=32593559-7c2a9151c20a25b0c125348ad&q=${name}&page=${namberPage}&per_page=${namberPer_page}&orientation=horizontal&safesearch=true&image_type=photo`
    //`https://api.themoviedb.org/3/movie/700?api_key=c861fc623ae12b9b041c6dade1c99e57&query=${name}&page=${namberPage}`
    `https://api.themoviedb.org/3/search/movie?api_key=c861fc623ae12b9b041c6dade1c99e57&query=${name}&page=${namberPage}&language=en-US&include_adult=false`
    //`https://api.themoviedb.org/3/search/keyword?api_key=c861fc623ae12b9b041c6dade1c99e57&query=${name}&{namberPage}`
  );
}
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

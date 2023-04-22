import ndjsonStream from 'can-ndjson-stream';
import { useEffect, useState } from 'react';
import TVShowDetailCard from './TVShowDetailCard';

function TVShowDetails() {
    const [apiShowData, setAPIShowData] = useState([{"name":"","language":"","genres":["",""],"premiered":"","ended":"","officialSite":"","schedule":{"time":"","days":[]},"image":{"medium":"","original":""},"summary":""}]);
    const [showID, setShowID] = useState(0);
    //we must stream the data from the API, because it is too large and can block the browser
    let all_data = [];
    const fetchNdjsonShow = async () => {
      const response = await fetch("https://api.tvmaze.com/shows/"+window.location.href.split('/').pop());
      const exampleReader = ndjsonStream(response.body).getReader();
    
      let result;
      while (!result || !result.done) {
        result = await exampleReader.read();
        all_data.push(result.value);
      }
      setAPIShowData(all_data);
    }
    useEffect(()=>{
      fetchNdjsonShow()
    },[])
    

    useEffect(()=>{
      setShowID(window.location.href.split('/').pop())
    },[])
    useEffect(() => {
      console.log(apiShowData)
    },[apiShowData])
  
    return (
      <>
        <TVShowDetailCard imageURL={apiShowData[0].image.original} title={apiShowData[0].name} summary={apiShowData[0].summary.replace(/<\/?[^>]+(>|$)/g, "")}/>
       </>
    );
  }

export default TVShowDetails;
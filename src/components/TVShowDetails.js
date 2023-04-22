import ndjsonStream from 'can-ndjson-stream';
import { useEffect, useState } from 'react';
import TVShowDetailCard from './TVShowDetailCard';

function TVShowDetails() {
  //we need a sample initial state otherwise it doesn't work, because of react-router
    const [apiShowData, setAPIShowData] = useState([{"name":"","language":"","genres":["",""],"premiered":"","ended":"","officialSite":"","schedule":{"time":"","days":[]},"image":{"medium":"","original":""},"summary":""}]);
    //stream data from API just like homepage
    let all_data = [];
    const fetchNdjsonShow = async () => {
      const response = await fetch("https://api.tvmaze.com/shows/"+window.location.href.split('/').pop());
      const exampleReader = ndjsonStream(response.body).getReader();

      let result;
      while (!result || !result.done) {
        result = await exampleReader.read();
        all_data.push(result.value);
      }
      setAPIShowData(all_data);//set api data
    }
    useEffect(()=>{
      fetchNdjsonShow()//call api once
    },[])

    return (
      <>
    {apiShowData.map((item)=>{
        if(item.image != null){
          return(
        <TVShowDetailCard title={item.name} summary={item.summary.replace(/<\/?[^>]+(>|$)/g, "")}/>
    )}
    else {
      return(
        <TVShowDetailCard imageURL={item.image.original} title={item.name} summary={item.summary.replace(/<\/?[^>]+(>|$)/g, "")}/>
    )}
    }
    )}
        </>
    );
  }

export default TVShowDetails;
import TVShowCard from './TVShowCard';
import ndjsonStream from 'can-ndjson-stream';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import TVShowDetailCard from './TVShowDetailCard';
import { useLocation  } from 'react-router-dom';
function TVShowDetails() {
    const [apiData, setAPIData] = useState([]);
    const [showID, setShowID] = useState(0);
    //we must stream the data from the API, because it is too large and can block the browser
    let all_data = [];
    const fetchNdjson = async () => {
      const response = await fetch("https://api.tvmaze.com/shows/"+showID);
      const exampleReader = ndjsonStream(response.body).getReader();
    
      let result;
      while (!result || !result.done) {
        result = await exampleReader.read();
        all_data.push(result.value);
        //console.log(result.done, result.value); //result.value is one line of your NDJSON data
      }
      //console.log(all_data[0][5519])
      setAPIData(all_data[0]);
    }

    const location = useLocation();
    setShowID(location.pathname.split('/').pop())
    useEffect(()=>{
        fetchNdjson()
    },[showID])
    useEffect(() => {
      console.log(apiData)
    },[apiData])
  
    return (
      <>
        <TVShowDetailCard imageURL={apiData.image.original} title={apiData.name} summary={apiData.summary}/>
      </>
    );
  }

export default TVShowDetails;
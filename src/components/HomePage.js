import TVShowCard from './TVShowCard';
import ndjsonStream from 'can-ndjson-stream';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

function HomePage() {

    const [apiData, setAPIData] = useState([]);
    //we must stream the data from the API, because it is too large and can block the browser
    let all_data = [];
    const fetchNdjson = async () => {
      const response = await fetch("https://api.tvmaze.com/schedule/web?date="+String(new Date().toISOString().split('T')[0]));
      const exampleReader = ndjsonStream(response.body).getReader();

      let result;
      while (!result || !result.done) {
        result = await exampleReader.read();
        all_data.push(result.value);
      }
      setAPIData(all_data[0]);
    }

    useEffect(() => {
      fetchNdjson();
    },[])

    useEffect(() => {
      console.log(apiData)
    },[apiData])

    return (
      <>
        <Box sx={{ flexGrow: 1 }} ml="10vw">
        <Grid container spacing={2}>

            {apiData.map((item) => {
          if (item.image != null && item.summary != null){

          return (<Grid item xs={4}>
            <Link to={`/showdetails/${item._embedded.show.id}`}>
            <TVShowCard className="tv-show-card" title={item._embedded.show.name} imageURL={item.image.medium} date={String(item.airdate+" "+item.airtime)} summary={item._embedded.show.summary.replace(/<\/?[^>]+(>|$)/g, "")} key={item.id}/>
                  </Link>
                  </Grid>)
          }
        })}
        </Grid>
      </Box>
      </>
    );
  }

export default HomePage;
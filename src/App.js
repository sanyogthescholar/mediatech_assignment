import logo from './logo.svg';
import './App.css';
import TVShowCard from './components/TVShowCard';
import ndjsonStream from 'can-ndjson-stream';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function App() {

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
      //console.log(result.done, result.value); //result.value is one line of your NDJSON data
    }
    //console.log(all_data[0][5519])
    setAPIData(all_data[0]);
  }
  //fetchNdjson();
  useEffect(() => {
    fetchNdjson();
  },[])
  useEffect(() => {
    console.log(apiData)
  },[apiData])

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>

          {apiData.map((item) => {
        if (item.image != null && item.summary != null){
          
        return (<Grid item xs={4}>
          <TVShowCard title={item.name} imageURL={item.image.medium} date={String(item.airdate+" "+item.airtime)} summary={item.summary.replace(/<\/?[^>]+(>|$)/g, "")}/>
                </Grid>)
        }
        else {
         
          return ( <Grid item xs={4}><TVShowCard title={item.name} date={String(item.airdate+" "+item.airtime)}/>
          </Grid>)
        }
      })}

      </Grid>
    </Box>
      <TVShowCard title="Hello 1st card"/>
    </div>
  );
}

export default App;

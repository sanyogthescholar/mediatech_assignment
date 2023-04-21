import ndjsonStream from 'can-ndjson-stream';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TVShowDetails(){
    const [showData, setShowData] = useState([]);
    var all_data = [];
    let { id } = useParams();
    console.log(id)
const fetchShowData = async () => {
    const response = await fetch("https://api.tvmaze.com/shows/"+id);
    const exampleReader = ndjsonStream(response.body).getReader();
  
    let result;
    while (!result || !result.done) {
      result = await exampleReader.read();
      all_data.push(result.value);
      //console.log(result.done, result.value); //result.value is one line of your NDJSON data
    }
    setShowData(all_data[0]);
  }
  useEffect(() => {
    fetchShowData();
  },[])
  useEffect(() => {
    console.log(showData)
  },[showData])

  return (<div>Hello World</div>)
}

export default TVShowDetails;
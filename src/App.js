import logo from './logo.svg';
import './App.css';
import TVShowCard from './components/TVShowCard';
import ndjsonStream from 'can-ndjson-stream';

function App() {
  //we must stream the data from the API, because it is too large and can block the browser
  const fetchNdjson = async () => {
    const response = await fetch("https://api.tvmaze.com/schedule/full");
    const exampleReader = ndjsonStream(response.body).getReader();
  
    let result;
    let all_data = [];
    while (!result || !result.done) {
      result = await exampleReader.read();
      all_data.push(result.value);
      console.log(result.done, result.value); //result.value is one line of your NDJSON data
    }
    //console.log(all_data[0][5520])
  }
  fetchNdjson();

  return (
    <div className="App">
      <TVShowCard title="Hello 1st card"/>
    </div>
  );
}

export default App;

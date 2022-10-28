import './App.css';
import Banner from './Components/Banner/Banner';
import Card from './Components/Card/Card';
import Navbar from './Components/Navbar/Navbar';
import {originals, action, comedy, romance, documentary} from './urls'

function App() {
  return (
    <div class="App">
      <Navbar />
      <Banner />
      <Card title='Netflix Originals' url={originals} isLarge />
      <Card title='Action' url={action} />
      <Card title='Documentary' url={documentary} />
      <Card title='Comedy' url={comedy} />
      <Card title='Romance' url={romance} />
    </div>
  );
}

export default App;

import DoughnutChart from "./components/Chart";
import mock from './mock.json'

function App() {
  return (
    <div className="App">
      <DoughnutChart dataChart={mock} title={mock.title}/>
    </div>
  );
}

export default App;

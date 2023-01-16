import supertal_logo from './supertal_logo.png';
import './mySttyles.css';
import ContainerComponent from './components/containerComponent';

function App() {
  return (
    <div >

      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <img src={supertal_logo} alt="logo" style={{ height: 150 }} />
      </div>
      <hr />
      <ContainerComponent />

    </div>
  );
}

export default App;

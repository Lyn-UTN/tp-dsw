import Card, { CardBody } from './components/Card';
import List from './components/List.tsx';

function App() {
  const list = ['Cocheras', 'Autos', 'Usuarios'];
  return (
    <Card>
      <CardBody title="AIRBNG" text="Mensaje random" />
      <List data={list} />
    </Card>
  );
}

export default App;

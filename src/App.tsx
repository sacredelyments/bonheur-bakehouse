import { Route, Switch } from 'wouter';
import { Layout } from '@/components/Layout';
import { OrderProvider } from '@/context/OrderContext';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Menu from '@/pages/Menu';
import Bakes from '@/pages/Bakes';
import Celebrate from '@/pages/Celebrate';
import Visit from '@/pages/Visit';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/not-found';

function App() {
  return (
    <OrderProvider>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/founders" component={About} />
          <Route path="/menu" component={Menu} />
          <Route path="/bakes" component={Bakes} />
          <Route path="/celebrate" component={Celebrate} />
          <Route path="/visit" component={Visit} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </OrderProvider>
  );
}

export default App;
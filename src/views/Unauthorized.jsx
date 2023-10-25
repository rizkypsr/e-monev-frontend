import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-screen space-y-3">
    <h1>You do not have permission to access this page.</h1>

    <Link to="/">
      <Button text="Kembali" />
    </Link>
  </div>
);

export default Unauthorized;

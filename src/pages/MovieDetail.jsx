import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const MovieDetail = () => {
  
  const { id } = useParams();

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white">Movie Details</h1>
      <p className="text-lg text-gray-300 mt-4">
        Showing details for movie with ID: {id}
      </p>
      {/* All the detailed movie information will go here */}
    </Layout>
  );
};

export default MovieDetail;

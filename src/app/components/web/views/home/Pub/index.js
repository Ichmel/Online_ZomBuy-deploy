import React, { useEffect, useState } from 'react';
import { GetCategoryDetails } from '../../../../services';
import { Row, Col, } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';


const Pub = () => {
  const [getList, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Define a loading state

  const titre = 'homevideo';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetCategoryDetails.getafficheVideohome(titre);
        console.log(response);
        setList(response.data);
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false on error
      }
    }

    fetchData();
  }, [titre]);

  console.log(getList);

  return (
    <section>
      {loading ? ( // Display loading message while loading is true
        <div className="progress-bar-bk">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Row className='contenu'>
          <Col lg='6' className='magin'>
            <video controls className='video'>
              <source src={getList.video}  type='video/mp4' />
            </video>
          </Col>

          <Col lg='6' className=' pub mt-2'>
            <p className='text-white'>{getList.text}</p>
          </Col>
        </Row>
      )}
    </section>
  );
};

export default Pub;

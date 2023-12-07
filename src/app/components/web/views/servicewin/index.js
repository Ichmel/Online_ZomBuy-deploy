import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetCategoryDetails } from '../../../services';

const Service = () => {
  const [getList, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetCategoryDetails.getafficheService();
        console.log('service', response);
        setList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(getList);

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom border-white single-product-header-bk ">
      <div className="container">
      <div className='d-flex justify-content-center text-center mt-5'>
          <h2>NOS PROPOSITIONS  DE SERVICES </h2>
        </div>
        {getList.map((row, index) => (
          <Row className=' mt-5 sercontenu' key={index} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <Col lg='6' className='mb-5' >
              <div>
                <img className="service" src={`http://localhost:4001/${row.photo}`} alt="product" />
              </div>
            </Col>

            <Col lg='6'>
            <div className='d-flex justify-content-center text-center mt-2 mb-4'>
              <h3>{row.titre} </h3>
              </div>
              <p className='servtext'>{row.text}</p>
            </Col>
          </Row>
        ))}
         </div>
      </section>
    </div>
  );
};

export default Service;

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetCategoryDetails } from '../../../services';

const Blog = () => {
  const [getList, setList] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetCategoryDetails.getafficheblog();
        console.log('service', response);
        setList(response.data);
       
      } catch (error) {
        console.error(error);
       
      }
    }

    fetchData();
  }, []);

  

 

  console.log(getList);

  return (
    <div>
      <section className="pt-3 pb-3 page-info section-padding border-bottom border-white single-product-header-bk ">
      <section className="shop-list section-padding">
        <div className="contenu">
          <div className='d-flex justify-content-center text-center mt-5 mb-3'>
            <h2> BLOGS </h2>
          </div>
         
          <Row  className='mb-5' style={{ border: '1px solid #ddd', padding: '10px' }}> 
          {getList.map((row, index) => (
        
              <Col lg='4'  md='6'   key={index} className='p-3' >
            
            <div className='d-flex justify-content-center text-center p-2 '>
             <h3>{row.titrevideo} </h3>
           </div>
            
              <video controls className='videoserv '>
              <source src={`http://localhost:4001/${row.video}`} type='video/mp4' />
            </video>
              </Col>
          
          ))}
           </Row>
          



           <Row className=' mt-5 ' style={{ border: '1px solid #ddd', padding: '10px' }}>
          {getList.map((row, index) => (
          
              <Col lg='3' md='4' className='p-3' key={index} >
                <div className='d-flex justify-content-center text-center p-2 '>
             <h3>{row.titrevideo} </h3>
           </div>
                <p className='servtext'>{row.textvideo} </p>
              </Col>

          ))}
           </Row>
        </div>
        </section>
      </section>
    </div>
  );
};

export default Blog;

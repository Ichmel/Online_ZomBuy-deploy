import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetCategoryDetails } from '../../../../services';

const Datecomp = () => {
  const [getList, setList] = useState([]);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetCategoryDetails.getbackgroundList('date');
        console.log(response);
        setList(response.data);
        console.log('days', response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  let interval;

 
  const countDown = () => {
    const destinationDescription = getList.length > 0 ? getList[0].description : '';
    const destination = new Date(destinationDescription).getTime();

    console.log('dest',destination)

    interval = setInterval(() => {
      const now = new Date().getTime();

    
      const difference = destination - now;
      

      // Assurez-vous que les valeurs ne deviennent pas négatives
      const newDays = ( Math.floor(difference / (1000 * 60 * 60 * 24)));
      const newHours = ( Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const newMinutes = ( Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
      const newSeconds = ( Math.floor((difference % (1000 * 60)) / 1000));

      if (difference < 0) {
        clearInterval(interval);
        // Mettez à jour l'état ou effectuez une action lorsque le compte à rebours atteint zéro
      } else {
        setDays(newDays || 0 );
        setHours(newHours || 0);
        setMinutes(newMinutes || 0);
        setSeconds(newSeconds || 0);
      }
    });
  };

  useEffect(() => {
    countDown();
    return () => {
      clearInterval(interval); // Nettoyer l'intervalle lorsqu'un composant est démonté
    };
  }, [getList]); // Assurez-vous de réinitialiser l'intervalle si la liste change

  return (
  <div>
      {
        getList.map((item, index) => (
          <section className=' pub mt-5 '>
          <Row className='contenu ' key={index}>
            <Col lg='8'>
              <div className='data'>
                <h2 className='text-white mb-5'>DELAI DE L' ARRIVAGE  </h2>
              </div>
              <div className='clock__wrapper d-flex align-items-center mt-3 '>
                <div className='clock__data d-flex align-items-center '>
                  <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{days} </h1>
                    <h5 className='text-white fs-6'>Jours</h5>
                  </div>
                  <span className='text-white  point'>:</span>
                </div>
                <div className='clock__data d-flex align-items-center gap-3'>
                  <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{hours} </h1>
                    <h5 className='text-white fs-6'>Heurs</h5>
                  </div>
                  <span className='text-white point'> :</span>
                </div>
                <div className='clock__data d-flex align-items-center gap-3'>
                  <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{minutes} </h1>
                    <h5 className='text-white fs-6'>Minutes</h5>
                  </div>
                  <span className='text-white point'>:</span>
                </div>
                <div className='clock__data d-flex align-items-center gap-3'>
                  <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{seconds} </h1>
                    <h5 className='text-white fs-6'>Seconds</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg='4'>
              <div className='dateimg '>
                <img src={item.photo} alt='date' />
              </div>
            </Col>
          </Row>
          </section>
        ))
      }
   </div> 
  );
};

export default Datecomp;

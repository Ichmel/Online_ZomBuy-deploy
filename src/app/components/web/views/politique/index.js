import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetCategoryDetails } from '../../../services';

const Politique = () => {
    const [getList, setList] = useState([]);
    const [titre, setTitre] = useState([])



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await GetCategoryDetails.getTitleList('politique');
                console.log('service', response);
                setList(response.data);

            } catch (error) {
                console.error(error);

            }

            let titrepoli = await GetCategoryDetails.getAffichebytitre('politiquetitre');
            setTitre(titrepoli.data);
        }

        fetchData();
    }, []);





    console.log(getList);

    return (
        <div>
            <section className="pt-3 pb-3 page-info section-padding border-bottom border-white single-product-header-bk ">
                <section className="shop-list section-padding">
                    <div className="container">
                        <div className=' mt-5 mb-4'>
                            <h2> POLITIQUE DE CONFIDENTIALITE </h2>
                        </div>

                        <Col lg='8' className='mb-3' >
                            <p className='servtext'>{titre.description} </p>
                        </Col>

                        {getList.map((row, index) => (
                            <Row className='mb-4  ' key={index}>


                                <Col lg='8' className='' >
                                    <div className=' p-2 '>
                                        <h4>{row.titre} </h4>
                                    </div>
                                    <p className='servtext'>{row.description} </p>
                                </Col>


                            </Row>
                        ))}

                    </div>
                </section>
            </section>
        </div >
    );
};

export default Politique;

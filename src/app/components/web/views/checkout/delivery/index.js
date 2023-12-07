import React, { useState } from 'react';

const Deliverydetails = ({ onSelectDeliveryAddress }) => {
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: '',
        phone: '',
        ville: '',
        quartier: '',
        dateL: '',
        googlemap: '',
        errorMessage: '',
    });
    const handleChange = (e) => {
        // Gérer les changements de date et d'heure séparément
        if (e.target.name === 'dateL') {
            setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
        } else {
            setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, phone, ville, quartier, googlemap, dateL } = deliveryDetails;

        if (name && phone && ville && quartier && googlemap && dateL) {
            let delivery = {
                name,
                phone,
                ville,
                quartier,
                dateL,
                googlemap,
            };
            onSelectDeliveryAddress(delivery);
            setDeliveryDetails({
                name: '',
                phone: '',
                ville: '',
                quartier: '',
                dateL: '',
                googlemap: '',
                errorMessage: '',
            });
        } else {
            // Sinon, afficher un message d'erreur
            setDeliveryDetails({ ...deliveryDetails, errorMessage: 'Veuillez remplir tous les champs obligatoires.' });
        }
    };



    const { name, phone, ville, quartier, googlemap, dateL, errorMessage } = deliveryDetails;

    return (
        <div className="card-body">
            <form>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Nom du Client <span className="required">*</span></label>
                            <input className="form-control border-form-control" type="text" name="name" value={name} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Contact <span className="required">*</span></label>
                            <input type="number" className="form-control border-form-control" name="phone" value={phone} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Ville <span className="required">*</span></label>
                            <input type="text" className="form-control border-form-control" name="ville" value={ville} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Quartier <span className="required">*</span></label>
                            <input type="text" className="form-control border-form-control" name="quartier" value={quartier} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Date Livraison <span className="required">*</span></label>
                            <input type="date" className="form-control border-form-control" name="dateL" value={dateL} onChange={handleChange} />
                            <span className='forme'>La livraison est effectuée dans un délai maximal de 48 heures après la commande </span>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label className="control-label">Localisation Googlemap <span className="required">*</span></label>
                            <input type="text" className="form-control border-form-control mb-1" name="googlemap" value={googlemap} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                    className="btn btn-secondary mb-2 btn-lg"
                    onClick={handleSubmit}
                >
                    NEXT
                </button>
              
            </form>
        </div>
    );
};

export default Deliverydetails;

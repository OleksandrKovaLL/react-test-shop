import React from 'react';

import { reduxForm, Field } from 'redux-form';

import { maxLengthCreator, required } from '../utils/validators/Validators';
import { Input } from './FormsControls/FormsControls';

import firebase from '../firebase';
import 'firebase/firestore';

import { db } from "../firebase";


const maxLength10 = maxLengthCreator(10);

function Form(props) {
    return (
        <>
            <div className="l-form">
                <form className="form"
                    onSubmit={props.handleSubmit}>
                    <h1 className="form__title">Order</h1>

                    <div className="form__div">
                        <Field
                            name={"name"}
                            component={Input}
                            type="text"
                            className="form__input"
                            placeholder="Name"
                            validate={[required]}
                        />
                    </div>

                    <div className="form__div">
                        <Field
                            name={"surname"}
                            component={Input}
                            type="text"
                            className="form__input"
                            placeholder="Surname"
                            validate={[required]}
                        />
                    </div>

                    <div className="form__div">
                        <Field
                            name={"address"}
                            component={Input}
                            type="text"
                            className="form__input"
                            placeholder="Address"
                            validate={[required]}
                        />

                    </div>

                    <div className="form__div">
                        <Field
                            name={"phone"}
                            component={Input}
                            type="text"
                            className="form__input"
                            placeholder="Phone"
                            validate={[required, maxLength10]}
                        />
                    </div>

                    <input type="submit" className="form__button" value="Submit" />
                </form>
            </div>

        </>
    );
}

const SubmitReduxForm = reduxForm({ form: 'order' })(Form)

function SubmitForm() {
    const onSubmit = (formData) => {
        console.log(formData); // данные из формы;
        console.log(formData.name);
        alert(formData);

        db.collection('shopdata').add({
            name: formData.name,
            surname: formData.surname,
            address: formData.address,
            phone: formData.phone,
        })
            .then(() => {
                alert("Ваша заявка принята!");
            })
            .catch(error => {
                alert(error.message);
            })

    }

    return (
        <>
            <SubmitReduxForm onSubmit={onSubmit} />
        </>
    )
}

export default SubmitForm;

import React from 'react';
import { Icon } from '@iconify/react';
import type { ConfirmReservation as Props } from '../props';

export default function ConfirmReservation({ formik, error, submitting }: Props) {
    const getClassName = (key: string): string => {
        return (formik.touched[key] && formik.errors[key] ? 'error' : '') + (formik.values[key].length > 0) ? 'filled' : ''
    };

    return (
        <section className="confirm-reservation">
            <h2 className="section-title">Confirm your reservation</h2>
            <div className="container">
                <div className="input-container">
                    {formik.touched.first_name && formik.errors.first_name ? <span className="error">{formik.errors.first_name}</span> : null}
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('first_name', false)}
                        className={getClassName('first_name')}
                    />
                </div>
                <div className="input-container">
                    {formik.touched.last_name && formik.errors.last_name ? <span className="error">{formik.errors.last_name}</span> : null}
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('last_name', false)}
                        className={getClassName('last_name')}
                    />
                </div>
                <div className="input-container">
                    {formik.touched.email && formik.errors.email ? <span className="error">{formik.errors.email}</span> : null}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('email', false)}
                        className={getClassName('email')}
                    />
                </div>
                <div className="input-container">
                    {formik.touched.phone && formik.errors.phone ? <span className="error">{formik.errors.phone}</span> : null}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('phone', false)}
                        className={getClassName('phone')}
                    />
                </div>
                <div className="input-container">
                    {formik.touched.country && formik.errors.country ? <span className="error">{formik.errors.country}</span> : null}
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('country', false)}
                        className={getClassName('country')}
                    />
                </div>
                <div className="input-container">
                    {formik.touched.zip && formik.errors.zip ? <span className="error">{formik.errors.zip}</span> : null}
                    <input
                        type="text"
                        name="zip"
                        placeholder="Zip Code"
                        value={formik.values.zip}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('zip', false)}
                        className={getClassName('zip')}
                    />
                </div>
                <div className="area-container">
                    {formik.touched.notes && formik.errors.notes ? <span className="error">{formik.errors.notes}</span> : null}
                    <textarea
                        name="notes"
                        placeholder="Order notes"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched('notes', false)}
                        className={getClassName('notes')}
                    />
                </div>

                <div className="button-container">
                    <button disabled={submitting} type="button" onClick={formik.handleSubmit}>Confirm</button>
                </div>
                <div className="bottom">
                    {submitting && <Icon icon="eos-icons:bubble-loading" />}
                    {error && !submitting &&
                        <p>{error}</p>
                    }
                </div>
            </div>
        </section>
    )
};
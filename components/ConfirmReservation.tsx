import React from 'react';
import { Icon } from '@iconify/react';
import type { ConfirmReservation as Props } from '../props';

export default function ConfirmReservation({ formik, error, submitting }: Props) {
    return (
        <section className="confirm-reservation">
            <h2 className="section-title">Confirm your reservation</h2>
            <div className="container">
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                />
                <input
                    type="text"
                    name="zip"
                    placeholder="Zip Code"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                />
                <textarea
                    name="notes"
                    placeholder="Order notes"
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                />

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
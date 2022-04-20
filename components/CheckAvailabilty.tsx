import React, { useState, useRef } from 'react';
// Components
import { Icon } from '@iconify/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export default function CheckAvailabilty() {
    const [checkIn, setCheckIn] = useState<Date | null>(new Date());
    const [checkOut, setCheckOut] = useState<Date | null>(new Date());

    const handleChange = (setDate: React.SetStateAction<any>, name: 'in' | 'out', newDate: Date | null) => {
        setDate(newDate);
        setOpen({ ...open, [name]: !open[name] });
    };

    const [open, setOpen] = useState({ in: false, out: false });
    const handleClick = (name: 'in' | 'out') => () => setOpen({ ...open, [name]: !open[name] });

    const getDate = (date: Date | null) => <p>{moment(date).format('DD')}<span> / {moment(date).format('MMMM')}</span></p>;

    return (
        <form className="check-availability">
            <div className="dates">
                <div className="input-container">
                    <label htmlFor="in" className="label">Check-In</label>
                    <div className="container">
                        {getDate(checkIn)}
                        <Icon icon="akar-icons:chevron-down" onClick={handleClick('in')} />
                    </div>
                    <DatePicker disabled onChange={e => handleChange(setCheckIn, 'in', e)} open={open.in} />
                </div>
                <div className="input-container">
                    <label htmlFor="out" className="label">Check-Out</label>
                    <div className="container">
                        {getDate(checkOut)}
                        <Icon icon="akar-icons:chevron-down" onClick={handleClick('out')} />
                    </div>
                    <DatePicker disabled onChange={e => handleChange(setCheckOut, 'out', e)} open={open.out} />
                </div>
                <div className="input-container">
                    <label htmlFor="guests" className="label">Guests</label>
                    <input name="guests" inputMode='numeric' className="input" />
                </div>
            </div>
            <div className="button-container">
                <p>Have a promotion code?</p>
                <button>Check Availability</button>
            </div>
        </form>
    )
};
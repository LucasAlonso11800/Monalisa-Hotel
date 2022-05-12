import React, { useState } from 'react';
import { useRouter } from 'next/router';
// Components
import { Icon } from '@iconify/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
// Const
import { NEXT_WEEK, TODAY } from '../const/const';
// Types
import { CheckAvailabilty as Props } from '../props';


export default function CheckAvailabilty(props: Props) {
    const { dateFrom, setDateFrom, dateTo, setDateTo, passengers, setPassengers, onSubmit } = props;

    const router = useRouter();

    const [checkIn, setCheckIn] = useState<string | Date>(dateFrom || TODAY);
    const [checkOut, setCheckOut] = useState<string | Date>(dateTo || NEXT_WEEK);
    const [guests, setGuests] = useState<number>(passengers || 2);
    const [open, setOpen] = useState({ in: false, out: false });

    const handleChange = (setDate: React.Dispatch<React.SetStateAction<string | Date>>, name: 'in' | 'out', newDate: Date) => {
        setDate(newDate.toISOString().substring(0, 10));
        setOpen({ ...open, [name]: !open[name] });
    };

    const handleGuestsChange = (setGuests: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuests(e.target.value !== '0' ? parseInt(e.target.value) : 1)
    };

    const handleClick = (name: 'in' | 'out') => () => setOpen({ ...open, [name]: !open[name] });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) return onSubmit(moment(checkIn).format('YYYY-MM-DD'));
        router.push(`/reservation?from=${moment(checkIn).format('YYYY-MM-DD')}&to=${moment(checkOut).format('YYYY-MM-DD')}&guests=${guests}`);
    };

    const getDate = (date: string | Date) => <p>{moment(date).format('DD')}<span> / {moment(date).format('MMMM')}</span></p>;

    return (
        <form className="check-availability" onSubmit={handleSubmit}>
            <div className="dates">
                <div className="input-container">
                    <label htmlFor="in" className="label">Check-In</label>
                    <div className="container">
                        {getDate(dateFrom || checkIn)}
                        <Icon icon="akar-icons:chevron-down" onClick={handleClick('in')} />
                    </div>
                    <DatePicker disabled onChange={e => handleChange(setDateFrom || setCheckIn, 'in', e as Date)} open={open.in} />
                </div>
                <div className="input-container">
                    <label htmlFor="out" className="label">Check-Out</label>
                    <div className="container">
                        {getDate(dateTo || checkOut)}
                        <Icon icon="akar-icons:chevron-down" onClick={handleClick('out')} />
                    </div>
                    <DatePicker disabled onChange={e => handleChange(setDateTo || setCheckOut, 'out', e as Date)} open={open.out} />
                </div>
                <div className="input-container">
                    <label htmlFor="guests" className="label">Guests</label>
                    <input
                        name="guests"
                        type="number"
                        className="input"
                        value={passengers !== undefined ? passengers : guests}
                        onChange={handleGuestsChange(setPassengers || setGuests)}
                    />
                </div>
            </div>
            <div className="button-container">
                <p>Have a promotion code?</p>
                <button type="submit">Check Availability</button>
            </div>
        </form>
    )
};
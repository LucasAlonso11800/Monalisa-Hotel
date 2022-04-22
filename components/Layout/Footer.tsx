import React from 'react';
// Components
import { Icon } from '@iconify/react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="column">
                    <p>Site Map</p>
                    <p>Terms and Conditions</p>
                    <p>Privacy Policy</p>
                    <p>Help</p>
                    <p>Afilliate</p>
                </div>
                <div className="column">
                    <p>Our Location</p>
                    <p>Carreer</p>
                    <p>About</p>
                    <p>Contact</p>
                </div>
                <div className="column">
                    <p>FAQ</p>
                    <p>Blog</p>
                    <p>Car Blog</p>
                    <p>Location</p>
                    <p>Press</p>
                </div>
                <div className="column">
                    <p>Sign up to get our Newsletter</p>
                    <div>
                        <input type="text" placeholder="Your email..." />
                        <Icon icon="fluent:send-20-filled" />
                    </div>
                </div>
                <div className="bottom-row">
                    <h4>Monalisa</h4>
                    <p>© 2022 Monalisa Hotel</p>
                    <Icon icon="akar-icons:twitter-fill" />
                    <Icon icon="akar-icons:facebook-fill" />
                    <Icon icon="akar-icons:google-contained-fill" />
                </div>
            </div>
        </footer>
    )
};
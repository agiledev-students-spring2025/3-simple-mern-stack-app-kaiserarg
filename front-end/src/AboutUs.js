import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AboutUs.css';

const AboutUs = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`);
                const data = response.data;
                setName(data.name);
                setDescription(data.about.join(' '));
                setImageUrl(data.imageurl);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!name && !description && !imageUrl) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 id="about-us-title">About Us</h1>
            <h1 id="about-us-name">{name}</h1>
            <p id="about-us-description">{description}</p>
            <img id="about-us-image" src={imageUrl} alt={name} />
        </div>
    );
};

export default AboutUs;
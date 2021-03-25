import './App.css';
import React, { useState, useEffect } from "react";
import Search from "./Search"


export default function NasaPhoto() {
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    fetchPhoto();


    async function fetchPhoto() {
      const res = await fetch(
        // we'll update the KEYHERE soon!
        `https://api.nasa.gov/planetary/apod?api_key=EuvSXTCh4ZMlXHQ6BfxCjUmU2HBpV8AiUWRXJeec`
      );
      const data = await res.json();
      setPhotoData(data);
    }
  }, []);

  if (!photoData) return <div />;

  return (
    <div className="nasa-photo">
      <a href="./App.js" style={{ border: '1px solid black' }}> Home </a>
      <h1 id="nasa-title"> NASA MEDIA SEARCH </h1>
      <div className="nasa-nav">
        <ul>
          <li className="image-title">{photoData.title}</li>

          <li className="search">
            <Search instructions="Please type some word(s)" btnText="Search" style="border:none; margin:0; padding:0" />
          </li>
        </ul>

      </div>

      <img
        src={photoData.url}
        alt={photoData.title}
        className="photo"
      />
      <div>
        <p className="date">{photoData.date}</p>
        <p className="explanation">{photoData.explanation}</p>
        <h4>{photoData.copyright}</h4>
      </div>
    </div>
  );


}
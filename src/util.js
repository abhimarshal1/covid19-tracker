import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet'


const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(240, 84, 84)",
        multiplier: 500,
    },
    recovered: {
        hex: "#16a596",
        rgb: "rgb(22, 165, 150)",
        multiplier: 400,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        multiplier: 1500,
    },
}
export const sortCountriesByCase = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => b.cases - a.cases);
    return sortedData;
}

export const prettyPrintStat = (stat) => stat ? `+ ${numeral(stat).format("0.0a")}` : 'No cases Reported'

//Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div
                        className="info-flag"
                    ><img src={country.countryInfo.flag} alt="country-flag" /></div>
                    <div className="info-country"><strong>{country.country}</strong></div>
                    <div className="info-confirmed">Cases : {numeral(country.cases).format(0, 0)}</div>
                    <div className="info-recovered">Recovered : {numeral(country.recovered).format(0, 0)}</div>
                    <div className="info-deaths">Deaths : {numeral(country.deaths).format(0, 0)}</div>
                </div>
            </Popup>
        </Circle>
    ))
)
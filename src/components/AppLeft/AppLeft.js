import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './AppLeft.css'
import InfoBox from '../InfoBox/InfoBox';
import Map from '../Map/Map'

const AppLeft = ({ casesType, setCasesType }) => {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('Worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [mapCenter, setMapCenter] = useState([34.80746, -40.176]);
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    const getCountries = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((countriesData) => {
                const countries = countriesData.map(data => (
                    {
                        name: data.country,
                        value: data.countryInfo.iso2,
                    }

                ));
                setMapCountries(countriesData);
                setCountries(countries);
            })
    }

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        setCountry(countryCode);
        const url = countryCode === 'Worldwide'
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`

        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCountryInfo(data);
                console.log([data.countryInfo.lat, data.countryInfo.long]);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            })
    }

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        const getDefaultCountryInfo = async () => {
            await fetch("https://disease.sh/v3/covid-19/all")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log("data", data);
                    setCountryInfo(data);
                })
        }
        getDefaultCountryInfo();
    }, [])

    return (
        <>
            <div className="app_header">
                <div className="logo"><h1 id="logo"><strong>COVID19</strong></h1><span className="logo-span">TRACKER</span></div>

                <FormControl className="app_dropdown">
                    <Select
                        variant="outlined"
                        className="menu__item"
                        value={country}
                        onChange={onCountryChange}
                    >
                        <MenuItem value="Worldwide" className="menu__item">Worldwide</MenuItem>
                        {
                            countries.map(country => (
                                <MenuItem
                                    className="menu__item"
                                    key={country.value || country.name}
                                    value={country.value}>{country.name}
                                </MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </div>
            <div className="app_stats">
                <InfoBox
                    onClick={e => setCasesType('cases')}
                    active={casesType === 'cases'}
                    title="Confirmed"
                    cases={countryInfo?.todayCases}
                    total={countryInfo?.cases} />
                <InfoBox
                    onClick={e => setCasesType('recovered')}
                    active={casesType === 'recovered'}
                    title="Recovered"
                    cases={countryInfo?.todayRecovered}
                    total={countryInfo?.recovered} />
                <InfoBox
                    onClick={e => setCasesType('deaths')}
                    active={casesType === 'deaths'}
                    title="Deaths"
                    cases={countryInfo?.todayDeaths}
                    total={countryInfo?.deaths} />
            </div>
            <Map
                countries={mapCountries}
                casesType={casesType}
                center={mapCenter}
                zoom={mapZoom}
            />
        </>
    )
}

export default AppLeft

import { Card, CardContent } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './AppRight.css'
import Table from '../Table/Table'
import LineGraph from '../LineGraph/LineGraph'
import { sortCountriesByCase } from '../../util'

const AppRight = ({ casesType }) => {

    const [tableData, setTableData] = useState([]);

    const getCountries = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((countriesData) => {
                const countries = countriesData.map(data => (
                    {
                        name: data.country,
                        cases: data.cases,
                    }

                ));
                setTableData(sortCountriesByCase(countries))

            })
    }

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <Card>
            <CardContent className="app-right">
                <h4>Live Cases by Country</h4>
                <Table countries={tableData} />
                <h4>Worldwide {`${casesType == 'cases' ? 'Confirmed' : casesType == 'deaths' ? 'Death' : 'Recovered'}`} Trends</h4>
                <LineGraph casesType={casesType} />
            </CardContent>

        </Card>
    )
}

export default AppRight

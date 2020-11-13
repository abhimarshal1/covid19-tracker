import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css'
import { prettyPrintStat } from '../../util'

function InfoBox({ title, cases, total, ...props }) {
    return (
        <Card className={`infobox__stats ${props.active && 'active'}`} onClick={props.onClick}>
            { props.active && (<div className={`active__indicator ${title === 'Recovered' ? 'recovered' : title === 'Deaths' ? 'deaths' : 'cases'}`}></div>)}
            <CardContent className="infobox__content">
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox_cases ${title === 'Recovered' ? 'recovered' : title === 'Deaths' ? 'deaths' : ''}`}>{prettyPrintStat(cases)}</h2>
                <Typography className="infoBox_total" color="textSecondary">
                    <strong>{`${prettyPrintStat(total)} Total`}</strong>
                </Typography>
            </CardContent>
            { props.active && (<div className={`active__indicator ${title === 'Recovered' ? 'recovered' : title === 'Deaths' ? 'deaths' : 'cases'}`}></div>)}
        </Card >
    )
}

export default InfoBox

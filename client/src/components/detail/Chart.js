/* eslint-disable */
import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import styled from 'styled-components';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import NumberFormat from 'react-number-format';
import '../../../node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.js';

const Wrapper = styled.div`
    width: 100%;
    height: 100% 
    display: flex;
    background-color:white;
    @media (max-width: 768px) {
        width: 100%;
        height: 35vh;
    }
`
const RatingDiv = styled.div`
    width: 25%;
    height: 100%;
    text-align: center;
    box-sizing: border-box; 
    position: relative;
`
const ChartDiv = styled.div`
    width: 70%; 
    height: 100%;
    box-sizing: border-box; 
    position: relative;

`
const RatingValue = styled.div`
    position: absolute;
    margin-left: 10%
    top: 50%;
    transform: translateY(-50%);
`
const ChartValue = styled.div`
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`

const options = {
    legend: { display: false },
    title: {
        display: true,
        text: '평점',
        fontSize: 15,
        fontFamily: 'sans-serif'
    },
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        xAxes: [{
            gridLines: { display: false },
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 30,
                stepSize: 2
            },
            display: false,
        }],
        yAxes: [{
            display: true,
            gridLines: { display: false },
        }],
    },
    plugins: {
        datalabels: {
            display: true,
            color: 'black',
            anchor: 'end',
            align: 'right'
        },
    },
};

var Chart = (props) => {
    const data = {
        labels: ['5점', '4점', '3점', '2점', '1점'],
        datasets: [{
            label: '평점수',
            backgroundColor: ['#4CAF50', '#2196F3', '#00bcd4', '#ff9800', '#f44336'],
            data: [
                props.data ? props.data[0].sssss : null,
                props.data ? props.data[0].ssss : null,
                props.data ? props.data[0].sss : null,
                props.data ? props.data[0].ss : null,
                props.data ? props.data[0].s : null,
            ],
        }],
    };

    return (
        <Wrapper>
            <RatingDiv>
                <RatingValue>
                    <NumberFormat value={props.data ? props.data[0].total : 0} displayType={'text'} thousandSeparator={true} prefix={'총 '} suffix={'명'} /><br/>
                    <h2>{props.data ? (props.data[0].avg).toFixed(2) : 0}</h2>
                    <StarRatingComponent
                        name="평점"
                        value={props.data ? props.data[0].avg : 0}    
                    />
                </RatingValue>
            </RatingDiv>
            <ChartDiv>
                <ChartValue>
                    <HorizontalBar height={200} data={data} options={options} />
                </ChartValue>
            </ChartDiv>
        </Wrapper>
    );
}

export default Chart;




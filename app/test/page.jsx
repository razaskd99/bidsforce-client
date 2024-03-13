"use client"
import React, { useState, useEffect } from 'react'
import { getToken } from '../api/util/script'
const axios = require('axios');

const page = () => {
    const [tokens, settokens] = useState('');

    const [allopportunities, setallopportunities] = useState([]);


    useEffect(() => {
        getToken("http://localhost:8888/", "raza@raza.com", "12345").then((result) => {

        let tokenData = ''
        tokenData = result?.tokenData?.access_token
        settokens(tokenData)
    })

    }, []);


    useEffect(() => {

        getOp("http://localhost:8888/", 1, tokens).then((result) => {
            setallopportunities(result)
            console.log("resultresultresultresult", result)
        })

    }, [tokens]);




    console.log('ooooo', allopportunities)

    return (
        <div>
            {
                allopportunities?.map((o)=>{

                    return (
                        <h1>{o.title}</h1>
                    )
                })
            }
        </div>
    )
}


const getOp = async (apiBackendURL, tenantID, accessToken) => {

    const url = `${apiBackendURL}opportunity/Opportunity/${tenantID}`;

    try {
        const response = await axios.get(url, {
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            timeout: 0, // Setting timeout to maximum value
        });
        return response.data

    } catch (err) { }

}




export default page

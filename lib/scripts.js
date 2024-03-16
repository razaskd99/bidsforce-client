"use server"
import { cookies } from 'next/headers'

export const getCookieValue = async (name) => {
    const cookieStore = cookies()
    let data = ''
    let rawData = cookieStore.get(name)

    try {
        //value = Boolean(value)
    } catch (err) { }

    try {
        rawData = JSON.parse(rawData)
    } catch (err) { }

    try {
        data = rawData.value
    } catch (err) { }


    try {
        data = JSON.parse(data)
    } catch (err) { }

    return data

}
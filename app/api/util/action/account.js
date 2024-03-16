"use server"
import getConfig from 'next/config'
import { cookies } from 'next/headers'

export const logoutUser = async () => {

  cookies().set('loginStatus', 'false')


}

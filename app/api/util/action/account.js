"use server"
import getConfig from 'next/config'

export const logoutUser = async () => {

    const { serverRuntimeConfig } = getConfig() || {};
    if (serverRuntimeConfig) {
      serverRuntimeConfig.LOGIN_USER_DATA={};
      serverRuntimeConfig.IS_LOGIN=false;
      serverRuntimeConfig.PRIVATE_ENCRIPTED_USER_DATA={ user: '', pass: "" };
      serverRuntimeConfig.IS_LOGIN=false

    }
}

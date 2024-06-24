/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV == "development") {
  bakend = "http://localhost:8888/";
}

bakend = "http://127.0.0.1:8888/";

if (process.env.NODE_ENV == "production") {
  bakend = "https://server.bidsforce.com/";
}

bakend = "https://bidsforce-server-1.vercel.app/";

const nextConfig = {


  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    'lucide-react': {
      transform: 'lucide-react/lib/{{member}}',
    }
    
  },


  // for server side
  serverRuntimeConfig: {
    API_BACKEND_SERVER: bakend,
    API_ACCESS_TOKEN_SERVER: " ",
    TENANT_ID: 0,
    TEMP_DATA: {},
    LOGIN_USER_DATA: {},
    PRIVATE_ENCRIPTED_USER_DATA: { user: '', pass: "" },
    IS_LOGIN: false,
    HOME_URL:""  

  },

  // for client side
  env: {
    API_BACKEND_CLIENT: bakend,
    TENANT_ID: "0",
    HOME_URL:""  
  },

  // Will be available on both server-side and client-side
  publicRuntimeConfig: {
    API_BACKEND_CLIENT: bakend,
    TENANT_ID: "0",
    HOME_URL:""  
  },

  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },

};

module.exports = nextConfig;

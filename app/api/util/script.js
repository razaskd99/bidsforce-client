export const checkValidTenant = async (apiBackendURL, tenantDomain) => {
  try {
    const url = `${apiBackendURL}admin/control-panel/check_valid_tenant/${tenantDomain}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return {
        statusCode: "400",
        responseData: [],
        error: response.statusText || "Request failed for Check Valid Tenant",
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      responseData: result,
    };
  } catch (error) {
    return {
      statusCode: "400",
      responseData: [],
      error: error.message || "Request failed for Check Valid Tenant",
    };
  }
};

export async function getToken(apiBackendURL, username, password) {
  try {
    const tokenUrl = `${apiBackendURL}auth/token`;

    const formData = new URLSearchParams();
    formData.append("grant_type", "");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("scope", "");
    formData.append("client_id", "");
    formData.append("client_secret", "");

    const response = await fetch(tokenUrl, {
      method: "POST",
      cache: 'no-store',

      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      return {
        statusCode: 400,
        tokenData: {},
        error: response.statusText || "Token request failed",
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      tokenData: data,
    };
  } catch (error) {
    return {
      statusCode: 400,
      tokenData: {},
      error: error.message || "Token request failed",
    };
  }
}

// get tenant url
export const getTenantUrl = (currentUrl) => {
  // Check if the URL is localhost
  if (currentUrl.includes("localhost")) {
    return "localhost";
  }
  const parts = currentUrl.replace(/^https?:\/\/(www\.)?/, "").split(".");
  // Check if there is a subdomain
  if (parts.length > 2) {
    const subdomain = parts[0];
    return subdomain;
  } else {
    // No subdomain, remove top-level domain and return the rest as tenant URL
    const domain = parts.slice(0, -1).join(".");
    return domain;
  }
};

export const getFullDomainName=(headers)=> {
    const headersList = headers();
    let domain = headersList.get("x-forwarded-host");

    // Check if the domain contains "localhost"
    if (domain.includes('localhost')) {
        // If it does, prepend "http://" to the domain
        domain = 'http://' + domain;
    } else if (!/^https?:\/\//.test(domain)) {
        // If it doesn't contain "localhost" and doesn't start with "http://" or "https://",
        // prepend "https://" to the domain
        domain = 'https://' + domain;
    }

    // Check if the domain already ends with "/"
    if (!domain.endsWith('/')) {
        // If it doesn't, append "/" to the domain
        domain += '/';
    }

    return domain;
}

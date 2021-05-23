const clientsReq = async(_token) => {
    let config = {
        method: "GET",
        headers: {
            Accept: "application/json",
            ContentType: "application/json",
        },
    };

    const response = await fetch(
        `https://api.lynq.app/account/clients?t=${_token}`,
        config
    );
    return await response.json();
};

const statsReq = async(_token, _period) => {
    const config = {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const response = await fetch(
        `https://api.lynq.app/account/stats?t=${_token}&period=${_period}`,
        config
    );

    return await response.json();
};

export { clientsReq, statsReq };
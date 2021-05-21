const fetchAsyncReq = async(_token) => {
    const config = {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    const response = await fetch(
        `https://api.lynq.app/async/requests?t=${_token}`,
        config
    );
    return await response.json();
};

const uploadFileReq = async(_id, _token, _videoFile) => {
    var formData = new FormData();
    formData.append("image", _videoFile);

    const response = await fetch(
        `https://api.lynq.app/async/${_id}/upload?t=${_token}`, {
            method: "POST",
            body: formData,
        }
    );

    return await response.json();
};

const uploadMessageReq = async(_token, _id, _message) => {
    const _reqData = {
        content: _message,
    };

    const response = await fetch(
        `https://api.lynq.app/async/${_id}/message?t=${_token}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(_reqData),
        }
    );

    return await response.json();
};

export { fetchAsyncReq, uploadFileReq, uploadMessageReq };
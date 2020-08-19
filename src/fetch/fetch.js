const makeRequest = async (
    fullURL,
    method,
    contentType,
    fields,
) => {
    if (!fullURL) {
        return;
    }
    const body = fields ? fields : undefined;
    try {
        const response = await fetch(fullURL, {
            method,
            body,
            headers: {
                "Content-Type": contentType,
            },
        });

        if (response.status >= 200 && response.status < 300 && response.ok) {
            if (response.statusText === "No Content") {
                return response.statusText;
            } else {
                return response.json();
            }
        } else {
            return Promise.reject(response);
        }
    } catch (err) {
    }
};

export default makeRequest;

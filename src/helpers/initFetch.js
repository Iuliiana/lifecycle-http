const initFetch = (baseUrl) => {
    const getFetch = (url) => {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url)
                .then((response) => response.json())
                .then((data) => {
                    if (!data) {
                        return reject(data);
                    }
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    const postFetch = (url, body) => {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.status)
                .then((data) => {
                    if (data < 200 && data > 300) {
                        return reject(data);
                    }
                    resolve({success: true});
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    const deleteFetch = (url) => {
        return new Promise((resolve, reject) => {
            fetch(baseUrl + url, {
                method: "delete"
            })
                .then((response) => response.status)
                .then((data) => {
                    if (data < 200 && data > 300) {
                        return reject(data);
                    }
                    resolve({success: true});
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    return {getFetch, postFetch, deleteFetch};
}

export default initFetch;
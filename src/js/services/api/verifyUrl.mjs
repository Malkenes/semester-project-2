export async function verifyURL(url) {
    try {
        const response = await fetch(url, {method: "HEAD"});
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            return contentType && contentType.startsWith("image/");
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export async function verifyURL(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            return contentType && contentType.startsWith("image/");
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
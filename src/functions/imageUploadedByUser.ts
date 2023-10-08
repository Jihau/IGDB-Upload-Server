
// @ts-ignore
import fetchData from "../utils/fetchData";

const imageUploadedByUser = async (parent: any, args: { user: any; }) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args.user),
    };
    const response = await fetchData(`${process.env.AUTH_URL}/users`, options);
    return response;
}
exports.default = imageUploadedByUser;

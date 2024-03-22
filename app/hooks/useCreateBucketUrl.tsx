const useCreateBucketUrl = (fileId: string) => {
    const url = process.env.NEXT_PUBLIC_APP_WRITE_URL;
    const id = process.env.NEXT_PUBLIC_APP_WRITE_BUCKET_ID;
    const endpoint = process.env.NEXT_PUBLIC_APP_WRITE_ENDPOINT;
    if (!url || !id || !endpoint || !fileId) {
        return "";
    }
    return `${url}/storage/buckets/${id}/files/${fileId}/view?project=${endpoint}`;
};

export default useCreateBucketUrl;

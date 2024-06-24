// Example URL: "nxm://escapethebackrooms/mods/50/files/102?key=r_0jViAlLYE04Aiuf5gOkw&expires=1719417584&user_id=158900228"

type NxmModData = {
    modId: number;
    fileId: number;
    key: string;
    expires: number;
    userId: number;
}

export default function parseNxmUrl(url: string): NxmModData {
    const [_, modId, fileId, key, expires, userId] = url.match(/nxm:\/\/escapethebackrooms\/mods\/(\d+)\/files\/(\d+)\?key=([^&]+)&expires=(\d+)&user_id=(\d+)/)!;
    return {
        modId: parseInt(modId),
        fileId: parseInt(fileId),
        key,
        expires: parseInt(expires),
        userId: parseInt(userId)
    };
}
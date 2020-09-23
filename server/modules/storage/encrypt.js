import crypto from 'crypto';

const iv = crypto.randomBytes(16);

export const encrypt = (key, attributes) => {
    const ekey = crypto
        .createHash("sha256")
        .update(key)
        .digest();
    const cipher = crypto.createCipheriv("aes256", ekey, iv);
    const encrypted = cipher.update(Buffer.from(JSON.stringify(attributes)));
    const encryptedValue = Buffer.concat([encrypted, cipher.final()]);
    return encryptedValue.toString('hex');
};

export const decrypt = (key, text) => {
    const ekey = crypto
        .createHash("sha256")
        .update(key)
        .digest();
    const decipher = crypto.createDecipheriv("aes256", ekey, iv);
    decipher.update(text, "hex", "binary");
    return JSON.parse(decipher.final('binary'));
};
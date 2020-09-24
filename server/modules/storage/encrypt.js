import crypto from 'crypto';

const iv = crypto.randomBytes(16);

export const encrypt = (key, attributes) => {
    const ekey = crypto
        .createHash("sha256")
        .update(key)
        .digest();
    const cipher = crypto.createCipheriv("aes256", ekey, iv);
    const encrypted = cipher.update(JSON.stringify(attributes));
    const encryptedValue = Buffer.concat([encrypted, cipher.final()]);
    return encryptedValue.toString('hex');
};

export const decrypt = (key, hash) => {
    const ekey = crypto
        .createHash("sha256")
        .update(key)
        .digest();
    const decipher = crypto.createDecipheriv("aes256", ekey, iv);
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
    return JSON.parse(decrypted.toString());
};
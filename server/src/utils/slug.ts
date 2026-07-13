import slugify from "slugify";
import crypto from "crypto";

export const slugifyString = (str: string) => {
    return slugify(str,
        {
            lower: true,
            remove: /[*+~.()'"!-]/g,
            strict: true,
        }
    ).slice(0, 20) + "-" + crypto.randomBytes(3).toString("hex");
}
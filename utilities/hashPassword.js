import bcrypt from "bcryptjs";

/**
 * 
 * @param {string} password 
 * @returns 
 */

export function hashPassword(password) {

    // membuat variabel salt untuk melakukan enkripsi data
    const salt = bcrypt.genSaltSync(10);

    // membuat variabel enkripsiPassword untuk memanggil variabel salt yang sudah dibuat
    const enkripsiPassword = bcrypt.hashSync(password, salt);
    // mengembalikan variabel hashPassword
    return enkripsiPassword;
}

/**
 * 
 * @param {String} inputPassword 
 * @param {String} dbPassword 
 * @returns {boolean}
 */

// melakukan compare password
export function comparePassword(inputPassword, dbPassword) {
    return (
        // mengembalikan kedalam bentuk boolean
        bcrypt.compareSync(inputPassword, dbPassword)
    )
}

import inquirer from "inquirer";
import db from "./prisma/connection.js";
import { hashPassword, comparePassword } from "./utilities/hashPassword.js"

// membersihkan yang sebelumnya
console.clear();

// menampilkan output
console.log(`
    ================================
            APLIKASI CLI - 2
    ================================
`);

// memberikan opsi mau ke login atau ke register
inquirer.prompt([
    {
        name: "option",
        message: "Silahkan pilih menu yang diinginkan : ",
        type: "list",
        choices: ["Login", "Register", "Exit"]
    },
])

    .then((answer) => {
        console.log(answer.option);

        // melakukan penkondisian pilihan
        const { option } = answer;

        // melakukan pengkondisian ketika kita memilih fitur yang dipilih
        if (option === "Login") {
            // memanggil function login
            Login();
            return;
        } else if (option === "Register") {
            // memanggil function register
            Register();
            return;
        } else {
            // memanggil function exit
            Exit();
            return;
        }

    }).catch((err) => { // menangkap error 
        // menampilkan error
        console.log(err);
    });

// membuat sebuah function login
function Login() {
    // membersihkan hasil sebelumnya
    console.clear();

    // menampilkan output
    console.log("Kamu memilih login");

    inquirer.prompt(
        [
            {
                name: "username",
                message: "Masukkan username : "
            },
            {
                name: "password",
                message: "Masukkan password",
                type: "password"
            }
        ]
    )
        .then(async (answer) => {
            // mengambil name di inquirer.prompt
            const { username, password } = answer;

            // mengambil username sesuai input user di database users
            const getUserData = await db.users.findUnique(
                {
                    where:
                    {
                        username: username
                    }
                }
            );

            // jika usernamenya tidak ada di database
            if (!getUserData) {
                return (
                    console.log("Username tidak ditemukan")
                )
            }

            // melakukan compare password
            const tryComparePassword = await comparePassword(password, getUserData.password)

            // jika password tidak sesuai
            if (!tryComparePassword) {
                return (
                    console.log("Password anda salah..")
                )
            }

            // menampilkan output 
            console.log(`
                ==============================================
                    SELAMAT DATANG DI HALAMAN LOGIN ${getUserData.username}
                ==============================================
            `);

        }).catch((err) => {
            console.log(err);
        });

}

// membuat function register
function Register() {

    // membersihkan hasil sebelumnya
    console.clear();

    // menampilkan output
    console.log("Kamu memilih register");

    console.log(`
        ==================================
        SELAMAT DATANG DI HALAMAN REGISTER
        ==================================

    `);

    // membuat akun register
    inquirer.prompt(
        [
            {
                name: "username",
                message: "Masukkan Username : "
            },
            {
                name: "password",
                message: "Masukkan Password : ",
                type: "password"
            }
        ]
    )
        .then((answer) => {
            const { username, password } = answer;

            // memasukkan database dengan nama databasenya users
            db.users.create(
                {
                    // mengambil name di inquirer.prompt
                    data: {
                        username: username,
                        // password: password
                        password: hashPassword(password)    // untuk enkripsi password supaya tidak diliat
                    }
                }
            )
                .then((result) => {
                    console.log("Data Berhasil di simpan..");
                }).catch((err) => {
                    // menampilkan error
                    console.log(err.message)
                });

        }).catch((err) => { // menangkap error 
            // menampilkan error
            console.log(err);
        });
}

// membuat function exit
function Exit() {
    // membersihkan hasil sebelumnya
    console.clear();
    console.log("Terima kasih sudah mengunjungi halaman kami...");
}

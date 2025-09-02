const { Canvas } = require('canvas');
const JsBarcode = require('jsbarcode');
const fs = require('fs')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

let tk_info = [{ title: "Ordinary", slots: 700, identifier: "000" }, { title: "VIP", slots: 50, identifier: "001" }, { title: "VVIP", slots: 30, identifier: "002" },
{ title: "Gold", slots: 20, identifier: "003" }]
let event_id = "0X155D"
let tickets = {}

function getPKs(bulk) {

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    let pks = new Array()
    for (let x = 0; x < bulk; x++) {
        pks[x] = generateRandomString(10);
    }

    for (let y = 0; y < bulk; y++) {
        for (let z = 0; z < bulk; z++) {
            if (pks[y] == pks[z] && (z != y)) {
                console.log("We have breach @", z)
            }
        }
    }

    return pks;
}

function generateBarcodeImage(value, format = 'CODE128') {
    const canvas = new Canvas(100, 100); // Adjust dimensions as needed
    JsBarcode(canvas, value, { format: format });
    return canvas.toBuffer('image/png'); // Returns a Buffer containing the PNG image data
}

function runG() {
    tk_info.forEach(el => {
        let title = el.title
        let id = el.identifier
        let pks = getPKs(el.slots)
        let date = new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear() + "@" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        let idx = 1;
        let obj_save = new Array()
        pks.forEach(pk => {
            let address = crypto.randomUUID()
            let obj = null
            if (idx < 10) {
                obj = { address: address, date: date, event_id: event_id, partner: pk, index: "000" + idx }
            } else if (idx < 100) {
                obj = { address: address, date: date, event_id: event_id, partner: pk, index: "00" + idx }
            } else if (idx < 1000) {
                obj = { address: address, date: date, event_id: event_id, partner: pk, index: "00" + idx }
            } else {
                obj = { address: address, date: date, event_id: event_id, partner: pk, index: "" + idx }
            }
            obj_save[obj_save.length] = obj
            fs.writeFileSync('./codes/' + id + "/" + obj.index, generateBarcodeImage(obj.partner))
            idx++;
            console.log(obj)
        })
        tickets[id] = { title: title, data: obj_save }
        //console.log("PKS @ ", id, " ", pks)
    })
    fs.writeFileSync('./codes/chunk.json',JSON.stringify(tickets));
}

runG()

app.get("/brc/:d", (req, res, next) => {
    let args = req.params.d.split("-")
    console.log(args)
    res.status(200)
    fs.readFile("./codes/" + args[1] + "/" + args[0], (err, data) => {
        res.end(data)
    })
})

app.get("/get/:d", (req, res, next) => {
    let index = req.params.d
    console.log(tickets[index])
    res.status(200)
    res.end(JSON.stringify(tickets[index]))
})

app.listen(8100)
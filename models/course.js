const uuid = require('uuid4');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid();
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON());

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        return rej(err);
                    } else {
                        res();
                    }
                })
        })
    }

    static async update(data) {
        const courses = await Course.getAll();
        const index = courses.findIndex(c => c.id === data.id);
        courses[index] = data;

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        return rej(err);
                    } else {
                        res();
                    }
                })
        })
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, data) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(JSON.parse(data))
                    }
                })
        })

    }

    static async getById(id) {
        const courses = await Course.getAll();
        return courses.find(c => c.id === id);
    }
}

module.exports = Course;


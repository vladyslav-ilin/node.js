const {Router} = require('express');
const Courses = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Courses.getAll();

    res.render('courses', {
        title: 'Courses page',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const course = await Courses.getById(req.params.id);

    res.render('course-edit', {
        title: `Edit course ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    await Courses.update(req.body)
    res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
    const course = await Courses.getById(req.params.id);
    res.render('course',
        {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        })
})

module.exports = router;
const express = require('express')
const router = express.Router()

// include controller
const memberControllers = require('../controllers/member.controller')

router.route('/add')
    .post(
        memberControllers.addMember
    )

router.route('/addManual')
    .post(
        memberControllers.addMemberManual
    )

router.route('/addAuto')
    .post(
        memberControllers.addMemberAuto
    )

module.exports = router
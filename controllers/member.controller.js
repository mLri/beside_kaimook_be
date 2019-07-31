const Member = require('../models/member.model')

const prefixNumber = process.env.PREFIX_NUMBER
const ignoreArr = process.env.IGNORE_ARRAY

function setJson(status, msg, data) {
  return {
    status: status,
    msg: msg,
    data: data
  }
}

async function  getLastNumberCard() {
  // const getMember = await Member.findOne({}).sort({ $natural: -1 })
  const getMember = await Member.findOne({}).sort({ numberCard: -1 })
  let numberCard = '0055'
  if (getMember) {
    numberCard = getMember.numberCard
  }
  return numberCard
}

async function checkDuplicateNumberCard(numberCard) {
  return Member.findOne({ numberCard }, { numberCard: true })
}

module.exports = {
  addMember: async (req, res) => {
    try {
      if (Object.keys(req.body).length !== 0) {

        if (req.body.numberCard) {
          if (await checkDuplicateNumberCard(req.body.numberCard)) {
            res.status(201).json(setJson(false, 'number card is duplicate!', {}))
          } else {
            if (req.body.numberCard.length < 4) {
              req.body.numberCard = req.body.numberCard.padStart(4, '0')
            }
            req.body.numberId = prefixNumber + req.body.numberCard
            const member = new Member(req.body)
            const saveMember = await member.save()
            if (saveMember) {
              res.status(200).json(setJson(true, '', saveMember))
            } else {
              res.status(201).json(setJson(false, 'can not save member!', {}))
            }
          }
        } else {
          let check = 0
          let numberCard = ''
          let lastNumberCard = await getLastNumberCard()
          while (check < 1) {
            const number = Number(lastNumberCard) + 1
            numberCard = String(number).padStart(4,'0')
            if (ignoreArr.indexOf(numberCard) < 0) {
              check = 1
            } else {
              lastNumberCard = number
            }
          }

          req.body.numberCard = numberCard
          req.body.numberId = prefixNumber + numberCard
          const member = new Member(req.body)
          const saveMember = await member.save()
          if (saveMember) {
            res.status(200).json(setJson(true, '', saveMember))
          } else {
            res.status(201).json(setJson(false, 'can not save member!', {}))
          }
        }

      } else {
        res.status(201).json(setJson(false, 'pass body empty, not insert to db!', {}))
      }
      res.send()
    } catch (error) {
      throw new Error(error)
    }
  },
  addMemberManual: async (req, res) => {
    try {
      if (Object.keys(req.body).length !== 0) {
        
        if (await checkDuplicateNumberCard(req.body.numberCard)) {
          res.status(201).json(setJson(false, 'number card is duplicate!', {}))
        } else {
          req.body.numberId = prefixNumber + req.body.numberCard
          const member = new Member(req.body)
          const saveMember = await member.save()
          if (saveMember) {
            res.status(200).json(setJson(true, '', saveMember))
          } else {
            res.status(201).json(setJson(false, 'can not save member!', {}))
          }
        }

      } else {
        res.status(201).json(setJson(false, 'pass body empty, not insert to db!', {}))
      }
      res.send()
    } catch (error) {
      throw new Error(error)
    }
  },
  addMemberAuto: async (req, res) => {
    try {
      if (Object.keys(req.body).length !== 0) {

        let check = 0
        let numberCard = ''
        let lastNumberCard = await getLastNumberCard()
        while (check < 1) {
          const number = Number(lastNumberCard) + 1
          numberCard = String(number).padStart(4,'0')
          console.log('number -> ' ,numberCard)

          if (ignoreArr.indexOf(numberCard) < 0) {
            check = 1
          } else {
            lastNumberCard = number
          }
        }

        req.body.numberCard = numberCard
        req.body.numberId = prefixNumber + numberCard
        console.log(req.body)
        const member = new Member(req.body)
        const saveMember = await member.save()
        if (saveMember) {
          res.status(200).json(setJson(true, '', saveMember))
        } else {
          res.status(201).json(setJson(false, 'can not save member!', {}))
        }

      } else {
        res.status(201).json(setJson(false, 'pass body empty, not insert to db!', {}))
      }
      res.send()
    } catch (error) {
      throw new Error(error)
    }
  }
}
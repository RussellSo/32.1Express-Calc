const express = require('express')
let expressErrors = require('./errors')
let app = express()
app.use(express.json())

app.get('/mean', (req, res, next) => { //req is params
    try {
        if (!req.params) throw new expressErrors('empty parameters', 400)
    } catch (e) {
        next(e)
    }

    let { nums } = req.query
    let arr = nums.split(',') // creates the array
    let sum = 0
    //learned isNaN and Number.isNaN()
    //learned that returning json also shows on the page
    try {

        for (num of arr) {
            // arrnum.push(parseInt(num))
            let numToInt = parseInt(num)
            if (isNaN(numToInt)) throw new expressErrors(`${num} is not a number`, 400)
            sum = sum + numToInt
        }
        let mean = sum / arr.length

        let results = {
            operation: "mean",
            result: mean
        }
        return res.send(results) // cant get the object to have a name results
    } catch (e) {
        next(e)
    }
    

})

app.get('/median', (req, res, next) => {
    try {
        if (!req.params) throw new expressErrors('empty parameters', 400)
    } catch (e) {
        next(e)
    }

    //learned isNaN and Number.isNaN()
    //learned that returning json also shows on the page
    try {

        let { nums } = req.query
        let arr = nums.split(',') // creates the array
        for (num of arr) {
            if (isNaN(num)) throw new expressErrors(`${num} is not a number`, 400)
            
        }
        let medianIndex = Math.floor(arr.length / 2)
        let median = arr[medianIndex]
        let results = {
            operation: "median",
            result: median
        }
        return res.send(results) // cant get the object to have a name results
    } catch (e) {
        next(e)
    }
})

app.get('/mode', (req, res, next) => {
    try {
        if (!req.params) throw new expressErrors('empty parameters', 400)
    } catch (e) {
        next(e)
    }

    try {

        let { nums } = req.query
        let arr = nums.split(',')
        let counts = {} // when i console log counts, I dont know why but it prints out each count object
        // this counts as a hash? i think hash value's are default numbers.
        
        // console.log(arr)
        arr.forEach((e) => {
            if (counts[e] === undefined) {
                counts[e] = 0
            }
            counts[e] += 1
            if (isNaN(e)) throw new expressErrors(`${e} is not a number`, 400)
        })
        
        
        return res.send(counts)
    } catch (e) {
        next(e)
    }

    //good way to use reduce to get a count of each number, but i dont understand at all
    // return arr.reduce(function(acc, next) {
    //     acc[next] = (acc[next] || 0) + 1; // 
    //     return acc;
    //   }, {});

})

//gave up at the further study of making an all route: it would refactor a lot of my code

// app.use('/all', (req, res, next) => {
//     let { nums } = req.query
//     let arr = []
//     let splitNums = nums.split(',')
//     for (num of splitNums) {
//         arr.push(parseInt(num))
//     }
//     console.log(arr)
//     let result = {
//         mean: ,
//         mode: ,
//         median: 
//     }
//     return res.send(result)
// })


app.use((err, req, res, next) => {
    let status = err.status || 500
    let message = err.msg

    //for some reason, I couldnt call err.msg within a new object.
    return res.status(status).json({
        error: {message, status}
    })
})


app.listen(3000, function() {
    console.log('app on port 3000')
})
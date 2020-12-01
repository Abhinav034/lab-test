const express = require('express')
require('./databseConnection')
const {Book , Customer , Rental} = require('./models/tables')


const app = express()

app.use(express.json())



app.get('/' , async(req,res)=>{

   const books = new Book({
        title:'The great gatsby',
         author:'F. Scott Fitzgerald'
   })

  // await books.save()

   const customer = new Customer({
            name:'Mary',
            email:'mary@outlook.com',
            phone:'987-453-5455'      
   })

    // await customer.save()


    // {
    //     title:'The great gatsby',
    //     author:'F. Scott Fitzgerald'
    // },
    
    // {
    //     title:'Moby Dick and the Whale',
    //     author:'Herman Melville'
    // },
    // {
    //     title:'Ulysses',
    //     author:'James Joyce'
    // },{
    //     title:'War and Peace',
    //     author:'Leo Tolstoy'
    // }])




    //     name:'Mary',
    //     email:'Mary@outlook.com',
    //     phone:'890-536-5664'
    // },{
    //     name:'Jimmy',
    //     email:'jimmy@outlook.com',
    //     phone:'987-453-5511'
    // },{
    //     name:'Abhi',
    //     email:'abhi@outlook.com',
    //     phone:'176-434-5987'
    // },{
    //     name:'Jacob',
    //     email:'Jacob@outlook.com',
    //     phone:'912-480-5564'
    // }])


    const b1 = await Book.find({title:'The great gatsby'})
    const c1 = await Customer.find({})

    let id = c1.map((item)=>{
        return item._id
    })

   

    // console.log(b1._id)
    // console.log(id)

    const rental = new Rental({
        books:b1[0]._id,
        customers:id,
        returnDate:'2021-01-03'
    })

      await rental.save()


       const r1 = await Rental.find({})

  
     res.send(r1)

   res.send('worked')
 })

app.get('/tables' , async (req,res)=>{
    const rentals = await Rental.find({})

        for (var i = 0 ; i<rentals.length ; i++){
                await rentals[i].populate('books','title').execPopulate()
                await rentals[i].populate('customers').execPopulate()
        }
        res.send(rentals)
        
})

app.listen('8080' , ()=>{
    console.log('Server working at port 8080')
})
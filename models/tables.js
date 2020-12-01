const mongoose = require('mongoose')

const booksSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    }

})

const Book = mongoose.model('book' , booksSchema)

const customerSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    }


})

const Customer = mongoose.model('customer' , customerSchema)

const rentalSchema = new mongoose.Schema({

        books:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'book'
        
        }],
        customers:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:'customer'
        }],
        returnDate:{
            type:Date,
            required: true
        }
})

const Rental = mongoose.model('rental' , rentalSchema)

module.exports = {
    Book,
    Customer,
    Rental
}
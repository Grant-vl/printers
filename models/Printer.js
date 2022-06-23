
const mongoose = require('mongoose');

const PrinterSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },

    ip: {
        type: String,
        required: [true, 'Please add an IP address'],
        unique: false,
        trim: true,
        maxlength: [20, 'IP cannot be more than 20 characters']
    },
    status: {
        type: Boolean,
        required: [true, 'Please add a description'],
        unique: false,
    }
})

module.exports = mongoose.models.Printer || mongoose.model('Printer', PrinterSchema)

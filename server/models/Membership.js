const mongoose = require('mongoose');

const { Schema } = mongoose;

const membershipSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    price: {
        type: Number,
    }
}, { timestamps: true });

// Pre save middleware to set endDate
membershipSchema.pre('save', function(next) {
    if (!this.startDate) {
        this.startDate = new Date();
    }

    const endDate = new Date(this.startDate);
    endDate.setMonth(endDate.getMonth() + 3); 

    this.endDate = endDate;
    next();
});

// Fetch price
membershipSchema.statics.fetchPriceFromModel = async function () {
    const membership = await this.findOne({});
    return membership.price;
  };
    

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;

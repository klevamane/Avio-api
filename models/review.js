import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    name: {
        type:Number,
        required: true
    },
    comment: {
        type:String,
        required: true
    },

},
{
    timestamps: true,
});

Review = mongoose.model('Review', reviewSchema);

export default Review;
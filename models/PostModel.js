import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: String,
    story: String,
    location: {type: String, default: 'my city',},
    isFavourite: Boolean, 
    createdOn: { type: Date, default: Date.now },
    imageUrl: String,
    visitedDate: Date,
    },
    { timestamps: true });

export default mongoose.model('Post', PostSchema);
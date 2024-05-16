import mongoose from 'mongoose';

const goodsSchema = new mongoose.Schema ({
    goodsId: {
        type: Number, 
        required: true,
        unique: true
    }, 
    name: {
        type: String, 
        required: true, 
        unique: true
    }, 
    details: {
        type: String
    }, 
    manager: {
        type: String
    }, 
    saleStatus: {
        type: String
    },
    createDate: {
        type: Date, 
        default: Date.now
    }, 
    modifyDate: {
        type: Date, 
        default: Date.now
    }, 
    goodsPW: {
        type: String
    }
});

export const goodsModel = mongoose.model('goodsModel', goodsSchema);
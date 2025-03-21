import mongoose, { Schema } from "mongoose";



const diamondSchema = new Schema({
    stock:{
        type: String,
    },

    Availability:{
        type: String,
    },

    Shape:{
        type: String,
    },  

    Weight:{
        type: String,
    },

    Color:{
        type: String,
    },

    Clarity:{
        type: String,
    },

    Cut_Grade:{
        type: String,
    },

    Polish:{
        type: String,
    },

    Symmetry:{
        type: String,
    },

    Fluorescence_Intensity:{
        type: String,
    },

    Fluorescence_Color:{
        type: String,
    },

    Measurements:{
        type: String,
    },

    Eye_Clean:{
        type: String,
    },

    Lab:{
        type: String,
    },

    Report:{
        type: String,     
    },

    Treatment:{
        type: String,
    },

    Discount:{
        type: String,
    },

    Depth:{
        type: String,
    },

    Table:{
        type: String,      
    },

    Girdle_Thin:{
        type: String,      
    },

    Girdle_Thick:{
        type: String,      

    },

    Girdle:{
        type: String,      

    },

    Girdle_Condition:{
        type: String,      

    },

    Culet_Size:{
        type: String,      
        
    },

    Culet_Condition:{
        type: String,      

    },

    Crown_Height:{
        type: String,      

    },

    Crown_Angle:{
        type: String,      

    },

    Pavilion_Depth:{
        type: String,      

    },

    Pavilion_Angle:{
        type: String,      

    },

    Laser_Inscription:{
        type: String,      

    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "seller"
    }   
    
});


const Diamond = mongoose.model("Diamond",diamondSchema);

export default Diamond;

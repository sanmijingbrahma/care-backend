const Resource = require("../models/resource");


// Create a resource
exports.createResource = async (req,res)=>{
    try {
        const resource = new Resource(req.body);
        await resource.save();
        res.status(201).json(resource)
    } catch (err) {
       res.status(400).json({error: err.message});
    }
}


// Get all resource
exports.getAllResource = async(req,res)=>{
    try {
        const resource = await Resource.find();
        res.json(resource);
    } catch (err) {
       res.status(500).json({error: err.message}); 
    }
}

// Ger a Resource by ID
exports.getResourceById = async(req,res)=>{
    try {
        const resource = await Resource.findById(req.params.id);
        if(!resource) return res.status(404).json({error:err.message});
        res.json(resource);
    } catch (err) {
       res.status(500).json({error: err.message}); 
    }
}

// Update a resource by ID
exports.updateResourceByID = async (req,res)=>{
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if(!resource) return res.status(404).json({error: "Resource not Found!"});
    } catch (err) {
       res.status(400).json({error:err.message})

    }
}

// Delete a resource by ID
exports.deleteResourceByID = async (req,res)=>{
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if(!resource) return res.status(404).json({error: "Resource not found!"});
        res.json({message:"Resource Deleted Succsessfully"});
    } catch (err) {
       res.status(500).json({err:message});
    }
}

const Resource = require("../models/resource");
const mongoose = require("mongoose")


// Create a resource
exports.createResource = async (req,res)=>{
    try {
        const {_id,...data} = req.body;
        const resource = new Resource(data);
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

    }try {
    // Validate ID
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    // Validate updates
    const allowedUpdates = ["name", "description", "quantity", "createdBy"];
    const isValidOperation = Object.keys(req.body).every((key) =>
      allowedUpdates.includes(key)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    // Perform update
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure validation rules are enforced
    });

    if (!resource) {
      return res.status(404).json({ error: "Resource not found!" });
    }

    res.status(200).json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

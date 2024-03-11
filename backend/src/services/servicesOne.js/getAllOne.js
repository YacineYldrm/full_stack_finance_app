import Model1 from "../../models/Model1.js"



const getAllOne = async () => {
    const allOne = await Model1.find();
    return allOne
}


export default getAllOne;
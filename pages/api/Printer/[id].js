import dbConnect from "../../../utils/dbConnect";
import Printer from '../../../models/Printer';

dbConnect();

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const printer = await Printer.findById(id);

                if (!printer){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, body: printer});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'PUT':
            try {
                const printer = await Printer.findByIdAndUpdate(id, req.body,{
                    new: true,
                    runValidators: true
                });

                if (!printer){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, body: printer});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedPrinter = await Printer.deleteOne({ _id: id });

                if (!deletedPrinter) {
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, body: {} });
            } catch (error) {
                res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
            break;
    }
}

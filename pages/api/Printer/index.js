import dbConnect from "../../../utils/dbConnect";
import Printer from '../../../models/Printer';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch(method){
        case 'GET':
            try {
                const printer = await Printer.find({});

                res.status(200).json({ success:true, data: printer })
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'POST':
            try {
                const printer = await Printer.create(req.body);

                res.status(201).json({ success: true, data: printer })
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
            break;
    }
}

import fs from "fs";
import csv from 'csv-parser'
import { DiamondStock } from "../models/diamond.model.js";


const parseNumber = (val) => {
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

export const uploadStock = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const cleanedData = {
        stockNumber: row['Stock #']?.trim(),
        availability: row['Availability']?.trim(),
        shape: row['Shape']?.trim(),
        weight: parseNumber(row['Weight']),
        color: row['Color']?.trim(),
        clarity: row['Clarity']?.trim(),
        cutGrade: row['Cut Grade']?.trim(),
        polish: row['Polish']?.trim(),
        symmetry: row['Symmetry']?.trim(),
        fluorescenceIntensity: row['Fluorescence Intensity']?.trim(),
        fluorescenceColor: row['Fluorescence Color']?.trim(),
        measurements: row['Measurements']?.trim(),
        BGM: row['BGM']?.trim(),
        eyeClean: row['Eye Clean']?.trim(),
        lab: row['Lab']?.trim(),
        reportNumber: row['Report #']?.trim(),
        rapLabReportID: row['RapLab Report ID']?.trim(),
        treatment: row['Treatment']?.trim(),
        // rapNetPrice: parseNumber(row['RapNet Price']),
        // rapNetDiscountPercent: parseNumber(row['RapNet Discount %']),
        cashPrice: parseNumber(row['Cash Price']),
        cashPriceDiscountPercent: parseNumber(row['Cash Price Discount %']),
        // buyNowPricePerCt: parseNumber(row['BuyNow Price / ct']),
        // buyNowRapPercent: parseNumber(row['BuyNow Rap %']),
        depthPercent: parseNumber(row['Depth %']),
        tablePercent: parseNumber(row['Table %']),
        girdleThin: row['Girdle Thin']?.trim(),
        girdleThick: row['Girdle Thick']?.trim(),
        girdlePercent: parseNumber(row['Girdle %']),
        girdleCondition: row['Girdle Condition']?.trim(),
        culetSize: row['Culet Size']?.trim(),
        culetCondition: row['Culet Condition']?.trim(),
        crownHeight: parseNumber(row['Crown Height']),
        crownAngle: parseNumber(row['Crown Angle']),
        pavilionDepth: parseNumber(row['Pavilion Depth']),
        pavilionAngle: parseNumber(row['Pavilion Angle']),
        laserInscription: row['Laser Inscription']?.trim(),
        certComment: row['Cert Comment']?.trim(),
        keyToSymbols: row['Key To Symbols']?.trim(),
        memberComment: row['Member Comment']?.trim(),
        starLength: parseNumber(row['Star Length']),
        shade: row['Shade']?.trim(),
        whiteInclusion: row['White Inclusion']?.trim(),
        blackInclusion: row['Black Inclusion']?.trim(),
        openInclusion: row['Open Inclusion']?.trim(),
        milky: row['Milky']?.trim(),
        fancyColor: row['Fancy Color']?.trim(),
        fancyColorIntensity: row['Fancy Color Intensity']?.trim(),
        fancyColorOvertone: row['Fancy Color Overtone']?.trim(),
        country: row['Country']?.trim(),
        state: row['State']?.trim(),
        city: row['City']?.trim(),
        brand: row['Brand']?.trim(),
        sellerSpec: row['Seller Spec']?.trim(),
        sarineID: row['Sarine ID']?.trim(),
        reportFileName: row['Report File Name']?.trim(),
        report2FileName: row['Report 2 File Name']?.trim(),
        websiteLink: row['Website Link']?.trim(),
        images: row['Images'] ? row['Images'].split(',').map(s => s.trim()) : [],
        videos: row['Videos'] ? row['Videos'].split(',').map(s => s.trim()) : [],
        // documents: row['Documents'] ? JSON.parse(row['Documents']) : [],
        tradeShow: row['Trade Show']?.trim(),
        reportType: row['Report Type']?.trim(),
        labLocation: row['Lab Location']?.trim(),
        pairStockNumber: row['Pair Stock Number']?.trim(),
        isMatchedPairSeparable: row['Is Matched Pair Separable']?.toLowerCase() === 'true',
        allowRapLinkFeed: row['Allow RapLink Feed']?.toLowerCase() === 'true',
        parcelStones: row['Parcel Stones']?.trim(),
        tracrID: row['Tracr ID']?.trim(),
        roughSource: row['Rough Source']?.trim(),
        mine: row['Mine']?.trim(),
        owner: req.userId
      };

      results.push(cleanedData);
    })
    .on('end', async () => {
      try {
        await DiamondStock.insertMany(results);
        fs.unlinkSync(filePath); // Delete temp CSV file
        res.status(200).json({ message: 'CSV data uploaded successfully', inserted: results.length });
      } catch (err) {
        console.error('Insert error:', err);
        res.status(500).json({ message: 'Error inserting data', error: err });
      }
    })
    .on('error', (err) => {
      console.error('CSV parse error:', err);
      res.status(500).json({ message: 'Error processing CSV file', error: err });
    });
};

export const getDiamond = async (req, res) => {
  const { page = 1, search, limit = 10, sort, ...filters } = req.query;
  const skip = (page - 1) * limit;
  let query = {};

  try {

    for (let key in filters) {
      if (filters[key]) {
        query[key] = filters[key];
      }
    }
    // If search is provided, override query with $or
    if (search) {
      query = {
        $or: [
          { stockNumber: { $regex: search, $options: "i" } },
          { reportNumber: { $regex: search, $options: "i" } }
        ]
      };
    }

    // Build sort
    let sortQuery = {};
    if (sort) {
      const [field, order] = sort.split('-');
      sortQuery[field] = order === 'asc' ? 1 : -1;
    }
    console.log(query)

    const total = await DiamondStock.countDocuments(query);
    const diamonds = await DiamondStock.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate('owner', 'company firstname');

    return res.status(200).json({
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalDiamonds: total,
      diamonds
    });

  } catch (error) {
    console.error("getDiamond error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const getDiamondById = async (req, res) => {
  const { id } = req.params;
  try {
    const diamond = await DiamondStock.findById(id);
    if (!diamond) {
      return res.status(404).json({ message: "Diamond Not Found", success: false })
    }
    return res.status(200).json({ diamond });
  } catch (error) {
    console.error("getDiamondById error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}

export const changeAvailability = async (req, res) => {
  const { availability, id } = req.body;
  try {
    const diamond = await DiamondStock.findById(id);
    if (!diamond) {
      return res.status(404).json({ message: "Diamond Not Found", success: false })
    }
    diamond.availability = availability;
    await diamond.save();
    return res.status(200).json({ success: true, message: "Diamond Updated successfully", diamond });
  } catch (error) {
    console.error("changeAvailability error:", error);
    return res.status(500).json({ error: "Server Error" });
  }
}
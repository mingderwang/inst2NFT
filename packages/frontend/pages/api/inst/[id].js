// fetch pins data by username
export default async function handler(req, res) {
  console.log("ming");
  const mediaArrayString = req.query.id;
  // Get data from your database
  console.log("mediaArray--->", mediaArrayString);
  res.status(200).json({});
}

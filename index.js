const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "build")));

app.get("/", () => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/pdf", (req, res) => {
  var name = req.body.name;
  console.log("name", name);
  // create a document and pipe to a blob
  var doc = new PDFDocument();

  // draw some text
  doc.fontSize(25).text("Here is some vector graphics...", 100, 80);

  // some vector graphics
  doc
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill("#FF3300");

  doc.circle(280, 200, 50).fill("#6600FF");

  // an SVG path
  doc
    .scale(0.6)
    .translate(470, 130)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // and some justified text wrapped into columns
  doc
    .text("And here is some wrapped text...", 100, 300)
    .font("Times-Roman", 13)
    .moveDown()
    .text("this is an example text", {
      width: 412,
      align: "justify",
      indent: 30,
      columns: 2,
      height: 300,
      ellipsis: true
    });

  // end and display the document in the iframe to the right
  doc.pipe(fs.createWriteStream("public/file.pdf")); // write to PDF
  doc.pipe(res); // HTTP response

  // add stuff to PDF here using methods described below...

  // finalize the PDF and end the stream
  doc.end();
});

const port = 8080;
const host = process.env.HOSTNAME || "0.0.0.0";

// Launch Node.js server
const server = app.listen(port, host, () => {
  console.log(`Node.js API server is listening on http://${host}:${port}/`);
});

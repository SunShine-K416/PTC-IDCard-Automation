function generateIDCards() {
  // Replace with your Google Sheet ID
  const sheetId = 'YOUR_SHEET_ID';
  // Replace with the name of the sheet containing form responses
  const sheetName = 'YOUR_SHEET_NAME';
  // Replace with your Google Slides ID for the ID card template
  const slideId = 'YOUR_SLIDE_ID';
  // Replace with your Google Drive Folder ID where PDFs will be saved
  const folderId = 'YOUR_FOLDER_ID';
  
  // Open the Google Sheet and get the specified sheet by name
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  // Get the data from the sheet starting from row 2 to the last row
  const data = sheet.getRange('B2:O' + sheet.getLastRow()).getValues(); 
  
  // Open the Google Slides presentation template
  const presentation = SlidesApp.openById(slideId);
  // Get the folder where the PDF files will be saved
  const folder = DriveApp.getFolderById(folderId);
  
  // Iterate over each row in the data
  data.forEach(function(row) {
    const [sID, name, std, dob, schl, b, fname, mname, mno, add1, add2, city, pin, imageUrl] = row;
    
    if (name && imageUrl) {
      try {
        // Make a copy of the Google Slides template for each entry
        const copy = DriveApp.getFileById(presentation.getId()).makeCopy(name + '_ID_Card', folder);
        const copiedPresentation = SlidesApp.openById(copy.getId());
        
        // Iterate over each slide in the copied presentation
        const slides = copiedPresentation.getSlides();
        slides.forEach(function(slide) {
          // Iterate over each element on the slide
          const pageElements = slide.getPageElements();
          pageElements.forEach(function(element) {
            // Check if the element is an image
            if (element.getPageElementType() === SlidesApp.PageElementType.IMAGE) {
              try {
                const image = element.asImage();
                // Replace the placeholder image with the user's image
                if (image.getDescription() === 'image-holder') {
                  const formattedImageUrl = formatImageUrl(imageUrl);
                  const blob = UrlFetchApp.fetch(formattedImageUrl).getBlob();
                  
                  // Check if the blob is a valid image before replacing
                  if (blob.getContentType().startsWith('image/')) {
                    image.replace(blob);
                  } else {
                    Logger.log("The fetched blob is not a valid image.");
                  }
                }
              } catch (e) {
                Logger.log("Error processing image: " + e.message);
              }
            }
          });
          
          // Replace text placeholders in the slide with actual data
          const shapes = slide.getShapes();
          shapes.forEach(function(shape) {
            const textRange = shape.getText();
            if (textRange) {
              textRange.replaceAllText('{{Name}}', name);
              textRange.replaceAllText('{{Std}}', std);
              textRange.replaceAllText('{{Date of Birth}}', dob);
              textRange.replaceAllText('{{School}}', schl);
              textRange.replaceAllText('{{b}}', b);
              textRange.replaceAllText('{{ID}}', sID);
              textRange.replaceAllText('{{Father Name}}', fname);
              textRange.replaceAllText('{{Mother Name}}', mname);
              textRange.replaceAllText('{{Mobile Number}}', mno);
              textRange.replaceAllText('{{Address L1}}', add1);
              textRange.replaceAllText('{{Address L2}}', add2);
              textRange.replaceAllText('{{City}}', city);
              textRange.replaceAllText('{{Pincode}}', pin);
            }
          });
        });
        
        // Save and close the copied presentation
        copiedPresentation.saveAndClose();
        
        // Convert the copied presentation to PDF and save it in the folder
        const pdfBlob = copy.getAs('application/pdf');
        folder.createFile(pdfBlob).setName(name + '_ID_Card.pdf');
        
        // Delete the temporary copy of the Google Slides template
        copy.setTrashed(true);
        
        Logger.log('PDF created successfully for: ' + name);
        
      } catch (error) {
        Logger.log('Error creating PDF for ' + name + ': ' + error.message);
      }
    }
  });
}

function formatImageUrl(url) {
  // Adjust URL to be in the correct format for fetching
  return url.replace('https://drive.google.com/open?id=', 'https://drive.google.com/uc?export=view&id=');
}

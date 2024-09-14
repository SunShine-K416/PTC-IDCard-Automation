# ID Card Generator

This Google Apps Script automates the creation of ID cards using data from a Google Form. It integrates Google Sheets, Google Slides, and Google Drive to generate and store ID cards as PDFs.

## Features

- **Form Integration**: Collects ID card details (Name, Date of Birth, Address, etc.) from a Google Form.
- **Google Sheets**: Stores responses from the form.
- **Google Slides**: Uses a predefined slide template to generate ID cards.
- **Google Drive**: Saves generated ID cards as PDFs in a specified folder.

## How It Works

1. The script fetches data from a Google Sheet (`Form Responses 2`).
2. For each entry:
   - A copy of the Google Slides template is made.
   - Placeholders (like `{{Name}}`, `{{Date of Birth}}`) are replaced with actual data.
   - The image placeholder (`image-holder`) is replaced with the user's image from a Google Drive URL.
3. The final ID card is saved as a PDF in Google Drive and named after the individual.

## Google Apps Script

### Function: `generateIDCards()`

The `generateIDCards()` function performs the following tasks:

- Opens the Google Sheet with form responses.
- Iterates through each row, creating a copy of the slide template for each user.
- Replaces placeholders with user details, including images.
- Saves each ID card as a PDF in Google Drive.
- Deletes the temporary slide copy after exporting the PDF.

### Placeholder Details
The placeholders in the slide template include:
- `{{Name}}`: Name of the individual
- `{{Std}}`: Standard or class
- `{{Date of Birth}}`: Date of birth
- `{{Father Name}}`: Father’s name
- `{{Mobile Number}}`: Mobile number
- `{{Address L1}}`: First line of the address
- `{{Address L2}}`: Second line of the address
- `{{City}}`: City name
- `{{Pincode}}`: Postal code
- `{{School}}`: School name
- `{{b}}`: Additional placeholder if needed
- `{{ID}}`: Student or individual ID

## Requirements

- Google Drive folder for saving PDFs.
- Google Sheets for storing form responses.
- Google Slides for the ID card template.

## Real-Time Project Use Case

Implemented for Perfect Tuition Centre, this project automates ID card generation for students, using Google Forms to collect data and the script to generate personalized ID cards efficiently.

## How to Use

1. **Open Google Forms Script Editor:**
   - Open your Google Form.
   - Click on the three vertical dots (More) in the upper right corner.
   - Select `Script editor` from the dropdown menu.

2. **Add the Script:**
   - Copy the `generateIDCards` function from your local repository.
   - Paste it into the Google Apps Script editor.

3. **Set Up IDs:**
   - Replace placeholders in the script with your Google Sheet ID, Google Slides ID, and Google Drive Folder ID.

4. **Save and Authorize:**
   - Save the script.
   - Click on `Run` to authorize the script with your Google account. Follow the prompts to grant necessary permissions.

5. **Create a Trigger (Optional):**
   - To automate the process, you can create a time-based trigger.
   - Go to `Triggers` (clock icon) in the Apps Script editor.
   - Click `+ Add Trigger`, choose `generateIDCards`, and set the desired frequency.

6. **Run the Script:**
   - Execute the `generateIDCards` function by clicking the `Run` button in the Apps Script editor. This will generate ID cards for the students.

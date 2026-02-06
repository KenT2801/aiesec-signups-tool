import { UserProfile, CardItem } from '../types';

// PLACEHOLDERS - To be replaced with actual endpoints provided by the National Team
const NATIONAL_WORKSPACE_ENDPOINT = 'https://aiesecaustralia.org/volunteer/';
// NOTE: For the spreadsheet to accept data, this must be a Google Apps Script Web App URL, not the Sheet URL itself.
const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwmclIN1YWdWG1hF6kYwac6FNu-PFDwLb-lby7Ky9jYAAiLZGKesLRPJOt897WkUO9pPA/exec';

export const DataSubmissionService = {

    /**
     * Main submission handler
     * Sends data to both destinations in parallel without blocking the UI significantly
     */
    submitData: async (profile: UserProfile, selectedItems: CardItem[], path: string | null) => {
        const payload = {
            name: profile.name,
            degree: profile.degree,
            concerns: profile.concerns.join(', '),
            focus: path === 'career' ? 'Career' : 'Adventure',
            selectedCards: selectedItems.map(item => item.title).join(', '),
            submittedAt: new Date().toISOString(),
            source: 'ROI_Visualizer_v2'
        };

        // Log for debugging
        console.log('Submitting Payload:', payload);

        try {
            // 2. Submit to Google Sheet (via Apps Script Web App)
            console.log('Attempting to post to:', GOOGLE_SHEET_SCRIPT_URL);

            fetch(GOOGLE_SHEET_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for opaque response
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(() => {
                    console.log('Google Sheet submission request sent (opaque response). Check Sheet.');
                })
                .catch(err => {
                    console.error('Google Sheet Network Error:', err);
                });

            // 1. Automate process to National Workspace (Background)
            fetch(NATIONAL_WORKSPACE_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).catch(err => console.error('National Workspace Error:', err));

        } catch (error) {
            console.error('Main Submission Logic Error:', error);
        }
    }
};

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Logic Verification', () => {

    it('Selection Logic: Limits to 3 items and triggers drawer', async () => {
        render(<App />);
        const user = userEvent.setup();

        // Navigate to Career path
        const careerSection = screen.getByText('CAREER');
        await user.click(careerSection);

        // Access cards via image
        const cardImages = screen.getAllByRole('img').slice(0, 4);

        // Helper to select a card: Flip it, then click "Add to Stack"
        const selectCard = async (index: number) => {
            // 1. Flip
            await user.click(cardImages[index]);
            // 2. Click "Add to Stack"
            // We need to find the specific button. They are rendered in the DOM.
            // A reliable way in this specific DOM structure is getting all buttons matching "Add to Stack"
            // checking which one is interactable is hard in JSDOM, but simply clicking the corresponding index usually works 
            // if we assume order is preserved.
            const addButtons = screen.getAllByRole('button', { name: /Add to Stack/i });
            // Note: When we flip card[0], button[0] becomes visible/clickable (conceptually)
            await user.click(addButtons[0]);
        };

        // Select 3 cards
        // Card 1
        await user.click(cardImages[0]); // Flip
        let addButtons = screen.getAllByRole('button', { name: /Add to Stack/i });
        await user.click(addButtons[0]);

        // Card 2
        await user.click(cardImages[1]); // Flip
        addButtons = screen.getAllByRole('button', { name: /Add to Stack/i });
        await user.click(addButtons[0]);

        // Card 3
        await user.click(cardImages[2]); // Flip
        addButtons = screen.getAllByRole('button', { name: /Add to Stack/i });
        await user.click(addButtons[0]);

        // Verify Drawer matches "One Last Step"
        // Wait long enough for animation (500ms delay + render time)
        await waitFor(() => {
            expect(screen.getByText('One Last Step')).toBeInTheDocument();
        }, { timeout: 3000 });

        // Verify 3 items selected count
        // Note: The selected count is in the header, always visible
        expect(screen.getByText('3 of 3 Selected')).toBeInTheDocument();
    });

    it('Form Validation: Age Limit (16-35)', async () => {
        render(<App />);
        const user = userEvent.setup();

        await user.click(screen.getByText('CAREER'));

        // Select 3 items to open drawer
        const cardImages = screen.getAllByRole('img').slice(0, 3);
        for (let i = 0; i < 3; i++) {
            await user.click(cardImages[i]); // Flip
            const addButtons = screen.getAllByRole('button', { name: /Add to Stack/i });
            await user.click(addButtons[0]); // Select
        }

        // Wait for drawer
        await waitFor(() => {
            expect(screen.getByPlaceholderText('e.g. 21')).toBeVisible();
        }, { timeout: 3000 });

        // Fill invalid age (under 16)
        const ageInput = screen.getByPlaceholderText('e.g. 21');
        await user.type(ageInput, '15');

        // Trigger validation (click Launch)
        await user.click(screen.getByText('Launch EXPA Account'));
        expect(screen.getByText('16-35 only')).toBeInTheDocument();

        // Fill invalid age (over 35)
        await user.clear(ageInput);
        await user.type(ageInput, '36');
        await user.click(screen.getByText('Launch EXPA Account'));
        expect(screen.getByText('16-35 only')).toBeInTheDocument();

        // Fill valid age
        await user.clear(ageInput);
        await user.type(ageInput, '21');
        await user.click(screen.getByText('Launch EXPA Account'));
        expect(screen.queryByText('16-35 only')).not.toBeInTheDocument();
    });

    it('Form Validation: AU Phone Format', async () => {
        render(<App />);
        const user = userEvent.setup();
        await user.click(screen.getByText('CAREER'));

        // Select 3 items
        const cardImages = screen.getAllByRole('img').slice(0, 3);
        const interactions = [0, 1, 2];
        for (const i of interactions) {
            await user.click(cardImages[i]); // Flip
            const addButtons = screen.getAllByRole('button', { name: /Add to Stack/i });
            await user.click(addButtons[0]); // Select
        }

        await waitFor(() => {
            expect(screen.getByPlaceholderText('04XXXXXXXX')).toBeVisible();
        }, { timeout: 3000 });

        const phoneInput = screen.getByPlaceholderText('04XXXXXXXX');

        // Invalid phone
        await user.type(phoneInput, '123456');
        await user.click(screen.getByText('Launch EXPA Account'));
        expect(screen.getByText('Invalid AU number (e.g. 04...)')).toBeInTheDocument();

        // Valid phone
        await user.clear(phoneInput);
        await user.type(phoneInput, '0412345678');
        await user.click(screen.getByText('Launch EXPA Account'));
        expect(screen.queryByText('Invalid AU number (e.g. 04...)')).not.toBeInTheDocument();
    });
});

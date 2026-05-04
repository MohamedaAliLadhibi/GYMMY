# Ggirl Bloom Journey

This project is now a Next.js app rebuilt from the original single-file HTML prototype.

## Stack

- Next.js App Router
- React
- `next/font` for display and body fonts
- localStorage-based progress persistence

## Run

```bash
npm install
npm run dev
```

## Structure

- `app/` app shell and global styles
- `components/bloom-app.jsx` main client experience
- `data/challenge.js` profile, levels, rewards, and day content
- `public/profile-placeholder.svg` default profile artwork

## Notes

- The experience is preconfigured for Islem, age 22, with a 65 kg goal.
- Progress is saved per day instead of only for the current screen, which fixes the original state bug.

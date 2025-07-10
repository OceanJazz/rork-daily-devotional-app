# Testing Streak Functionality in Cultivate

## How Streak Tracking Works

### Streak Rules
1. **Start a streak**: Journal on any day = 1 day streak
2. **Continue streak**: Journal on consecutive days = streak increases
3. **Break streak**: Skip a day = streak resets to 0
4. **Maintain streak**: Journal today if you journaled yesterday

### Testing Steps

#### Test 1: Start New Streak
1. Open app and go to Today tab
2. Write something in "Your Reflection" section
3. Tap "Save"
4. Check streak counter shows "1 day streak"

#### Test 2: Continue Streak (Simulation)
Since you can't wait for tomorrow, you can test by:
1. Going to Settings > About and noting current date
2. Journal today (should show 1 day streak)
3. The streak will continue if you journal tomorrow

#### Test 3: Check Streak Persistence
1. Journal and save
2. Close app completely
3. Reopen app
4. Streak should be maintained

#### Test 4: Verify Best Streak
1. If current streak > previous best, "Best" should update
2. Best streak is always the highest streak achieved

### Streak Display
- **Current Streak**: Shows consecutive days journaled
- **Best Streak**: Shows your all-time highest streak
- **Updates**: Automatically when you save a journal entry

### Debugging Streak Issues
If streak seems incorrect:
1. Check if you've actually saved a journal entry (not just typed)
2. Streak only counts when you tap "Save"
3. One journal entry per day counts toward streak
4. Multiple entries on same day don't increase streak

The streak tracking has been improved to be more accurate and reliable.
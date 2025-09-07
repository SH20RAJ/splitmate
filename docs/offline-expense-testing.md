# Offline Expense Recording Feature - Testing Guide

This document provides instructions for testing the offline expense recording feature implemented using IndexedDB.

## Prerequisites

1. The application should be running locally or deployed
2. Browser with IndexedDB support (modern browsers)
3. Ability to simulate offline/online network conditions

## Testing Scenarios

### 1. Offline Expense Recording

**Objective**: Verify that expenses can be recorded when offline

**Steps**:
1. Open the application in a browser
2. Navigate to the "Add Expense" page
3. Turn on browser's offline mode or disconnect from the network
4. Fill in the expense form with valid data
5. Click "Save Offline"
6. Verify that:
   - Success message is displayed: "Expense saved offline. It will be synced when you're back online."
   - Expense is stored in IndexedDB
   - Offline indicator shows pending expenses count

**Expected Results**:
- Expense is saved locally in IndexedDB
- UI shows offline status
- Pending expenses count is updated

### 2. Online Expense Recording

**Objective**: Verify that expenses are recorded directly to the server when online

**Steps**:
1. Ensure browser is online
2. Navigate to the "Add Expense" page
3. Fill in the expense form with valid data
4. Click "Add Expense"
5. Verify that:
   - Success message is displayed: "Expense added successfully!"
   - Expense is stored in the server database
   - Form is reset

**Expected Results**:
- Expense is saved directly to the server
- UI shows online status
- No pending expenses in IndexedDB

### 3. Automatic Sync When Coming Online

**Objective**: Verify that offline expenses are automatically synced when connection is restored

**Steps**:
1. Record one or more expenses while offline
2. Verify expenses are stored in IndexedDB
3. Turn off offline mode or reconnect to the network
4. Wait for automatic sync to complete
5. Verify that:
   - Sync progress is shown in UI
   - Expenses are sent to the server
   - Expenses are removed from IndexedDB after successful sync

**Expected Results**:
- Offline expenses are automatically synced when connection is restored
- UI shows sync progress
- IndexedDB is cleared of successfully synced expenses

### 4. Manual Sync Trigger

**Objective**: Verify that offline expenses can be manually synced

**Steps**:
1. Record one or more expenses while offline
2. Verify expenses are stored in IndexedDB
3. While still offline, click the "Sync" button in the offline status banner
4. Reconnect to the network
5. Click the "Sync" button again
6. Verify that:
   - Sync progress is shown in UI
   - Expenses are sent to the server
   - Expenses are removed from IndexedDB after successful sync

**Expected Results**:
- Manual sync trigger works correctly
- Offline expenses are synced when requested and online
- UI shows sync progress

### 5. Duplicate Expense Prevention

**Objective**: Verify that duplicate expenses are not recorded

**Steps**:
1. Record an expense while offline
2. Immediately try to record the same expense again
3. Verify that:
   - Error message is displayed: "This expense appears to have already been added"
   - No duplicate is stored in IndexedDB

**Expected Results**:
- Duplicate expenses are prevented
- Appropriate error message is shown

### 6. Sync Failure Handling

**Objective**: Verify that failed sync attempts are handled correctly

**Steps**:
1. Record an expense while offline
2. Modify server API to return an error (simulate server issue)
3. Reconnect to the network
4. Wait for automatic sync attempt
5. Verify that:
   - Expense remains in IndexedDB
   - Sync status is updated to "failed"
   - Retry count is incremented

**Expected Results**:
- Failed sync attempts are handled gracefully
- Expenses remain in IndexedDB for retry
- Retry count is tracked

## IndexedDB Verification

To verify data in IndexedDB:

1. Open browser's Developer Tools
2. Go to Application/Storage tab
3. Find IndexedDB section
4. Look for "SplitMateDB" database
5. Check "expenses" object store for saved expenses

## Edge Cases to Test

1. **Large number of offline expenses**: Test with 50+ offline expenses
2. **Browser restart**: Record offline expenses, close and reopen browser, verify data persistence
3. **Multiple tabs**: Open multiple tabs, record expenses in each, verify consistency
4. **Network flakiness**: Simulate intermittent connectivity during sync
5. **Server errors**: Test with various server error responses (400, 500, etc.)

## Troubleshooting

If offline functionality is not working:

1. Check browser console for JavaScript errors
2. Verify IndexedDB is supported and not blocked
3. Ensure service worker is registered and running
4. Check network requests in Developer Tools
5. Verify server API endpoints are accessible

## Success Criteria

All tests should pass with:
- No data loss
- Correct UI status indicators
- Proper error handling
- Data consistency between local and server storage
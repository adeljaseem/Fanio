# Feature copy and source evidence

This website's product claims were checked against the supplied Fanio application source, whose `package.json` identifies version 2.5.3. This was a source review, not a test of a signed-in application, deployed backend, or release APK. Paths below refer to that separate application; its code and configuration are not bundled with this website.

## Source-to-copy matrix

| Website claim | Evidence in the supplied application | Scope |
| --- | --- | --- |
| Record income and expenses | `src/components/Daily/DailyView.jsx`; `src/hooks/useExpenses.js` | The reachable entry form supports Income and Expense, with date, category, note and account selection. |
| Organise records by category | `src/hooks/useCategories.jsx`; category manager in `DailyView.jsx` | Built-in and custom categories/groups. |
| Daily, monthly and yearly views | Routes in `src/App.jsx`; `DailyView.jsx`, `MonthlyView.jsx`, `YearlyView.jsx` | Reports use recorded data. |
| Build an income plan | `src/components/Budget/IncomePlanSheet.jsx`; `src/hooks/useBudget.js` | A planning amount, not an automatically detected salary or bank balance. |
| Everyday budgets and protected allocations | `src/components/Budget/BudgetView.jsx`; `src/lib/budgetMath.js` | Allocations can reserve money for bills or savings; separate target-date savings goals are not claimed. |
| Check available amounts | `src/components/Daily/SpendableNowCard.jsx`; `src/lib/spendableNow.js` | Estimates account for recorded spending, protected allocations, recurring commitments and an optional buffer. The cash-backed calculation requires confirmed account balances. |
| Preview a purchase's effect | `SpendableNowCard.jsx`; `simulateBudgetPurchase` in `spendableNow.js` | A hypothetical preview only; it does not create an expense or pay a bill. |
| Keep recurring expenses and due dates visible | `src/components/Recurring/RecurringView.jsx`; `src/hooks/useRecurring.js` | Daily, weekly, monthly and yearly schedules. Log Now is present. Due entries can also be recorded when the app loads; this is not a payment service. |
| Search and filter records | `src/components/Search/SearchView.jsx`; `src/hooks/useSearch.js` | Text, categories, date ranges and amount ranges. No payment-method filter was found. |
| Export CSV records and summaries | `src/hooks/useExport.js`; export controls in Daily and Monthly views | Daily/monthly records and monthly category summaries. Not a complete account backup; PDF/Excel exports are not claimed. |
| Android app lock | `src/components/Settings/SecuritySettings.jsx`; `src/components/Security/AppLockGate.jsx`; `android/app/src/main/java/com/fanio/app/AppLockPlugin.java` | Optional supported biometrics or Android screen-lock credentials; device setup and capability are required. |
| Light and dark themes | `src/hooks/useTheme.jsx`; `src/styles/fanam-theme.css` | Website assets and palette are traced separately in the brand documentation. |
| No direct bank connection | `src/hooks/useAccounts.js`; `src/components/Accounts/AccountsView.jsx` | Account balances are user-maintained records, not a live bank feed. |

## Conditional Android capture

`src/lib/featureFlags.js` defaults `VITE_PAYMENT_CAPTURE_FEATURE` to `OFF`. Capture settings are also initially disabled in `src/lib/paymentCapture.js`. The website therefore presents automatic capture only as an optional capability of supported, enabled Android builds.

When enabled and permissioned, the native receivers/parsers can suggest recognized new bank debit SMS transactions or supported payment-app notifications. They do not import the existing SMS inbox, recognize every institution/message, or provide bank synchronization. The default review workflow exists alongside a configurable high-confidence auto-add mode, so the website does not promise individual approval for every capture.

The FAQ tells visitors to ask which features are enabled in their APK. Manual tracking remains available. APK release status cannot be inferred from source code alone.

## Illustrative preview data

The phone is a custom interactive illustration using the supplied brand assets and source-grounded features. It is labelled **“Interactive preview · Example data, not an app screenshot.”** No account is signed in and no personal financial records are loaded.

- Daily expenses are ₹950 + ₹140 + ₹150 = **₹1,240**. Their displayed average is ₹413.33 after rounding.
- The ₹18,760 available-this-month number is an illustrative planning estimate. It is not calculated from the three daily rows, which are only one day's entries.
- The Budget example has an income plan of ₹45,000, ₹35,000 allocated and ₹10,000 unallocated. Visible allocations are Food ₹8,000, Transport ₹3,000 and Rent ₹12,000: **₹23,000 shown**. A note accounts for the remaining ₹12,000 allocated elsewhere.
- Food spending is ₹4,200 of ₹8,000, leaving **₹3,800**; Transport is ₹1,500 of ₹3,000. Rent is a protected allocation rather than an amount already spent.
- Recurring amounts and dates are examples. The website does not schedule notifications, make payments, or save transactions.

## Claims intentionally excluded

No user-facing refund/transfer creation UI was found, despite ledger support for those types. The website also avoids claims for AI advice, receipt OCR, family/shared budgets, target-based savings goals, multiple currencies, live bank synchronization, PDF/Excel reports, or an iPhone release. Amounts use INR, matching `src/lib/brand.js` and `src/lib/currency.js`.

## APK request and website boundary

The contact address is preserved from the supplied website's explicit public email link: **adiljaseem.2000@gmail.com**. The request form creates a `mailto:` draft; the visitor must review and send it in their email application. It is not an automatic APK download or a backend submission. A visible address and copy option provide a fallback.

**“Google Play — coming soon”** is included as requested, without a fabricated store URL or release date. The marketing website has no authentication, financial API, Supabase connection, analytics or app database. Its only browser-stored preference is the selected website theme.

# Welth — Full-Stack Personal Finance & Budgeting App

Welth is a full-stack personal finance and budgeting application for iOS and Android, built with Expo, React Native, and Supabase. It helps users manage accounts, track income and expenses, monitor monthly budgets, and gain insights into their spending with AI-powered tools.

With support for manual entry, receipt scanning, and voice input, Welth makes managing personal finances simple and convenient.

## Features

### Account Management
- Create and manage multiple accounts, including cash, bank accounts, credit cards, and savings.
- Set a default account for transactions.
- Track account balances and monitor your available funds.

### Transaction Management
- Record income and expenses.
- Organize transactions by category.
- Search and filter transactions.
- View daily income and expense charts.
- Track transaction dates, descriptions, and input methods.

### AI-Powered Receipt Scanning
- Capture a receipt using your device's camera or select an existing image.
- Use Google Gemini to extract transaction details automatically.
- Identify the amount, category, and description from receipt images.

### AI-Powered Voice Entry
- Add transactions using natural language.
- Automatically transcribe and interpret spoken transaction details.
- Convert statements such as "I spent 400 on groceries yesterday" into structured transaction records.

### Monthly Budget Management
- Set a monthly spending budget.
- Monitor spending against your budget.
- Track budget usage from the dashboard.
- Receive email alerts when spending reaches 80% and 100% of your monthly budget.

### AI Financial Assistant
- Ask questions about your spending.
- Get AI-powered insights to better understand your financial activity.
- Use spending information to support more informed budgeting decisions.

### CSV Export
- Export recent transactions to CSV format.
- Share exported transaction data from the Transactions screen.
- Keep a convenient record of your financial activity.

### Onboarding
- Configure your preferred currency.
- Set your starting balance.
- Complete the initial setup before managing your finances.

### Automated Email Notifications
Welth includes two scheduled Supabase Edge Functions:

- **Budget Alerts:** Runs daily and sends email notifications when users first cross the 80% and 100% monthly budget thresholds.
- **Weekly Financial Tips:** Runs every Monday and uses Google Gemini to generate personalized tips based on the user's transactions from the previous seven days.

These functions run independently of the mobile application. They use Resend for email delivery and Supabase for financial data.

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile application |
| Expo SDK 54 | Mobile development and tooling |
| Expo Router | File-based navigation |
| Clerk | Authentication and user management |
| Supabase | Backend, PostgreSQL database, and Row Level Security |
| Google Gemini | AI-powered receipt scanning, voice extraction, and financial tips |
| NativeWind | Tailwind CSS styling for React Native |
| Zustand | Client-side state management |
| TanStack Query | Server-state management and data fetching |
| React Hook Form | Form management |
| Zod | Schema validation |
| Resend | Email delivery for budget alerts and weekly tips |

## Getting Started

### Prerequisites

Before setting up the project, ensure you have:

- Node.js and npm installed.
- A Clerk account and application.
- A Supabase project.
- A Google Gemini API key.
- A Resend account if you want to enable automated email notifications.
- Expo Go, an Android emulator, an iOS simulator, or a compatible development build.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Welth
```

Replace the repository URL with your GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_KEY=
EXPO_PUBLIC_GEMINI_API_KEY=
```

Add the corresponding values from your Clerk, Supabase, and Google AI configurations.

**Security note:** Variables prefixed with `EXPO_PUBLIC_` are exposed to the client application. Use publishable or otherwise client-safe keys only. Never put service-role keys, private API secrets, or other privileged credentials in this file.

### 4. Configure Clerk Authentication in Supabase

Welth uses Clerk for authentication and Supabase's native third-party authentication integration.

1. Open your Supabase project dashboard.
2. Navigate to **Authentication → Sign In / Providers → Clerk**.
3. Configure Clerk as a third-party authentication provider.
4. Verify that authenticated requests expose the Clerk user ID through `auth.jwt()->>'sub'`.

This setup does not require the legacy Supabase JWT template approach.

### 5. Set Up the Database

Open your Supabase dashboard and navigate to **SQL Editor**.

Run the SQL schema and Row Level Security policies provided in the database setup section below, or execute `scripts/schema.sql` if the project includes that file.

The database contains four primary tables:

- `users` — user profiles and onboarding preferences.
- `accounts` — account types, balances, and default account settings.
- `transactions` — income, expenses, categories, and transaction metadata.
- `budgets` — monthly budget amounts and alert-tracking information.

Ensure Row Level Security is enabled and policies are configured before using the application.

### 6. Start the Application

```bash
npx expo start -c
```

Use the Expo CLI options to open the app in a supported environment:

- Expo Go, for compatible features in the Expo sandbox.
- An Android emulator.
- An iOS simulator.
- A development build.

Some native integrations and features may require a development build rather than Expo Go.

## Database Schema and Security Policies

The following SQL statements define the core tables and their Row Level Security policies.

### Users Table

Stores user profiles and onboarding preferences.

```sql
create table users (
  clerk_id text primary key,
  email text not null,
  name text,
  image_url text,
  currency text,
  created_at timestamp with time zone default now()
);
```

**Row Level Security**

```sql
alter table users enable row level security;

create policy "Users can insert own row"
on users for insert
with check (clerk_id = auth.jwt()->>'sub');

create policy "Users can read own row"
on users for select
using (clerk_id = auth.jwt()->>'sub');

create policy "Users can update own row"
on users for update
using (clerk_id = auth.jwt()->>'sub')
with check (clerk_id = auth.jwt()->>'sub');
```

### Accounts Table

Stores cash, bank, credit card, and savings accounts.

```sql
create table accounts (
  id uuid default gen_random_uuid() primary key,
  user_id text not null
    references users(clerk_id) on delete cascade,
  name text not null,
  type text not null,
  balance numeric not null default 0,
  is_default boolean not null default false,
  created_at timestamp with time zone default now()
);
```

Supported account types: `CASH`, `BANK`, `CREDIT_CARD`, and `SAVINGS`.

**Row Level Security**

```sql
alter table accounts enable row level security;

create policy "Users can manage own accounts"
on accounts for all
using (user_id = auth.jwt()->>'sub')
with check (user_id = auth.jwt()->>'sub');
```

### Transactions Table

Stores income, expenses, categories, descriptions, and input metadata.

```sql
create table transactions (
  id uuid default gen_random_uuid() primary key,
  user_id text not null
    references users(clerk_id) on delete cascade,
  account_id uuid not null
    references accounts(id) on delete cascade,
  type text not null,
  amount numeric not null,
  category text not null,
  description text,
  date timestamp with time zone not null default now(),
  status text not null default 'COMPLETED',
  input_method text not null default 'MANUAL',
  voice_transcript text,
  is_flagged boolean not null default false,
  flag_reason text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

Supported transaction types: `INCOME` and `EXPENSE`.

Supported input methods: `MANUAL`, `RECEIPT_SCAN`, and `VOICE`.

**Row Level Security**

```sql
alter table transactions enable row level security;

create policy "Users can manage own transactions"
on transactions for all
using (user_id = auth.jwt()->>'sub')
with check (user_id = auth.jwt()->>'sub');
```

### Budgets Table

Stores each user's monthly budget and email alert tracking.

```sql
create table budgets (
  id uuid default gen_random_uuid() primary key,
  user_id text not null unique
    references users(clerk_id) on delete cascade,
  amount numeric not null,
  last_alert_sent timestamp with time zone,
  last_alert_threshold numeric,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

The `last_alert_threshold` field tracks the most recently notified budget threshold, such as 80% or 100%.

**Row Level Security**

```sql
alter table budgets enable row level security;

create policy "Users can manage own budget"
on budgets for all
using (user_id = auth.jwt()->>'sub')
with check (user_id = auth.jwt()->>'sub');
```

## Automated Email Functions

The project includes two Supabase Edge Functions in `supabase/functions/`.

### Budget Alerts

Function: `check-budget-alerts`

- Runs daily.
- Sends an email when a user first reaches 80% of their monthly budget.
- Sends another email when the user first reaches 100%.
- Uses the budget alert fields to prevent duplicate alerts within the same month.

### Weekly Financial Tips

Function: `weekly-tips`

- Runs every Monday.
- Uses Google Gemini to generate short, personalized financial tips.
- Bases recommendations on the user's transactions from the previous seven days.
- Sends the tips by email.

Both functions run as scheduled backend jobs and do not need to be called from the mobile application.

## Deploying Supabase Edge Functions

### 1. Install and Link the Supabase CLI

Log in to Supabase:

```bash
npx supabase login
```

Initialize Supabase configuration if it does not already exist:

```bash
npx supabase init
```

Link the project:

```bash
npx supabase link --project-ref <your-project-ref>
```

Replace the placeholder with your actual Supabase project reference.

### 2. Apply the Database Schema

Run the schema from the Supabase dashboard's SQL Editor, or use the project's existing `scripts/schema.sql` file.

### 3. Deploy the Functions

```bash
npx supabase functions deploy check-budget-alerts
npx supabase functions deploy weekly-tips
```

Alternatively, deploy the functions through the Supabase dashboard. Include the corresponding `index.ts` files and any shared dependencies under `_shared/`.

### 4. Configure Edge Function Secrets

Set the following secrets in the Supabase dashboard under **Edge Functions → Secrets**, or through the CLI:

```bash
npx supabase secrets set RESEND_API_KEY=your_resend_api_key
npx supabase secrets set RESEND_FROM_EMAIL="Welth <onboarding@resend.dev>"
npx supabase secrets set GEMINI_API_KEY=your_gemini_api_key
```

Optional email logo:

```bash
npx supabase secrets set EMAIL_LOGO_URL=https://your-public-logo-url
```

Configuration details:

- `RESEND_API_KEY` — API key for Resend email delivery.
- `RESEND_FROM_EMAIL` — sender address for notifications.
- `GEMINI_API_KEY` — Google Gemini API key used by the backend functions.
- `EMAIL_LOGO_URL` — optional publicly accessible logo URL for email templates.

For initial testing, Resend's `onboarding@resend.dev` sender is restricted to the email address registered with Resend. For broader delivery, verify a domain and configure an appropriate sender address.

Supabase provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` automatically in the Edge Function runtime. Do not attempt to set these reserved environment variables through the secrets command.

The mobile application's `EXPO_PUBLIC_GEMINI_API_KEY` and the backend's `GEMINI_API_KEY` serve different runtime contexts. Keep privileged backend credentials out of the client.

### 5. Schedule the Functions

Open the Supabase SQL Editor and execute `scripts/cron_jobs.sql` after replacing the placeholders in the two `vault.create_secret(...)` calls with the real project URL and service-role key.

The scheduled jobs are configured to run at:

- **Budget alerts:** Daily at 9:00 AM UTC.
- **Weekly financial tips:** Mondays at 9:00 AM UTC.

Ensure the required scheduling extensions and Vault configuration are available in your Supabase project.

## Testing Scheduled Functions

You can test the functions without waiting for their scheduled execution.

### Using the Supabase Dashboard

1. Open your Supabase project.
2. Navigate to **Edge Functions**.
3. Select the function you want to test.
4. Use the test or invoke panel.
5. Review the response and execution logs.

### Using cURL

Budget alert function:

```bash
curl -i --location --request POST \
  'https://<project-ref>.supabase.co/functions/v1/check-budget-alerts' \
  --header 'Authorization: Bearer <anon-or-service-role-key>'
```

Replace the placeholders with the correct project reference and an appropriate key. Use a privileged service-role key only in a trusted local environment; never expose it in the mobile app or commit it to the repository.

A response such as `{"sent": 0}` can be normal when no users qualify for a notification.

For budget alert testing, ensure a test user has spending at or above the relevant threshold. For weekly tips, ensure the test user has transactions within the previous seven days.

The budget alert fields can prevent repeat notifications within a month. Reset the appropriate test budget fields between tests when necessary.

## Project Structure

The project follows an Expo Router application structure and includes backend functions and SQL scripts. A typical layout is:

```text
Welth/
├── app/                     # Expo Router screens and navigation
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks
├── lib/                     # Shared utilities and integrations
├── store/                   # Zustand state management
├── supabase/
│   └── functions/
│       ├── check-budget-alerts/
│       ├── weekly-tips/
│       └── _shared/
├── scripts/
│   ├── schema.sql
│   └── cron_jobs.sql
├── .env                     # Local environment variables
├── .gitignore
├── app.json
├── package.json
└── README.md
```

*Note: The directory tree is illustrative. Actual folders and filenames may differ depending on the project implementation.*

## Security Considerations

- Keep `.env` files out of version control.
- Never commit service-role keys or private API credentials.
- Use Row Level Security to restrict access to each user's records.
- Configure Clerk and Supabase third-party authentication correctly.
- Use server-side secrets for privileged backend operations.
- Verify authorization policies and API access before deploying to production.

## License

Add your preferred open-source license or specify the applicable project license before distributing the project.

# MASS Techno Power Infrastructure - Supabase Setup Guide

Complete step-by-step guide to set up your Supabase backend for the MASS Techno Power Infrastructure website.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Create Supabase Project](#create-supabase-project)
3. [Run Database Schema](#run-database-schema)
4. [Configure Authentication](#configure-authentication)
5. [Create Admin User](#create-admin-user)
6. [Configure Storage Buckets](#configure-storage-buckets)
7. [Get API Keys](#get-api-keys)
8. [Update Environment Variables](#update-environment-variables)
9. [Set Up EmailJS (Optional)](#set-up-emailjs-optional)
10. [Testing](#testing)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- A [Supabase account](https://supabase.com) (free tier works)
- Node.js 18+ installed
- Access to the project codebase

---

## Create Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in project details:
   - **Name**: `mass-techno-power` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
4. Click **"Create new project"**
5. Wait for project to be ready (usually 2-3 minutes)

---

## Run Database Schema

### Option A: Using SQL Editor (Recommended)

1. In your Supabase Dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `supabase/schema.sql` from your project
4. Paste it into the SQL Editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. Wait for execution to complete (you should see "Success")

### Option B: Running in Sections

If you encounter errors, run the schema in sections:

1. **Run Enums first** (lines 1-20)
2. **Run User Roles table** (lines 22-80)
3. **Run each table separately** (services, growth_chart, partners, etc.)
4. **Run triggers** (lines 350-380)
5. **Run storage buckets** (lines 385-420)
6. **Run storage policies** (lines 425-530)
7. **Run seed data** (lines 535-end)

---

## Configure Authentication

### Enable Email Authentication

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. Configure settings:
   - ✅ Enable email confirmations (recommended for production)
   - ✅ Enable secure email change
   - Set **Minimum password length**: 8

### Configure Site URL

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL**: Your production domain (e.g., `https://masstechnopower.com`)
3. Add **Redirect URLs**:
   ```
   http://localhost:5173/**
   http://localhost:3000/**
   https://your-domain.com/**
   https://*.lovable.app/**
   ```

### Disable Email Confirmation (Development Only)

For easier testing during development:
1. Go to **Authentication** → **Email Templates**
2. Under **Auth Settings**, toggle off "Enable email confirmations"

> ⚠️ **Important**: Re-enable email confirmations for production!

---

## Create Admin User

### Step 1: Create User Account

1. Go to **Authentication** → **Users**
2. Click **"Add User"** → **"Create New User"**
3. Enter:
   - **Email**: Your admin email (e.g., `admin@masstechnopower.com`)
   - **Password**: A strong password
4. Click **"Create User"**
5. Note the **User ID** (UUID) shown in the user list

### Step 2: Assign Admin Role

1. Go to **SQL Editor**
2. Run the following SQL (replace `YOUR_USER_ID` with the actual UUID):

```sql
-- Replace the UUID below with your admin user's ID
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin');

-- Example:
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin');
```

### Step 3: Verify Admin Role

Run this query to confirm:
```sql
SELECT u.email, ur.role 
FROM auth.users u 
JOIN public.user_roles ur ON u.id = ur.user_id;
```

---

## Configure Storage Buckets

The schema automatically creates these buckets:
- `gallery` - Gallery images (public)
- `partners` - Partner logos (public)
- `team` - Team member photos (public)
- `services` - Service images (public)
- `resumes` - Resume uploads (private)
- `certifications` - Certification images (public)

### Verify Buckets

1. Go to **Storage** in the sidebar
2. You should see all 6 buckets listed
3. Click each bucket to verify it exists

### If Buckets Weren't Created

Run this SQL manually:
```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('partners', 'partners', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('team', 'team', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('services', 'services', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('certifications', 'certifications', true);
```

---

## Get API Keys

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** under "Project Settings"
3. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIs...`
   - **service_role key**: `eyJhbGciOiJIUzI1NiIs...` (keep secret!)

---

## Update Environment Variables

### For Lovable Cloud (Automatic)

If using Lovable Cloud, the environment variables are automatically set.

### For Local Development

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
VITE_SUPABASE_PROJECT_ID=your-project-id
```

### For Production Deployment

Set these environment variables in your hosting platform (Vercel, Netlify, etc.):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

---

## Set Up EmailJS (Optional)

For email notifications on form submissions:

### Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Add an email service (Gmail, Outlook, etc.)

### Step 2: Create Email Templates

Create templates for:
- Quote submissions
- Career applications
- Contact form submissions

### Step 3: Get API Keys

1. Go to **Account** → **API Keys**
2. Copy your **Public Key**

### Step 4: Add to Environment

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Testing

### Test Database Connection

1. Start your development server: `npm run dev`
2. Open browser console (F12)
3. Navigate to the website
4. Check for any Supabase connection errors

### Test Admin Login

1. Go to `/admin/login`
2. Log in with your admin credentials
3. Verify you can access the dashboard

### Test Form Submissions

1. Submit a test quote request
2. Submit a test contact form
3. Check Supabase dashboard for new entries

### Test CRUD Operations

1. Log in as admin
2. Try adding a new service
3. Try editing an existing team member
4. Try uploading an image to gallery

---

## Troubleshooting

### "Permission denied" Errors

**Cause**: RLS policies blocking access

**Solution**:
```sql
-- Check if is_admin function exists
SELECT public.is_admin();

-- Verify user role
SELECT * FROM public.user_roles WHERE user_id = auth.uid();
```

### Storage Upload Fails

**Cause**: Storage policies not applied

**Solution**: Re-run storage policies section of schema.sql

### "relation does not exist" Error

**Cause**: Tables not created

**Solution**: 
1. Check SQL Editor for error messages
2. Run schema sections one by one
3. Look for syntax errors

### Auth Redirect Issues

**Cause**: Incorrect redirect URLs

**Solution**:
1. Go to Authentication → URL Configuration
2. Add your domain to Redirect URLs
3. Include both http and https versions

### CORS Errors

**Cause**: Domain not allowed

**Solution**: Add your domain to the allowed origins in Supabase settings

---

## Database Schema Reference

### Tables Overview

| Table | Purpose | Public Access |
|-------|---------|---------------|
| `user_roles` | Admin role management | No |
| `services` | Service listings | Read only |
| `growth_chart` | Financial data | Read only |
| `partners` | Partner logos | Read only |
| `quotes` | Quote submissions | Insert only |
| `careers` | Job applications | Insert only |
| `contact_messages` | Contact form | Insert only |
| `gallery` | Image gallery | Read only |
| `team_members` | Team info | Read only |
| `testimonials` | Customer reviews | Read only |
| `certifications` | ISO certificates | Read only |

### Storage Buckets

| Bucket | Purpose | Public |
|--------|---------|--------|
| `gallery` | Gallery images | Yes |
| `partners` | Partner logos | Yes |
| `team` | Team photos | Yes |
| `services` | Service images | Yes |
| `resumes` | Application resumes | No |
| `certifications` | Certificate images | Yes |

---

## Security Checklist

Before going to production:

- [ ] Enable email confirmations
- [ ] Set strong database password
- [ ] Review RLS policies
- [ ] Remove test data
- [ ] Set proper Site URL
- [ ] Configure allowed redirect URLs
- [ ] Test all admin functions
- [ ] Enable 2FA for admin accounts
- [ ] Review storage policies
- [ ] Set up database backups

---

## Support

For issues with:
- **Supabase**: [Supabase Discord](https://discord.supabase.com/)
- **This Setup**: Check project README or create an issue
- **Lovable**: [Lovable Discord](https://discord.com/channels/1119885301872070706)

---

## Quick Reference Commands

```sql
-- Check admin users
SELECT u.email, ur.role FROM auth.users u 
JOIN public.user_roles ur ON u.id = ur.user_id 
WHERE ur.role = 'admin';

-- Add new admin
INSERT INTO public.user_roles (user_id, role) 
VALUES ('USER_UUID', 'admin');

-- Check table data counts
SELECT 
  (SELECT COUNT(*) FROM services) as services,
  (SELECT COUNT(*) FROM partners) as partners,
  (SELECT COUNT(*) FROM team_members) as team_members,
  (SELECT COUNT(*) FROM gallery) as gallery,
  (SELECT COUNT(*) FROM quotes) as quotes,
  (SELECT COUNT(*) FROM careers) as careers,
  (SELECT COUNT(*) FROM contact_messages) as contacts;

-- Reset all form submissions
TRUNCATE quotes, careers, contact_messages;
```

---

**Setup Complete!** 🎉

Your Supabase backend is now ready. The website will automatically fetch data from these tables and allow admin management through the dashboard.

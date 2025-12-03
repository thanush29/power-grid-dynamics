-- =====================================================
-- MASS Techno Power Infrastructure - Supabase Schema
-- Complete Database Setup Script
-- =====================================================

-- =====================================================
-- 1. ENUMS
-- =====================================================

-- Quote status enum
CREATE TYPE public.quote_status AS ENUM ('new', 'contacted', 'closed', 'completed');

-- Career application status enum
CREATE TYPE public.career_status AS ENUM ('new', 'selected', 'rejected');

-- Contact message status enum
CREATE TYPE public.contact_status AS ENUM ('new', 'contacted');

-- User roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- =====================================================
-- 2. USER ROLES TABLE (for admin authentication)
-- =====================================================

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 3. SERVICES TABLE
-- =====================================================

CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    short_description TEXT,
    description TEXT,
    icon TEXT,
    points TEXT[] DEFAULT '{}',
    photos TEXT[] DEFAULT '{}',
    sections JSONB DEFAULT '[]',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can read active services
CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
USING (is_active = true);

-- Admins can manage services
CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 4. GROWTH CHART DATA TABLE
-- =====================================================

CREATE TABLE public.growth_chart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year TEXT NOT NULL UNIQUE,
    value NUMERIC NOT NULL,
    is_projection BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.growth_chart ENABLE ROW LEVEL SECURITY;

-- Public can read growth data
CREATE POLICY "Anyone can view growth chart data"
ON public.growth_chart
FOR SELECT
USING (true);

-- Admins can manage growth data
CREATE POLICY "Admins can manage growth chart"
ON public.growth_chart
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 5. PARTNERS TABLE
-- =====================================================

CREATE TABLE public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Public can read active partners
CREATE POLICY "Anyone can view active partners"
ON public.partners
FOR SELECT
USING (is_active = true);

-- Admins can manage partners
CREATE POLICY "Admins can manage partners"
ON public.partners
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 6. QUOTES TABLE (Quote Form Submissions)
-- =====================================================

CREATE TABLE public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    budget_range TEXT,
    project_details TEXT NOT NULL,
    status quote_status NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Anyone can submit quotes (insert)
CREATE POLICY "Anyone can submit quotes"
ON public.quotes
FOR INSERT
WITH CHECK (true);

-- Admins can view and manage quotes
CREATE POLICY "Admins can view all quotes"
ON public.quotes
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update quotes"
ON public.quotes
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete quotes"
ON public.quotes
FOR DELETE
TO authenticated
USING (public.is_admin());

-- =====================================================
-- 7. CAREERS TABLE (Job Applications)
-- =====================================================

CREATE TABLE public.careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    current_role TEXT,
    apply_for TEXT NOT NULL,
    experience_years INTEGER,
    dob DATE,
    gender TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    status career_status NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

-- Anyone can submit career applications
CREATE POLICY "Anyone can submit career applications"
ON public.careers
FOR INSERT
WITH CHECK (true);

-- Admins can view and manage careers
CREATE POLICY "Admins can view all careers"
ON public.careers
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update careers"
ON public.careers
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete careers"
ON public.careers
FOR DELETE
TO authenticated
USING (public.is_admin());

-- =====================================================
-- 8. CONTACT MESSAGES TABLE
-- =====================================================

CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT,
    message TEXT NOT NULL,
    status contact_status NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can submit contact messages
CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages
FOR INSERT
WITH CHECK (true);

-- Admins can view and manage contact messages
CREATE POLICY "Admins can view all contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can update contact messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete contact messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (public.is_admin());

-- =====================================================
-- 9. GALLERY TABLE
-- =====================================================

CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Public can view active gallery items
CREATE POLICY "Anyone can view active gallery items"
ON public.gallery
FOR SELECT
USING (is_active = true);

-- Admins can manage gallery
CREATE POLICY "Admins can manage gallery"
ON public.gallery
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 10. TEAM MEMBERS TABLE
-- =====================================================

CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    linkedin TEXT,
    email TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Public can view active team members
CREATE POLICY "Anyone can view active team members"
ON public.team_members
FOR SELECT
USING (is_active = true);

-- Admins can manage team members
CREATE POLICY "Admins can manage team members"
ON public.team_members
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 11. TESTIMONIALS TABLE
-- =====================================================

CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view active testimonials
CREATE POLICY "Anyone can view active testimonials"
ON public.testimonials
FOR SELECT
USING (is_active = true);

-- Admins can manage testimonials
CREATE POLICY "Admins can manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 12. CERTIFICATIONS TABLE
-- =====================================================

CREATE TABLE public.certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Public can view active certifications
CREATE POLICY "Anyone can view active certifications"
ON public.certifications
FOR SELECT
USING (is_active = true);

-- Admins can manage certifications
CREATE POLICY "Admins can manage certifications"
ON public.certifications
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- =====================================================
-- 13. UPDATED_AT TRIGGER FUNCTION
-- =====================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Apply updated_at triggers
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_growth_chart_updated_at
    BEFORE UPDATE ON public.growth_chart
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
    BEFORE UPDATE ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_careers_updated_at
    BEFORE UPDATE ON public.careers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- 14. STORAGE BUCKETS
-- =====================================================

-- Gallery bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Partners bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('partners', 'partners', true)
ON CONFLICT (id) DO NOTHING;

-- Team bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('team', 'team', true)
ON CONFLICT (id) DO NOTHING;

-- Services bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('services', 'services', true)
ON CONFLICT (id) DO NOTHING;

-- Resumes bucket (private - only admins can access)
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Certifications bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('certifications', 'certifications', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- 15. STORAGE POLICIES
-- =====================================================

-- Gallery bucket policies
CREATE POLICY "Public can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery' AND public.is_admin());

CREATE POLICY "Admins can update gallery images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery' AND public.is_admin());

CREATE POLICY "Admins can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery' AND public.is_admin());

-- Partners bucket policies
CREATE POLICY "Public can view partner logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'partners');

CREATE POLICY "Admins can upload partner logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'partners' AND public.is_admin());

CREATE POLICY "Admins can update partner logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'partners' AND public.is_admin());

CREATE POLICY "Admins can delete partner logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'partners' AND public.is_admin());

-- Team bucket policies
CREATE POLICY "Public can view team images"
ON storage.objects FOR SELECT
USING (bucket_id = 'team');

CREATE POLICY "Admins can upload team images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'team' AND public.is_admin());

CREATE POLICY "Admins can update team images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'team' AND public.is_admin());

CREATE POLICY "Admins can delete team images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'team' AND public.is_admin());

-- Services bucket policies
CREATE POLICY "Public can view service images"
ON storage.objects FOR SELECT
USING (bucket_id = 'services');

CREATE POLICY "Admins can upload service images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'services' AND public.is_admin());

CREATE POLICY "Admins can update service images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'services' AND public.is_admin());

CREATE POLICY "Admins can delete service images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'services' AND public.is_admin());

-- Resumes bucket policies (private)
CREATE POLICY "Anyone can upload resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can view resumes"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resumes' AND public.is_admin());

CREATE POLICY "Admins can delete resumes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resumes' AND public.is_admin());

-- Certifications bucket policies
CREATE POLICY "Public can view certification images"
ON storage.objects FOR SELECT
USING (bucket_id = 'certifications');

CREATE POLICY "Admins can upload certification images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'certifications' AND public.is_admin());

CREATE POLICY "Admins can update certification images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'certifications' AND public.is_admin());

CREATE POLICY "Admins can delete certification images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'certifications' AND public.is_admin());

-- =====================================================
-- 16. SEED DATA - SERVICES
-- =====================================================

INSERT INTO public.services (name, short_description, description, icon, points, photos, sections, display_order) VALUES
(
    'EHV Substations',
    'Design, construction and commissioning of Extra High Voltage substations up to 230kV capacity with state-of-the-art equipment.',
    'We specialize in the complete design, construction, and commissioning of Extra High Voltage (EHV) substations. Our expertise covers substations up to 230kV capacity, utilizing cutting-edge equipment and technology to ensure reliable power distribution.',
    'Zap',
    ARRAY['Up to 230kV capacity', 'GIS & AIS Substations', 'Control & Relay Panels', 'SCADA Integration', 'Protection Systems', 'Earthing & Lightning Protection'],
    ARRAY[],
    '[{"title": "Our Approach", "description": "We follow industry best practices and international standards for substation design and construction.", "process": ["Site Survey & Assessment", "Detailed Engineering Design", "Equipment Procurement", "Construction & Installation", "Testing & Commissioning", "Handover & Documentation"]}]'::jsonb,
    1
),
(
    'Transmission Lines',
    'Complete transmission line solutions including survey, design, tower erection, stringing and maintenance services.',
    'Our transmission line services encompass the entire project lifecycle from initial survey and route selection to final commissioning. We have successfully completed over 1500 km of EHV transmission lines across India.',
    'Building',
    ARRAY['Tower Erection', 'Line Stringing', 'Route Survey', 'Foundation Work', 'Hot Line Maintenance', 'Tower Testing'],
    ARRAY[],
    '[{"title": "Project Execution", "description": "Systematic approach to transmission line construction ensuring safety and quality.", "process": ["Route Survey & Selection", "Foundation Design", "Tower Manufacturing", "Erection Works", "Conductor Stringing", "Testing & Energization"]}]'::jsonb,
    2
),
(
    'Solar Power Plants',
    'End-to-end solar power solutions from feasibility study to installation, grid integration and comprehensive O&M services.',
    'We provide comprehensive solar power solutions managing over 600 MW of solar capacity. Our services include feasibility studies, detailed engineering, procurement, installation, grid integration, and ongoing O&M services.',
    'Sun',
    ARRAY['600MW+ Under Management', 'Grid Integration', 'Performance Monitoring', 'Preventive Maintenance', 'Inverter Services', 'Module Cleaning'],
    ARRAY[],
    '[{"title": "Solar Services", "description": "Complete lifecycle management of solar power plants.", "process": ["Site Assessment", "System Design", "Equipment Supply", "Installation", "Grid Connection", "O&M Services"]}]'::jsonb,
    3
),
(
    'Wind Power Systems',
    'Wind power station installation, pooling substation construction, grid integration and maintenance services.',
    'Our wind power expertise includes the installation and maintenance of wind power stations and associated infrastructure. We have successfully completed over 20 Wind PSS sites with comprehensive grid integration.',
    'Wind',
    ARRAY['20+ Wind PSS Sites', 'Pooling Substations', 'Grid Connectivity', '24/7 Monitoring', 'Predictive Maintenance', 'Performance Optimization'],
    ARRAY[],
    '[{"title": "Wind Services", "description": "End-to-end wind power infrastructure solutions.", "process": ["Site Analysis", "Substation Design", "Construction", "Grid Integration", "Commissioning", "O&M Services"]}]'::jsonb,
    4
),
(
    'Operation & Maintenance',
    '24/7 operation and maintenance services ensuring optimal performance and reliability of power infrastructure.',
    'Our O&M services ensure round-the-clock monitoring and maintenance of power infrastructure. We employ advanced diagnostic tools and predictive maintenance strategies to maximize uptime and efficiency.',
    'Wrench',
    ARRAY['Round-the-clock Support', 'Preventive Maintenance', 'Emergency Response', 'Performance Analytics', 'Spare Parts Management', 'Technical Training'],
    ARRAY[],
    '[{"title": "O&M Excellence", "description": "Comprehensive maintenance programs for power infrastructure.", "process": ["Asset Assessment", "Maintenance Planning", "Scheduled Services", "Condition Monitoring", "Emergency Support", "Performance Reporting"]}]'::jsonb,
    5
),
(
    'Testing & Commissioning',
    'Comprehensive testing, inspection and commissioning services for all electrical systems and equipment.',
    'Our testing and commissioning team ensures that all electrical systems meet the highest standards of safety and performance. We use state-of-the-art testing equipment and follow international protocols.',
    'Shield',
    ARRAY['Pre-commissioning Tests', 'Protection Testing', 'Insulation Testing', 'Performance Verification', 'Relay Testing', 'CT/PT Testing'],
    ARRAY[],
    '[{"title": "Testing Services", "description": "Rigorous testing protocols for electrical systems.", "process": ["Test Planning", "Equipment Setup", "Systematic Testing", "Data Analysis", "Report Generation", "Certification"]}]'::jsonb,
    6
),
(
    'Civil Works',
    'Civil construction works for substations, control rooms, cable trenches and allied infrastructure.',
    'Our civil engineering division handles all construction requirements for power infrastructure projects including control buildings, equipment foundations, cable trenches, and boundary walls.',
    'Settings',
    ARRAY['Control Room Buildings', 'Equipment Foundations', 'Cable Trenches', 'Boundary Walls', 'Road Works', 'Drainage Systems'],
    ARRAY[],
    '[{"title": "Civil Construction", "description": "Quality civil works for power infrastructure.", "process": ["Site Preparation", "Foundation Work", "Structural Construction", "Finishing Works", "Quality Inspection", "Handover"]}]'::jsonb,
    7
),
(
    'Consultancy Services',
    'Expert consultancy for power infrastructure projects including feasibility studies and detailed engineering.',
    'Our consultancy services provide expert guidance for power infrastructure projects. We offer feasibility studies, detailed project reports, technical audits, and project management consultancy.',
    'FileCheck',
    ARRAY['Feasibility Studies', 'DPR Preparation', 'Technical Audits', 'Project Management', 'Design Review', 'Owner''s Engineering'],
    ARRAY[],
    '[{"title": "Consultancy Expertise", "description": "Expert advisory services for power projects.", "process": ["Requirement Analysis", "Technical Assessment", "Solution Design", "Report Preparation", "Review & Revision", "Final Deliverables"]}]'::jsonb,
    8
);

-- =====================================================
-- 17. SEED DATA - GROWTH CHART
-- =====================================================

INSERT INTO public.growth_chart (year, value, is_projection) VALUES
('2015-2016', 265558595, false),
('2016-2017', 87015696, false),
('2017-2018', 130526347, false),
('2018-2019', 232658237, false),
('2019-2020', 225575018, false),
('2020-2021', 119678007, false),
('2021-2022', 156516839, false),
('2022-2023', 259236846, false),
('2023-2024', 221174532, false),
('2024-2025', 280000000, true);

-- =====================================================
-- 18. SEED DATA - PARTNERS
-- =====================================================

INSERT INTO public.partners (name, logo_url, display_order) VALUES
('TNEB', 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/TANGEDCO_Logo.svg/1200px-TANGEDCO_Logo.svg.png', 1),
('L&T', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Larsen_%26_Toubro_logo.svg/2560px-Larsen_%26_Toubro_logo.svg.png', 2),
('Tata Power', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_Power_Logo.svg/2560px-Tata_Power_Logo.svg.png', 3),
('Adani', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Adani_2012_logo.png/1200px-Adani_2012_logo.png', 4),
('PGCIL', 'https://upload.wikimedia.org/wikipedia/commons/2/26/Power_Grid_Corporation_of_India_Logo.png', 5);

-- =====================================================
-- 19. SEED DATA - TEAM MEMBERS
-- =====================================================

INSERT INTO public.team_members (name, designation, description, display_order) VALUES
('R. Ayyappan', 'Managing Director', 'Over 35 years of experience in power infrastructure sector. Visionary leader driving company growth since 1990.', 1),
('S. Kumar', 'Technical Director', 'Expert in EHV substation design and construction with 25+ years of experience.', 2),
('M. Rajesh', 'Operations Head', 'Leading O&M operations for solar and wind power plants across India.', 3),
('P. Venkatesh', 'Project Manager', 'Successfully delivered 50+ major transmission line projects.', 4);

-- =====================================================
-- 20. SEED DATA - TESTIMONIALS
-- =====================================================

INSERT INTO public.testimonials (name, location, content, rating, display_order) VALUES
('Muthukumar Kannan', 'Chennai', 'I am very impressed with MASS Techno Power Infrastructure. They built solar panels for my home. Extremely skilled, cost-efficient, and professional. Highly recommended.', 5, 1),
('Suresh Babu', 'Coimbatore', 'Excellent work on our industrial substation project. Professional team, timely delivery, and great after-sales support.', 5, 2),
('Ramesh Kumar', 'Madurai', 'Their O&M services for our solar plant have been exceptional. Uptime has improved significantly since they took over.', 5, 3);

-- =====================================================
-- 21. SEED DATA - GALLERY
-- =====================================================

INSERT INTO public.gallery (title, category, image_url, display_order) VALUES
('230kV Substation', 'Substation Projects', '/hero-1.jpg', 1),
('Metro Rail Infrastructure', 'Chennai Metro Works', '/hero-2.jpg', 2),
('EHV Transmission Line', 'Transmission Lines', '/hero-3.jpg', 3),
('Solar Plant O&M', 'Operation & Maintenance', '/hero-4.jpg', 4),
('Control Room', 'Substation Projects', '/hero-5.jpg', 5);

-- =====================================================
-- END OF SCHEMA
-- =====================================================

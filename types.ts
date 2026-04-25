import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  sectionId?: string;
  pageNumber?: string;
}

export interface SectionProps {
  id: string;
  className?: string;
  title: string;
  children: React.ReactNode;
}
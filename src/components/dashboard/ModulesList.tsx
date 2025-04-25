'use client';

import React, { useEffect, useState } from 'react';
import ModuleCard from './ModuleCard';

interface Module {
  id: number;
  title: string;
  description: string;
  slug: string;
  level: number;
  lessons: Array<{ id: number }>;
  requiredPoints: number;
}

export default function ModulesList() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      try {

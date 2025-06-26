// models/serviceModel.ts
import { ReactNode } from 'react';

export type Service = {
  id: string;
  name: string;
  icon: ReactNode; // 🔥 JSX-compatible type
  url?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

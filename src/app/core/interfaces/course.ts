export interface Course {
  id: number;
  course_name: string;
  description: string;
  modality: string;
  duration: string;
  price: string;
  active: boolean;
  start_date: Date | null;
  finish_date: Date | null;
  type: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

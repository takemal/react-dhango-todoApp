export type TaskState = {
  id: number | null;
  title: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type PostTask = {
  title: string;
};

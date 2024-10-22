export type StatusClassMap = {
  pendding: StatusClass | StatusText | PriorityClass | PriorityText;
  in_progress: StatusClass | StatusText | PriorityClass | PriorityText;
  completed: StatusClass | StatusText | PriorityClass | PriorityText;
};

export enum StatusClass {
  Pendding = "bg-amber-500",
  InProgress = "bg-blue-500",
  Completed = "bg-green-500",
}

export enum StatusText {
  Pendding = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
}

export enum PriorityClass {
  Low = "bg-gray-600",
  Medium = "bg-amber-600",
  High = "bg-red-600",
}

export enum PriorityText {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}
export function formatStatusOrPriority<T extends Record<string, unknown>>(
  enumMap: T,
  snakeCaseKey: keyof StatusClassMap,
): T[keyof T] | undefined {
  const oCamelCaseKey =
    snakeCaseKey[0].toUpperCase() +
    snakeCaseKey.slice(1).replace(/_./g, (s) => s[1].toUpperCase());
  return enumMap[oCamelCaseKey as keyof typeof enumMap];
}

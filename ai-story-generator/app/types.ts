export interface UserSelectionProps {
  userSelection: (data: {
    fieldName: string;
    fieldValue: string;
  }) => void;
}

export interface LoaderProps {
  loading: boolean;
} 
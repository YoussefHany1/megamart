export type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export type ProductSpecification = {
  name: string;
  pecifications: string;
}

export type ProductDetail = {
  th: string;
  td: string;
}

export type ProductDetailsProps = {
  specifications?: ProductSpecification[];
  details?: ProductDetail[];
}

import { useLocalStorage } from "./useLocalStorage";
import {
  mockPortfolio, mockProducts, mockCourses,
  mockTestimonials, mockFAQs,
  mockServiceCategories, mockServiceItems,
  type PortfolioProject, type Product,
  type Course, type Testimonial, type FAQ,
  type ServiceCategory, type ServiceItem,
} from "@/lib/adminData";

export function useServiceCategories(): ServiceCategory[] {
  const [data] = useLocalStorage<ServiceCategory[]>("admin_service_categories", mockServiceCategories);
  return [...data].filter(c => c.isVisible).sort((a, b) => a.order - b.order);
}

export function useServiceItems(): ServiceItem[] {
  const [data] = useLocalStorage<ServiceItem[]>("admin_service_items", mockServiceItems);
  return [...data].filter(s => s.isVisible).sort((a, b) => a.order - b.order);
}

export function useServiceItemsByCategory(categoryId: number): ServiceItem[] {
  const items = useServiceItems();
  return items.filter(s => s.categoryId === categoryId);
}

export function usePortfolio(): PortfolioProject[] {
  const [data] = useLocalStorage<PortfolioProject[]>("admin_portfolio", mockPortfolio);
  return data;
}

export function useProducts(): Product[] {
  const [data] = useLocalStorage<Product[]>("admin_products", mockProducts);
  return data;
}

export function useCourses(): Course[] {
  const [data] = useLocalStorage<Course[]>("admin_courses", mockCourses);
  return data;
}

export function useTestimonials(): Testimonial[] {
  const [data] = useLocalStorage<Testimonial[]>("admin_testimonials", mockTestimonials);
  return data;
}

export function useFAQs(): FAQ[] {
  const [data] = useLocalStorage<FAQ[]>("admin_faqs", mockFAQs);
  return data;
}

import { useLocalStorage } from "./useLocalStorage";
import {
  mockServices, mockPortfolio, mockProducts, mockCourses,
  mockTestimonials, mockFAQs,
  type Service, type PortfolioProject, type Product,
  type Course, type Testimonial, type FAQ
} from "@/lib/adminData";

export function useServices(): Service[] {
  const [data] = useLocalStorage<Service[]>("admin_services", mockServices);
  return [...data].sort((a, b) => a.displayOrder - b.displayOrder);
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

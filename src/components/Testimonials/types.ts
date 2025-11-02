export interface Testimonial {
  id: string
  text: string
  author: string
  avatarText: string
  avatarColor: string
}

export interface TestimonialsSection {
  title: string
  subtitle: string
  reviews: Testimonial[]
}

export const YEAR = 2026;

export const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

export const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const MONTH_IMAGES = [
  // January - mountain climber
  "https://images.unsplash.com/photo-1706186839147-0d708602587b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // February - winter snow forest
  "https://images.unsplash.com/photo-1639498940150-deecdaad87eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzbm93JTIwZm9yZXN0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NTU3MDk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
  // March - cherry blossom
  "https://images.unsplash.com/photo-1706790938920-e08a2cae3b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBjaGVycnklMjBibG9zc29tJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NzU1NzA5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  // April - green meadow wildflowers
  "https://images.unsplash.com/photo-1717814417707-2280a1aa8e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG1lYWRvdyUyMHdpbGRmbG93ZXJzJTIwc3ByaW5nfGVufDF8fHx8MTc3NTU3MDk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  // May - tropical jungle waterfall
  "https://images.unsplash.com/photo-1723784037687-edb3a4959c22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGp1bmdsZSUyMHdhdGVyZmFsbHxlbnwxfHx8fDE3NzU1NzA5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  // June - summer beach ocean
  "https://images.unsplash.com/photo-1661953029179-e1b0dc900490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBiZWFjaCUyMG9jZWFuJTIwd2F2ZXN8ZW58MXx8fHwxNzc1NTcwOTYzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  // July - desert canyon red rocks
  "https://images.unsplash.com/photo-1701238973883-6c8b01439deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBjYW55b24lMjByZWQlMjByb2Nrc3xlbnwxfHx8fDE3NzU1NzA5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  // August - foggy mountain valley
  "https://images.unsplash.com/photo-1706186839147-0d708602587b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // September - autumn fall foliage
  "https://images.unsplash.com/photo-1664493115827-573d5669f032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBmYWxsJTIwZm9saWFnZSUyMGZvcmVzdHxlbnwxfHx8fDE3NzU1NzA5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  // October - northern lights aurora
  "https://images.unsplash.com/photo-1666003400042-a9e68d6bff0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVybiUyMGxpZ2h0cyUyMGF1cm9yYSUyMGJvcmVhbGlzfGVufDF8fHx8MTc3NTQ5MjQxMXww&ixlib=rb-4.1.0&q=80&w=1080",
  // November - snowy cabin christmas
  "https://images.unsplash.com/photo-1766864897417-f27fd0f5973a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbm93eSUyMGNhYmluJTIwY2hyaXN0bWFzJTIwd2ludGVyJTIwbmlnaHR8ZW58MXx8fHwxNzc1NTcwOTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  // December - winter snow (reuse)
  "https://images.unsplash.com/photo-1639498940150-deecdaad87eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzbm93JTIwZm9yZXN0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3NTU3MDk1OXww&ixlib=rb-4.1.0&q=80&w=1080",
];

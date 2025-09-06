// Simple animation utilities without GSAP dependency
export const animateMainStagger = () => {
  const elements = document.querySelectorAll('.animate-item');
  elements.forEach((element, index) => {
    const el = element as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
};

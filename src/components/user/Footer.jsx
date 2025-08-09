import { GithubIcon, InstagramIcon, LinkedinIcon, Youtube } from 'lucide-react';

const navigation = [

  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/fahmaz-ashraf',
    icon: LinkedinIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/fahmazp',
    icon: GithubIcon,
  },
  {
    name: 'YouTube',
    href: '#',
    icon: Youtube,
  },
];

export default function Footer() {
  return (
    <footer className="bg-sidebar-primary">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-secondary transition-colors duration-200"
                target='_blank'
                aria-label={item.name}
                rel="noopener noreferrer"
              >
                <Icon aria-hidden="true" className="w-5 h-5" />
              </a>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm/6 text-foreground md:order-1 md:mt-0">
          &copy; 2025. Built By Fahmaz Ashraf
        </p>
      </div>
    </footer>
  );
}

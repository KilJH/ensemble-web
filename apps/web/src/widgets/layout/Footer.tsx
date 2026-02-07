import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <FooterSection title="서비스">
            <FooterLink href="/features">기능 소개</FooterLink>
            <FooterLink href="/pricing">요금제</FooterLink>
          </FooterSection>

          <FooterSection title="지원">
            <FooterLink href="/help">도움말</FooterLink>
            <FooterLink href="/contact">문의하기</FooterLink>
          </FooterSection>

          <FooterSection title="법적 고지">
            <FooterLink href="/terms">이용약관</FooterLink>
            <FooterLink href="/privacy">개인정보처리방침</FooterLink>
          </FooterSection>

          <FooterSection title="소셜">
            <FooterLink href="https://github.com" external>
              GitHub
            </FooterLink>
          </FooterSection>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 pt-8 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} HAPZOO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="font-medium text-text mb-4">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external }: FooterLinkProps) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-muted hover:text-text transition-colors"
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className="text-sm text-text-muted hover:text-text transition-colors">
        {children}
      </Link>
    </li>
  );
}

const fs = require('fs');
const path = require('path');

// Fix unescaped quotes in JSX
const fixUnescapedQuotes = (content) => {
  return content
    .replace(/don't/g, "don&apos;t")
    .replace(/can't/g, "can&apos;t")
    .replace(/won't/g, "won&apos;t")
    .replace(/couldn't/g, "couldn&apos;t")
    .replace(/shouldn't/g, "shouldn&apos;t")
    .replace(/wouldn't/g, "wouldn&apos;t")
    .replace(/I'm/g, "I&apos;m")
    .replace(/you're/g, "you&apos;re")
    .replace(/we're/g, "we&apos;re")
    .replace(/they're/g, "they&apos;re")
    .replace(/it's/g, "it&apos;s")
    .replace(/that's/g, "that&apos;s")
    .replace(/what's/g, "what&apos;s")
    .replace(/here's/g, "here&apos;s")
    .replace(/there's/g, "there&apos;s")
    .replace(/We've/g, "We&apos;ve")
    .replace(/"Getting Started with Next\.js"/g, "&ldquo;Getting Started with Next.js&rdquo;")
    .replace(/"Senior Developer"/g, "&ldquo;Senior Developer&rdquo;");
};

// Files that need fixing based on the error log
const filesToFix = [
  'src/app/auth/login/page.tsx',
  'src/app/auth/resend-code/page.tsx',
  'src/app/auth/verify-otp/page.tsx',
  'src/app/dashboard/articles/page.tsx',
  'src/app/dashboard/careers/page.tsx',
  'src/app/dashboard/crm/page.tsx',
  'src/app/dashboard/newsletter/page.tsx',
  'src/app/dashboard/newsletter/subscribers/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/dashboard/settings/page.tsx'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = fixUnescapedQuotes(content);
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('ESLint quote fixes completed!');

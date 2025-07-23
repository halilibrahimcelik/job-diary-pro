import { useState, useCallback } from 'react';
import placeholder from '../assets/images/placeholder-image.jpg';
import { toast } from 'sonner';
export interface CompanyInfo {
  name: string;
  logo: string;
  domain: string;
  fullUrl: string;
}

export const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const normalizeUrl = (input: string): string => {
    let url = input.trim().toLowerCase();

    // If it's just a word (like "google"), add .com
    if (!url.includes('.') && !url.includes(' ') && url.length > 0) {
      url = `${url}.com`;
    }

    // If it doesn't start with http/https, add https://
    if (!url.match(/^https?:\/\//)) {
      url = `https://${url}`;
    }

    // Remove trailing slash
    url = url.replace(/\/$/, '');

    return url;
  };

  const fetchCompanyInfo = useCallback(async (url: string) => {
    //if (!url.trim()) return; // Don't process empty strings
    const trimmedUrl = url.trim();
    setLoading(true);
    try {
      const normalizedUrl = normalizeUrl(trimmedUrl);

      if (normalizedUrl.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/)) {
        const urlObj = new URL(normalizedUrl);
        const domain = urlObj.hostname.replace('www.', '');
        const companyName = domain.split('.')[0];
        // Test if Clearbit logo exists
        const clearbitLogo = `https://logo.clearbit.com/${domain}`;

        // Create a promise to test the logo
        const testLogo = new Promise<string>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(clearbitLogo);
          img.onerror = () => {
            // Fallback to other services
            const fallback = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

            resolve(fallback); // Use first fallback
          };
          img.src = clearbitLogo;
        });

        const logoUrl = await testLogo;
        setCompanyInfo({
          name: companyName.charAt(0).toUpperCase() + companyName.slice(1),
          logo: logoUrl, // Use first as primary
          domain,
          fullUrl: normalizedUrl,
        });
      } else {
        setCompanyInfo({
          name: trimmedUrl,
          logo: placeholder, // Use first as primary
          domain: trimmedUrl,
          fullUrl: normalizedUrl,
        });
      }
    } catch {
      toast.error('An error occurred while retrieving company information.');
      setCompanyInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { companyInfo, loading, fetchCompanyInfo, setCompanyInfo };
};

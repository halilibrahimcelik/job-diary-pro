import { useState, useCallback } from 'react';
import placeholder from '../assets/images/placeholder-image.jpg';
export interface CompanyInfo {
  name: string;
  logo: string;
  domain: string;
}

export const useCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCompanyInfo = useCallback(async (url: string) => {
    setLoading(true);
    try {
      if (url.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/)) {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.replace('www.', '');
        const companyName = domain.split('.')[0];

        // Use multiple logo services as fallbacks
        const logoSources = [
          `https://logo.clearbit.com/${domain}`,
          `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
          `https://favicone.com/${domain}?s=128`,
        ];

        setCompanyInfo({
          name: companyName.charAt(0).toUpperCase() + companyName.slice(1),
          logo: logoSources[0], // Use first as primary
          domain,
        });
      } else {
        setCompanyInfo({
          name: url,
          logo: placeholder, // Use first as primary
          domain: url,
        });
      }
    } catch (error) {
      console.error('Invalid URL:', error);
      setCompanyInfo(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { companyInfo, loading, fetchCompanyInfo };
};

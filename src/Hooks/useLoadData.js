import { useQuery } from '@tanstack/react-query';
import { getAllData } from '../Data/Repo/dataRepo';
import { getDomain } from '../configLoader';

const domain = getDomain();

export function useLoadAllData() {
  const employees = useQuery({
    queryKey: ['employees'],
    queryFn: () => getAllData.get_all_employess(domain),
    enabled: !!domain,
});

  const infograph = useQuery({
    queryKey: ['infograph'],
    queryFn: () => getAllData.get_allmainpage_infograph(domain),
   enabled: !!domain,
});
                        

  const importantLinks = useQuery({
    queryKey: ['importantLinks'],
    queryFn: () => getAllData.get_allimportant_link(domain),
   enabled: !!domain,
  });

  const news = useQuery({
    queryKey: ['news'],
    queryFn: () => getAllData.get_allnews(domain),
   enabled: !!domain,
  });

  const about = useQuery({
    queryKey: ['about'],
    queryFn: () => getAllData.get_all_about(domain),
    enabled: !!domain,
});

  const awarness = useQuery({
    queryKey: ['awarness'],
    queryFn: () => getAllData.get_all_awarnessmsg(domain),
   enabled: !!domain,
});

  const services = useQuery({
    queryKey: ['services'],
    queryFn: () => getAllData.get_all_servicemain(domain),
   enabled: !!domain,
  });

  const govs = useQuery({
    queryKey: ['govs'],
    queryFn: () => getAllData.get_all_govs(domain),
   enabled: !!domain,
  });

  const initiative = useQuery({
    queryKey: ['initiative'],
    queryFn: () => getAllData.get_all_initiativenumber(domain),
   enabled: !!domain,
});

  const videos = useQuery({
    queryKey: ['videos'],
    queryFn: () => getAllData.get_all_vedio(domain),
   enabled: !!domain,
  });

  // بنرجّع كلهم في object واحد
  return {
    employees,
    infograph,
    importantLinks,
    news,
    about,
    awarness,
    services,
    govs,
    initiative,
    videos,
  };
}

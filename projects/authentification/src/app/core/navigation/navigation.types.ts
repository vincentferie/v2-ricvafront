import { FuseNavigationItem } from 'projects/authentification/src/@fuse/components/navigation/navigation.types';

export interface Navigation {
  compact: FuseNavigationItem[];
  default: FuseNavigationItem[];
  futuristic: FuseNavigationItem[];
  horizontal: FuseNavigationItem[];
}

import { EntrepotsMockApi } from './common/entrepot/api';
import { ChatMockApi } from './apps/chat/api';
import { ContactsMockApi } from './apps/contacts/api';
import { RequiredMockApi } from './apps/required/api';
import { TasksMockApi } from './apps/tasks/api';
import { AuthMockApi } from './common/auth/api';
import { BillOfLandingsMockApi } from './common/bill-of-landing/api';
import { BookingsMockApi } from './common/booking/api';
import { CampagnesMockApi } from './common/campagne/api';
import { ConteneursMockApi } from './common/conteneur/api';
import { DechargementsMockApi } from './common/dechargement/api';
import { EntreposagesMockApi } from './common/entreposage/api';
import { ExecutionsMockApi } from './common/execution/api';
import { LotsMockApi } from './common/lot/api';
import { ExportateursMockApi } from './common/exportateur/api';
import { MessagesMockApi } from './common/messages/api';
import { NavigationMockApi } from './common/navigation/api';
import { NotificationsMockApi } from './common/notifications/api';
import { PlanEmpotagesMockApi } from './common/plan-empotage/api';
import { PlombsMockApi } from './common/plomb/api';
import { SearchMockApi } from './common/search/api';
import { ShortcutsMockApi } from './common/shortcuts/api';
import { SpecificitesMockApi } from './common/specificite/api';
import { UserMockApi } from './common/user/api';
import { VillesMockApi } from './common/ville/api';
import { AnalyticsMockApi } from './dashboards/analytics/api';
import { CryptoMockApi } from './dashboards/crypto/api';
import { FinanceMockApi } from './dashboards/finance/api';
import { ProjectMockApi } from './dashboards/project/api';
import { ECommerceInventoryMockApi } from './ecommerce/inventory/api';
import { ActivitiesMockApi } from './pages/activities/api';
import { IconsMockApi } from './ui/icons/api';

export const mockApiServices = [
  //AcademyMockApi,
  ActivitiesMockApi,
  AnalyticsMockApi,
  AuthMockApi,
  ChatMockApi,
  ContactsMockApi,
  CryptoMockApi,
  ECommerceInventoryMockApi,
  //FileManagerMockApi,
  FinanceMockApi,
  //HelpCenterMockApi,
  IconsMockApi,
  //MailboxMockApi,
  MessagesMockApi,
  NavigationMockApi,
  //NotesMockApi,
  NotificationsMockApi,
  ProjectMockApi,
  SearchMockApi,
  //ScrumboardMockApi,
  ShortcutsMockApi,
  TasksMockApi,
  UserMockApi,

  // My insertion
  DechargementsMockApi,
  EntreposagesMockApi,
  PlanEmpotagesMockApi,
  ExecutionsMockApi,
  BookingsMockApi,
  ConteneursMockApi,
  BillOfLandingsMockApi,
  PlombsMockApi,
  RequiredMockApi,
  CampagnesMockApi,
  VillesMockApi,
  SpecificitesMockApi,
  ExportateursMockApi,
  EntrepotsMockApi,
  LotsMockApi,
];
